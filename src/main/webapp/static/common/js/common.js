function getDialogManager(){
    var dialogManage = "";
    var pageLevel="parent.";
    while(!dialogManage){
        dialogManage = eval(pageLevel+"dialogManager");
        pageLevel=pageLevel+"parent.";
    }
    return dialogManage;
}
//统一弹出窗口对话框样式ui-widget-warning
function warnStyle(html){
    return '<div class="ui-widget-warning ui-alert-warning">'+html+'</div>';
}

//统一弹出窗口对话框样式ui-widget-success
function successStyle(html){
    return '<div class="ui-widget-success ui-alert-success">'+html+'</div>';
}

//统一弹出窗口对话框样式info
function infoStyle(html){
    return '<div class="ui-widget-info ui-alert-info">'+html+'</div>';
}

//统一弹出窗口对话框样式danger
function dangerStyle(html){
    return '<div class="ui-widget-danger ui-alert-danger">'+html+'</div>';
}

function hideWord(obj){
    var type = getBrowserType();
    if(!obj){
        obj = jQuery('object[codebase="ofctnewclsid.cab#version=5,0,2,8"]')[0];
    }
    if(!jQuery(obj).is(":hidden") || (jQuery(obj).attr('width') && jQuery(obj).attr('width') != '0')){
        if(type=="IE"){
            jQuery(obj).hide();
        }else{
            var old_width = jQuery(obj).attr("width");
            var old_height = jQuery(obj).attr("height");
            jQuery(obj).attr("oldWidth",old_width);
            jQuery(obj).attr("oldheight",old_height);
            jQuery(obj).attr("width","0");
            jQuery(obj).attr("height","0");
        }
    }

}

function showWord(obj){
    var type = getBrowserType();
    if(!obj){
        obj = jQuery('object[codebase="ofctnewclsid.cab#version=5,0,2,8"]')[0];
    }
    if(type=="IE"){
        jQuery(obj).show();
    }else{
        var old_width = jQuery(obj).attr("oldWidth");
        var old_height = jQuery(obj).attr("oldheight");
        jQuery(obj).attr("width",old_width);
        jQuery(obj).attr("height",old_height);
    }
}

function getTableSelection(tableId,multiSelect){
    var selectArr = jQuery('#'+tableId).bootstrapTable('getSelections');
    if(selectArr.length ==0){
        parent.dialogManager.alert({html:warnStyle('请至少选择其中一项记录！')});
        return ;
    }
    else{
        if(multiSelect){
            return selectArr;
        }
        else if(selectArr.length>1){
            parent.dialogManager.alert({html:warnStyle('只能选择其中的一项记录！')});
            return ;
        }
    }
    return selectArr;
}

function registUnLoadEvent(msg){
    window.onbeforeunload = function(e){
        var evt = e ? e : (window.event ? window.event : null);
        if(closeFlag){
            return;
        }
        else{
            evt.returnValue = msg;
        }
    }
}
window.onresize = function(){
    countHeightWidth();
}

//文档加载时执行
var inited=false;
jQuery(function(){
    countHeightWidth();
    inited=true;
    var treeTitle = jQuery(".treeMenu-tit");
    if (!treeTitle){
        help();
    }else{
        jQuery(treeTitle).find(".platform-zuojt1").remove();
        leftTreeMenuAddHtml()
        help();
    }
});
function help(){
    jQuery('#help').addClass('buttons mt3 r')
        .html('<button class="p-btn p-btn-info"  onclick="helpButton();"><i class="platform platform-wenh68 r pr10 cp" title="帮助文档"></i></button>');
}
function helpButton() {
    var uri = encodeURI(window.location.href);
    var title=encodeURI(jQuery("title").html());
    openWindow("/sysadmin/help/help?uri="+uri+"&title="+title);
}

//在左侧带有树形菜单的元素内增加HTML节点
function leftTreeMenuAddHtml() {
    //增加隐藏按钮
    var hideLeftTree_html = '<div class="layout-leftBar control-left"><div class="product-navbar-collapse-inner"><div class="product-navbar-collapse-bg"></div><div class="product-navbar-collapse"><span class="platform platform-diyy114 left"></span></div></div></div>';
    if (!jQuery('#main_left_area').hasClass('no-hide')){
        jQuery("#main_left_area").append(hideLeftTree_html);
    }

    //关闭按钮绑定关闭事件
    jQuery(".control-left").bind('click',function(){
        hideLeftTree('.control-left','#main_left_area','.control-right');
    });

    //增加显示按钮
    var showLeftTree_html = '<div class="layout-leftBar control-right"><div class="product-navbar-collapse-inner"><div class="product-navbar-collapse-bg"></div><div class="product-navbar-collapse"><span class="right platform platform-zuihyy115"></span></div></div></div>';
    jQuery(".iframe-inner-bd").append(showLeftTree_html);

    //显示按钮绑定显示事件
    jQuery(".control-right").bind('click',function(){
        showLeftTree('.control-left','#main_left_area','.control-right');
    });

}

//关闭函数
function hideLeftTree(eleFrom,eleAim,showLeftBtn){
    jQuery(eleAim).animate({width:"toggle",opacity:"toggle"},600,function(){
        countHeightWidth();
        jQuery(showLeftBtn).show();
    })
}
//显示函数
function showLeftTree(showFrom,showAim,hideLeftBtn){
    jQuery(hideLeftBtn).hide();
    jQuery(showAim).animate({width:"toggle",opacity:"toggle"},600);
    countHeightWidth();
}

function countHeightWidth(){
    var docHeight = document.documentElement.clientHeight;
    var docWidth = document.documentElement.clientWidth;
    //table高度计算
    var searchHeight=$(".ibox-search").height();
    var iboxtitleHeight=$(".ibox-title").height();
    var bsTableHeight = docHeight-searchHeight-iboxtitleHeight-40;
    jQuery('.countHeightForTable').each(function(index,elem){
        bsTableHeight = bsTableHeight - elem.clientHeight;
    });
    bsTableHeight-=10;
    var tableContainerWidth = docWidth;
    jQuery('.countWidthForTable').each(function(index,elem){
        if(jQuery(elem).children().length==0){
            return;
        }
        tableContainerWidth-=elem.clientWidth;
    });
    jQuery('#main_right_table').width(tableContainerWidth-40);//页面两侧保持20px的空白
    //jQuery('.treeMenu').parent('#main_left_area').siblings('.iframe-inner-r').children('#main_right_table').width(tableContainerWidth-20);//有树时空白为5
    jQuery('.treeMenu').parent('#main_left_area').siblings('.iframe-inner-r').css("margin","0 5px");
    //jQuery('.main_right').width(tableContainerWidth-10);
    jQuery('.main_right').width(tableContainerWidth-40);//页面两侧保持20px的空白
    window.bsTableHeight = bsTableHeight;
    jQuery(".main_right").height(bsTableHeight);
    jQuery(".container-iframe").height(bsTableHeight+40);
    if(window.bsTableId){
        jQuery('#'+window.bsTableId).bootstrapTable('resetView',{height : bsTableHeight});
    }
    if (inited&&window.easyuiTreeGridId){
        jQuery('#'+window.easyuiTreeGridId).treegrid('resize',{height:bsTableHeight-10});
    }
    var leftHeight = docHeight;
    jQuery('.countHeightForLeft').each(function(index,elem){
        leftHeight -= elem.clientHeight;
    });
    if (jQuery('#main_left_area_scroll').length > 0){
        jQuery('#main_left_area_scroll').height(leftHeight);
        jQuery('#main_left_area_scroll').mCustomScrollbar({
            autoHideScrollbar: true
        });
    }
    if(jQuery('#openWindowScroll').size()>0){
        var scrollHeight = docHeight;
        jQuery('.countForHeight').each(function(index,elem){
            scrollHeight-=elem.clientHeight;
        });
        jQuery('#openWindowScroll').height(scrollHeight);
        jQuery('#openWindowScroll').mCustomScrollbar({
            autoHideScrollbar: true
        });
    }
    jQuery(document).trigger('afterResize');
}
function refreshBsTable(){
    if(window.bsTableId){
        jQuery('#'+window.bsTableId).bootstrapTable('refresh');
    }
    if(window.easyuiTreeGridId){
        jQuery('#'+window.easyuiTreeGridId).treegrid('reload');
    }
}

var selectedDataIndex = new Array();
function initBsTableSelect(){
    jQuery('#'+window.bsTableId).find('tbody').selectable({
        distance: 35,
        filter:'tr',
        selected: function( e, ui ) {
            if(jQuery(ui.selected).find('[name="btSelectItem"]').size()==1){
                var index = jQuery(ui.selected).find('[name="btSelectItem"]').attr('data-index');
                selectedDataIndex[selectedDataIndex.length]=index;
                //jQuery('#table1').bootstrapTable('check',index);
            }
        },
        stop:function(e,ui){
            var data = jQuery('#'+window.bsTableId).bootstrapTable('getData');
            for(var i=0;i<data.length;i++){
                var selectFlag = false;
                for(var j=0;j<selectedDataIndex.length;j++){
                    if(i ==selectedDataIndex[j]){
                        selectFlag = true;
                        break;
                    }
                }
                if(selectFlag){
                    jQuery('#'+window.bsTableId).bootstrapTable('check',i);
                }
                else{
                    jQuery('#'+window.bsTableId).bootstrapTable('uncheck',i);
                }
            }
            selectedDataIndex.length=0;
        }
    });
}
/* initSelectOption Start */
function selsize(ele){

    ele.hide();
    ele.next(".c-selbox").remove();
    //生成结构
    ele.after("<div class='c-selbox default'><span class='c-seltxt'></span><span class='icon platform platform-xiajt9'></span></div>");
    var sbox = ele.next(".c-selbox");
    var sChild = "";
    ele.find("option").each(function(index){
        var txt = jQuery(this).text();
        var on = "";
        if(index == 0){
            sbox.children(".c-seltxt").text(txt);
        }
        if(jQuery(this).attr('selected')){
            sbox.children(".c-seltxt").text(txt);
        }
        sChild += "<li>"+ txt +"</li>";
    });
    var listShow = false;


    var pl = sbox.offset().left;
    var pt = sbox.offset().top + sbox.outerHeight()-1;
    var dName = parseInt(pl) + "*" + parseInt(pt);

    jQuery("body").append("<ul class='sel-ulb' data-name='" + dName + "'>" + sChild + "</ul>");

    // 下拉框固定样式
    var listdown = jQuery("body").children("ul.sel-ulb[data-name='"+dName+"']");
    listdown.css({
        "width": sbox.outerWidth(),
        "left": pl,
        "top": pt
    });

    function relock(){

        var x = sbox.offset().left;
        var y = sbox.offset().top + sbox.outerHeight()-1;
        var wb = jQuery(window).height() + jQuery("body").scrollTop() - y;
        if(wb<listdown.outerHeight()){
            y = sbox.offset().top - listdown.outerHeight() + 1;
        }
        listdown.css({
            "left": x,
            "top": y
        });
    }





    listdown.find("li").each(function(index){
        if(jQuery(this).text() == sbox.children(".c-seltxt").text()){
            listdown.find("li").removeClass("on");
            jQuery(this).addClass("on");
        }

        jQuery(this).click(function(e){
            e.stopPropagation();
            ele.val(ele.find("option").eq(index).val());
            ele.trigger("change");
            sbox.children(".c-seltxt").text(ele.find("option").eq(index).text());
            listdown.find("li").removeClass("on");
            jQuery(this).addClass("on");
            sbox.removeClass("see");
            listdown.removeClass("see");
            listShow = false;

        })
    });


    sbox.on("click",function(e){

        if(jQuery(this).hasClass("see")){
            var showmid = true;
        }

        e.stopPropagation();
        jQuery("body").find(".c-selbox").removeClass("see");
        jQuery("body").children("ul.sel-ulb").removeClass("see");
        listShow = false;
        listShow = showmid ? true : false;


        if(!listShow){
            sbox.addClass("see");
            relock();
            listdown.addClass("see");
            listShow = true;

        }else{

            sbox.removeClass("see");
            listdown.removeClass("see");
            listShow = false;
        }

    });



    // 点击其他区域消失
    jQuery("body").on("click",function(e){
        if(listShow){
            sbox.removeClass("see");
            listdown.removeClass("see");
            listShow = false;
        }

    });




}
/* initSelectOption End */


/**
 * 当选择多行是对按钮的控制liucb
 */
function changeButtonByRows(){
    var selected = jQuery('.customTable').bootstrapTable('getSelections');

    if (selected.length>1){
        jQuery('.checkboxAble').attr('disabled','disabled');
    }else{
        jQuery('.checkboxAble').removeAttr('disabled');
    }
}

/* 民族选择 */
(function (jQuery) {
    jQuery.fn.extend({
        "nation": function (selectedVal) {
            if(!selectedVal){
                selectedVal = jQuery(this).attr('selectedVal');
            }
            var nationArray = [
                "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
                "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
                "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
                "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
            ];
            for( var u=0; u<nationArray.length; u++){
                var optionTxt = nationArray[u];
                var selected = '';
                if(selectedVal===optionTxt){
                    selected = " selected";
                }
                var optionEle = "<option value='"+optionTxt+"' "+selected+">"+optionTxt+"</option>";
                jQuery(this).append(optionEle);
            }
        }
    });
})(jQuery);


//页面中带有搜索框的控制JS
jQuery(function(){
    jQuery(".topSearchClick").click(function(){
        jQuery(".topSearch").toggle('slow');
    })
})

/*textarea 自适应*/
function onpropertychangeMethod(obj) {
    obj.style.height=obj.scrollHeight + 'px';
}

function oninputMethod(obj) {
    obj.style.height='0px';
    obj.style.height=obj.scrollHeight + 'px';
}
/*textarea 自适应 end*/

/*控制滚动条滚动速度*/
$(function(){
    /*alert(1);
    $(".content").mCustomScrollbar({
        mouseWheelPixels:120,
        scrollButtons:{
            scrollType:'continuous',
            enable:true,
            scrollAmount:40
        },
        theme:"3d-thick"
    });*/
});

