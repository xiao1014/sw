<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
    <title>角色资源管理</title>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <script src="${ctx}/static/js/back/role/roleList.js?001" type="text/javascript" ></script>
</head>
<body>
<div id="container">
    <jsp:include page="../head.jsp"/>
    <div id="main">
        <jsp:include page="/back/menu/mainMenu"/>
        <div id="content">
            <div class="content row">
                <div>
                    <c:forEach items="${menuList}" var="menu">
                        <c:if test="${empty menu.pid}">
                            <div style="background-color: #d1d1d1;">
                                <label><input type="checkbox" class="firstMenu">${menu.name}</div></label>
                            <div>
                                <c:forEach items="${menuList}" var="secondMenu">
                                    <c:if test="${menu.id eq secondMenu.pid}">
                                        <div style="width: 24%;display: inline-block;border: 1px grey;">
                                            <label style="font-size: 12px;"><input type="checkbox" class="secondMenu">${secondMenu.name}</label>
                                        </div>
                                    </c:if>
                                </c:forEach>
                            </div>
                        </c:if>
                    </c:forEach>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
