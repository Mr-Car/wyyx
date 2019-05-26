requirejs.config({
    baseUrl:"../../js/",
    paths:{
        "jquery":"lib/jquery-2.0.3",
        "css":"lib/css",
        "template":"lib/template-web",
        "sw":"lib/swiper.min",
        "validate":"lib/jquery.validate"
    },
    shim:{
        sw:{
            deps:["css!../css/pages/swiper.min.css"]
        }

    }
});