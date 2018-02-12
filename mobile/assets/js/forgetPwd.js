$(function(){
	function showError(type,text){
		var errors="<p class='error'>"+text+"</p>",
			p=type.closest(".inputlist");
		p.find(".error").remove(),p.append(errors);
		type.on("keydown",function(){
	    	p.find(".error").remove()
	    });
	}
	function stepView(way,sub){
		var dem,account;
		//way==="em" ? dem="邮箱" : (way=="ph" && dem="手机");
		if(way==="em"){
			dem="邮箱"
		}else if(way==="ph"){
			dem="手机"
		}
		account=sub;
		
		var temp='<div class="step-tips"><p class="tit">为了保护帐号安全，需要验证'+dem+'的有效性</p><p class="des">点击获取按钮，将会发送一条有验证码的邮件至'+dem+'</p><p class="account">'+account+'</p></div><div class="inputlist code"><input type="text" name="captcha" id="captcha" autocomplete="off" placeholder="验证码"><a href="javascript:void(0)" class="remain" title="发送短信">获取验证码</a></div><div class="btns-bg"><button type="button" class="btn btn-primary" id="J_nextTwo">下一步</button></div>';
		
		$("#J_step01").html(""),$("#J_step02").html(temp);
		
		var captcha=$("#captcha");
		$("#J_nextTwo").on("click",function(){
			var captchaVal=captcha.val();
			if($.trim(captchaVal)===""){
				showError(captcha,"请输入验证码");
				return false
			}else if(!/^\d{4,8}$/.test(captchaVal)){
				showError(captcha,"验证码错误");
				return false
			} 
			window.location.href="resetPwd.html"
		});
	}
	
	var user=$("#user"),
		icode=$("#icode"),
		rule=/(^[\w.\-]+@(?:[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.)+[A-Za-z]{2,6}$)|(^1\d{10}$)/;
	$("#J_nextOne").on("click",function(){
		var userVal=$.trim(user.val()),
			icodeVal=$.trim(icode.val())
		if(userVal===""){
			showError(user,"请输入帐号");
			return false
		}else if(!rule.test(userVal)){
			showError(user,"帐号格式错误");
			return false
		}else if(!(/^\w{4,8}$/.test(icodeVal))){
		  	showError(icode,"验证码错误");
		  	return false
		}
		
		//判断邮箱还是手机号，发送验证码
		if(userVal.indexOf("@")===-1){  //手机
			stepView("ph",userVal)
		}else{   //邮箱
			stepView("em",userVal)
		}
	});
	
})