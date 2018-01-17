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
    <title>用户管理</title>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <script src="${ctx}/static/js/back/user/userList.js?001" type="text/javascript" ></script>
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
                                           placeholder="请输入姓名" id="searchUser">
                                    <span class="input-group-addon btn" onclick="refreshTable()">搜索</span>
                                    <span class="input-group-addon btn" onclick="clearSearch()">重置</span>
                                </div>
                            </form>
                            <button class="btn btn-default" style="margin-top: 20px"
                                    onClick="location.href='/back/user/addUserUi'">
                                添加<sapn class="glyphicon glyphicon-plus ml5"/>
                            </button>

                            <%--<button class="btn btn-default col-md-1 btn-primary" style="margin-top: 20px"
                                    onClick="testDialog()">Button</button>--%>
                        </div>
                    </div>
                    <table id="tb_userList"></table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
