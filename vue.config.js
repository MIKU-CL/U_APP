module.exports={
    //打包后的文件夹目录
    outputDir:"dist",
    // 静态资源文件夹目录
    assetsDir:"static",
    // 根文件
    indexPath:"index.html",
    // 基础路径 hash:""  history:"/"
    publicPath:"",
    // 配置代理
    devServer:{
        proxy:{
            "/api":{
                // 后端电脑的ip+端口号
                target:"http://localhost:2000",
                changeOrigin:true,//跨域
                ws:true,//跨域
            }
        }
    }
}