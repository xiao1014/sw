function formatterDateYMD(value) {
    if (value && value.length>1) {
        var date = new Date(value);
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
    } else {
        return "";
    }

}
function formatterDateYMDHMS(value) {
    if (value && value!=null) {
        var date = new Date(value);
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();
        h = date.getHours();
        i = date.getMinutes();
        s = date.getSeconds();
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' '
            + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
    } else {
        return "";
    }

}

/**
 * 初试时间设定
 * @returns {string}
 */
function getDefaultDate() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    m = m<10 ? ("0"+m):m;
    var d = date.getDate();
    d = d<10 ? ("0"+d):d;
    return y+"-"+m+"-"+d;
}
function getDefaultDateTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    m = m<10 ? ("0"+m):m;
    var d = date.getDate();
    d = d<10 ? ("0"+d):d;
    var h = date.getHours();
    h = h<10 ? ("0"+h):h;
    var minutes = date.getMinutes();
    minutes = minutes<10 ? ("0"+minutes):minutes;
    var s = date.getSeconds();
    s = s<10 ? ("0"+s):s;
    return y+"-"+m+"-"+d+" "+h+":"+minutes+":"+s;
}

function getCurrentDateTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    m = m<10 ? ("0"+m):m;
    var d = date.getDate();
    d = d<10 ? ("0"+d):d;
    var h = date.getHours();
    h = h<10 ? ("0"+h):h;
    var minutes = date.getMinutes();
    minutes = minutes<10 ? ("0"+minutes):minutes;
    var s = date.getSeconds();
    s = s<10 ? ("0"+s):s;
    return ""+y+m+d+h+minutes+s;
}

/**
 * 初始化日志时间
 */
function setDefaultDateTime() {
    $("input[name$='Time']").each(function () {
        if ($(this).val()=="") {
            $(this).val(getDefaultDateTime());
            console.info()
        }
    })
}