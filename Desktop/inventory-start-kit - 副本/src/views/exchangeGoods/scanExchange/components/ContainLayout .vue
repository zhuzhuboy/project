<template>
  <!-- 布局容器 -->
  <el-container style="height:100%" class="scan-container">
    <!-- 侧边栏 -->
    <el-aside width="450px" style="background:#fff" class="contain-aside">
      <!-- 警告提示 -->
      <el-alert title="扫码退货" type="success" center style="marginBottom:40px" :closable="false"></el-alert>
      <!-- 左侧form表单 -->
      <edit-form v-bind="$attrs" v-on="$listeners" />
    </el-aside>
    <!-- 内容区 -->
    <el-main class="contain-main">
      <!-- 内容区表格 -->
      <card-table v-bind="$attrs" v-on="$listeners" />
    </el-main>
  </el-container>
</template>

<script>
import CardTable from "./CardTable";
import EditForm from "./EditForm";

export default {
  components: {
    CardTable,
    EditForm
  }
};
</script>



<style lang="scss" scoped>
.scan-container {
  // 侧边栏重置
  .contain-aside {
    padding: 20px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  // 主区域重置
  .contain-main {
    padding-top: 0px;
    padding-bottom: 0px;
    background: #fff0;
    background-clip: content-box;
  }
}
</style>



