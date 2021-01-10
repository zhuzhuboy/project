<template>
  <el-card style="width: 80%">
    <el-table
      :data="lists"
      style="margin-bottom: 20px; float:left"
      row-key="id"
      border
      v-loading="listLoading"
    >
      <el-table-column prop="id" label="#" align="center"></el-table-column>
      <el-table-column prop="code" label="编码" align="center"></el-table-column>
      <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="tax_rate" label="税率" width="120" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template v-slot="slotProps">
          <el-button type="primary" size="small" @click="editBtn(slotProps.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增的dialog  -->

    <Dialog
      :dialogVisible="addDialogVisible"
      :data="formData"
      title="新增物料分类"
      @dialogClose="dialogClose('addDiaClo')"
      @confirmClick="addConfirm"
    ></Dialog>

    <!-- 编辑的dialog -->

    <Dialog
      :dialogVisible="editDialogVisible"
      :data="rowData"
      title="编辑供应商"
      @dialogClose="dialogClose('editDiaClo')"
      @confirmClick="editConfirm"
    />
  </el-card>
</template>

<script>
import { gCateSaveEd } from "@/api/materiel/materiel.js";
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
    },
    editDialogVisible: {
      type: Boolean
    }
  },

  data() {
    return {
      // 新增表单数据
      formData: {
        code: "",
        tax_rate: "",
        name: "",
        remarks: ""
      },
      rowData: {} // 数据回填数据
    };
  },
  methods: {
    // 新增对话框确认事件
    async addConfirm() {
      let data = this.formData;
      data = { ...data, id: 0 };
      let result = await gCateSaveEd(data);

      this.$notify({
        title: "",
        message: result.msg,
        type: "success",
        duration: 2000
      });
      this.$emit("addDialog", false);
      this.$emit("getList");
    },
    // 编辑按钮
    editBtn(row) {
      this.$emit("editDialog", true);
      this.rowData = { ...row };
    },
    // 编辑对话框确认事件
    editConfirm(refDom) {
      // 表单验证
      refDom.validate(async flag => {
        if (!flag) return;
        // 接口参数
        let data = this.rowData;
        let result = await gCateSaveEd(data);
        this.$notify({
          title: "",
          message: result.msg,
          type: "success",
          duration: 2000
        });
        this.$emit("editDialog", false);
        this.$emit("getList");
      });
    },
    // 关闭dialog，dialog隐藏
    dialogClose(flag) {
      if (flag === "addDiaClo") {
        this.$emit("addDialog", false);
      } else if (flag === "editDiaClo") {
        this.$emit("editDialog", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
