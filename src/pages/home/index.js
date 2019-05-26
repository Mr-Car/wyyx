require(["../../static/conf/config"], () => {
    require(["jquery", "template", "sw"], ($, template, swiper) => {
        // 判断用户是否存在。
        let userPre;
        if (userPre = localStorage.getItem("userPre")) {
            userPre = JSON.parse(userPre);
            $("#user").html(`<a href="#">${userPre.userPhone}</a>&nbsp;<span class="top-nav-bgJiantou"></span>`);
            $("#user").hover(function () {
                $(this).append(`<div class="myInfo">
                <div>退出登录</div>
            </div>`);
            }, function () {
                $(".myInfo").remove();
            });
            $("body").on("click", ".myInfo", function () {
                localStorage.removeItem("userPre");
                window.location.reload();
            });
        }
        // 点击去购物车
        $(".cart").click(function () {
            console.log("点击购物车");
            window.location.href = "http://localhost:9999/pages/cart/cart.html"
        });

        // 访问首页数据接口
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://localhost:8888/hint",
            success: function (response) {
                $("#top-hint li a").text(response.data.noticeList[0].content).attr("href", response.data.noticeList[0].targetUrl);
                $(".hint-search").text(response.data.searchDefaultWordVO.content);
                response.data.cateList.forEach(function (val, index) {
                    $(".segmentation").before(`<li showIndex="${index}"><a class="nav-list-item" href="#">${val.name}</a></li>`);
                });
                $("#top-nav ul li[showIndex]").each(function () {
                    if ($(this).attr("showIndex") || $(this).attr("showIndex") == "0") {
                        let index = $(this).attr("showIndex");
                        let list = response.data.cateList[index];
                        let listHtml = template("listOfNav", list);
                        $(this).append(listHtml);
                    }
                });
                $("#top-nav ul li").hover(function () {
                    let left = -($(this).offset().left - 75);
                    console.log(left);
                    $(this).children("div").children(".list-details").css({
                        "display": "block",
                        "left": left + "px"
                    });
                }, function () {
                    $(this).children("div").children(".list-details").css({
                        "display": "none"
                    });
                });
            }
        });
        // 搜索热词
        $.ajax({
            type: "get",
            url: "http://localhost:8888/hotkey",
            dataType: "json",
            success: function (response) {
                $(".hotkey a[hotkey]").each(function (index, ele) {
                    if (response.data[index]) {
                        $(this).text(response.data[index].keyword);
                    }
                });
                $(".hotkey1 a[hotkey]").each(function (index, ele) {
                    if (response.data[index]) {
                        $(this).text(response.data[index].keyword);
                    }
                });
            }
        });

        // 广告轮播图
        let preWidth = window.innerWidth;
        $("#banner_top").css("left", -(1920 - preWidth) / 2 + "px");
        let banner_top = new swiper("#banner_top", {
            width: 1920,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 2000,
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        });
        // 登录组件
        $("#login").click(function () {
            $("body").append(`<div class="login_iframe" >
            <iframe src="../login/login.html" frameborder="0">
            </iframe>
            <div class="login_close"></div>
        </div>
        <div class="login_mask"></div>`);
        });
        $("body").on("click", ".login_close", function () {
            console.log("删除");
            $(".login_iframe").remove();
            $(".login_mask").remove();
        });

        // 首页分类列表
        $.ajax({
            type: "get",
            url: "http://localhost:8888/sort",
            dataType: "json",
            success: function (res) {
                let sort = res.data.items;
                let sort1 = [];
                let sort2 = [];
                let sort3 = [];
                for (let i = 0; i < sort.length; i++) {
                    if (i < 4) {
                        sort1.push(sort[i]);
                    } else if (i < 8) {
                        sort2.push(sort[i]);
                    } else if (i < 12) {
                        sort3.push(sort[i]);
                    }
                }
                sort = [];
                sort.push(sort1);
                sort.push(sort2);
                sort.push(sort3);
                // console.log(sort1,sort2,sort3);
                let sortHtml = template("pSort", {
                    sort
                });
                $("body").append(sortHtml);

            }
        });


        // 拿到购物车中的数据
        if (!localStorage.getItem("cartInfo")) {
            console.log("重置购物车");
            localStorage.setItem("cartInfo", "{}");
        }
        let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        let count=0;
        Object.keys(cartInfo).forEach(function(key){
            count+=parseInt(cartInfo[key].pCount);
        });
        $(".num-cart").text(count);
















    });
});