<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <!-- 按钮区 -->
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="chooseReturnReceiptBtn"
            size="small"
          >选择销售出库单</el-button>
        </el-form-item>
        <!-- 保存 -->
        <el-form-item>
          <el-button type="success" @click="saveBtn" icon="el-icon-check" size="small">保存</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <!-- 新建销售退货入库单 -->
    <ContainCard
      :dialogCateLoading="dialogCateLoading"
      :dialogCateTable="dialogCateTable"
      :dialogListQuery="dialogListQuery"
      :formSel="formSel"
      :tableData="tableData"
      @getFormRef="getFormRef"
      @getDialogTableByQuery="getDialogTableByQuery"
      @confirmBtnClick="confirmBtnClick"
      @getEditFormRef="getEditFormRef"
      @deleteTableData="deleteTableData"
    />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
// 首页API请求

import { retDocument, optSale, retSave } from "@api/exchangeGoods/addReturnReceipt.js";
// 表格一行数据模板

export default {
  components: {
    ContainCard
  },

  data() {
    return {
      //   form下拉选项
      formSel: {},
      //   表格数据
      tableData: undefined,
      //   dialog分类表格数据
      dialogCateTable: [],
      //   表单的实例对象
      formRef: undefined,
      //   编辑表单实例对象
      editFormRef: undefined,
      // dialog的form
      dialogListQuery: {
        sale_orderNum: undefined,
        date: undefined,
        area: undefined
      },
      //   dialog分类表格加载动画
      dialogCateLoading: undefined
    };
  },
  created() {
    this.getDialogTable();
  },
  methods: {
    // 获取dialog表格数据
    async getDialogTable(option) {
      this.dialogCateLoading = true;
      let res = await retDocument(option);
      //   dialog分类表格数据
      this.dialogCateTable = res.data.saleRecord;
      this.dialogCateLoading = false;
      //   下拉选中
      let { pay, stock } = res.data;
      console.log(pay, stock);
      let formSel = {
        pay,
        stock,
        info: undefined
      };
      this.$set(this, "formSel", formSel);
      console.log(55555)
    },
    getFormSelete(formData) {
      this.formSel = formData;
    },
    // 根据参数请求dialog表格数据
    getDialogTableByQuery() {
      let option = this.dialogListQuery;
      this.getDialogTable(option);
    },
    // 选择销售出库单按钮
    chooseReturnReceiptBtn() {
      this.$store.commit("d2admin/sale/getDialogShow", true);
      this.getDialogTable();
    },
    // 点击选中按钮传递来的事件，请求接口
    async confirmBtnClick(id) {
      let option = {
        record_id: id
      };
      let res = await optSale(option);
      this.tableData = res.data.list;
      let { info } = res.data;
    //   获取
      this.formSel.info = {
        //   文字
        label: info.full_agent_area,
        //绑定 form表单的值
        value: id
      };

      console.log(this.formSel.info);
    },
    // 根据索引删除执行项
    deleteTableData(index) {
      if (this.tableData.length === 1) {
        this.$notify({
          title: "",
          message: "确保退货商品列表中,至少有一条数据存在",
          type: "warning",
          duration: 2000
        });
        return;
      }
      this.tableData.splice(index, 1);
    },
    // 得到el-form组件。为了调用表单验证方法
    getFormRef(ref) {
      this.formRef = ref;
    },
    // 得到editForm组件中的属性
    getEditFormRef(ref) {
      this.editFormRef = ref;
    }, // 保存按钮
    saveBtn() {
      // 验证form表单
      if (this.formRef) {
        this.formRef.validate(async (result, obj) => {
          if (result) {
            let tables = [];
            // 取到需要作为参数传递的数据
            this.tableData.forEach(item => {
              let table = {};
              table.r_goods_code = item.s_goods_code;
              table.r_goods_name = item.s_goods_name;
              table.r_spec = item.s_spec;
              table.ret_num = item.ret_num;
              table.unit = item.s_unit;
              // 退货单价(不含税)
              table.ret_one_price = item.ret_one_price;
              //   退货金额(不含税)
              table.ret_price = item.ret_price_NoTax;
              //税率
              table.tax_rate = item.s_tax_rate;
              table.remarks = item.s_remarks;
              tables.push(table);
            });
            let formData = { ...this.editFormRef.form };
            let option = {
              ...formData,
              tables
            };
            console.log(option);
            let res = await retSave(option);
          }
        });
      }
    }
  }
};
</script>
