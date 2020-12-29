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
      @getWareInfo="getWareInfo"
      :formData="allData"
      :listLoading="listLoading"
      :tableData="tableData"
      :form="form"
      @addInfo="addInfo"
      @getFormRef="getFormRef"
      @deleteInfo="deleteInfo"
    />
    <router-view />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
// 首页API请求
import { getInfo, save } from "@/api/purchase/addWare.js";
import { structuralClone, toDate } from "@libs/tools.js";
// 表格一行数据模板
let tempDate = {
  goods_id: undefined,
  goods_code: undefined,
  goods_name: undefined,
  spec: undefined,
  purchase_num: {
    value: undefined,
    show: false
  },
  one_price: undefined,
  all_price: undefined,
  tax_price: undefined,
  tax_rate: undefined,
  taxes: undefined,
  total_tax_price: "0.00",
  unit: undefined,
  remarks: {
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
      // 表单数据
      form: {
        bus_date: undefined, // 日期
        supply_id: undefined, //供应商
        stock_id: undefined, //仓库
        payment_id: undefined, //付款
        infoRemarks: undefined //备注
      },
      formRef: undefined,
      // 请求全部数据
      allData: {},
      // 可编辑表格数据
      tableData: [
        {
          goods_id: undefined,
          goods_code: undefined,
          goods_name: undefined,
          spec: undefined,
          purchase_num: {
            value: undefined,
            show: false
          },
          one_price: undefined,
          all_price: undefined,
          tax_price: undefined,
          tax_rate: undefined,
          taxes: undefined,
          total_tax_price: "0.00",
          unit: undefined,
          remarks: {
            value: undefined,
            show: false
          }
        }
      ],
      listLoading: undefined,
    };
  },
  created() {
    this.getWareInfo();
  },
  methods: {
    // 刷新
    shuaxin() {
      this.getWareInfo();
    },

    // 获取物料分类数据
    async getWareInfo() {
      this.listLoading = true;
      let res = await getInfo();
      this.allData = res.data;
      this.listLoading = false;
    },
    // 保存按钮
    saveBtn() {
      // 验证form表单
      if (this.formRef) {
        this.formRef.validate(async (result, obj) => {
          if (result) {
            // 得到elementUI日期组件的数据
            let time = this.form.bus_date.getTime();
            // 浅拷贝this.form为formData。因为属性都是一般类型。无需深度克隆
            let formData = { ...this.form };
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
              temp.purchase_num = temp.purchase_num.value;
              temp.remarks = temp.remarks.value;
              // 修改完了加入新数组
              tables.push(temp);
            });
            // 过滤表格数组中不符合的项。数组中的每一个对象中只要有一个为undefined就不满足。
            tables = tables.filter(item => {
              let flag = true;
              for (const key in item) {
                if (Object.hasOwnProperty.call(item, key)) {
                  const element = item[key];
                  if (!element) {
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
                type: "error",
                duration: 2000
              });
              return;
            }

            // API接口参数
            let options = { ...formData, tables };
            let res = await save(options);
            this.$notify({
              title: "",
              message: res.msg,
              type: "success",
              duration: 2000
            });
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
      // 如果是最后一条，则不删除
      if (this.tableData.length == 1) return;
      this.tableData.splice(index, 1);
    },
    //得到el-form组件。为了调用表单验证方法
    getFormRef(ref) {
      this.formRef = ref;
    }
  }
};
</script>

