<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="listQuery"
        ref="listQuery"
        size="small"
        style="margin-bottom: -20px;"
        label-width="90px"
        class="deliver-form"
      >
        <el-row>
          <el-form-item label="ID">
            <el-input v-model="listQuery.id" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="业务日期" prop="hosts_number">
            <el-date-picker
              v-model="listQuery.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="设备厂家" prop="device_type">
            <el-select v-model="listQuery.device_type" placeholder="请选择厂家" clearable>
              <el-option label="澳多" value="0"></el-option>
              <el-option label="云掌行" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启动方式" prop="is_crv">
            <el-select v-model="listQuery.is_crv" placeholder="请选择启动方式" clearable>
              <el-option label="钥匙启动" value="0"></el-option>
              <el-option label="一键启动" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备机型" prop="is_special">
            <el-select v-model="listQuery.is_special" placeholder="请选择设备机型" clearable>
              <el-option label="通用机型" value="0"></el-option>
              <el-option label="专用机型" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型" prop="type">
            <el-select v-model="listQuery.type" placeholder="请选择设备类型" clearable>
              <el-option label="TBox" value="0"></el-option>
              <el-option label="主机" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="设备号" prop="device_number" class="el-input-col">
            <el-input
              style="width:140px"
              v-model="listQuery.device_number"
              placeholder="请输入设备号"
              clearable
            />
          </el-form-item>

          <el-form-item label="TBox流水号" prop="serial_number" class="el-input-col">
            <el-input
              style="width:140px"
              v-model="listQuery.serial_number"
              placeholder="请输入TBox流水号"
              clearable
            />
          </el-form-item>

          <el-form-item label="主机流水号" prop="hosts_number" class="el-input-col">
            <el-input
              v-model="listQuery.hosts_number"
              placeholder="请输入主机流水号"
              clearable
              style="width:140px"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleFilter" icon="el-icon-search">查找</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard @getList="getList" :lists="lists" :listLoading="listLoading" />

    <!-- 底部 -->
    <template slot="footer">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/ContainCard";
import { saleDevice } from "@/api/sale/deliveryList.js";

export default {
  components: {
    Pagination,
    ContainCard
  },

  data() {
    return {
      lists: [],
      total: 0,
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        device_type: undefined,
        is_crv: undefined,
        is_special: undefined,
        type: undefined,
        device_number: undefined,
        serial_number: undefined,
        hosts_number: undefined,
        date: undefined,
        sale_details_id: undefined
      },
      listLoading: true
    };
  },
  created() {
    if (this.lookUpStatus == true && this.detailInfo) {
      this.listQuery.sale_details_id = this.detailInfo.id;
    }
    this.getList();
  },
  beforeRouteLeave(f, t, n) {
    this.$store.commit("d2admin/sale/getLookUpStatus", false);
    this.$store.commit("d2admin/sale/getDetailTableInfo", undefined);
    this.$store.commit("d2admin/sale/getCateTableInfo", undefined);

    n();
  },
  computed: {
    detailInfo() {
      return this.$store.state.d2admin.sale.detailTableInfo;
    },
    lookUpStatus() {
      return this.$store.state.d2admin.sale.lookUpStatus;
    }
  },
  methods: {
    // 刷新
    shuaxin() {
      this.getList();
    },

    // 获取数据
    async getList() {
      this.listLoading = true;
      let res = await saleDevice(this.listQuery);
      this.lists = res.data.list;
      this.total = res.data.total;
      this.listLoading = false;
    },

    // 搜索按鈕
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>
<style lang="scss">
.deliver-form {
  .el-input--small .el-input__inner {
    width: 90px;
  }
  .el-input-col input.el-input__inner {
    width: 100%;
  }
}
</style>

