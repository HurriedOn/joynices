// 侧边菜单开关
function autoLeftNav() {
    $('.tpl-header-switch-button').on('click', function() {
        if ($('.left-sidebar').is('.active')) {
            if ($(window).width() > 1024) {
                $('.tpl-content-wrapper').removeClass('active');
            }
            $('.left-sidebar').removeClass('active');
        } else {

            $('.left-sidebar').addClass('active');
            if ($(window).width() > 1024) {
                $('.tpl-content-wrapper').addClass('active');
            }
        }
    })

    if ($(window).width() < 1024) {
        $('.left-sidebar').addClass('active');
    } else {
        $('.left-sidebar').removeClass('active');
    }
}

!function(e){
	function t(s) {
		if(r[s]) return r[s].exports;
		var a = r[s] = {
			exports: {},
			id: s,
			loaded: !1
		};
		return e[s].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
	}
	var r = {};
	return t.m = e, t.c = r, t.p = "", t(0)
}([function(e,t,r){
	e.exports = r(1) 
},function(e,t,r){
	r(2),r(3),
	function(t){
		autoLeftNav();
	    $(window).resize(function() {
	        autoLeftNav();
	    });
	    // 风格切换
		$('.tpl-skiner-toggle').on('click', function() {
		    $('.tpl-skiner').toggleClass('active');
		})
		
		$('.tpl-skiner-content-bar').find('span').on('click', function() {
		    $('body').attr('class', $(this).attr('data-color'))
		    saveSelectColor.Color = $(this).attr('data-color');
		    // 保存选择项
		    storageSave(saveSelectColor);
		
		})
	    // 侧边菜单
		$('.sidebar-nav-sub-title').on('click', function() {
		    $(this).siblings('.sidebar-nav-sub').slideToggle(80)
		    .end()
		    .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
		});
	}(jQuery)
},function(e,t,r) {
	"undefined" != typeof JNC && JNC || (window.JNC = {}), JNC.namespace = function() {
		var e, t, n, i = arguments,
			r = null;
		for(e = 0; e < i.length; e += 1)
			for(n = ("" + i[e]).split("."), r = JNC, t = "JNC" === n[0] ? 1 : 0; t < n.length; t += 1) r[n[t]] = r[n[t]] || {}, r = r[n[t]];
		return r
	}
},function(e,t,r){
	var CLASS_POPUP = 'jnc-popup',
		CLASS_POPUP_IN='jnc-popup-in',
		CLASS_POPUP_OUT='jnc-popup-out',
		CLASS_POPUP_INNER = 'jnc-popup-inner',
		CLASS_POPUP_TEXT = 'jnc-popup-text',
		CLASS_POPUP_INPUT='jnc-popup-input',
		CLASS_POPUP_BUTTONS='jnc-popup-buttons',
		CLASS_POPUP_BUTTON='jnc-popup-button',
		CLASS_POPUP_BUTTON_BOLD='jnc-popup-button-bold',
		CLASS_POPUP_BACKDROP = 'jnc-popup-backdrop',
    	CLASS_ACTIVE = 'jnc-active';
    var backdrop = (function() {
        var element = document.createElement('div');
        element.classList.add(CLASS_POPUP_BACKDROP);
        element.addEventListener("mousemove", e.preventDefault);
        element.addEventListener('webkitTransitionEnd', function() {
            if (!this.classList.contains(CLASS_ACTIVE)) {
                element.parentNode && element.parentNode.removeChild(element);
            }
        });
        return element;
    }());
    var createPopup = function(html,callback) {
    	var popupElement = document.createElement('div');
        popupElement.classList.add(CLASS_POPUP);
        popupElement.innerHTML=html;
        var removePopupElement = function() {
            popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
            popupElement = null;
        };
        popupElement.addEventListener("touchmove", e.preventDefault);
        popupElement.addEventListener('webkitTransitionEnd', function(e) { 
            if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
                removePopupElement();
            }
        });
        popupElement.style.display = 'block';
        document.body.appendChild(popupElement);
        popupElement.offsetHeight;
        popupElement.classList.add(CLASS_POPUP_IN);
        
        if (!backdrop.classList.contains(CLASS_ACTIVE)) {
            backdrop.style.display = 'block';
            document.body.appendChild(backdrop);
            backdrop.offsetHeight;
            backdrop.classList.add(CLASS_ACTIVE);
        }
        var input = popupElement.querySelector('.' + CLASS_POPUP_INPUT + ' input');
        //关闭
        $(popupElement).on("click","."+CLASS_POPUP_BUTTON,function(){
        	handleEvent($(this).index())
        })
        function handleEvent(index, animate) {
         	if (popupElement) {
         		var result = callback && callback({
                    index: index || 0,
                    value: input && input.value || ''
               	}); 
                if (animate !== false) {
                        popupElement.classList.remove(CLASS_POPUP_IN);
                        popupElement.classList.add(CLASS_POPUP_OUT);
                }else{
                    removePopupElement();
                }
                    
                backdrop.classList.remove(CLASS_ACTIVE);
                   
            }
        }
    }
	JNC.confirm = function(message,btnArray, callback) {
		if(typeof btnArray === 'function'){
			callback = btnArray;
			btnArray = ['取消', '确定'];
		}
		var h='<div class='+CLASS_POPUP_INNER+'><div class='+CLASS_POPUP_TEXT+'>'+message+'</div></div><div class='+CLASS_POPUP_BUTTONS+'><span class='+CLASS_POPUP_BUTTON+'>'+btnArray[0]+'</span><span class='+CLASS_POPUP_BUTTON+'>'+btnArray[1]+'</span></div>';
        createPopup(h,callback);
    };
    JNC.prompt=function(message,placeholder,btnArray,callback){
    	if(typeof message==='undefined'){
    		return;
    	}else{
    		if(typeof placeholder==='function'){
    			callback=placeholder;
    			message=null;
    			placeholder=null;
    			btnArray=null;
    		}else if(typeof btnArray==='function'){
    			callback=btnArray;
    			btnArray = ['取消', '确定'];;
    		}
    	}
    	var h='<div class='+CLASS_POPUP_INNER+'><div class='+CLASS_POPUP_TEXT+'>'+message+'</div><div class='+CLASS_POPUP_INPUT+'><input type="text" autofocus="" placeholder='+placeholder+' /></div></div><div class='+CLASS_POPUP_BUTTONS+'><span class='+CLASS_POPUP_BUTTON+'>'+btnArray[0]+'</span><span class='+CLASS_POPUP_BUTTON+'>'+btnArray[1]+'</span></div>';
        createPopup(h,callback);
    };
    JNC.modal=function(){
    	var popupElement=document.getElementById("jnc-modal");
    	var hidePopupElement = function() {
            popupElement.style.display = 'none',popupElement.classList.remove(CLASS_POPUP_OUT);
        };
        popupElement.addEventListener("touchmove", e.preventDefault);
        popupElement.addEventListener('webkitTransitionEnd', function(e) { 
            if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
                hidePopupElement();
            }
        });
        popupElement.style.display = 'block';
        popupElement.offsetHeight;
        popupElement.classList.add(CLASS_POPUP_IN);
        
        if (!backdrop.classList.contains(CLASS_ACTIVE)) {
            backdrop.style.display = 'block';
            document.body.appendChild(backdrop);
            backdrop.offsetHeight;
            backdrop.classList.add(CLASS_ACTIVE);
        }
        $(popupElement).on("click","."+CLASS_POPUP_BUTTON,function(){
        	handleEvent($(this).index())
        })
        function handleEvent(index, animate) {
         	if (popupElement) {
                if (animate !== false) {
                        popupElement.classList.remove(CLASS_POPUP_IN);
                        popupElement.classList.add(CLASS_POPUP_OUT);
                }else{
                    hidePopupElement();
                }  
                backdrop.classList.remove(CLASS_ACTIVE);
            }
        }
    };
}])