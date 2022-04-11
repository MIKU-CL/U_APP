<template>
  <div class="goods">
    <!-- 导航 -->
    <!-- 3.4点击实现切换，初始化n,用来标记当前第几个被选中 -->
    <van-button
      v-for="(item, index) in navs"
      :key="item"
      :type="index == n ? 'primary' : 'default'"
      @click="n = index"
    >
      {{ item }}
    </van-button>
    <!-- 遍历数据 -->
    <!-- 3.6 数据还没有请求回来的时候，goods[n]是undefined，会报错 ，使用v-if解决。-->
    <div v-if="goods.length > 0">
      <!-- 3.3 遍历goods[0].content  -->
      <!-- 3.5遍历goods[n].content  -->
      <!-- <div v-for="item in goods[n].content" :key="item.id">
        <router-link to="/detail/1">{{ item.goodsname }}</router-link>
      </div> -->

      <list-vue :goods="goods[n].content"></list-vue>
    </div>
  </div>
</template>

<script>
import { reqHomeGoods } from '../../../http/api';
export default {
  data() {
    return {
      navs: ["热门推荐", "上新推荐", "所有商品"],
      // 3.1 初始值列表数据
      goods: [],
      n: 0,
    };
  },
  mounted() {
    //   3.2 进来请求数据
    reqHomeGoods().then((res) => {
      //   console.log(res);
      this.goods = res.data.list;
    });
  },
};
</script>

<style scoped lang="less">
@import "../../../less/index.less";
</style>