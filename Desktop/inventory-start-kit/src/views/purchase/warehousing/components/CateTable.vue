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
    class="ware-cate-table"
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
    <el-table-column align="center" label="#" prop="id" width="60" />

    <el-table-column align="center" label="订单号" prop="odd_num" width="116" />
    <el-table-column align="center" label="待确认" prop="status" width="100">
      <template v-slot="{row}">
        <el-button size="mini" type="success" v-if="row.status==1" disabled>已确认</el-button>
        <el-button size="mini" type="danger" v-else @click.stop="toBeReviewedBtn(row)">待确认</el-button>
      </template>
    </el-table-column>

    <el-table-column align="center" label="业务时间" prop="bus_date" />

    <el-table-column align="center" label="预导入总数" prop="all_num">
      <template v-slot="{row}">
        <el-tag size="medium" :hit="true">{{row.all_num+' '}} 台</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" label="已导入数量" prop="import_num">
      <template v-slot="{row}">
        <span style="font-weight:700">{{row.import_num+' '}} 台</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="采购金额" prop="p_amount" />
    <el-table-column align="center" label="税金" prop="p_taxes" v-if="$route.params.showTax" />
    <el-table-column align="center" label="价税合计" prop="p_total_price" />

    <el-table-column align="center" label=" 供货商名称" prop="supply_name" width="160" />
    <el-table-column align="center" label="备注" prop="remarks" />
    <el-table-column label="操作" align="center" width="160">
      <template v-slot="slotProps">
        <el-button
          size="mini"
          type="primary"
          @click.stop="editBtn(slotProps.row)"
          :disabled="slotProps.row.status==1"
          plain
        >编辑</el-button>
        <el-button
          :disabled="slotProps.row.status==1"
          size="mini"
          type="danger"
          @click.stop="deleteBtn(slotProps.row.id,slotProps)"
          plain
          :ref="'deleteBtnRef'+slotProps.$index"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { submits, del } from "@/api/purchase/purWare.js";
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
    // 编辑
    editBtn(row) {
      this.$emit("handleEdit", row);
    },
    // 删除按钮
    async deleteBtn(id, props) {
      // 这里是解决按钮点击后颜色不返回失焦颜色。
      // 由于按钮是循环渲染出来的。所以拿到真实dom，就要给每一按钮都添加一个refs属性
      // 这里用的是字符串deleteBtnRef+当前索引项。

      // 得到当前按钮对应的refs属性key
      let prop = "deleteBtnRef" + props.$index;
      // 当前按钮触发失去焦点事件
      this.$refs[prop].$el.blur();

      let confirmResult = await this.$confirm(
        "此操作将对应的物料详情，设备，统一删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult === "confirm") {
        let result = await del({ id });
        this.$notify({
          title: "",
          message: result.msg,
          type: "success",
          duration: 2000
        });
        this.$emit("getList");
      }
    },
    // 待确认按钮被点击
    async toBeReviewedBtn(row) {
      let confirmResult = await this.$confirm(
        "是否将该订单提交为已确认状态?",
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

<style lang="scss" scoped>
.ware-cate-table::v-deep {
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

