<template>
  <el-dialog title="修改密码" :visible.sync="dialogShow" width="30%" @close="close">
    <el-form ref="refForm" :model="formData" label-width="80px" :rules="formRules">
      <el-form-item label="新的密码" prop="new_pwd">
        <el-input v-model="formData.new_pwd" clearable placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_pwd">
        <el-input v-model="formData.confirm_pwd" clearable placeholder="请再次输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkPassword, recheckPassword } from "@/libs/util.validator.js";
export default {
  data() {
    return {
      formRules: {
        new_pwd: [{ validator: checkPassword, trigger: "blur" }],
        confirm_pwd: [
          { validator: recheckPassword.bind(this), trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    formData: {
      type: Object
    }
  },
  computed: {
    dialogShow: {
      get() {
        return this.dialogVisible;
      },
      set() {}
    }
  },
  methods: {
    close() {
      this.$emit("controlDialog", false);
    },
    confirmBtn() {
      this.$refs.refForm.validate(res => {
        if (res) {
          this.$emit("handleConfirm");
        }
      });
    }
  },
  watch: {
    //   判断dialog为true,在下次更新dom时候会移除掉错误提示
    dialogVisible(flag) {
      if (flag) {
        this.$nextTick(() => {
          this.$refs.refForm.clearValidate();
        });
      }
    }
  }
};
</script>

<style>
</style>
