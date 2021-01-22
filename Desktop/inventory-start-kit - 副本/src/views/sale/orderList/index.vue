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
      >
        <!-- 按钮区 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="shuaxin" size="small">刷新</el-button>
        </el-form-item>
        <!-- 新增按钮 -->
        <el-form-item>
          <el-button type="success" @click="addBtn" icon="el-icon-edit" size="small">新建销售订单</el-button>
        </el-form-item>
        <el-form-item prop="status">
          <el-radio-group v-model="listQuery.status" @change="radioChange" size="small">
            <el-radio-button label="0">待导入</el-radio-button>
            <el-radio-button label="1">待发货</el-radio-button>
            <el-radio-button label="2">已发货</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 订单号搜索 -->
        <el-row>
          <el-form-item label="id" prop="id">
            <el-input v-model="listQuery.id" placeholder="输入id号" clearable style="width: 100px;" />
          </el-form-item>
          <el-form-item label="订单号" prop="sale_orderNum">
            <el-input
              v-model="listQuery.sale_orderNum"
              placeholder="输入订单号"
              clearable
              style="width: 100px;"
            />
          </el-form-item>

          <el-form-item label="业务日期" prop="date">
            <el-date-picker
              v-model="listQuery.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="地区" prop="full_agent_area">
            <el-input
              v-model="listQuery.full_agent_area"
              placeholder="输入地区"
              clearable
              style="width: 100px;"
            />
          </el-form-item>
          <el-form-item label="收货人姓名" prop="receive_name">
            <el-input
              v-model="listQuery.receive_name"
              placeholder="输入收货人姓名"
              clearable
              style="width: 100px;"
            />
          </el-form-item>

          <el-form-item label="收货人手机号" prop="receive_phone">
            <el-input
              v-model="listQuery.receive_phone"
              placeholder="输入收货人手机号"
              clearable
              style="width: 100px;"
            />
          </el-form-item>

          <el-form-item label="快递单号" prop="express_no">
            <el-input
              v-model="listQuery.express_no"
              placeholder="输入快递单号"
              clearable
              style="width: 100px;"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleFilter" icon="el-icon-search">查找</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :cateTableData="cateTableData"
      :mateTableData="mateTableData"
      :drawerShow="drawerShow"
      @searchById="searchById"
      @modifyDrawerShow="modifyDrawerShow"
      @cateTableRef="cateTableRef"
      @getCateList="getCateList"
      @reLoad="reLoad"
    />

    <!-- 底部 -->
    <template slot="footer">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="pagination"
      />
    </template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
import { genSaleList, findSaleGoods } from "@/api/sale/saleOrderList.js";
import { toDate } from "@libs/tools.js";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "sale-orderList",
  components: {
    ContainCard,
    Pagination
  },
  activated() {
    this.getCateList(this.listQuery, "created");
  },
  data() {
    return {
      cateTableData: [],
      mateTableData: [],
      listQuery: {
        page: 1,
        limit: 10,
        // 搜索条件和按id查找
        sale_orderNum: undefined,
        date: undefined,
        full_agent_area: undefined,
        receive_name: undefined,
        receive_phone: undefined,
        id: undefined,
        express_no: undefined,
        status: 0 //状态
      },
      total: 0, // 总数
      drawerShow: false,
      listLoading: undefined,
      cateLoading: undefined,
      multipleTable: undefined // cateTabelRef
    };
  },
  computed: {
    //   vuex保存的进入组件是否显示抽屉的条件
    showDrawer() {
      return this.$store.state.d2admin.sale.wareDrawerShow;
    },
    // 分类id。获取详情的参数
    cateId() {
      return this.$store.state.d2admin.sale.cateTableInfo.agent_uid;
    }
  },
  created() {
    this.getCateList(this.listQuery, "created");
  },

  methods: {
    pagination() {
      // 分页组件利用v-model.sync实现了父子组件传参的双向数据绑定。所以这里已经发生了改变。直接调用接口就完事了

      let option = { ...this.listQuery };
      this.getCateList(option);
    },
    // 刷新
    shuaxin() {
      this.$refs.listQuery.resetFields();
      // 刷新就从第一页请求。一页10条数据。不带筛选信息的。
      let status = this.listQuery.status;
      let option = {
        page: 1,
        limit: 10,
        status
      };
      this.getCateList(option);
    },
    // 获取采购订单物料
    async getCateList(options, flag) {
      this.cateLoading = true;
      let res = await genSaleList(options);
      this.total = res.data.total;
      this.cateTableData = res.data.record;
      this.cateLoading = false;
      // 如果flag是created证明是第一次加载。设置当前第一个数据是高亮显示
      if (flag === "created") {
        this.$nextTick(() => {
          this.multipleTable.setCurrentRow(this.cateTableData[0], true);
        });
      }
    },
    // 得到详情并赋值
    async getEnterDetails(options) {
      // 抽屉组件显示
      this.modifyDrawerShow(true);
      this.listLoading = true;
      let result = await findSaleGoods(options);
      this.listLoading = false;
      this.mateTableData = result.data.list;
    },
    searchById(id) {
      let option = {
        record_id: id
      };
      this.getEnterDetails(option);
    },

    // 控制详情页显示或隐藏
    modifyDrawerShow(flag) {
      console.log(flag);
      this.drawerShow = flag;
    },
    // 新建按钮跳转到到新建页面
    addBtn() {
      this.$router.push("addOrder");
    },
    // 搜索按鈕
    handleFilter() {
      // 整理请求参数
      //  搜索结果必须从第一页开始
      this.listQuery.page = 1;
      let option = Object.assign({}, this.listQuery);
      this.getCateList(option);
    },
    cateTableRef(ref) {
      this.multipleTable = ref;
    },
    radioChange() {
      this.reLoad();
    },
    reLoad() {
      let option = {
        ...this.listQuery
      };
      this.getCateList(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
