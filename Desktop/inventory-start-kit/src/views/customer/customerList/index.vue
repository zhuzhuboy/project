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
          <el-button type="success" @click="addBtn" icon="el-icon-edit" size="small">新增客户</el-button>
        </el-form-item>

        <!-- id搜索 -->
        <!-- <el-form-item label="ID" prop="id">
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
        </el-form-item>-->
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :lists="lists"
      :listLoading="listLoading"
      @editBtn="editBtn"
      @deleteBtn="deleteBtn"
    />
    <!-- 新增编辑对话框 -->
    <adedDialog
      :dialogVisible="adedDialogVisible"
      :dialogData="editDialogData"
      @dialogClose="dialogClose"
      @dialogConfirm="dialogConfirm"
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
import AdedDialog from "./components/AdedDialog";
import {
  customerList,
  customerAdEd,
  customerDel
} from "@/api/customer/customerList.js";

export default {
  components: {
    Pagination,
    ContainCard,
    AdedDialog
  },

  data() {
    return {
      lists: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      listLoading: true,
      //   新增编辑对话框显示或隐藏
      adedDialogVisible: false,
      editDialogData: {
        title: undefined,
        formData: {
          id: undefined,
          name: undefined,
          address: undefined,
          phone: undefined
        }
      }
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
      let res = await customerList(option ? option : this.listQuery);
      this.lists = res.data.list;
      this.total = res.data.total;
      this.listLoading = false;
    },
    // 控制dialog显示隐藏
    controlDialogVisible(flag) {
      this.adedDialogVisible = flag;
    },
    // 对话框关闭
    dialogClose() {
      this.controlDialogVisible(false);
      //   关闭dialog重置数据
      Object.assign(this.editDialogData.formData, {
        id: undefined,
        name: undefined,
        address: undefined,
        phone: undefined
      });
    },

    // 新增按钮
    addBtn(flag) {
      this.controlDialogVisible(true);
      this.editDialogData.title = "新增客户";
    },
    // 编辑按钮
    editBtn(row) {
      let { id, name, address, phone } = row;
      this.controlDialogVisible(true);
      this.editDialogData.title = "编辑客户";
      Object.assign(this.editDialogData.formData, { id, name, address, phone });
    },
    // 删除按钮触发事件
    async deleteBtn(id) {
      let res = await customerDel({ id });
      this.$notify({
        title: "",
        message: res.msg,
        type: "success",
        duration: 2000
      });
      //   重新获取
      this.getList();
    },
    // 对话框确认事件
    async dialogConfirm() {
      let option = { ...this.editDialogData.formData };
      let res = await customerAdEd(option);
      this.$notify({
        title: "",
        message: res.msg,
        type: "success",
        duration: 2000
      });
      //dialog关闭
      this.controlDialogVisible(false);
      //   重新获取
      this.getList();
    }
    // 搜索按鈕
    // handleFilter() {
    //   this.listQuery.page = 1;
    //   this.getList();
    // }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
