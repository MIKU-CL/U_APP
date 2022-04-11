import axios from "axios"
import Vue from "vue"
import {Toast} from "vant"
import router from "../router"

// 环境判断
//开发环境 8080:$pre='http://localhost:2000'
//生产环境 2000:$pre=""

// console.log(process.env.NODE_ENV) 开发环境：development 生产环境：production
if (process.env.NODE_ENV === 'development') {
    Vue.prototype.$pre = "http://localhost:2000"
}
if (process.env.NODE_ENV === 'production') {
    Vue.prototype.$pre = ""
}


// 请求拦截：每次请求都会执行的逻辑放入请求拦截中。
// config:就是请求信息,return 的内容是后端收到的真正的请求信息
// 请求拦截收到的是前端发给后端的请求信息，return是后端收到的真正的信息
axios.interceptors.request.use(config => {

    // 如果是登录|注册，不加token;如果不是登录，也不是注册，加token
    if (config.url !== '/api/login' && config.url !== '/api/register') {
        config.headers.authorization = JSON.parse(localStorage.getItem("isLogin")).token;

    }
    return config
})

// 响应拦截：每一次响应数据都要执行的逻辑
// 响应拦截：收到的是后端给前端的数据，return的是前端真正收到的数据
axios.interceptors.response.use(res => {
    // 统一打印数据
    console.group("响应拦截,本次请求地址：" + res.config.url)
    console.log(res);
    console.groupEnd()

    // 统一处理失败
    if(res.data.code!==200){
        Toast(res.data.msg)
    }

    //统一处理掉线
    if(res.data.msg==='登录已过期或访问权限受限'){
        // 删除isLogin
        localStorage.removeItem("isLogin")
        //跳转到登录页面
        router.replace("/login")
    }
    return res;
})

//首页的分类
export const reqHomeCate = () => {
    return axios({
        url: "/api/getcate",
        method: "get",
    })
}

// 首页的banner
export const reqHomeBanner = () => {
    return axios({
        url: "/api/getbanner",
        method: "get",
    })
}

// 首页的商品
export const reqHomeGoods = () => {
    return axios({
        url: "/api/gethortgoods",
        method: "get",
    })
}

//登录
export const reqLogin = (user) => {
    return axios({
        url: "/api/login",
        method: "post",
        data: user
    })
}
// 注册
export const reqRegister = (data) => {
    return axios({
        url: "/api/register",
        method: "post",
        data
    })
}

// 分类列表
export const reqCateList = (params) => {
    return axios({
        url: "/api/getgoodlist",
        method: "get",
        params
    })
}

// 详情
export const reqDetail = (params) => {
    return axios({
        url: "/api/getgoodsinfo",
        method: "get",
        params
    })
}

// 搜索
export const reqSearch = (params) => {
    return axios({
        url: "/api/search",
        method: "get",
        params
    })
}

//获取购物车
export const reqGetShop = (params) => {
    return axios({
        url: "/api/cartlist",
        method: "get",
        params,
        // headers:{
        //     authorization:JSON.parse(localStorage.getItem("isLogin")).token
        // }
    })
}
//购物车添加
export const reqAddShop = (data) => {
    return axios({
        url: "/api/cartadd",
        method: "post",
        data,
        // headers:{
        //     authorization:JSON.parse(localStorage.getItem("isLogin")).token
        // }
    })
}


//所有的分类
export const reqCates=()=>{
    return axios({
        url:"/api/getcates"
    })
}

//购物车修改
export const reqShopEdit=(data)=>{
    return axios({
        url:"/api/cartedit",
        method: "post",
        data
    })
}
//购物车删除
export const reqShopDel=(data)=>{
    return axios({
        url:"/api/cartdelete",
        method: "post",
        data
    })
}