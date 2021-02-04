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
          <el-button
            icon="el-icon-check"
            type="success"
            @click="upLoaded"
            :disabled="!deveMatchSupp.table.data.length"
          >确认</el-button>
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
            background-color="#434544"
            text-color="#fff"
            active-text-color="#ffd04b"
            :before-upload="selectActive"
            @select="selectActive"
            style="text-align:center"
          >
            <el-menu-item index="0" :disabled="diableArr[0]">
              <i class="el-icon-menu"></i>
              <span slot="title">澳多Tbox</span>
            </el-menu-item>

            <el-menu-item index="1" :disabled="diableArr[1]">
              <i class="el-icon-cpu"></i>
              <span slot="title">澳多主机</span>
            </el-menu-item>
            <el-menu-item index="2" :disabled="diableArr[2]">
              <i class="el-icon-setting"></i>
              <span slot="title">云掌行主机</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="padding-top:0">
          <ContainCard :table="deveMatchSupp.table" :listLoading="listLoading" />
        </el-main>
      </el-container>
    </el-container>

    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import ContainCard from "./components/ContainCard";
import { imDevice } from "@/api/purchase/tableImport.js";
import { executeOnlyOnce } from "@libs/tools.js";
export default {
  components: {
    ContainCard
  },
  // 判断vuex保存的导入按钮状态。如果是true代表点击了。则能够跳转到这个页面。如果不是，则回到原页面
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.importStatus === false) {
        next("warehousing");
      }
    });
  },
  // 当组件离开前。修改import按钮点击状态为false。只有在详情页面点击导入按钮才能改为true。
  beforeRouteLeave(to, from, next) {
    this.$store.commit("d2admin/purchase/getImportStatus", false);
    next();
  },
  data() {
    return {
      deveMatchSupp: {
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
      listLoading: false,
      defaultActive: "0",
      diableArr: [false, false, false]
    };
  },
  computed: {
    // vuex中保存详情id
    details_id() {
      return this.$store.state.d2admin.purchase.details_id;
    },
    // 导入按钮对应的状态
    importStatus() {
      return this.$store.state.d2admin.purchase.importStatus;
    }
  },
  created() {
    // 设置抽屉显示为true，则跳转到采购入库会判断。如果为true则显示抽屉组件
    this.$store.commit("d2admin/purchase/getWareDrawerShow", true);
  },
  methods: {
    // menu改变
    selectActive(index, indexdPath) {
      // 更改默认选项为当前索引
      if (index == 0) {
        this.deveMatchSupp.type = 0;
        this.deveMatchSupp.device_type = 0;
      } else if (index == 1) {
        this.deveMatchSupp.type = 1;
        this.deveMatchSupp.device_type = 0;
      } else {
        this.deveMatchSupp.type = 1;
        this.deveMatchSupp.device_type = 1;
      }
      this.defaultActive = index;
    },
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
        this.deveMatchSupp.table.columns = arr;
        // 保存表格data数据
        this.deveMatchSupp.table.data = results;
        this.listLoading = false;
      });
      // 阻止
      return false;
    },
    // 确认
    async upLoaded() {
      // 浅拷贝作为请求参数

      let options = {
        ...this.deveMatchSupp,
        details_id: this.details_id
      };
      // 修改浅拷贝数据格式
      options.tables = [...options.table.data];
      // API需要的数据不包括table。置为undefined
      options.table = undefined;
      let result;
      try {
        result = await imDevice(options);
        this.$notify({
          title: "",
          message: "已成功上传 " + result.data + " 台",
          type: "success",
          duration: 2000
        });
        // 请求成功跳转路由
        this.$router.push("warehousing");
      } catch (error) {
        this.deveMatchSupp.table.data = [];
      }
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
      this.deveMatchSupp.table = table;
    }
  },

  watch: {
    "deveMatchSupp.table.data"(val) {
      let flag;
      // 判断有没有数据被导入
      if (val.length !== 0) {
        flag = true;
      }
      // 如果有被导入的数据。与disabled数组进行判断。如果索引相同则跳过，如果不同。则把disabled数组不同更改。实现点击导入后，其他选项无法点击
      if (flag !== undefined) {
        for (let index = 0; index < this.diableArr.length; index++) {
          if (this.defaultActive == index) {
            continue;
          } else {
            this.$set(this.diableArr, index, true);
          }
        }
      } else {
        // 如果没有数据，则所有的menu菜单选项都不被禁用
        this.diableArr.forEach((item, index) => {
          this.$set(this.diableArr, index, false);
        });
      }
    }
  }
};
</script>
<style >
section.el-container {
  height: 100%;
}
.el-menu-vertical-demo .el-menu-item {
  height: 100px;
  line-height: 100px;
}
</style>
<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
