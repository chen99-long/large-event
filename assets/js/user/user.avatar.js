$(function() {
    var $image = $('#image')
        // 定义裁剪功能
    $image.cropper({
        aspectRatio: 1 / 1,
        viewMode: 1,
        preview: '.small',
    });

    // 点击上传按钮，系统内部点击一次隐藏的上传文件按钮
    $('#fileBtn').on('click', function() {
        $('#file').click(); //系统内部点击一次上传文件按钮
    })

    //每当文件框发生变化，便让裁剪区显示文件框里的文件
    $('#file').on('change', function(e) {
        var filelist = e.target.files; //获取照片元素
        if (filelist.length === 0) return layui.layer.msg('请选择照片');
        //获取该文件的url地址
        var imgUrl = URL.createObjectURL(filelist[0]);
        // 1.销毁旧的裁剪区域2.添加新的src地址3.重新初始化裁剪区域
        $image.cropper('destroy').attr('src', imgUrl).cropper({
            aspectRatio: 1 / 1,
            viewMode: 1,
            preview: '.small',
        })
    })

    // 给确定按钮绑定事件
    $('#btnOk').on('click', function() {

        // 1.获取到裁剪好的图片
        var dataUrl = $image.cropper('getCroppedCanvas',
                //创建一个canvas画布
                {
                    width: 100,
                    height: 100
                })
            .toDataURL('image/png') // 将画布上的内容转换为base64字符串

        // 2.调用接口，上传到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataUrl },
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg('上传图片失败！');
                layui.layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })

})