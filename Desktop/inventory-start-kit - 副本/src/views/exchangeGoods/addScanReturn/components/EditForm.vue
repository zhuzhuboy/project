<template>
  <el-form :model="formData" ref="formRef" label-width="90px" class="aside-form" :rules="rules">
    <el-form-item label="设备类型" class="device-type">
      <el-radio-group v-model="formData.type" size="small" @change="change">
        <el-radio :label="0" border>TBox</el-radio>
        <el-radio :label="1" border>澳多主机</el-radio>
        <el-radio :label="2" border>云掌行主机</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="退货客户" prop="agent_uid">
      <el-select
        clearable
        v-model="formData.agent_uid"
        filterable
        remote
        placeholder="请输入代理位置"
        :remote-method="debounceFunc"
        :loading="remoteLoading"
        @visible-change="visibleChange"
        size="small"
      >
        <el-option
          v-for="item in formSelect.areaList"
          :key="item.agent_uid"
          :label="item.full_agent_area"
          :value="item.agent_uid"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="支付方式" prop="pay_id">
      <el-select v-model="formData.pay_id" placeholder="请选择" size="small">
        <el-option
          v-for="item in formSelect.pay"
          :key="item.id"
          :label="item.payment_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="退货仓库" prop="stock_id">
      <el-select v-model="formData.stock_id" placeholder="请选择" size="small">
        <el-option
          v-for="item in formSelect.stock"
          :key="item.id"
          :label="item.stock_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="业务日期" prop="bus_date">
      <el-date-picker
        size="small"
        v-model="formData.bus_date"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="扫流水号：" prop="number">
      <el-input
        v-model="formData.number"
        placeholder="请输入流水号"
        size="small"
        clearable
        @input="inputs"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { debounce } from "@libs/tools.js";
export default {
  data() {
    return {
      debounceFunc: undefined,
      rules: {
        stock_id: [
          { required: true, message: "请选择仓库", trigger: "change" }
        ],
        bus_date: [
          { required: true, message: "请填业务日期", trigger: "change" }
        ],
        agent_uid: [
          { required: true, message: "请填业务日期", trigger: "change" }
        ],
        pay_id: [{ required: true, message: "支付方式", trigger: "blur" }]
      }
    };
  },
  props: {
    formData: {
      type: Object,
      default: ""
    },
    formSelect: {
      type: Object,
      default: {}
    },
    remoteLoading: {
      type: Boolean
    }
  },
  mounted() {
    this.$emit("transmitFormRef", this.$refs.formRef);
  },
  // 防抖函数
  created() {
    //   debounce赋值
    this.debounceFunc = debounce(this.remoteMethod, 500);
  },
  methods: {
    //   input输入框触发事件
    inputs(e) {
      this.$emit("formInput", e);
    },
    // radio单选框改变发生的事件
    change(e) {
      this.$emit("raidoChange", e);
    },
    // 触发远程搜索
    remoteMethod(e) {
      this.$emit("remoteMethod", e);
    },
    // 远程搜索下拉框出现/隐藏时触发，出现则为 true，隐藏则为 false
    visibleChange(flag) {
      // 隐藏时候触发
      if (!flag) {
        this.$emit("selectVisibleChange");
      }
    }
  }
};
</script>

<style lang="scss">
.device-type {
  display: flex;
  align-items: center;
  .el-form-item__label {
    flex-shrink: 0;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-radio-group {
    label {
      margin: 0;
    }
  }
  .aside-form .el-input {
    width: 215px;
  }
}
.aside-form {
  .el-input {
    width: 220px !important;
  }
}
</style>
