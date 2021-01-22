<template>
  <el-card style="width:100%">
    <el-table
      v-loading="listLoading"
      :data="lists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" prop="id" label="#" width="60" />
      <el-table-column align="center" label="厂家">
        <template v-slot="{row}">
          <span>{{row.device_type==0?'澳多':'云掌行'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务日期" prop="bus_date" />
      <el-table-column align="center" label="代理地区" prop="agent_area" />

      <el-table-column align="center" label="设备类型" >
        <template v-slot="{row}">
          <span>{{row.type==0?' TBox':'主机'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="TBox流水号" prop="serial_number" />
      <el-table-column align="center" label="主机流水号" prop="hosts_number" />

      <el-table-column align="center" label="创建时间" prop="create_time" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    listLoading: {
      type: Boolean
    },
    lists: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
