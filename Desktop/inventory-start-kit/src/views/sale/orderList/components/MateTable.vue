<template>
  <el-table border stripe :data="mateTableData" size="mini" highlight-current-row>
    <el-table-column align="center" prop="id" label="#" />
    <el-table-column align="center" label="物料编码" prop="s_goods_code" />
    <el-table-column align="center" prop="s_goods_name" label="物料名称" />
    <el-table-column align="center" prop="s_purchase_num" label="购买数量" />
    <el-table-column align="center" prop="s_unit" label="单位" />
    <el-table-column align="center" prop="s_spec" label="规格型号" />
    <el-table-column align="center" prop="s_one_price" label="单价" />
    <el-table-column align="center" prop="s_all_price" label="总价" />
    <el-table-column align="center" label="税率">
      <template v-slot="{row}">{{row.s_tax_rate.replace(/\.\w+/ig,'%')}}</template>
    </el-table-column>

    <el-table-column align="center" prop="s_taxes" label="税价" />
    <el-table-column align="center" prop="s_tax_price" label="含税价" />
    <el-table-column align="center" prop="s_total_tax_price" label="价税合计" />

    <el-table-column align="center" label="操作">
      <template v-slot="{row}">
        <el-button
          v-if="row.is_scan==1"
          type="danger"
          size="mini"
          @click="deliveryBtn(row)"
        >出库（{{row.s_device_num}}）</el-button>
        <el-button
          v-if="row.is_scan==2"
          type="success"
          size="mini"
          @click="lookUpBtn(row)"
        >查看（{{row.s_device_num}}）</el-button>
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
    //  出库按钮
    deliveryBtn(row) {
      this.$emit("modifyDrawerShow", false);

      // 别的界面需用用到这个行数据，所以需要把它保存起来
      let payload = {};
      payload.is_crv = row.is_crv;
      payload.scan_type = row.scan_type;
      payload.s_goods_name = row.s_goods_name;
      payload.id = row.id;
      payload.s_purchase_num = row.s_purchase_num;
      this.$store.commit("d2admin/sale/getDetailTableInfo", payload);
      // 设置出库按钮的状态。点击后为true
      this.$store.commit("d2admin/sale/getDeliveryStatus", true);

      this.$router.push("delivery");
    },
    // 查看按钮
    lookUpBtn(row) {
      this.$emit("modifyDrawerShow", false);
      let payload = {};
      payload.id = row.id;
      payload.s_goods_name = row.s_goods_name;
      payload.s_purchase_num = row.s_purchase_num;
      this.$store.commit("d2admin/sale/getDetailTableInfo", payload);
      this.$store.commit("d2admin/sale/getLookUpStatus", true);
      this.$router.push("deliveryList");
    }
  }
};
</script>


