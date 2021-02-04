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
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-form label-position="left" class="demo-table-expand" label-width="100px">
            <el-form-item label="客户姓名">
              <span>{{ row.name }}</span>
            </el-form-item>
            <el-form-item label="客户地址">
              <span>{{ row.address }}</span>
            </el-form-item>
            <el-form-item label="厂家">
              <span v-if="row.device_type==0">澳</span>
              <span v-if="row.device_type==1">云</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="#（i）" align="center" type="index" width="80" />

      <el-table-column label="启动方式" prop="is_crv" width="100" align="center">
        <template v-slot="{row}">
          <span>{{row.is_crv==0?'钥匙启动':'一键启动'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备号" prop="device_number" width="160" align="center" />

      <el-table-column label="TBox流水号" prop="serial_number"  align="center" />

      <el-table-column label="设备机型" prop="is_special" width="140" align="center">
        <template v-slot="{row}">
          <el-tag v-if="row.is_special==0">通用机型</el-tag>
          <el-tag v-if="row.is_special==1">专用机型</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="主机流水号" prop="hosts_number"  align="center" />
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
