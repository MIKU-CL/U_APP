<template>
  <div>
    <!-- 3.展示数据 -->

    <van-image width="100vw" height="3.8rem" :src="$pre + info.img" />

    <div class="p">名称：{{ info.goodsname }}</div>
    <div class="p">价格：{{ info.price }}</div>
    <div class="p">数量：{{ info.number }}</div>
    <div v-html="info.description"></div>

    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/index/shop')"/>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button
        type="warning"
        @click="show = true"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ minHeight: '30%' }">
      <h4 class="text-primary h3">{{ info.specsname }}</h4>
      <van-button
        v-for="(item, index) in info.specsattr"
        :key="item"
        :type="index===n?'primary':'default'"
        @click="n=index"
        >{{ item }}</van-button
      >
      <hr>
      <van-button type="primary" @click="addShop">加入购物车</van-button>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { reqAddShop, reqDetail } from "../../http/api";
export default {
  data() {
    return {
      // 1.初始化数据
      info: {},
      show: false,
      n:0
    };
  },
  mounted() {
    // 2.发请求
    reqDetail({
      id: this.$route.params.id,
    }).then((res) => {
      // console.log(res);
      this.info = res.data.list[0];
      // specsattr: "白色,黑色"-->["白色","黑色"]
      this.info.specsattr = this.info.specsattr.split(",");
    });
  },
  methods:{
    // 1.加入购物车
    addShop(){
      //加入购物车的请求
      reqAddShop({
        uid:JSON.parse(localStorage.getItem("isLogin")).uid,
        goodsid:this.$route.params.id,
        num:1
      }).then(res=>{
        
        if(res.data.code===200){
          Toast(res.data.msg)
          this.show=false;//蒙版消失
        }
      })
    }
  }
};
</script>

<style lang="less">
@import "../../less/index.less";
img {
  width: 100vw;
}

.van-goods-action-button--danger {
  background: @primary !important;
}
</style>