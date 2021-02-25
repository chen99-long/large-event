$(function() {
    //获取layui的元素
    var form = layui.form;
    var layer = layui.layer;
    //为密码定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能和旧密码一致'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    $('form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('修改密码失败！');
                layer.msg(res.message);
                return $('form')[0].reset(); //清空表单
            }
        })
    })
})