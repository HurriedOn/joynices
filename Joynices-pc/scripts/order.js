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
	JNC.orderItem=function(e){
		function b() {
			var e = location.href.split("?")[0],
				t = location.href.split("?")[1];
			location.href = e + "#" + t
		}
		function c(p) {
			var t = new RegExp("(^|&)" + p + "=([^&]*)(&|$)", "i"),
				a = location.hash.substr(1).match(t);
			return null !== a ? decodeURI(a[2]) : null
		}
		function m(t,c){
			Y(p,t,c,null),
			p.find("a.numbers").off(".pager").on("click.pager",function(a){
				a.preventDefault(),
				X.page=parseInt(e(this).attr("data-pager")),
				k(),g(),
				e("body,html").animate({
					scrollTop:0
				},500)
			})
		}
		function j(t){
			if(t){
				var r,l,k;
				r=t.orderData,
				l=doT.template($("#J_orderTemplate").html()),
				t.count.pay_count && parseInt(t.count.pay_count)>0 && e("#J_payTab").text("待支付（"+t.count.pay_count+"）"),
				t.count.send_count && parseInt(t.count.send_count)>0 && e("#J_sendTab").text("待收货（"+t.count.send_count+"）");
				if(r.length<=0){
					return h.html('<p class="empty">您暂时还没有订单</p>'),
					p.empty();
				}else{
					k='<div class="order-viewlist">'+l(r)+'</div>',
					h.html(k),m(t.total_page,t.current_page)
				}
			}
		}
		function g(){
			var c,
				r={
					type:"pay",
					page:1
				};
			c=e.extend({},r,X);
//			e.ajax({
//				url:,
//				data:c,
//				dataType:"json",
//				timeout:1e4,
//				beforeSend:function(){
//					h.html('<div class="loading" id="J_cartLoading"><i class="iconfont icon-loading iconfont-spin"></i></div>'),
//					p.empty()
//				},
//				error:function(){
//					JNC.alert("网络请求错误，请刷新页面重试！")
//				},
//				success:function(t){
	
					//*******后台删除********
					//pay_count:待支付订单数
					//send_count:待收货订单数
					//total_page：总页数
					//current_page：当前页数
					var t={code:1,msg:"错误信息"};
					t.data={
						total_page:1,
						current_page:1,
						orderData:[
							{status:1,status_info:"待支付",order_id:5171109622908597,amount_value:"7097",add_time:"2017年11月20日 17:02",product:[{product_name:"F19S 单机",image_url:"../images/product/f19s-angle2!60x60.jpg",price:"6499",product_count:"1"},{product_name:"	F19S-智能飞行电池",image_url:"../images/product/f19s-dc1!60x60.jpg",price:"299",product_count:"2"}]},
							{status:1,status_info:"待支付",order_id:1171120930303369,amount_value:"6499",add_time:"2017年11月18日 17:02",product:[{product_name:"F19S 单机",image_url:"../images/product/f19s-dc1!60x60.jpg",price:"6499",product_count:"1"}]},
							{status:1,status_info:"待支付",order_id:1170808640324027,amount_value:"598",add_time:"2017年11月19日 17:02",product:[{product_name:"F19S-智能飞行电池",image_url:"../images/product/goggles-angle1!60x60.jpg",price:"299",product_count:"2"}]}
						],
						count:{
							pay_count:3,
							send_count:0
						}
					};
					//*******end********
					
					t.code===1 ? j(t.data) : t.code===2 ? location.href="login.html" : JNC.alert(t.msg)
//				}
//			})
		}
		function k(){
			var k="#type="+X.type; 
			X.page && X.page>1 && (k+="&page="+X.page),
			location.hash=k;
		}
		function i(){
			f.removeClass("active").find('[data-type="'+X.type+'"]').closest("li").addClass("active"),
			X.page=1,k(),g()
		}
		function a(){
			-1!==location.href.indexOf("?type") ? b() : (X.type=c("type") || "pay",X.page=parseInt(c("page")) || 1,X.type && f.find("[data-type='"+X.type+"']").length ? (f.removeClass("active").find("[data-type='"+X.type+"']").closest("li").addClass("active"),g()):(X.type="pay",g()),f.on("click","a",function(n){
				n.preventDefault(),
				X.type=e(this).attr("data-type"),i()
			}))
		}
		var f=e("#J_orderType").find("li"),
			h=e("#J_allOrders"),
			p=e("#page"),
			X={},
			Y=JNC.pagination,
			Z=function(){
				a()
			}; 
		return {
			init:Z
		}
	}(jQuery),
	$(function(){ 
		JNC.orderItem.init()
	})
}, function(t, e, o) {
	JNC.pagination=function(t,e,n,a){
		function o(){
			return multiline(function() {
				/*!@tpl
					<div class="jnc-pagination">
					  {{?it.pre}}
					  <a href="{{=it.opt.linkprefix}}{{=it.pre}}" class="numbers first"
					    data-pager="{{=it.pre}}"><span class="iconfont">&#xe693;</span></a>
					  {{??}}
					  <span class="numbers first"><span class="iconfont">&#xe693;</span></span>
					  {{?}}

					  {{?it.isF&&it.index==1}}
					  <span class="numbers current">1</span>
					  {{??it.isF&&it.index!=1}}
					  <a href="{{=it.opt.linkprefix}}1" class="numbers" data-pager="1">1</a>
					  {{?}}

					  {{?it.startXu}}
					  <span class="numbers">..</span>
					  {{?}}

					  {{for(var i=it.start;i<=it.end;i++){ }}
					  {{?i==it.index}}<span class="numbers current">{{=i}}</span>{{??}}
					  <a href="{{=it.opt.linkprefix}}{{=i}}" class="numbers" data-pager="{{=i}}">{{=i}}</a>{{?}}
					  {{ } }}

					  {{?it.endXu}}<span class="numbers">…</span>{{?}}

					  {{?it.isF&&it.index==it.pageAmount}}
					  <span class="numbers current">{{=it.pageAmount}}</span>
					  {{??it.isF&&it.index!=it.pageAmount}}
					  <a href="{{=it.opt.linkprefix}}{{=it.pageAmount}}" class="numbers"
					    data-pager="{{=it.pageAmount}}">{{=it.pageAmount}}</a>
					  {{?}}

					  {{?it.next}}
					  <a href="{{=it.opt.linkprefix}}{{=it.next}}" class="numbers last"
					    data-pager="{{=it.next}}"><span class='iconfont'>&#xe694;</span></a>{{??}}
					  <span class="numbers last"><span class='iconfont'>&#xe694;</span></span>
					  {{?}}
					</div>
				*/
			})
		}
		!function(t,e,n,a){
			var r={};
			n||(n=1);
			r.opt=$.extend({},{linkprefix:"#"},a),
			r.index=n,r.start=1,r.end=e,r.pageAmount=e,r.endXu=!1,r.pre="",r.next=r.index+1,r.startXu=!1,r.isF=!1,
			1===n?(r.pre="",r.next=1===e?"":n+1):n===e?(r.next="",r.pre=1===e?"":n-1):(r.pre=n-1,r.next=n+1),
			8>e?(r.start=1,r.end=e):(r.isF=!0,5>n?(r.start=2,r.end=5,r.startXu=!1,r.endXu=!0):n>e-5?(r.start=e-5,r.end=e-1,r.startXu=!0,r.endXu=!1):(r.start=n-2,r.end=n+2,r.end>e-1&&(r.end=e-1),r.startXu=!0,r.endXu=!0));
			var i=o(),
			p=doT.template(i)(r);
			t.html(p)
		}(t,e,n,a)
	}
}])