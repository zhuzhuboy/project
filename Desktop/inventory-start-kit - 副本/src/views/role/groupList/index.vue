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
    <ContainCard
      :tableData="list"
      :listLoading="listLoading"
      @editMenuBtn="editMenuBtn"
      @lookup="lookup"
    />
    <form-dialog
      :dialogVisible="dialogVisible"
      :data="formData"
      @dialogClose="dialogClose"
      @confirmClick="confirmClick"
      @transmitTreegRef="transmitTreegRef"
    />
    <look-dialog
      :dialogVisible="lookDialogVisible"
      :data="groupMenuData"
      @dialogClose="lookdialogClose"
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
import LookDialog from "./components/lookDialog";
import { groupLists, groupAdEd, groupSeeMenu } from "@/api/role/groupList.js";
export default {
  components: {
    Pagination,
    ContainCard,
    FormDialog,
    LookDialog
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
        data: undefined,
        // 组名称
        group_name: undefined,
        // 菜单id
        menu_ids: undefined,
        // 编辑表格行的id
        id: undefined
      },

      dialogVisible: false, // 新增/编辑对话框,
      treeRef: undefined,
      groupMenuData: {
        title: "查看菜单",
        data: undefined
      }, //查看分组列表数据（树形结构）,
      lookDialogVisible: false
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
      let res = await groupLists();
      //   表格数据
      this.list = res.data.list;
      //   树形控件数据
      this.formData.data = res.data.menu;
      this.listLoading = false;
    },
    // 新增菜单
    addMenuBtn() {
      this.formData.title = "新增菜单";
      //   新增不用传id，所以置为undefined
      this.formData.group_name = undefined;
      this.formData.id = undefined;
      //   dialog显示
      this.dialogVisible = true;
      this.treeRef && this.treeRef.setCheckedKeys([]);
    },
    // 编辑菜单
    editMenuBtn(row) {
      this.formData.title = "编辑菜单";
      // formData的id属性赋值
      this.formData.id = row.id;
      // 组名称
      this.formData.group_name = row.group_name;
      // 递归，找到有children属性并且是不为0的数组项id
      function digui(obj, arr = []) {
        //   对象有children属性并且是数组，数组长度不等于0
        if (Array.isArray(obj.children) && obj.children != 0) {
          arr.push(obj.id);
          obj.children.forEach(item => {
            digui(item, arr);
          });
        }
      }
      // 递归的结果
      let fatherArr = [];
      //   循环每一项，进行递归
      this.formData.data.forEach(item => {
        digui(item, fatherArr);
      });
      // 当前行返回的id（包括半选的父节点）
      let key = [...row.menu_ids];
      //   把所有父节点id都排除掉
      fatherArr.filter(item => {
        for (let i = 0; i < key.length; i++) {
          const element = key[i];
          if (item == element) {
            //   key最后得到的就是子节点
            key.splice(i, 1);
            i--;
            return true;
          }
        }
      });
      //   设置被选中
      this.$nextTick(() => {
        this.$nextTick(() => {
          // 此时this.treeRef肯定被获取到了
          this.treeRef && this.treeRef.setCheckedKeys(key);
        });
      });
      //   dialog显示
      this.dialogVisible = true;
    },
    // 查看
    async lookup(row) {
      let res = await groupSeeMenu({ id: row.id });
      this.groupMenuData.data = res.data.groupMenu;
      this.lookDialogVisible = true;
    },
    // 查看对话框关闭
    lookdialogClose() {
      this.lookDialogVisible = false;
    },
    // 关闭dialog
    dialogClose() {
      this.dialogVisible = false;
    },

    confirmClick(ref) {
      ref.validate(async result => {
        if (result) {
          // 获取被选中的节点。给form.menu_ids赋值
          //   全选
          let select = this.treeRef.getCheckedKeys();
          //   保存全选的
          //   半选
          let halfSelect = this.treeRef.getHalfCheckedKeys();
          //   传递的id为全选+半选
          this.formData.menu_ids = select.concat(halfSelect);
          let { group_name, menu_ids, id } = this.formData;
          let option = {
            group_name,
            menu_ids,
            id
          };
          //   调用接口
          let res = await groupAdEd(option);
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
