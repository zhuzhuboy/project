<template>
  <el-dialog
    :title="dialogData.title"
    :visible.sync="dialogShow"
    width="30%"
    @close="cancelBtn('editForm')"
    :hide-required-asterisk="true"
  >
    <el-form ref="formRef" :model="dialogData.formData" label-width="80px" :rules="formRules">
      <el-form-item label="客户姓名" prop="name">
        <el-input v-model="dialogData.formData.name" clearable placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="dialogData.formData.phone" clearable placeholder="请输入客户手机号"></el-input>
      </el-form-item>
      <el-form-item label="客户地址" prop="address">
        <el-input v-model="dialogData.formData.address" clearable placeholder="请输入客户地址"></el-input>
      </el-form-item>
      <slot />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn" size="small">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmBtn"
        size="small"
        icon="el-icon-check"
        class="dialog-cfm-btn"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validatePhone, validateName } from "@/libs/util.validator.js";
export default {
  data() {
    return {
      // 验证规格
      formRules: {
        name: [
          { required: true, message: "请填写客户姓名", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请填写客户手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写客户地址", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    //   dialog显示或隐藏
    dialogVisible: {
      type: Boolean,
      required: true
    },
    dialogData: {
      type: Object
    }
  },
  computed: {
    // 父组件维护dialog显示或隐藏。当前组件中会修改父组件传递过来的属性。所以使用计算属性。当对话框关闭，会触发父组件更新状态。重新拿到响应的值
    dialogShow: {
      get() {
        return this.dialogVisible;
      },
      set() {}
    }
  },
  methods: {
    // 取消按钮
    cancelBtn() {
      // 触发父组件的事件
      this.$emit("dialogClose");
    },
    confirmBtn() {
      this.$refs.formRef.validate(result => {
        if (result) {
          this.$emit("dialogConfirm");
        }
      });
    }
  },
  watch: {
    dialogVisible(flag) {
      // 监听dialog为true，并且form组件组件实例已存在。则移除表单验证
      if (flag && this.$refs.formRef) {
        this.$refs.formRef.clearValidate();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-cfm-btn {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
