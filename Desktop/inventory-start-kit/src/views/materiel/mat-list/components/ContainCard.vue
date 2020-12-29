<template>
  <el-card>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="cateLists"
      style="width: 15%;margin-bottom: 20px; float:left"
      border
      highlight-current-row
      @row-click="rowClick"
      ref="cateRef"
    >
      <el-table-column prop="name" label="物料分类" align="center">
        <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
      </el-table-column>
    </el-table>

    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="matList"
      border
      style="width: 83%;margin-bottom: 20px;float:right"
    >
      <el-table-column :label="cateTbLabel">
        <el-table-column label="#" prop="id" width="70" align="center"></el-table-column>
        <el-table-column label="编码" prop="code" align="center" width="100"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name" align="center"></el-table-column>purchase_price
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
            <span>{{slotProps.row.purchase_price}}&nbsp;%</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="unit" align="center" width="70"></el-table-column>
        <el-table-column width="150" label="备注" prop="remarks" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="slotProps">
            <el-button type="primary" plain size="small" @click="editBtn(slotProps.row)">编辑</el-button>
            <el-button
              type="danger"
              plain
              size="small"
              @click="deleteBtn(slotProps.row.id,slotProps)"
              :ref="'deleteBtnRef'+slotProps.$index"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!-- 新增的dialog  -->

    <Dialog
      :dialogVisible="addDialogVisible"
      :data="formData"
      title="新增物料列表"
      @dialogClose="dialogClose"
      @confirmClick="addConfirm"
    ></Dialog>

    <!-- 编辑的dialog -->

    <Dialog
      :dialogVisible="editDialogVisible"
      :data="rowData"
      title="编辑供应商"
      @dialogClose="dialogClose"
      @confirmClick="editConfirm"
    />
  </el-card>
</template>

<script>
import { goodsSaveEd, goodsDel } from "@/api/info/materiel.js";
import Dialog from "./Dialog.vue";
export default {
  components: {
    Dialog
  },
  props: {
    listLoading: {
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
    editDialogVisible: {
      type: Boolean
    },
    listData: {
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
        remarks: undefined
      },
      rowData: {}, // 数据回填数据
      cateTbLabel: "物料列表" // 分类表格的头部信息
    };
  },
  computed: {
    listTableHeight() {
      console.log(this.cateTableHeight);
      if (this.cateTableHeight) {
        return this.cateTableHeight * 0.8;
      }
    }
  },
  methods: {
    // 新增对话框确认事件
    async addConfirm() {
      let data = this.formData;
      // 分类id为0是新建物料列表
      // 把一些属性重置为undefined就不会随请求传递过去
      data = {
        ...data,
        id: 0,
        tax_rateArr: undefined,
        m_typeArr: undefined,
        idArr: undefined
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
    // 编辑按钮
    editBtn(row) {
      // 解构重命名
      let {
        goodType: m_typeArr,
        rate: tax_rateArr,
        category: idArr
      } = this.listData;
      idArr = idArr.slice(1);
      this.$emit("editDialog", true);
      // 把数据回填的行数据初始化好
      this.rowData = { ...row, m_typeArr, tax_rateArr, idArr };
    },
    // 编辑对话框确认事件
    editConfirm(refDom) {
      // 表单验证
      refDom.validate(async flag => {
        if (!flag) return;
        // 接口参数
        let data = this.rowData;
        data = {
          ...data,
          m_typeArr: undefined,
          idArr: undefined,
          tax_rateArr: undefined
        };
        console.log(data);
        let result = await goodsSaveEd(data);

        this.$notify({
          title: "",
          message: result.msg,
          type: "success",
          duration: 2000
        });
        this.$emit("editDialog", false);
        this.$emit("getList");
      });
    },
    // 关闭dialog，dialog隐藏
    dialogClose() {
      this.$emit("editDialog", false);
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
    },
    // 删除按钮
    async deleteBtn(id, props) {
      // 这里是解决按钮点击后颜色不返回失焦颜色。
      // 由于按钮是循环渲染出来的。所以拿到真实dom，就要给每一按钮都添加一个refs属性
      // 这里用的是字符串deleteBtnRef+当前索引项。

      // 得到当前按钮对应的refs属性key
      let prop = "deleteBtnRef" + props.$index;
      // 当前按钮触发失去焦点事件
      this.$refs[prop].$el.blur();

      // 删除提示信息
      let confirmResult = await this.$confirm(
        "此操作将永久删除该选项, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      // 确认删除
      if (confirmResult === "confirm") {
        // 调用删除接口
        let result = await goodsDel({ id });
        //更新
        this.$emit("getList");
        // 消息提示
        this.$notify({
          title: "",
          message: result.msg,
          type: "success",
          duration: 2000
        });
      }
    }
  },
  watch: {
    listData(val) {
      if (val) {
        // 物料类型下拉数据
        this.formData.m_typeArr = val.goodType;
        // 物料类型下拉数据
        this.formData.tax_rateArr = val.rate;
        this.formData.idArr = val.category.slice(1);
        console.log(this.rowData);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
