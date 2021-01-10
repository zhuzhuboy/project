<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <!-- 按钮区 -->
        <!-- 导入 -->
        <!-- <el-form-item>
          <el-upload :before-upload="handleUpload" action>
            <el-button icon="el-icon-download" size="small" type="primary">导入</el-button>
          </el-upload>
        </el-form-item>-->
        <el-form-item>
          <el-button icon="el-icon-delete" type="danger">清空</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-check" type="success" @click="submitDevice">提交</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <contain-layout ref="layoutRef" />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainLayout from "./components/ContainLayout ";
import { smtDevice } from "@/api/sale/delivery.js";
export default {
  components: {
    ContainLayout
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  computed: {
    cateTableInfo() {
      return this.$store.state.d2admin.sale.cateTableInfo;
    },
    detailTableInfo() {
      return this.$store.state.d2admin.sale.detailTableInfo;
    }
  },
  //   路由离开前。把状态更改
  beforeRouteLeave(to, from, next) {
    this.$store.commit("d2admin/sale/getDeliveryStatus", false);
    next();
  },
  methods: {
    //   提交按钮
    async submitDevice() {
      let table = this.$refs.layoutRef.tableData;
      let option = {};
      option.agent_uid = this.cateTableInfo.agent_uid;
      option.scan_type = this.detailTableInfo.scan_type;
      option.sale_details_id = this.detailTableInfo.id;
      option.tables = table;
      // 调用接口
      let res = await smtDevice(option);

      this.$notify({
        title: "",
        message: res.msg,
        type: "success",
        duration: 2000
      });

      this.$router.push("/sale/orderList");
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
