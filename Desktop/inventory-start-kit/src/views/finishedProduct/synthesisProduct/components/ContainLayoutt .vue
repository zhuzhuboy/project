<template>
  <!-- 布局容器 -->
  <el-container style="height:100%" class="el-container">
    <el-aside width="400px" style="background:#fff" class="contain-aside">
      <!-- 标题 -->
      <!-- <h5 class="aside-h5">扫码</h5> -->
      <el-alert title="扫码" type="success" center style="marginBottom:40px" :closable="false"></el-alert>
      <!-- 单选 -->
      <el-radio-group v-model="device_type" @change="radioChange" size="small">
        <el-radio label="0" border>澳多</el-radio>
        <el-radio label="1" border>云掌行</el-radio>
      </el-radio-group>

      <!-- 根据input表单值对应的表单 -->
      <el-form :model="form" ref="formRef" label-width="100px">
        <el-form-item label="TBox流水号" prop="serial_number" v-show="device_type==0">
          <el-input
            v-model="form.serial_number"
            placeholder="请输入TBox流水号"
            clearable
            @input="serialInput"
          ></el-input>
        </el-form-item>
        <el-form-item label="主机流水号" prop="hosts_number">
          <el-input
            v-model="form.hosts_number"
            @input="debounceInput"
            placeholder="请输入主机流水号"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main class="main">
      <card-table :tableData="tableData" />
    </el-main>
  </el-container>
</template>

<script>
import CardTable from "./CardTable";
import { debounce } from "@/libs/tools.js";
import { become } from "@/api/finishedProduct/synthesisProduct";
export default {
  components: {
    CardTable
  },
  data() {
    return {
      device_type: "0", //0表示澳多。1表示云掌行

      form: {
        serial_number: undefined,
        hosts_number: undefined
      },
      tableData: [],
      debounceInput: undefined //防抖函数
    };
  },
  created() {
    //  生命周期初始化input防抖函数
    this.debounceInput = debounce(this.input, 1000);
  },
  methods: {
    // 单选发生改变，表单重置
    radioChange() {
      this.$refs.formRef.resetFields();
      console.log(this.form);
    },
    // 表单input事件
    async input(e) {
      // 如果设备是澳多，Tbox没有填写的话，则退出
      if (this.device_type == 0) {
        if (
          this.form.serial_number == "" ||
          this.form.serial_number == undefined
        ) {
          return;
        }
      }
      //   如果主机为空。则不请求
      if (this.form.hosts_number == "") return;
      let option = { ...this.form };
      option.device_type = this.device_type;

      //   接口参数已经定义好了
      //   等待调用
      console.log(option);
      let res = await become(option);

      this.$notify({
        title: "",
        type: "success",
        message: res.msg,
        duration: 2000
      });

      this.tableData.push(res.data);
      this.$refs.formRef.resetFields();
    },
    // tbox流水号输入
    serialInput(e) {
      if (e == "") return;
      if (this.form.hosts_number != undefined) {
        this.form.hosts_number = "";
      }
    }
  }
};
</script>

<style>
/* input大小 */
.contain-aside .el-input {
  width: 90%;
}
/* 单选项。居中对齐 */
.contain-aside .el-radio-group {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>

<style lang="scss" scoped>
.contain-aside {
  padding: 20px;
}
.aside-h5 {
  text-align: center;
  background-color: aliceblue;
  padding: 10px;
  margin-bottom: 40px;
  margin-top: 0px;
}
.el-container .main {
  padding-top: 0px;
  padding-bottom: 0px;
  background: #fff0;
  background-clip: content-box;
}
</style>
