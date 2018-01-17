<%--
  Created by IntelliJ IDEA.
  User: 29488
  Date: 2018/1/6
  Time: 17:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" href="/static/common/css/back-menu.css"/>
<script src="${ctx}/static/common/js/back/menu.js" type="text/javascript" ></script>
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
        <li>
            <a href="#systemSetting" class="nav-header collapsed" data-toggle="collapse">
                <i class="glyphicon glyphicon-cog"></i>
                系统管理
                <span class="pull-right glyphicon glyphicon-chevron-down"></span>
            </a>
            <ul id="systemSetting" class="nav nav-list collapse second_menu" style="height: 0px;">
                <li id="activeLi"><a href="${ctx}/back/user/userListUi"><i class="glyphicon glyphicon-user"></i>用户管理</a></li>
                <li><a href="${ctx}/back/menu/menuListUi"><i class="glyphicon glyphicon-th-list"></i>菜单管理</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>角色管理</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-edit"></i>修改密码</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-eye-open"></i>日志查看</a></li>
            </ul>
        </li>
        <li>
            <a href="#systemSetting2" class="nav-header collapsed" data-toggle="collapse">
                <i class="glyphicon glyphicon-cog"></i>
                系统管理2
                <span class="pull-right glyphicon glyphicon-chevron-down"></span>
            </a>
            <ul id="systemSetting2" class="nav nav-list collapse second_menu" style="height: 0px;">
                <li class="active"><a href="#"><i class="glyphicon glyphicon-user"></i>用户管理2</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>菜单管理2</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>角色管理2</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-edit"></i>修改密码2</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-eye-open"></i>日志查看2</a></li>
            </ul>
        </li>
        <li>
            <a href="#systemSetting3" class="nav-header collapsed" data-toggle="collapse">
                <i class="glyphicon glyphicon-cog"></i>
                系统管理2
                <span class="pull-right glyphicon glyphicon-chevron-down"></span>
            </a>
            <ul id="systemSetting3" class="nav nav-list collapse second_menu" style="height: 0px;">
                <li class="active"><a href="#"><i class="glyphicon glyphicon-user"></i>用户管理32</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>菜单管理23</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>角色管理32</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-edit"></i>修改密码23</a></li>
                <li><a href="#"><i class="glyphicon glyphicon-eye-open"></i>日志查看23</a></li>
            </ul>
        </li>
        <li>
            <a href="#">
                <i class="glyphicon glyphicon-globe"></i>
                分发配置
                <span class="label label-warning pull-right">5</span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="glyphicon glyphicon-calendar"></i>
                图表统计
            </a>
        </li>
        <li>
            <a href="#">
                <i class="glyphicon glyphicon-fire"></i>
                关于系统
            </a>
        </li>
    </ul>
    <ul style="height: 50px;">
    </ul>
</div>
