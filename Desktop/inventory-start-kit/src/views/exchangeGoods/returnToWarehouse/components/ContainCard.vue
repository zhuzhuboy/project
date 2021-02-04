<template>
  <el-card class="ware-card" >
    <cate-table v-bind="$attrs" v-on="$listeners" />

    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      close-on-press-escape
      class="drawer-pad"
      size="50%"
      :show-close="false"
      :modal-append-to-body="false"
    >
      <detail-table v-bind="$attrs" />
    </el-drawer>
  </el-card>
</template>

<script>
import CateTable from "./CateTable";
import DetailTable from "./DetailTable";
export default {
  components: {
    CateTable,
    DetailTable
  },

  props: {
    // 抽屉显示或隐藏
    drawerShow: {
      type: Boolean
    }
  },
  computed: {
    // 根据父组件传递来的属性。获得计算属性控制抽屉显示或隐藏
    drawer: {
      get() {
        return this.drawerShow;
      },
      set(val) {
        this.$emit("modifyDrawerShow", false);
      }
    }
  }
};
</script>
<style>
/* 抽屉padding值 */
.ware-card .el-drawer__body {
  padding: 20px 50px;
}
/* 抽屉黑色框 */
.ware-card .el-drawer:focus {
  outline: none;
}
</style>
