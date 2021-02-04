<template>
  <el-card>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="lists"
      fit
      border
      highlight-current-row
    >
      <el-table-column align="center" prop="id" label="#" width="100" />

      <el-table-column align="center" prop="name" label="客户姓名" width="120" />
      <el-table-column align="center" prop="address" label="客户地址" />
      <el-table-column align="center" prop="old_number" label="旧流水号"></el-table-column>
      <el-table-column align="center" prop="new_number" label="新流水号"></el-table-column>
      <el-table-column align="center" prop="is_crv" label="启动方式" width="120">
        <template v-slot="{row}">
          <span v-if="row.is_crv==0">钥匙启动</span>
          <span v-else>一键启动</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="设备类型" width="120">
        <template v-slot="{row}">
          <span v-if="row.type==0">TBox</span>
          <span v-else>主机</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sale_device_id" label="销售设备id" width="100"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间" width="180"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },

  props: {
    listLoading: {
      type: Boolean
    },
    lists: {
      type: Array
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
