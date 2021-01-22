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
        <!-- 新增菜单按钮 -->
        <el-form-item>
          <el-button type="success" @click="addMenuBtn" icon="el-icon-edit" size="small">新增菜单</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard :tableData="list" @editMenuBtn="editMenuBtn" />
    <form-dialog
      :dialogVisible="dialogVisible"
      :data="formData"
      @dialogClose="dialogClose"
      @confirmClick="confirmClick"
    />
    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/containCard";
import FormDialog from "./components/Dialog";
import { menuLists, menuAdEd } from "@/api/role/routerList.js";

export default {
  components: {
    Pagination,
    ContainCard,
    FormDialog
  },

  data() {
    return {
      listQuery: undefined,
      // 表格数据
      list: undefined,

      listLoading: true,
      //   包含一级菜单
      formData: {
        title: undefined,
        // 下拉选项（编辑删除自身项）
        firstSelectArr: undefined,
        id: undefined,
        pid: undefined,
        name: undefined,
        crux: undefined
      },
      //全部的下拉选项数据
      firstSelectArr: undefined,
      dialogVisible: false // 新增/编辑对话框
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
      this.getList();
    },

    // 获取数据
    async getList() {
      this.listLoading = true;
      let res = await menuLists();
      this.list = res.data.list;
      this.formData.firstSelectArr = res.data.oneMenu;
      this.firstSelectArr = res.data.oneMenu;
      this.listLoading = false;
    },
    // 新增菜单
    addMenuBtn() {
      this.formData = {
        title: undefined,
        // 下拉选项（编辑删除自身项）
        firstSelectArr: [...this.firstSelectArr],
        id: undefined,
        pid: undefined,
        name: undefined,
        crux: undefined
      };
      this.formData.title = "新增菜单";
      this.dialogVisible = true;
    },
    // 编辑菜单
    editMenuBtn(row) {
      this.formData.title = "编辑菜单";
      // formData的id属性赋值
      this.formData.id = row.id;
      this.formData.create_time = row.create_time;
      this.formData.crux = row.crux;
      this.formData.name = row.name;
      this.formData.pid = row.pid;
      //找到下拉数组中某一项id对应当前id的数组索引
      let index = this.firstSelectArr.findIndex(item => {
        return item.id == this.formData.id;
      });
      //   复制一份下拉数组
      let arr = [...this.firstSelectArr];
      //   删除对应项
      arr.splice(index, 1);
      //   给form下拉重新赋值
      this.formData.firstSelectArr = arr;
      //   dialog显示
      this.dialogVisible = true;
    },
    // 关闭dialog
    dialogClose() {
      this.dialogVisible = false;
    },
    async confirmClick(ref) {
        ref.validate(async result=>{
            if(result){
 let { pid, name, crux, id } = this.formData;
      let option = {
        pid,
        name,
        crux,
        id
      };
      //   调用接口
      let res = await menuAdEd(option);
      //   消息提示
      this.$notify({
        title: "",
        message: res.msg,
        type: "success",
        duration: 2000
      });
      //   关闭dialog
      this.dialogClose();
      //   刷新
      this.getList();
            }
        })

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
