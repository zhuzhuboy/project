<template>
  <el-card>
    <el-table
      :data="lists"
      style="width: 80%;margin-bottom: 20px; float:left"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @row-click="rowClick"
    >
      <!-- 展开行 -->
      <el-table-column type="expand">
        <el-table :data="tableData1" border style="width: 100%;margin-bottom: 20px;float:right">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" label-width="180px">
            <el-form-item label="商品名称">
              <el-input v-model="props.row.name"></el-input>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
    </el-table>
      </el-table-column>
      <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="tax_rate" label="税率" width="120" align="center"></el-table-column>
    </el-table>

    <!-- 新增的dialog  -->

    <Dialog
      :dialogVisible="addDialogVisible"
      :data="formData"
      title="新增物料分类"
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
import { gCateSaveEd } from '@/api/info/materiel.js'
import Dialog from './Dialog.vue'
export default {
  components: {
    Dialog
  },
  props: {
    listLoading: {
      type: Boolean
    },
    lists: {
      type: Array
    },
    addDialogVisible: {
      type: Boolean
    },
    editDialogVisible: {
      type: Boolean
    }
  },

  data () {
    return {
      // 编辑表单数据
      formData: {
        code: '',
        tax_rate: '',
        name: '',
        remarks: ''
      },
      rowData: {}, // 数据回填数据

      tableData1: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ]
    }
  },
  methods: {
    // 新增对话框确认事件
    async addConfirm () {
      let data = this.formData
      data = { ...data, id: 0 }
      let result = await gCateSaveEd(data)

      this.$notify({
        title: '',
        message: result.msg,
        type: 'success',
        duration: 2000
      })
      this.$emit('addDialog', false)

      this.$emit('getList')
    },
    // 编辑按钮
    editBtn (row) {
      this.$emit('editDialog', true)
      console.log(row)
      this.rowData = { ...row }
    },
    // 编辑对话框确认事件
    editConfirm (refDom) {
      // 表单验证
      refDom.validate(async flag => {
        if (!flag) return

        // 接口参数
        let data = this.rowData
        console.log(data)
        let result = await gCateSaveEd(data)

        this.$notify({
          title: '',
          message: result.msg,
          type: 'success',
          duration: 2000
        })
        this.$emit('editDialog', false)
        this.$emit('getList')
      })
    },
    // 关闭dialog，dialog隐藏
    dialogClose () {
      this.$emit('editDialog', false)
      this.$emit('addDialog', false)
    },

    rowClick (row, column, event) {
      console.log(row.id)
      if (this.tableData1[row.id - 1] && this.tableData1[row.id - 1].name) {
        this.tableData1[row.id - 1].name = '飞翔的荷兰猪'
      }
      console.log(row, column, event)
    },
    // 删除按钮
    async deleteBtn (id, props) {
      // 这里是解决按钮点击后颜色不返回失焦颜色。
      // 由于按钮是循环渲染出来的。所以拿到真实dom，就要给每一按钮都添加一个refs属性
      // 这里用的是字符串deleteBtnRef+当前索引项。

      // 得到当前按钮对应的refs属性key
      let prop = 'deleteBtnRef' + props.$index
      // 当前按钮触发失去焦点事件
      this.$refs[prop].$el.blur()

      let confirmResult = await this.$confirm(
        '此操作将永久删除该选项, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult === 'confirm') {
        let result = await comDel(id)
        this.$notify({
          title: '',
          message: result.msg,
          type: 'success',
          duration: 2000
        })
        this.$emit('getList')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
