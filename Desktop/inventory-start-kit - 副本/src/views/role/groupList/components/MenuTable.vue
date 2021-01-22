<template>
  <!-- <zk-table
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
  </zk-table>-->
  <el-table
    :data="tableData"
    style="margin-bottom: 20px; float:left"
    row-key="id"
    border
    v-loading="listLoading"
  >
    <el-table-column prop="id" label="#" align="center" width="80px"></el-table-column>

    <el-table-column prop="group_name" label="分组名称" width="180" align="center"></el-table-column>
    <el-table-column prop="label_names" label="目录名称" align="center"></el-table-column>
    <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
    <el-table-column label="操作" width="160" align="center">
      <template v-slot="{row}">
        <el-button type="primary" size="small" @click="editBtn(row)">编辑</el-button>
        <el-button type="success" size="small" @click="lookUp(row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "menuTable",
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array
    },
    listLoading: {
      type: Boolean
    }
  },
  methods: {
    editBtn(row) {
      this.$emit("editMenuBtn", row);
    },
    lookUp(row) {
      this.$emit("lookup", row);
    }
  }
};
</script>

<style>
</style>
