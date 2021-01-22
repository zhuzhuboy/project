<template>
  <el-card>
    <admin-table v-bind="$attrs" v-on="$listeners" />
  </el-card>
</template>

<script>
import AdminTable from "./adminTable";
export default {
  components: {
    AdminTable
  }
};
</script>

<style>
</style>
