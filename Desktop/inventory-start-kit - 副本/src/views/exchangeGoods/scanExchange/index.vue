<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <el-form-item>
          <el-button icon="el-icon-d-arrow-right" type="success" @click="nextBtn">下一个</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button icon="el-icon-check" type="success" @click="submitDevice">提交</el-button>
        </el-form-item>-->
      </el-form>
    </template>

    <!-- 内容区 -->
    <contain-layout
      :detailTableData="detailTableData"
      :recordTableData="recordTableData"
      :formData="formData"
      :formSelect="formSelect"
      :replaceStatus="replaceStatus"
      @getDetailTableData="getDetailTableData"
      @replaceGoods="replaceGoods"
      @deleteItem="deleteItem"
      @raidoChange="raidoChange"
      @remoteMethod="remoteMethod"
      @selectVisibleChange="selectVisibleChange"
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
  findOldDevice,
  searchArea,
  barter
} from "@/api/exchangeGoods/scanExGoods";
export default {
  components: {
    ContainLayout
  },
  data() {
    return {
      // 详情表格数据
      detailTableData: [],
      //    替换记录表格数据
      recordTableData: [],
      //   表单数据
      formData: {
        type: 1,
        new_number: undefined,
        old_number: undefined,
        pay_id: undefined,
        stock_id: undefined,
        agent_uid: undefined,
        bus_date: undefined
      },
      //   表单下拉选项数据
      formSelect: {
        pay: undefined,
        stock: undefined,
        //   远程搜索列表数据
        areaList: [],
        //   远程搜索loading状态
        remoteLoading: true
      },

      //   form表单实例。用于验证
      formRef: undefined,
      //   判断替换按钮的状态
      replaceStatus: false
    };
  },

  //   路由离开前。把状态更改
  //   beforeRouteLeave(to, from, next) {
  //     this.$store.commit("d2admin/sale/getDeliveryStatus", false);
  //     next();
  //   },
  created() {
    console.log(this.$route);
    // this.getSeleteList();
  },
  methods: {
    //   请求到下拉框选项
    async getSeleteList() {
      let res = await getRet();
      this.formSelect.pay = res.data.pay;
      this.formSelect.stock = res.data.stock;
    },
    // 点击查看获得详情数据
    async getDetailTableData() {
      let { type, old_number, agent_uid } = this.formData;
      if (!old_number) return;
      //  验证客户地区是否填写
      let validateResult;
      this.formRef.validateField("agent_uid", res => {
        if (res) {
          validateResult = true;
        }
      });
      console.log(validateResult);
      //   如果没有填写，则退出
      if (validateResult) return;

      // 请求接口
      let option = { type, old_number, agent_uid };
      let res = await findOldDevice(option);
      //   请求到数据加入到表格中
      this.detailTableData = res.data.list;
    },
    // 替换
    replaceGoods() {
      this.formRef.validate(async res => {
        if (res) {
          let { agent_uid, type, old_number, new_number } = this.formData;
          let option = {
            agent_uid,
            type,
            old_number,
            new_number,
            old_id: this.detailTableData[0].id
          };
          let res = await barter(option);
          this.$notify({
            title: "",
            message: res.msg,
            type: "success",
            duration: 2000
          });
          this.recordTableData = res.data.list;
          this.replaceStatus = true;
        }
      });
    },
    // 删除一项
    deleteItem(i) {
      this.detailTableData.splice(i, 1);
    },
    // 远程请求
    async remoteMethod(e) {
      if (!e) return;
      this.formSelect.remoteLoading = true;
      let option = {
        area: e
      };
      let res = await searchArea(option);
      this.formSelect.remoteLoading = false;
      this.formSelect.areaList = res.data;
    },
    // 得到el-form组件实例
    transmitFormRef(ref) {
      this.formRef = ref;
    },
    // 切换按钮
    raidoChange() {
      // 切换的时候表格清空,表单重置
      this.formRef.resetFields();
      this.detailTableData = [];
      this.recordTableData = [];
    },
    // 远程请求下拉框隐藏时候触发，清空下拉框数据
    selectVisibleChange() {
      this.formSelect.areaList = [];
    },
    // 下一个
    nextBtn() {
      this.replaceStatus = false;
      this.raidoChange();
    }
    //   提交按钮
    // async submitDevice() {
    //   // 验证表单
    //   this.formRef.validate(async result => {
    //     if (result) {
    //       // 接口请求的参数做处理
    //       let tables = [];
    //       this.detailTableData.forEach(item => {
    //         let table = { ...item };
    //         table.full_agent_area = undefined;

    //         tables.push(table);
    //       });
    //       let option = {
    //         ...this.formData,
    //         tables
    //       };
    //       let res = await retSubmit(option);
    //       this.$notify({
    //         title: "",
    //         message: res.msg,
    //         type: "success",
    //         duration: 2000
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>
