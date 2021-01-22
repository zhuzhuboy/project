<template>
  <!-- 布局容器 -->
  <el-container style="height:100%" class="el-container">
    <el-aside width="400px" style="background:#fff" class="contain-aside">
      <!-- 标题 -->
      <!-- <h5 class="aside-h5">扫码</h5> -->
      <el-alert :title="formData.s_goods_name" type="success" center style="marginBottom:40px" :closable="false"></el-alert>
      <!-- 单选 -->

      <el-form :model="formData" ref="numberValidateForm" label-width="90px">
        <el-form-item label="启动方式：">
          <el-radio-group v-model="formData.is_crv" size="small">
            <el-radio :label="0" border :disabled="formData.is_crv!=0">钥匙启动</el-radio>
            <el-radio :label="1" border :disabled="formData.is_crv!=1">一键启动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备类型：" class="device-type">
          <el-radio-group v-model="formData.scan_type" size="small">
            <el-radio :label="1" border :disabled="formData.scan_type!=1">TBox</el-radio>
            <el-radio :label="2" border :disabled="formData.scan_type!=2">澳多通用主机</el-radio>
            <el-radio :label="3" border :disabled="formData.scan_type!=3">云掌行</el-radio>
            <el-radio :label="4" border :disabled="formData.scan_type!=4">澳多专用主机</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="扫流水号：">
          <el-input
            v-model="formData.number"
            placeholder="请输入流水号"
            size="small"
            clearable
            style="width:100%"
            @input="inputs"
            :disabled="formData.s_purchase_num<=0"
          ></el-input>
        </el-form-item>
        <el-form-item label="代理地址：">
          <el-tag size>{{formData.full_agent_area}}</el-tag>
        </el-form-item>
        <el-form-item label="收货地址：">
          <el-tag size>{{formData.receive_address}}</el-tag>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main class="main">
      <card-table
        :s_purchase_num="formData.s_purchase_num"
        :tableData="tableData"
        :scan_type="formData.scan_type"
        @deleteItem="deleteItem"
      />
    </el-main>
  </el-container>
</template>

<script>
import CardTable from "./CardTable";
import { debounce } from "@/libs/tools.js";
import { scanCode } from "@/api/sale/delivery.js";
export default {
  components: {
    CardTable
  },

  data() {
    return {
      formData: {
        is_crv: undefined, //0表示澳多。1表示云掌行
        scan_type: undefined, //1表示TBox。2表示澳多通用主机，3,4
        s_goods_name: undefined,
        s_purchase_num: undefined,
        full_agent_area: undefined,
        receive_address: undefined,
        id: undefined,
        agent_uid: undefined,
        number: undefined
      },
      tableData: []
    };
  },
  created() {
    //   初始化form数据
    this.initForm();
    // 初始化防抖函数
  },
  computed: {
    cateTableInfo() {
      return this.$store.state.d2admin.sale.cateTableInfo;
    },
    detailTableInfo() {
      return this.$store.state.d2admin.sale.detailTableInfo;
    }
  },

  methods: {
    async inputs(e) {
      // 值为空。退出
      if (!e) return;
      //判断是TBox
      console.log(this.formData.scan_type);
      if (this.formData.scan_type == 1) {
        //   返回tbox流水号相同的项
        let result = this.tableData.find(item => item.serial_number == e);
        // 如果有相同的项，则提示用户。并退出函数。不在向下执行
        if (result) {
          this.$message({
            message: "'TBox流水号已在现有表格中存在' " + result.serial_number,
            type: "warning"
          });
          return;
        }
      } else {
        //   判断如果不是TBox，则判断主机流水号项是否有重复
        let result = this.tableData.find(item => item.hosts_number == e);
        // 如果有重复的则提示用户。并退出函数。不再向下执行
        if (result) {
          this.$message({
            message: "主机流水号已在现有表格中存在 " + result.hosts_number,
            type: "warning"
          });
          return;
        }
      }
      let option = {};
      option.is_crv = this.formData.is_crv;
      option.scan_type = this.formData.scan_type;
      option.number = this.formData.number;
      let res = await scanCode(option);
      // 调用接口，返回表格数据中的一项。加入到表格中
      let dataItem = this.deviceMatchData(res);
      console.log(dataItem);
      let num = dataItem;

      this.tableData.push(dataItem);
      //   每成功调用一次接口。数量就减少一个
      this.formData.s_purchase_num--;
      this.formData.number = "";
      console.log(this.formData);
    },
    initForm() {
      this.formData.is_crv = this.detailTableInfo.is_crv;
      this.formData.scan_type = this.detailTableInfo.scan_type;
      this.formData.s_goods_name = this.detailTableInfo.s_goods_name;
      this.formData.s_purchase_num = this.detailTableInfo.s_purchase_num;
      this.formData.id = this.detailTableInfo.id;
      this.formData.full_agent_area = this.cateTableInfo.full_agent_area;
      this.formData.receive_address = this.cateTableInfo.receive_address;
      this.formData.agent_uid = this.cateTableInfo.agent_uid;
    },
    // 设备类型匹配数据。对应渲染表格
    deviceMatchData(res) {
      let {
        type, //设备类型
        device_type, //厂家
        is_crv, //启动方式
        is_special, //设备机型
        car_model_remarks, //专用机备注
        device_number, //设备号
        hosts_number, //主机流水号
        serial_number //TBox流水号
      } = res.data;
      let data;
      //   类型是1是TBox。表格展示的数据是这些
      if (this.formData.scan_type == 1) {
        //  TBox 0
        data = {
          type,
          device_type,
          is_crv,
          device_number,
          serial_number
        };
      } else if (this.formData.scan_type == 2 || this.formData.scan_type == 4) {
        data = {
          type,
          device_type,
          is_crv,
          is_special,
          car_model_remarks,
          hosts_number
        };
      } else if (this.formData.scan_type == 3) {
        data = {
          type,
          device_type,
          is_crv,
          is_special,
          device_number,
          hosts_number
        };
      }
      return data;
    },
    deleteItem(i) {
      this.tableData.splice(i, 1);
      this.formData.s_purchase_num++;
    }
  },

  watch: {
    "formData.s_purchase_num"(val) {
      if (val <= 0) {
        this.formData.number = "";
      }
    }
  }
};
</script>

<style>
.device-type {
  display: flex;
  align-items: center;
}
.device-type .el-form-item__content {
  margin-left: 0px !important;
}
.device-type label.el-form-item__label {
  flex: 0 0 90px;
}
.device-type .el-radio-group {
  margin-left: 0 !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.device-type .el-form-item__content label {
  width: 45%;
  margin: 10px 0 !important;
}
</style>

<style lang="scss" scoped>
.contain-aside {
  padding: 20px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.aside-h5 {
  text-align: center;
  background-color: aliceblue;
  padding: 10px;
  margin-bottom: 40px;
  margin-top: 0px;
}
.el-container .main {
  padding-top: 0px;
  padding-bottom: 0px;
  background: #fff0;
  background-clip: content-box;
}
</style>



