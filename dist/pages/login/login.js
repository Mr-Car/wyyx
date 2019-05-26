require(["../../static/conf/config"], function () {
    require(["jquery"], function ($) {
        $("#submit").click(function (e) {
            let phone = $("#phone").val();
            let psw = $("#psw").val();
            e.preventDefault();
            console.log(phone, psw);
            if(!localStorage.getItem("userInfo")){
                localStorage.setItem("userInfo","{}");
            }
            if(!localStorage.getItem("userPre")){
                localStorage.setItem("userPre","{}");
            }
            let response =JSON.parse(localStorage.getItem("userInfo"));
            let user = false;
            let userPre;
            console.log(response);
            Object.keys(response).forEach(function (key) {
                if (response[key].userPhone == phone) {
                    if (response[key].userPwd == psw) {
                        userPre={
                            userId:key,
                            userPhone:response[key].userPhone,
                        }
                        userPre = JSON.stringify(userPre);
                        localStorage.setItem("userPre", userPre);
                        parent.location.reload();
                    } else {
                        $("#psw").parent().append(`<p class="errorInfo">密码不正确！</p>`);
                    }
                    user = true;
                }
            });
            if (!user) {
                $("#phone").parent().append(`<p class="errorInfo">用户不存在！</p>`);
            }

        });

    });
})