<template>
  <el-card>
    <el-alert type="success" center :closable="false" style="marginBottom:20px" title="设备详情"></el-alert>

    <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column align="center" type="index" label="#(i)" width="80" />
      <el-table-column align="center" prop="full_agent_area" label="代理地区" width="180"></el-table-column>

      <el-table-column align="center" prop="type" label="设备类型" width="180">
        <template v-slot="{row}">
          <span v-if="row.type==0">TBox</span>
          <span v-else>主机</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="number_dev" label="流水号" width="180"></el-table-column>
      <el-table-column align="center" prop="device_type" label="厂家" width="180">
        <template v-slot="{row}">
          <span v-if="row.device_type==0">澳多</span>
          <span v-else>云掌行</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_crv" label="启动方式">
        <template v-slot="{row}">
          <span v-if="row.is_crv==0">钥匙启动</span>
          <span v-else>一键启动</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_special" label="设备机型">
        <template v-slot="{row}">
          <span v-if="row.is_special==0">通用机型</span>
          <span v-if="row.is_special==1">专用机型</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template v-slot="{row,$index}">
          <el-button type="danger" size="small" @click="deleteBtn($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    // 表格数据
    tableData: {
      type: Array
    }
  },
  methods: {
    //   触发删除事件
    deleteBtn(i) {
      this.$emit("deleteItem", i);
    }
  }
};
</script>

