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
      >
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <el-form-item label="ID">
                <el-input v-model="listQuery.id" placeholder="请输入" clearable style="width:120px" />
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
                <el-select
                  v-model="listQuery.device_type"
                  placeholder="请选择厂家"
                  clearable
                  style="width:120px"
                >
                  <el-option label="澳多" value="0"></el-option>
                  <el-option label="云掌行" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="启动方式" prop="is_crv">
                <el-select
                  v-model="listQuery.is_crv"
                  placeholder="请选择启动方式"
                  clearable
                  style="width:120px"
                >
                  <el-option label="钥匙启动" value="0"></el-option>
                  <el-option label="一键启动" value="1"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item label="设备机型" prop="is_special">
              <el-select
                v-model="listQuery.is_special"
                placeholder="请选择设备机型"
                clearable
                style="width:140px"
              >
                <el-option label="通用机型" value="0"></el-option>
                <el-option label="专用机型" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型" prop="type">
              <el-select
                v-model="listQuery.type"
                placeholder="请选择设备类型"
                clearable
                style="width:120px"
              >
                <el-option label="TBox" value="0"></el-option>
                <el-option label="主机" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="TBox流水号" prop="serial_number">
              <el-input
                style="width:140px"
                v-model="listQuery.serial_number"
                placeholder="请输入TBox流水号"
                clearable
              />
            </el-form-item>

            <el-form-item label="客户地址" prop="address">
              <el-input
                v-model="listQuery.address"
                placeholder="请输入客户地址"
                clearable
                style="width:140px"
              />
            </el-form-item>
            <el-form-item label="主机流水号" prop="hosts_number">
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
          </el-collapse-item>
        </el-collapse>
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
import { retDevices } from "@/api/exchangeGoods/retDeviceList.js";

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
        serial_number: undefined,
        hosts_number: undefined,
        date: undefined,
        address: undefined,
        ret_details_id: undefined //根据id查看
      },
      listLoading: true
    };
  },
  created() {
    this.createdLoadData();
  },

  beforeRouteLeave(f, t, n) {
    //   当路由离开的时候把vuex保存id清空
    this.$store.commit("d2admin/sale/getRetWareDetail", {
      id: undefined
    });
    n();
  },
  computed: {
    //   退货详情表格中的数据，来自vuex
    retWareDetailData() {
      return this.$store.state.d2admin.sale.retWareDetail;
    }
  },
  methods: {
    // 刷新
    shuaxin() {
      this.$refs.listQuery.resetFields();
      let option = {
        page: 1,
        limit: 10,
        ret_details_id: this.listQuery.ret_details_id
      };
      this.getList(option);
    },
    // created声明周期请求数据
    createdLoadData() {
      //   拿到查看那一条id,如果有就是从查看跳转过来的
      if (this.retWareDetailData) {
        this.listQuery.ret_details_id = this.retWareDetailData.id;
      }

      let option = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        ret_details_id: this.listQuery.ret_details_id
      };
      this.getList(option);
    },

    // 获取数据
    async getList(option = this.listQuery) {
      this.listLoading = true;
      let res = await retDevices(option);
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

<style lang="scss" scoped>
</style>
