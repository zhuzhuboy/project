<template>
  <el-table
    :data="tableData"
    style="margin-bottom: 20px; float:left"
    row-key="id"
    border
    v-loading="listLoading"
  >
    <el-table-column prop="id" label="#" align="center" width="80px" />
    <el-table-column prop="group_id" label="分组id" align="center" width="80px" />
    <el-table-column prop="admin_name" label="管理员名称" width="180" align="center" />
    <el-table-column prop="username" label="用户名" width="180" align="center" />
    <el-table-column prop="group" label="分组" width="180" align="center" />
    <el-table-column prop="status" label="状态" align="center">
      <template v-slot="{row}">
        <el-tag v-if="row.status==1">状态1</el-tag>
        <el-tag v-else>无状态</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="create_time" label="创建时间" align="center" />
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
