<template>
  <el-card style="width:100%">
    <el-alert
      title
      type="success"
      :closable="false"
      :center="true"
      v-if="this.cateInfo &&this.detailInfo"
      style="margin-bottom:20px;display:flex;justify-content:space-between"
      class="card-title"
    >
      <span>品名：{{this.detailInfo.s_goods_name}}</span>
      <span>收货人姓名：{{this.cateInfo.receive_name}}</span>
      <span>收货地址：{{this.cateInfo.receive_address}}</span>
      <span>数量：{{this.detailInfo.s_purchase_num}}</span>
    </el-alert>

    <el-table
      v-loading="listLoading"
      :data="lists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="deliver-list-table"
    >
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-form label-position="left" class="demo-table-expand" label-width="100px">
            <el-form-item label="客户姓名">
              <span>{{ row.name }}</span>
            </el-form-item>
            <el-form-item label="客户地址">
              <span>{{ row.address }}</span>
            </el-form-item>
            <el-form-item label="厂家">
              <span v-if="row.device_type==0">澳</span>
              <span v-if="row.device_type==1">云</span>
            </el-form-item>

            <el-table-column label="厂家" prop="device_type" width="80" align="center">
              <template v-slot="{row}">
                <span>{{row.device_type==0?'澳':'云'}}</span>
              </template>
            </el-table-column>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="#" align="center" prop="id" width="80" />
      <!-- <el-table-column label="客户姓名" prop="name" width="100" align="center" />
      <el-table-column label="客户地址" prop="address" width="100" align="center" />-->
      <el-table-column width="100" align="center" label="设备订单号" prop="sale_orderNum" />
      <el-table-column width="100" align="center" label="业务日期" prop="bus_date" />

      <el-table-column label="设备类型" prop="type" width="100" align="center">
        <template v-slot="{row}">
          <span>{{row.type==0?'TBox':'主机'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="启动方式" prop="is_crv" width="100" align="center">
        <template v-slot="{row}">
          <span>{{row.is_crv==0?'钥匙启动':'一键启动'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备号" prop="device_number" width="160" align="center" />

      <el-table-column label="TBox流水号" prop="serial_number" width="120" align="center" />

      <el-table-column label="设备机型" prop="is_special" width="100" align="center">
        <template v-slot="{row}">
          <el-tag v-if="row.is_special==0">通用机型</el-tag>
          <el-tag v-if="row.is_special==1">专用机型</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="主机流水号" prop="hosts_number" width="120" align="center" />

      <el-table-column label="专用机备注" align="center" prop="car_model_remarks" />

      <el-table-column label="导入时间" prop="create_time" width="100" align="center" />
      <!-- <el-table-column label="操作" align="center"></el-table-column> -->
    </el-table>
  </el-card>
</template>

<script>
import { stockSave } from "@/api/info/warehouse.js";
export default {
  props: {
    listLoading: {
      type: Boolean
    },
    lists: {
      type: Array
    }
  },
  computed: {
    detailInfo() {
      return this.$store.state.d2admin.sale.detailTableInfo;
    },
    cateInfo() {
      return this.$store.state.d2admin.sale.cateTableInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
// title
.card-title::v-deep {
  .el-alert__content {
    display: block;
    width: 100%;
  }
  p.el-alert__description {
    display: flex;
    justify-content: space-around;
    margin: 0px;
  }
  p.el-alert__description span {
    margin: 0 10px;
  }
}
// 表格expand
.deliver-list-table::v-deep {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
