<%--
  Created by IntelliJ IDEA.
  User: 29488
  Date: 2018/1/6
  Time: 17:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>菜单管理</title>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <link rel="stylesheet" href="${ctx}/static/css/back/menu.css">
    <link rel="stylesheet" href="${ctx}/static/bootstrap/plugins/icon-picker/css/icon-picker.min.css">
    <script src="${ctx}/static/bootstrap/plugins/icon-picker/js/iconPicker.min.js" type="text/javascript" ></script>
    <script src="${ctx}/static/common/js/back/bootstrap-treegrid.js?v001" type="text/javascript" ></script>
    <script src="${ctx}/static/js/back/menu/menuList.js?001" type="text/javascript" ></script>

</head>
<body>
<div id="container">
    <jsp:include page="../head.jsp"/>
    <div id="main">
        <jsp:include page="/back/menu/mainMenu"/>
        <div id="content">
            <div class="content row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <form class="bs-example bs-example-form col-md-5" role="form"
                                  style="margin: 20px 0 10px 0;" id="form1" method="post">
                                <div class="input-group">
                                    <input type="text" class="form-control searchInput"
                                           placeholder="请输入名称" id="searchUser">
                                    <span class="input-group-addon btn" onclick="refreshTable()">搜索</span>
                                    <span class="input-group-addon btn" onclick="clearSearch()">重置</span>
                                </div>
                            </form>

                            <button class="btn btn-default" style="margin-top: 20px"
                                    onClick="menuModelShow()">
                                添加<sapn class="glyphicon glyphicon-plus ml5"/>
                            </button>
                        </div>
                    </div>
                    <table id="tb_menuList"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade modal_wrapper" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    添加菜单
                </h4>
            </div>
            <div class="modal-body">
                <form action="/back/menu/save" id="menuForm">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <div class="form-group">
                                <label class="control-label col-xs-3 text-right">上级菜单:</label>
                                <div class="col-xs-7">
                                    <input type="text" readonly class="form-control" id="parentName">
                                    <input type="hidden" id="pid" name="pid">
                                    <input type="hidden" id="id" name="id">
                                    <input type="hidden" id="menuLevel" name="menuLevel">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-3 text-right">菜单名称:</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control" name="name" id="name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-3 text-right">菜单路径:</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control" name="url" id="url">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-3 text-right">菜单图标:</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control icon-picker" name="icon" id="icon" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-3 text-right">菜单序号:</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control" name="sort" id="sort">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-3 text-right">默认展开:</label>
                                <div class="col-xs-7">
                                    <label class="ml15"><input type="radio" name="defaultOpen" value="1" >是</label>
                                    <label class="ml15"><input type="radio" name="defaultOpen" value="0" checked="checked">否</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="saveOrUpdateMenu()">保存</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</body>
</html>
