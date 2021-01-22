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
        <el-form-item label="ID" prop="id">
          <el-input v-model="listQuery.id" placeholder="输入ID" clearable style="width: 100px;" />
        </el-form-item>
        <el-form-item label="编号" prop="num">
          <el-input v-model="listQuery.num" placeholder="输入编号" clearable style="width: 120px;" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="supply_name">
          <el-input
            v-model="listQuery.supply_name"
            placeholder="请输入名称"
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
      :editDialogVisible="editDialogVisible"
      @addDialog="addDialog"
      @editDialog="editDialog"
    />

    <!-- 底部 -->
    <template slot="footer">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList()"
      />
    </template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/ContainCard";
import { comLists, comSaveEd } from "@/api/info/supplier.js";

export default {
  components: {
    Pagination,
    ContainCard
  },

  data() {
    return {
      lists: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        num: undefined,
        supply_name: undefined
      },
      listLoading: true,
      addDialogVisible: false, // 新增对话框
      editDialogVisible: false // 编辑对话框
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 刷新

    shuaxin() {
      // 表单重置
      this.$refs.listQuery.resetFields();
      //   请求参数
      let listQuery = {
        page: 1,
        limit: 10
      };
      this.getList(listQuery);
    },

    // 获取数据
    async getList(option) {
      this.listLoading = true;
      let res = await comLists(option ? option : this.listQuery);
      this.lists = res.data.list;
      this.total = res.data.total;
      this.listLoading = false;
    },
    // 添加按钮
    addBtn() {
      this.addDialogVisible = true;
    },

    addDialog(flag) {
      this.addDialogVisible = flag;
    },
    editDialog(flag) {
      this.editDialogVisible = flag;
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
