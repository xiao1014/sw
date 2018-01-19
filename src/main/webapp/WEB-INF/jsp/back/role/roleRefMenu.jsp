<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
    <link rel="stylesheet" href="${basePath}/static/css/back/roleRefMenu.css">
    <script src="${ctx}/static/js/back/role/roleList.js?001" type="text/javascript" ></script>
    <script src="${ctx}/static/js/back/role/roleRefMenu.js?001" type="text/javascript" ></script>
</head>
<body>
<div id="container">
    <jsp:include page="../head.jsp"/>
    <div id="main">
        <jsp:include page="/back/menu/mainMenu"/>
        <div id="content">
            <div class="content row">
                <input type="hidden" id="roleId" value="${roleId}">
                <div>
                    <c:forEach items="${menuList}" var="menu">
                        <c:if test="${empty menu.pid}">
                            <div class="menuTitle firstMenuTitle" style="background-color: #d1d1d1;border: 1px solid #e8e8e8;">
                                <label><input type="checkbox" class="${menu.id}"
                                            <c:if test="${fn:contains(myMenuList, menu.id)}">checked</c:if>
                                              value="${menu.id}"/>${menu.name}</label>
                                <span class="pull-right"
                                      onclick="hideById('secondMenu${menu.id}')"></span>
                            </div>
                            <div>
                                <table id="secondMenu${menu.id}" class="secondMenuTable" style="width: 100%;">
                                    <tbody>
                                    <tr>
                                        <c:forEach items="${menuList}" var="secondMenu">
                                            <c:if test="${menu.id eq secondMenu.pid}">
                                                <td>
                                                    <div>
                                                        <div class="menuTitle secondMenuTitle">
                                                            <label style="font-size: 12px;">
                                                                <input type="checkbox" class="${menu.id} ${secondMenu.id}"
                                                                       <c:if test="${fn:contains(myMenuList, secondMenu.id)}">checked</c:if>
                                                                       value="${secondMenu.id}">${secondMenu.name}
                                                            </label>
                                                            <span class="pull-right"
                                                                  onclick="hideById('thirdMenu${secondMenu.id}')"></span>
                                                        </div>
                                                        <div id="thirdMenu${secondMenu.id}">
                                                            <ul>
                                                                <c:forEach items="${menuList}" var="thirdMenu">
                                                                    <c:if test="${secondMenu.id eq thirdMenu.pid}">
                                                                        <li class="menuTitle">
                                                                            <label style="font-size: 12px;">
                                                                                <input type="checkbox" value="${thirdMenu.id}"
                                                                                       <c:if test="${fn:contains(myMenuList, thirdMenu.id)}">checked</c:if>
                                                                                       class="${menu.id} ${secondMenu.id} ${thirdMenu.id}">${thirdMenu.name}
                                                                            </label>
                                                                        </li>
                                                                    </c:if>
                                                                </c:forEach>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </c:if>
                                        </c:forEach>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <%--<div id="secondMenu${menu.id}" class="collapse in" style="padding-top: 10px;">

                            </div>--%>
                        </c:if>
                    </c:forEach>
                </div>
                <div>
                    <div class="col-md-11"></div>
                    <span class="btn btn-default col-md-1" onclick="saveOrUpdateRole()">提交</span>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
