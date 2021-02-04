<template>
  <el-card >
    <el-table
      v-loading="false"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column label="#" align="center" prop="id" width="80" />

      <el-table-column label="客户姓名" align="center" prop="name" width="90" />
      <el-table-column label="客户地址" align="center" prop="address" width="100" />

      <el-table-column label="厂家" prop="device_type" width="100" align="center">
        <template v-slot="{row}">
          <span>{{row.device_type==0?'澳':'云'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="启动方式" prop="is_crv" width="110" align="center">
        <template v-slot="{row}">
          <span>{{row.is_crv==0?'钥匙启动':'一键启动'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备号" prop="device_number" width="160" align="center" />

      <el-table-column label="TBox流水号" prop="serial_number" width="120" align="center" />

      <el-table-column label="设备机型" prop="is_special" width="120" align="center">
        <template v-slot="{row}">
          <el-tag v-if="row.is_special==0">通用机型</el-tag>
          <el-tag v-if="row.is_special==1">专用机型</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="主机流水号" prop="hosts_number" width="140" align="center" />

      <el-table-column label="专用机备注" align="center" prop="car_model_remarks" />

      <el-table-column label="导入时间" prop="create_time" width="100" align="center" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    listLoading: {
      listLoading: Boolean
    }
  }
};
</script>

<style>
</style>
