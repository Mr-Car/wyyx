require(["../../static/conf/config"], function () {
    require(["jquery", "template"], ($, template) => {

        function GetUrlParam(paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");

            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;

                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");

                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            } else {
                return "";
            }
        }

        // 修改页面信息
        let preId = GetUrlParam("id");
        let productInfo = JSON.parse(localStorage.getItem("productInfo"));
        // console.log(productInfo);
        let pInfo;
        productInfo.forEach(function (val) {
            if (val.id == preId) {
                pInfo = val;
            }
        });
        console.log(pInfo.skuSpecList[0].skuSpecValueList);
        $(".pName").text(pInfo.name);
        $(".imgBox>img").attr("src", pInfo.scenePicUrl);
        $(".detail_name span").text(pInfo.name);
        $(".p_num").text(pInfo.retailPrice);
        let guige = pInfo.skuSpecList[0].skuSpecValueList;
        let guigeHtml = template("pGuige", {
            guige
        });
        $(".ggg").append(guigeHtml);
        // 拿到购物车中的数据
        if (!localStorage.getItem("cartInfo")) {
            console.log("重置购物车");
            localStorage.setItem("cartInfo", "{}");
        }
        let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        let count=0;
        Object.keys(cartInfo).forEach(function(key){
            count+=cartInfo[key].pCount;
        });
        $(".num-cart").text(count);




        $(".imgBox").hover(function () {
            let mask = "<div class='imgMask'></div>";
            let bigBox = `<div class="bigBox"><div class="bigPic">
            <img src="${pInfo.scenePicUrl}" alt="">
        </div></div>`;
            $(".imgBox").append(mask);
            $(".glass").append(bigBox);
            console.log("触发一次");
        }, function () {
            $(".imgMask").remove();
            $(".bigBox").remove();
        });
        let boxLeft = $(".imgBox").offset().left;
        let boxTop = $(".imgBox").offset().top;
        $(".imgBox").mousemove(function (e) {
            e = e || event;
            let x = e.pageX - boxLeft - $(".imgMask").width() / 2;
            let y = e.pageY - boxTop - $(".imgMask").height() / 2;
            // console.log(x, y);
            $(".imgMask").css({
                "top": y + "px",
                "left": x + "px"
            });

            if ($(".imgMask").position().left <= 0) {
                $(".imgMask").css({
                    "left": 0
                });
            }
            if ($(".imgMask").position().top <= 0) {
                $(".imgMask").css({
                    "top": 0
                });
            }
            if ($(".imgMask").position().top >= 200) {
                $(".imgMask").css({
                    "top": 200 + "px"
                });
            }
            if ($(".imgMask").position().left >= 200) {
                $(".imgMask").css({
                    "left": 200 + "px"
                });
            }

            let bigLeft = ($(".imgMask").position().left / 200) * ($(".bigPic").width() - $(".bigBox").width());
            let bigTop = ($(".imgMask").position().top / 200) * ($(".bigPic").height() - $(".bigBox").height());
            $(".bigPic").css({
                "left": -bigLeft + "px",
                "top": -bigTop + "px"
            });


        });

        // 规格
        $(".guige ul li").hover(function () {
            $(this).children("div").css("display", "block");
        }, function () {
            $(this).children("div").css("display", "none");
        });
        $(".guige ul li").click(function () {
            $(this).siblings().removeClass("tab-sel");
            $(this).toggleClass("tab-sel");
        });
        // 数量
        $(".add").click(function () {
            $(".min").children().css("background", "#999");
            $(".num").val(parseInt($(".num").val()) + 1);
        });
        $(".min").click(function () {
            if ($(".num").val() <= 1) {
                $(this).children().css("background", "#D3D3D3");
                alert("该商品最低一件起售");
            } else {
                $(".num").val(parseInt($(".num").val()) - 1);
            }
        });

        // 加入购物车
        $(".addCart").click(function () {
            // 如果没有cartInfo则初始化一个空对象，以防JSON.parse()读取类型出错
            let pName = $(".detail_name").text(); //商品名称
            let pPrice = $(".p_num").text(); //商品单价
            let pCount = $(".num").val(); // 商品数量
            let guige = $(".tab-sel").children("div").text(); //商品规格
            let imgSrc = $(".imgBox img").attr("src"); //商品图片地址
            if (cartInfo[preId]) {
                console.log("存在了");
                cartInfo[preId] = {
                    preId,
                    pName,
                    pPrice,
                    pCount:parseInt(pCount)+1,
                    guige,
                    imgSrc
                }
                $(".num-cart").text(parseInt($(".num-cart").text())+parseInt(pCount));
            } else {
                cartInfo[preId] = {
                    preId,
                    pName,
                    pPrice,
                    pCount,
                    guige,
                    imgSrc
                }
            }

            // console.log(cartInfo);
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
            alert("加入购物车成功！");
        });


    });
});