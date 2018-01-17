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
    <title>Title</title>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <script src="${ctx}/static/js/back/user/userList.js?001" type="text/javascript" ></script>
</head>
<body>
<div id="container">
    <jsp:include page="head.jsp"/>
    <div id="main">
        <jsp:include page="menu.jsp"/>
        <div id="content">
            <div class="row">
                <div class="col-md-5"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
