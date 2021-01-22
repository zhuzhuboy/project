<template>
  <el-dialog
    :title="data.title"
    :visible.sync="dialogShow"
    width="30%"
    @close="cancelBtn('editForm')"
  >
    <el-form ref="refForm" :model="data" label-width="80px" :rules="rules">
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="data.pid" clearable placeholder="请选择上级菜单">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in data.firstSelectArr"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="data.name" clearable placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="权限单词" prop="crux">
        <el-input v-model="data.crux" clearable placeholder="请输入权限单词"></el-input>
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
export default {
  data() {
    return {
      rules: {
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
        crux: [
          {
            required: true,
            message: "请填写权限单词",
            trigger: "blur"
          }
        ]
      }
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
      this.$refs.refForm.resetFields();
      // 触发父组件的事件
      this.$emit("dialogClose");
    },
    confirmBtn() {
      this.$emit("confirmClick", this.$refs.refForm);
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
