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
	JNC.itemUtil=o(2);
	JNC.goodsUtil={ 
		buyTemplate:function(t,s){ 
			var o=t.html(),
				q=doT.template(o); 
			return q(s)
		}
	},
	JNC.goodsChoose={
		init:function(){
			var t=this;
			t.runMethods();
		},
		runMethods:function(){
			var t=this;
			t.proSlider(),t.clickTofull()
		},
		changePic:function(i){ 
			var b=$("#J_goodsTab").find("li").eq(i).find("img").attr("data-src");
					var r={img:b},
						c=JNC.goodsUtil.buyTemplate($("#bigPic-tmpl"),r); 
					$("#J_goodsBigPic").html(c),
					$("#J_goodsTab").find("li").removeClass("active"),
					$("#J_goodsTab").find("li").eq(i).addClass("active")
		},
		proSlider:function(){
			var t=this;
			$("#J_goodsTab").on("click","li",function(){
				var i=$(this).index(); 
				$("#J_goodsBigPic").html(""),
				$.proxy(t.changePic(i),t)
			});
			$("#J_proType").on("click","li",function(){
				var indexs=parseInt($(this).attr("data-index"));
				var nowIndexs=parseInt($("#J_goodsTab").attr("data-index")); 
				if(indexs===nowIndexs){
					return false;
				}

				var price=$(this).find(".price").html();
				$(this).addClass("active").siblings("li").removeClass("active"),
				$("#J_proPrice").html(price);
				
				$("#J_goodsBox").find("#J_goodsTab").addClass("hide").attr("id","");
				$("#J_goodsBox").find(".J_picTab").eq(indexs).removeClass("hide").attr("id","J_goodsTab")
				$.proxy(t.changePic(0),t)

			})
		},
		clickTofull:function(){
			var t=this,
				v={},
				s=0;
			t.judge=!0;
			$("#J_goodsBigPic").on("click",function(){
				var w=$(window).height();
				if(600>w) return !1;
				$("#fullBigPicBox").remove();
				var r=[],
					n=0;
				$("#J_goodsTab").find("li:not(.hide)").each(function(i){
						var m=$(this).find("img"); 
						$(this).hasClass("active") && (n=i);
						var f={
							small:m.attr("src"),
							big:m.attr("data-src-b"),
							bigWidth:800
						}; 
						r.push(f)
				}), 
				v.info=r,
				v.selIndex=n; 
				var h=$("#fullBigPic-tmpl").html(),
					p=doT.template(h);
				$("body").append(p(v));
				w<900 ? $("#J_fullZoom").addClass("between") : $("#J_fullZoom").removeClass("between");
				t.changeWin(),t.judge=!1;
				var a=function(){
						$("#J_fullZoom").addClass("preserve3d")
					},
					b=function(){
						$("#fullBigPicBox").addClass("transiton").removeClass("original");
						$("#J_fullZoom").removeAttr("style").find("img").removeAttr("style");
						var g=v.info[v.selIndex].bigWidth; 
						$("#J_fullZoom").find("img").css({"margin-left":"-"+g/2+"px","width":g+"px","height":g+"px"}),
						$("#J_fullZoom").find(".picture").css({"margin-left":"-"+g/2+"px","width":g+"px","height":g+"px"}),
						setTimeout(a,400)
					},
					c=function(){ 
						$("#fullBigPicBox").removeClass("bgTran"),
						setTimeout(b,100)
					},
					d={
						imgsrc:v.info[v.selIndex].big
					};
				JNC.itemUtil.imgLoad(d,c),
				s=v.selIndex;
			}),
			$("body").on("click",".close-btn",function(){
				t.judge=!0; 
				var a=function(){
						$("#fullBigPicBox").remove()
					},
					b=function(){
						$("#fullBigPicBox").addClass("bgTran"),
						setTimeout(a,300)
					},
					c=function(){
						t.initCss(),
						$("#fullBigPicBox").addClass("original"),
						setTimeout(b,800)
					};
				setTimeout(c,100),
				$("#J_fullZoom").removeClass("preserve3d");
			});
			var p=function(n){
				s=n;
				$("#J_fullZoom").addClass("loaded");
				var c=function(v){
						$("#J_fullZoom").find(".picture").css("background-image","url("+v.img.src+")"),
						$("#J_fullZoom").find("img").attr("src",v.img.src),
						$("#J_fullZoom").removeClass("loaded"),
						$("#J_fullList").find("li").removeClass("active"),
						$("#J_fullList").find("li").eq(n).addClass("active")
					},
					d={
						imgsrc:v.info[n].big
					};
				JNC.itemUtil.imgLoad(d,c),
				$("#J_goodsTab").find("li").eq(n).click()
			};
			$("body").on("click","#fullPrev",function(){
				return s--,s<0 ? (s=v.info.length-1,!1):0, p(s)
			}),
			$("body").on("click","#fullNext",function(){
				return s++,s>v.info.length-1 ? (s=0,!1):0, p(s)
			});
			$("body").on("click","#J_fullList>li",function(){
				var i=$(this).index();
				p(i)
			})
		},
		changeWin: function() {
			var t = this,
				e = function() {
					t.initCss()
				};
			e(), 
			$(window).resize(function() {
				e()
			}), 
			document.addEventListener && document.addEventListener("DOMMouseScroll", function() {
				e()
			}, !1), 
			window.onmousewheel = document.onmousewheel = function() {
				e()
			}
		},
		initCss:function(){
			var t=this;
			if(t.judge){
				var e = $(window).height(),
					o = $(document).scrollTop(),
					i = $("#J_goodsBigPic"),
					n = i.offset().top - o,
					a = i.offset().left,
					s = i.find("img").width(),
					r = i.find("img").height();
				$("#fullBigPicBox").css("height", e),
				$("#J_fullZoom").find("img").css("width", s).css("height", r),
				$("#J_fullZoom").find("img").css("top", n).css("left", a).css("margin-left", "0px").css("margin-top", "0px")
			}
		}
	},$(function(){
		JNC.goodsChoose.init()
	})
}, function(t, e) {
	var o={
		imgLoad: function(t, e) { 
			var o = new Image;
			o.src = t.imgsrc, t.img = o, 
			o.complete ? e(t) : (o.onload = function() {
				if("naturalHeight" in this) {
					if(this.naturalHeight + this.naturalWidth === 0) return void this.onerror()
				} else if(this.width + this.height === 0) return void this.onerror();
				e(t), o.onload = null
			}, 
			o.onerror = function() {
				t.isError = !0, e(t)
			})
		}
	};
	t.exports = o
}])