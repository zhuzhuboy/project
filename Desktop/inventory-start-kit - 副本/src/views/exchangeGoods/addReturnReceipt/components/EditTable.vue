<template>
  <div>
    <el-table border stripe class="tab" :data="tableData" size="mini" :cell-class-name="className" highlight-current-row>
      <el-table-column align="center" type="index" width="60" />

      <el-table-column align="center" label="物料编码" prop="s_goods_code" width="80" />
      <el-table-column align="center" prop="s_goods_name" label="物料名称" width="120" />
      <el-table-column align="center" prop="s_spec" label="规格" width="130" />
      <el-table-column align="center" prop="ret_num" label="退货数量" width="90">
        <editable-cell
          slot-scope="{row}"
          :can-edit="true"
          placeholder="请输入退货数量"
          v-model="row.ret_num"
          @input="countInputBlur(row)"
        >
          <span slot="content">{{row.ret_num}}</span>
        </editable-cell>
      </el-table-column>

      <el-table-column align="center" prop="s_unit" label="单位" width="80" />
      <el-table-column align="center" prop="ret_tax_price" label="退货单价(含税)" width="80">
        <template v-slot="{row}">{{row.ret_tax_price|NumFormat}}</template>
      </el-table-column>

      <el-table-column align="center" prop="ret_price_tax" label="退货金额(含税)" width="80">
        <template v-slot="{row}">{{row.ret_price_tax|NumFormat}}</template>
      </el-table-column>

      <el-table-column align="center" prop="ret_one_price" label="退货单价(不含税)" width="80">
        <template v-slot="{row}">{{row.ret_one_price|NumFormat}}</template>
      </el-table-column>

      <el-table-column align="center" prop="ret_price_NoTax" label="退货金额(不含税)" width="80">
        <template v-slot="{row}">{{row.ret_price_NoTax|NumFormat}}</template>
      </el-table-column>
      <el-table-column align="center" prop="s_tax_rate" label="税率" width="90">
        <template v-slot="{row}">{{row.s_tax_rate.replace(/\.\d+/,'%')}}</template>
      </el-table-column>

      <el-table-column align="center" prop="s_purchase_num" label="销售数量" width="90" />
      <el-table-column align="center" prop="s_one_price" label="销售单价(不含税)" width="80">
        <template v-slot="{row}">{{row.s_one_price|NumFormat}}</template>
      </el-table-column>
      <el-table-column align="center" prop="s_all_price" label="销售金额(不含税)" width="80">
        <template v-slot="{row}">{{row.s_all_price|NumFormat}}</template>
      </el-table-column>

      <el-table-column align="center" prop="s_tax_price" label="销售单价(含税)" width="80">
        <template v-slot="{row}">{{row.s_tax_price|NumFormat}}</template>
      </el-table-column>

      <el-table-column align="center" prop="s_total_tax_price" label="销售金额(含税)" width="80">
        <template v-slot="{row}">{{row.s_total_tax_price|NumFormat}}</template>
      </el-table-column>
      <el-table-column align="center" prop="s_remarks" label="备注" >
        <editable-cell
          slot-scope="{row}"
          :can-edit="true"
          placeholder="请输入备注"
          v-model="row.s_remarks"
        >
          <span slot="content">{{row.s_remarks}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template v-slot="{row,$index}">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteData($index)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EditableCell from "./editTableItem";
import DialogTable from "./dialogTable";
export default {
  components: {
    EditableCell,
    DialogTable
  },
  props: {
    tableData: {
      type: Array
    }
  },
  filters: {
    // 时间格式的转换
    Time(value) {
      var dateee = new Date(value).toJSON();
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    // 金额显示.00格式
    NumFormat: function(value) {
      if (!value) return "0.00";
      if (isNaN(value)) return "";
      if (typeof value === "string") {
        value = Number(value);
      }
      value = value.toFixed(2);
      var intPart = Math.trunc(value); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0,实际上用不着
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat + floatPart;
      }
    }
  },
  methods: {
    // 数量输入事件
    countInputBlur(row) {
      console.log(row);
      // 计算金钱，传递的父表格的行数据
      this.$nextTick(() => {
        this.computedPrice(row);
      });
      // 子表格数量input消失
    },

    // 计算金钱
    computedPrice(row) {
      // 退货金额(含税) = 退货数量*退货单价含税
      row.ret_price_tax = +row.ret_num * row.ret_tax_price;
      //退货金额(不含税) = 退货数量*退货单价不含税
      row.ret_price_NoTax = +row.ret_num * row.ret_one_price;
    },
    deleteData(index){
        console.log(index)
        this.$emit('deleteTableData',index)
    },
    className({ row, column, rowIndex, columnIndex }) {
      if (column.label === "退货数量" || column.label === "备注") {
        return "column-bg-gray";
      }
    }
  }
};
</script>

<style>
.tab .el-table_1_column_2 {
  position: relative;
  z-index: 90;
}
.table-card .el-card__body {
  padding: 8px;
}

.tab .column-bg-gray {
  background-color: rgb(238 233 233 / 50%);
}
.tab .column-bg-white {
  background-color: white;
}
</style>
<style lang="scss" scoped>
.backRed {
  background-color: red;
}
.table-card {
  background-color: rgb(206, 217, 231);
  border-radius: 10px;
}
.mengceng {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  z-index: 88;
}
.count-input {
  position: absolute;
  box-sizing: border-box;
  border: 0px;
  width: 100%;
  margin: auto;
  outline: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &::-webkit-input-placeholder {
    color: rgb(160, 154, 154);
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgb(160, 154, 154);
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgb(160, 154, 154);
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgb(160, 154, 154);
  }
}
</style>
