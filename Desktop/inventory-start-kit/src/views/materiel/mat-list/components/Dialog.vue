<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogShow"
    width="40%"
    @close="cancelBtn('editForm')"
    class="pd-lr-50"
  >
    <el-form ref="refForm" :model="data" label-width="80px" :rules="rules" label-position="left">
      <el-row :gutter="20">
        <el-col :span="13">
          <el-form-item label="物料分类" prop="category_id">
            <el-select v-model="data.category_id" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in formSelect.idArr"
                :key="item.id"
                :label="cateName(item.name)"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="物料编码" prop="code">
            <el-input v-model="data.code" clearable placeholder="输入编码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="物料名称" prop="goods_name">
        <el-input v-model="data.goods_name" clearable placeholder="请输入物料名称"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="规格型号" prop="spec">
            <el-input v-model="data.spec" clearable placeholder="规格型号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计量单位" prop="unit">
            <el-input v-model="data.unit" clearable placeholder="（个、盒）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="销售单价" prop="sale_price">
            <span class="china-money" v-show="data.sale_price">￥</span>
            <el-input
              v-model="data.sale_price"
              type="txet"
              placeholder="输入价格"
              @blur="moneyPadEnd(data,'sale_price')"
              clearable
              :maxlength="32"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购单价" prop="purchase_price">
            <span class="china-money" v-show="data.purchase_price">￥</span>
            <el-input
              v-model="data.purchase_price"
              clearable
              placeholder="输入价格"
              @blur="moneyPadEnd(data,'purchase_price')"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="启动类型" prop="is_crv">
            <el-select v-model="data.is_crv" placeholder="请选择启动类型" clearable>
              <el-option label="钥匙启动" value="0"></el-option>
              <el-option label="一键启动" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="扫描类型" prop="scan_type">
            <el-select v-model="data.scan_type" placeholder="请选择扫描类型" clearable>
              <el-option label="TBox" value="1"></el-option>
              <el-option label="澳多通用主机" value="2"></el-option>
              <el-option label="云掌行主机" value="3"></el-option>
              <el-option label="澳多专用主机" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="税率" prop="tax_rate">
        <el-select v-model="data.tax_rate" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in formSelect.tax_rateArr"
            :key="item.id"
            :label="item.rate_name"
            :value="item.tax_rate"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物料类型" prop="m_type">
        <el-select v-model="data.m_type" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in formSelect.m_typeArr"
            :key="item.id"
            :label="item.name || item.type_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="data.remarks" clearable placeholder="请输入备注内容"></el-input>
      </el-form-item>

      <slot />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn" size="small">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmBtn"
        size="small"
        icon="el-icon-check"
        class="dialog-cfm-btn"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validateCode } from "@libs/util.validator.js";
export default {
  data() {
    return {
      select: {
        is_crv: []
      },
      rules: {
        category_id: [
          { required: true, message: "请输入分类ID", trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入物料编码", trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ],
        tax_rate: [{ required: true, message: "请输入税率", trigger: "blur" }],
        sale_price: [
          { required: true, message: "请输入销售价格", trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ],
        purchase_price: [
          { required: true, message: "请输入购买价格", trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ],
        spec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
        m_type: [
          { required: true, message: "请输入无物料类型", trigger: "blur" }
        ],
        goods_name: [
          { required: true, message: "请输入计量单位", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object
    },
    title: {
      type: String
    },
    formSelect: {//form表单的select选项
      type: Object
    }
  },
  computed: {
    // 父组件维护dialog显示或隐藏。当前组件中会修改父组件传递过来的属性。所以使用计算属性。当对话框关闭，会触发父组件更新状态。重新拿到响应的值
    dialogShow: {
      get() {
        return this.dialogVisible;
      },
      set() {
        console.log(7);
        this.$emit("dialogClose");
      }
    }
  },
  methods: {
    // 取消按钮
    cancelBtn() {
      // 表单重置
      this.$refs.refForm.resetFields();
    },
    confirmBtn() {
      let refDom = this.$refs.refForm;
      this.$emit("confirmClick", refDom);
    },
    cateName(val) {
      let reg = /（\d）+/gi;
      let str = val.replace(reg, "");
      return str;
    },
    // 金钱小数点补齐
    moneyPadEnd(data, key) {
      // 得到绑定的值
      let value = data[key];
      // 正则匹配是否有.
      let hasDot = /\./;
      // 没有.还不为空
      if (!hasDot.test(value) && data[key]) {
        // 补全
        data[key] += ".00";
        // 退出
        return;
      }
      // .后面只有1位
      let hasOne = /\.\d{1}$/;
      if (hasOne.test(value)) {
        // 补全
        data[key] += "0";
      }
      // .xx后面还有，则删除
      let restNum = /(?<=\.\d{2})[\d-\D]+/;
      if (restNum.test(data[key])) {
        data[key] = data[key].replace(restNum, "");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-cfm-btn {
  padding-left: 8px;
  padding-right: 8px;
}
.pd-lr-50 {
  padding: 0 50px;
}
.money-input {
}
.china-money,
.money-format {
  position: absolute;
  z-index: 999;
  left: 2px;
}
</style>
