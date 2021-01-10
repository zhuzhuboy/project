<template>
  <div class="edit-form">
    <el-form
      :model="form"
      ref="addWareForm"
      label-width="80px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col :span="4" style="min-width:220px">
          <el-form-item label="单号">
            <span class="font-red">保存后自动生成</span>
          </el-form-item>
        </el-col>

        <el-col :span="7" style="max-width:300px;min-width:300px">
          <el-form-item label="业务时间" prop="bus_date">
            <el-date-picker v-model="form.bus_date" :clearable="false" ref="dataPicker"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="11" class="custom">
          <el-form-item label="客户" prop="agent_uid">
            <el-select
              clearable
              v-model="form.agent_uid"
              filterable
              remote
              placeholder="请输入代理位置"
              :remote-method="debounceFunc"
              :loading="loading"
            >
              <el-option
                v-for="item in areaList"
                :key="item.agent_uid"
                :label="item.agent_area"
                :value="item.agent_uid"
              ></el-option>
            </el-select>
            <el-button
              type="primary"
              size="small"
              style="margin-left:20px"
              @click="fillInfoBtn"
            >完善信息</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row :gutter="20" class="row-two">
        <el-col :span="2" style="min-width:220px" class="warehouse">
          <el-form-item label="收货人姓名" prop="receive_name" label-width="100px">
            <div
              :class="{'form-bor-red':!form.receive_name,'form-bor-black':form.receive_name,'form-bor':true}"
            >{{form.receive_name}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="电话">
            <div
              :class="{'form-bor-red':!form.receive_phone,'form-bor-black':form.receive_phone,'form-bor':true}"
            >{{form.receive_phone}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label-width="100px" label="收货人地址">
            <div
              :class="{'form-bor-red':!form.receive_address,'form-bor-black':form.receive_address,'form-bor':true}"
            >{{form.receive_address}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第三行 -->
      <el-row>
        <el-col :span="3">
          <el-form-item label="激动状态">
            <el-tag v-if="activate_time===0" size="small">待激活</el-tag>
            <el-tag v-else size="small">已激活</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="100px" label="未激活台数">
            <el-tag size="small" v-if="device_undelivered===undefined">0</el-tag>
            <el-tag size="small" v-else>{{device_undelivered}}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="付款方式" prop="pay_id">
            <el-select v-model="form.pay_id" placeholder="请选择" style="width:100%" clearable>
              <el-option
                v-for="item in formSel.pay_id"
                :key="item.id"
                :label="item.payment_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="仓库" prop="stock_id">
            <el-select v-model="form.stock_id" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in formSel.stock_id"
                :key="item.id"
                :label="item.stock_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="form.remarks" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import EditTable from "./EditTable";
import { searchArea, perInfo } from "@api/sale/saleList.js";
import { imeDebounce } from "@libs/tools.js";
export default {
  components: {
    EditTable
  },
  created() {
    //   debounce赋值
    this.debounceFunc = imeDebounce(this.remoteMethod, 1000);
  },
  mounted() {
    // 传递ref
    this.$emit("getFormRef", this.$refs.addWareForm);
  },
  props: {
    //   form表单下拉列表项
    formSel: {
      type: Object
    }
  },
  data() {
    return {
      // 自己维护表单数据，传递给后端的格式
      form: {
        bus_date: undefined, // 业务时间
        stock_id: undefined, // 仓库
        agent_uid: undefined, // 代理地区
        pay_id: undefined, // 支付方式id
        receive_name: undefined, // 收货人姓名
        receive_phone: undefined, // 收货人手机号
        receive_address: undefined, // 收货人手机号
        remarks: undefined
      },
      device_undelivered: undefined, // 未激活数量
      debounceFunc: undefined, // 防抖函数
      loading: undefined, // 远程搜索loading属性
      areaList: [], // 远程搜索数组列表
      activate_time: undefined, // 激活时间。如果等于0表示未激活
      rules: {
        agent_uid: [
          { required: true, message: "请输入客户代理位置", trigger: "change" }
        ],
        stock_id: [
          { required: true, message: "请选择仓库", trigger: "change" }
        ],
        pay_id: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ],
        bus_date: [
          { required: true, message: "请选择业务日期", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    //   完善信息
    async fillInfoBtn() {
      let id = this.form.agent_uid;
      if (id) {
        let option = {
          agent_uid: id
        };
        // 根据id获得用户信息
        let result = await perInfo(option);
        result = result.data;
        this.form.receive_address = result.receive_address;
        this.form.receive_name = result.receive_name;
        this.form.receive_phone = result.receive_phone;
        this.device_undelivered = result.device_undelivered;
        this.activate_time = result.activate_time;
        console.log(this.form);
      } else {
        this.$notify({
          title: "",
          message: "请填写客户输入框",
          type: "info",
          duration: 2000
        });
      }
    },
    //   远程搜索
    async remoteMethod(queryString) {
      console.log(555555);
      //  如果输入值为空或者是undefined。列表置空。不再执行
      if (queryString == "" || queryString == undefined) {
        this.areaList = [];
        this.form.agent_uid = undefined;
        return;
      }

      let option = {
        area: queryString
      };
      this.loading = true;
      // 远程搜索
      let result = await searchArea(option);
      console.log(result.data);
      this.loading = false;
      this.areaList = result.data;
    }
  }
};
</script>

<style lang="scss" >
.demo-ruleForm {
  font-size: 13px;
  .font-red {
    color: red;
    font-size: 13px;
  }

  //   第二行特殊样式

  .row-two .form-bor-red {
    border-bottom: 1px solid red;
  }
  .row-two .form-bor-black {
    border-bottom: 1px solid black;
  }
  .row-two .form-bor {
    height: 40px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
