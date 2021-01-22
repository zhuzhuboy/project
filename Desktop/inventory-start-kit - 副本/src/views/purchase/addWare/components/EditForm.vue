<template>
  <div class="edit-form">
    <el-form
      :model="form"
      ref="addWareForm"
      label-width="80px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col :span="4" style="min-width:220px">
          <el-form-item label="单号">
            <span class="font-red">保存后自动生成</span>
          </el-form-item>
        </el-col>

        <el-col :span="7" style="max-width:300px;min-width:300px">
          <el-form-item label="业务日期" prop="bus_date">
            <el-date-picker v-model="form.bus_date" clearable ref="dataPicker" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" class="supplier">
          <el-form-item label="供应商" prop="supply_id">
            <el-select v-model="form.supply_id" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in formData.supply"
                :key="item.id"
                :label="item.supply_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row :gutter="20">
        <el-col :span="4" style="min-width:220px" class="warehouse">
          <el-form-item label="入库仓库" prop="stock_id">
            <el-select v-model="form.stock_id" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in formData.stock"
                :key="item.id"
                :label="item.stock_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="付款方式" prop="payment_id" class required>
            <el-select v-model="form.payment_id" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in formData.payment"
                :key="item.id"
                :label="item.payment_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row>
        <el-col :span="13">
          <el-form-item label="备注" prop="infoRemarks">
            <el-input type="textarea" v-model="form.infoRemarks" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import EditTable from './EditTable'
export default {
  components: {
    EditTable
  },
  mounted () {
    // 传递ref
    this.$emit('getFormRef', this.$refs.addWareForm)
  },
  data () {
    return {
      rules: {
        supply_id: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        stock_id: [
          { required: true, message: '请选择仓库', trigger: 'change' }
        ],
        payment_id: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ],
        bus_date: [
          { required: true, message: '请选择业务日期', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    formData: {
      type: Object
    },
    form: {
      type: Object
    }
  }
}
</script>

<style lang="scss" >
.demo-ruleForm {
  font-size: 13px;
  .font-red {
    color: red;
    font-size: 13px;
  }
  // 供应商，入库，业务员
  .supplier,
  .warehouse,
  .salesman {
    position: relative;
    .supplier-card,
    .warehouse-card,
    .salesman-card {
      position: absolute;
      top: 40px;
      z-index: 99;
    }
    .supplier-input,
    .warehouse-input,
    .salesman-input {
      width: 200px;
      margin-bottom: 4px;
    }
  }
}
</style>
