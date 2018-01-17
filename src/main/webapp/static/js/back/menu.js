$(function () {
    // 根据url设定选中状态
    var url = location.href;
    if (url.indexOf("//")!=-1) {
        var url = url.split("//")[1];
        if (url.indexOf("/back/index") != -1) {
            $(".second_menu_li a")[0].click();
        }
        var begin = url.indexOf("/");
        var end = url.lastIndexOf("/")
        url = url.substring(begin, end)

    }
    $(".second_menu li").each(function () {
        $(this).click(function () {
            $(".second_menu li a").each(function () {
                $(this).removeClass("selected_menu");
            })
            $(this).find('a:eq(0)').addClass("selected_menu");
        })
        if ($(this).find('a:eq(0)').attr("href").indexOf(url) != -1) {
            $(this).find('a:eq(0)').addClass("selected_menu");
            // $(this).parent().css("height", "auto");
            // $(this).parent().addClass("in");
        }
    });
})