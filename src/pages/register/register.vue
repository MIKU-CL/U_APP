<template>
  <div class="register">
    <!-- 2.绑定数据 -->
    <img src="../../assets/img/e-logo.png" alt="" />
    <van-cell-group>
      <van-field v-model="user.phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
     <van-cell-group>
      <van-field v-model="user.nickname" label="昵称" placeholder="请输入昵称" />
    </van-cell-group>
     <van-cell-group>
      <van-field v-model="user.password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <div class="text-center">
      <van-button color="#ff6040" @click="register" class="btn1">注册</van-button>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant"
import { reqRegister } from '../../http/api';
export default {
  // 1.初始化表单数据
  data() {
    return {
      user: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    //3.点了注册按钮
    register() {
      //发请求 axios
      reqRegister(this.user).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          Toast(res.data.msg);
          //跳转登录
          this.$router.push("/login");
        } 
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
@import "../../assets/css/appcss/register.css";
</style>