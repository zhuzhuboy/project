<template>
  <div>
    <el-table
      border
      stripe
      :data="cateTableData"
      highlight-current-row
      @cell-click="tableClick"
      ref="multipleTable"
      class="return-cate-table"
    >
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-form label-position="left" class="demo-table-expand" label-width="100px">
            <el-form-item label="操作员">
              <span>{{ row.admin_name }}</span>
            </el-form-item>
            <el-form-item label="仓库名称">
              <span>{{ row.stock_name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="id" label="#" width="60" />

      <el-table-column align="center" label="状态" width="100">
        <template v-slot="{row}">
          <el-button
            size="small"
            type="primary"
            v-if="row.status==0"
            @click.stop="deliverBtn(row)"
          >待确定</el-button>
          <el-button size="small" type="success" v-if="row.status==1">已确定</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="退货订单号" prop="ret_orderNum" width="100" />
      <el-table-column align="center" prop="name" label="客户姓名" width="100" />
      <el-table-column align="center" prop="address" label="客户地址" width="140" />

      <el-table-column align="center" label="业务日期" prop="bus_date" width="100" />

      <el-table-column align="center" label="退款金额" prop="ret_price" width="80" />
      <el-table-column align="center" label="退款税金" prop="ret_taxes" width="80" />
      <el-table-column align="center" label="退款全额" prop="ret_price_tax" width="80" />

      <el-table-column align="center" label="支付方式" prop="pay_name" width="100" />
      <el-table-column align="center" label="创建时间" prop="create_time" width="100" />

      <el-table-column align="center" prop="remarks" label="备注" />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    cateTableData: {
      type: Array
    }
  },
  mounted() {
    this.transmitRefDom();
  },
  methods: {
    tableClick(row) {
      this.$emit("searchById", row.id);
    },
    // 传递el-table组件实例
    transmitRefDom() {
      // table组件
      let refDom = this.$refs.multipleTable;
      // 传递给父组件。父组件调用table表格方法。设置第一行高亮
      this.$emit("cateTableRef", refDom);
    },
    // 待确定
    async deliverBtn(row) {
      this.$emit("toVerifyBtn", row.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.return-cate-table::v-deep {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
