<template>
  <el-table
    border
    stripe
    :data="mateTableData"
    size="mini"
    highlight-current-row
    fit
    v-loading="listLoading"
    element-loading-text="加载中"
  >
    <el-table-column type="index" width="60" align="center" />

    <el-table-column align="center" label="物料编码" prop="goods_code" width="120" />
    <el-table-column align="center" label="物料名称" prop="goods_name" />

    <el-table-column align="center" label="规格型号" prop="spec" />

    <el-table-column align="center" label="购买数量" prop="purchase_num" width="140" />

    <el-table-column align="center" label="采购单价" prop="one_price" width="140" />

    <el-table-column align="center" label="采购金额" prop="all_price" width="140" />

    <el-table-column align="center" label="含税价" prop="tax_price" width="140" />

    <el-table-column align="center" label="税率" width="120">
      <template v-slot="{row}">{{row.tax_rate.replace(/\.\w+/ig,'%')}}</template>
    </el-table-column>

    <el-table-column align="center" label="税金" prop="taxes" width="140" />

    <el-table-column align="center" prop="total_tax_price" label="价税合计" width="140" />

    <el-table-column align="center" prop="unit" label="单位" width="100" />
    <el-table-column align="center" label="操作" width="140">
      <template v-slot="{row}">
        <el-button
          v-if="row.is_import==1"
          type="primary"
          size="mini"
          @click="importTable(row)"
        >导入（{{row.device_num}}）</el-button>
        <el-button
          v-if="row.is_import==2"
          :disabled="!row.is_import"
          type="success"
          size="mini"
          @click="lookUp(row)"
        >查看（{{row.device_num}}）</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    mateTableData: {
      type: Array
    },
    listLoading: {
      type: Boolean
    }
  },
  methods: {
    importTable(row) {
      console.log(row);
      // 别的界面需用用到这个行数据的id，所以需要把它保存起来
      this.$store.commit("d2admin/purchase/getDetails_id", row.id);
      // 设置import按钮状态，进入时候状态为true
      this.$store.commit("d2admin/purchase/getImportStatus", true);
      this.$store.commit(
        "d2admin/purchase/getDetails_goodsName",
        row.goods_name
      );
      this.$router.push("tbImport");
    },
    // 查看
    lookUp(row) {
      console.log(row);
      let payload = {};
      payload.goods_name = row.goods_name;
      payload.spec = row.spec;
      payload.purchase_num = row.purchase_num;
      payload.id = row.id;
      this.$store.commit("d2admin/purchase/getDetailInfo", payload);
      this.$store.commit("d2admin/purchase/getIsLookUp", true);
      this.$router.push("stockList");
    }
  }
};
</script>

<style>
</style>
