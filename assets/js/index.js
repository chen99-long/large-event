$(function() {
    //调用用户的基本信息
    getUserInfo();

    var layer = layui.layer; //获取layui里的layer

    //点击退出，实现退出功能
    $('#exit').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清空localStorage里的许可
            localStorage.removeItem('token');
            // 2.跳转到注册界面
            location.href = '/login.html'
            layer.close(index);
        })
    })


})

//封装一个函数，用来获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败！');
                //调用一个renderAvatar函数用来渲染头像
                renderAvatar(res.data);
            }
            /*  //如果请求失败，清空许可并强制退出
             complete: function(res) {
                 if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                     // 1.清空localStorage里的许可
                     localStorage.removeItem('token');
                     // 2.跳转到注册界面
                     location.href = '/login.html'
                 }
             } */
    })
}

//渲染用户头像的函数
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    // 2.渲染欢迎文本
    $('#welcome').html('欢迎，' + name);
    // 3.按需渲染头像图片
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show();
    }
}