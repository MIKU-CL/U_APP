<template>
  <div class="cate">
    <to-search></to-search>
    <!-- 分类列表 -->
    <div class="con">
      <div class="left">
        <div
          v-for="(item, index) in arr"
          :key="item.id"
          :class="index == n ? 'active' : ''"
          @click="changeN(index)"
        >{{ item.catename }}</div>
          
        
      </div>

      <div class="right">
        <div class="item" v-for="(item) in arr" :key="item.id" ref="item">
          <h3>{{ item.catename }}</h3>
          <div class="item-con" v-if="item.children">
            <div class="item-every" v-for="i in item.children" :key="i.id" @click="$router.push({name:'列表',query:{id:item.id,type:2}})">
              <img :src="$pre + i.img" alt="" />
              <div>{{ i.catename }}</div>
            </div>
          </div>
          <div class="item-con" v-else>
            <van-empty description="该分类没有二级分类" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCates } from "../../http/api";
export default {
  data() {
    return {
      arr: [],
      n: 0,
    };
  },
  mounted() {
    reqCates().then((res) => {
      this.arr = res.data.list;
    });
  },
  methods:{
    changeN(index){
      this.n=index;
      this.$refs.item[this.n].scrollIntoView({behavior:"smooth"})
    }
  }
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
.cate {
  .con {
    height: calc(
      100vh - @headerHeight - @footerHeight - @searchHeight - @margin20 -
        @margin20
    );
    display: flex;
    .left {
      overflow-y: auto;
      width: 2rem;
      border-right: 0.01rem solid @border-color;
      div {
        text-align: center;
        font-size: 0.26rem;
        line-height: 0.5rem;
        color: @font-color3;
        transition: all 0.3s;
      }
      .active {
        background: @primary;
        color: @white;
      }
    }
    .right {
      overflow-y: auto;
      flex: 1;
      background: @border-color;
      .item {
        margin: @margin20;
        background: @white;
        h3 {
          font-size: @h3;
          color: @font-color3;
          margin: @margin20;
        }
        .item-con {
          overflow: hidden;
          .item-every {
            width: 50%;
            float: left;
            text-align: center;
            img {
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
            div {
              line-height: 0.6rem;
              font-size: @p;
              color: @font-color6;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
}
</style>