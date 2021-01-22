<template>
  <el-dialog
    :title="data.title"
    :visible.sync="dialogShow"
    width="30%"
    @close="cancelBtn('editForm')"
  >
    <el-form ref="refForm" :rules="rules" :model="data" label-width="80px">
      <el-form-item label="分组名称" prop="group_name">
        <el-input v-model="data.group_name" clearable placeholder="请输入分组名称" />
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-tree
          :props="props"
          :data="data.data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          style="paddingTop:6px"
        ></el-tree>
      </el-form-item>
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
        group_name: [
          { required: true, message: "请填写分组名称", trigger: "blur" }
        ]
      },
      props: {
        label: "name",
        children: "children"
      },
      isTransfer: false
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
    }
  },
  watch: {
    dialogShow(flag) {
      // 当dialog显示。并且isTransfer为true
      if (flag && !this.isTransfer) {
        this.$nextTick(() => {
          // 触发事件，事件参数是tree组件实例
          this.$emit("transmitTreegRef", this.$refs.tree);
          this.isTransfer = true;
        });
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
