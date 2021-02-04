<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form :inline="true" ref="listQuery" size="small" style="margin-bottom: -20px;">
        <!-- 按钮区 -->
        <!-- 导入 -->
        <el-form-item>
          <el-upload :before-upload="handleUpload" action>
            <el-button icon="el-icon-download" size="small" type="primary">导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-delete" type="danger" @click="clickDelete">清空</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-check" type="success" @click="upLoaded">确认</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 内容区 -->
    <ContainCard :table="tableImport" :listLoading="listLoading" />

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import ContainCard from "./components/ContainCard";
import { customerImport } from "@/api/customer/customerImport";
import { executeOnlyOnce } from "@libs/tools.js";
export default {
  components: {
    ContainCard
  },

  data() {
    return {
      // 显示导入数据的表格
      tableImport: {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      },
      listLoading: false
    };
  },

  methods: {
    // 上传数据，把数据处理成elementUI表格类型。
    handleUpload(file) {
      this.listLoading = true;
      this.$import.xlsx(file).then(({ header, results }) => {
        // 保存在设备供应商对应的对象中的table对象中
        let arr = header.map((e, index, arr) => {
          return {
            label: e,
            prop: e
          };
        });
        // 保存表格列数据
        this.tableImport.columns = arr;
        // 保存表格data数据
        this.tableImport.data = results;
        this.listLoading = false;
      });
      // 阻止
      return false;
    },
    // 确认
    async upLoaded() {
      // 浅拷贝作为请求参数
      let options = [...this.tableImport.data];

      let result = await customerImport({
        table: options
      });
      this.$notify({
        title: "",
        message: result.msg,
        type: "success",
        duration: 2000
      });
      // 请求成功跳转路由
      this.$router.push("list");
    },
    clickDelete() {
      let temp = {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      };
      // 获得当前修改的数据项
      let table = { ...temp };
      // 进行修改
      this.tableImport = table;
    }
  }
};
</script>

