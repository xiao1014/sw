$(function () {
    jQuery.validator.addMethod("onlyEn",function(value,element,param){
        var onlyEn = /^[a-zA-Z]{0,}$/;
        return this.optional(element) ||  onlyEn.test(value);
    },"请输入数字0-9和英文字母a-z,A-Z");
    $('#roleForm').validate({
        rules: {
            name: {
                required: true,
                rangelength:[2,15]
            },
            roleCode: {
                required: true,
                onlyEn: true,
                rangelength:[2,15]
            },

        },
        messages: {
            name: {
                required: "不能为空",
                rangelength: "请输入一个介于 {0} 和 {1} 之间的值",
            },
            roleCode: {
                required: "不能为空",
                onlyEn: "请仅输入英文",
                rangelength: "请输入一个介于 {0} 和 {1} 之间的值",
            }
        }
    });
});

function editRole() {
    if(!$("#roleEditForm").valid()){
        return ;
    }
    $.ajax({
        type: 'post',
        dataType:"json",
        url: '/back/role/update',
        data: $("#roleEditForm").serialize(),
        success: function (result) {
            if (result=="success") {
                BootstrapDialog.show({
                    title : "更新成功",
                    message : '<div class="glyphicon glyphicon-ok text-success"><span class="ml15">更新成功</span></div>',
                    closable: true,
                    closeByBackdrop: true,
                    type : BootstrapDialog.TYPE_SUCCESS,
                    size : BootstrapDialog.SIZE_SMALL,
                    onhide: function () {
                        window.history.go(-1);
                    }
                });
            } else {
                BootstrapDialog.show({
                    title : "失败",
                    message : "保存失败",
                    closable: true,
                    closeByBackdrop: false,
                    type : BootstrapDialog.TYPE_DANGER,
                    size : BootstrapDialog.SIZE_SMALL
                });
            }
        }
    })
}
