<template>
  <div>
    <el-container>
      <el-aside width="250px" class="mat-contain-aside">
        <el-table
          v-loading="tableLoading"
          element-loading-text="Loading"
          :data="cateLists"
          border
          highlight-current-row
          @row-click="rowClick"
          ref="cateRef"
        >
          <el-table-column label="物料分类" align="center">
            <el-table-column prop="name" label="分类名称" align="center" />
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <el-card style="margin-left:20px">
          <el-table
            highlight-current-row
            v-loading="tableLoading"
            element-loading-text="Loading"
            :data="matList"
            border
          >
            <el-table-column :label="cateTbLabel">
              <el-table-column label="#" prop="id" width="70" align="center"></el-table-column>
              <el-table-column label="编码" prop="code" align="center" width="100"></el-table-column>

              <el-table-column label="商品名称" prop="goods_name" align="center" width="220"></el-table-column>purchase_price
              <el-table-column label="采购价格" prop="purchase_price" align="center" width="100">
                <template v-slot="slotProps">
                  <span>{{slotProps.row.purchase_price}}&nbsp;元</span>
                </template>
              </el-table-column>
              <el-table-column label="销售价格" prop="sale_price" align="center" width="100">
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
              <el-table-column label="退货数量" prop="retreat_num" align="center" width="100">
                <template v-slot="{row}">
                  <span>{{row.retreat_num}}&nbsp;台</span>
                </template>
              </el-table-column>
              <el-table-column label="剩余数量" align="center" width="80">
                <template v-slot="{row}">
                  <span style="color:red">{{row.current_num}}&nbsp;台</span>
                </template>
              </el-table-column>
              <el-table-column width="150" label="备注" prop="remarks" align="center"></el-table-column>
              <el-table-column width="150" label="操作" align="center">
                <template v-slot="slotProps">
                  <el-button size="mini" type="primary" @click="editBtn(slotProps.row)" plain>编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteBtn(slotProps.row.id,slotProps)"
                    plain
                    :ref="'deleteBtnRef'+slotProps.$index"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 新增的dialog  -->
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { goodsSaveEd, goodsDel } from "@/api/materiel/materiel.js";
export default {
  props: {
    tableLoading: {
      type: Boolean
    },
    cateLists: {
      type: Array
    },
    matList: {
      type: Array
    }
  },

  data() {
    return {
      cateTbLabel: "物料列表" // 分类表格的头部信息
    };
  },
  methods: {
    // 点击行
    rowClick(row) {
      // 获得点击行分类名不带括号
      let reg = /（\d）+/gi;
      let str = row.name.replace(reg, "");
      // 根据点击左侧分类表格给右侧列表表格表头提示对应的文字
      this.cateTbLabel = `属于分类 [${str}] 的列表`;
      // 触发父组件修改当前点分类信息
      this.$emit("modifyCurCate", row);
    },
    async deleteBtn(id, props) {
      // 这里是解决按钮点击后颜色不返回失焦颜色。
      // 由于按钮是循环渲染出来的。所以拿到真实dom，就要给每一按钮都添加一个refs属性
      // 这里用的是字符串deleteBtnRef+当前索引项。

      // 得到当前按钮对应的refs属性key
      let prop = "deleteBtnRef" + props.$index;
      // 当前按钮触发失去焦点事件
      this.$refs[prop].$el.blur();

      let confirmResult = await this.$confirm(
        "此操作将永久删除该选项, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult === "confirm") {
        let result = await goodsDel({ id });
        this.$notify({
          title: "",
          message: result.msg,
          type: "success",
          duration: 2000
        });
        this.$emit("getList");
      }
    },
    // 编辑按钮
    editBtn(row) {
      this.$emit("editDialog", row);
    }
  }
};
</script>

<style lang="scss" scoped>
.mat-contain-aside {
  padding: 20px 0 0 0;
}
</style>
