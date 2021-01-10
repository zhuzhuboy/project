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
      @cell-click="tableClick"
      :cell-class-name="className"
    >
      <el-table-column align="center" type="index" width="60" prop="s_goods_id"  />

      <el-table-column align="center" label="物料编码" prop="s_goods_code" />
      <el-table-column align="center" prop="s_goods_name" label="物料名称" />

      <el-table-column align="center" prop="s_purchase_num" label="销售数量">
        <template v-slot="{row,$index}">
          <input
            class="count-input"
            type="text"
            v-model="row.s_purchase_num.value"
            v-if="row.s_purchase_num.show"
            :ref="`input${$index}`"
            @blur="countInputBlur(row)"
            placeholder="请输入数量"
          />
          <span v-else>{{row.s_purchase_num.value}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="s_unit" label="物料单位" />

      <el-table-column align="center" prop="s_one_price" label="销售单价" />
      <el-table-column align="center" prop="s_all_price" label="销售总额">
        <template v-slot="{row}">{{isNaN(row.s_all_price)?'':+row.s_all_price}}</template>
      </el-table-column>

      <el-table-column align="center" prop="s_tax_price" label="含税价">
        <template v-slot="{row}">{{isNaN(row.s_tax_price)?'':+row.s_tax_price}}</template>
      </el-table-column>

      <el-table-column align="center" prop="s_tax_rate" label="税率">
        <template v-slot="{row}">{{isNaN(row.s_tax_rate)?'':+row.s_tax_rate+"%"}}</template>
      </el-table-column>
      <el-table-column align="center" prop="s_taxes" label="税金">
        <template v-slot="{row}">{{isNaN(row.s_taxes)?'':+row.s_taxes}}</template>
      </el-table-column>
      <el-table-column align="center" prop="s_total_tax_price" label="价税合计">
        <template v-slot="{row}">{{isNaN(row.s_total_tax_price)?'':+row.s_total_tax_price}}</template>
      </el-table-column>
      <el-table-column align="center" prop="s_remarks" label="备注" width="200">
        <template v-slot="{row}">
          <input
            class="count-input"
            type="text"
            :ref="row.s_remarks.domRef"
            v-model="row.s_remarks.value"
            v-if="row.s_remarks.show"
            @keyup.enter="addData"
            @blur="remarksInputBlur(row)"
            placeholder="请输入备注"
          />
          <span v-else>{{row.s_remarks.value}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130">
        <template v-slot="{row,$index}">
          <el-button type="primary" size="mini" icon="el-icon-folder-add" @click="addData" plain></el-button>
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

    <el-card v-if="showTable" class="table-card" :style="style">
      <el-table
        stripe
        style="width: 100%"
        border
        :data="listTable"
        size="small"
        :height="`${cardHeight}px`"
        highlight-current-row
        @row-dblclick="rowDBClick"
        v-loading="listLoading"
        element-loading-text="加载中"
      >
        <el-table-column prop="id" label="#"></el-table-column>
        <el-table-column prop="code" label="物料编码"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="current_num" label="当前库存数量"></el-table-column>
        <el-table-column prop="spec" label="型号规格"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="sale_price" label="销售单价"></el-table-column>
        <el-table-column prop="spec" label="税率">
          <template v-slot="{row}">{{row.tax_rate.replace(/\.\w+/,'%')}}</template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="mengceng" v-if="showTable" @click="controlSonTableHideOrShow(false)"></div>
  </div>
</template>

<script>
export default {
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
    listTable: {
      type: Array
    },
    listLoading: {
      type: Boolean
    }
  },
  created() {
    console.log(this.listTable);
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
  methods: {
    // 数量输入框失去焦点事件
    countInputBlur(row) {
      // 计算金钱，传递的父表格的行数据
      this.computedPrice(row);
      // 子表格数量input消失
      row.s_purchase_num.show = false;
    },
    // 备注输入框失去焦点事件
    remarksInputBlur(row) {
      row.s_remarks.show = false;
    },
    fixedTwo(val) {
      // 判断他不是一个NaN才能调用保留两位小数的方法
      if (!isNaN(val)) {
        val = val.toFixed(2);
      }
    },
    // 计算金钱
    computedPrice(row) {
      console.log(22222202);
      // 总价（数量*单价）
      console.log(+row.s_purchase_num.value, +row.s_one_price);
      row.s_all_price = +row.s_purchase_num.value * +row.s_one_price;
      this.fixedTwo(row.s_all_price);
      // 含税价
      row.s_tax_price =
        (+row.s_one_price / 100) * +row.s_tax_rate + +row.s_one_price;
      // 税金（数量*单价*税率）
      row.s_taxes =
        +row.s_purchase_num.value * (+row.s_one_price / 100) * +row.s_tax_rate;
      this.fixedTwo(row.s_taxes);

      // 价税合计(总价+税金)
      row.s_total_tax_price = +row.s_all_price + +row.s_taxes;
      this.fixedTwo(row.s_total_tax_price);
    },
    // 子表格双击
    rowDBClick(row, column, event) {
      // 遍历子表格行属性。给父表格行赋值
      for (const key in row) {
        if (Object.hasOwnProperty.call(row, key)) {
          const value = row[key];
          // "purchase_price"是子表格的数组，要转换成父表格属性格式
          if (key === "id") {
            this.curFatherEditRow["s_goods_id"] = value;
          } else if (key === "code") {
            this.curFatherEditRow["s_goods_code"] = value;
          } else if (key === "goods_name") {
            this.curFatherEditRow["s_goods_name"] = value;
          } else if (key === "unit") {
            this.curFatherEditRow["s_unit"] = value;
          } else if (key === "sale_price") {
            this.curFatherEditRow["s_one_price"] = value;
          } else if (key === "tax_rate") {
            this.curFatherEditRow["s_tax_rate"] = value;
          } else if (key === "spec") {
            this.curFatherEditRow["s_spec"] = value;
          } else if (key === "is_crv") {
            this.curFatherEditRow["is_crv"] = value;
          } else if (key === "scan_type") {
            this.curFatherEditRow["scan_type"] = value;
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
      console.log(row, column, cell, event);
      // 保存父表格当前行的数据，以便修改
      this.curFatherEditRow = row;
      // 判断如果是物料编码就是第一列
      if (column.label === "物料编码") {
        // 获得视口高度
        let windowHeight = window.innerHeight;
        // 子表格显示
        this.controlSonTableHideOrShow(true);
        // 得到dom尺寸
        let domSize = cell.getBoundingClientRect();
        // 如果视口高度减去dom底边距离视口高度大于了子表格高度。
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
    // 父表格单击事件
    tableClick(row, column, event) {
      if (column.label === "销售数量") {
        // 子表格数量栏控制input显示
        row.s_purchase_num.show = true;
        this.inputFocus(event);
      } else if (column.label === "备注") {
        row.s_remarks.show = true;
        this.inputFocus(event);
      }
    },
    inputFocus(event) {
      // 下次回调的时候得到input,由于用v-if所以会保证只有一个input在同一时间点出现，所以取索引第0的input
      this.$nextTick(() => {
        let input = event.getElementsByTagName("input")[0];
        input && input.focus();
      });
    },
    addData(row, e) {
      this.$emit("addInfo");
    },
    deleteData(index) {
      this.$emit("deleteInfo", index);
    },
    className({ row, column, rowIndex, columnIndex }) {
      if (column.label === "销售数量" || column.label === "备注") {
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
