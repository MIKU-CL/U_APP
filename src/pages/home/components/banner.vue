<template>
  <div class="banner">
    <!-- 开发环境下：8080，图片访问不到，需要加 http://localhost:2000;
      生产环境下：2000，图片不需要加 ‘http://localhost:2000’，也可以访问到图片。
       -->

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="$pre + item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reqHomeBanner } from '../../../http/api';
export default {
  data() {
    return {
      // 2.1 初始化轮播图数据
      banner: [],
    };
  },
  mounted() {
    //    2.2 请求数据
    reqHomeBanner().then((res) => {
      // console.log(res);
      this.banner = res.data.list;
    });
  },
};
</script>

<style scoped lang="less">
@import "../../../less/index.less";
img {
  width: 100%;
  height: 100%;
}
.my-swipe{
  height: 3.8rem;
}
</style>