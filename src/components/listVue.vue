<template>
  <div>
      <van-card
      v-for="item in goods"
      :key="item.id"
      :title="item.goodsname"
      :thumb="$pre + item.img"
      @click="$router.push('/detail/' + item.id)"
    >
      <div slot="price">￥{{ item.price | filterPrice }}</div>
    </van-card>
    <van-empty v-if="goods.length == 0" description="暂无数据" />
    </div>
</template>

<script>
export default {
    props:["goods"]
}
</script>

<style>

</style>