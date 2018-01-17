$(function () {
    $("html").niceScroll({
        oneaxismousemode: "false",
        scrollspeed: 30, // 滚动速度
        mousescrollstep: 20, // 鼠标滚轮的滚动速度 (像素)
        cursorwidth: "0px", //滚动条的宽度
    });
    $('#content').niceScroll({
        /*// cursorcolor: "red",//滚动条的颜色
        cursoropacitymax: 1, //滚动条的透明度，从0-1
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "1px", //滚动条的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径  圆角
        autohidemode: true, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条
        zindex:"auto",//给滚动条设置z-index值
        railpadding: { top:0, right:0, left:0, bottom:0 }//滚动条的位置*/
        oneaxismousemode: false,
        scrollspeed: 30, // 滚动速度
        mousescrollstep: 20, // 鼠标滚轮的滚动速度 (像素)
        cursorwidth: "0px", //滚动条的宽度
    });
    $('#content').getNiceScroll().show();
    $('#content').getNiceScroll().resize();

    $('#menu').niceScroll({
        /*// cursorcolor: "red",//滚动条的颜色
        cursoropacitymax: 1, //滚动条的透明度，从0-1
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "1px", //滚动条的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径  圆角
        autohidemode: true, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条
        zindex:"auto",//给滚动条设置z-index值
        railpadding: { top:0, right:0, left:0, bottom:0 }//滚动条的位置*/
        oneaxismousemode: false,
        scrollspeed: 30, // 滚动速度
        mousescrollstep: 20, // 鼠标滚轮的滚动速度 (像素)
        cursorwidth: "0px", //滚动条的宽度
    });
    $('#menu').getNiceScroll().show();
    $('#menu').getNiceScroll().resize();
})

