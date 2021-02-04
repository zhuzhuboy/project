<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <el-form-item>
          <el-button icon="el-icon-check" type="success" @click="submitDevice">提交</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <contain-layout
      :tableData="tableData"
      :formData="formData"
      :remoteLoading="remoteLoading"
      :formSelect="formSelect"
      @formInput="formInput"
      @deleteItem="deleteItem"
      @raidoChange="raidoChange"
      @transmitFormRef="transmitFormRef"
    />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainLayout from "./components/ContainLayout ";
import {
  getRet,
  searchArea,
  retScan,
  retSubmit
} from "@/api/exchangeGoods/addScanReturn";
export default {
  components: {
    ContainLayout
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      //   表单数据
      formData: {
        type: 0,
        number: undefined,
        pay_id: undefined,
        stock_id: undefined,
        agent_uid: undefined,
        bus_date: undefined
      },
      //   表单下拉选项数据
      formSelect: {
        pay: undefined,
        stock: undefined,
        areaList: []
      },
      //   远程搜索列表数据
      //   远程搜索loading状态
      remoteLoading: true,
      //   form表单实例。用于验证
      formRef: undefined
    };
  },

  created() {
    this.getSeleteList();
  },
  methods: {
    //   请求到下拉框选项
    async getSeleteList() {
      let res = await getRet();
      this.formSelect.pay = res.data.pay;
      this.formSelect.stock = res.data.stock;
    },
    // input请求接口
    async formInput(e) {
      if (!e) return;
      let { type, number } = this.formData;
      //   判断是否重复提交
      let result = this.tableData.find(item => item.number_dev == e);
      if (result) {
        this.$message({
          message: "该扫码号在列表中已存在",
          type: "warning"
        });
        return;
      }
      // 请求接口
      let option = { type, number };
      let res = await retScan(option);
      //   接口请求成功后清空input
      this.formData.number = undefined;
      //   请求到数据加入到表格中
      let tableDataItem = res.data;
      this.tableData.push(tableDataItem);
    },
    // 切换按钮
    raidoChange(e) {
      // 切换的时候表格清空,表单重置
      this.formRef.resetFields();
      this.tableData = [];
    },
    // 删除一项
    deleteItem(i) {
      this.tableData.splice(i, 1);
    },

    // 得到el-form组件实例
    transmitFormRef(ref) {
      this.formRef = ref;
    },
    //   提交按钮
    async submitDevice() {
      // 验证表单
      this.formRef.validate(async result => {
        if (result) {
          // 接口请求的参数做处理
          let tables = [];
          this.tableData.forEach(item => {
            let table = { ...item };
            table.full_agent_area = undefined;

            tables.push(table);
          });
          let option = {
            ...this.formData,
            tables
          };
          let res = await retSubmit(option);
          this.$notify({
            title: "",
            message: res.msg,
            type: "success",
            duration: 2000
          });
          this.$router.push("/exchangeGoods/returnToWarehouse");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
