<template>
  <el-table :data="tableList" border stripe v-loading="listLoading" element-loading-text="Loading">
    <el-table-column prop="id" label="#" width="100" align="center"></el-table-column>

    <el-table-column label="厂家" width="100" align="center">
      <template v-slot="{row}">
        <el-tag v-if="row.device_type==0">澳</el-tag>
        <el-tag type="warning" v-else>云</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="120" align="center">
      <template v-slot="{row}">{{row.type==0?"TBox":"主机"}}</template>
    </el-table-column>
    <el-table-column prop="device_number" label="设备号" width="180" align="center"></el-table-column>
    <el-table-column prop="serial_number" label="TBox 流水号" width="200" align="center"></el-table-column>
    <el-table-column label="启动类型" width="150" align="center">
      <template v-slot="{row}">
        <el-tag type="info" v-if="row.is_crv==0">钥匙启动</el-tag>
        <el-tag type="success" v-if="row.is_crv==1">一键启动</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="设备机型" width="150" align="center">
      <template v-slot="{row}">
        <el-tag type="info" v-if="row.is_special==0">通用机型</el-tag>
        <el-tag type="success" v-if="row.is_special==1">专用机型</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="hosts_number" label="主机号" width="180" align="center"></el-table-column>

    <el-table-column label="创建时间" align="center" width="160">
      <template v-slot="{row}">{{row.create_time}}</template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array
    },
    listLoading: {
      type: Boolean
    }
  }
};
</script>

<style>
</style>
