<template>
  <el-card>
    <el-table
      v-loading="listLoading"
      :data="lists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width:80%"
    >
      <el-table-column label="#" align="center" prop="id" width="100" />
      <el-table-column label="编号" prop="num" width="120" align="center" />
      <el-table-column label="仓库名称" align="center" prop="stock_name" width="240" />
      <el-table-column label="仓库地址" prop="address" align="center" />
      <el-table-column label="创建时间" align="center" prop="create_time" width="200" />
    </el-table>

    <!-- 新增的dialog  -->
    <Dialog
      :dialogVisible="addDialogVisible"
      :data="formData"
      title="新增供应商"
      @dialogClose="dialogClose"
      @confirmClick="addConfirm"
    />
  </el-card>
</template>

<script>
import { stockSave } from "@/api/info/warehouse.js";
import Dialog from "./Dialog.vue";
export default {
  components: {
    Dialog
  },
  props: {
    listLoading: {
      type: Boolean
    },
    lists: {
      type: Array
    },
    addDialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      // 新增表单数据
      formData: {
        num: "",
        stock_name: "",
        address: "",
        create_time: ""
      }
    };
  },
  methods: {
    // 新增对话框确认事件
    async addConfirm() {
      let data = this.formData;
      data = { ...data, id: 0 };
      let result = await stockSave(data);
      this.$notify({
        title: "",
        message: result.msg,
        type: "success",
        duration: 2000
      });
      this.$emit("addDialog", false);
      this.$emit("getList");
    },
    // 关闭dialog，dialog隐藏
    dialogClose() {
      this.$emit("addDialog", false);
    }
  }
};
</script>

<style lang="scss" scoped>
