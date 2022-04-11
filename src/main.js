import Vue from 'vue'
import App from './App.vue'
import router from './router'


// 1.assets-reset.css
import "./assets/css/reset.css";

// 引入字体图标文件
import "./assets/css/iconfont.css";

// 2.remjs 
import "./assets/js/rem"

// 3.过滤器filters

/* 4.组件
    pages 当做页面用的组件： 路由组件 eg:detail.vue
          拼接路由组件的 : eg:picker.vue banner.vue
    components 全局组件


    -components 全局组件
    -pages 路由组件
      -detail
        detail.vue 详情的路由组件
        -components 拼接详情的子组件
          banner.vue
          picker.vue
      -home
        home.vue
        ...


*/

// 5.数据交互 http


// 6.工具类 utils 


// 全局组件
import "./components"


//过滤器
import "./filters"

// 引入动画
import "animate.css"


import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
