// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function() {
    $.ajaxPrefilter(function(options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
            //如果在url里包括/my/，则给headers添加一个权限
            //string.indexOf(str)，当不存在str时，索引是-1


        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        //如果请求失败，清空许可并强制退出
        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清空localStorage里的许可
                localStorage.removeItem('token');
                // 2.跳转到注册界面
                location.href = '/login.html'
            }
        }
    })
})