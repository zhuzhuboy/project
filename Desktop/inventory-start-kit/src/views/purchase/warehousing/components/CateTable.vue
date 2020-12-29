<template>
  <el-table
    border
    stripe
    :data="cateTableData"
    size="mini"
    highlight-current-row
    @cell-click="tableClick"
    ref="multipleTable"
  >
    <el-table-column type="index" width="60" align="center"></el-table-column>

    <el-table-column label="操作员" prop="admin_name"></el-table-column>
    <el-table-column label="待审核" prop="status" align="center">
      <template v-slot="{row}">
        <el-button size="mini" type="success" v-if="row.status" disabled>已审核</el-button>
        <el-button size="mini" type="danger" v-else @click.stop="toBeReviewedBtn">待审核</el-button>
      </template>
    </el-table-column>

    <el-table-column prop="odd_num" label="订单号"></el-table-column>

    <el-table-column prop="bus_date" label="业务时间"></el-table-column>
    <el-table-column prop="stock_name" label="仓库名称"></el-table-column>
    <el-table-column prop="p_amount" label="采购金额"></el-table-column>
    <el-table-column prop="p_taxes" label="税金"></el-table-column>
    <el-table-column prop="p_total_price" label="价税合计"></el-table-column>

    <el-table-column prop="supply_name" label=" 供货商名称"></el-table-column>
    <el-table-column prop="remarks" label="备注" width="200"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    cateTableData: {
      type: Array
    }
  },
  mounted() {
    let refDom = this.$refs.multipleTable;
    this.$emit("cateTableRef", refDom);
  },
  methods: {
    addTableRow() {},
    tableClick(row) {
      this.$store.commit('d2admin/purchase/getRecord_id',row.id)
      this.$emit("searchById", row.id);
    },
    // 待审核按钮被点击
    async toBeReviewedBtn() {
      let confirmResult = await this.$confirm(
        "此操作将永久删除该选项, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if(confirmResult==="confirm"){
        // 确认了，请求数据
        alert('ds')
      }
    }
  }
};
</script>

<style>
</style>
