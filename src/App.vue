<template>
  <div>
    <!-- 头部 -->
    <header>
      <i
        v-if="$route.meta.back"
        @click="$router.go(-1)"
        class="iconfont icon-fanhui"
      ></i>
      <h3>{{ $route.meta.title }}</h3>
      <router-link v-if="$route.meta.register" to="/register">注册</router-link>
    </header>

    <!-- 一级路由出口 -->
    <!-- 没有配置name的路由视图是 默认路由视图 -->
    <router-view class="con"></router-view>

  </div>
</template>

<script>
export default {
  watch:{
    $route(){
      console.log(this.$route);
    }
  }
};
</script>

<style scoped lang="less">
@import "./less/index.less";
header {
  width: 100vw;
  height: 0.8rem;
  background: @deep;
  position: fixed;
  left: 0;
  top: 0;
}
header h3 {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: center;
  line-height: @headerHeight;
  color: #fff;
  font-weight: 400;
  z-index: 10;
  font-size: @h3;
}
.icon-fanhui {
  font-size: 0.3rem;
  color: #fff;
  position: absolute;
  left: 0.2rem;
  line-height: @headerHeight;
  z-index: 11;
}
header a {
  font-size: 0.3rem;
  color: #fff;
  position: absolute;
  right: 0.2rem;
  line-height: @headerHeight;
  z-index: 11;
}
.con {
  padding-top: @headerHeight;
}
</style>