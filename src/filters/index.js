import Vue from "vue"
import filterPrice from "./filterPrice"
import filterTel from "./filterTel"
// Vue.filter("filterPrice", filterPrice)
// Vue.filter("filterTel",filterTel)

let obj = {
    filterPrice,
    filterTel
}

// Object.keys(obj) ["filterPrice","filterTel"]
// Object.keys(obj).forEach(key=>{
//    Vue.filter(key,obj[key])
// })

Object.keys(obj).forEach(key => Vue.filter(key, obj[key]))