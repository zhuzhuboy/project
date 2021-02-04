<template>
  <el-card>
    <editForm
      :formData="formData"
      :form="form"
      :isEdit="isEdit"
      @getFormRef="(ref)=>$emit('getFormRef',ref)"
    />
    <EditTable
      :tableData="tableData"
      :formData="formData"
      :isEdit="isEdit"
      @addInfo="$emit('addInfo')"
      @deleteInfo="index=>$emit('deleteInfo',index)"
    />
  </el-card>
</template>

<script>
import editForm from "./EditForm";
import EditTable from "./EditTable";
export default {
  components: {
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
    tableData: {
      type: Array
    },
    isEdit: {
      type: Boolean
    },
    getTableDataByVuex: {
      type: Object
    }
  }
};
</script>

<style>
</style>
