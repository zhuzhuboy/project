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
          <el-button type="success" @click="addBtn" icon="el-icon-edit" size="small">新建采购入库单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="editBtn"
            icon="el-icon-edit-outline"
            size="small"
          >编辑采购入库单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteBtn" icon="el-icon-delete" size="small">删除采购入库单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitBtn" icon="el-icon-upload" size="small">提交入库</el-button>
        </el-form-item>

        <!-- 订单号搜索 -->
        <el-row>
          <el-form-item label="订单号">
            <el-input
              v-model="listQuery.odd_num"
              placeholder="输入订单号"
              clearable
              style="width: 100px;"
            />
          </el-form-item>

          <el-form-item label="业务日期">
            <el-date-picker
              v-model="listQuery.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="供应商">
            <el-select v-model="listQuery.supply_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in listData.supply"
                :key="item.id"
                :label="item.supply_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="支付类型">
            <el-select v-model="listQuery.payment_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in listData.payment"
                :key="item.id"
                :label="item.payment_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物料">
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
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard
      :cateTableData="cateTableData"
      :mateTableData="mateTableData"
      :drawerShow="drawerShow"
      :multipleTable="multipleTable"
      @searchById="searchById"
      @modifyDrawerShow="modifyDrawerShow"
      @cateTableRef="cateTableRef"
    />
    <router-view />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
// 相对路径
import ContainCard from "./components/ContainCard";
import { generatedList, enterDetails } from "@/api/purchase/purOrder.js";

import { toDate } from "@libs/tools.js";

export default {
  components: {
    ContainCard
  },

  data() {
    return {
      cateTableData: [],
      mateTableData: [],
      listData: [], //请求data属性全部数据
      listQuery: {
        //搜索条件和按id查找
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
      multipleTable: undefined //cateTabelRef
    };
  },
  created() {
    let id = this.$store.state.d2admin.purchase.record_id;
    if (id !== undefined) {
      console.log(id)
      this.searchById(id)
    }
    this.getCateList(undefined, "created");
  },

  methods: {
    // 刷新
    shuaxin() {
      this.getCateList();
    },

    // 获取采购订单物料
    async getCateList(options, flag) {
      this.cateLoading = true;
      let res = await generatedList(options);
      this.listData = res.data;
      console.log(res);
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
      console.log(result);
      this.mateTableData = result.data.list;
    },
    searchById(id) {
      this.modifyDrawerShow(true);
      let option = {
        record_id: id
      };
      this.getEnterDetails(option);
    },

    // 控制详情页显示或隐藏
    modifyDrawerShow(flag) {
      this.drawerShow = flag;
    },
    addBtn() {
      this.$router.push("add");
    },
    editBtn() {
      this.$router.push("tbImport");
    },
    deleteBtn() {},
    submitBtn() {},
    // 搜索按鈕
    handleFilter() {
      // 整理请求参数
      let dataResult = [];
      let date = undefined;
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
.row-margin {
  margin-top: 20px;
}
</style>
