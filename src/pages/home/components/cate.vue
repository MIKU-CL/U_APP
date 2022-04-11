<template>
  <div class="cates">
    <!-- 3.遍历快速导航 -->
    <!-- <router-link
      class="btn btn-primary"
      v-for="item in cates"
      :key="item.id"
      :to="'/list?id=' + item.id"
      >{{ item.catename }}</router-link
    > -->
    <!-- 
      组件上面绑定了click事件，是个自定义事件。需要组件自己$emit("click").
     -->
     <!-- 
       1.tab组件没有click事件；
       2.tabs是有click事件，事件的回调函数有默认值，默认是tab的name;
       3.tab组件的name属性默认是下标，但是我们希望他是id,所以配置 :name="item.id"
      -->
    <van-tabs @click="tabClick">
      <van-tab v-for="item in cates" :key="item.id" :title="item.catename"
      :name="item.id"
      >
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {reqHomeCate} from "../../../http/api"
export default {
  data() {
    return {
      // 1.1初始化分类的数据
      cates: [],
    };
  },
  mounted() {
    //1.2 获取分类的数据
    reqHomeCate().then((res) => {
      this.cates = res.data.list; //赋值
    });
  },
  methods:{
    tabClick(e){
      this.$router.push("/list?id="+e+"&type=1")
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../less/index.less";
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