window.addEventListener('load', function() {
    // 导航栏效果 下拉菜单
    var nav = document.querySelector('.nav-menu');
    var lis = nav.children;
    for (var i = 0; i < lis.length - 1; i++) {
        // 鼠标移至导航栏显示对应内容
        lis[i].addEventListener('mouseover', function() {
            this.children[1].style.display = 'block';
        });
        // 鼠标移开隐藏内容
        lis[i].addEventListener('mouseout', function() {
            this.children[1].style.display = 'none';
        })
    }
    // 搜索框提示信息效果

    var search = document.querySelector('.search input');
    var hot = ['小米手机', '联想拯救者', 'iPad', '索尼电视', '莱卡相机'];
    search.setAttribute("placeholder", hot[0]);
    var j = 1;
    var len = hot.length;
    var timer = setInterval(() => {
        search.setAttribute("placeholder", hot[j]);
        j++;
        if (j == len) {
            j = 0;
        }
    }, 3000);
    // 轮播图效果
    //设置轮播切换秒数
    var seconds = 2500;
    var banner = document.querySelector('.banner');
    var btn = document.querySelector('#button_box');
    // 左右按钮效果
    //首先将整个按钮盒子隐藏
    btn.style.display = 'none';
    //鼠标移至图片上时，显示按钮盒子
    banner.addEventListener('mouseover', function() {
            btn.style.display = 'inline-block';
            //清除定时器，关闭自动轮播
            clearInterval(timer);
            timer = null;
        })
        //鼠标移开图片时，隐藏按钮盒子
    banner.addEventListener('mouseout', function() {
        btn.style.display = 'none';
        //重新启动定时器
        timer = setInterval(() => {
            btn_r.click();
        }, seconds);
    })

    // 获取图片列表
    var pic_lis = document.querySelector('.picture');
    //获取图片个数
    var piclen = pic_lis.children.length;
    // 获取小圆点盒子
    var dots = document.querySelector('.dot');
    // 小圆点的生成
    for (var i = 0; i < piclen; i++) {
        //为页面创建li元素，即有多少图片创建多少li
        var li = document.createElement('li');
        //将li添加至dot里，即生成了和图片对应个数的小圆点
        dots.appendChild(li);
        //为小圆点设置index属性
        li.setAttribute('index', i);
        //为小圆点添加鼠标移上去的事件
        li.addEventListener('mouseover', function() {
            //排他，将所有li类名清空
            for (var i = 0; i < dots.children.length; i++) {
                dots.children[i].className = '';
            }
            //然后将自己的类名设置为当前小圆点
            this.className = 'dot_current';
            //将当前小圆点的index值赋给变量
            var index = this.getAttribute('index');
            //将index变量的值赋给num，实现点击某个小圆点时切换至相应图片
            num = index;
            changePic(); //调用改变当前图片函数
        })
    }
    // //将第一个小圆点设置为当前小圆点
    dots.children[0].className = 'dot_current';
    // 序号从0开始
    var num = 0;
    // //将第一张图片设置为当前图片
    pic_lis.children[0].className = 'pic_current';
    var btn_l = document.querySelector('.left_button');
    var btn_r = document.querySelector('.right_button');
    // // 点击右侧按钮图片和对应的小圆点更换
    btn_r.addEventListener('click', function() {
        num++;
        // 图片切换到最后，重新从第一张图片开始切换
        if (num == piclen) {
            num = 0;
        }
        changePic(); //调用改变当前图片函数
        changeDot(); //调用改变当前小圆点函数

    })
    btn_l.addEventListener('click', function() {
        num--;
        // 切换到第一张图片后，再次点击，就换到最后一张图片
        if (num == -1) {
            num = piclen - 1;
        }
        changePic();
        changeDot();
    })

    function changeDot() {
        for (var i = 0; i < dots.children.length; i++) {
            dots.children[i].className = ''; //排他思想
        }
        dots.children[num].className = 'dot_current';
    }

    function changePic() {
        for (var i = 0; i < piclen; i++) {
            pic_lis.children[i].className = '';
        }
        pic_lis.children[num].className = 'pic_current';
    }
    //用户不做任何操作时自动轮播
    var timer = setInterval(() => {
        btn_r.click();
    }, seconds);

    //限时购倒计时效果
    // 1. 获取元素 
    var hour = document.querySelector('.hour');
    var minute = document.querySelector('.minute');
    var second = document.querySelector('.second');
    var inputTime = +new Date('2222-06-30 20:00:00');
    // 2. 开启定时器
    countDown();
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date(); //返回当前时间总的毫秒数
        var times = parseInt((inputTime - nowTime) / 1000); //剩余时间总的秒数
        var h = parseInt(times / 3600 % 24);
        h = h < 10 ? '0' + h : h;
        hour.innerText = h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        minute.innerText = m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        second.innerText = s;
    }
})