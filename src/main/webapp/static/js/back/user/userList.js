$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    // var oButtonInit = new ButtonInit();
    // oButtonInit.Init();

});


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_userList').bootstrapTable({
            contentType: 'application/x-www-form-urlencoded',
            url: '/back/user/userList',         //请求后台的URL（*）
            method: 'post',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortName: "id",
            sortOrder: "asc",                   //排序方式
            queryParams: searchParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            smartDisplay:false,
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 525,                        //行高，如果没有设置height属性，表格自动根据记录条数计算表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            showExport: true,                       //是否显示导出
            exportDataType: "basic",              //basic', 'all', 'selected'.
            columns: [{
                checkbox: true
            }, {
                field: 'username',
                title: '姓名',
                sortable: true,
                visible: true
            }, {
                field: 'account_name',
                title: '账号',
                sortable: true
            }, {
                field: 'operation',
                title: '操作',
                width: 100,
                formatter: function (index, row, value) {
                    var editIcon = '<a class="edit ml15" href="javascript:void(0)" title="编辑"  >' +
                        '<i class="glyphicon glyphicon-edit"></i></a>';
                    var removeIcon = '<a class="remove ml15" href="javascript:void(0)" title="删除">' +
                        '<i class="glyphicon glyphicon-remove"></i></a>';
                    return [editIcon, removeIcon].join(" ");
                },
                events: {
                    'click .edit' : function(e, value, row) {
                        window.location.href = "/back/user/editUserUi?id="+row.id;
                    },
                    'click .remove' : function(e, value, row) {
                        deleteUser(row.id);
                    },
                }
            }]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        return params;
    };
    return oTableInit;
};

function deleteUser(id) {
    if (id) {
        BootstrapDialog.show({
            title : "删除用户",
            message : "确认删除此用户吗？",
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
                            url: '/back/user/deletes',
                            data: {ids:id},
                            success: function (result) {
                                if (result=="success") {
                                    refreshTable();
                                    dialog.close();
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

function searchParams(params) {
    var searchUser = $("#searchUser").val();
    if (searchUser && searchUser.length>0) {
        params.searchUser = searchUser;
    }
    return params;
}

function refreshTable(){
    $('#tb_userList').bootstrapTable('refresh');
}

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};
