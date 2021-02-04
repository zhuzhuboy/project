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
      <el-row :gutter="20" class="row-two">
        <el-col :span="4" style="min-width:220px">
          <el-form-item label="单号">
            <span class="font-red">保存后自动生成</span>
          </el-form-item>
        </el-col>

        <el-col :span="7" style="max-width:300px;min-width:300px">
          <el-form-item label="业务时间" prop="bus_date">
            <el-date-picker
              v-model="form.bus_date"
              :clearable="false"
              ref="dataPicker"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="min-width:220px" class="warehouse">
          <el-form-item label="客户地址" prop="record_id" label-width="100px">
            <div :class="{'form-bor-black':true,'form-bor':true}">{{record_label}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row>
        <el-col :span="4">
          <el-form-item label="付款方式" prop="pay_id">
            <el-select v-model="form.pay_id" placeholder="请选择" style="width:100%" clearable>
              <template v-if="formSel">
                <el-option
                  v-for="item in formSel.pay"
                  :key="item.id"
                  :label="item.payment_name"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="仓库" prop="stock_id">
            <el-select v-model="form.stock_id" placeholder="请选择" style="width:100%">
              <template v-if="formSel">
                <el-option
                  v-for="item in formSel.stock"
                  :key="item.id"
                  :label="item.stock_name"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import EditTable from "./EditTable";

import { imeDebounce } from "@libs/tools.js";
export default {
  components: {
    EditTable
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
        pay_id: undefined, // 支付方式id
        stock_id: undefined, // 仓库
        record_id: undefined //客户地址
      },
      //   客户地址显示的文字
      record_label: undefined,
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
  watch: {
    //   监听传递进来的属性formSel.info是否发生改变。如果改变了，判断是否有值。有值则给form表单赋值。和form表单客户地址显示的文字
    "formSel.info"(val) {
      if (val) {
        this.form.record_id = val.value;
        this.record_label = val.label;
      }
    }
  }
};

// //$tables
//r_goods_code 编码，
// r_goods_name 物料名称，
// r_spec规格，
// ret_num退货数量，
// unit单位，
// ret_one_price退货单价(不含税)，
// ret_price退货金额(不含税)，
// tax_rate 税率，

// remarks备注
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
