<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <!-- 按钮区 -->
        <!-- 导入 -->
        <el-form-item>
          <el-upload :before-upload="handleUpload" action>
            <el-button size="small" type="primary">导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="upLoaded">上传</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <el-container>
      <el-container class="tb-container">
        <el-aside width="300px" style="background:red">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :before-upload="selectActive"
            @select="selectActive"
          >
            <el-menu-item index="0">
              <i class="el-icon-menu"></i>
              <span slot="title">澳多Tbox</span>
            </el-menu-item>

            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">澳多主机号</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">云掌行主机</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="background:blue">
          <ContainCard :table="tableData" :listLoading="listLoading" />
        </el-main>
      </el-container>
    </el-container>
    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>


<script>
import ContainCard from "./components/ContainCard";
export default {
  components: {
    ContainCard
  },
  data() {
    return {
      deveMatchSupp: [
        {
          type: 0,
          device_type: 0,
          table: {
            columns: [],
            data: [],
            size: "mini",
            stripe: true,
            border: true
          }
        },
        {
          type: 0,
          device_type: 1,
          table: {
            columns: [],
            data: [],
            size: "mini",
            stripe: true,
            border: true
          }
        },
        {
          type: 1,
          device_type: 1,
          table: {
            columns: [],
            data: [],
            size: "mini",
            stripe: true,
            border: true
          }
        }
      ],
      listLoading: false,
      defaultActive: "0"
    };
  },
  computed: {
    // 根据当前menu索引返回table表格数据
    tableData() {
      return this.deveMatchSupp[this.defaultActive].table;
    }
  },
  methods: {
    // menu改变
    selectActive(index, indexdPath) {
      this.defaultActive = index;
    },
    // 上传数据，把数据处理成elementUI表格类型。
    handleUpload(file) {
      console.log(this.$import);
      this.listLoading = true;
      this.$import.xlsx(file).then(({ header, results }) => {
        // 保存在设备供应商对应的对象中的table对象中
        this.deveMatchSupp[this.defaultActive].table.columns = header.map(e => {
          return {
            label: e,
            prop: e
          };
        });
        this.deveMatchSupp[this.defaultActive].table.data = results;
        this.listLoading = false;
      });
      // 阻止
      return false;
    },
    // 上传
    upLoaded() {
      console.log(this.deveMatchSupp);
      console.log(this.deveMatchSupp[this.defaultActive]);
      // 浅拷贝作为请求参数
      let options = { ...this.deveMatchSupp[this.defaultActive] };
      // 修改浅拷贝数据格式
      options.table = [...options.table.data];
      console.log(options);
    }
  }
};
</script>
<style >
section.el-container {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
