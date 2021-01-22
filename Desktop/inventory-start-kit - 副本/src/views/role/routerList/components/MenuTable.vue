<template>
  <zk-table
    ref="table"
    sum-text="sum"
    index-text="#"
    :data="tableData"
    :columns="columns"
    :stripe="true"
    :border="true"
    :tree-type="true"
    :expandType="false"
    :selection-type="false"
  >
    <template slot="operation" scope="scope">
      <el-button type="primary" size="small" @click="editBtn(scope.row)">编辑</el-button>
    </template>
  </zk-table>
</template>

<script>
export default {
  name: "menuTable",
  data() {
    return {
      columns: [
        {
          label: "id",
          prop: "id",
          width: "100px",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "菜单名称",
          prop: "name",
          minWidth: "200px",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "关键词",
          prop: "crux",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "创建时间",
          prop: "create_time",
          minWidth: "200px",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "操作",
          minWidth: "100px",
          type: "template",
          template: "operation",
          align: "center",
          headerAlign: "center"
        }
      ]
    };
  },
  props: {
    tableData: {
      type: Array
    }
  },
  methods: {
      editBtn(row){
          this.$emit('editMenuBtn',row)
      }
  }
};
</script>

<style>
</style>
