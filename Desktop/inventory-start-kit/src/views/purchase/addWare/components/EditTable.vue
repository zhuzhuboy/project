<template>
  <div>
    <el-table
      border
      stripe
      class="tab"
      :data="tableData"
      size="mini"
      @cell-dblclick="addTableRow"
      highlight-current-row
      :cell-class-name="className"
    >
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column label="物料编码" prop="goods_code" align="center"></el-table-column>
      <el-table-column prop="goods_name" label="品名" align="center"></el-table-column>
      <el-table-column prop="spec" label="规格型号" align="center"></el-table-column>
      <el-table-column prop="purchase_num" label="入库数量" align="center">
        <template v-slot="{row}">
          <edit-table-cell
            :can-edit="!isEdit"
            placeholder="请输入数量"
            v-model="row.purchase_num"
            @blurs="countInputBlur(row)"
          >
            <span slot="content">{{row.purchase_num}}</span>
          </edit-table-cell>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" align="center"></el-table-column>
      <el-table-column prop="one_price" label="采购单价" align="center" width="90">
        <template v-slot="{row}">
          <edit-table-cell
            :can-edit="true"
            placeholder="请输入采购单价"
            v-model="row.one_price"
            @blurs="countInputBlur(row)"
          >
            <span slot="content">{{row.one_price | NumFormat}}</span>
          </edit-table-cell>
        </template>
      </el-table-column>
      <el-table-column prop="all_price" label="采购金额" align="center">
        <template v-slot="{row}">{{row.all_price | NumFormat}}</template>
      </el-table-column>
      <el-table-column prop="tax_price" label="含税价" align="center">
        <template v-slot="{row}">{{row.tax_price | NumFormat}}</template>
      </el-table-column>
      <el-table-column prop="tax_rate" label="税率" align="center" width="90">
        <template v-slot="{row}">
          <edit-table-cell
            :can-edit="true"
            placeholder="请输入税率"
            v-model="row.tax_rate"
            @blurs="countInputBlur(row)"
          >
            <span slot="content">{{isNaN(row.tax_rate)?'':+row.tax_rate+"%"}}</span>
          </edit-table-cell>
        </template>
      </el-table-column>
      <el-table-column prop="taxes" label="税金" align="center">
        <template v-slot="{row}">{{row.taxes | NumFormat}}</template>
      </el-table-column>
      <el-table-column prop="total_tax_price" label="价税合计" align="center">
        <template v-slot="{row}">{{row.total_tax_price | NumFormat}}</template>
      </el-table-column>
      <!-- <el-table-column prop="device_num" label="设备" align="center" v-if="isEdit"></el-table-column> -->
      <el-table-column prop="remarks" label="备注" width="200" align="center">
        <template v-slot="{row}">
          <edit-table-cell
            :can-edit="true"
            placeholder="请输入备注"
            v-model="row.remarks"
            @keyup.enter="addData"
          >
            <span slot="content">{{row.remarks}}</span>
          </edit-table-cell>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130">
        <template v-slot="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-folder-add"
            @click="addData"
            plain
            :disabled="isEdit"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteData($index)"
            plain
            :disabled="isEdit"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-card v-if="showTable" class="table-card" :style="style">
      <el-table
        stripe
        style="width: 100%"
        border
        :data="formData.goods"
        size="small"
        :height="`${cardHeight}px`"
        highlight-current-row
        @row-dblclick="rowDBClick"
      >
        <el-table-column prop="code" label="物料编码"></el-table-column>
        <el-table-column prop="goods_name" label="品名"></el-table-column>
        <el-table-column prop="spec" label="规格型号"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="purchase_price" label="建议采购价"></el-table-column>
      </el-table>
    </el-card>
    <div class="mengceng" v-if="showTable" @click="controlSonTableHideOrShow(false)"></div>
  </div>
</template>

<script>
import EditTableCell from "./editTableItem";
import { HighPrecisionCalc } from "@/libs/tools.js";
let calc = new HighPrecisionCalc();
export default {
  components: {
    EditTableCell
  },
  data() {
    return {
      showTable: false, // 控制蒙层和子表格显示或隐藏
      stylePosition: {}, // 子表格的位置信息
      curFatherEditRow: undefined, // 当前编辑的父表格行数据
      cardHeight: 300 // 当前子表格设置的高度
    };
  },
  props: {
    // 可编辑表格的数据
    tableData: {
      type: Array
    },
    // 在顶级组件index请求的数据。里面有子表格渲染的数据
    formData: {
      type: Object
    },
    isEdit: {
      type: Boolean
    }
  },
  computed: {
    // 子表格坐标计算属性
    style() {
      return {
        ...this.stylePosition,
        width: "50%"
      };
    }
  },
  filters: {
    // 金额显示.00格式
    NumFormat: function(value) {
      if (isNaN(value)) return "";
      if (!value) return "0.00";

      value = Number(value);
      value = value.toFixed(2);
      let intPart = Math.trunc(value); // 获取整数部分
      let floatPart = ".00"; // 预定义小数部分
      let value2Array = value.split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0,实际上用不着
          return intPart + "." + floatPart + "0";
        } else {
          return intPart + "." + floatPart;
        }
      } else {
        return intPart + floatPart;
      }
    }
  },
  methods: {
    // 数量输入框失去焦点事件
    countInputBlur(row) {
      // 计算金钱，传递的父表格的行数据
      this.computedPrice(row);
      // 子表格数量input消失
    },

    // 计算金钱
    computedPrice(row) {
      // 总价（数量*单价）
      row.all_price = calc.multiply(row.purchase_num, row.one_price);
      // 税金（数量*单价*税率）
      row.taxes = calc.multiply(row.all_price, row.tax_rate / 100);
      //   单价税钱(单价*税率)
      let tax = calc.multiply(row.one_price, row.tax_rate / 100);
      // 含税价(单价+单价税钱)
      row.tax_price = calc.add(tax, row.one_price);
      // 价税合计(总价+税金)
      row.total_tax_price = calc.add(row.all_price, row.taxes);
      this.$nextTick(() => {
        row.all_price = row.all_price.toFixed(2);
        row.taxes = row.taxes.toFixed(2);
        row.tax_price = row.tax_price.toFixed(2);
        row.total_tax_price = row.total_tax_price.toFixed(2);
      });
    },
    // 子表格双击
    rowDBClick(row, column, event) {
      // 遍历子表格行属性。给父表格行赋值
      for (const key in row) {
        if (Object.hasOwnProperty.call(row, key)) {
          const value = row[key];
          // "purchase_price"是子表格的数组，要转换成父表格属性格式
          if (key === "purchase_price") {
            this.curFatherEditRow["one_price"] = value;
          } else if (key === "code") {
            this.curFatherEditRow["goods_code"] = value;
          } else if (key === "id") {
            this.curFatherEditRow["goods_id"] = value;
          } else {
            // 其余的子表格数据和父表格数据一一对应，可直接赋值
            this.curFatherEditRow[key] = value;
          }
        }
      }
      // 下次回调重新计算金钱
      this.$nextTick(() => {
        this.computedPrice(this.curFatherEditRow);
      });
      // 子表格和蒙层隐藏
      this.controlSonTableHideOrShow(false);
    },
    // 控制子表格显示或隐藏
    controlSonTableHideOrShow(flag) {
      this.showTable = flag;
    },
    // 父表格双击事件
    addTableRow(row, column, cell, event) {
      // 保存父表格当前行的数据，以便修改
      this.curFatherEditRow = row;
      // 判断如果是物料编码就是第一列
      if (column.property === "goods_code") {
        // 获得视口高度
        let windowHeight = window.innerHeight;
        // 子表格显示
        this.controlSonTableHideOrShow(true);
        // 得到dom尺寸
        let domSize = cell.getBoundingClientRect();
        // 如果视口高度减去dom底边距离视口高度小于了子表格高度。定位底部就位于表格的上方（视口-domTop）
        if (windowHeight - domSize.bottom < this.cardHeight) {
          let bottom = windowHeight - domSize.top;
          this.stylePosition = {
            bottom: bottom + "px",
            left: domSize.left + "px",
            top: "auto"
          };
        } else {
          this.stylePosition = {
            top: domSize.bottom + "px",
            left: domSize.left + "px",
            bottom: "auto"
          };
        }
      }
    },
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    addData(row, e) {
      this.$emit("addInfo");
    },
    deleteData(index) {
      this.$emit("deleteInfo", index);
    },
    className({ row, column, rowIndex, columnIndex }) {
      if (
        column.property === "purchase_num" ||
        column.property === "remarks" ||
        column.property === "tax_rate" ||
        column.property === "one_price"
      ) {
        return "column-bg";
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

.tab .column-bg {
  background-color: rgb(238 233 233 / 50%) !important;
}
</style>
<style lang="scss" scoped>
.backRed {
  background-color: red;
}
.table-card {
  position: fixed;
  z-index: 90;
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
