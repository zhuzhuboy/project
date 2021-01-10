<template>
  <el-card>
    <el-alert type="success" center :closable="false" style="marginBottom:20px">
      <span style="margin-left:10px;color:black">应扫设备</span>
      <span style="color:red">{{this.s_purchase_num}}</span>
    </el-alert>

    <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column align="center" type="index" label="#(i)" width="80" />

      <el-table-column align="center" prop="type" label="设备类型" width="180">
        <template v-slot="{row}">
          <span v-if="row.type==0">TBox</span>
          <span v-else>主机</span>
        </template>
      </el-table-column>
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
      <el-table-column align="center" prop="is_special" label="设备机型" v-if="scan_type!=1">
        <template v-slot="{row}">
          <span v-if="row.is_special==0">通用机型</span>
          <span v-else>专用机型</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="scan_type!=2 && scan_type!=4"
        align="center"
        prop="device_number"
        label="设备号"
      ></el-table-column>
      <el-table-column v-if="scan_type!=1" align="center" prop="hosts_number" label="主机流水号"></el-table-column>
      <el-table-column v-if="scan_type==1" align="center" prop="serial_number" label="TBox流水号"></el-table-column>
      <el-table-column
        v-if="scan_type!=1 && scan_type!=3"
        align="center"
        prop="car_model_remarks"
        label="专用机备注"
        width="180"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="{row,$index}">
          <el-button type="danger" size="small" @click="deleteBtn($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- v-if="scan_type==2||scan_type==4"
    v-if="scan_type==3"-->
  </el-card>
</template>

<script>
export default {
  props: {
    //   数量
    s_purchase_num: {
      type: Number
    },
    // 名称

    // 根据不同类型。显示不同的表格
    scan_type: {},
    // 表格数据
    tableData: {
      type: Array
    }
  },
  methods: {
    deleteBtn(i) {
      this.$emit("deleteItem", i);
    }
  }
};
</script>

<style>
</style>
