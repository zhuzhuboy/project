<template>
  <el-card>
    <el-alert type="success" center :closable="false" style="marginBottom:20px" title="详情信息"></el-alert>
    <!-- 详情表格 -->
    <el-table :data="detailTableData" style="width: 100%;" border class="exchange-detail-table">
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-form label-position="left" class="demo-table-expand" label-width="120px">
            <el-form-item label="厂家">
              <span v-if="row.device_type==0">澳多</span>
              <span v-if="row.device_type==1">云掌行</span>
            </el-form-item>
            <el-form-item label="设备机型">
              <span v-if="row.is_special==0">通用机型</span>
              <span v-if="row.is_special==1">专用机型</span>
            </el-form-item>
            <el-form-item label="设备类型">
              <span v-if="row.type==0">TBox</span>
              <span v-if="row.type==1">主机</span>
            </el-form-item>
            <el-form-item label="专用机型备注">
              <span>{{ row.car_model_remarks }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="id" label="#" width="70" />
      <!-- <el-table-column align="center" prop="device_type" label="厂家" width="100">
        <template v-slot="{row}">
          <span v-if="row.device_type==0">澳多</span>
          <span v-else>云掌行</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" prop="is_crv" label="启动方式" width="140">
        <template v-slot="{row}">
          <span v-if="row.is_crv==0">钥匙启动</span>
          <span v-else>一键启动</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="is_special" label="设备机型">
        <template v-slot="{row}">
          <span v-if="row.is_special==0">通用机型</span>
          <span v-if="row.is_special==1">专用机型</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="设备类型" width="100">
        <template v-slot="{row}">
          <span v-if="row.type==0">TBox</span>
          <span v-else>主机</span>
        </template>
      </el-table-column>-->

      <el-table-column align="center" prop="device_number" label="设备号" ></el-table-column>
      <el-table-column align="center" prop="serial_number" label="TBox流水号" ></el-table-column>

      <el-table-column align="center" prop="hosts_number" label="主机号" ></el-table-column>
      <!-- <el-table-column align="center" prop="car_model_remarks" label="专用机型备注" width="160"></el-table-column> -->
    </el-table>

    <!-- 替换信息 -->
    <el-alert type="success" center :closable="false" style="margin:20px 0px" title="替换信息"></el-alert>
    <!-- 详情表格 -->
    <el-table :data="recordTableData" style="width: 100%;" border>
      <el-table-column align="center" prop="id" label="#" width="70" />
      <!-- <el-table-column align="center" prop="full_area" label="代理地区"></el-table-column> -->

      <el-table-column align="center" prop="type" label="更换方式（四种）" width="160">
        <template v-slot="{row}">
          <span v-if="row.type==1">TBox</span>
          <span v-if="row.type==2">澳-通用主机</span>
          <span v-if="row.type==3">云-主机</span>
          <span v-if="row.type==4">澳-专用主机</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="is_crv" label="启动方式" width="100">
        <template v-slot="{row}">
          <span v-if="row.is_crv==0">钥匙启动</span>
          <span v-else>一键启动</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="old_number" label="旧流水号"></el-table-column>
      <el-table-column align="center" prop="new_number" label="新流水号"></el-table-column>

      <el-table-column align="center" prop="sale_device_id" label="销售设备id" width="100"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间" width="100"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    // 表格数据
    detailTableData: {
      type: Array
    },
    recordTableData: {
      type: Array
    }
  },
  methods: {
    //   触发删除事件
    deleteBtn(i) {
      this.$emit("deleteItem", i);
    }
  }
};
</script>

<style lang="scss" scoped>
.exchange-detail-table::v-deep {
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

