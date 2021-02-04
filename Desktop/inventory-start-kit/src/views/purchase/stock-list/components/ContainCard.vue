<template>
  <el-card style="width:90%">
    <el-card class="box-card" style="margin-bottom:20px" v-if="showDetailInfo">
      <div class="info-flex">
        <div class="info-item">
          订单号：
          <el-tag>{{purchaseInfo.odd_num}}</el-tag>
        </div>

        <div class="info-item">
          名称：
          <el-tag>{{detailInfo.goods_name}}</el-tag>
        </div>

        <div class="info-item">
          型号：
          <el-tag>{{detailInfo.spec}}</el-tag>
        </div>

        <div class="info-item">
          状态：
          <el-tag v-if="purchaseInfo.status==0">待审核</el-tag>
          <el-tag v-else type="success">已审核</el-tag>
        </div>

        <div class="info-item">
          时间：
          <el-tag>{{purchaseInfo.bus_date}}</el-tag>
        </div>

        <div class="info-item">
          数量：
          <el-tag>{{detailInfo.purchase_num}}台</el-tag>
        </div>
      </div>
    </el-card>
    <stock-table :tableList="tableList" :listLoading="listLoading" />
  </el-card>
</template>

<script>
import StockTable from "./StockTable";
export default {
  components: {
    StockTable
  },
  props: {
    tableList: {
      type: Array
    },
    listLoading: {
      type: Boolean
    },
    showDetailInfo: {
      type: Boolean
    }
  },
  computed: {
    //   是否是采购页面点击查看按钮跳转过来的
    purchaseInfo() {
      return this.$store.state.d2admin.purchase.purchaseInfo;
    },
    // 详情信息
    detailInfo() {
      return this.$store.state.d2admin.purchase.detailInfo;
    }
  }
};
</script>



<style lang="scss" scoped>
.info-flex {
  display: flex;
  justify-content: space-around;
  .info-item {
    margin: 0 10px;
  }
}
</style>
