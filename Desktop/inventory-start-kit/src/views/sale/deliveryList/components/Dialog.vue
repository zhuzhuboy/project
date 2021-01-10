<template>
  <el-dialog :title="title" :visible.sync="dialogShow" width="30%" @close="cancelBtn('editForm')" :modal-append-to-body="false" :modal="false">
    <el-form ref="refForm" :model="data" label-width="80px">
      <el-form-item label="编号" prop="num">
        <el-input v-model="data.num" clearable placeholder="请输入仓库编号"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="stock_name">
        <el-input v-model="data.stock_name" clearable placeholder="请输入仓库名称"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="data.address" clearable placeholder="请输入仓库地址"></el-input>
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
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object
    },
    title: {
      type: String
    }
  },
  computed: {
    // 父组件维护dialog显示或隐藏。当前组件中会修改父组件传递过来的属性。所以使用计算属性。当对话框关闭，会触发父组件更新状态。重新拿到响应的值
    dialogShow: {
      get () {
        return this.dialogVisible
      },
      set () {}
    }
  },
  methods: {
    // 取消按钮
    cancelBtn () {
      // 表单重置
      this.$refs.refForm.resetFields()
      // 触发父组件的事件
      this.$emit('dialogClose')
    },
    confirmBtn () {
      this.$emit('confirmClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-cfm-btn {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
