require(["../../static/conf/config"], () => {
    require(["jquery","template"], ($,template) => {
        // 获取url参数函数
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
        console.log(GetUrlParam("sort"));
        $.ajax({
            type: "get",
            url: "http://localhost:8888/sort"+GetUrlParam("sort"),
            dataType: "json",
            success: function (res) {
                let pList=res.data.items;
                localStorage.setItem("productInfo",JSON.stringify(pList));
                let pListHtml=template("pList",{pList});
                $("#manman").append(pListHtml);
            }
        });



    })
})