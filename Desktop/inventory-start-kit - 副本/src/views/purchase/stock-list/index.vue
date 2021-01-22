<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form
        :inline="true"
        ref="listQuery"
        size="small"
        style="margin-bottom: -20px;"
        label-width="120px"
        class="search-header"
      >
        <!-- 按钮区 -->

        <!-- 搜索区 -->
        <el-row>
          <el-form-item label="ID" label-width="70px">
            <el-input clearable v-model="listQuery.id" placeholder="请输入ID"></el-input>
          </el-form-item>
          <el-form-item label="厂家">
            <el-select v-model="listQuery.device_type" clearable placeholder="请选择厂家">
              <el-option
                v-for="item in searchForm.device_type"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="listQuery.type" clearable placeholder="请选择类型">
              <el-option
                v-for="item in searchForm.type"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="启动类型" >
            <el-select v-model="listQuery.is_crv" clearable placeholder="请选择启动类型">
              <el-option
                v-for="item in searchForm.is_crv"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机型" label-width="70px">
            <el-select v-model="listQuery.is_special" clearable placeholder="请选择机型">
              <el-option
                v-for="item in searchForm.is_special"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="设备号" label-width="70px">
            <el-input clearable v-model="listQuery.device_number" placeholder="请输入设备号"></el-input>
          </el-form-item>
          <el-form-item label="TBox 流水号">
            <el-input clearable v-model="listQuery.serial_number" placeholder="请输入TBox 流水号"></el-input>
          </el-form-item>
          <el-form-item label="主机号流水号">
            <el-input clearable v-model="listQuery.hosts_number" placeholder="请输入主机号流水号"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleFilter" icon="el-icon-search" size="small">查找</el-button>
        </el-row>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :tableList="tableList"
      :listLoading="listLoading"
      :showDetailInfo="showDetailInfo"
    />

    <!-- 底部 -->
    <template slot="footer">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="goPage"
      />
    </template>
  </d2-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
// 相对路径
import ContainCard from "./components/ContainCard";
// 首页API请求
import { stockDeviceList } from "@/api/purchase/stockList.js";
export default {
  components: {
    ContainCard,
    Pagination
  },
  data() {
    return {
      // 表格数据
      tableList: [],
      //   接口请求的数据集合
      listQuery: {
        page: 1,
        limit: 10,
        device_type: undefined,
        is_crv: undefined,
        is_special: undefined,
        type: undefined,
        device_number: undefined,
        serial_number: undefined,
        hosts_number: undefined,
        enter_details_id: undefined,
        id: undefined
      },
      //   表单下拉选项显示内容的值
      searchForm: {
        device_type: [
          {
            name: "澳多",
            value: 0
          },
          {
            name: "云掌行",
            value: 1
          }
        ],
        is_crv: [
          {
            name: "钥匙启动",
            value: 0
          },
          {
            name: "一键启动",
            value: 1
          }
        ],
        is_special: [
          {
            name: "通用机型",
            value: 0
          },
          {
            name: "专用机型",
            value: 1
          }
        ],
        type: [
          {
            name: "TBox",
            value: 0
          },
          {
            name: "主机",
            value: 1
          }
        ]
      },
      listLoading: false,
      total: 0,
      showDetailInfo: false //是否显示详细信息
    };
  },
  created() {
    this.routerJudge();
  },
  //   离开这个组件时
  beforeRouteLeave(to, from, next) {
    // 离开这个组件的时候。把查看按钮状态变为false。只有当点击查看按钮时候状态才为true。所以如果不是点击查看按钮跳转到此页面。查看状态不为true。就不会进入creatd生命周期函数的判断条件。
    this.$store.commit("d2admin/purchase/getIsLookUp", false);
    next();
  },
  computed: {
    //   是否是采购页面点击查看按钮跳转过来的
    isLookUp() {
      return this.$store.state.d2admin.purchase.isLookUp;
    },
    // 详情信息
    detailInfo() {
      return this.$store.state.d2admin.purchase.detailInfo;
    }
  },
  methods: {
    //   API请求数据
    async getDataList(option) {
      // 请求前加载状态
      this.listLoading = true;
      //   同步请求数据
      let result = await stockDeviceList(option);
      //   请求后取消加载状态
      this.listLoading = false;
      //   拿到数据赋值表格列表
      this.tableList = result.data.list;
      //   数据总数
      this.total = result.data.total;
    },
    // 过滤查找
    handleFilter() {
      // 浅拷贝
      let option = { ...this.listQuery };
      //   从第一页开始查找
      option.page = 1;
      this.getDataList(option);
    },
    goPage() {
      // 翻页功能必须携带查询参数。比如我查询条件是厂家为TBox有1000条。需要分页功能。点击第二页。显示的是厂家为TBox的第二页信息。如果不带查询参数。则会在有查询参数条件下点击下一页会显示无查询参数的页码。不符合业务需求

      let option = { ...this.listQuery };
      this.getDataList(option);
    },
    // 跳转判断
    routerJudge() {
      // 判断是否通过查看按钮跳转过来的
      if (this.isLookUp === true) {
        // 修改查询条件。物料信息id
        this.listQuery.enter_details_id = this.detailInfo.id;
        // 查看页面过来会额外显示的内容
        this.showDetailInfo = true;
      }
      // 参数
      let option = { ...this.listQuery };
      this.getDataList(option);
    }
  }
};
</script>

<style >
.search-header .el-input__inner {
  width: 140px;
}
</style>
