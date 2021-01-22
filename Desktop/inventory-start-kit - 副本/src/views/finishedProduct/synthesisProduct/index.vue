<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <el-form
        :inline="true"
        :model="listQuery"
        ref="d2HeaderFormRef"
        size="small"
        style="margin-bottom: -20px;"
      ></el-form>
    </template>

    <!-- 内容区 -->
    <contain-layout />
    <!-- 底部 -->
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import ContainLayout from "./components/ContainLayout";
export default {
  components: {
    ContainLayout
  },

  data() {
    return {
      listQuery: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-top: 20px;
}
</style>
