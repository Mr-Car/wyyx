require(["../../static/conf/config"], function () {
    require(["jquery", "validate"], function ($) {
        $(document).ready(function () {
            $("#shortM").next().click(function () {
                alert("验证码是54321");
            });
            console.log("验证");
            $("#userRegister").validate({
                rules: {
                    userId: {
                        required: true,
                        noChinese: true,
                        minlength: 6,
                        digits: true,
                    },
                    userName: {
                        required: true
                    },
                    userPhone: {
                        required: true,
                        isMobile: true,
                    },
                    userPwd: {
                        required: true,
                        noChinese: true,
                        minlength: 6,
                    },
                    RuserPwd: {
                        equalTo: "#userPwd"
                    },
                    shortM: {
                        required:true,
                        equal: "54321"
                    }

                },
                messages: {
                    userId: {
                        required: "账号不能为空！",
                        minlength: "账号不能少于6位",
                        digits: "账号必须是数字！",
                        noChinese: "账号不能含有中文！",
                    },
                    userName: {
                        required: "姓名不能为空！你可以改名，但是不可以没名！",
                    },
                    userPhone: {
                        required: "手机号不能为空！",
                        isMobile: "请输入正确的手机号！买不起手机卡？",
                    },
                    userPwd: {
                        required: "密码不能为空！",
                        minlength: "密码不能少于6位！",
                        noChinese: "密码不能含有中文！",
                    },
                    RuserPwd: {
                        equalTo: "两次输入的密码不一致！你手残吗？"
                    },
                    shortM: {
                        required: "你还没有输入验证码！",
                        equal: "验证码错误！"
                    }
                }
            });
            $.validator.setDefaults({
                submitHandler: function(form) { alert("提交事件!");form.submit(); }
              });
        });



        //手机号码验证  
        jQuery.validator.addMethod("isMobile", function (value, element) {
            var length = value.length;
            var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "请正确填写手机号码");
        // 非中文验证
        jQuery.validator.addMethod("noChinese", function (value, element) {
            var t = /[\u4E00-\u9FA5]/;
            return this.optional(element) || !t.test(value);
        });
        jQuery.validator.addMethod("equal",function(value){
            if(value!="54321"){
                return false;
            }
            return true;
        });









    });
})