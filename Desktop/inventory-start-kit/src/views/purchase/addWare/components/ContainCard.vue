<template>
  <el-card >
  <editForm :formData="formData" :form="form" @getFormRef="(ref)=>$emit('getFormRef',ref)" />
  <EditTable :tableData="tableData" :formData="formData" @addInfo="$emit('addInfo')" @deleteInfo="index=>$emit('deleteInfo',index)"/>
  </el-card>
</template>

<script>
import editForm from './EditForm'
import EditTable from './EditTable'
export default {
  components:{
    editForm,
    EditTable
  },
  props: {
    listLoading: {
      type: Boolean
    },
    form: {
      type: Object
    },
    formData: {
      type: Object
    },
    tableData:{
      type:Array
    },
  }
};
</script>

<style>
</style>
