<template>
  <el-dialog :title="title" :visible.sync="dialogShow" width="30%" @close="cancelBtn('editForm')">
    <el-form ref="refForm" :model="data" label-width="80px" :rules="rules">
      <el-form-item label="编码" prop="code">
        <el-input v-model="data.code" clearable placeholder="请输入分类编号"></el-input>
      </el-form-item>

      <el-form-item label="分类名称" prop="name">
        <el-input v-model="data.name" clearable placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="税率" prop="tax_rate">
        <el-input v-model="data.tax_rate" clearable placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input v-model="data.remarks" clearable placeholder="请输入内容"></el-input>
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
import { validateCode } from '@libs/util.validator.js'
export default {
  data () {
    return {
      rules: {
        code: [{ validator: validateCode, trigger: 'blur' }],
        tax_rate: [{ validator: validateCode, trigger: 'blur' }]
      }
    }
  },
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
      let refDom = this.$refs.refForm
      this.$emit('confirmClick', refDom)
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
