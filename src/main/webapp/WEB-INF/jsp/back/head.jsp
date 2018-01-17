<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" href="/static/common/css/back-head.css"/>
<div id="head" class="head-div" style="vertical-align: middle;">
    <div class="col-md-10"></div>
    <div class="col-md-2">
        <div style="margin-top: 10px;">
            <span class="col-md-2"></span>
            <span class="btn col-md-2" onclick="sysReload()"><sapn class="glyphicon glyphicon-refresh mr5"/></span>
            <span class="btn col-md-2" onclick="sysGoBack()"><sapn class="glyphicon glyphicon-arrow-left mr5"/></span>
            <span class="btn col-md-2" onclick="sysGoFront()"><sapn class="glyphicon glyphicon-arrow-right mr5"/></span>
            <span class="col-md-2"></span>
            <span class="btn col-md-2" onclick="logout()"><sapn class="glyphicon glyphicon-off"/></span>
        </div>
    </div>
</div>
<script>
    function sysGoBack() {
        window.history.go(-1);
    }

    function sysReload() {
        window.location.reload();
    }

    function sysGoFront() {
        window.history.go(1);
    }
    
    function logout() {
        window.location.href = "/back/logout";
    }
</script>