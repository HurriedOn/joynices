! function(t) {
	function e(i) {
		if(o[i]) return o[i].exports;
		var n = o[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return t[i].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
	}
	var o = {};
	return e.m = t, e.c = o, e.p = "", e(0)
}([function(t, e, o) {
	t.exports = o(1)
}, function(t, e, o) {
	o(2),
	JNC.orderItem=function($){
		function resetUrl() {
			var path = location.href.split("?")[0],
				hash = location.href.split("?")[1]; 
			location.href = path + "#" + hash
		}
		function getType(type) {
			var rule = new RegExp("(^|&)" + type + "=([^&]*)(&|$)", "i"),
				cont = location.hash.substr(1).match(rule); 
			return null !== cont ? decodeURI(cont[2]) : null
		}
		function template(data){
			if(data.length<=0){
				warp.html('<p class="empty">您暂时还没有订单</p>')
			}else{
				var temp=doT.template($("#J_orderTemplate").html()),
					tempHtml=temp(data);
				warp.html(tempHtml)
			}
		}
		function requestData(){
			var _data;
			_data=$.extend({type:"pay"},options);
			
//			$.ajax({
//				type:"post",
//				url:"",
//				data:_data,
//				dataType:"json",
//				timeout:40000,
//				beforeSend:function(){
					warp.html('<div class="loading-img"><img src="../assets/img/loading.gif" /></div>')					
//				},
//				error:function(){
//					JNC.alert("网络请求错误，请刷新页面重试！")
//				},
//				success:function(response){
					//*******例：后台获取的数据********
					var response={code:1,msg:"错误"};
					response.data=[
						{
							status:1,
							status_info:"待支付",
							order_id:5171109622908597,
							amount_value:"7097",
							add_time:"2017年11月20日 17:02",
							product:[
								{
									product_name:"F19S 单机",
									image_url:"http://www.joynices.com/MallDev/Joynices/images/product/f19s-angle2!460x460.jpg",
									price:"6499",
									product_count:"1"
								},
								{
									product_name:"F19S-智能飞行电池",
									image_url:"http://www.joynices.com/MallDev/Joynices/images/product/f19s-dc1!460x460.jpg",
									price:"299",
									product_count:"2"
								}
							]
						},
						{
							status:1,
							status_info:"待支付",
							order_id:1171120930303369,
							amount_value:"6499",
							add_time:"2017年11月20日 16:42",
							product:[
								{
									product_name:"F19S 单机",
									image_url:"http://www.joynices.com/MallDev/Joynices/images/product/f19s-angle2!460x460.jpg",
									price:"6499",
									product_count:"1"
								}
							]
						},
						{
							status:1,
							status_info:"待支付",
							order_id:1170808640324027,
							amount_value:"299",
							add_time:"2017年11月20日 16:32",
							product:[
								{
									product_name:"F19S-智能飞行电池",
									image_url:"http://www.joynices.com/MallDev/Joynices/images/product/f19s-dc1!460x460.jpg",
									price:"299",
									product_count:"1"
								}
							]
						}
					];
					//*******end***********
					
					if(response.code===1){
						template(response.data)
					}else{
						JNC.alert(response.msg)
					}
//				}
//			});
		}
		function updateHash(){
			var _hash="#type="+options.type;
			location.hash=_hash
		}
		function updateItems(){
			tab.removeClass("active").find('[data-type="'+options.type+'"]').closest('li').addClass("active"),
			updateHash(),requestData()
		}
		function setting(){
			if(location.href.indexOf("?type")!==-1){ 
				resetUrl()
			}else{
				options.type=getType("type") || "pay"; 
				if(options.type && tab.find("[data-type='"+options.type+"']").length){ 
					tab.removeClass("active").find("[data-type='"+options.type+"']").closest("li").addClass("active"),
					requestData()
				}else{
					options.type="pay",requestData()
				}
				tab.on("click","a",function(e){
					e.preventDefault();
					options.type=$(this).attr("data-type"),
					updateItems()
				})
			}
		}
		
		var tab=$("#J_orderType").find("li"),
			warp=$("#J_allOrders"),
			options={},
			Z=function(){
				setting()
			};
		return {
			init:Z
		}
	}(jQuery),
	$(function(){
		JNC.orderItem.init()
	})
}, function(t, e, o) {
	
}])