<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="${ctx}/static/common/base.jsp"/>
    <title>后台主页</title>
</head>
<body>
<div id="container">
    <jsp:include page="head.jsp"/>
    <div id="main">
        <jsp:include page="/back/menu/mainMenu"/>
        <div id="content"></div>
    </div>
</div>
</body>
</html>