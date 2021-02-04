<template>
  <el-card>
    <el-alert type="success" center style="margin-bottom:20px" :closable="false">
      <span style="color:black;display:inline-block;padding-left:20px">当前已导入：</span>
      <span style="color:red">{{this.table.data.length}}</span>
    </el-alert>
    <el-table
      :data="table.data"
      row-key="id"
      :stripe="table.stripew"
      :border="table.border"
      v-loading="listLoading"
    >
      <el-table-column
        align="center"
        type="index"
        label="#"
        v-if="table.columns.length"
        width="100"
      />
      <el-table-column
        v-for="item in table.columns"
        :prop="item.prop"
        :label="labelTransfer(item.prop)"
        :key="item.prop"
        :width="computWidth(item.prop)"
        align="center"
      >
        <template v-slot="{row, column}">{{tableTransferFont(row, column)}}</template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    table: {},
    listLoading: {
      type: Boolean
    }
  },
  computed: {
    //   当前导入多少条数据
    importNum() {
      return "当前已导入:" + this.table.data.length;
    }
  },
  methods: {
    // 当前label值是英文。转换成中文显示
    labelTransfer(val) {
      switch (val) {
        case "name":
          return "姓名";
        case "phone":
          return "手机号";
        case "address":
          return "地址";
      }
    },
    // 根据后端返回的值来显示不同的内容
    tableTransferFont(row, column) {
      return row[column["property"]];
    },
    computWidth(prop) {
      let width;
      switch (prop) {
        case "name":
          width = "160";
          break;
        case "phone":
          width = "240";
          break;
        default:
          break;
      }
      return width;
    }
  }
};
</script>
