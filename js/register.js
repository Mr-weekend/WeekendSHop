window.onload = function() {
    // 获取元素
    var phone = document.querySelector('#inputtel');
    var mess = document.querySelector('#inputmess');
    var send = document.querySelector('.mess button');
    var tipsicon = document.querySelector('.tips .error');
    var tipscontent = document.querySelector('.tips .error-content');
    var btn = document.querySelector('.submitbox button');
    // 验证手机号码格式
    phoneReg = /^1[3456789]\d{9}$/;
    // 设置倒计时秒数
    var num = 5;
    // 发送验证码按钮验证
    send.addEventListener('click', function() {
        // 1.用户未输入手机号给出提示
        if (phone.value.length == 0) {
            tipscontent.innerHTML = '请输入手机号';
            tipsicon.style.display = 'inline';
            tipscontent.style.display = 'inline';
            // 2.手机号格式正确开始发送验证码
        } else if (phoneReg.test(phone.value)) {
            tipsicon.style.display = 'none';
            tipscontent.style.display = 'none';
            send.disabled = true;
            var timer = setInterval(function() {
                if (num == 0) {
                    clearInterval(timer);
                    send.disabled = false;
                    send.innerHTML = '重新获取验证码';
                    num = 5;
                } else {
                    send.innerHTML = num + '秒后重新获取';
                    num--;
                }
            }, 1000)
        } else {
            // 3.手机号格式错误给出提示
            tipscontent.innerHTML = '请输入正确的手机号';
            tipsicon.style.display = 'inline';
            tipscontent.style.display = 'inline ';
        }
    });
    // 注册按钮验证
    btn.addEventListener('click', function() {
        // 1.用户未输入手机号或输入了验证码但未输入手机号给出提示
        if (phone.value.length == 0 || (phone.value.length == 0 && mess.value.length > 0)) {
            tipscontent.innerHTML = '请输入手机号';
            tipsicon.style.display = 'inline';
            tipscontent.style.display = 'inline';
        } else if ((phoneReg.test(phone.value))) {
            // 2.手机号格式正确但未输入验证码给出提示
            tipscontent.innerHTML = '请输入验证码';
            tipsicon.style.display = 'inline';
            tipscontent.style.display = 'inline';
        } else {
            // 3.手机号格式错误给出提示
            tipscontent.innerHTML = '请输入正确的手机号';
            tipsicon.style.display = 'inline';
            tipscontent.style.display = 'inline';
        }
        // 4.手机号格式正确且已输入验证码，隐藏提示信息
        if ((phoneReg.test(phone.value)) && mess.value.length > 0) {
            tipsicon.style.display = 'none';
            tipscontent.style.display = 'none';
        }
    });
}