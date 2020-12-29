<template>
  <el-card>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="lists"
      border
      fit
      highlight-current-row
      style="width:80%"
    >
      <el-table-column type="index" width="100" label="#" align="center" />
      <el-table-column prop="id" width="100" label="id" align="center" />
      <el-table-column label="编号" prop="num" width="120" align="center" />
      <el-table-column label="供应商名称" align="center" prop="supply_name" width="180" />
      <el-table-column label="供应商地址" prop="address" />
      <el-table-column label="创建时间" align="center" prop="create_time" width="200" />
      <el-table-column label="操作" align="center" width="200">
        <template v-slot="slotProps">
          <el-button size="mini" type="primary" @click="editBtn(slotProps.row)" plain>编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBtn(slotProps.row.id,slotProps)"
            plain
            :ref="'deleteBtnRef'+slotProps.$index"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增的dialog  -->

    <Dialog
      :dialogVisible="addDialogVisible"
      :data="formData"
      title="新增供应商"
      @dialogClose="dialogClose"
      @confirmClick="addConfirm"
    ></Dialog>

    <!-- 编辑的dialog -->

    <Dialog
      :dialogVisible="editDialogVisible"
      :data="rowData"
      title="编辑供应商"
      @dialogClose="dialogClose"
      @confirmClick="editConfirm"
    />
  </el-card>
</template>

<script>
import { comSaveEd, comDel } from "@/api/supplier.js";
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
  created() {
    console.log(this.listLoading);
    setTimeout(() => {
      console.log(this.listLoading);
    }, 2000);
  },
  data() {
    return {
      // 编辑表单数据
      formData: {
        num: "",
        supply_name: "",
        address: "",
        create_time: ""
      },
      rowData: {} // 数据回填数据
    };
  },
  methods: {
    // 新增对话框确认事件
    async addConfirm() {
      let data = this.formData;
      let result = await comSaveEd({ ...data, id: 0 });

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
    async editConfirm() {
      // 接口参数
      let data = this.rowData;
      let result = await comSaveEd(data);

      this.$notify({
        title: "",
        message: result.msg,
        type: "success",
        duration: 2000
      });
      this.$emit("editDialog", false);
      this.$emit("getList");
    },
    // 关闭dialog，dialog隐藏
    dialogClose() {
      this.$emit("editDialog", false);
      this.$emit("addDialog", false);
    },
    // 删除按钮
    async deleteBtn(id, props) {
      // 这里是解决按钮点击后颜色不返回失焦颜色。
      // 由于按钮是循环渲染出来的。所以拿到真实dom，就要给每一按钮都添加一个refs属性
      // 这里用的是字符串deleteBtnRef+当前索引项。

      // 得到当前按钮对应的refs属性key
      let prop = "deleteBtnRef" + props.$index;
      // 当前按钮触发失去焦点事件
      this.$refs[prop].$el.blur();

      let confirmResult = await this.$confirm(
        "此操作将永久删除该选项, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult === "confirm") {
        let result = await comDel({ id });
        this.$notify({
          title: "",
          message: result.msg,
          type: "success",
          duration: 2000
        });
        this.$emit("getList");
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
