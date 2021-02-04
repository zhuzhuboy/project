<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header" class="abccccccc">
      <header class="ret-ware-header">
        <el-form
          :inline="true"
          :model="listQuery"
          ref="listQuery"
          size="small"
          style="margin-bottom: -20px;"
          label-position="right"
          label-width="100px"
        >
          <!-- 按钮区 -->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-refresh" @click.stop="shuaxin" size="small">刷新</el-button>
                </el-form-item>
                <!-- 新增按钮 -->
                <el-form-item>
                  <el-button
                    type="success"
                    @click="addReturnReceiptBtn"
                    icon="el-icon-edit"
                    size="small"
                  >扫码退货</el-button>
                </el-form-item>
                <el-form-item prop="status">
                  <el-radio-group v-model="listQuery.status" @change="radioChange" size="small">
                    <el-radio-button label="0">待确定</el-radio-button>
                    <el-radio-button label="1">已确定</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="id" prop="id" class label-width="30px">
                  <el-input v-model="listQuery.id" placeholder="输入id号" clearable />
                </el-form-item>
                <el-form-item label="退货订单号" prop="ret_orderNum" class>
                  <el-input v-model="listQuery.ret_orderNum" placeholder="请输入退货订单号" clearable />
                </el-form-item>
                <el-form-item label="地区" prop="area" class label-width="50px">
                  <el-input v-model="listQuery.area" placeholder="请输入输入地区" clearable />
                </el-form-item>
              </template>
              <el-form-item label="业务日期" prop="date" class label-width="70px">
                <el-date-picker
                  v-model="listQuery.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleFilter" icon="el-icon-search">查找</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <!-- 订单号搜索 -->
        </el-form>
      </header>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :cateTableData="cateTableData"
      :mateTableData="mateTableData"
      :drawerShow="drawerShow"
      @toVerifyBtn="toVerifyBtn"
      @searchById="searchById"
      @modifyDrawerShow="modifyDrawerShow"
      @cateTableRef="cateTableRef"
      @getCateList="getCateList"
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
// 相对路径
import ContainCard from "./components/ContainCard";
import {
  retLists,
  retDetails,
  retExamine
} from "@/api/exchangeGoods/returnToWarehouse.js";
import { toDate } from "@libs/tools.js";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "sale-orderList",
  components: {
    ContainCard,
    Pagination
  },
  data() {
    return {
      cateTableData: [],
      mateTableData: [],
      listQuery: {
        page: 1,
        limit: 10,
        // 搜索条件和按id查找
        status: 0,
        ret_orderNum: undefined,
        area: undefined,
        date: undefined,
        id: undefined
      },
      total: 0, // 总数
      drawerShow: false,
      listLoading: undefined,
      cateLoading: undefined,
      cateTable: undefined // cateTabelRef
    };
  },
  computed: {},
  created() {
    this.getCateList(this.listQuery, "created");
  },

  methods: {
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
      let res = await retLists(options);
      this.total = res.data.total;
      this.cateTableData = res.data.list;
      this.cateLoading = false;
      // 如果flag是created证明是第一次加载。设置当前第一个数据是高亮显示
      if (flag === "created") {
        this.$nextTick(() => {
          this.cateTable.setCurrentRow(this.cateTableData[0], true);
        });
      }
    },

    // 得到详情并赋值
    async getDetailsData(options) {
      // 抽屉组件显示
      this.modifyDrawerShow(true);
      this.listLoading = true;
      let result = await retDetails(options);
      this.listLoading = false;
      this.mateTableData = result.data.list;
    },
    searchById(id) {
      let option = {
        record_id: id
      };
      this.getDetailsData(option);
    },

    // 控制详情页显示或隐藏
    modifyDrawerShow(flag) {
      console.log(flag);
      this.drawerShow = flag;
    },
    // 跳转到扫码退货入库
    addReturnReceiptBtn() {
      this.$router.push("addScanReturn");
    },
    // 搜索按鈕
    handleFilter() {
      //  搜索结果必须从第一页开始
      this.listQuery.page = 1;
      let option = Object.assign({}, this.listQuery);
      //   请求数据
      this.getCateList(option);
    },
    // 保存elementUI表格的实例对象，用于设置表格第一行高亮显示
    cateTableRef(ref) {
      this.cateTable = ref;
    },

    // 重新请求数据，分页组件和子组件触发。分页组件利用v-model.sync实现了父子组件传参的双向数据绑定。所以这里已经发生了改变。直接调用接口就完事了
    goPage() {
      let option = {
        ...this.listQuery
      };
      this.getCateList(option);
    },
    // 单选按钮切换事件
    radioChange(e) {
      this.handleFilter();
    },
    // 提交确定
    async toVerifyBtn(id) {
      let option = {
        record_id: id
      };
      let result = await this.$confirm(
        "是否将该订单提交为已确定状态?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(result => result);
      if (result == "confirm") {
        let res = await retExamine(option);
        this.$notify({
          title: "",
          message: res.msg,
          type: "success",
          duration: 2000
        });
        this.shuaxin();
      }
    }
  }
};
</script>

