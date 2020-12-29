<template>
  <!-- <d2-container class="page">
    <template slot="header">
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" size='small' style="margin-right: 10px;"
        @click="shuaxin">刷新</el-button>
    </template>
    <template>
      <div class="app-container">
        <el-row :gutter="20">
          <el-col v-for="(item,index) in list" :key="index" :span="6">
            <div class="grid-content" :style="{ background: item.bg }">
              <div><i :class="item.icon" /></div>
              <div class="menu">
                <div class="menu_title">{{ item.title }}</div>：
                <div class="menu_num">{{ item.num }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </d2-container> -->
</template>

<script>
import D2Badge from './components/d2-badge'
import D2Help from './components/d2-help'
import D2PageCover from './components/d2-page-cover'
// import {
//   statistics
// } from '@api/index.js'
export default {
  components: {
    D2Badge,
    D2Help,
    D2PageCover
  },
  data () {
    return {
      filename: __filename,
      list: [],
      listLoading: false
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    // 刷新
    shuaxin () {
      this.getList()
    },
    // 首页统计数据
    getList () {
      this.listLoading = true
      statistics().then(res => {
        this.list = res.counts
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-content {
    width: 280px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    color: #FFFFFF;
    margin-top: 25px;
  }

  .grid-content i {
    font-size: 30px;
    line-height: 80px;
    margin-left: 15px;
  }

  .grid-content .menu {
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    align-content: flex-end;
    text-align: right;
  }

  .grid-content .menu_title {
    font-size: 18px;
  }

  .grid-content .menu_num {
    font-size: 24px;
    font-weight: bold;
  }

  .page {
    .group {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 60px;

        &.end {
          padding: 0px 20px;
          border-radius: 4px;
          background-color: $color-success;
          color: #FFF;
        }
      }
    }
  }
</style>
