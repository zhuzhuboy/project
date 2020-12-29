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
          <el-button type="success" @click="addBtn" icon="el-icon-edit" size="small">新增物料分类</el-button>
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
      :listLoading="listLoading"
      :addDialogVisible="addDialogVisible"
      :editDialogVisible="editDialogVisible"
      :listData="listData"
      @getList="getList"
      @addDialog="addDialog"
      @editDialog="editDialog"
      @modifyCurCate="modifyCurCate"
    />

    <!-- 底部 -->
    <template slot="footer">
        <pagination
        v-show="total>0"
        :total="total"
        :page.sync="matListQuery.page"
        :limit.sync="matListQuery.limit"
        @pagination="getList()"
      />
    </template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
import { gCateList, goodsLists } from "@/api/info/materiel.js";
import { bubblesSort } from "@libs/tools.js";
import Pagination from '@/components/Pagination/index.vue'

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
        category_id: undefined,
        goods_name: undefined,
        code: undefined
      },
      listLoading: undefined,
      addDialogVisible: false, // 新增对话框
      editDialogVisible: false, // 编辑对话框
      listData: undefined,
      total:0,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 刷新
    shuaxin() {
      this.matListQuery.id = undefined;
      this.matListQuery.name = undefined;
      this.getList();
    },
    // 获取物料列表数据，包括分类信息。下拉菜单的选项
    async getList() {
      this.listLoading = true;
      let res = await goodsLists(this.matListQuery);
      // 分类表格数据
      this.cateLists = res.data.category;
      // 物料列表表格数据
      this.matList = res.data.list;
      // 物料列表数据总数

      this.listLoading = false;
      console.log(res.data.total)
      this.total = res.data.total;
      // 整个列表的全部数据。（分类，物料列表，下拉选项）
      this.listData = res.data;
      // 物料列表数组排序
      bubblesSort(this.matList, "id");
    },
    // 添加按钮
    addBtn() {
      this.addDialogVisible = true;
    },
    // 新增对话框显示或隐藏
    addDialog(flag) {
      this.addDialogVisible = flag;
    },
    // 编辑对话框显示或隐藏
    editDialog(flag) {
      this.editDialogVisible = flag;
    },
    // 点击了表格则修改物料列表渲染的数据
    modifyCurCate(row) {
      // 根据分类id渲染不同的数据。所以修改id
      console.log(row.id)
      this.matListQuery.category_id = row.id;
      this.matListQuery.code=undefined;
      this.matListQuery.goods_name=undefined;
      this.getList();
    },
    // 搜索过滤
    handleFilter() {
      this.matListQuery.page = 1;
      if (!this.matListQuery.code && !this.matListQuery.goods_name) return;
      this.matListQuery.category_id = 0;
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
