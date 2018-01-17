(function ($) {
    $.fn.extend({
        "validate": function () {
            this.find('[datatype]').each(function(index,elem){
                $(elem).attr('validateid','validate_'+index);
                $(elem).on('blur change propertychange input',function(){
                /*$(elem).on('blur',function(){*/
                    $('.bubble').remove();
                    if($(elem).attr("class").indexOf("form-control-noline") != -1) {
                        $(elem).css('border','0');
                    }
                    var validateResult = validateElement(elem);
                    if(validateResult){
                        showErrMsg(this,validateResult);
                        //$(this).focus();
                    }
                });
            });
            return this;
        },
        "valid":function(){
            $formContentObj = this;
            var allValidateResult = new Array();
            $formContentObj.find('[datatype]').each(function(index,elem){
                var validateResult = validateElement(elem);
                if(validateResult){
                    allValidateResult[allValidateResult.length] = validateResult;
                }
            });
            if(allValidateResult.length>0){
                var errMsg = '';
                for(var i=0;i<allValidateResult.length;i++){
                    errMsg = errMsg + '\n'+allValidateResult[i];
                }
                //dialogManager.tip(errMsg,1500);
                // dialogManager.tip('表单项填写不正确',1500);
                return false;
            }
            return true;
        },
        addRules:function(rules){
            Validator = $.extend({}, rules, Validator);
        },
        showError:function (elem,msg) {
            showErrMsg(elem,msg);
        }
    });
    var Validator = {
        required : /.+/,
        email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
        mobile : /^((\(\d{2,3}\))|(\d{3}\-))?(13)|(14)|(15)|(17)|(18)\d{9}$/,
        url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        // urlB : /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
        urlB : /^((ht|f)tps?):\/\/[^\s]*/,
        idCard : "Validator.IsIdCard(value)",
        currency : /^\d+(\.\d+)?$/,
        number : /^\d+$/,
        zip : /^[1-9]\d{5}$/,
        qq : /^[1-9]\d{4,11}$/,
        integer : /^[-\+]?\d+$/,
        double : /^[-\+]?\d+(\.\d+)?$/,
        english : /^[A-Za-z]+$/,
        chinese :  /^[\u0391-\uFFE5]+$/,
        username : /^[a-z]\w{3,}$/i,
        unSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
        isSafe : function(str){return !this.unSafe.test(str);},
        safeString : "Validator.isSafe(value)",
        filter : "Validator.DoFilter(value, $(elem).attr('accept'))",
        limit : "Validator.Limit(value.length,$(elem).attr('min'),  $(elem).attr('max'))",
        limitB : "Validator.Limit(Validator.LenB(value), $(elem).attr('min'), $(elem).attr('max'))",
        date : "Validator.IsDate(value, $(elem).attr('min'), $(elem).attr('format'))",
        repeat : "value == $('#'+$(elem).attr('to')).val()",
        range : "$(elem).attr('min') <= (value|0) && (value|0) <= $(elem).attr('max')",
        compare : "Validator.Compare(elem,$(elem).attr('operator'),$('#'+$(elem).attr('to')))",

        Limit : function(len,min, max){
            min = min || 0;
            max = max || Number.MAX_VALUE;
            return min <= len && len <= max;
        },
        LenB : function(str){
            return str.replace(/[^\x00-\xff]/g,"**").length;
        },
        ClearState : function(elem){
            with(elem){
                if(style.color == "red")
                    style.color = "";
                var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
                if(lastNode.id == "__ErrorMessagePanel")
                    parentNode.removeChild(lastNode);
            }
        },
        Exec : function(op, reg){
            return new RegExp(reg,"g").test(op);
        },
        Compare : function(obj1,operator,obj2){
            var op1 = $(obj1).val();
            var op2 = $(obj2).val();
            if(!op1){
                if($(obj1).attr('msg')){

                }
            }
            switch (operator) {
                case "NotEqual":
                    return (op1 != op2);
                case "GreaterThan":
                    return (op1 > op2);
                case "GreaterThanEqual":
                    return (op1 >= op2);
                case "LessThan":
                    return (op1 < op2);
                case "LessThanEqual":
                    return (op1 <= op2);
                default:
                    return (op1 == op2);
            }
        },
        MustChecked : function(name, min, max){
            var groups = document.getElementsByName(name);
            var hasChecked = 0;
            min = min || 1;
            max = max || groups.length;
            for(var i=groups.length-1;i>=0;i--)
                if(groups[i].checked) hasChecked++;
            return min <= hasChecked && hasChecked <= max;
        },
        DoFilter : function(input, filter){
            return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(input);
        },
        IsIdCard : function(number){
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;

            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }

            else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
            return pass;
        },
        IsDate : function(op, formatString){
            formatString = formatString || "ymd";
            var m, year, month, day;
            switch(formatString){
                case "ymd" :
                    m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                    if(m == null ) return false;
                    day = m[6];
                    month = m[5]*1;
                    year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                    break;
                case "dmy" :
                    m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                    if(m == null ) return false;
                    day = m[1];
                    month = m[3]*1;
                    year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                    break;
                default :
                    break;
            }
            if(!parseInt(month)) return false;
            month = month==0 ?12:month;
            var date = new Date(year, month-1, day);
            return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
            function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
        }
    }
    function validateElement(elem){
        //var hasError = false;
        $(elem).css('border-color','');
        var msg = '';
        var validateResult = '';
        var _dataType = $(elem).attr("dataType");
        var allowNull = $(elem).attr('allowNull');
        if(allowNull==='true'){
            allowNull = true;
        }
        else{
            allowNull = false;
        }
        var value = $(elem).val();
        if(!_dataType){
            return;
        }
        if(value===''&&allowNull){
            return;
        }
        if(Validator[_dataType]){
            switch(_dataType){
                case "idCard" :
                case "date" :
                case "repeat" :
                case "range" :
                case "compare" :
                case "custom" :
                case "group" :
                case "limit" :
                case "limitB" :
                case "safeString" :
                case "filter" :
                    if(!Validator["required"].test(value)){
                        //hasError = true;
                        msg = $(elem).attr('msg');
                        break;
                    }
                    if(!eval(Validator[_dataType]))	{
                        //hasError = true;
                        msg = $(elem).attr('msg');
                    }
                    break;
                default :
                    if(!Validator[_dataType].test(value)){
                        //hasError = true;
                        msg = $(elem).attr('msg');
                        if(!msg){
                            msg = "数据格式不正确!";
                        }
                    }
                    break;
            }
            validateResult =  msg;
            if(validateResult){
                addErrorClass(elem);
            }
            return validateResult;
        }
        else{
            var validateResult = eval(_dataType+'(elem)');
            if(validateResult!=true){
                if(validateResult===false){
                    msg = $(elem).attr('msg');
                    if(!msg){
                        msg = "数据格式不正确!";
                    }
                }
                var type = typeof(validateResult);
                if(type==='string'){
                    msg = validateResult;
                    addErrorClass(elem);
                }
            }
            return msg;
        }

    }
    function addErrorClass(elem){
        if($(elem).attr("class").indexOf("form-control-noline") != -1) {
            $(elem).css('border','1px #f00 solid');
        }
        $(elem).css('border-color','#f00');
    }
    function showErrMsg(elem,msg){
        var pos = calculateBubbleStyle(elem);
        var html = '<div class="bubble '+pos.clas+'" style="'+pos.style+'" validatefor="'+$(elem).attr('validateid')+'">'
            +'<div class="bubble-content">'+msg+'</div>'
            +'<div class="arrow"></div>'
            +'</div>';
        $(elem).after(html);
    }
})(jQuery);
function calculateBubbleStyle(elem){
    var arrowHeight = 11;
    var offsetTop = $(elem).offset().top-32-arrowHeight;
    var clas = 'top';
    /*if(offsetTop<=0){
        clas = 'bottom';
        offsetTop=$(elem).offset().top+elem.clientHeight+arrowHeight;
    }*/
    if(offsetTop<=20){//打开标签页头部有20边距，如果不设置，第一个必填项气泡提示就会被遮挡
        clas = 'bottom';
        offsetTop=$(elem).offset().top+elem.clientHeight+arrowHeight;
        offsetTop = '38';
    }
    else{
        offsetTop = '-38';
    }
    var offsetLeft = $(elem).offset().left;
    offsetLeft='25';
    var style = 'top:'+offsetTop+'px;left:'+offsetLeft;
    return {style:style,clas:clas};
}
$(document).on('afterResize',function(){
    $('.bubble').each(function(index,elem){
        var $validateElem = $('[validateid="'+$(elem).attr('validatefor')+'"]');
        if($validateElem.size()>0){
            var style = calculateBubbleStyle($validateElem.get(0));
            $(elem).removeClass('top').removeClass('bottom');
            $(elem).addClass(style.clas);
            $(elem).attr('style',style.style);
        }
    });
});