<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
    <title>sw</title>
    <link href="${ctx}/static/bootstrap/css/bootstrap.css" rel="stylesheet"/>
    <script type="text/javascript" src="/static/jquery/jquery-1.12.4.js"></script>
    <script src="/static/common/js/login/login.js"></script>
    <style>
        body {
            background: url("${ctx}/static/body.jpg") center center no-repeat fixed;
            background-size: 100%;
            width: 100%;
            height: auto;
            padding-bottom: 60px;
        }
        .index-head{height: 100px;background-color: white;}
        .index-main{margin: 20px auto 10px auto;}
        .index-foot{position:fixed; left:0px; bottom:0px; width:100%; height:60px; background-color:white; z-index:9999;}
        .login-div{background-color: white;}
        .login-div-form{margin: 10px auto 20px auto;}
        .submit-btn{width: 100%;}
        .rememberMe{font-size: 12px;}
        .login-error{color: red;}
    </style>
</head>
<body>
<div class="index-head"></div>
<div class="row index-main">
    <div class="col-md-8"></div>
    <div class="col-md-3 login-div">
        <div class="col-md-1"></div>
        <div class="col-md-10 login-div-form">
            <!-- BEGIN LOGIN FORM -->
            <form id="login-form" class="login-form" action="${ctx}/back/login" method="post">
                <%--管理端登录标识 --%>
                <input type="hidden" name="source" value="A" />
                <h3 class="form-title" style="color: #666666">系统登录</h3>
                    <div><c:if test="${not empty loginMsg}"><font class="login-error">${loginMsg}</font></c:if></div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <div class="input-icon">
                        <i class="fa fa-user"></i> <input class="form-control placeholder-no-fix" type="text" autocomplete="off"
                                                          placeholder="登录账号" name="accountName" value="${auth_username_value}" required="true" data-msg-required="请填写登录账号" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-icon">
                        <i class="fa fa-lock"></i><input class="form-control placeholder-no-fix" type="password" autocomplete="off"
                                                          placeholder="登录密码" name="password" required="true" data-msg-required="请填写登录密码" />
                    </div>
                    <label class="rememberMe pull-left"><input type="checkbox" name="rememberMe" checked="true" value="true" />记住我，下次自动登录</label>
                </div>
                <c:if test="${auth_captcha_required!=null}">
                    <div class="form-group">
                        <label class="control-label visible-ie8 visible-ie9">验证码</label>
                        <div class="input-group">
                            <div class="input-icon">
                                <i class="fa fa-qrcode"></i> <input class="form-control captcha-text" type="text" autocomplete="off"
                                                                    placeholder="验证码...看不清可点击图片可刷新" name="captcha" required="true" data-msg-required="请填写验证码" />
                            </div>
                            <span class="input-group-btn" style="cursor: pointer;"> <img alt="验证码" class="captcha-img"
                                                                                         src="${ctx}/assets/img/captcha_placeholder.jpg" title="看不清？点击刷新" />
							</span>
                        </div>
                    </div>
                </c:if>
                <c:if test="${error!=null}">
                    <div align='center' class='alert alert-danger'>${error}</div>
                </c:if>
                <div class="form-group">
                    <button type="submit" class="submit-btn btn blue">
                        登录 <i class="m-icon-swapright m-icon-white"></i>
                    </button>
                </div>
                <div class="form-group">
                    <a class="pull-right">忘记密码</a>
                </div>
                <%--<div class="form-group">
                    <div class="row">
                        <div class="col-md-3">
                            <c:if test="${casSupport}">
                                <p>
                                    <a href='<s:property value="casRedirectUrl"/>'>单点登录</a>
                                </p>
                            </c:if>
                        </div>
                        <div class="col-md-9">
                            <p class="pull-right">
                                忘记密码? <a href="${ctx}/admin/password/forget" data-toggle="modal-ajaxify" title="找回密码" data-modal-size="550px">找回密码</a>
                                <c:if test="${mgmtSignupEnabled}">
                                    &nbsp; &nbsp;&nbsp; &nbsp; 没有账号? <a href="${ctx}/admin/signup"
                                                                        data-toggle="modal-ajaxify" title="自助注册">自助注册</a>
                                </c:if>
                            </p>
                        </div>
                    </div>
                </div>--%>
            </form>
            <!-- END LOGIN FORM -->
        </div>
        <div class="col-md-1"></div>
    </div>
    <div class="col-md-1"></div>
</div>
<div class="index-foot"></div>
</body>
</html>