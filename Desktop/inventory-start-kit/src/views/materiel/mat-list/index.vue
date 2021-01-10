<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="matListQuery"
        ref="matListQuery"
        size="small"
        style="margin-bottom: -20px;"
      >
        <!-- 按钮区 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="shuaxin" size="small">刷新</el-button>
        </el-form-item>
        <!-- 新增按钮 -->
        <el-form-item>
          <el-button type="success" @click="addDialog(true)" icon="el-icon-edit" size="small">新增物料</el-button>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="matListQuery.id" placeholder="请输入ID" clearable style="width: 100px;" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="matListQuery.code" placeholder="请输入" clearable style="width: 100px;" />
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input
            v-model="matListQuery.goods_name"
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
      :cateLists="cateLists"
      :matList="matList"
      :tableLoading="tableLoading"
      :addDialogVisible="addDialogVisible"
      :formSelect="formSelect"
      @getList="getList"
      @addDialog="addDialog"
      @modifyCurCate="modifyCurCate"
    />

    <!-- 底部 -->
    <template slot="footer">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="matListQuery.page"
        :limit.sync="matListQuery.limit"
        @pagination="getList"
      />
    </template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
import { gCateList, goodsLists } from "@/api/materiel/materiel.js";
import Pagination from "@/components/Pagination/index.vue";

export default {
  components: {
    ContainCard,
    Pagination
  },

  data() {
    return {
      // 分类列表
      cateLists: undefined,
      // 物料列表
      matList: [],
      // 物料列表option
      matListQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        category_id: undefined, //根据不同id渲染详情页
        goods_name: undefined,
        code: undefined
      },
      //   表格loading状态。由于分类和列表都在同一API接口得到。所以只用一个表格loading状态
      tableLoading: false,
      addDialogVisible: false, // 新增对话框
      total: 0,
      formSelect: {} //form表单下拉选项
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 刷新
    shuaxin() {
      // 刷新功能请求不带查询条件的第一页参数
      this.matListQuery.code = undefined;
      this.matListQuery.name = undefined;
      this.matListQuery.id = undefined;
      this.matListQuery.page = 1;
      this.getList();
    },
    // 获取物料列表数据，包括分类信息。下拉菜单的选项
    async getList() {
      this.tableLoading = true;
      let res = await goodsLists(this.matListQuery);
      this.tableLoading = false;

      // 分类表格数据
      this.cateLists = res.data.category;
      // 物料列表表格数据
      this.matList = res.data.list;

      // 物料列表数据总数
      this.total = res.data.total;
      // 整个列表的全部数据。（分类，物料列表，下拉选项）
      this.formSelect.m_typeArr = res.data.goodType;
      this.formSelect.tax_rateArr = res.data.rate;
      this.formSelect.idArr = res.data.category.slice(1);
    },

    // 新增对话框显示或隐藏
    addDialog(flag) {
      this.addDialogVisible = flag;
    },
    // 点击了表格则修改物料列表渲染的数据
    modifyCurCate(row) {
      // 根据分类id渲染不同的数据。所以修改id
      this.matListQuery.category_id = row.id;
      this.getList();
    },
    // 搜索过滤
    handleFilter() {
      this.matListQuery.page = 1;
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
