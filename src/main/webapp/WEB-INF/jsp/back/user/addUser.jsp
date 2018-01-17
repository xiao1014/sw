<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>用户管理</title>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <script src="${ctx}/static/js/back/user/addUser.js?001" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="container">
    <jsp:include page="../head.jsp"/>
    <div id="main">
        <jsp:include page="/back/menu/mainMenu"/>
        <div id="content">
            <div class="content row">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 50px;"><font style="font-size: 24px">添加用户</font></div>
                    <div class="row" style="margin-top: 20px;min-height: 400px;">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <form id="userForm" action="/back/user/save" method="post">
                                <div class="row">
                                    <label class="control-label col-xs-2 text-align-right">姓名:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="text" name="username"  value="姓名cs"
                                               placeholder="姓名,必填" class="form-control">
                                    </div>
                                    <label class="control-label col-xs-2 text-align-right">账号:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="text" name="accountName" value="adminTest" placeholder="账号" class="form-control">
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="control-label col-xs-2 text-align-right">密码:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="password" id="password" name="password"  value="123123" placeholder="必填" class="form-control">
                                    </div>
                                    <label class="control-label col-xs-2 text-align-right">确认密码:</label>
                                    <div class="form-group col-xs-4">
                                        <input type="password" name="repPassword" value="123123" placeholder="必填" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group row" style="margin: 0 auto 0 auto;">
                                    <div class="col-md-11"></div>
                                    <span class="btn btn-default col-md-1" onclick="saveUser()">提交</span>
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
