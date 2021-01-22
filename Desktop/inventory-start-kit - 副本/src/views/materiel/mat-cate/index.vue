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
          <el-button type="success" @click="addDialog(true)" icon="el-icon-edit" size="small">新增</el-button>
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
        @pagination="getList"
      />
    </template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/ContainCard";
import { gCateList } from "@/api/materiel/materiel.js";

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
        limit: 10
      },
      listLoading: undefined,
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
      this.listQuery.id = undefined;
      this.listQuery.name = undefined;
      this.getList();
    },

    // 获取数据
    async getList() {
      this.listLoading = true;
      let res = await gCateList(this.listQuery);
      this.lists = res.data.list;
      this.total = res.data.total;
      this.listLoading = false;
    },

    addDialog(flag) {
      this.addDialogVisible = flag;
    },
    editDialog(flag) {
      this.editDialogVisible = flag;
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
