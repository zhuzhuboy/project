<template>
  <el-dialog
    :title="data.title"
    :visible.sync="dialogShow"
    width="30%"
    @close="cancelBtn('editForm')"
  >
    <el-form ref="refForm" :model="data" label-width="100px">
      <el-form-item label="权限菜单" prop="group_name">
        <el-tree
          :props="props"
          :data="data.data"
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          style="paddingTop:6px"
        ></el-tree>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      props: {
        label: "name",
        children: "children"
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
      // 触发父组件的事件
      this.$emit("dialogClose");
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
