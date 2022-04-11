import Vue from "vue"


import goBack from "./goBack.vue";
import toSearch from "./toSearch.vue";
import listVue from "./listVue.vue"

// Vue.component("goBack",goBack)
// Vue.component("toSearch",toSearch)

let obj={
    goBack:goBack,
    toSearch,
    listVue
}

for(let key in obj){
    Vue.component(key,obj[key])
}