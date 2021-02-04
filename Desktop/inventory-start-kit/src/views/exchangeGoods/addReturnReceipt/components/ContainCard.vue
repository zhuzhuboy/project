<template>
  <el-card>
    <edit-form v-bind="$attrs" v-on="$listeners" ref="editFormRef" />

    <edit-table v-bind="$attrs" v-on="$listeners" />
    <dialog-table v-bind="$attrs" v-on="$listeners" />
  </el-card>
</template>

<script>
import EditForm from "./EditForm";
import EditTable from "./EditTable";
import DialogTable from "./dialogTable";
export default {
  components: {
    EditForm,
    EditTable,
    DialogTable
  },
  mounted() {
    this.$emit("getEditFormRef", this.$refs.editFormRef);
  },
  methods: {}
};
</script>

<style>
</style>
