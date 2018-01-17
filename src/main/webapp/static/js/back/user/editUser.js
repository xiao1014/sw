$(function () {
    jQuery.validator.addMethod("mobile", function(value, element) {
        var length = value.length;
        var mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    },"请正确填写您的手机号码");
    jQuery.validator.addMethod("noSpace",function(value,element,param){
        return value.indexOf(" ") < 0 ;
    },"不能为空格");
    jQuery.validator.addMethod("chinese",function(value,element,param){
        var chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{0,}$/;
        return this.optional(element) ||  chinese.test(value);
    },"请输入中文");
    jQuery.validator.addMethod("numorletter",function(value,element,param){
        var numorletter = /^[a-zA-Z0-9]{0,}$/;
        return this.optional(element) ||  numorletter.test(value);
    },"请输入数字0-9和英文字母a-z,A-Z");
    jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
        var length = value.length;
        for(var i = 0; i < value.length; i++){
            if(value.charCodeAt(i) > 127){
                length++;
            }
        }
        return this.optional(element) || ( length >= param[0] && length <= param[1] );
    }, "请确保输入的值在{0}-{1}个字符之间(一个中文字算两个字符)");
    $('#editUserForm').validate({
        rules: {
            username: {
                required: true,
                chinese:true,
                byteRangeLength:[4,20]
            },
            accountName: {
                required: true,
                noSpace:true,
                numorletter:true,
                //accountNames: true,
                byteRangeLength: [5,30],
                /*remote: {
                    url: "sysadmin/member/memberManage/isAccountRepeated",
                    type: "post",
                    dataType: "json",
                    accountName: function() {
                        return $("#accountName").val();
                    }
                }*/

            }
        },
        messages: {
            username: {
                required: "姓名不能为空！",
                chinese: "姓名只能为中文！",
                byteRangeLength:"姓名必须是2-10个汉字"
            },
            accountName: {
                noSpace : "账户名不能包含空格！",
                required: "账户名不能为空！",
                numorletter:"请输入数字0-9和英文字母a-z,A-Z",
                byteRangeLength: "账户名必须在{0}-{1}个字符之间",
                // remote:"账户名重复！"
            },
        }
    });
});

function saveUser() {
    if(!$("#editUserForm").valid()){
        return ;
    }
    $.ajax({
        type: 'post',
        // contentType : 'application/json;charset=utf-8',
        dataType:"json",
        url: '/back/user/update',
        data: $("#editUserForm").serialize(),
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

function refreshTable(){
    $('#editUserForm').bootstrapTable('refresh');
}