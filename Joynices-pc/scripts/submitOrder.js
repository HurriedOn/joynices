! function(e) {
	function t(i) {
		if (r[i]) return r[i].exports;
		var o = r[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
	}
	var r = {};
	return t.m = e, t.c = r, t.p = "", t(0)
}([function(e, t, r) {
		e.exports = r(1)
}, function(e, t, r) {
	r(2), r(3), r(4), r(5),
	JNC.submitOrder = function() {
		function selectedAddress(sel) {
			if (sel.length) {
				var addressInfo = {};
				addressInfo.address_id = sel.attr("data-address_id"),
				addressInfo.status = sel.attr("data-status"),
				addressInfo.consignee = sel.attr("data-consignee"),
				addressInfo.phone = sel.attr("data-phone"),
				addressInfo.areas = sel.attr("data-areas"),
				addressInfo.detail = sel.attr("data-detail"),
				addressInfo.zipcode = sel.attr("data-zipcode");
				return addressInfo
			}
		}
		function newAddressTemplate(options){
			var tempHtml=doT.template($("#J_newAddressTemplate").html()),
				temp=tempHtml(options);
			$("#J_addressList").prepend(temp),
			$(".J_addressItem").eq(0).trigger("click")
		}
		function changeAddress(options){
			if(options){
				var item=$(".J_addressItem[data-address_id='"+options.address_id+"']"),
					tel=options.phone.substr(0,3)+"****"+options.phone.substr(7,11);
				item.attr({
					"data-consignee":options.consignee,
					"data-phone":tel,
					"data-status":parseInt(options.status),
					"data-areas":options.areas,
					"data-detail":options.detail,
					"data-zipcode":options.zipcode
				}),
				item.find(".uname").text(options.consignee),
				item.find(".utel").text(tel),
				item.find(".uaddress").html(options.areas+"<br/>"+options.detail),
				item.trigger("click")
			}
		}
		function defaults(){
			$(".J_option").each(function(){
				var sel=$(this).hasClass("selected");
				if(sel){
					var type=$(this).attr("data-type"),
						val=$(this).attr("data-value");
					submitConfig.checkData[type]=val;
				}
			}),
			submitConfig.checkData.address.address_id=$("#J_addressList").find(".selected").attr("data-address_id");
			account()
		}
		function account(){
			var fee=0;
			fee=parseFloat($("#J_logisticsList").find(".selected").data("amount"));
			if(fee===0){
				submitConfig.logisticsFee=0
			}else{
				submitConfig.logisticsFee=fee
			}
			$("#J_freight").html("¥"+fee)
		}
		function checkoutInfo(){ 
			if(!submitConfig.checkData.address || !submitConfig.checkData.address.address_id){
				return JNC.alert("请选择收货地址！"),!1
			}
			if(!submitConfig.checkData.logistics){
				return JNC.alert("请选择物流方式！"),!1
			}
			if(!submitConfig.checkData.invoice){
				return JNC.alert("请选择发票类型"),!1
			}else if(submitConfig.checkData.invoice!=="not"){
				var pass=!1;
				$("#J_invoiceInfo").find(".invoiceInput").each(function(){
					if(!$(this).closest(".invoice_info").hasClass("hide")){
						return pass=validation($(this)),pass ? void 0 : !1
					}
				})
				return pass ? saveSubmit() : !1;
			}
			saveSubmit()
		}
		function  validation(ele){
			if(ele.length){
				var name=ele.attr("name"),
					val=$.trim(ele.val()),
					rule; 
				if(name==="invoice_title"){
					if(val.length===0){
						return invoiceError(ele,"发票抬头不能为空"),msgScroll(".section-invoice"),!1;
					}else if(val.length>50){
						return invoiceError(ele,"发票抬头必须小于50个字"),msgScroll(".section-invoice"),!1;
					}
					submitConfig.checkData.invoiceTitle=val
				}else if(name==="invoice_company"){
					rule=/^[0-9A-Z]{15,20}$/;
					if(!rule.test(val)){
						return invoiceError(ele,"纳税人识别号为15-20位数字或大写字母，请正确填写！"),msgScroll(".section-invoice"),!1 
					}
					submitConfig.checkData.invoiceCompany=val
				}else if(name==="invoice_phone"){
					rule=/^1[0-9]{10}$/;
					if(!rule.test(val)){
						return invoiceError(ele,"请输入正确的手机号"),msgScroll(".section-invoice"),!1
					}
					submitConfig.checkData.invoicePhone=val
				}else if(name==="invoice_email"){
					rule=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
					if(!rule.test(val)){
						return invoiceError(ele,"请输入正确的邮箱地址"),msgScroll(".section-invoice"),!1;
					}
					submitConfig.checkData.invoiceEmail=val
				}
				return !0
			}
		}
		function msgScroll(doc){
			if($(doc).length){
				var top=$(doc).offset().top;
				$("html,body").animate({
					scrollTop:top
				},500)
			}
		}
		function invoiceError(ele,tip){
			if(ele.siblings(".tooltip").length>0){
				return !1
			}else{
				ele.after('<div class="tooltip top"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+tip+'</div></div>');
				ele.on("keydown",function(){
					ele.siblings(".tooltip").remove();
				})
			}
		}
		function saveSubmit(){
			var datas={
				address_id:submitConfig.checkData.address.address_id,
				logistics:submitConfig.checkData.logistics,
				invoice:submitConfig.checkData.invoice
			};
			if(datas.invoice!=="not" && submitConfig.checkData.invoice_way){
				datas.invoice_object=submitConfig.checkData.invoice_way,
				datas.invoice_title=submitConfig.checkData.invoiceTitle,
				datas.invoice_email=submitConfig.checkData.invoiceEmail
				if(submitConfig.checkData.invoice_way==="company"){
					datas.invoice_company=submitConfig.checkData.invoiceCompany
				}
			}
			console.log(datas)
//			$.ajax({
//				type:"post",
//				url:"",
//				data:{
//					checkout:datas
//				},
//				timeout:10000,
//				error:function(){},
//				success:function(r){
					//**********后台删除**********
					//成功后跳到buy.html订单支付页面
					var r={code:1,data:{order_id:147852369},msg:"错误信息"};
					//**********end**********
					 if(r.code===1){
					 	submitConfig.checkData.orderId=r.data.order_id,
					 	location.href="buy.html?id="+r.data.order_id
					 }else{
					 	JNC.alert(r.msg)
					 }
//				}
//			});
		}
		var submitConfig = {
				checkData: {
					address:{}
				},
				logisticsFee:10
			},
			eventBind = function() {
				$("#J_addressList").on("click", ".J_addressItem", function(t) { //选择收货地址
					t.preventDefault(),
					$("#J_addressList").find(".J_addressItem").removeClass("selected"),
					$(this).addClass("selected"),
					submitConfig.checkData.address = selectedAddress($(this));
				}),
				$("#J_addressList").on("click", ".J_addressModify", function(t) { //修改收货地址
					t.preventDefault(), t.stopPropagation();
					var item = $(this).closest(".J_addressItem"),
						getdata=selectedAddress(item);
					JNC.addressModify.editAddress({
						type: "change",
						addressData: getdata,
						callback: function(options) {
							changeAddress(options)
						}
					})
				}),
				$("#J_newAddress").on("click", function(t) { //添加收货地址
					t.preventDefault(),
					JNC.addressModify.editAddress({
						type: "new",
						callback: function(options) {
							newAddressTemplate(options)
						}
					})
				}),
				defaults(),
				$("#J_addressMore").on("click",function(){ //更多收货地址
					var sle=$("#J_addressList").find(".selected");
					if(sle && sle.index()>2){
						sle.insertBefore($(".J_addressItem").eq(0))
					}
					$("#J_addressList").find(".J_addressItem:gt(2)").toggleClass("hide"),
					$(this).find(".text").toggleClass("hide");
				}),
				
				$("#J_logisticsList").on("click",".J_option",function(){ //物流方式
					$(this).addClass("selected").siblings(".J_option").removeClass("selected");
					var type=$(this).attr("data-type"),
						val=$(this).attr("data-value");
					submitConfig.checkData[type]=val;
				}),
				$(".J_invoiceList").on("click",".J_option",function(){ //发票类型
					$(this).addClass("selected").siblings(".J_option").removeClass("selected");
					var type=$(this).attr("data-type"),
						val=$(this).attr("data-value");
					submitConfig.checkData[type]=val;
					if(val!=="not"){
						$("#J_invoiceTitle").removeClass("hide"),
						$("#J_invoiceInfo").removeClass("hide")
					}else{
						$("#J_invoiceTitle").addClass("hide"),
						$("#J_invoiceInfo").addClass("hide")
					}
				}),
				$("#J_invoiceTitle").on("click",".J_option",function(){ //发票抬头
					$(this).addClass("selected").siblings(".J_option").removeClass("selected");
					var type=$(this).attr("data-type"),
						val=$(this).attr("data-value");
					submitConfig.checkData[type]=val;
					if(val==="company"){
						$("#invoice_company").closest(".invoice_info").removeClass("hide")
					}else{
						$("#invoice_company").closest(".invoice_info").addClass("hide")
					}
				}),
				$("#J_submitPay").on("click",function(){
					var disable=$(this).hasClass("btn-disabled");
					if(!disable){
						checkoutInfo()
					}
				})
				JNC.addressModify.init()
			};
		return {
			init: eventBind
		}
	}(),
	$(function() {
		JNC.submitOrder.init()
	})
}, function(e, t, r) {
	JNC.namespace("addressModify"), JNC.addressModify = {
		init: function() {
			var s = this;
			this.userAddress = {},
				this.options = {
					type: "new",
					addressData: {},
					callback: $.noop
				},
				this.createDom(),
				this.formElem = {
					$modal: $("#addressModal"),
					$picker: $(".distpicker"),
					$name: $("#J_consigneeInput"),
					$phone: $("#J_telephoneInput"),
					$cityPicker: $("#city-picker3"),
					$detail: $("#J_detailInput"),
					$zipcode: $("#J_zipcodeInput"),
					$check: $("#checkReg")
				},
				$("#J_saveAddress").on("click", function() {
					var j = !1;
					s.saveSelectAddress(j);
					$(".J_addressText").each(function() {
						return j = s.validation($(this)), j ? void 0 : !1
					}), j && s.saveAddress()
				})
		},
		createDom: function() {
			var multi = multiline(function() {
				/*!@tpl
				 	<div class="modal fade" aria-hidden="false" id="addressModal">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="iconfont icon-close"></i></button>
					        <h4 class="modal-title" id="gridSystemModalLabel">填写收货地址</h4>
					      </div>
					      <div class="modal-body">
					        <div class="form-group row">
					        	<fieldset class="form-section">
									<label class="input-label" for="J_consigneeInput">收货人姓名</label>
									<input class="input-text J_addressText" type="text" id="J_consigneeInput" name="consignee" placeholder="收货人姓名" autocomplete="off" />
								</fieldset>
								<fieldset class="form-section">
									<label class="input-label" for="J_telephoneInput">联系电话</label>
									<input class="input-text J_addressText" type="text" id="J_telephoneInput" name="phone" placeholder="11位手机号（必填）" autocomplete="off" />
								</fieldset>
								<fieldset class="form-section">
									<label class="input-label" for="city-picker3">收货地址</label>
									<div class="distpicker J_addressText" name="three_address" style="position: relative;" >
										<input id="city-picker3" class="input-text" type="text" data-toggle="city-picker" readonly />
									</div>
								</fieldset>
								<fieldset class="form-section">
									<label class="input-label" for="J_detailInput">详细地址</label>
									<textarea class="input-text J_addressText" name="user_adress" id="J_detailInput" placeholder="路名或街道地址，门牌号"></textarea>
								</fieldset>
								<fieldset class="form-section">
									<label class="input-label" for="J_zipcodeInput">邮政编码</label>
									<input class="input-text J_addressText" type="text" name="user_zipcode" id="J_zipcodeInput"  placeholder="必填" autocomplete="off" />
								</fieldset>
					        </div>
					        <div class="row">
					        	<input type="checkbox"  name="checkReg" id="checkReg" class="iconfont"/>
								<span class="text">完成后设置为默认地址</span>
					        </div>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
					        <button type="button" class="btn btn-primary" id="J_saveAddress">保存</button>
					      </div>
					    </div>
					  </div>
					</div>
				 */
			});
			$("body").append(multi)
		},
		editAddress: function(f) {
			var _this = this;
			_this.options = $.extend(_this.options, f); //遍历数组元素,并修改第一个对象
			if ("new" === _this.options.type) {
				_this.revertForm(),
				_this.showModal()
			} else if ("change" === _this.options.type) {
				_this.setFormData(),
				_this.showModal()
			}
		},
		showModal: function() {
			var t = this;
			$(".tooltip").remove(), JNC.threeAddress();
			t.formElem.$modal.modal({
				show: !0,
				backdrop: "static"
			}).one("hidden", function() {
				t.revertForm()
			})
		},
		setFormData: function() {
			var _this = this,
				j = !1,
				d = _this.options.addressData;
			parseInt(d.status) === 1 ? j = !0 : j = !1,
			_this.formElem.$cityPicker.removeClass(".city-picker-input").val(d.areas).siblings().remove();
			setTimeout(function() {
				_this.formElem.$name.val(d.consignee),
					_this.formElem.$phone.val("").attr("placeholder", d.phone),
					_this.formElem.$detail.val(d.detail),
					_this.formElem.$zipcode.val(d.zipcode),
					_this.formElem.$check.attr("checked", j)
			}, 200)
		},
		revertForm: function() {
			var _this = this;
			_this.formElem.$name.val(""),
				_this.formElem.$phone.val("").attr("placeholder", "11位手机号"),
				_this.formElem.$detail.val(""),
				_this.formElem.$zipcode.val(""),
				_this.formElem.$cityPicker.val("").siblings().remove()
		},
		saveSelectAddress: function(e) {
			var t = this,
				r = t.formElem.$picker;
			t.userAddress.province = r.find(".select-item[data-count='province']").html(),
			t.userAddress.city = r.find(".select-item[data-count='city']").html(),
			t.userAddress.district = r.find(".select-item[data-count='district']").html(),
			t.userAddress.areas = t.userAddress.province + " " + t.userAddress.city + " " + t.userAddress.district
		},
		validation: function(e) {
			if (e.length) {
				var t, r = this,
					s = e.attr("name"),
					a = $.trim(e.val());
				if ("consignee" === s) {
					if (t = /^[a-zA-Z\u4e00-\u9fa5·]+$/, a.length < 2 || a.length > 20) return r.errorVal(e, "收货人姓名，最少2个最多20个中文字"), !1;
					if (!t.test(a)) return r.errorVal(e, "收货人姓名不正确（只能是英文、汉字）"), !1;
					r.userAddress.consignee = a
				} else if ("phone" === s) {
					if (t = /^1[0-9]{10}$/, !t.test(a) && "change" !== r.options.type) return r.errorVal(e, "请输入正确的手机号"), !1;
					if ("change" === r.options.type && "" !== a && !t.test(a)) return r.errorVal(e, "请输入正确的手机号"), !1;
					r.userAddress.phone = a
				} else if ("three_address" === s) {
					if (!(r.userAddress.province && r.userAddress.city && r.userAddress.district)) return r.errorVal(e, "请选择地址"), !1
				} else if ("user_adress" === s) {
					a = a.replace(/</g, "").replace(/>/g, "").replace(/\//g, "").replace(/\\/g, ""), t = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					var i = /^\d+$/,
						d = /^[0-9a-zA-Z]+$/;
					if (a.length < 5 || a.length > 32) return r.errorVal(e, "详细地址长度不对，最小为 5 个字，最大32个字"), !1;
					if (t.test(a) || i.test(a) || d.test(a)) return r.errorVal(e, "详细地址不正确"), !1;
					r.userAddress.detail = a
				} else if ("user_zipcode" === s) {
					if (t = /^\d{6}$/, !t.test(a)) return r.errorVal(e, "邮编是6位数字"), !1;
					r.userAddress.zipcode = a
				}
				return !0;
			}
		},
		errorVal: function(e, n) {
			e.after('<div class="tooltip top"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + n + '</div></div>');
			e.on("keydown", function() {
					e.siblings(".tooltip").remove();
				}),
				$(".distpicker").on("click", function() {
					e.siblings(".tooltip").remove();
				})
		},
		saveAddress: function() {
			var _this = this,
				getAddress = {
					consignee: _this.userAddress.consignee,
					phone: _this.userAddress.phone,
					areas: _this.userAddress.areas,
					detail: _this.userAddress.detail,
					zipcode: _this.userAddress.zipcode
				};
			$("#checkReg").is(":checked") ? _this.userAddress.status=getAddress.status = 1 : _this.userAddress.status=getAddress.status = 0;
			if("change" === _this.options.type){
				getAddress.address_id = _this.options.addressData.address_id;
			}
			//console.log(getAddress)
//			$.ajax({
//				type:"post",
//				url:"",
//				dataType:"json",
//				data:{
//					newAdd:getAddress
//				},
//				timeout:10000,
//				success:function(r){
	
				//***********后台删除***********
					var r={code:1,data:{address_id:1002}};
				//***********end***********
				
					if(r && r.code===1){
						_this.formElem.$modal.modal("hide"),
						_this.userAddress.address_id=r.data.address_id;
						if("function" == typeof _this.options.callback){
							"change" != _this.options.type || _this.userAddress.phone || (_this.userAddress.phone=_this.options.addressData.phone);
							_this.options.callback(_this.userAddress)
						}
					}else{
						JNC.alert(r.msg)
					}
//				}
//			});
		}
	}
}, function(e, t, r) {+function(t){"use strict";function e(e,s){return this.each(function(){var n=t(this),o=n.data("bs.modal"),a=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);o||n.data("bs.modal",o=new i(this,a)),"string"==typeof e?o[e](s):a.show&&o.show(s)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var s=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){s.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(s.$element)&&(s.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&s.$element.hasClass("fade");s.$element.parent().length||s.$element.appendTo(s.$body),s.$element.show().scrollTop(0),s.adjustDialog(),n&&s.$element[0].offsetWidth,s.$element.addClass("in"),s.enforceFocus();var o=t.Event("shown.bs.modal",{relatedTarget:e});n?s.$dialog.one("bsTransitionEnd",function(){s.$element.trigger("focus").trigger(o)}).emulateTransitionEnd(i.TRANSITION_DURATION):s.$element.trigger("focus").trigger(o)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var s=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;o?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){s.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})};var s=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=s,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var s=t(this),n=s.attr("href"),o=t(s.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),a=o.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},o.data(),s.data());s.is("a")&&i.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){s.is(":visible")&&s.trigger("focus")})}),e.call(o,a,this)})}(jQuery)
},function(e, t, r) {+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,s=this;t(this).one("bsTransitionEnd",function(){i=!0});return setTimeout(function(){i||t(s).trigger(t.support.transition.end)},e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery)
},function(e, t, r) {
	JNC.namespace("threeAddress"), JNC.threeAddress = function() {
		function t(e, i) {
			this.$element = $(e), 
			this.$dropdown = null, 
			this.options = $.extend({}, t.DEFAULTS, $.isPlainObject(i) && i), 
			this.active = !1, this.dems = [], this.needBlur = !1, 
			this.init()
		}
		if ("undefined" == typeof ChineseDistricts) throw new Error('The file "city-picker.data.js" must be included first!');
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
					i = '<span class="city-picker-span" style="height:' + (t.height - 3) + "px;line-height:" + (t.height - 3) + 'px;">' + (e ? '<span class="placeholder">' + e + "</span>" : "") + '<span class="title"></span><div class="arrow iconfont icon-down"></div></span>',
					s = '<div class="city-picker-dropdown" style="left:0px;top:100%;"><div class="city-select-wrap"><div class="city-select-tab"><a class="active" data-count="province">省份</a>' + (this.includeDem("city") ? '<a data-count="city">城市</a>' : "") + (this.includeDem("district") ? '<a data-count="district">区县</a>' : "") + '</div><div class="city-select-content"><div class="city-select province" data-count="province"></div>' + (this.includeDem("city") ? '<div class="city-select city" data-count="city"></div>' : "") + (this.includeDem("district") ? '<div class="city-select district" data-count="district"></div>' : "") + "</div></div>";
				this.$element.addClass("city-picker-input"), this.$textspan = $(i).insertAfter(this.$element), 
				this.$dropdown = $(s).insertAfter(this.$textspan);
				var n = this.$dropdown.find(".city-select");
				$.each(this.dems, $.proxy(function(t, e) {
					this["$" + e] = n.filter("." + e)
				}, this)), this.refresh()
			},
			refresh: function(t) {
				this.$dropdown.find(".city-select").data("item", null);
				var e = this.$element.val() || ""; 
				e = e.split(" "), 
				$.each(this.dems, $.proxy(function(i, s) {
					e[i] && i < e.length ? this.options[s] = e[i] : t && (this.options[s] = ""), this.output(s)
				}, this)), this.tab("province"), this.feedText(), this.feedVal()
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
				return t = this.$element.position(),s = this.getSize(this.$element),e = s.height, i = s.width, this.options.responsive && (n = this.$element.offsetParent().width()) && ((i /= n) > .99 && (i = 1), i = 100 * i + "%"), {
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
				}), this.$dropdown.on("click", ".city-select a", function() {
					var i = $(this).parents(".city-select"),
						s = i.find("a.active"),
						n = 0 === i.next().length;
					s.removeClass("active"), $(this).addClass("active"), s.data("code") !== $(this).data("code") && ("district" === i.data("count") && $("#J_zipcodeInput").val($(this).data("zipcode")), i.data("item", {
						address: $(this).attr("title"),
						code: $(this).data("code")
					}), $(this).trigger(e), t.feedText(), t.feedVal(), n && t.close())
				}).on("click", ".city-select-tab a", function() {
					if (!$(this).hasClass("active")) {
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
					if ("province" === t) {
						s = [];
						for (var n = 0; n < i.length; n++) i[n].address === o && (c = {
							code: i[n].code,
							address: i[n].address
						}), s.push({
							code: i[n].code,
							address: i[n].address,
							selected: i[n].address === o
						});
						r[e] = s
					}else if("city"===t){
						if(i===o){
							c = {
								code: e,
								address: i
							}
						}
						r.push({
							code: e,
							address: i,
							selected: i === o
						})
					}else if("district"===t){
						if(i.name===o){
							c = {
								code: e,
								address: i.name
							}
						}
						r.push({
							code: e,
							address: i,
							selected: i.name === o
						})
					}
				}),d.html("province" === t ? this.getProvinceList(r) : t === i ? this.getCityList(r) : this.getDistrictList(r)),d.data("item", c))
			},
			getProvinceList: function(t) {
				var e = [],
					i = this,
					s = this.options.simple;
				return $.each(t, function(t, n) {
					e.push('<dl class="clearfix">'), e.push("<dt>" + t + "</dt><dd>"), $.each(n, function(t, n) {
						e.push('<a title="' + (n.address || "") + '" data-code="' + (n.code || "") + '" class="' + (n.selected ? " active" : "") + '">' + (s ? i.simplize(n.address, "province") : n.address) + "</a>")
					}), e.push("</dd></dl>")
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
				return e.push('<dl class="clearfix"><dd>'), $.each(t, function(t, n) {
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
		}, t.DEFAULTS = {
			simple: !1,
			responsive: !1,
			placeholder: "请选择省/市/区",
			level: "district",
			province: "",
			city: "",
			district: ""
		}, t.setDefaults = function(e) { 
			$.extend(t.DEFAULTS, e)
		}, t.other = $.fn.citypicker, 
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
	}
}])