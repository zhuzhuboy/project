<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="listQuery"
        ref="listQuery"
        size="small"
        style="margin-bottom: -20px;"
      >
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="shuaxin" size="small">刷新</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <contain-card :tableData="tableData" :listLoading="listLoading" />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import ContainCard from "./components/ContainCard";
import { ableLists } from "@/api/finishedProduct/productList";
export default {
  components: {
    ContainCard
  },

  data() {
    return {
      tableData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        num: undefined,
        supply_name: undefined
      },
      listLoading: true
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 刷新
    shuaxin() {
      this.getList();
    },

    // 获取数据
    async getList() {
      this.listLoading = true;
      let res = await ableLists(this.listQuery);
      this.tableData = res.data.list;
      this.total = res.data.total;
      this.listLoading = false;
    },

    // 搜索按鈕
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
