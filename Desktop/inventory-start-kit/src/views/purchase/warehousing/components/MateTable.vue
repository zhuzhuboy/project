<template>
  <el-table
    border
    stripe
    :data="mateTableData"
    size="mini"
    highlight-current-row
    @cell-click="tableClick"
  >
    <el-table-column type="index" width="60" align="center"></el-table-column>

    <el-table-column label="物料编码" prop="goods_code"></el-table-column>

    <el-table-column prop="goods_name" label="物料名称"></el-table-column>

    <el-table-column prop="spec" label="规格型号"></el-table-column>

    <el-table-column prop="purchase_num" label="购买数量"></el-table-column>

    <el-table-column prop="one_price" label="采购单价"></el-table-column>

    <el-table-column prop="tax_rate" label="税率">
      <template v-slot="{row}">{{row.tax_rate.replace(/\.\w+/ig,'%')}}</template>
    </el-table-column>

    <el-table-column prop="taxes" label="税价"></el-table-column>

    <el-table-column prop="tax_price" label="含税价"></el-table-column>

    <el-table-column prop="total_tax_price" label="价税合计"></el-table-column>

    <el-table-column prop="unit" label="单位"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="{row}">
        <el-button :disabled="!row.is_import" type="primary" size="mini">导入（{{row.device_num}}）</el-button>
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
    tableClick(row) {
      this.$emit("searchById", row.id);
    }
  }
};
</script>

<style>
</style>
