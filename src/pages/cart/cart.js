require(["../../static/conf/config"], function () {
    require(["jquery", "template"], ($, template) => {

        let cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
        console.log(cartInfo);
        let cartHtml = template("cart", {
            cartInfo
        });
        // console.log(cartHtml);
        $(".container-fluid").append(cartHtml);

        // 数量
        $(".add").click(function () {
            $(".min").children().css("background", "#999");
            $(this).prev().val(parseInt($(this).prev().val()) + 1);
            $(this).parent().parent().next().text(parseInt($(this).prev().val()) * parseFloat($(this).parent().parent().prev().children("span").text()));
            // 计算总价格
            $(".totalMoney").text(parseFloat($(".totalMoney").text()) + parseFloat($(this).parent().parent().prev().children("span").text()));
            $(".totalMoney2").text($(".totalMoney").text());
            let preId = $(this).parent().parent().prev().prev().children(".list_img").attr("alt");
            cartInfo[preId].pCount = $(this).prev().val();
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        });
        $(".min").click(function () {
            if ($(this).next().val() <= 1) {
                $(this).children().css("background", "#D3D3D3");
                alert("该商品最低一件起售");
            } else {
                $(this).next().val(parseInt($(this).next().val()) - 1);
                // 计算总价格
                $(".totalMoney").text(parseFloat($(".totalMoney").text()) - parseFloat($(this).parent().parent().prev().children("span").text()));
                $(".totalMoney2").text($(".totalMoney").text());
            }
            // 小计
            $(this).parent().parent().next().text(parseInt($(this).next().val()) * parseFloat($(this).parent().parent().prev().children("span").text()));
            let preId = $(this).parent().parent().prev().prev().children(".list_img").attr("alt");
            cartInfo[preId].pCount = $(this).next().val();
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        });
        // 总价格
        let total = 0;
        $(".list_sum").each(function () {
            total += parseFloat($(this).text());
        });
        $(".totalMoney").text(total);
        $(".totalMoney2").text($(".totalMoney").text());

        $(".delProduct").click(function () {
            $(this).parent().parent().remove();
            let preId = $(this).parent().parent().children(".col-md-3").children("img").attr("alt");
            cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
            delete cartInfo[preId];
            console.log(preId);
            console.log(cartInfo);
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        });
        $(".clearAll").click(function () {
            $(".productList").remove();
            localStorage.removeItem("cartInfo");
            alert("清空购物车成功！");
            $(".num-cart").text("0");
        });

        $(".sub_btn").click(function(){
            alert("当前无法下单，请联系管理员！");
        });

    })
})