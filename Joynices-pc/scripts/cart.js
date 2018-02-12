! function(e) {
	function t(i) {
		if (a[i]) return a[i].exports;
		var o = a[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
	}
	var a = {};
	return t.m = e, t.c = a, t.p = "", t(0)
}([function(e, t, a) {
	e.exports = a(1)
}, function(e, t, a) {
	JNC.cart=function(){
		function requestData(){
//			$.ajax({
//				url: ,
//				dataType: "json",
//				timeout: 10000,
//				error: function() {
//					JNC.alert("网络出错，请刷新页面！")
//				},
//				success: function(response) {
	
					//*******后台删除********
					var response={code:1,msg:"错误"};
					response.data=[
						{listId:'1001',productName:'F19S 单机',imageUrl:'../images/product/f19s-angle2!60x60.jpg',productUrl:"product-buy.html",salePrice:'6499',subtotal:'6499',selStatus:0,num:1,buyLimit:5},
						{listId:'1002',productName:'F19S-智能飞行电池',imageUrl:'../images/product/f19s-dc1!60x60.jpg',productUrl:"product-buy-acce.html",salePrice:'299',subtotal:'1495',selStatus:1,num:5,buyLimit:5}
					];
					//*******end********
					if(response && 1 === response.code){
						defaultCart.cartData = response.data, 
						checkData(), templateCart(),
						defaultCart.selNum = 0,
						defaultCart.totalNum = 0,
						defaultCart.totalPrice=0,
						$("#J_cartLoading").addClass("hide")
					}else{
						JNC.alert(response.msg)
					}
//				}
//			})
		}
		function checkData(){
			if(defaultCart.cartData.length<=0){
				$("#J_cartEmpty").removeClass("hide"),$("#J_cartBox").addClass("hide");
				//$.cookie("userId") || $("#J_cartEmpty").addClass("nologin")  
				//检验用户是否登录,没有登录时执行$("#J_cartEmpty").addClass("nologin")
			}else{
				$.each(defaultCart.cartData, function(i,t) { 
					defaultCart.totalNum+=parseInt(t.num);
					if(1===t.selStatus){
						defaultCart.selNum+=parseInt(t.num),
						defaultCart.totalPrice+=parseInt(t.salePrice)*parseInt(t.num)
					}
				});
				$("#J_cartTotalPrice").text(defaultCart.totalPrice),
				$("#J_cartTotalNum").text(defaultCart.totalNum),
				$("#J_selTotalNum").text(defaultCart.selNum),
				defaultCart.selNum===defaultCart.totalNum && defaultCart.selNum>0 ? $("#J_checkAll").addClass("checked"):$("#J_checkAll").removeClass("checked"),
				
				defaultCart.selNum>0 ? $("#J_goBuy").removeClass("btn-disabled").addClass("btn-primary") : $("#J_goBuy").removeClass("btn-primary").addClass("btn-disabled")
			}
		}
		function templateCart(){
			if(defaultCart.cartData.length>0){
				var temp=doT.template($("#J_cartTemplate").html()),
					tempHtml=temp(defaultCart.cartData);  
				$("#J_cartListBody").html(tempHtml),$("#J_cartBox").removeClass("hide"),bindEvent()
			}
		}
		function bindEvent(){  
			$(".J_delete").off().on("click",function(){
				return deleteCart($(this).attr("id")),false
			}),
			$(".J_num").off().on("blur",function(){
				var val=parseInt($(this).val()),
					num=parseInt($(this).attr("data-num")),
					limit=parseInt($(this).attr("data-limit")),
					id=$(this).attr("name"),
					isNum=$.isNumeric(val);
				if(isNum){
					if(val===num) return false;
					if(val<1) return $(this).val(num),false;
					if(val>limit) return setValue("input",id,limit), JNC.alert("该商品数量不能大于"+limit),false;
					setValue("input",id,val)
				}else JNC.alert("输入的数量只能是数字！"),$(this).val(num)
			}),
			$(".J_minus").off().on("click",function(){
				var inputNum=$(this).parent().find(".J_num"),
					val=parseInt(inputNum.val()),
					id=inputNum.attr("name"),
					isNum=$.isNumeric(val);
				return isNum ? val>1 && setValue("minus",id,val) : JNC.alert("输入的数量只能是数字！"),false	
			}),
			$(".J_plus").off().on("click",function(){
				var inputNum=$(this).parent().find(".J_num"),
					num=parseInt(inputNum.attr("data-num")),
					val=parseInt(inputNum.val()),
					id=inputNum.attr("name"),
					limit=parseInt(inputNum.attr("data-limit")),
					isNum=$.isNumeric(val);
				return isNum ? (num===limit ? JNC.alert("该商品数量不能大于"+limit) : val>=1 && val<limit ? setValue("plus",id,val) : setValue("plus",id,limit-1),false) : (JNC.alert("输入的数量只能是数字！"),false)	
			}),
			$(".J_checkbox").off().on("click",function(){
				var id=$(this).attr("data-listid"),
					check=$(this).hasClass("checked");
				check ? selGoods(id,0) : selGoods(id,1)
			})
		}
		function deleteCart(id){ 
			if(id.length){
				JNC.confirm({
				    content: '确定删除该商品吗？',
				    buttons:{
				        ok:{
				        	action: function(){
//				        		$.ajax({
//									url:"",
//									dataType:"json",
//									success:function(r){
//										r.code===1 ? refreshData() : JNC.alert(r.msg)
//									}
//								});
				        	}
				        }
				    }
				});
			}
		}
		function refreshData(){
			requestData()
		}
		function setValue(type,id,val){
//			type==="plus" ? val+=1 : type==="minus" && (val-=1),
//			$.ajax({
//				url:"",
//				data:{
//					cartId:id,
//					cartNum:val
//				},
//				dataType:"json",
//				success:function(response){
//					response.code===1 ? refreshData() : JNC.alert(response.msg)
//				}
//			});
		}
		function selGoods(id,selStatus){
//			$.ajax({
//				url: ,
//				dataType: "json",
//				data: {
//					itemId: id,
//					status: selStatus
//				},
//				success: function(response) {
//					1 === response.code ? refreshData() : JNC.alert(response.msg)
//				}
//			})
		}
		function selAll(){
			$("#J_checkAll").on("click",function(){
				var check=$(this).hasClass("checked"),
					arr=[];
				$(".J_checkbox").each(function(){
					arr.push($(this).attr("data-listid"));
				}),
				check ? selGoods(arr,0) : selGoods(arr,1)
			});
		}
		function goBuy(){
			$("#J_goBuy").on("click",function(){ 
				var disable=$(this).hasClass("btn-disabled");
				if(disable){
					return false
				}else{
					$(this).addClass("btn-disabled");
//					$.ajax({
//						url:"",
//						dataType:"json",
//						error:function(){
//							$(this).removeClass("btn-disabled")
//						},
//						success:function(response){
//							if($(this).removeClass("btn-disabled"),response.code===1){
								location.href="submitOrder.html?t="+TIME.randomNum();
//							}else if(response.code===2){
//								location.href="login.html";
//							}else{
//								JNC.alert(response.msg)
//							}
//						}
//					});
				}
			})
		}
		var TIME={
				randomNum:function(){
					return parseInt(9e4 * Math.random() + 1e4) + "." + parseInt((new Date).getTime() / 1e3)
				}
			},
			defaultCart={
				cartData:null,
				selNum:0,       //选择商品的个数
				totalNum:0,     //总的商品个数
				totalPrice:0    //总价
			},
			Z=function(){
				requestData(),selAll(),goBuy()
			};
		return {
			init:Z
		}
	}(),
	$(document).ready(function(){
		JNC.cart.init()
	})
}])