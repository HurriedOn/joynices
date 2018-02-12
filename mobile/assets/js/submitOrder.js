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
	JNC.submitOrder=function(){
		function defaultAddress(){
//			$.ajax({
//				url:"",
//				dataType: "json",
//				timeout:10000,
//				error: function() {
//					JNC.alert("网络出错，请刷新页面！")
//				},
//				success: function(response) {
					var response={code:1,msg:"错误信息"};
					response.data={
						address_id:'1001',
						name:'姬月',
						phone:'133****8900',
						city:'北京市 北京市 西城区',
						detail:'益田路3008号皇都广场C座',
						zipcode:100032
					};
					if(response && response.code===1){
						checkData.address=response.data, 
						checkAddress(),
						templateAddress(),
						$(".main").show(),
						$("#J_loading").addClass("hide")
					}else{
						JNC.alert(response.msg)
					}
					
//				}
//			})
		}
		function checkAddress(){
			if(!checkData.address){
				$("#J_addressItem").html('<div class="address-empty">请填写收货地址</div>')
			}
		}
		function templateAddress(){
			if(checkData.address){
				var temp=doT.template($("#J_newAddressTemplate").html()),
					tempHtml=temp(checkData.address);
				$("#J_addressItem").html(tempHtml),
				$("#J_tips").html('配送至：'+checkData.address.city+' '+checkData.address.detail)
				bindEvent()
			}
		}
		function  validation(ele){
			if(ele.length){
				var name=ele.attr("name"),
					val=$.trim(ele.val()),
					rule; 
				if(name==="invoice_title"){
					if(val.length===0){
						return JNC.alert("发票抬头不能为空"),false;
					}else if(val.length>50){
						return JNC.alert("发票抬头必须小于50个字"),false;
					}
					checkData.invoiceTitle=val
				}else if(name==="invoice_company"){
					rule=/^[0-9A-Z]{15,20}$/;
					if(!rule.test(val)){
						return JNC.alert("纳税人识别号为15-20位数字或大写字母，请正确填写！"),false 
					}
					checkData.invoiceCompany=val
				}else if(name==="invoice_phone"){
					rule=/^1[0-9]{10}$/;
					if(!rule.test(val)){
						return JNC.alert("请输入正确的手机号"),false
					}
					checkData.invoicePhone=val
				}else if(name==="invoice_email"){
					rule=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
					if(!rule.test(val)){
						return JNC.alert("请输入正确的邮箱地址"),false
					}
					checkData.invoiceEmail=val
				}
				return true
			}
		}
		function checkoutInfo(){
			var orderInfo={
					address_id:checkData.address.address_id,
					logistics:checkData.logistics,
					invoice:checkData.invoice,
					pay_way:checkData.pay_way
				},pass=true;
			if(orderInfo.invoice!=="not"){
				orderInfo.invoice_object=checkData.invoice_object,
				orderInfo.invoice_title=checkData.invoiceTitle,
				orderInfo.invoice_phone=checkData.invoicePhone,
				orderInfo.invoice_email=checkData.invoiceEmail
				if(checkData.invoice_object==="company"){
					orderInfo.invoice_company=checkData.invoiceCompany
				}
			}
			console.log(orderInfo)
			// $.ajax({
			// 	type:"post",
			// 	url:"",
			// 	data:{
			// 		checkout:orderInfo
			// 	},
			// 	timeout:10000,
			// 	error:function(){

			// 	},
			// 	success:function(){

			// 	}
			// })
		}
		
		function bindEvent(){
			//物流方式
			$("#J_logisticsList").on("click",".J_option",function(){ 
				$(this).addClass("selected").siblings(".J_option").removeClass("selected");
				var type=$(this).attr("data-type"),
					val=$(this).attr("data-value");
				checkData[type]=val;
			});
			//支付方式
			$("#J_payWay").on("click","input[type=radio]",function(){ 
				if($(this).is(":checked")){
					var _option=$(this).closest(".J_option");
					_option.addClass("selected").siblings(".J_option").removeClass("selected");
					var type=_option.attr("data-type"),
						val=_option.attr("data-value");
					checkData[type]=val; 
				}
			});
			//发票类型
			$("#J_invoiceType").on("click",".J_option",function(){
				$(this).addClass("selected").siblings(".J_option").removeClass("selected");
				var type=$(this).attr("data-type"),
					val=$(this).attr("data-value");
				checkData[type]=val;
				if(val!=="not"){
					$("#J_invoiceObject").removeClass("hide"),
					$("#J_invoiceInfo").removeClass("hide")
				}else{
					$("#J_invoiceObject").addClass("hide"),
					$("#J_invoiceInfo").addClass("hide")
				}
			});
			//发票抬头
			$("#J_invoiceObject").on("click",".J_option",function(){ 
				$(this).addClass("selected").siblings(".J_option").removeClass("selected");
				var type=$(this).attr("data-type"),
					val=$(this).attr("data-value");
				checkData[type]=val;
				if(val==="company"){
					$("#invoice_company").closest(".invoice-info").removeClass("hide")
				}else{
					$("#invoice_company").closest(".invoice-info").addClass("hide")
				}
			});
			//选择收货地址
			$("#J_addressModify").on("click",function(){
				location.href="address.html?type=checkout"
			});
			//提交支付
			$("#J_submitPay").on("click",function(){
				var disable=$(this).hasClass("btn-disabled");
				if(!disable){ 
					if(checkData.invoice && checkData.invoice!=="not"){
						var _pass=false;
						$("#J_invoiceInfo").find(".invoiceInput").each(function(){
							if(!$(this).closest(".invoice-info").hasClass("hide")){
								return _pass=validation($(this)),_pass ? void 0 : false
							}
						});
						return _pass ? checkoutInfo() : false;
					}else{
						checkoutInfo()
					}
				}
			})
		}
		function getOptions(){
			$(".J_option").each(function() {
				var sel = $(this).hasClass("selected");
				if (sel) {
					var type = $(this).attr("data-type"),
						val = $(this).attr("data-value");
					if (!type) return;
					checkData[type] =val
				}
			})
		}
		var checkData={},
			Z=function(){
				getOptions(),
				defaultAddress()
			};
		return {
			init:Z
		}
	}(),
	$(function(){
		JNC.submitOrder.init()
	})
}])