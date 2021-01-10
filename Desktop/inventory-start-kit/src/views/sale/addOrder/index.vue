<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <!-- 按钮区 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="shuaxin" size="small">刷新</el-button>
        </el-form-item>
        <!-- 保存 -->
        <el-form-item>
          <el-button type="success" @click="saveBtn" icon="el-icon-edit" size="small">保存</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :listLoading="listLoading"
      :tableData="tableData"
      :formSel="formSel"
      :listTable="listTable"
      @addInfo="addInfo"
      @getFormRef="getFormRef"
      @deleteInfo="deleteInfo"
      @getEditFormRef="getEditFormRef"
    />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
// 首页API请求

import { structuralClone, toDate } from "@libs/tools.js";
import {
  saleGetInfo,
  searchArea,
  perInfo,
  saveOrder
} from "@api/sale/saleList.js";
// 表格一行数据模板
let tempDate = {
  s_goods_id: undefined,
  s_goods_code: undefined,
  s_goods_name: undefined,
  s_purchase_num: {
    value: undefined,
    show: false
  },
  s_tax_price: undefined,
  s_unit: undefined,
  s_one_price: undefined,
  s_all_price: undefined,
  s_tax_rate: undefined,
  s_taxes: undefined,
  s_total_tax_price: "0.00",
  s_spec: undefined,
  is_crv: undefined,
  scan_type: undefined,
  s_remarks: {
    value: undefined,
    show: false
  }
};
export default {
  components: {
    ContainCard
  },

  data() {
    return {
      //   form下拉选项
      formSel: {
        stock_id: undefined,
        pay_id: undefined
      },
      //   子表格数据
      listTable: [],
      //   表单的实例对象
      formRef: undefined,
      //   编辑表单实例对象
      editFormRef: undefined,
      // 可编辑表格数据
      tableData: [
        {
          s_goods_id: undefined,
          s_goods_code: undefined,
          s_goods_name: undefined,
          s_purchase_num: {
            value: undefined,
            show: false
          },
          s_tax_price: undefined,
          s_unit: undefined,
          s_one_price: undefined,
          s_all_price: undefined,
          s_tax_rate: undefined,
          s_taxes: undefined,
          s_total_tax_price: "0.00",
          s_spec: undefined,
          is_crv: undefined,
          scan_type: undefined,
          s_remarks: {
            value: undefined,
            show: false
          }
        }
      ],
      //   子表格加载动画
      listLoading: undefined
    };
  },
  created() {
    this.getSaleInfoList();
  },
  methods: {
    // 刷新
    shuaxin() {
      this.getSaleInfoList();
    },

    // 获取物料分类数据
    async getSaleInfoList() {
      this.listLoading = true;
      let res = await saleGetInfo();
      res = res.data;
      console.log(res);
      this.formSel.stock_id = res.stock;
      this.formSel.pay_id = res.payment;
      let newArr = res.goods.filter(item => item.current_num > 0);
      // this.listTable.push(newArr)
      this.listTable = res.goods;
      this.listLoading = false;
    },
    // 保存按钮
    saveBtn() {
      // 验证form表单
      if (this.formRef) {
        this.formRef.validate(async (result, obj) => {
          if (result) {
            console.log(this.editFormRef.form);
            // 得到编辑表单组件对象的form对象保存的elementUI日期组件的数据。
            let time = this.editFormRef.form.bus_date.getTime();
            // 浅拷贝this.editFormRef.form为formData。因为属性都是一般类型。无需深度克隆
            let formData = { ...this.editFormRef.form };
            // formData日期属性格式修改
            formData.bus_date = toDate(time);
            // 处理表格中的数据
            // 需要对数据进行处理
            let tables = [];
            this.tableData.forEach(item => {
              // 保存数据在新对象中
              let temp = { ...item };
              // 修改新对象属性
              // 修改数量和备注
              temp.s_purchase_num = temp.s_purchase_num.value;
              temp.s_remarks = temp.s_remarks.value;
              // 修改完了加入新数组
              tables.push(temp);
            });
            // 过滤表格数组中不符合的项。数组中的每一个对象中只要有一个为undefined就不满足。
            tables = tables.filter(item => {
              let flag = true;
              for (const key in item) {
                if (Object.hasOwnProperty.call(item, key)) {
                  const element = item[key];
                  //   值是空并且key不是remarks
                  //   相当于排除key是remarks。
                  if (element === undefined && key !== "s_remarks") {
                    return false;
                  }
                }
              }
              return flag;
            });
            // 如果tables数组为空。则表示没有按规定填写好数据。进行提示。然后退出函数
            if (
              tables.length === 0 ||
              tables.length !== this.tableData.length
            ) {
              this.$notify({
                title: "",
                message: "请将表格输入完整",
                type: "请将表格输入完整",
                duration: 2000
              });
              return;
            }

            // API接口参数
            let options = { ...formData, tables };
            console.log(options);
            let res = await saveOrder(options);
            this.$notify({
              title: "",
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$router.push("orderList");
          } else {
            for (const key in obj) {
              if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key][0];
                console.log(element);
                this.$notify({
                  title: "",
                  message: element.message,
                  type: "error",
                  duration: 2000
                });
              }
              return false;
            }
          }
        });
      }
    },
    // 添加新一行
    async addInfo() {
      // table表格新数据(通过深度克隆一个表格数据模板)
      let newTableDataItem = await structuralClone(tempDate);
      // 追加一个数据。该数据必须是一个新的对象，子属性是对象也得是新的对象。避免造成input框点击。表格的一列input都显示
      this.tableData.push(newTableDataItem);
    },
    // 删除一条
    deleteInfo(index) {
      this.tableData.splice(index, 1);
      // 如果length为0，则新增一条
      if (this.tableData.length == 0) {
        this.addInfo();
      }
    },
    // 得到el-form组件。为了调用表单验证方法
    getFormRef(ref) {
      this.formRef = ref;
    },
    getEditFormRef(ref) {
      this.editFormRef = ref;
    }
  }
};
</script>
