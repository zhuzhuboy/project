<template>
  <el-table
    v-loading="listLoading"
    element-loading-text="Loading"
    :data="lists"
    fit
    border
    highlight-current-row
  >
    <el-table-column prop="id" width="100" label="#" align="center" />
    <el-table-column label="客户名称" prop="name" width="120" align="center" />
    <el-table-column label="客户手机号" align="center" prop="phone" width="180" />
    <el-table-column align="center" label="客户地址" prop="address" />
    <el-table-column label="创建时间" align="center" prop="create_time" width="200" />
    <el-table-column label="操作" align="center" width="200">
      <template v-slot="{row}">
        <el-button size="mini" type="primary" @click="editBtn(row)" plain>编辑</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="deleteBtn(row.id)"
          :ref="'deleteBtnRef'+row.id"
          plain
        >删除</el-button>-->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    listLoading: {
      type: Boolean
    },
    lists: {
      type: Array
    }
  },

  methods: {
    // 编辑按钮
    editBtn(row) {
      this.$emit("editBtn", row);
    },

    // 删除按钮
    async deleteBtn(id) {
      // 这里是解决按钮点击后颜色不返回失焦颜色。
      // 由于按钮是循环渲染出来的。所以拿到真实dom，就要给每一按钮都添加一个refs属性
      // 这里用的是字符串deleteBtnRef+当前id。
      let prop = "deleteBtnRef" + id;
      //   确认框
      let confirmResult = await this.$confirm(
        "此操作将永久删除该选项, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 确认触发事件
      if (confirmResult === "confirm") {
        this.$emit("deleteBtn", id);
      }
      //   按钮触发失焦事件，样式重置
      this.$nextTick(() => {
        this.$refs[prop].$el.blur();
      });
    }
  }
};
</script>

<style>
</style>
