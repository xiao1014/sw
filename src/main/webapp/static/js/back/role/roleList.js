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
        $('#tb_roleList').bootstrapTable({
            contentType: 'application/x-www-form-urlencoded',
            url: '/back/role/roleList',
            method: 'post',
            toolbar: '#toolbar',
            striped: true,
            cache: false,
            pagination: true,
            sortable: true,
            sortName: "sort",
            sortOrder: "asc",
            queryParams: searchParams,
            sidePagination: "server",
            pageNumber:1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            smartDisplay:false,
            search: false,
            strictSearch: true,
            showColumns: true,
            showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            uniqueId: "ID",
            showToggle:false,
            cardView: false,
            detailView: false,
            showExport: true,
            exportDataType: "basic",
            columns: [{
                checkbox: true
            }, {
                field: 'name',
                title: '角色名称',
                sortable: true,
                width: 200,
                visible: true
            }, {
                field: 'role_code',
                title: '角色代码',
                width: 150,
                sortable: true
            }, {
                field: 'create_time',
                title: '创建时间',
                sortable: true,
                width: 150,
                formatter: function (value) {
                   return formatterDateYMDHMS(value);
                }
            }, {
                field: 'description',
                title: '描述',
                sortable: false
            }, {
                field: 'operation',
                title: '操作',
                width: 120,
                formatter: function (index, row, value) {
                    var editIcon = '<a class="edit ml15" href="javascript:void(0)" title="编辑"  >' +
                        '<i class="glyphicon glyphicon-edit"></i></a>';
                    var removeIcon = '<a class="remove ml15" href="javascript:void(0)" title="删除">' +
                        '<i class="glyphicon glyphicon-remove"></i></a>';
                    var menuIcon = '<a class="menuIcon ml15" href="javascript:void(0)" title="分配资源"  >' +
                        '<i class="glyphicon glyphicon-align-justify"></i></a>';
                    return [editIcon, removeIcon, menuIcon].join(" ");
                },
                events: {
                    'click .edit' : function(e, value, row) {
                        window.location.href = "/back/role/editRoleUi?id="+row.id;
                    },
                    'click .remove' : function(e, value, row) {
                        deleteRole(row.id);
                    },
                    'click .menuIcon' : function(e, value, row) {
                        window.location.href = "/back/role/roleRefMenuUi?id="+row.id;
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

function deleteRole(id) {
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
                            url: '/back/role/deletes',
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
    var searchName = $("#searchName").val();
    if (searchName && searchName.length>0) {
        params.searchName = searchName;
    }
    return params;
}

function refreshTable(){
    $('#tb_roleList').bootstrapTable('refresh');
}

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};
