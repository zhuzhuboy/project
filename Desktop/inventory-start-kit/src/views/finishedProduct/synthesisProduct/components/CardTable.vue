<template>
  <el-card>
    <el-alert :title="deviceNum" type="success" center :closable="false" style="marginBottom:20px"></el-alert>

    <el-table
      v-loading="false"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="#（i）" align="center" type="index" width="100" />

      <el-table-column label="厂家" prop="device_type" width="120" align="center">
        <template v-slot="{row}">
          <span>{{row.device_type==0?'澳':'云'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="启动方式" prop="is_crv" width="120" align="center">
        <template v-slot="{row}">
          <span>{{row.is_crv==0?'钥匙启动':'一键启动'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备号" prop="device_number" width="160" align="center" />

      <el-table-column label="TBox流水号" prop="serial_number" width="220" align="center" />

      <el-table-column label="设备机型" prop="is_special" width="140" align="center">
        <template v-slot="{row}">
          <el-tag v-if="row.is_special==0">通用机型</el-tag>
          <el-tag v-if="row.is_special==1">专用机型</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="主机流水号" prop="hosts_number" width="220" align="center" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  computed: {
    deviceNum() {
      return "设备计数：" + this.tableData.length;
    }
  },
  data() {
    return {
      count: 0
    };
  },
  props: {
    tableData: {
      default() {
        return [];
      },
      type: Array
    }
  }
};
</script>

<style>
</style>
