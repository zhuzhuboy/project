<template>
  <el-card>
    <editForm
    @getFormRef="(ref)=>$emit('getFormRef',ref)" :formSel="formSel"
    ref="editFormRef"
     />
    <EditTable
      :listLoading="listLoading"
      :tableData="tableData"
      :listTable="listTable"
      @addInfo="$emit('addInfo')"
      @deleteInfo="index=>$emit('deleteInfo',index)"
    />
  </el-card>
</template>

<script>
import editForm from './EditForm'
import EditTable from './EditTable'
export default {
  components: {
    editForm,
    EditTable
  },
  props: {
    listLoading: {
      type: Boolean
    },
    tableData: {
      type: Array
    },
    formSel: {
      type: Object
    },
    listTable: {
      type: Array
    }
  },
  mounted () {
    this.$emit('getEditFormRef', this.$refs.editFormRef)
  }
}
</script>

<style>
</style>
