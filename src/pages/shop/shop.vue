<template>
  <div>
    <!-- 1.绘制静态页面 -->
    <div class="item" v-for="(item, index) in arr" :key="item.id">
      <div
        class="inner"
        :class="item.showDeleteBtn ? 'btn-show' : ''"
        @touchstart="start"
        @touchmove="move"
        @touchend="end(index)"
      >
        <div @touchend.stop="">
          <van-checkbox
            v-model="item.checked"
            shape="square"
            @change="changeOne"
          ></van-checkbox>
        </div>
        <van-card
          :price="item.price"
          :title="item.goodsname"
          :thumb="$pre + item.img"
        >
          <!-- .native 将事件转为原生事件 -->
          <div slot="num">
            <van-button @touchend.native.stop="sub(item.id, item.num)"
              >-</van-button
            >
            {{ item.num }}
            <van-button type="primary" @touchend.native.stop="add(item.id)"
              >+</van-button
            >
          </div>
        </van-card>
        <van-button type="danger" @touchend.native.stop="del(item.id)"
          >删除</van-button
        >
      </div>
    </div>
    <van-empty v-if="arr.length === 0" description="暂无数据" />

    <!-- 提交栏  -->
    <van-submit-bar
      :price="allPrice * 100"
      button-text="提交订单"
      safe-area-inset-bottom
      @submit="onSubmit"
    >
      <van-checkbox v-model="allChecked" @click="changeAll"
        >全选{{ allChecked }}</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { reqGetShop, reqShopDel, reqShopEdit } from "../../http/api";
export default {
  data() {
    return {
      // 9.1 全选
      allChecked: false, //全选
      // 2.初始化列表
      arr: [],
      isRequest: true, //7.1用来判断是否可以发请求的字段，true:能发，false不能发
    };
  },
  mounted() {
    //3.一进来就请求数据请求数据
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      reqGetShop({
        uid: JSON.parse(localStorage.getItem("isLogin")).uid,
      }).then((res) => {
        if (res.data.code === 200) {
          // 7.3 列表请求执行完成，这个时候才允许用户再次点击- isRequest=true
          this.isRequest = true;
          var arr = res.data.list ? res.data.list : [];
          // 8.1 给每条数据添加一个showDeleteBtn 字段，代表删除按钮是否出现
          // 注意：先添加字段，再给this.arr 赋值，这样showDeleteBtn 才有set()+get（）
          arr.forEach((item) => {
            //删除的状态
            item.showDeleteBtn = false;
            // 9.2 每条数据选中的状态 checked=false

            // 9.5 oldArr(this.arr)=[{id:2,checked:false},{id:3,checked:true}]
            // newArr(arr)=[{id:1},{id:2},{id:3},{id:4}]
            let obj = this.arr.find((i) => i.id === item.id); // {id:2,checked:false} undefined
            item.checked = obj ? obj.checked : false;
          });

          this.arr = arr;
          // 9.6给全选赋值
          this.allChecked =
            this.arr.length === 0
              ? false
              : this.arr.every((item) => item.checked);
        }
      });
    },
    //4.点了+
    add(id) {
      reqShopEdit({
        id: id,
        type: 2,
      }).then((res) => {
        if (res.data.code === 200) {
          //修改成功，重新获取list
          this.getList();
        }
      });
    },
    // 5.自减
    sub(id, num) {
      /*
      问题：
      num:2 点了-，判断num<=1?，没有，开始发修改的请求【1】，但是请求是一个异步的，后端没还没有响应成功的时候，
      此刻，用户又点了-，这个时候，页面的num还是2，再次做判断num<=1,没有小于1，所以发修改的请求【2】。
      过了一会儿，后端2个修改的请求都响应完成，这时候数据库里面的num=0.

      解决方案：
        num:2 - 判断<=1,没有，所以发修改请求【1】，
        用户又点，判断刚刚的修改请求是否 已经做完了，还要看新的列表是否取回来（num=1）,列表取回来，才可以再次做 num<=1判断
      */

      //  判断是否可以发请求：上一次的修改+修改之后的请求列表都做完了，才可以发，否则，不能发。
      // 7.2 判断isRequest 是否是true ,true就可以发，一旦发请求，就将isRequst=false
      if (this.isRequest) {
        // 判断数量
        if (num <= 1) {
          Toast("宝贝不能再少了");
          return;
        }
        this.isRequest = false;
        reqShopEdit({
          id: id,
          type: 1,
        }).then((res) => {
          if (res.data.code === 200) {
            //修改成功，重新获取list
            this.getList();
          }
        });
      }
    },
    // 6.删除
    del(id) {
      // 二次确认是否删除
      Dialog.confirm({
        title: "删除提示",
        message: "你确定要删除吗？",
      })
        .then(() => {
          reqShopDel({
            id: id,
          }).then((res) => {
            if (res.data.code === 200) {
              Toast(res.data.msg);
              //请列表
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    start(e) {
      this.startX = e.touches[0].clientX;
      this.endX = 0; //每次开始，都重置结束的坐标
    },
    move(e) {
      this.endX = e.touches[0].clientX;
    },
    end(index) {
      // 先判断endX==0?是，点击，不是0，才判断滑动
      if (this.endX === 0) {
        this.$router.push("/detail/" + this.arr[index].goodsid);
        return;
      }

      if (this.endX + 20 < this.startX) {
        this.arr[index].showDeleteBtn = true;
      }
      if (this.startX + 20 < this.endX) {
        this.arr[index].showDeleteBtn = false;
      }
    },
    // 9.3 点了全选
    changeAll() {
      this.arr.forEach((item) => {
        item.checked = this.allChecked;
      });
    },
    // 9.4 点了某一个
    changeOne() {
      this.allChecked = this.arr.every((item) => item.checked);
    },
    // 11提交订单
    onSubmit() {
      if(!this.arr.some(item=>item.checked)){
        Toast("请选择下单的商品")
        return;
      }

      // 存订单生成的时候需要的数据
      let json = {
        countmoney: this.allPrice,
        countnumber: this.arr.reduce(
          (val, item) => (item.checked ? val + item.num : val),
          0
        ),
        idstr: this.arr
          .reduce((val, item) => (item.checked ? val + "," + item.id : val), "")
          .slice(1),
      };
      sessionStorage.setItem("orderInfo", JSON.stringify(json));
      this.$router.push("/order");
    },
  },
  computed: {
    //10.总价
    allPrice() {
      return this.arr.reduce(
        (val, item) => (item.checked ? val + item.price * item.num : val),
        0
      );
    },
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
.item {
  width: 100vw;
  overflow: hidden;
  .inner {
    width: calc(100vw + 1rem);
    display: flex;
    transition: all 0.3s;
    height: 2rem;
    .van-checkbox {
      margin: @margin20;
    }
    .van-card {
      flex: 1;
    }
    .van-button {
      width: 1rem;
      height: 100% !important;
    }
  }
  .btn-show {
    margin-left: -1rem;
  }
}
.van-submit-bar {
  bottom: calc(@footerHeight + 0.01rem);
}
</style>