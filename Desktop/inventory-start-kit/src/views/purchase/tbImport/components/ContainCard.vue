<template>
  <el-card>
    <el-alert type="success" center style="margin-bottom:20px" :closable="false">
      <span>{{importName}}</span>
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
    },
    // 抽屉表格中保存的物料名称。
    importName() {
      return this.$store.state.d2admin.purchase.details_goodsName;
    }
  },

  methods: {
    // 当前label值是英文。转换成中文显示
    labelTransfer(val) {
      switch (val) {
        case "device_number":
          return "设备号";
        case "serial_number":
          return "tbox流水号";
        case "hosts_number":
          return "主机流水号";
        case "is_crv":
          return "启动方式";
        case "car_model_remarks":
          return "专用机车型备注";
        case "is_special":
          return "设备机型";
      }
    },
    // 根据后端返回的值来显示不同的内容
    tableTransferFont(row, column) {
      // 首先判断是哪列。再根据哪列数据进行判断。进行特殊显示
      if (column.label == "启动方式") {
        if (row.is_crv === 0) {
          return "钥匙启动";
        } else {
          return "一键启动";
        }
      } else if (column.label == "设备机型") {
        if (row.is_special === 0) {
          return "通用机型";
        } else {
          return "专用机型";
        }
      } else {
        // 如果不是上面这两列。则返回该列对应的原始数据
        return row[column["property"]];
      }
    }
  }
};
</script>
