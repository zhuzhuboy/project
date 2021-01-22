<template>
  <div class="scan-exchange-form">
    <el-form :model="formData" ref="formRef" label-width="100px" class="aside-form" :rules="rules">
      <el-form-item label="设备类型：" class="device-type">
        <el-radio-group v-model="formData.type" size="small" @change="change">
          <el-radio :label="1" border>TBox</el-radio>
          <el-radio :label="2" border>澳多通用主机</el-radio>
          <el-radio :label="3" border>云掌行主机</el-radio>
          <el-radio :label="4" border>澳多专用主机</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="退货客户：" prop="agent_uid">
        <el-select
          clearable
          v-model="formData.agent_uid"
          filterable
          remote
          placeholder="请输入代理位置"
          :remote-method="debounceFunc"
          :loading="formSelect.remoteLoading"
          @visible-change="visibleChange"
          size="small"
          style="width:100%"
        >
          <el-option
            v-for="item in formSelect.areaList"
            :key="item.agent_uid"
            :label="item.full_agent_area"
            :value="item.agent_uid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="旧流水号：" prop="old_number">
        <el-input
          v-model="formData.old_number"
          placeholder="请输入旧的流水号"
          size="small"
          clearable
          style="width:75%"
        ></el-input>
        <el-button
          size="small"
          style="marginLeft:10px"
          type="primary"
          :disabled="!Boolean(formData.agent_uid)"
          @click="getDetailData"
        >查看</el-button>
      </el-form-item>
      <el-form-item label="新流水号：" prop="new_number">
        <el-input
          v-model="formData.new_number"
          placeholder="请输新的入流水号"
          style="width:75%"
          size="small"
          clearable
        ></el-input>
        <el-button
          size="small"
          style="marginLeft:10px"
          type="success"
          @click="replaceGoods"
          :disabled="detailTableData.length==0 || replaceStatus==true"
        >替换</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { debounce } from "@libs/tools.js";
export default {
  data() {
    return {
      debounceFunc: undefined,
      rules: {
        old_number: [
          { required: true, message: "请输入旧的流水号", trigger: "blur" }
        ],
        new_number: [
          { required: true, message: "请输入新的流水号", trigger: "blur" }
        ],
        agent_uid: [
          { required: true, message: "请填写退货客户", trigger: "change" }
        ]
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
    detailTableData: {
      type: Array
    },
    replaceStatus: {
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
    //   查看事件，获得详情表格数据
    getDetailData() {
      this.$emit("getDetailTableData");
    },
    // 替换商品
    replaceGoods() {
      this.$emit("replaceGoods");
    },
    // input单选框改变发生的事件
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
.scan-exchange-form {
  .device-type {
    display: flex;
    align-items: center;
    label {
      flex-shrink: 0;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .device-type .el-radio-group {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    label {
      margin: 5px !important;
      width: 45%;
    }
  }
}
</style>
