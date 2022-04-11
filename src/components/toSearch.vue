<template>
  <div @click="$router.push('/search')" class="toSearch" :style="{width:width}">
    <i class="iconfont icon-sousuo"></i>
    <span>请输入搜索关键词</span>
  </div>
</template>

<script>
export default {
  props:["width"]
}
</script>

<style scoped lang="less">
@import "../less/index.less";
.toSearch{
  height: @searchHeight;
  color: @font-color6;
  line-height: @searchHeight;
  overflow: hidden;
  font-size: .26rem /* 26/100 */;
  background: #f4f4f4;
  margin: @margin20;
  padding: 0px @padding20;
  border-radius: @margin10;
  i{
    float: left;
  }
  span{
    float: left;
  };

}
</style>
