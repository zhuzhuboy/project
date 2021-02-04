<template>
  <el-card style="width:80%">
    <customer-table v-on="$listeners" v-bind="$attrs" />
  </el-card>
</template>

<script>
import CustomerTable from "./CustomerTable";
export default {
  components: {
    CustomerTable
  }
};
</script>

<style lang="scss" scoped>

</style>
