$(function(){
	TouchSlide({ 
		slideCell:"#J_swiper01",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"leftLoop", 
		autoPlay:false,//自动播放
		autoPage:true, //自动分页
		switchLoad:"data-src" //切换加载，真实图片路径为"_src" 
	});

	TouchSlide({ 
		slideCell:"#J_swiper02",
		titCell:".hd ul", 
		mainCell:".bd ul", 
		effect:"leftLoop", 
		autoPlay:false,
		autoPage:true,
		switchLoad:"data-src"
	});
	$("#J_swiper02").hide()

	$("#J_proType").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var name=$(this).attr("data-name"),
			price=$(this).attr("data-price"),
			index=$(this).attr("data-index");
		$(".section-swiper").find(".J_seleSilde").eq(index).show().siblings().hide()
		$(".buy-info").html(name+'<br/>'+price)
	});

	$(".J_addCart").on("click",function(){
		var disable=$(this).hasClass("disabled");
		if(disable){
			return false
		}else{
			$(this).addClass("disabled");
			var productId=$(this).attr("data-productid");
			// $.ajax({
			//  	url:"",
			//  	data:{
			//  		product_id:productId
			//  	},
			//  	error:function(){
			//  		$(this).removeClass("disabled")
			//  	},
			//  	success:function(response){
					var response={code:1};
			 		if(response.code===1 && $(this).removeClass("disabled")){
			 			JNC.toast("成功加入购物车")
			 		}
			 // 	}
			 // })
		}
		return false
	});
})