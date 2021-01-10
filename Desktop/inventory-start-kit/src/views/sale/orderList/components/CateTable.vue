<template>
  <div>
    <el-table
      border
      stripe
      :data="cateTableData"
      size="mini"
      highlight-current-row
      @cell-click="tableClick"
      ref="multipleTable"
    >
      <el-table-column align="center" prop="id" label="#" width="60" />
      <el-table-column align="center" label="操作员" prop="admin_name" />
      <el-table-column align="center" label="业务日期" prop="bus_date" width="100" />
      <el-table-column align="center" prop="sale_orderNum" label="订单号" width="100" />
      <el-table-column align="center" prop="stock_name" label="仓库名称" width="100" />
      <el-table-column align="center" prop="s_purchase_num_sum" label="出库数量" width="100">
        <template v-slot="{row}">{{row.s_purchase_num_sum}}台</template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template v-slot="{row}">
          <el-button size="small" type="primary" v-if="row.status==0">待导入</el-button>
          <el-button
            size="small"
            type="danger"
            v-if="row.status==1"
            @click.stop="deliverBtn(row)"
          >待发货</el-button>
          <el-button size="small" type="success" v-if="row.status==2" disabled>已发货</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="full_agent_area" label="代理地址" width="140" />

      <el-table-column align="center" prop="receive_name" label="收货人" />
      <el-table-column align="center" prop="receive_phone" label="收货人电话" width="110" />
      <el-table-column align="center" prop="receive_address" label="收货地址" width="180" />
      <el-table-column align="center" prop="express_name" label="快递名称" />
      <el-table-column align="center" prop="express_no" label="快递单号" />
      <el-table-column align="center" prop="s_amount" label="总金额" />
      <el-table-column align="center" prop="s_taxes" label="税金" />
      <el-table-column align="center" prop="s_total_price" label=" 价税合计" />
      <!-- <el-table-column align="center" prop="remarks" label="备注" /> -->
    </el-table>
    <el-dialog
      title="请填写快递信息"
      :visible.sync="dialogFormVisible"
      width="30%"
      @close="dialogClose"
    >
      <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="快递公司" prop="express_name">
          <el-input v-model="form.express_name" placeholder="请输入快递公司" clearable></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="express_no" width="200px">
          <el-input v-model="form.express_no" placeholder="请输入快递单号" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" icon="el-icon-check" type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { submits } from "@/api/purchase/purWare.js";
import { deliverStatus } from "@/api/sale/saleOrderList.js";
export default {
  data() {
    return {
      tr: true,
      form: {
        express_name: undefined,
        express_no: undefined
      },
      dialogFormVisible: false,
      rules: {
        express_no: [
          { required: true, message: "请输入快递单号", trigger: "blur" }
        ],
        express_name: [
          { required: true, message: "请输入快递公司", trigger: "blur" }
        ]
      },
      rowInfo: undefined
    };
  },
  props: {
    cateTableData: {
      type: Array
    }
  },
  mounted() {
    this.transmitRefDom();
  },
  methods: {
    dialogClose() {
      // 关闭后form表单重置
      this.$refs.ruleForm.resetFields();
    },
    tableClick(row) {
      // 点击这一行把这一行数据用vuex保存起来
      let payload = {};
      //   uid
      payload.agent_uid = row.agent_uid;
      //   代理地址
      payload.full_agent_area = row.full_agent_area;
      //   收货地址
      payload.receive_address = row.receive_address;
      //   收货人
      payload.receive_name = row.receive_name;
      this.$store.commit("d2admin/sale/getCateTableInfo", payload);
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
    // 待发货按钮被点击
    deliverBtn(row) {
      this.rowInfo = row;
      this.dialogFormVisible = true;
    },
    async confirmBtn() {
      this.$refs.ruleForm.validate(async result => {
        //   验证表单是否通过
        if (result) {
          let confirmResult = await this.$confirm(
            "快递信息填写完整，是否变更已发货状态?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).catch(err => err);

          if (confirmResult === "confirm") {
            // 确认了，请求数据
            let option = {};
            option.record_id = this.rowInfo.id;
            option.express_name = this.form.express_name;
            option.express_no = this.form.express_no;
            let res = await deliverStatus(option);
            this.$refs.ruleForm.resetFields();
            this.dialogFormVisible = false;

            this.$notify({
              title: "",
              type: "success",
              message: res.msg,
              duration: 2000
            });

            this.$emit("reLoad");
          }
        }
      });
    }
  }
};
</script>
