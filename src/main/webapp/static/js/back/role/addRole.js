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

function saveRole() {
    if(!$("#roleForm").valid()){
        return ;
    }
    $.ajax({
        type: 'post',
        // contentType : 'application/json;charset=utf-8',
        dataType:"json",
        url: '/back/role/save',
        data: $("#roleForm").serialize(),
        success: function (result) {

            if (result=="success") {
                BootstrapDialog.show({
                    title : "成功",
                    message : "保存成功",
                    closable: true,
                    closeByBackdrop: true,
                    type : BootstrapDialog.TYPE_SUCCESS,
                    size : BootstrapDialog.SIZE_SMALL,
                    onhide: function () {
                        window.history.go(-1);
                    }
                });
                /*BootstrapDialog.success = function (message, callback) {
                    return new BootstrapDialog({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        message: message
                    }).open();
                };*/
                // BootstrapDialog.success("保存成功",window.history.go(-1));
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