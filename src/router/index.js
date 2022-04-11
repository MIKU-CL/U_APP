import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const index = () => import("../pages/index/index.vue")
const list = () => import("../pages/list/list.vue")
const search = () => Promise.resolve(import("../pages/search/search.vue"))
const register = () => import("../pages/register/register.vue")
const login = () => import("../pages/login/login.vue")
const home = () => import("../pages/home/home.vue")
const cate = () => import("../pages/cate/cate.vue")
const shop = () => import("../pages/shop/shop.vue")
const mine = () => import("../pages/mine/mine.vue")
const test = () => import("../pages/test/test.vue")



const routes = [
  {
    path: "/register",
    // component 是出现在默认的路由视图中
    component: register,
    meta: {
      title: "注册",
      back: true
    }
  },
  {
    path: "/login",
    components: {
      default: login,//出现在默认的路由视图中
      second: test,//出现在name="second"的路由视图中
    },
    meta: {
      title: "登录",
      register: true
    }
  },
  {
    path: "/index",
    component: index,
    // 二级路由规则
    children: [
      {
        path: "home",
        component: home,
        meta: {
          title: "首页"
        }
      },
      {
        path: "cate",
        component: cate,
        meta: {
          title: "分类"
        }
      },
      {
        path: "shop",
        component: shop,
        meta: {
          title: "购物车"
        }
      },
      {
        path: "mine",
        component: mine,
        meta: {
          title: "个人中心"
        }
      },
    ]
  },
  {
    path: "/list",
    component: list,
    name: "列表",
    meta: {
      title: "商品列表",
      back: true
    }
  },
  {
    // 动态路由
    path: "/detail/:id",
    component: () => import("../pages/detail/detail.vue"),
    name: "详情",
    meta: {
      title: "商品详情",
      back: true
    },
   
  },
  {
    path: "/search",
    component: search,
    //别名
    alias: "/s",
    // 命名路由
    name: "搜索",
    meta: {
      title: "搜索",
      back: true
    },
   
  },
  {
    path: "*",
    redirect: "/login"
  }
]

const router = new VueRouter({
  // 路由模式 hash(有#) history(无#)，默认hash
  mode:"hash",
  // 路由规则
  routes,
  // 滚动行为
  /**
   * 
   * @param {*} to 前往的新的路由信息 $route
   * @param {*} from 从哪里来的路由信息 $route
   * @param {*} savePosition 上一离开该路由的时候保存的位置坐标，第一次进来是null
   * @returns 进入新路由的位置
   */
  scrollBehavior(to,from,savePosition){
    // 如果是第一次来，返回（0，0）；如果是从其他路由返回过来的，那么return 上一次的坐标
    if(savePosition){
      return savePosition
    }else{
      return {x:0,y:0}
    }
  }
})

// 全局前置守卫:进入每一个路由，都会执行该守卫
 /**
   * 
   * @param {*} to 前往的新的路由信息 $route
   * @param {*} from 从哪里来的路由信息 $route
   * @param {*} next 是否允许进入
   */
router.beforeEach((to, from, next) => {
  console.log("=======全局前置守卫：判断是否登录========");
  // 1.判断前往的路由是 登录|注册， next()
  if(to.path==='/login'||to.path==='/register'){
    next();
    return;
  }
  // 2.判断前往的路由不是 登录|注册 ，判断是否登录了，如果登陆了，next();如果没有登录，next('/login')
  let isLogin=localStorage.getItem("isLogin");//'1'  null
  if(isLogin){
    next();
    return;
  }
  next("/login")
  
})

// 全局后置守卫：每一个路由进入之后
router.afterEach((to,from)=>{
  console.log("=======全局后置守卫========");
})

export default router
