! function(t) {
	function a(i) {
		if(e[i]) return e[i].exports;
		var o = e[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return t[i].call(o.exports, o, o.exports, a), o.loaded = !0, o.exports
	}
	var e = {};
	return a.m = t, a.c = e, a.p = "", a(0)
}([function(t, a, e) {
	t.exports = e(1)
}, function(t, a, e) {
	JNC.cart=function(){
		function requestData(){
//			$.ajax({
//				url:"",
//				dataType:"json",
//				timeout:10000,
//				error:function(){
//					JNC.alert("网络出错，请刷新页面！")
//				},
//				success:function(response){
					//*******例：后台获取的数据********
					var response={code:1,msg:"错误"};
					response.data=[
						{
							listId:'1001',
							productName:'F19S 单机',imageUrl:'http://www.joynices.com/MallDev/Joynices/images/product/f19s-angle2!460x460.jpg',
							productUrl:"product-buy.html",
							salePrice:'6499',
							subtotal:'6499',
							selStatus:0,
							num:1,
							buyLimit:5
						},
						{
							listId:'1002',
							productName:'F19S-智能飞行电池',
							imageUrl:'http://www.joynices.com/MallDev/Joynices/images/product/f19s-dc1!460x460.jpg',
							productUrl:"product-buy-acce.html",
							salePrice:'299',
							subtotal:'1495',
							selStatus:1,
							num:5,
							buyLimit:5
						},
						{
							listId:'1003',
							productName:'F19S 快拆折叠螺旋桨',
							imageUrl:'http://www.joynices.com/MallDev/Joynices/images/product/f19s-lxj3!460x460.jpg',
							productUrl:"product-buy-acce.html",
							salePrice:'299',
							subtotal:'1495',
							selStatus:1,
							num:5,
							buyLimit:5
						}
					];
					//*******end********
					
					if(response && 1 === response.code){
						defaultCart.cartData = response.data, 
						checkData(), 
						templateCart(),
						defaultCart.selNum = 0,
						defaultCart.totalNum = 0,
						defaultCart.totalPrice=0,
						$(".main").show(),
						$("#J_loading").addClass("hide")
					}else{
						JNC.alert(response.msg)
					}
//				}
//			});
		}
		function checkData(){ 
			if(defaultCart.cartData.length<=0){
				$(".section-cart").html('<div class="empty-box"><img src="../assets/img/no_order.png" /><div class="no-data"><p class="empty">您的购物车空空如也！</p></div></div>'),
				$(".car-footer").html('<div class="go-shop">马上去购物</div>')
			}else{
				$.each(defaultCart.cartData, function(index,_this) {
					defaultCart.totalNum+=parseInt(_this.num);
					if(1===_this.selStatus){
						defaultCart.selNum+=parseInt(_this.num),
						defaultCart.totalPrice+=parseInt(_this.salePrice)*parseInt(_this.num)
					}
				});
				$("#J_cartTotalPrice").text(defaultCart.totalPrice),
				$("#J_selTotalNum").text(defaultCart.selNum);
				if(defaultCart.selNum===defaultCart.totalNum && defaultCart.selNum>0){
					$("#J_checkAll").checked = true
				}else{
					$("#J_checkAll").checked = false
				}
				if(defaultCart.selNum>0){
					$("#J_goBuy").removeClass("btn-disabled").addClass("btn-primary")
				}else{
					$("#J_goBuy").removeClass("btn-primary").addClass("btn-disabled")
				}
			}
		}
		function templateCart(){
			if(defaultCart.cartData.length>0){
				var temp=doT.template($("#J_cartTemplate").html()),
					tempHtml=temp(defaultCart.cartData);  
				$("#J_cartListBody").html(tempHtml),
				bindEvent()
			}
		}
		function bindEvent(){
			$(".J_delete").off().on("click",function(){
				return deleteCart($(this).attr("id")),false
			});
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
				}else{
					JNC.alert("输入的数量只能是数字！"),$(this).val(num)
				}
			});
			$(".J_minus").off().on("click",function(){
				var inputNum=$(this).parent().find(".J_num"),
					val=parseInt(inputNum.val()),
					id=inputNum.attr("name"),
					isNum=$.isNumeric(val);
				return isNum ? val>1 && setValue("minus",id,val) : JNC.alert("输入的数量只能是数字！"),false	
			});
			$(".J_plus").off().on("click",function(){
				var inputNum=$(this).parent().find(".J_num"),
					num=parseInt(inputNum.attr("data-num")),
					val=parseInt(inputNum.val()),
					id=inputNum.attr("name"),
					limit=parseInt(inputNum.attr("data-limit")),
					isNum=$.isNumeric(val);
				return isNum ? (num===limit ? JNC.alert("该商品数量不能大于"+limit) : val>=1 && val<limit ? setValue("plus",id,val) : setValue("plus",id,limit-1),false) : (JNC.alert("输入的数量只能是数字！"),false)	
			});
			$(".J_checkbox").off().on("click",function(){
				var id=$(this).attr("data-listid"),
					check=$(this).is(':checked');
				check ? selGoods(id,1) : selGoods(id,0)
			})
		}
		function refreshData(){
			requestData()
		}
		function deleteCart(id){ 
			if(id.length){
				JNC.confirm('是否确定删除此商品？', function(e) {
					if (e.index == 1) {
//						$.ajax({
//							url:"",
//							dataType:"json",
//							data:{
//								cartId=id
//							},
//							success:function(r){
//								r.code===1 ? refreshData() : JNC.alert(r.msg)
//							}
//						});
					}
				})
			}
		}
		function setValue(type,id,val){
			type==="plus" ? val+=1 : type==="minus" && (val-=1);
//			$.ajax({
//				url:"",
//				data:{
//					cartId=id
//				},
//				dataType:"json",
//				success:function(r){
//					r.code===1 ? refreshData() : JNC.alert(r.msg)
//				}
//			});
		}
		function selGoods(id,selStatus){ 
//			$.ajax({
//				url: ,
//				dataType: "json",
//				data: {
//					listId: id,
//					status: selStatus
//				},
//				success: function(r) {
//					1 === r.code ? refreshData() : JNC.alert(r.msg)
//				}
//			})
		}
		function selAll(){ 
			$("#J_checkAll").on("click",function(){ 
				var check=$(this).is(':checked'),
					arr=[];
				$(".J_checkbox").each(function(){
					arr.push($(this).attr("data-listid"));
				}),
				check ? selGoods(arr,1) : selGoods(arr,0)
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
			doStart=function(){
				requestData(),selAll(),goBuy()
			};
			
		return {
			init:doStart
		}
	}();
	
	$(document).ready(function(){
		JNC.cart.init()
	})
}])