<template>
  <div>
    <!-- <van-search v-model="value" background="#ff6040" @click="search" placeholder="请输入搜索关键词" /> -->
    <!-- 前往搜索 -->
    <to-search width="50%"></to-search>
    <!-- 快速导航 -->
    <cate-vue></cate-vue>
    <!-- 轮播图 -->
    <banner-vue></banner-vue>
    <!-- 商品列表 -->
    <goods-vue></goods-vue>
  </div>
</template>

<script>
import cateVue from "./components/cate.vue"
import bannerVue from "./components/banner.vue"
import goodsVue from "./components/goods.vue"
export default {
  components:{
    cateVue,
    bannerVue,
    goodsVue
  },
  methods: {
    search(){
      this.$router.push("/search")
    }
  },
}
</script>

<style scoped lang="less">
@import "../../less/index.less";
.cates {
  overflow: hidden;
  a {
    float: left;
    margin: @margin20;
    
  }
}

a {
  display: inline-block;
  margin: @margin20;
}
</style>