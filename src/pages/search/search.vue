<template>
  <div>
    <!-- <button @click="goBack">返回</button> -->
    <!-- <go-back></go-back> -->
    <van-search v-model="value" placeholder="请输入搜索关键词" autofocus/>
    <list-vue :goods="arr"></list-vue>
  </div>
</template>

<script>
import { reqSearch } from "../../http/api";
export default {
  data() {
    return {
      value:"",
      arr:[],
    };
  },
  watch:{
    value(){
      if(this.value===""){
        this.arr=[]
        return
      }
      reqSearch({
        keywords:this.value
      }).then(res=>{
        this.arr = res.data.list?res.data.list:[]
      })
    }
  },
 
};
</script>

<style>

</style>