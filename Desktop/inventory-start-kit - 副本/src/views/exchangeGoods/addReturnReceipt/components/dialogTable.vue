<template>
  <el-dialog :visible.sync="dialogShow" width="80%" @close="dialogClose" custom-class="dialogTable">
    <d2-container>
      <!-- 头部 -->
      <template slot="header">
        <el-form
          :inline="true"
          :model="dialogListQuery"
          ref="listQuery"
          size="small"
          style="margin-bottom: -20px;"
          label-width="90px"
        >
          <el-form-item label="销售订单号" prop="sale_orderNum">
            <el-input v-model="dialogListQuery.sale_orderNum" placeholder="请输入订单号" clearable />
          </el-form-item>
          <el-form-item label="业务日期" prop="date">
            <el-date-picker
              v-model="dialogListQuery.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="代理地址" prop="area">
            <el-input v-model="dialogListQuery.area" placeholder="请输入地址" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter" icon="el-icon-search">查找</el-button>
          </el-form-item>
        </el-form>
      </template>

      <!-- 内容区 -->
      <!-- 新建销售退货入库单 -->
      <div>显示最近10条数据</div>
      <el-card class="table-card">
        <el-table
          stripe
          style="width: 100%"
          border
          :data="dialogCateTable"
          size="mini"
          highlight-current-row
          @row-click="rowClick"
          v-loading="dialogCateLoading"
          element-loading-text="加载中"
        >
          <el-table-column prop="id" label="#" align="center" width="100" />
          <el-table-column prop="sale_orderNum" label="销售订单号" align="center" />
          <el-table-column prop="bus_date" label="业务日期" align="center" />
          <el-table-column prop="full_agent_area" label="客户(代理地区)" align="center" />
          <el-table-column prop="s_amount" label="销售金额(不含税)" align="center" />
          <el-table-column prop="s_taxes" label="税金" align="center" />
          <el-table-column prop="s_total_price" label="价税合计" align="center" />
          <el-table-column prop="stock_name" label="出货仓库" align="center" />
          <el-table-column prop="admin_name" label="操作员" align="center" />
        </el-table>
      </el-card>

      <el-card class="table-card table-card-sub">
        <el-table
          stripe
          style="width: 100%"
          border
          :data="dialogListTable"
          size="mini"
          highlight-current-row
          v-loading="dialogListLoading"
          element-loading-text="加载中"
        >
          <el-table-column prop="id" label="#" align="center" width="100" />
          <el-table-column prop="s_goods_code" label="商品编码" align="center" />

          <el-table-column prop="s_goods_name" label="商品名称" align="center" width="160" />
          <el-table-column prop="s_spec" label="商品规格" align="center" width="140" />
          <el-table-column prop="s_purchase_num" label="销售数量" align="center" />
          <el-table-column prop="ret_num" label="退货数量" align="center" />
          <el-table-column prop="actual_num" label="实际出库数量" align="center" width="100" />
          <el-table-column prop="s_unit" label="单位" align="center" />

          <el-table-column prop="s_one_price" label="单价(不含税)" align="center" width="100" />
          <el-table-column prop="s_all_price" label="销售总额(不含税)" align="center" width="120" />
          <el-table-column prop="s_tax_rate" label="税率" align="center">
            <template v-slot="{row}">{{row.s_tax_rate.replace(/\.\d+/,'%')}}</template>
          </el-table-column>
          <el-table-column prop="s_taxes" label="税金" align="center" />
          <el-table-column prop="s_total_tax_price" label="价税合计" align="center" />
          <el-table-column prop="s_tax_price" label="含税价" align="center" />
          <el-table-column prop="s_remarks" label="备注" align="center" />
        </el-table>
      </el-card>

      <!-- 底部 -->
      <template slot="footer">
        <el-form :inline="true" size="small" style="margin-bottom: 20px;">
          <!-- 保存 -->
          <el-form-item>
            <el-button type="success" icon="el-icon-check" size="small" @click="confirmBtn">选中</el-button>
          </el-form-item>
        </el-form>
      </template>
    </d2-container>
  </el-dialog>
</template>

<script>
import { getSaleDetails } from "@/api/exchangeGoods/addReturnReceipt";
export default {
  data() {
    return {
      dialogListTable: undefined, //详情表格数据
      dialogListLoading: undefined, //详情表格加载状态
      cateTableID: undefined //保存分类表格ID
    };
  },
  props: {
    dialogCateTable: {
      type: Array
    },
    dialogCateLoading: {
      type: Boolean
    },
    // dialog查找参数
    dialogListQuery: {
      type: Object
    }
  },
  computed: {
    //   dialog显示或隐藏。显示获取vuex中数据。隐藏触发vuex更改数据
    dialogShow: {
      get() {
        return this.$store.state.d2admin.sale.dialogShow;
      },
      set() {
        this.$store.commit("d2admin/sale/getDialogShow", false);
      }
    }
  },
  methods: {
    // 子表格单击获得详情表格数据
    async rowClick(row, column, event) {
      this.cateTableID = row.id;
      let option = {
        record_id: this.cateTableID
      };
      this.dialogListLoading = true;
      let res = await getSaleDetails(option);
      this.dialogListLoading = false;
      this.dialogListTable = res.data.list;
    },
    // 表单重置。详情表格数据重置
    clearFormAndTable() {
      // 如果有在清空表单
      this.$refs.listQuery && this.$refs.listQuery.resetFields();
      this.dialogListTable = undefined;
    },
    // dialog关闭触发事件
    dialogClose() {
      // 表单重置。详情表格数据重置
      this.clearFormAndTable();
    },
    // 点击选中按钮
    confirmBtn() {
      // 如果详情表格没有数据，则提示请选择销售出库单
      if (this.dialogListTable == undefined) {
        this.$notify({
          title: "",
          message: "请选择销售出库单",
          type: "warning",
          duration: 2000
        });
        return;
      }
      // 触发顶级组件事件。该事件根据传递的参数获得表格数据。和下拉菜单数据
      this.$emit("confirmBtnClick", this.cateTableID);
      // 关闭dialog
      this.$store.commit("d2admin/sale/getDialogShow", false);
      //   触发dialog关闭事件
      this.dialogClose();
    },
    handleFilter() {
      this.dialogListTable = undefined;
      // 触发顶级组件事件，根据dialogQueryList参数请求数据
      this.$emit("getDialogTableByQuery");
    }
  }
};
</script>

<style lang="scss">
// dialog表格高度
.dialogTable {
  height: 750px;
  // d2内容组件右边距在dialog中为0
  .d2-container-full {
    right: 0 !important;
  }
  // 两个表格公公样式
  .table-card,
  .table-card-sub {
    margin: 10px 0;
    overflow: auto;
  }
  .table-card {
    height: 58%;
    margin-bottom: 10px;
  }
  .table-card-sub {
    height: 35%;
  }
}

// dialog中d2组件footer样式更改
.dialogTable .d2-container-full__footer {
  height: 80px;
  form.el-form {
    height: 100%;
    margin: 0 !important;
    display: flex;
    flex: 0 0 0;
    justify-content: flex-end;
    align-items: center;
    .el-form-item {
      margin: 0 10px !important;
    }
  }
}
</style>

