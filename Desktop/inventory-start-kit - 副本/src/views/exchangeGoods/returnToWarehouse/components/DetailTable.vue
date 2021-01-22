<template>
  <el-table border stripe :data="mateTableData" size="mini" highlight-current-row>
    <el-table-column align="center" prop="id" label="#" width="80" />
    <el-table-column align="center" label="物料编码" prop="r_goods_code" width="120" />
    <el-table-column align="center" label="物料名称" prop="r_goods_name" width="120" />
    <el-table-column align="center" label="设备规格" prop="r_spec" width="120" />
    <el-table-column align="center" label="退货数量" prop="ret_num" width="100" />
    <el-table-column align="center" label="单位" prop="unit" width="100" />

    <el-table-column align="center" label="退货单价(不含税)" prop="ret_one_price" width="120" />
    <el-table-column align="center" label="退货金额(不含税)" prop="ret_price" width="120" />
    <el-table-column align="center" label="税率" prop="tax_rate" width="120">
      <template v-slot="{row}">{{row.tax_rate.replace(/\.\d+/,'%')}}</template>
    </el-table-column>

    <el-table-column align="center" label="税金" prop="taxes" width="120" />

    <el-table-column align="center" label="含税价" prop="tax_price" width="120" />

    <el-table-column align="center" label="价税合计" prop="ret_all_price" width="120" />
    <el-table-column align="center" label="备注" prop="remarks" />

    <el-table-column align="center" label="操作" width="140">
      <template v-slot="{row}">
        <el-button type="success" size="mini" v-if="row.is_sweep==2" @click="lookUpBtn(row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    mateTableData: {
      type: Array
    }
  },
  methods: {
    lookUpBtn(row) {
      let payload = {};
      payload.id = row.id;
      this.$store.commit("d2admin/sale/getRetWareDetail", payload);
      this.$router.push("retDeviceList");
    }
  }
};
</script>

<style>
</style>
