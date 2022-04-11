<template>
  <div>
    <to-search></to-search>
    <!-- 1.5 遍历 -->
    <!-- <router-link
      v-for="(item) in goods"
      :key="item.id"
      :to="{ name: '详情', params: { id: item.id } }"
      >{{ item.goodsname }}</router-link
    >
    <div v-if="goods.length==0">暂无数据</div> -->

    <!-- 展示数据 -->
    <list-vue :goods="goods"></list-vue>
  </div>
</template>

<script>
import axios from "axios";
import { reqCateList } from "../../http/api";
export default {
  data() {
    return {
      // 1.1 初始化数组
      goods: [],
    };
  },
  mounted() {
    // 1.2 获取id
    let id = this.$route.query.id;
    //  1.3发请求
    reqCateList({
      cateid: id,
      type: this.$route.query.id,
    }).then((res) => {
      console.log(res);
      // goodsData可能是null,也可能是一个数组
      this.goods = res.data.list.goodData ? res.data.list.goodData : [];
    });
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
a {
  display: block;
  margin: @margin20;
  padding: @padding20;
}
</style>