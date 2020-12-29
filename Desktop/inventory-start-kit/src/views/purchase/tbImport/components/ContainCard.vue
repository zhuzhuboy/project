<template>
  <el-card>
    <el-table
      :data="table.data"
      row-key="id"
      :stripe="table.stripew"
      :border="table.border"
      v-loading="listLoading"
    >
      <el-table-column
        v-for="item in table.columns"
        :prop="item.prop"
        :label="labelTransfer(item.prop)"
        v-if="item.prop"
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

  methods: {
    //当前label值是英文。转换成中文显示
    labelTransfer(val) {
      switch (val) {
        case "device_number":
          return "设备号";
        case "serial_number":
          return "tbox流水号";
        case "hosts_number":
          return "主机号";
        case "is_crv":
          return "启动方式";
        case "car_model_remarks":
          return "主机情况下车型备注";
        case "is_special":
          return "机型";
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
      } else if (column.label == "机型") {
        if (row.is_special === 0) {
          return "通用机";
        } else {
          return "专用机";
        }
      } else {
        // 如果不是上面这两列。则返回该列对应的原始数据
        return row[column["property"]];
      }
    }
  }
};
</script>

