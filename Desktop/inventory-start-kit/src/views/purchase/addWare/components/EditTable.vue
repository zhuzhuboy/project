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
      <el-table-column type="index" width="60" prop="goods_id" align="center"></el-table-column>

      <el-table-column label="物料编码" prop="goods_code"></el-table-column>
      <el-table-column prop="goods_name" label="品名"></el-table-column>
      <el-table-column prop="spec" label="规格型号"></el-table-column>
      <el-table-column style="background:red" class="backRed" prop="purchase_num" label="入库数量">
        <template v-slot="{row,$index}">
          <input
            class="count-input"
            type="text"
            v-model="row.purchase_num.value"
            v-if="row.purchase_num.show"
            :ref="`input${$index}`"
            @blur="countInputBlur(row)"
            placeholder="请输入数量"
          />
          <span v-else>{{row.purchase_num.value}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="one_price" label="采购单价"></el-table-column>
      <el-table-column prop="all_price" label="采购金额">
        <template v-slot="{row}">{{isNaN(row.all_price)?'':+row.all_price}}</template>
      </el-table-column>
      <el-table-column prop="tax_price" label="含税价">
        <template v-slot="{row}">{{isNaN(row.tax_price)?'':+row.tax_price}}</template>
      </el-table-column>
      <el-table-column prop="tax_rate" label="税率">
        <template v-slot="{row}">{{isNaN(row.tax_rate)?'':+row.tax_rate+"%"}}</template>
      </el-table-column>
      <el-table-column prop="taxes" label="税金">
        <template v-slot="{row}">{{isNaN(row.taxes)?'':+row.taxes}}</template>
      </el-table-column>
      <el-table-column prop="total_tax_price" label="价税合计">
        <template v-slot="{row}">{{isNaN(row.total_tax_price)?'':+row.total_tax_price}}</template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" width="200">
        <template v-slot="{row,$index}">
          <input
            class="count-input"
            type="text"
            :ref="row.remarks.domRef"
            v-model="row.remarks.value"
            v-if="row.remarks.show"
            @keyup.enter="addData"
            @blur="remarksInputBlur(row)"
            placeholder="请输入备注"
          />
          <span v-else>{{row.remarks.value}}</span>
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
export default {
  data() {
    return {
      showTable: false, //控制蒙层和子表格显示或隐藏
      stylePosition: {}, //子表格的位置信息
      curFatherEditRow: undefined, //当前编辑的父表格行数据
      cardHeight: 300 //当前子表格设置的高度
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
  methods: {
    // 数量输入框失去焦点事件
    countInputBlur(row) {
      // 计算金钱，传递的父表格的行数据
      this.computedPrice(row);
      // 子表格数量input消失
      row.purchase_num.show = false;
    },
    remarksInputBlur(row) {
      row.remarks.show = false;
    },
    // 计算金钱
    computedPrice(row) {
      // 总价
      row.all_price = +row.purchase_num.value * +row.one_price;
      // 税金
      row.taxes = (+row.one_price / 100) * +row.tax_rate;
      // 含税价
      row.tax_price = +row.one_price + +row.taxes;
      // 价税合计
      row.total_tax_price =
        row.all_price + (row.all_price / 100) * +row.tax_rate;
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
          } else if (key === "purchase_num") {
            // 数值是一个对象。绑定对象的value值
            this.curFatherEditRow[key].value = value;
          } else if (key === "remarks") {
            // 数值是一个对象。绑定对象的value值
            this.curFatherEditRow[key].value = value;
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
      } else if (column.label === "入库数量") {
        // 子表格数量栏控制input显示
        row.purchase_num.show = true;
      } else if (column.label === "备注") {
        row.remarks.show = true;
      }
    },
    // 父表格单击事件
    tableClick(row, column, event) {
      if (column.label === "入库数量") {
        // 子表格数量栏控制input显示
        row.purchase_num.show = true;
        this.inputFocus(event);
      } else if (column.label === "备注") {
        row.remarks.show = true;
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
      // row.remarks.show = true;
      // 新增一行数据
      this.$emit("addInfo");
    },
    deleteData(index) {
      this.$emit("deleteInfo", index);
    },
    className({ row, column, rowIndex, columnIndex }) {
      if (column.label === '入库数量' || column.label === '备注') {
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
  border: 0px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  outline: none;
  top: 0;
  left: 0;

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

