<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="listQuery"
        ref="d2HeaderFormRef"
        size="small"
        style="margin-bottom: -20px;"
      >
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="shuaxin" size="small">刷新</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleFilter" icon="el-icon-search" size="small">查找</el-button>
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
      //   let res = await new Promise((res, rej) => {
      //     let time = parseInt(Math.random() * 1000 + 500);
      //     setTimeout(() => {
      //       let data = [
      //         {
      //           date: "2016-05-02",
      //           name: "王小虎",
      //           address: "上海市普陀区金沙江路 1518 弄"
      //         },
      //         {
      //           date: "2016-05-04",
      //           name: "王小虎",
      //           address: "上海市普陀区金沙江路 1517 弄"
      //         },
      //         {
      //           date: "2016-05-01",
      //           name: "王小虎",
      //           address: "上海市普陀区金沙江路 1519 弄"
      //         },
      //         {
      //           date: "2016-05-03",
      //           name: "王小虎",
      //           address: "上海市普陀区金沙江路 1516 弄"
      //         }
      //       ];
      //       res(data);
      //     }, time);
      //   });
      //   this.listLoading = false;
      //   this.tableData = res;
      //   return;

      this.listLoading = true;
      let res = await ableLists(this.listQuery);
      console.log(res);
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
.row-margin {
  margin-top: 20px;
}
</style>
