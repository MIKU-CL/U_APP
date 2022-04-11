<template>
  <div>
    <!-- 二级路由视图 -->
    <transition enter-active-class="animate__animated animate__bounceInLeft">
      <router-view class="con2"></router-view>
    </transition>
    <!-- 底部导航 -->
    <!-- active-class 实现高亮效果 -->
    <!-- <footer class="footer">
       
      <router-link active-class="active" to="/index/home">首页</router-link>
      <router-link active-class="active" to="/index/cate">分类</router-link>
      <router-link active-class="active" to="/index/shop">购物车</router-link>
      <router-link active-class="active" to="/index/mine">我的</router-link>
    </footer> -->

    <footer class="footer footer2">
      <!-- 遍历底部导航数据  -->
      <router-link
        v-for="item in navs"
        :key="item.path"
        :to="item.path"
        active-class="active"
      >
        <img
          :src="$route.path === item.path ? item.selectImg : item.noSelectImg"
          alt=""
        />
        <div>{{ item.text }}</div>
      </router-link>
    </footer>
  </div>
</template>

<script>
import home_y from "../../assets/img/home_y.jpeg";
import home_n from "../../assets/img/home_n.jpeg";
import cate_y from "../../assets/img/cate_y.jpeg";
import cate_n from "../../assets/img/cate_n.jpeg";
import shop_y from "../../assets/img/shop_y.jpeg";
import shop_n from "../../assets/img/shop_n.jpeg";
import mine_y from "../../assets/img/mine_y.jpeg";
import mine_n from "../../assets/img/mine_n.jpeg";
export default {
  data() {
    return {
      navs: [
        {
          path: "/index/home",
          selectImg: home_y,
          noSelectImg: home_n,
          text: "首页",
        },
        {
          path: "/index/cate",
          selectImg: cate_y,
          noSelectImg: cate_n,
          text: "分类",
        },
        {
          path: "/index/shop",
          selectImg: shop_y,
          noSelectImg: shop_n,
          text: "购物车",
        },
        {
          path: "/index/mine",
          selectImg: mine_y,
          noSelectImg: mine_n,
          text: "我的",
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
.footer {
  width: 100vw;
  height: 0.8rem;
  border-top: @border solid @border-color;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  background: #fff;
}
.footer2 {
  height: 1rem;
}
.con2 {
  padding-bottom: 0.8rem;
}
.footer a {
  flex: 1;
  text-align: center;
  font-size: 0.3rem;
}
.footer .router-link-active {
  background: @primary;
  color: #fff;
}

.footer .active {
}
.footer2 img {
  width: 0.5rem;
  height: 0.5rem;
}
.footer2 a div {
  font-size: 0.26rem;
  line-height: 0.5rem;
}
.footer2 .active div {
  color: @primary;
}
</style>