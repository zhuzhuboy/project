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
      </el-form>
    </template>

    <!-- 内容区 -->
    <contain-layout />
    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import ContainLayout from "./components/ContainLayoutt ";
export default {
  components: {
    ContainLayout
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
    // this.getList()
  },

  methods: {
    // 刷新
    shuaxin() {
      this.getList();
    },

    // 获取数据
    getList() {
      this.listLoading = true;
      comLists(this.listQuery).then(res => {
        this.lists = res.data.list;
        this.total = res.data.total;
        this.listLoading = false;
      });
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
