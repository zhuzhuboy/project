<template>
  <el-table
    border
    stripe
    :data="cateTableData"
    size="mini"
    highlight-current-row
    @cell-click="tableClick"
    v-loading="cateLoading"
    fit
    element-loading-text="加载中"
    ref="multipleTable"
  >
    <el-table-column align="center" label="#" prop="id" width="60" />

    <el-table-column align="center" label="操作员" prop="admin_name" />
    <el-table-column align="center" label="待审核" prop="status">
      <template v-slot="{row}">
        <el-button size="mini" type="success" v-if="row.status==1" disabled>已审核</el-button>
        <el-button size="mini" type="danger" v-else @click.stop="toBeReviewedBtn(row)">待审核</el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" label="订单号" prop="odd_num" width="116" />

    <el-table-column align="center" label="业务时间" prop="bus_date" />
    <el-table-column align="center" label="仓库名称" prop="stock_name" />

    <el-table-column align="center" label="预导入总数" prop="all_num">
      <template v-slot="{row}">
        <el-tag size="medium" :hit="true">{{row.all_num+' '}} 台</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" label="已导入数量" prop="import_num">
      <template v-slot="{row}">
          <span style="font-weight:700"> {{row.import_num+' '}} 台</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="采购金额" prop="p_amount" />
    <el-table-column align="center" label="税金" prop="p_taxes" />
    <el-table-column align="center" label="价税合计" prop="p_total_price" />

    <el-table-column align="center" label=" 供货商名称" prop="supply_name" width="160" />
    <el-table-column align="center" label="备注" prop="remarks" width="200" />
  </el-table>
</template>

<script>
import { submits } from "@/api/purchase/purWare.js";
export default {
  props: {
    cateTableData: {
      type: Array
    },
    cateLoading: {
      type: Boolean
    }
  },
  mounted() {
    // 传递el-table组件实例
    this.transmitRefDom();
  },
  methods: {
    tableClick(row) {
      // 点击这一行把这一行数据id保存起来。等到关闭表格导入窗口时候。会获取这个id。渲染出详情数据。
      this.$store.commit("d2admin/purchase/getRecord_id", row.id);

      // 保存vuex中数据
      let payload = {};
      payload.status = row.status;
      payload.odd_num = row.odd_num;
      payload.bus_date = row.bus_date;
      this.$store.commit("d2admin/purchase/getPurchaseInfo", payload);

      // 触发根据id得到详情信息事件。
      this.$emit("searchById", row.id);
    },
    // 传递el-table组件实例
    transmitRefDom() {
      // table组件
      let refDom = this.$refs.multipleTable;
      // 传递给父组件。父组件调用table表格方法。设置第一行高亮
      this.$emit("cateTableRef", refDom);
    },
    // 待审核按钮被点击
    async toBeReviewedBtn(row) {
      console.log(row);
      let confirmResult = await this.$confirm(
        "是否将该订单提交为已审核状态?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult === "confirm") {
        // 确认了，请求数据
        let options = {
          id: row.id
        };
        // 同步执行
        let result = await submits(options);
        // 触发更新
        this.$emit("getCateList");
      }
    }
  }
};
</script>

<style>
</style>
