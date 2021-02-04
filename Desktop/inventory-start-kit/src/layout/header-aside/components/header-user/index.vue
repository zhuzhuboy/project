<template>
  <div>
    <el-dropdown size="small" class="d2-mr">
      <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off" class="d2-mr-5" />注销
        </el-dropdown-item>
        <el-dropdown-item @click.native="modifyPassword">
          <d2-icon name="circle-o-notch" class="d2-mr-5" />修改密码
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <modify-password-dialog
      :dialogVisible="modifyDialogVisible"
      :formData="formData"
      @controlDialog="controlDialog"
      @handleConfirm="handleConfirm"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModifyPasswordDialog from "./components/modifyPassword";
import { editPwd } from "@/api/sys.login.js";
export default {
  components: {
    ModifyPasswordDialog
  },
  data() {
    return {
      modifyDialogVisible: false,
      formData: {
        new_pwd: undefined,
        confirm_pwd: undefined
      }
    };
  },

  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        confirm: true
      });
    },
    controlDialog(flag) {
      this.modifyDialogVisible = flag;
    },
    modifyPassword() {
      this.controlDialog(true);
    },
    async handleConfirm() {
      // console.log(111)
      let options = { ...this.formData };
      let res = await editPwd(options);
      this.$notify({
        title: "",
        message: res.msg,
        type: "success",
        duration: 2000
      });
      this.controlDialog(false);
      this.$router.push('/login')
    }
  }
};
</script>
