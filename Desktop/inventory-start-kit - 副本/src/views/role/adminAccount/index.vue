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
          <el-button type="success" @click="addMenuBtn" icon="el-icon-edit" size="small">新增账户</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard :tableData="list" :listLoading="listLoading" @editMenuBtn="editMenuBtn" />
    <form-dialog
      :dialogVisible="dialogVisible"
      :data="formData"
      @dialogClose="dialogClose"
      @confirmClick="confirmClick"
      @transmitTreegRef="transmitTreegRef"
    />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/containCard";
import FormDialog from "./components/formDialog";
import { adminLists, adminAdEd } from "@/api/role/adminAccount.js";
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
        //   dialog标题
        title: undefined,
        // 编辑id
        id: undefined,
        // 编辑组id
        group_id: undefined,
        admin_name: undefined,
        username: undefined,
        password: undefined,
        // 单选按钮组数据
        radioGroup: undefined
      },
      dialogVisible: false // 新增/编辑对话框,
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
      let res = await adminLists();
      //   表格数据
      this.list = res.data.list;
      this.formData.radioGroup = res.data.group;
      this.listLoading = false;
    },
    // 新增菜单
    addMenuBtn() {
      let temp = {
        id: undefined,
        group_id: undefined,
        admin_name: undefined,
        username: undefined,
        password: undefined
      };
      this.formData.title = "新增账户";
      //   新增不用传id，所以置为undefined
      Object.assign(this.formData, temp);
      //   dialog显示
      this.dialogVisible = true;
    },
    // 编辑菜单
    editMenuBtn(row) {

      this.formData.title = "编辑菜单";
      // formData的id属性赋值
      this.formData.id = row.id;
      this.formData.group_id = row.group_id;
      this.formData.admin_name = row.admin_name;
      this.formData.username = row.username;

      //   dialog显示
      this.dialogVisible = true;
    },

    // 查看对话框关闭

    // 关闭dialog
    dialogClose() {
      this.dialogVisible = false;
    },

    confirmClick(ref) {
      ref.validate(async result => {
        if (result) {
          let { id, group_id, admin_name, username, password } = this.formData;
          let option = {
            id,
            group_id,
            admin_name,
            username,
            password
          };
          //   调用接口
          let res = await adminAdEd(option);
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
      });
    },
    // 获取树组件实例
    transmitTreegRef(ref) {
      this.treeRef = ref;
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
