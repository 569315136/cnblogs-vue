let webpack=require('webpack')

module.exports={
    entry:{
        main:'./views/main.js'
    },
    output:{
        path:'./public',
        filename:'build.js'
    },
    module:{
        loaders:[{
            test:/\.vue$/,
            loader:'vue'
        },
        {
            test:/\.js$/,
            loader:'babel',
            exclude:/node_modules/
        },
        {
            test:/\.css/,
            loader:'style!css!'
        }
    ]},
    resolve:{
        alias:{
            vue:'vue/dist/vue.js'
        }
    },
    babel:{
        presets:['es2015','stage-2'],
        plugins:'transform-runtime'
    }
}