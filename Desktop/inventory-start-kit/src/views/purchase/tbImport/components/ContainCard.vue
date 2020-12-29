<template>
  <el-card>
    <el-table
      :data="table.data"
      row-key="id"
      :stripe="table.stripew"
      :border="table.border"
      v-loading="listLoading"
      @row-click="rowClick"
    >
      <el-table-column
        v-for="item in table.columns"
        :prop="item.prop"
        :label="item.label"
        v-if="item.prop"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    table: {},
    listLoading: {
      type: Boolean
    }
  },
  mounted() {
    console.log(this.table);
  },
  methods: {
    rowClick() {
      console.log(this.table);
    }
  }
};
</script>

<style>
</style>
