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
      <el-form :model="aoduoForm" ref="aoduoFormRef" label-width="120px" v-show="device_type==0">
        <el-form-item label="TBox流水号" prop="serial_number">
          <el-input v-model="aoduoForm.serial_number" placeholder="请输入TBox流水号" clearable></el-input>
        </el-form-item>
        <el-form-item label="主机流水号" prop="hosts_number">
          <el-input
            v-model="aoduoForm.hosts_number"
            @input="debounceInput"
            placeholder="请输入主机流水号"
            clearable
          ></el-input>
        </el-form-item>
        <el-button @click="btn">点击</el-button>
      </el-form>

      <!-- 根据input表单值对应的表单 -->
      <el-form :model="yzxForm" ref="yzxFormRef" label-width="120px" v-show="device_type==1">
        <el-form-item label="主机流水号" prop="hosts_number">
          <el-input
            v-model="yzxForm.hosts_number"
            @input="debounceInput"
            placeholder="请输入主机流水号"
            clearable
          ></el-input>
        </el-form-item>
        <el-button @click="btn">点击</el-button>
      </el-form>
    </el-aside>
    <el-main class="main">
      <card-table />
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
      //   澳多表单
      aoduoForm: {
        serial_number: undefined,
        hosts_number: undefined
      },
      //   云掌行表单
      yzxForm: {
        hosts_number: undefined
      },
      debounceInput: undefined //防抖函数
    };
  },
  created() {
    //  生命周期初始化input防抖函数
    this.debounceInput = debounce(this.input, 1000);
  },
  methods: {
    btn() {
      console.log(this.radioForm);
    },
    // 单选发生改变，表单重置
    radioChange() {
      this.$refs.yzxFormRef.resetFields();
      this.$refs.aoduoFormRef.resetFields();
    },
    // 表单input事件
    async input(e) {
      let option = {};
      let device_type = this.device_type;
      // 判断设备是澳多还是云掌行
      if (device_type == 0) {
        let serial_number = this.aoduoForm.serial_number,
          hosts_number = this.aoduoForm.hosts_number;
        // 0代表澳多，澳多：主机和tbox都得有
        if (serial_number && hosts_number) {
          console.log(555);
          option = {
            device_type,
            serial_number,
            hosts_number
          };
        }
        // 云掌行
      } else if (device_type == 1) {
        let hosts_number = this.yzxForm.hosts_number;
        option = {
          device_type,
          hosts_number
        };
      }
      //   接口参数已经定义好了
      //   等待调用
      console.log(option);
      let res = await become(option);
    }
  }
};
</script>

<style>
/* input大小 */
.contain-aside .el-input {
  width: 70%;
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
