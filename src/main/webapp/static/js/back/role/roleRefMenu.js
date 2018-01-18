/*input checkbox 测class不能随意改变！！！*/
$(function () {
    $(".firstMenuTitle").each(function () {
        if ($(this).next().find("td").length>0) {
            $(this).find("span").eq(0).addClass("glyphicon glyphicon-chevron-down");
        }
    })

    $(".secondMenuTitle").each(function () {
        if ($(this).next().find("li").length>0) {
            $(this).find("span").eq(0).addClass("glyphicon glyphicon-chevron-down");
        }
    })

    $("input[type=checkbox]").each(function () {
        $(this).click(function () {
            var checked = $(this).prop("checked");
            var val = $(this).val();
            var className = $(this).prop("class");
            $("input[type=checkbox]").each(function () {
                // 全选子菜单
                if ($(this).attr("class").indexOf(val) != -1) {
                    $(this).prop("checked", checked);
                }
                // 选中上级菜单
                if (checked && className!=$(this).prop("class") &&　className.indexOf($(this).prop("class")) != -1) {
                    $(this).prop("checked", checked);
                }
            })
        })
    })
})

function hideById(id) {
    $("#"+id).toggle();
}

function saveOrUpdateRole() {
    var menuIds = "";
    $("input[type=checkbox]").each(function () {
        if ($(this).prop("checked")) {
            menuIds += $(this).val()+",";
        }
    })
    console.info(menuIds)
}