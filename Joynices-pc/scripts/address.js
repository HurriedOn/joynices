!function(t){
	function e(s){
		if(i[s])return i[s].exports;
		var n=i[s]={exports:{},id:s,loaded:!1};
		return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports
	}
	var i={};e.m=t,e.c=i,e.p="",e(0)
}([function(t,e,i){
	t.exports=i(1)
},function(t,e,i){
	i(2),i(3),i(4),i(5),
	JNC.address=function(){
		function a(){
//			$.ajax({
//				url: ,
//				dataType: "json",
//				timeout: 1e4,
//				error: function() {
//					JNC.alert("网络出错，请刷新页面！")
//				},
//				success: function(r) {
					
					//*******后台删除********
					var r={code:1,msg:"错误信息"};
					r.data=[
						{address_id:'1001',name:'姬月',phone:'133****8900',city:'北京市 北京市 西城区',detail:'益田路3008号皇都广场C座',default_status:0,zipcode:100032},
						{address_id:'1002',name:'Tom',phone:'153****6934',city:'广东省 广州市 荔湾区',detail:'常州道街道中兴中路180号',default_status:1,zipcode:510145}
					];
					//*******end********
					
					r && 1 === r.code ? (listData = r.data, b(),$("#J_cartLoading").addClass("hide")) : JNC.alert(r.msg)
//				}
//			})
		}
		function b(){  
			if(listData.length>0){
				var t=doT.template($("#J_addressTemplate").html()),
					a=t(listData);
				$("#addressBox").html(a)
			}
		}
		function c(p){
			if(p.length){
				var r={};
				r.id=p.attr("data-id"),
				r.status=p.attr("data-status"),
				r.name=p.attr("data-name"),
				r.city=p.attr("data-city"),
				r.detail=p.attr("data-detail"),
				r.phone=p.attr("data-phone"),
				r.zipcode=p.attr("data-zipcode");
				return r
			}
		}
		var listData=null,
			checkoutData={},
			z=function(){
				a(),
				$("#J_addressNew").on("click",function(e){ //添加
					e.preventDefault();
					JNC.addressModify.editAddress({
						type:"new",
						callback:function(){
							location.reload()
						}
					})
				}),
				$(".J_addressModify").on("click",function(e){ //修改
					e.preventDefault();
					var p=$(this).closest(".J_addressItem"),
						i=p.attr("data-id");
					checkoutData=c(p),
					JNC.addressModify.editAddress({
						type:"change",
						addressData:checkoutData,
						callback:function(){
							location.reload()
						}
					})
				}),
				$(".J_addressDelete").on("click",function(e){ //删除
					var t=$(this),
						p=t.closest(".J_addressItem");
					e.preventDefault(),
					t.hasClass("disabled") || JNC.confirm({
					    content: '确定删除该地址吗？',
					    buttons:{
					        ok:{
					        	text:"确定",
					        	action: function(){
					        		t.addClass("disabled");
		//							$.ajax({
		//								type:"post",
		//								url:"",
		//								data:{
		//									id:p.attr("data-id")
		//								},
		//								dataType:"json",
		//								success:function(d){
			
											//****后台删除*****
											var d={code:1};
											//****end*****
											
											t.removeClass("disabled"),1===d.code ? p.remove() : JNC.alert(d.msg)
		//								}
		//							});
					        	}
					        },
					        close:{
					        	text:"取消"
					        }
					    }
					});
				}),
				$(".J_default").on("click",function(){ //设为默认地址
					var t=$(this),j,
						p=t.closest(".J_addressItem");
					parseInt(p.attr("data-status"))===0 ? j=!0 : j=!1;
//					j || $.ajax({
//						type:"post",
//						url:"",
//						data:{
//							id:p.attr("data-id"),
//							status: 1
//						},
//						dataType: "json",
//						success: function(d) {
							var d={code:1};
							d.code===1 ? location.reload() : JNC.alert(d.msg)
//						}
//					});
				}),
				JNC.addressModify.init()
			};
		return {
			init:z()
		}
	}()
},function(t,e,i){
	JNC.namespace("addressModify"), JNC.addressModify = {
		init: function() {
			var s = this;
			this.userAddress = {},
			this.options = {},
			this.formElem={
				$modal:$("#addressModal"),
				$picker:$(".distpicker"),
				$name:$("#J_consigneeInput"),
				$phone:$("#J_telephoneInput"),
				$city:$("#city-picker3"),
				$detail:$("#J_detailInput"),
				$zipcode:$("#J_zipcodeInput"),
				$check:$("#checkReg")
			},
			$("#J_saveAddress").on("click", function() {
				var j = !1;s.saveSelectAddress(j); 
				$(".J_addressText").each(function() {
					return j = s.validation($(this)), j ? void 0 : !1
				}), j && s.saveAddress()
			})
		},
		editAddress:function(f){
			var t=this;
			t.options=$.extend(t.options,f);//遍历数组元素,并修改第一个对象
			"new"===t.options.type? (t.revertForm(),t.showModal()) : "change"===t.options.type && (t.setFormData(),t.showModal())
		},
		showModal:function(){
			var t=this;
			$(".tooltip").remove(),JNC.threeAddress();
			t.formElem.$modal.modal({
				show: !0,
				backdrop: "static"
			}).one("hidden", function() {
				t.revertForm()
			})
		},
		setFormData:function(){
			var t=this,
				j=!1,
				d=t.options.addressData; 
			parseInt(d.status)===1 ? j=!0 : j=!1, 
			t.formElem.$city.removeClass(".city-picker-input").val(d.city).siblings().remove();
			setTimeout(function(){ 
				t.formElem.$name.val(d.name),
				t.formElem.$phone.val("").attr("placeholder", d.phone),
				t.formElem.$detail.val(d.detail),
				t.formElem.$zipcode.val(d.zipcode),
				t.formElem.$check.attr("checked",j)
			},200)
		},
		revertForm:function(){
			var t=this;
			t.formElem.$name.val(""),
			t.formElem.$phone.val("").attr("placeholder","11位手机号"),
			t.formElem.$detail.val(""),
			t.formElem.$zipcode.val(""),
			t.formElem.$city.val("").siblings().remove()
		},
		saveSelectAddress: function(e) {
			var t = this,
				r =t.formElem.$picker;
			t.userAddress.province = r.find(".select-item[data-count='province']").html(),
			t.userAddress.city = r.find(".select-item[data-count='city']").html(),
			t.userAddress.district = r.find(".select-item[data-count='district']").html(),
			t.userAddress.area=t.userAddress.province+" "+t.userAddress.city+" "+t.userAddress.district
		},
		validation: function(e) {
			if(e.length){
				var t, r = this,
					s = e.attr("name"),
					a = $.trim(e.val());
				if("consignee" === s) {
					if(t = /^[a-zA-Z\u4e00-\u9fa5·]+$/, a.length < 2 || a.length > 20) return r.errorVal(e,"收货人姓名，最少2个最多20个中文字"), !1;
					if(!t.test(a)) return r.errorVal(e,"收货人姓名不正确（只能是英文、汉字）"), !1;
					r.userAddress.consignee = a
				}else if("phone" === s) {
					if (t = /^1[0-9]{10}$/, !t.test(a) && "change" !== r.options.type) return r.errorVal(e,"请输入正确的手机号"), !1;
					if ("change" === r.options.type && "" !== a && !t.test(a)) return r.errorVal(e,"请输入正确的手机号"), !1;
					r.userAddress.phone = a
				}else if("three_address" === s){ 
					if(!(r.userAddress.province && r.userAddress.city && r.userAddress.district)) return r.errorVal(e,"请选择地址"), !1
				}else if("user_adress" === s){
					a = a.replace(/</g, "").replace(/>/g, "").replace(/\//g, "").replace(/\\/g, ""), t = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					var i = /^\d+$/,
						d = /^[0-9a-zA-Z]+$/;
					if(a.length < 5 || a.length > 32) return r.errorVal(e,"详细地址长度不对，最小为 5 个字，最大32个字"), !1;
					if(t.test(a) || i.test(a) || d.test(a)) return r.errorVal(e,"详细地址不正确"), !1;
					r.userAddress.detail = a
				}else if("user_zipcode" === s){
					if(t = /^\d{6}$/, !t.test(a)) return r.errorVal(e,"邮编是6位数字"), !1;
					r.userAddress.zipcode = a
				}   
				return !0;
			}
		},
		errorVal:function(e,n){
			e.after('<div class="tooltip top"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+n+'</div></div>');
			e.on("keydown",function(){
				e.siblings(".tooltip").remove();
			}),
			$(".distpicker").on("click",function(){
				e.siblings(".tooltip").remove();
			})
		},
		saveAddress:function(){
			var t=this,
				r={
					consignee:t.userAddress.consignee,
					phone:t.userAddress.phone,
					city:t.userAddress.area,
					detail:t.userAddress.detail,
					zipcode:t.userAddress.zipcode
				},
				s="add.php";
			$("#checkReg").is(":checked") ? r.status=1 : r.status=0,
			"change"===t.options.type && (r.address_id=t.options.addressData.id,s="change.php");
//			$.ajax({
//				type:"post",
//				url:s,
//				dataType:"json",
//				data:{
//					newAddress:r
//				},
//				timeout:1e4,
//				error:function(){},
//				success:function(d){
	
					//*******后台删除********
					var d={code:1}; console.log(r);
					//*******end********
					
					d && 1===d.code ? (t.formElem.$modal.modal("hide"),"function"==typeof t.options.callback && t.options.callback()) : JNC.alert(d.msg)
//				}
//			});
		}
	}
},function(t,e,i){+function(t){"use strict";function e(e,s){return this.each(function(){var n=t(this),o=n.data("bs.modal"),a=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);o||n.data("bs.modal",o=new i(this,a)),"string"==typeof e?o[e](s):a.show&&o.show(s)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var s=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){s.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(s.$element)&&(s.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&s.$element.hasClass("fade");s.$element.parent().length||s.$element.appendTo(s.$body),s.$element.show().scrollTop(0),s.adjustDialog(),n&&s.$element[0].offsetWidth,s.$element.addClass("in"),s.enforceFocus();var o=t.Event("shown.bs.modal",{relatedTarget:e});n?s.$dialog.one("bsTransitionEnd",function(){s.$element.trigger("focus").trigger(o)}).emulateTransitionEnd(i.TRANSITION_DURATION):s.$element.trigger("focus").trigger(o)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var s=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;o?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){s.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})};var s=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=s,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var s=t(this),n=s.attr("href"),o=t(s.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),a=o.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},o.data(),s.data());s.is("a")&&i.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){s.is(":visible")&&s.trigger("focus")})}),e.call(o,a,this)})}(jQuery)},
function(t,e,i){+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,s=this;t(this).one("bsTransitionEnd",function(){i=!0});return setTimeout(function(){i||t(s).trigger(t.support.transition.end)},e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery)
},function(t,e,i){
JNC.namespace("threeAddress"), JNC.threeAddress = function() {
	function t(e, i) { 
		this.$element = $(e), 
		this.$dropdown = null, 
		this.options = $.extend({}, t.DEFAULTS, $.isPlainObject(i) && i), 
		this.active = !1, 
		this.dems = [], 
		this.needBlur = !1, 
		this.init()
	}
	if("undefined" == typeof ChineseDistricts) throw new Error('The file "city-picker.data.js" must be included first!');
	var e = "change.citypicker",
		i = "city";
	t.prototype = {
		constructor: t,
		init: function() {
			this.defineDems(), this.render(), this.bind(), this.active = !0
		},
		render: function() { 
			var t = this.getPosition(),
				e = this.$element.attr("placeholder") || this.options.placeholder,
				i = '<span class="city-picker-span" style="NaN' + t.height + "px;line-height:" + (t.height - 3) + 'px;">' + (e ? '<span class="placeholder">' + e + "</span>" : "") + '<span class="title"></span><div class="arrow iconfont icon-down"></div></span>',
				s = '<div class="city-picker-dropdown" style="left:0px;top:100%;"><div class="city-select-wrap"><div class="city-select-tab"><a class="active" data-count="province">省份</a>' + (this.includeDem("city") ? '<a data-count="city">城市</a>' : "") + (this.includeDem("district") ? '<a data-count="district">区县</a>' : "") + '</div><div class="city-select-content"><div class="city-select province" data-count="province"></div>' + (this.includeDem("city") ? '<div class="city-select city" data-count="city"></div>' : "") + (this.includeDem("district") ? '<div class="city-select district" data-count="district"></div>' : "") + "</div></div>";
			
			this.$element.addClass("city-picker-input"), 
			this.$textspan = $(i).insertAfter(this.$element), 
			this.$dropdown = $(s).insertAfter(this.$textspan); 
			var n = this.$dropdown.find(".city-select"); 
			$.each(this.dems, $.proxy(function(t, e) {
				this["$" + e] = n.filter("." + e)
			}, this)),
			this.refresh()
			
		},
		refresh: function(t) {
			this.$dropdown.find(".city-select").data("item", null);
			var e = this.$element.val() || "";
			e = e.split(" "),
			$.each(this.dems, $.proxy(function(i, s) {
				e[i] && i < e.length ? this.options[s] = e[i] : t && (this.options[s] = ""), 
				
				//console.log(this.$dropdown.find(".city-select").eq(2).data()),
				this.output(s)
			}, this)), 
			
			this.tab("province"), 
			this.feedText(), 
			this.feedVal()
		},
		defineDems: function() {
			var t = !1;
			$.each(["province", i, "district"], $.proxy(function(e, i) {
				t || this.dems.push(i), i === this.options.level && (t = !0)
			}, this))
		},
		includeDem: function(t) {
			return -1 !== $.inArray(t, this.dems)
		},
		getPosition: function() {
			var t, e, i, s, n;
			return t = this.$element.position(), s = this.getSize(this.$element), e = s.height, i = s.width, this.options.responsive && (n = this.$element.offsetParent().width()) && ((i /= n) > .99 && (i = 1), i = 100 * i + "%"), {
				top: t.top || 0,
				left: t.left || 0,
				height: e,
				width: i
			}
		},
		getSize: function(t) {
			var e, i, s;
			return t.is(":visible") ? s = {
				width: t.outerWidth(),
				height: t.outerHeight()
			} : ((e = $("<div />").appendTo($("body"))).css({
				position: "absolute !important",
				visibility: "hidden !important",
				display: "block !important"
			}), s = {
				width: (i = t.clone().appendTo(e)).outerWidth(),
				height: i.height()
			}, e.remove()), s
		},
		getWidthStyle: function(t, e) {
			return this.options.responsive && !$.isNumeric(t) ? "width:" + t + ";" : "width:" + (e ? Math.max(320, t) : t) + "px;"
		},
		bind: function() {
			var t = this; 
			$(document).on("click", this._mouteclick = function(e) {
				var i, s, n, o = $(e.target);
				o.is(".city-picker-span") ? s = o : o.is(".city-picker-span *") && (s = o.parents(".city-picker-span")), o.is(".city-picker-input") && (n = o), o.is(".city-picker-dropdown") ? i = o : o.is(".city-picker-dropdown *") && (i = o.parents(".city-picker-dropdown")), (!n && !s && !i || s && s.get(0) !== t.$textspan.get(0) || n && n.get(0) !== t.$element.get(0) || i && i.get(0) !== t.$dropdown.get(0)) && t.close(!0)
			}), this.$element.on("change", this._changeElement = $.proxy(function() {
				this.close(!0), this.refresh(!0)
			}, this)).on("focus", this._focusElement = $.proxy(function() {
				this.needBlur = !0, this.open()
			}, this)).on("blur", this._blurElement = $.proxy(function() {
				this.needBlur && (this.needBlur = !1, this.close(!0))
			}, this)), this.$textspan.on("click", function(e) {
				var i, s = $(e.target);
				t.needBlur = !1, s.is(".select-item") ? (i = s.data("count"), t.open(i)) : t.$dropdown.is(":visible") ? t.close() : t.open()
			}).on("mousedown", function() {
				t.needBlur = !1
			}), 
			this.$dropdown.on("click", ".city-select a", function() {
				var i = $(this).parents(".city-select"),
					s = i.find("a.active"),
					n = 0 === i.next().length;
				s.removeClass("active"), $(this).addClass("active"), s.data("code") !== $(this).data("code") && ("district" === i.data("count") && $("#J_zipcodeInput").val($(this).data("zipcode")), i.data("item", {
					address: $(this).attr("title"),
					code: $(this).data("code")
				}), $(this).trigger(e), t.feedText(), t.feedVal(), n && t.close())
			}).on("click", ".city-select-tab a", function() {
				if(!$(this).hasClass("active")) {
					var e = $(this).data("count");
					t.tab(e)
				}
			}).on("mousedown", function() {
				t.needBlur = !1
			}), this.$province && this.$province.on(e, this._changeProvince = $.proxy(function() {
				this.output(i), this.output("district"), this.tab(i)
			}, this)), this.$city && this.$city.on(e, this._changeCity = $.proxy(function() {
				this.output("district"), this.tab("district")
			}, this))
		},
		open: function(t) {
			t = t || "province", this.$dropdown.show(), this.$textspan.addClass("open").addClass("focus"), this.tab(t)
		},
		close: function(t) {
			this.$dropdown.hide(), this.$textspan.removeClass("open"), t && this.$textspan.removeClass("focus")
		},
		unbind: function() {
			$(document).off("click", this._mouteclick), this.$element.off("change", this._changeElement), this.$element.off("focus", this._focusElement), this.$element.off("blur", this._blurElement), this.$textspan.off("click"), this.$textspan.off("mousedown"), this.$dropdown.off("click"), this.$dropdown.off("mousedown"), this.$province && this.$province.off(e, this._changeProvince), this.$city && this.$city.off(e, this._changeCity)
		},
		getText: function() { 
			var t = "";  
			return this.$dropdown.find(".city-select").each(function() {
				var e = $(this).data("item"),
					i = $(this).data("count"); 
				e && (t += ($(this).hasClass("province") ? "" : "/") + '<span class="select-item" data-count="' + i + '" data-code="' + e.code + '">' + e.address + "</span>")
			}), t
		},
		getPlaceHolder: function() {
			return this.$element.attr("placeholder") || this.options.placeholder
		},
		feedText: function() { 
			this.getText() ? (this.$textspan.find(">.placeholder").hide(), this.$textspan.find(">.title").html(this.getText()).show()) : (this.$textspan.find(">.placeholder").text(this.getPlaceHolder()).show(), this.$textspan.find(">.title").html("").hide())
		},
		getVal: function() {
			var t = "";
			return this.$dropdown.find(".city-select").each(function() {
				var e = $(this).data("item"); 
				e && (t += ($(this).hasClass("province") ? "" : "/") + e.address)
			}), t
		},
		feedVal: function() {
			this.$element.val(this.getVal())
		},
		output: function(t) {
			var e, s, n, o, a = this.options,
				d = this["$" + t],
				r = "province" === t ? {} : [],
				c = null; 
				
			d && d.length && (e = d.data("item"), o = (e ? e.address : null) || a[t], n = "province" === t ? 86 : t === i ? this.$province && this.$province.find(".active").data("code") : "district" === t ? this.$city && this.$city.find(".active").data("code") : n, s = $.isNumeric(n) ? ChineseDistricts[n] : null, $.isPlainObject(s) && $.each(s, function(e, i) {
				var s; 
				if("province" === t) {
					s = [];
					for(var n = 0; n < i.length; n++) i[n].address === o && (c = {
						code: i[n].code,
						address: i[n].address
					}), s.push({
						code: i[n].code,
						address: i[n].address,
						selected: i[n].address === o
					});
					r[e] = s
				}else if(t==="district"){
					i.name === o && (c = {
						code: e,
						address: i.name
					}), 
					r.push({
						code: e,
						address: i,
						selected: i.name === o
					})
				}else{  
					i === o && (c = {
						code: e,
						address: i
					}), 
					r.push({
						code: e,
						address: i,
						selected: i === o
					})
				}
			}), 
			d.html("province" === t ? this.getProvinceList(r) : t === i ? this.getCityList(r) : this.getDistrictList(r)), 
			d.data("item", c))
		},
		getProvinceList: function(t) {
			var e = [],
				i = this,
				s = this.options.simple; 
			return $.each(t, function(t, n) {
				e.push('<dl class="clearfix">'), 
				e.push("<dt>" + t + "</dt><dd>"), 
				$.each(n, function(t, n) { 
					e.push('<a title="' + (n.address || "") + '" data-code="' + (n.code || "") + '" class="' + (n.selected ? " active" : "") + '">' + (s ? i.simplize(n.address, "province") : n.address) + "</a>")
				}), 
				e.push("</dd></dl>")
			}), e.join("")
			
		},
		getCityList: function(t) {
			var e = [],
				s = this,
				n = this.options.simple;
			return e.push('<dl class="clearfix"><dd>'), $.each(t, function(t, o) {
				e.push('<a title="' + (o.address || "") + '" data-code="' + (o.code || "") + '" class="' + (o.selected ? " active" : "") + '">' + (n ? s.simplize(o.address, i) : o.address) + "</a>")
			}), e.push("</dd></dl>"), e.join("")
		},
		getDistrictList: function(t) { 
			var e = [],
				i = this,
				s = this.options.simple;
			return e.push('<dl class="clearfix"><dd>'), 
			$.each(t, function(t, n) { 
				e.push('<a title="' + (n.address.name || "") + '" data-code="' + (n.code || "") + '"data-zipcode="' + (n.address.zipcode || "") + '" class="' + (n.selected ? " active" : "") + '">' + (s ? i.simplize(n.address.name, "district") : n.address.name) + "</a>")
			}), e.push("</dd></dl>"), e.join("")
		},
		getList: function(t, e) {
			var i = [],
				s = this,
				n = this.options.simple;
			return i.push('<dl class="clearfix"><dd>'), $.each(t, function(t, o) {
				i.push('<a title="' + (o.address || "") + '" data-code="' + (o.code || "") + '" class="' + (o.selected ? " active" : "") + '">' + (n ? s.simplize(o.address, e) : o.address) + "</a>")
			}), i.push("</dd></dl>"), i.join("")
		},
		simplize: function(t, e) {
			return t = t || "", "province" === e ? t.replace(/[省,市,自治区,壮族,回族,维吾尔]/g, "") : e === i ? t.replace(/[市,地区,回族,蒙古,苗族,白族,傣族,景颇族,藏族,彝族,壮族,傈僳族,布依族,侗族]/g, "").replace("哈萨克", "").replace("自治州", "").replace(/自治县/, "") : "district" === e ? t.length > 2 ? t.replace(/[市,区,县,旗]/g, "") : t : void 0
		},
		tab: function(t) {
			var e = this.$dropdown.find(".city-select"),
				i = this.$dropdown.find(".city-select-tab > a"),
				s = this["$" + t],
				n = this.$dropdown.find('.city-select-tab > a[data-count="' + t + '"]');
			s && (e.hide(), s.show(), i.removeClass("active"), n.addClass("active"))
		},
		reset: function() {
			this.$element.val(null).trigger("change")
		},
		destroy: function() {
			this.unbind(), this.$element.removeData("citypicker").removeClass("city-picker-input"), this.$textspan.remove(), this.$dropdown.remove()
		}
	}, 
	t.DEFAULTS = {
		simple: !1,
		responsive: !1,
		placeholder: "请选择省/市/区",
		level: "district",
		province: "",
		city: "",
		district: ""
	}, 
	t.setDefaults = function(e) { 
		$.extend(t.DEFAULTS, e)
	}, 
	t.other = $.fn.citypicker, 
	$.fn.citypicker = function(e) {
		[].slice.call(arguments, 1);
		return this.each(function() {
			var i, s = $(this);
			s.data("citypicker");
			/destroy/.test(e) || (i = $.extend({}, s.data(), $.isPlainObject(e) && e), s.data("citypicker", new t(this, i)))
		})
		
	}, 
	$.fn.citypicker.Constructor = t, 
	$.fn.citypicker.setDefaults = t.setDefaults, 
	$.fn.citypicker.noConflict = function() {
		return $.fn.citypicker = t.other, this
	}, 
	$(function() { 
		$('[data-toggle="city-picker"]').citypicker()
	})
}}]);