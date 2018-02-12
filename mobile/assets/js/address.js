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
	i(2),
	JNC.address=function(){ 
		function requestData(){
//			$.ajax({
//				url:"",
//				dataType:"json",
//				timeout:10000,
//				erro:function(){
//					JNC.alert("网络出错，请刷新页面！")
//				},
//				success:function(response){
					//*******例：后台获取的数据********
					var response={code:1,msg:"错误信息"};
					response.data=[
						{
							address_id:'1001',
							name:'姬月',
							phone:'133****8900',
							city:'北京市 北京市 西城区',
							detail:'益田路3008号皇都广场C座',
							default_status:1,
							zipcode:100032
						},
						{
							address_id:'1002',
							name:'Tom',
							phone:'153****6934',
							city:'天津市 天津市 河东区',
							detail:'常州道街道中兴中路180号',
							default_status:0,
							zipcode:300171
						}
					];
					//*******end********
					
					if(response && response.code===1){
						listData=response.data, 
						checkData(),
						templateAddress(),
						$(".main").show(),
						$("#J_loading").addClass("hide")
					}else{
						JNC.alert(response.msg)
					}
//				}
//			});
		}
		function checkData(){
			if(listData.length<=0){
				$(".section-address").html('<div class="empty-box"><img src="../assets/img/no_order.png" /><div class="no-data"><p class="empty">您的收货地址还是空的哦～</p></div></div>')
			}
		}
		function templateAddress(){
			if(listData.length>0){
				var temp=doT.template($("#J_addressTemplate").html()),
					tempHtml=temp(listData);
				$("#J_addressBox").html(tempHtml),
				checkUrl(),
				bindEvent()
			}
		}
		function getData(item){
			if(item.length){
				var arr={};
				arr.id=item.attr("data-id"),
				arr.status=item.attr("data-status"),
				arr.phone=item.attr("data-phone"),
				arr.name=item.attr("data-name"),
				arr.city=item.attr("data-city"),
				arr.detail=item.attr("data-detail"),
				arr.zipcode=item.attr("data-zipcode");
				return arr
			}
		}
		function bindEvent(){
			$(".J_addressDelete").on("click",function(e){  //删除
				e.preventDefault();
				var _this=$(this),
					item=$(this).closest(".J_addressItem");
				
				$(this).hasClass("disabled") || JNC.confirm('确定删除该地址吗？',function(i) {
					if (i.index == 1) {
						_this.addClass("disabled");
//						$.ajax({
//							url:"",
//							data:{
//								id=_this.attr("data-id")
//							},
//							success:function(r){
								var r={code:1};
								_this.removeClass("disabled")
								if(r.code===1){
									item.remove()
								}
//							}
//						});
					}
				})
			});
			//选择订单提交地址
			$(".J_addressModify>.J_choose").on("click","input[type=radio]",function(e){
				e.preventDefault(); 
				var item=$(this).closest(".J_addressItem");
					adid=item.attr("data-id");
				// $.ajax({
				// 	url:"",
				// 	data:{
				// 		address_id:adid
				// 	},
				// 	success:function(){
						location.href="submitOrder.html"
				// 	}
				// })
				return false
			});
			//修改
			$(".J_addressModify").on("click",function(e){ 
				e.preventDefault(); 
				var item=$(this).closest(".J_addressItem");
					adid=item.attr("data-id");
				checkoutData=getData(item); 
				JNC.addressModify.editAddress({
					type:"edit",
					addressData:checkoutData,
					callback:function(){
						location.reload()
					}
				})
			});
			//添加
			$("#J_addBtn").on("click",function(e){ 
				e.preventDefault(); 
				JNC.addressModify.editAddress({
					type:"add",
					callback:function(){
						location.reload()
					}
				})
			});
		}
		function checkUrl(){
			//检验是否为订单提交选择地址
			if(document.referrer.indexOf("submitOrder")!==-1){
				$(".J_addressDelete").remove(),
				$(".J_choose").removeClass("hide")
			}
		}
		var listData=null,
			checkoutData={},
			Z=function(){
				requestData(),JNC.addressModify.init()
			};
		return{
			init:Z
		}
	}();
	$(document).ready(function(){
		JNC.address.init()
	})
},function(t,e,i){
	new MultiPicker({
        input: 'J_cityInput',
        container: 'targetContainer',
        jsonData: $city,
        success: function (arr) {
        	var a=""; 
            for(var i=0;i<arr.length;i++){
            	a+=arr[i].value+" ";
            }
            document.getElementById("J_cityInput").value=a;
        }
    });
    JNC.addressModify={
    	init:function(){
	    	var _this=this;
	    	this.userAddress={},
	    	this.options={},
	    	this.formElem={
	    		$modal:$("#J_edit"),
	    		$name:$("#J_consigneeInput"),
	    		$phone:$("#J_telephoneInput"),
	    		$city:$("#J_cityInput"),
	    		$detail:$("#J_detailInput"),
	    		$zipcode:$("#J_zipcodeInput"),
	    		$check:$("#checkReg")
	    	}
	    	
    	},
    	editAddress:function(config){
    		var _this=this;
    		_this.options=$.extend(_this.option,config); 
    		"add"===_this.options.type ? (_this.revertForm) : "edit"===_this.options.type && _this.setFormData();
    		$("#J_list").hide(),$("#J_edit").show(),
    		$(".address-footer").html('<a class="btn btn-primary btn-sign" id="J_saveBtn" href="javascript:void(0);">确认</a>');
    		
    		$("#J_saveBtn").on("click",function(){
	    		var verdict=false;
	    		$(".J_addressText").each(function(){
	    			return verdict=_this.validation($(this))
	    		}),
	    		verdict && _this.saveAddress()
	    	})
    	},
    	revertForm:function(){
    		var _this=this;
    		_this.formElem.$name.val(""),
    		_this.formElem.$phone.val(""),
    		_this.formElem.$city.val(""),
    		_this.formElem.$detail.val(""),
    		_this.formElem.$zipcode.val("")
    	},
    	setFormData:function(){ 
    		var _this=this,
    			info=_this.options.addressData,
    			defaults=false; 
    		parseInt(info.status)===1 ? defaults=true : defaults=false;
    		
			_this.formElem.$name.val(info.name),
			_this.formElem.$phone.val("").attr("placeholder", info.phone),
			_this.formElem.$city.val(info.city),
			_this.formElem.$detail.val(info.detail),
			_this.formElem.$zipcode.val(info.zipcode),
			_this.formElem.$check.attr("checked",defaults)
    	},
    	validation: function(elem) { 
			if(elem.length) {
				var t, 
					_this = this,
					name = elem.attr("name"),
					val = $.trim(elem.val()); 
				if("consignee" === name) {
					if(t = /^[a-zA-Z\u4e00-\u9fa5·]+$/, val.length < 2 || val.length > 20) return JNC.alert("收货人姓名，最少2个最多20个中文字"), !1;
					if(!t.test(val)) return JNC.alert("收货人姓名不正确（只能是英文、汉字）"), !1;
					_this.userAddress.consignee = val
				}else if("phone" === name) {
					if (t = /^1[0-9]{10}$/, !t.test(val) && "edit" !== _this.options.type) return JNC.alert("请输入正确的手机号"), !1;
					if ("edit" === _this.options.type && "" !== val && !t.test(val)) return JNC.alert("请输入正确的手机号"), !1;
					_this.userAddress.phone = val
				}else if("city" === name) { 
					if(val.length<1) return JNC.alert("请选择地址"), !1;
					_this.userAddress.city = val
				}else if("user_adress" === name) {
					val = val.replace(/</g, "").replace(/>/g, "").replace(/\//g, "").replace(/\\/g, ""), t = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					var i = /^\d+$/,
						d = /^[0-9a-zA-Z]+$/;
					if(val.length < 5 || val.length > 32) return JNC.alert("详细地址长度不对，最小为 5 个字，最大32个字"), !1;
					if(t.test(val) || i.test(val) || d.test(val)) return JNC.alert("详细地址不正确"), !1;
					_this.userAddress.detail = val
				}else if("user_zipcode" === name) {
					if(t = /^\d{6}$/, !t.test(val)) return JNC.alert("邮编是6位数字"), !1;
					_this.userAddress.zipcode = val
				}   
				return !0;
			}
		},
		saveAddress:function(){
			var _this=this,
				_url="add.php",
				info={
					consignee:_this.userAddress.consignee,
					phone:_this.userAddress.phone,
					city:_this.userAddress.city,
					detail:_this.userAddress.detail,
					zipcode:_this.userAddress.zipcode
				};
				
			$("#checkReg").is(":checked") ? info.status=1 : info.status=0;
			if("edit"===_this.options.type){
				info.address_id=_this.options.addressData.id,
				_url="edit.php";
			}
//			$.ajax({
//				type:"post",
//				url:_url,
//				dataType:"json",
//				data:{
//					newAddress:info
//				},
//				timeout:10000,
//				error:function(){},
//				success:function(r){
					var r={code:1,msg:"错误"};
					
					if(r.code===1){
						"function"==typeof _this.options.callback && _this.options.callback()
					}else{
						JNC.alert(r.msg)
					}
					
//				}
//			});
		}
    }
}])