<template>
  <el-card>
    <menu-table v-bind="$attrs" v-on="$listeners" />
  </el-card>
</template>

<script>
import MenuTable from "./MenuTable";
export default {
  components: {
    MenuTable
  }
};
</script>

<style>
</style>
