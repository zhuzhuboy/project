<template>
  <el-dialog
    :title="data.title"
    :visible.sync="dialogShow"
    width="50%"
    @close="cancelBtn('editForm')"
    class="admin-form-dialog"
  >
    <el-form ref="refForm" :rules="rules" :model="data" label-width="100px">
      <el-form-item label="管理员名称" prop="admin_name">
        <el-input v-model="data.admin_name" clearable placeholder="请输入管理员名称" />
      </el-form-item>
      <el-form-item label="管理员账号" prop="username">
        <el-input v-model="data.username" clearable placeholder="请输入管理员账号" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="password" v-if="data.title=='新增账户' ">
        <el-input type="password" v-model="data.password" clearable placeholder="请输入管理员密码" />
      </el-form-item>
      <el-form-item label="管理员密码" v-else>
        <el-input type="password" v-model="data.password" clearable placeholder="编辑可不填写密码" />
      </el-form-item>
      <el-row class="row-card">
        <el-col :span="12">
          <el-form-item label="分配权限组" prop="group_id">
            <el-radio-group v-model="data.group_id" size="small" @change="change">
              <el-radio
                :label="group.group_id"
                border
                v-for="group in data.radioGroup"
                :key="group.group_id"
              >{{group.group_name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限菜单" prop="group_name">
            <el-tree
              :props="props"
              :data="treeData"
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              style="paddingTop:6px"
            ></el-tree>
          </el-form-item>
        </el-col>
      </el-row>
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
import { groupSeeMenu } from "@/api/role/adminAccount.js";
export default {
  data() {
    return {
      rules: {
        admin_name: [
          { required: true, message: "请填写账户名称", trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      //   属性组件需要参数
      props: {
        label: "name",
        children: "children"
      },
      treeData: undefined
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    data: {
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
      // 表单重置
      this.$refs.refForm.resetFields();
      // 触发父组件的事件
      this.$emit("dialogClose");
    },
    confirmBtn() {
      let formRef = this.$refs.refForm;
      this.$emit("confirmClick", formRef);
    },
    // 单选发生改变时候触发
    async change(id) {
      let res = await groupSeeMenu({
        id
      });
      this.treeData = res.data.groupMenu;
    }
  },
  watch: {
    dialogVisible(flag) {
      if (flag && this.data.group_id) {
        this.change(this.data.group_id);
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
// 自定义的class
.admin-form-dialog ::v-deep {
  .el-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
  }
  .el-radio-group {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    .el-radio {
      margin: 0 10px !important;
    }
  }
  .row-card {
    display: flex;
    .el-col {
      border: 1px solid #f4f4f1;
      margin: 0 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding-top: 10px;
      border-radius: 5px;
    }

  }
}
</style>
