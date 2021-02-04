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
        class="d2header-form"
      >
        <!-- 按钮区 -->

        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <el-row>
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-refresh"
                    @click.stop="shuaxin"
                    size="small"
                  >刷新</el-button>
                </el-form-item>
                <!-- 新增按钮 -->
                <el-form-item>
                  <el-button type="success" @click="addBtn" icon="el-icon-edit" size="small">新建采购入库单</el-button>
                </el-form-item>
                <el-form-item label="订单号" prop="odd_num">
                  <el-input
                    v-model="listQuery.odd_num"
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
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="供应商" prop="supply_id">
                  <el-select v-model="listQuery.supply_id" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in listData.supply"
                      :key="item.id"
                      :label="item.supply_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </template>
            <el-row>
              <el-form-item label="支付类型" prop="payment_id">
                <el-select v-model="listQuery.payment_id" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in listData.payment"
                    :key="item.id"
                    :label="item.payment_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料" prop="goods_id">
                <el-select v-model="listQuery.goods_id" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in listData.genGoods"
                    :key="item.id"
                    :label="item.goods_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="handleFilter" icon="el-icon-search">查找</el-button>
              </el-form-item>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <!-- 搜索 -->
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :cateTableData="cateTableData"
      :mateTableData="mateTableData"
      :drawerShow="drawerShow"
      :cateLoading="cateLoading"
      :listLoading="listLoading"
      @handleEdit="handleEdit"
      @searchById="searchById"
      @modifyDrawerShow="modifyDrawerShow"
      @cateTableRef="cateTableRef"
      @getCateList="getCateList"
    />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
import {
  generatedList,
  enterDetails,
  submits
} from "@/api/purchase/purWare.js";

import { toDate } from "@libs/tools.js";

export default {
  components: {
    ContainCard
  },
  data() {
    return {
      cateTableData: [],
      mateTableData: [],
      listData: [], // 请求data属性全部数据
      listQuery: {
        // 搜索条件和按id查找
        record_id: undefined,
        odd_num: undefined,
        date: undefined,
        supply_id: undefined,
        payment_id: undefined,
        goods_id: undefined
      },
      drawerShow: false,
      listLoading: undefined,
      cateLoading: undefined,
      multipleTable: undefined // cateTabelRef
    };
  },
  created() {
    let showDrawer = this.$store.state.d2admin.purchase.wareDrawerShow;
    let id = this.$store.state.d2admin.purchase.record_id;
    this.$nextTick(() => {
      if (showDrawer === true && id !== undefined) {
        this.searchById(id);
      }
    });
    this.getCateList(undefined, "created");
  },
  computed: {
    // 导入按钮对应的状态
    importStatus() {
      return this.$store.state.d2admin.purchase.importStatus;
    }
  },
  // 组件要离开的时候把vuex保存的显示抽屉状态改为false。只有在表格导入栏中会更改状态为true
  beforeRouteLeave(to, from, next) {
    this.$store.commit("d2admin/purchase/getWareDrawerShow", false);
    next();
  },
  methods: {
    // 刷新
    shuaxin() {
      this.$refs.listQuery.resetFields();
      this.getCateList();
    },
    // 获取采购订单物料
    async getCateList(options, flag) {
      this.cateLoading = true;
      let res = await generatedList(options);
      this.listData = res.data;
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
      this.listLoading = true;
      let result = await enterDetails(options);
      this.listLoading = false;
      this.mateTableData = result.data.list;
    },
    searchById(id) {
      this.modifyDrawerShow(true);
      let option = {
        record_id: id
      };
      this.getEnterDetails(option);
    },
    // 处理编辑事件
    async handleEdit(row) {
      console.log(row);
      let {
        payment_id,
        stock_id,
        supply_id,
        bus_date,
        remarks,
        id,
        odd_num
      } = row;
      // 得到详情数据
      let result = await enterDetails({
        record_id: row.id
      });
      let tableData = result.data.list;
      // 保存vuex中
      this.$store.commit("d2admin/purchase/getTableData", {
        tableData,
        formData: {
          payment_id,
          stock_id,
          supply_id,
          bus_date,
          remarks,
          id,
          odd_num
        }
      });
      // 跳转页面
      this.$router.push("/purchase/add");
    },
    // 控制详情页显示或隐藏
    modifyDrawerShow(flag) {
      this.drawerShow = flag;
    },
    // 新建按钮挑战到新建页面
    addBtn() {
      this.$router.push("add");
    },

    // 搜索按鈕
    handleFilter() {
      // 整理请求参数
      let dataResult = [];
      let date;
      // 选择了日期,遍历数据更改格式。
      if (Array.isArray(this.listQuery.date)) {
        this.listQuery.date.forEach(item => {
          dataResult.push(toDate(item.getTime()));
        });
        date = { date: dataResult };
      }

      let option = Object.assign({}, this.listQuery, date);

      this.getCateList(option);
    },
    cateTableRef(ref) {
      this.multipleTable = ref;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
