window.onload = function() {
    // 1.登录方式切换显示对应内容
    //获取元素
    var lis = document.querySelectorAll('.tab-list li');
    var items = document.querySelectorAll('.tab-content .item');
    //注册单击事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i); //设置索引号
        lis[i].addEventListener('click', function() {
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = ''; //将所有li类名清空
            }
            this.className = 'current'; //当前li设置类名
            var index = this.getAttribute('index');
            for (var k = 0; k < items.length; k++) {
                items[k].style.display = 'none'; //所有item隐藏
            }
            items[index].style.display = 'block'; //当前item显示
        });
    };
    // 2.账号密码登录表单验证
    // 获取元素
    var account = document.querySelector('.account');
    var pass = document.querySelector('.password');
    var btn = document.querySelector('.submitbox button');
    var tips = document.querySelector('.login-pass .tips');
    var content = document.querySelector('.login-pass .content');
    btn.addEventListener('click', function() {
        // 用户未输入账号给出提示
        if (account.value.trim().length == 0) {
            content.innerHTML = '请输入账号';
            tips.style.display = 'block';
            // 未输入密码给出提示
        } else if (pass.value.trim().length == 0) {
            content.innerHTML = '请输入密码';
            tips.style.display = 'block';
        }
        // 账号密码都输入了就隐藏提示信息
        if (account.value.trim().length > 0 && pass.value.trim().length > 0) {
            tips.style.display = 'none';
        }
    });
    //3.手机号验证码登录表单验证
    // 获取元素
    var phone = document.querySelector('.phone');
    var mess = document.querySelector('.message');
    var sendbox = document.querySelector('.inputMess button');
    var tips1 = document.querySelector('.login-mess .tips');
    var content1 = document.querySelector('.login-mess .content');
    var btn1 = document.querySelector('.submitbox1 button');
    // 验证手机号码格式
    phoneReg = /^1[3456789]\d{9}$/;
    // 设置倒计时秒数
    var num = 5;
    // 发送验证码按钮验证
    sendbox.addEventListener('click', function() {
        // 1.用户未输入手机号给出提示
        if (phone.value.length == 0) {
            content1.innerHTML = '请输入手机号';
            tips1.style.display = 'block';
            // 2.手机号格式正确开始发送验证码
        } else if (phoneReg.test(phone.value)) {
            tips1.style.display = 'none';
            sendbox.disabled = true;
            var timer = setInterval(function() {
                if (num == 0) {
                    clearInterval(timer);
                    sendbox.disabled = false;
                    sendbox.innerHTML = '重新获取验证码';
                    num = 5;
                } else {
                    sendbox.innerHTML = num + '秒后重新获取';
                    num--;
                }
            }, 1000)
        } else {
            // 3.手机号格式错误给出提示
            content1.innerHTML = '请输入正确的手机号';
            tips1.style.display = 'block';
        }
    });
    // 登录按钮验证
    btn1.addEventListener('click', function() {
        // 1.用户未输入手机号或输入了验证码但未输入手机号给出提示
        if (phone.value.length == 0 || (phone.value.length == 0 && mess.value.length > 0)) {
            content1.innerHTML = '请输入手机号';
            tips1.style.display = 'block';
        } else if ((phoneReg.test(phone.value))) {
            // 2.手机号格式正确但未输入验证码给出提示
            content1.innerHTML = '请输入验证码';
            tips1.style.display = 'block';
        } else {
            // 3.手机号格式错误给出提示
            content1.innerHTML = '请输入正确的手机号';
            tips1.style.display = 'block';
        }
        // 4.手机号格式正确且已输入验证码，隐藏提示信息
        if ((phoneReg.test(phone.value)) && mess.value.length > 0) {
            tips1.style.display = 'none';
        }
    });
    // 4.切换登录方式清空输入内容和隐藏提示信息
    lis[0].addEventListener('click', function() {
        phone.value = '';
        mess.value = '';
        tips1.style.display = 'none';
    });
    lis[1].addEventListener('click', function() {
        account.value = '';
        pass.value = '';
        tips.style.display = 'none';
    });
}