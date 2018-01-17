<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="basePath" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/" />
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%--<base href="${basePath}" />--%>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


<script src="/static/jquery/jquery-1.12.4.js"></script>

<script src="/static/bootstrap/js/bootstrap.js"></script>
<link rel="stylesheet" href="${basePath}/static/bootstrap/css/bootstrap.css">
<script src="${basePath}/static/bootstrap/js/bootstrap-dialog.min.js"></script>
<link rel="stylesheet" href="${basePath}/static/bootstrap/content/bootstrap-dialog/css/bootstrap-dialog.css">
<script src="${basePath}/static/bootstrap/content/bootstrap-dialog/js/bootstrap-dialog.js"></script>

<%--bootstrap table组件以及中文包的引用--%>
<script src="${basePath}/static/bootstrap/content/bootstrap-table/bootstrap-table.js"></script>
<link href="${basePath}/static/bootstrap/content/bootstrap-table/bootstrap-table.css" rel="stylesheet" />
<script src="${basePath}/static/bootstrap/content/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
<script src="${basePath}/static/bootstrap/content/bootstrap-table/extensions/export/bootstrap-table-export.js"></script>
<script src="${basePath}/static/bootstrap/content/bootstrap-table/extensions/export/tableExport.js"></script>
<script src="${basePath}/static/bootstrap/content/bootstrap-table/extensions/toolbar/bootstrap-table-toolbar.js"></script>

<%--ValidatorValidator--%>
<%--<script src="${ctx}/static/bootstrap/content/bootstrapValidator/js/bootstrapValidator.js"></script>
<script src="${ctx}/static/bootstrap/content/bootstrapValidator/css/bootstrapValidator.css"></script>
<script src="${ctx}/static/bootstrap/content/bootstrapValidator/language/zh_CN.js"></script>--%>
<script src="${basePath}/static/jquery/jquery.validate.min.js"></script>
<script src="${basePath}/static/jquery/jquery.validate.messages.zh-CN.js"></script>
<%--<script src="${basePath}/static/common/js/validate.js"></script>--%>

<%--<script src="${basePath}/static/lib/jqueryui/dialog.js"></script>--%>



<%--<script src="${basePath}/static/common/js/common.js"></script>--%>
<script src="${basePath}/static/common/js/dialog.js"></script>
<script src="${basePath}/static/common/js/search.js"></script>
<script src="${basePath}/static/common/js/nice-scroll.js"></script>
<script src="${basePath}/static/common/js/base.js"></script>
<script src="${basePath}/static/common/js/date.formatter.js"></script>
<link href="${basePath}/static/common/css/back/base.css?v001" rel="stylesheet"/>
