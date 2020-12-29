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
        <!-- 按钮区 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="shuaxin" size="small">刷新</el-button>
        </el-form-item>
        <!-- 新增按钮 -->
        <el-form-item>
          <el-button type="success" @click="addBtn" icon="el-icon-edit" size="small">新增</el-button>
        </el-form-item>
        <!-- id搜索 -->
        <el-form-item label="ID">
          <el-input v-model="listQuery.id" placeholder="请输入" clearable style="width: 100px;" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="listQuery.num" placeholder="请输入" clearable style="width: 100px;" />
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-input
            v-model="listQuery.stock_name"
            placeholder="请输入"
            clearable
            style="width: 120px;"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleFilter" icon="el-icon-search">查找</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      @getList="getList"
      :lists="lists"
      :listLoading="listLoading"
      :addDialogVisible="addDialogVisible"
      @addDialog="addDialog"
    />

    <!-- 底部 -->
    <template slot="footer">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="gopage"
      />
    </template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/ContainCard";
import { stockList } from "@/api/warehouse.js";

export default {
  components: {
    Pagination,
    ContainCard
  },

  data() {
    return {
      lists: [],
      total: 0,
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10,
        stock_name: undefined,
        num: undefined,
        id:undefined
      },
      listLoading: true,
      addDialogVisible: false // 新增对话框
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
      let res = await stockList(this.listQuery);
      this.lists = res.data.list;
      this.total = res.data.total;
      this.listLoading = false;
    },
    gopage(val) {
      console.log(val);
      (this.listQuery.id = undefined), (this.listQuery.stock_name = undefined);
      this.listQuery.page = val.page;
      this.listQuery.limit = val.limit;
      console.log(this.listQuery);
      this.getList();
    },
    // 添加按钮
    addBtn() {
      this.addDialogVisible = true;
    },
    addDialog(flag) {
      this.addDialogVisible = flag;
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
