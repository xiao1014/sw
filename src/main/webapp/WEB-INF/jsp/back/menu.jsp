<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" href="/static/common/css/back-menu.css"/>
<script src="${ctx}/static/js/back/menu.js" type="text/javascript" ></script>
<script>
    var basePath = "${pageContext.request.scheme}://${pageContext.request.serverName}:"+
        "${pageContext.request.serverPort}${pageContext.request.contextPath}";
</script>
<div id="menu">
    <ul id="main-nav" class="nav nav-list nav-stacked" style="">
        <li class="active">
            <a href="#">
                <i class="glyphicon glyphicon-th-large"></i>
                首页
            </a>
        </li>
        <c:forEach items="${menuList}" var="menu">
            <c:if test="${empty menu.pid}">
                <li>
                    <a href="#${menu.id}" data-sys-menu-url="${menu.url}"
                       class="firstMenu nav-header collapsed" data-toggle="collapse">
                        <i class="${menu.icon}"></i>
                        ${menu.name}
                        <span class="pull-right"></span>
                    </a>
                    <ul id="${menu.id}" class="nav nav-list collapse second_menu <c:if test='${menu.defaultOpen eq 1}'>in</c:if> "
                        <c:if test="${menu.defaultOpen eq 1}">style="height: auto;"</c:if> >
                        <c:forEach items="${menuList}" var="secondMenu">
                            <c:if test="${not empty secondMenu.pid && secondMenu.pid == menu.id }">
                                <li class="second_menu_li"><a href="${secondMenu.url}"><i class="${secondMenu.icon}"></i>${secondMenu.name}</a></li>
                            </c:if>
                        </c:forEach>
                    </ul>
                </li>
            </c:if>
        </c:forEach>
    </ul>
    <ul style="height: 50px;">
    </ul>
</div>
