$(function () {
    $("#myModal").removeAttrs("tabindex");
    $(".icon-picker").iconPicker();
    initMenuList();
    $('#menuForm').validate({
        rules: {
            name: {
                required: true,
            },
            url: {
                required: true,
            },

        },
        messages: {
            name: {
                required: "菜单名称不能为空！",
            },
            url: {
                required: "菜单路径不能为空！",
            }
        }
    });
})
// http://www.cnblogs.com/landeanfen/p/6924895.html#_labelTop
function initMenuList() {
    $("#tb_menuList").bootstrapTable({
        id: "id",
        method: 'post',
        url: '/back/menu/menuList',
        toolbar: '#toolbar',
        pagination: false,
        treeView: true,
        treeId: "id",
        treeField: "name",
        treeRootLevel: 1,
        clickToSelect: true,//collapseIcon: "glyphicon glyphicon-triangle-right",//折叠样式
        //expandIcon: "glyphicon glyphicon-triangle-bottom"//展开样式
        columns: [{
            field: 'name',
            title: '名称',
            sortable: false,
            visible: true,
            width: 200,
        }, /*{
            field: 'icon',
            title: '图标',
            align: 'center',
            sortable: false,
            width: 30,
            formatter: function (value) {
                return "<li  class='"+value+"'></li>";
            }
        },*/ {
            field: 'url',
            title: '路径',
            sortable: false,
        }, {
            field: 'operation',
            title: '操作',
            width: 200,
            formatter: function () {
                var addIcon = '<span class="add ml15"><i class="glyphicon glyphicon-plus"></i>添加</span>';
                var editIcon = '<span class="edit ml15"><i class="glyphicon glyphicon-edit"></i>编辑</span>';
                var removeIcon = '<span class="remove ml15"><i class="glyphicon glyphicon-remove">删除</i></span>';
                return [addIcon, editIcon, removeIcon].join(" ");
            },
            events: {
                'click .add' : function(e, value, row) {
                    menuModelShow(e, value, row, "add");
                },
                'click .edit' : function(e, value, row) {
                    $("#id").val(row.id);
                    menuModelShow(e, value, row, "edit");
                },
                'click .remove' : function(e, value, row) {
                    deleteMenu(row.id);
                }
            }
        }]
    })
}

function menuModelShow(e, value, row, type) {
    if (row) {
        if (type == "add") {
            $("#myModalLabel").html("添加菜单");
            $("#parentName").parent("div").parent("div").show();
            $("#parentName").val(row.name);
            $("#pid").val(row.id);
            $("#menuLevel").val(row.menuLevel-0+1);
            $("input[name='defaultOpen'][value='0']").prop("checked", "checked");
        } else {
            $("#myModalLabel").html("编辑菜单");
            $("#parentName").parent("div").parent("div").hide();
            $("#id").val(row.id);
            $("#name").val(row.name);
            $("#url").val(row.url);
            $("#sort").val(row.sort);
            $("#pid").val(row.pid);
            $("#icon").val(row.icon);
            if (row.defaultOpen) {
                $("input[name='defaultOpen'][value='"+row.defaultOpen+"']").prop("checked", "checked");
            } else {
                $("input[name='defaultOpen'][value='0']").prop("checked", "checked");
            }
            $("#menuLevel").val(row.menuLevel);
        }
    } else {
        $("#menuLevel").val(1);
    }
    $('#myModal').modal({
        keyboard: false,
        backdrop:false,//空白处不关闭.
    })
    $("#myModal").on("hidden.bs.modal", function() {
        $("#myModal input[type='text']").val("");
        $("#myModal input[type='hidden']").val("");
    });
}

function saveOrUpdateMenu() {
    if ($("#id") && $("#id").val().length>0) {
        // 编辑
        editMenu();
    } else {
        // 添加
        saveMenu();
    }
}

function saveMenu() {
    if(!$("#menuForm").valid()) {
        return;
    }
    $.ajax({
        type: 'post',
        dataType:"json",
        url: '/back/menu/save',
        data: $("#menuForm").serialize(),
        success: function (result) {
            if (result=="success") {
                $('#myModal').modal('hide');
                BootstrapDialog.show({
                    title : "成功",
                    message : "保存成功",
                    closable: true,
                    closeByBackdrop: true,
                    type : BootstrapDialog.TYPE_SUCCESS,
                    size : BootstrapDialog.SIZE_SMALL,
                    onhide: function () {
                        window.location.reload();
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

function editMenu() {
    if(!$("#menuForm").valid()) {
        return;
    }
    $.ajax({
        type: 'post',
        dataType:"json",
        url: '/back/menu/update',
        data: $("#menuForm").serialize(),
        success: function (result) {
            $('#myModal').modal('hide');
            if (result=="success") {
                BootstrapDialog.show({
                    title : "成功",
                    message : "更新成功",
                    closable: true,
                    closeByBackdrop: true,
                    type : BootstrapDialog.TYPE_SUCCESS,
                    size : BootstrapDialog.SIZE_SMALL,
                    onhide: function () {
                        window.location.reload();
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

function deleteMenu(id) {
    if (id) {
        BootstrapDialog.show({
                title : "删除菜单",
                message : "确认删除此菜单吗？",
                closable: true,
                closeByBackdrop: false,
                type : BootstrapDialog.TYPE_WARNING,
                size : BootstrapDialog.SIZE_SMALL,
                buttons : [
                    {
                        label : "确定",
                        icon : "glyphicon glyphicon-ok",
                        cssClass : "btn-primary",
                        action : function(dialog){      //给当前按钮添加点击事件
                            $.ajax({
                                type: 'post',
                                // contentType : 'application/json;charset=utf-8',
                                dataType:"json",
                                url: '/back/menu/delete',
                                data: {id:id},
                                success: function (result) {
                                    if (result=="success") {
                                        dialog.close();
                                        window.location.reload();
                                    } else {

                                    }
                                }
                            })
                        }
                    },
                    {
                        label : "取消",
                        icon : "glyphicon glyphicon-remove",
                        cssClass : "btn-danger",    //给按钮添加类名   可以通过此方式给按钮添加样式
                        action : function (dialog) {
                            dialog.close();
                        }
                    }
                ]
            });
    }
}

function refreshTable(){
    $('#tb_menuList').bootstrapTable('refresh');
}