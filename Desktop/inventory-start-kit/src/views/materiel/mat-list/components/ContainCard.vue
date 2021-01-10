<template>
  <el-card>
    <el-table
      v-loading="tableLoading"
      element-loading-text="Loading"
      :data="cateLists"
      style="width: 15%;margin-bottom: 20px; float:left"
      border
      highlight-current-row
      @row-click="rowClick"
      ref="cateRef"
    >
      <el-table-column prop="name" label="物料分类" align="center">
        <el-table-column prop="name" label="分类名称" align="center" />
      </el-table-column>
    </el-table>

    <el-table
      highlight-current-row
      v-loading="tableLoading"
      element-loading-text="Loading"
      :data="matList"
      border
      style="width: 83%;margin-bottom: 20px;float:right"
    >
      <el-table-column :label="cateTbLabel">
        <el-table-column label="#" prop="id" width="70" align="center"></el-table-column>
        <el-table-column label="编码" prop="code" align="center" width="100"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name" align="center" width="220"></el-table-column>purchase_price
        <el-table-column label="采购价格" prop="purchase_price" align="center">
          <template v-slot="slotProps">
            <span>{{slotProps.row.purchase_price}}&nbsp;元</span>
          </template>
        </el-table-column>
        <el-table-column label="销售价格" prop="sale_price" align="center">
          <template v-slot="slotProps">
            <span>{{slotProps.row.sale_price}}&nbsp;元</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type_name" align="center"></el-table-column>
        <el-table-column label="规格" prop="spec" align="center"></el-table-column>
        <el-table-column label="税率" prop="tax_rate" align="center">
          <template v-slot="slotProps">
            <span>{{slotProps.row.tax_rate}}&nbsp;%</span>
          </template>
        </el-table-column>

        <el-table-column label="入库数" width="80" align="center">
          <template v-slot="{row}">{{row.enter_num}}&nbsp;台</template>
        </el-table-column>
        <el-table-column label="出库数" align="center" width="80">
          <template v-slot="{row}">{{row.out_num}}&nbsp;台</template>
        </el-table-column>
        <el-table-column label="剩余数量" align="center" width="80">
          <template v-slot="{row}">
            <span style="color:red">{{row.current_num}}&nbsp;台

                
            </span>
          </template>
        </el-table-column>
        <el-table-column width="150" label="备注" prop="remarks" align="center"></el-table-column>
      </el-table-column>
    </el-table>

    <!-- 新增的dialog  -->

    <Dialog
      :dialogVisible="addDialogVisible"
      :data="formData"
      title="新增物料列表"
      :formSelect="formSelect"
      @dialogClose="dialogClose"
      @confirmClick="addConfirm"
    ></Dialog>
  </el-card>
</template>

<script>
import { goodsSaveEd, goodsDel } from "@/api/materiel/materiel.js";
import Dialog from "./Dialog.vue";
export default {
  components: {
    Dialog
  },
  props: {
    tableLoading: {
      type: Boolean
    },
    cateLists: {
      type: Array
    },
    matList: {
      type: Array
    },
    addDialogVisible: {
      type: Boolean
    },

    formSelect: {
      type: Object
    }
  },

  data() {
    return {
      // 编辑表单数据
      formData: {
        category_id: undefined,
        code: undefined,
        goods_name: undefined,
        spec: undefined,
        unit: undefined,
        sale_price: undefined,
        purchase_price: undefined,
        tax_rate: undefined,
        m_type: undefined,
        remarks: undefined,
        is_crv: undefined,
        scan_type: undefined
      },
      cateTbLabel: "物料列表" // 分类表格的头部信息
    };
  },
  methods: {
    // 新增对话框确认事件
    async addConfirm() {
      let data = this.formData;
      // 分类id为0是新建物料列表
      // 把一些属性重置为undefined就不会随请求传递过去
      data = {
        ...data,
        id: 0
      };

      let result = await goodsSaveEd(data);

      this.$notify({
        title: "",
        message: result.msg,
        type: "success",
        duration: 2000
      });
      this.$emit("addDialog", false);
      // 更新列表
      this.$emit("getList");
    },

    // 关闭dialog，dialog隐藏
    dialogClose() {
      this.$emit("addDialog", false);
    },
    // 点击行
    rowClick(row) {
      console.log(row);
      // 获得点击行分类名不带括号
      let reg = /（\d）+/gi;
      let str = row.name.replace(reg, "");
      console.log(str);
      // 根据点击左侧分类表格给右侧列表表格表头提示对应的文字
      this.cateTbLabel = `属于分类 [${str}] 的列表`;
      // 触发父组件修改当前点分类信息
      this.$emit("modifyCurCate", row);
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
