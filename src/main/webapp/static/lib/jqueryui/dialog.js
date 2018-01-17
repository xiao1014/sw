
/*my extend start*/
;(function($, window, document,undefined) {
	var dialogManager;
	var activeDialogId;
	//$.fn.getDialogManager = function(){
	$.getDialogManager = function(){
		if(dialogManager){
			return dialogManager;
		}
		else{
			dialogManager = new DialogManager();
			return dialogManager;
		}
	}
	function DialogManager(){
		this.dialogMap = new Map();
		$('#dialogList').on('click','li',function(){
			var dialogId = $(this).attr('dialogid');
			var dialog = $.getDialogManager().getDialog(dialogId);
			dialog.open();
		});
	}
	DialogManager.prototype.openDialog=function(opt){
		var dialog = this.dialogMap.get(opt.id);
		if(!dialog){
			dialog = new ValleyDialog(opt);
			dialog.index = this.dialogMap.size();
			if(!opt.documentObj){
				this.dialogMap.put(dialog.options.id,dialog);
			}
			var dialogItemHtml = '<li class="alert fade in" dialogid="'+dialog.options.id+'" onclick="$.getDialogManager().showDialog(\''+dialog.options.id+'\');">'
            +'<a href="javascript:void(0);" ><i class="glyphicon glyphicon-edit blue"></i>'+dialog.options.title+'</a>'
            +'<button data-dismiss="alert" class="close red" type="button"'
			+' onclick="$.getDialogManager().closeDialog(\''+dialog.options.id+'\');">'
            +'<i class="glyphicon glyphicon-remove-sign"></i>'
            +'</button>'
            +'</li>';
			$('#ace-settings-box').find('ul').append(dialogItemHtml);
		}
		
		
		dialog.open();
	}
	DialogManager.prototype.size=function(){
		return this.dialogMap.size();
	}
	DialogManager.prototype.getDialog=function(id){
		return this.dialogMap.get(id);
	}
	DialogManager.prototype.removeDialog=function(id){
		this.dialogMap.remove(id);
		if($('#ace-settings-box').find('li[dialogid="'+id+'"]').size()>0){
			$('#ace-settings-box').find('li[dialogid="'+id+'"]').remove();
		}
	}
	DialogManager.prototype.getActiveDialog = function(){
		return this.getDialog(activeDialogId);
	}
	DialogManager.prototype.closeDialog=function(id){
		var dialog = this.dialogMap.get(id);
		if(dialog){
			dialog.close();
		}	
	}
	DialogManager.prototype.showDialog=function(id){
		var dialog = this.dialogMap.get(id);
		if(dialog){
			dialog.open();
		}	
	}
	DialogManager.prototype.alert=function(opt){
        if ($(opt.html).hasClass("ui-alert-success")) {
            dialogManager.tipGlobal(opt, 3000);
            return;
        }
		if(opt.style){
			if(opt.style=='info'){
				opt.html = infoStyle(opt.html);
			}
			else if(opt.style=='warn'){
				opt.html=warnStyle(opt.html);
			}
			else if(opt.style=='success'){
				opt.html = successStyle(opt.html);
			}
			else if(opt.style=='danger'){
				opt.html = dangerStyle(opt.html);
			}
		}
		var alertDialog = new ValleyMsgDialog({
			title:opt.title?opt.title:'提示',
			html:opt.html,
			height:opt.height,
			allowClose:opt.allowClose,
			width:opt.width,
			buttons:[
				{
					text: "确定",
					click: function(){
						if(opt.callback){
							opt.callback();
						}
						alertDialog.close();
					}
				}
			]
		});
		alertDialog.open();
	}
	DialogManager.prototype.confirm=function(opt){
		var confirmDialog = new ValleyMsgDialog({
			title:opt.title,
			html:opt.html,
			height:opt.height,
			width:opt.width,
			buttons:[
				{
					text: opt.buttons.confirmText,
					click: function(){
						opt.buttons.confirmCallback();
						confirmDialog.close();
					}
				}
				,
				{
					text: opt.buttons.cancelText,
					click: function(){
						opt.buttons.cancelCallback();
						confirmDialog.close();
					}
				}
			]
		});
		confirmDialog.open();
	}
	DialogManager.prototype.tip = function(msg,timeout){
		var height = $('.openWindow-hd').outerHeight(true);
		var style = '';
		if ($('.openWindow-hd').size()>0){
			style = 'style="height: '+height+'px;"';
		}
		$('body').append('<div class="l-msg l-msg-danger" '+style+'>'+msg+'</div>');
		if(!timeout){
			timeout = 3000;
		}
		setTimeout(function(){
			$('.l-msg').remove();
		},timeout);


	};
	DialogManager.prototype.tipGlobal = function(opt,timeout){
		$('body').append('<div class="global-alert-box"><div class=\'global-alert global-alert-success\'>'+
            $(opt.html).html()+'</div></div>');
		if(!timeout){
			timeout = 3000;
		}
		function closeGlobalTip() {
            if(opt.callback){
                opt.callback();
            }
			$('.global-alert-box').remove();
		}
		// var globalTip = setTimeout(closeGlobalTip,timeout);
		$(".global-alert-box").on("click", function () {
			// clearTimeout(globalTip);
			closeGlobalTip();
		});
	};
	DialogManager.prototype.showMask = function(){
		var maskHtml = '<div class="ui-widget-overlay ui-front" id="locked" style="z-index:10000;display:none"></div>'
			+'<div class="progress" id="progress" style="display:none;position: absolute; z-index: 10001; width: 400px; height: 20px; left: 40%; margin-left: -50px; margin-top: -200px; top: 50%;">'
			+'<div style="width: 100%"  aria-valuemax="100" aria-valuemin="0" aria-valuenow="45"  role="progressbar" class="progress-bar progress-bar-striped  active">'
			+'<span class="sr-only"></span>正在处理请求,请等待....'
			+'</div>'
			+'</div>';
		if($('#locked').size()==0||$('#progress').size()==0){
			$('body').append(maskHtml);
		}
		$('#locked').show();
		$('#progress').show();
	};
	DialogManager.prototype.hideMask = function(){
		$('#locked').hide();
		$('#progress').hide();
	};
	function ValleyDialog(opt){
		this.defaults = {
			documentObj:document,
			relateObj:null,
			callWindow:null,
			id:new Date().getTime(),
			title:'',
			url:'',
			height:350,
			width:500,
			frameName:'',
			loadtype:'',
			closeCallback:null,
			allowMin:true,
			allowMax:false,
			allowClose:true,
			initMax:false,
			buttons:null,
			modal:false,
			html:'',
			iconClass:'glyphicon glyphicon-asterisk',
			closeText: "关闭",
			help:false
		};
		if(opt.initMax){
			opt.width=$(window).width();
			opt.height=$(window).height();
		}
		this.defaults.width=$(window).width()*0.6;
		this.defaults.height=$(window).height()*0.6;
		opt = $.extend({}, this.defaults, opt);
		this.options = opt;
		this.orgWidth = this.options.width;
		orgWidth = this.orgWidth;
		if($(window).height()<this.options.height){
			this.options.height = $(window).height();
		}
		this.orgHeight = this.options.height;
		orgHeight = this.orgHeight;
		this.index = 0;
		var mergeButtons = new Array();
		var thisDialog = this;
		if(opt.buttons){
			$.each(opt.buttons,function(i,ele){
				var fnc = ele.click;
				mergeButtons[i] = {
					text: ele.text,
					click: function(event){
						fnc(event,opt.callWindow,thisDialog);
					}
				};
			});
			/*
			for(var i=0;i<opt.buttons.length;i++){
				var fnc = opt.buttons[i].click;
				mergeButtons[i] = {
					text: opt.buttons[i].text,
					click: function(event){
						fnc(event,opt.callWindow);
					}
				};
			}
			*/
		}
		this.options.buttons = mergeButtons;
		
		var dialogId;
		if(this.options.id){
			dialogId = this.options.id;
		}
		else{
			dialogId = new Date().getTime();
			this.options.id = dialogId;
		}
		if($(this.options.documentObj).find('#'+dialogId).size()==0){
			$(this.options.documentObj).find('body').append('<div id="'+dialogId+'" title="'+this.options.title+'" style="display:none;"></div>');
		}
		$(this.options.documentObj).find('#'+this.options.id).dialog({
			height:this.options.height,
			width:this.options.width,
			modal:this.options.modal,
			buttons:this.options.buttons,
			closeText:this.options.closeText,
			create : function(){
				var dialogHtml;
				if(opt.html){
					dialogHtml = opt.html;
				}
				else{
					dialogHtml = '<iframe height="100%" width="100%" src="'+opt.url+'" marginWidth="0" marginHeight="0" frameBorder="0" class="dialog-iframe" ></iframe>';
				}
				$(opt.documentObj).find('#'+dialogId).html(dialogHtml);
				var $dialog = $(this);
				$dialog.parent().find('.ui-dialog-titlebar')
						.find('.ui-dialog-title').before('<i class="'+opt.iconClass+'"></i>');
				var $close = $dialog.parent().find('.ui-dialog-titlebar').find('.ui-dialog-titlebar-close');
				//if(opt.allowMax){
				if(false){//最大化功能停用，需要最大化的页面用openWindow打开
					var $max = $( "<button type='button'></button>" )
						.button({
							label: '最大化',
							icons: {
								primary: "ui-icon-extlink"
							},
							text: false
						})
						.addClass( "ui-dialog-titlebar-max" )
						.insertAfter( $close );
					$max.on('click',function(){
						var $icon = $(this).find('span:first');
						if($icon.hasClass('ui-icon-extlink')){
							//$icon.toggleClass('ui-icon-newwin');
							$max.button({
								label: '还原',
								icons: { 
									primary: "ui-icon-newwin"
								}
							});
							$max.removeClass('ui-state-hover');
							var myw = $(window).width();
							var myh = $(window).height()-10;
							orgHeight = $dialog.dialog( "option", "height" );
							orgWidth = $dialog.dialog( "option", "width" );
							$dialog.dialog({
								position:{my: "left top", at: "left top",of:window},
								width: myw ,
								height: myh 
							});
						}
						else{
							$dialog.dialog({
								position:{my: "center", at: "center",of:window},
								width:orgWidth,
								height:orgHeight
							});
							//$icon.toggleClass('ui-icon-extlink');
							$max.button({
								label: '最大化',
								icons: { 
									primary: "ui-icon-extlink"
								}
							});
							$max.removeClass('ui-state-hover');
						}
					});
				}
				
				
				if(opt.allowMin&&!opt.modal){
					var $min = $( "<button type='button'></button>" )
						.button({
							label: '最小化',
							icons: {
								primary: "ui-icon-minus"
							},
							text: false
						})
						.addClass( "ui-dialog-titlebar-min" )
						.insertAfter( $max );
					$min.on('click',function(event){
						$dialog.dialog('close',event);
					});
				}
				if(!opt.allowClose){
					$close.remove();
				}
				if(opt.help){
					var $help = $( "<button type='button'></button>" )
						.button({
							label: '帮助',
							icons: {
								primary: "platform-wenh68"
							},
							text: false
						})
						.addClass( "ui-dialog-titlebar-help" )
						.insertBefore( $close );
					$help.on('click',function(event){
						//openWindow(opt.url);
					});
				}
				$dialog.parent().find('.ui-dialog-titlebar').on('dblclick',function(){
					if($(this).find('.ui-dialog-titlebar-max').size()>0){
						$(this).find('.ui-dialog-titlebar-max').trigger('click');
					}
				});
			},
			close: function( event, ui ) {
				var $dialog = $(this);
				var target=event.toElement||event.delegateTarget;
				//alert(target.outerHTML);
				if(!target||(!$(target).hasClass('ui-dialog-titlebar-min')&&!$(target).hasClass('ui-icon-minus'))){
				//if($(target).hasClass('ui-icon-closethick')||$(target).find(":first").hasClass('ui-icon-closethick')){
					//alert('关闭喽'+dialogId);
					if(opt.closeCallback){
						opt.closeCallback(event,opt.callWindow,thisDialog);
					}
					$(opt.documentObj).find('#'+dialogId).find('iframe').remove();
					$dialog.dialog('destroy');
					$(opt.documentObj).find('#'+dialogId).remove();
					$('#dialogList').find('li[dialogid="'+dialogId+'"]').remove();
					dialogManager.removeDialog(dialogId);
				}
				else{
					//alert('隐藏喽');
				}
			},
			focus: function( event, ui ) {
				activeDialogId = event.target.id;
			}
		});
	}
	ValleyDialog.prototype.open=function(){
		var dialogId = this.options.id;
		$(this.options.documentObj).find('#'+dialogId).dialog( "open" );
	}
	ValleyDialog.prototype.close=function(){
		var dialogId = this.options.id;
		var isOpen = $(this.options.documentObj).find('#'+dialogId).dialog("isOpen");
		if(isOpen){
			$(this.options.documentObj).find('#'+dialogId).dialog("close");
		}
		else{
			$(this.options.documentObj).find('#'+dialogId).dialog("destroy");
			$(this.options.documentObj).find('#'+dialogId).remove();
			
			$('#dialogList').find('li[dialogid="'+dialogId+'"]').remove();
			dialogManager.removeDialog(dialogId);
		}
	}
	ValleyDialog.prototype.getWindow=function(){
		var element = $(this.options.documentObj).find('#'+this.options.id).get(0);
		if(element){
			var _iframe = $(element).find('iframe').get(0);
			//_iframe.contentWindow.document? _iframe.contentWindow.document.body : _iframe.ownerDocument.body
			if(_iframe){
				return _iframe.contentWindow;
			}
			else{
				return window;
			}
		}
	}
	ValleyDialog.prototype.getId=function(){
		return this.options.id;
	}
	ValleyDialog.prototype.disableButtons=function(selector){
		if(selector){
			$(this.options.documentObj).find('#'+this.options.id).parent()
			.find('.ui-dialog-buttonpane')
			.find(selector).attr('disabled','disabled');
		}
		else{
			$(this.options.documentObj).find('#'+this.options.id).parent()
			.find('.ui-dialog-buttonpane')
			.find('button')
			.each(function(index,element){
				$(element).attr('disabled','disabled');
			});
		}
	}
	ValleyDialog.prototype.enableButtons=function(selector){
		if(selector){
			$(this.options.documentObj).find('#'+this.options.id).parent()
			.find('.ui-dialog-buttonpane')
			.find(selector).removeAttr('disabled');
		}
		else{
			$(this.options.documentObj).find('#'+this.options.id).parent()
			.find('.ui-dialog-buttonpane')
			.find('button')
			.each(function(index,element){
				$(element).removeAttr('disabled');
			});
		}
	}
	function ValleyMsgDialog(opt){
		var dialogId = new Date().getTime();
		this.dialogId = dialogId;

		this.defaults = {
			documentObj:document,
			title:'',
			html:'',
			height:200,
			width:380,
			allowClose:true,
			buttons:[
				{
					text: "确定",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			],
			modal:true
		};
		this.options = $.extend({}, this.defaults, opt);
		$this = this;
		

		if($(this.options.documentObj).find('#'+dialogId).size()==0){
			$(this.options.documentObj).find('body').append('<div id="'+dialogId+'" title="'+this.options.title+'" style="display:none;">'
			+this.options.html
			+'</div>');
		}
		$(this.options.documentObj).find('#'+dialogId).dialog({
			height:this.options.height,
			width:this.options.width,
			modal:this.options.modal,
			buttons:this.options.buttons,
			allowClose:this.options.allowClose,
			create : function(){
				var $dialog = $(this);
				var $close = $dialog.parent().find('.ui-dialog-titlebar').find('.ui-dialog-titlebar-close');
				if(!$this.options.allowClose){
					$close.remove();
				}
			},
			close:function(){
				$( this ).dialog( "destroy" );
				$($this.options.documentObj).find('#'+dialogId).remove();
			}
		});
	}
	ValleyMsgDialog.prototype.open=function(){
		var dialogId = this.dialogId;
		$(this.options.documentObj).find('#'+dialogId).dialog( "open" );
	}
	ValleyMsgDialog.prototype.close=function(){
		var dialogId = this.dialogId;
		$(this.options.documentObj).find('#'+dialogId).dialog( "close" );
	}
	//map object start
	function Map(){
		this.container = new Object();
	}
	Map.prototype.put = function(key, value){
		this.container[key] = value;
	}
	
	Map.prototype.get = function(key){
		return this.container[key];
	}
	
	Map.prototype.keySet = function() {
		var keyset = new Array();
		var count = 0;
		for (var key in this.container) {
			// 跳过object的extend函数
			if (key == 'extend') {
				continue;
			}
			keyset[count] = key;
			count++;
		}
		return keyset;
	}
	
	
	Map.prototype.size = function() {
		var count = 0;
		for (var key in this.container) {
			// 跳过object的extend函数
			if (key == 'extend'){
				continue;
			}
			count++;
		}
		return count;
	}
	
	
	Map.prototype.remove = function(key) {
		delete this.container[key];
	}
	
	
	Map.prototype.toString = function(){
		var str = "";
		for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
			str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
		}
		return str;
	}
	//map object end
	
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
})(jQuery, window, document);

var dialogManager = $.getDialogManager();


/*my extend end*/