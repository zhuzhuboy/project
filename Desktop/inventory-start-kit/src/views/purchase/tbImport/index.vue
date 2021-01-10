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
            @click="onlyOnceFunc"
            :disabled="!deveMatchSupp[defaultActive].table.data.length"
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
          type: 1,
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
      defaultActive: "0",
      diableArr: [false, false, false],
      onlyOnceFunc: function() {} // 只执行一次的函数
    };
  },
  computed: {
    // 根据当前menu索引返回table表格数据
    tableData() {
      return this.deveMatchSupp[this.defaultActive].table;
    },
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
    // 给只执行一次的函数赋值，当我点击确认按钮。只执行一次功能函数。就是指上传一次数据就跳转了
    this.onlyOnceFunc = executeOnlyOnce(this.upLoaded);
    // 设置抽屉显示为true，则跳转到采购入库会判断。如果为true则显示抽屉组件
    this.$store.commit("d2admin/purchase/getWareDrawerShow", true);
  },
  methods: {
    // menu改变
    selectActive(index, indexdPath) {
      // 更改默认选项为当前索引
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
        // 由于传递给表格的数据是计算属性。所以要更改数据对象。触发计算属性更新。

        // 把要修改的数组项取出来
        let colomn = this.deveMatchSupp[this.defaultActive];
        // 修改数组项中的数据
        colomn.table.columns = arr;
        // 通过$set修改数组。
        this.$set(this.deveMatchSupp, this.defaultActive, colomn);
        // 同上
        let data = this.deveMatchSupp[this.defaultActive];
        data.table.data = results;
        this.$set(this.deveMatchSupp, this.defaultActive, data);
        this.listLoading = false;
      });
      // 阻止
      return false;
    },
    // 确认
    async upLoaded() {
      // 浅拷贝作为请求参数
      // details_id从vuex中保存的数据，在列表详情页中导入按钮中实现保存逻辑
      let options = {
        ...this.deveMatchSupp[this.defaultActive],
        details_id: this.details_id
      };
      console.log(options)
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
        this.deveMatchSupp[this.defaultActive].table.data = [];
      }
    },
    clickDelete() {
      let table = {
        columns: [],
        data: [],
        size: "mini",
        stripe: true,
        border: true
      };
      // 获得当前修改的数据项
      let obj = { ...this.deveMatchSupp[this.defaultActive] };
      // 进行修改
      obj.table = table;
      // 使用$set动态更新
      this.$set(this.deveMatchSupp, this.defaultActive, obj);
    }
  },

  watch: {
    deveMatchSupp(val) {
      let indexNum;
      // 判断有没有数据被导入
      val.forEach((item, index) => {
        if (item.table.data.length !== 0) {
          indexNum = index;
        }
      });
      // 如果有被导入的数据。与disabled数组进行判断。如果索引相同则跳过，如果不同。则把disabled数组不同更改。实现点击导入后，其他选项无法点击
      if (indexNum !== undefined) {
        for (let index = 0; index < this.diableArr.length; index++) {
          if (indexNum == index) {
            continue;
          } else {
            this.$set(this.diableArr, index, true);
          }
        }
      } else if (indexNum == undefined) {
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
