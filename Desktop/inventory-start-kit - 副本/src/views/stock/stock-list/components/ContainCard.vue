<template>
  <el-card>
    <el-card class="box-card" style="margin-bottom:20px" v-if="showDetailInfo">
      <el-row :gutter="10">
        <el-col :span="4">
          <div>
            订单号：
            <el-tag>{{purchaseInfo.odd_num}}</el-tag>
          </div>
        </el-col>

        <el-col :span="4">
          <div>
            名称：
            <el-tag>{{detailInfo.goods_name}}</el-tag>
          </div>
        </el-col>

        <el-col :span="4">
          <div>
            型号：
            <el-tag>{{detailInfo.spec}}</el-tag>
          </div>
        </el-col>

        <el-col :span="3">
          <div>
            状态：
            <el-tag v-if="purchaseInfo.status==0">待审核</el-tag>
            <el-tag v-else type="success">已审核</el-tag>
          </div>
        </el-col>

        <el-col :span="3">
          <div>
            时间：
            <el-tag>{{purchaseInfo.bus_date}}</el-tag>
          </div>
        </el-col>

        <el-col :span="4">
          <div>
            数量：
            <el-tag>{{detailInfo.purchase_num}}台</el-tag>
          </div>
        </el-col>
      </el-row>
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
  },
  created() {
    console.log(this.purchaseInfo);
  },
  watch: {
    showDetailInfo(val) {
      console.log(val);
    }
  }
};
</script>

<style>
</style>
