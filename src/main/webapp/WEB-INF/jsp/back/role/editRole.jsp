<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>角色管理</title>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <script src="${ctx}/static/js/back/role/editRole.js?001" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="container">
    <jsp:include page="../head.jsp"/>
    <div id="main">
        <jsp:include page="/back/menu/mainMenu"/>
        <div id="content">
            <div class="content row">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 50px;"><font style="font-size: 24px">编辑角色</font></div>
                    <div class="row" style="margin-top: 20px;min-height: 400px;">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <form id="roleEditForm" method="post">
                                <input type="hidden" name="id" value="${role.id}">
                                <div class="row">
                                    <label class="control-label col-xs-2 text-align-right">角色名称:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="text" name="name" value="${role.name}"
                                               placeholder="角色名称，必填" class="form-control">
                                    </div>
                                    <label class="control-label col-xs-2 text-align-right">角色代码:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="text" name="roleCode" value="${role.roleCode}"
                                               placeholder="角色代码，必填" class="form-control">
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="control-label col-xs-2 text-align-right">排序:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="text" name="sort" value="${role.sort}"
                                               placeholder="排序" class="form-control">
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="control-label col-xs-2 text-align-right">角色描述:</label>
                                    <div class="form-group col-xs-10">
                                        <textarea name="description"
                                                  style="width: 100%;max-width: 100%;max-lines: 5;max-height: 200px;"
                                                  placeholder="角色描述" class="form-control">${role.description}</textarea>
                                    </div>
                                </div>

                                <div class="form-group row" style="margin: 0 auto 0 auto;">
                                    <div class="col-md-11"></div>
                                    <span class="btn btn-default col-md-1" onclick="editRole()">提交</span>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
