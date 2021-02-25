$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 定义表单验证
    form.verify({
            nickname: [/^[\S]{1,6}$/, '昵称长度必须在1到6个字符之间']
        })
        // 调用函数获取用户信息
    getUserInfo();

    // 获取用户信息的函数
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                // 使用layui的form.val()方法，可以快速给表单赋值
                form.val('fm', res.data);
            }
        })
    }

    // 表单的重置事件
    $('form').on('reset', function(e) {
        e.preventDefault();
        getUserInfo(); //重新获取表单数据
    })

    //表单的提交事件，提交修改
    $('form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('修改失败！');
                layer.msg(res.message);
                //调用父页面的方法，让父页面重新获取昵称
                window.parent.getUserInfo();
            }
        })
    })
})