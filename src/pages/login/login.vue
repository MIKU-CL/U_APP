<template>
  <div class="login">
    <img src="../../assets/img/e-logo.png" alt="" />
    <van-cell-group class="input1">
      <van-field
        v-model="user.phone"
        label="手机号"
        placeholder="请输入手机号"
      />
    </van-cell-group>
    <van-cell-group class="input2">
      <van-field
        v-model="user.password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="text-center">
      <van-button color="#ff6040" @click="login" class="btn1">登录</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqLogin } from "../../http/api";
export default {
  data() {
    // 1.初始化表单数据
    return {
      user: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    // 3.点了登录
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          //成功
          Toast.success(res.data.msg);
          //存登录标识,这个标识一方面用来判断用户是否登录；另外一方面，还是用户的数据
          localStorage.setItem("isLogin", JSON.stringify(res.data.list));
          //跳转页面
          this.$router.push("/index/home");
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
@import "../../assets/css/appcss/login.css";



</style>