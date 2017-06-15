$(".install").on("click","span",function(){
		$(this).css({"background":"#4e9cfc","color":"#fff","opacity":"0.82"})
		$(".no-install-require").css({"background":"#f2f2f2","color":"#000","opacity":"0.32"})
		$(".not-install").css({"background":"#f2f2f2","color":"#000","opacity":"0.32"})
	})
$(".not-install").click(function(){
		$(this).css({"background":"#4e9cfc","color":"#fff","opacity":"0.82"})
		$(".finish-install").css({"background":"#f2f2f2","color":"#000","opacity":"0.32"})
		$(".no-install-require").css({"background":"#f2f2f2","color":"#000","opacity":"0.32"})
	})
	$(".no-install-require").click(function(){
		$(this).css({"background":"#4e9cfc","color":"#fff","opacity":"0.82"})
		$(".finish-install").css({"background":"#f2f2f2","color":"#000","opacity":"0.32"})
		$(".not-install").css({"background":"#f2f2f2","color":"#000","opacity":"0.32"})
	})
	
	$(".consumer").click(function(){
		$(this).css({"border-top":"4px solid #4e9cfc","color":"#4e9cfc","background":"#f2f2f2"})
		$('.agency').css({"border-top":"4px solid #fff","color":"#000","background":"#fff"})
		$("#consumer-content").show();
		$("#agency-content").hide();			
	})
	$(".agency").click(function(){
		$(this).css({"border-top":"4px solid #4e9cfc","color":"#4e9cfc","background":"#f2f2f2"})
		$(".consumer").css({"border-top":"4px solid #fff","color":"#000","background":"#fff"})
		$("#agency-content").show();
		$("#consumer-content").hide();
	})
	
				/*<!--<div class="commodity-list shop-list">
					<label class="same order" for="writeOrder">商品序列号 *</label>
					<input id="writeOrder" class="write-order" type="text" placeholder="请填写任意购买商品的17位序列号" value=""/>
				</div>-->*/
				/*<div class="agency-list agency-top">
					<label class="same agency-order" for="agencyOrder">商品序列号 *</label>
					<input id="agencyOrder" type="text" placeholder="请填写任意购买商品的17位序列号" />
				</div>	*/		
				


	function correctColor(leftObjCss,rightObjCsss){
		$("#writeName").css({"color":"#404040","background":"#fff"});
		$(".name").css({"border-top":"none","background":"#fff"})
	}
	function wrongColor(){
		$("#writeName").css({"color":"red","background":"pink"});
		$(".name").css({"border-top":"2px solid pink","background":"pink"})
	}
	$(".write-name").blur(function(){
		var writeNameLength=$(".write-name").val();		
		if(writeNameLength.length<=5){
			$(".write-name").css({"color":"#404040","background":"#fff"});
			$(".name").css({"border-top":"none","background":"#fff"})
		}else if($(this).val()==""){
			alert("请填写消费者的姓名");
		}else{
			alert("至多5位");
			$(".write-name").css({"color":"red","background":"pink"});
			$(".name").css({"border-top":"2px solid pink","background":"pink"})
		}
	})
	



	//住址
	$("#writeAddress").blur(function(){
		var writeAddress=$("#writeAddress").val();
		if(writeAddress.length<=30){
			$("#writeAddress").css({"color":"#404040","background":"#fff"});
			$(".address").css({"border-top":"none","background":"#fff"})
		}else if(writeAddress==""){
			alert("请填写手机号")
		}else{
			//alert("至多30个字")
			$("#writeAddress").css({"color":"red","background":"pink"});
			$(".address").css({"border-top":"2px solid pink","background":"pink"})
		}
	})
	//产品型号
	$("#writeProduct").blur(function(){
		var writeProduct=$("#writeProduct").val();
		if(writeAddress.length<=50){
			$("#writeAddress").css({"color":"#404040","background":"#fff"});
			$(".product-model").css({"border-top":"none","background":"#fff"})
		}else if(writeProduct==""){
			alert("请填写产品包装上的型号")
		}else{
			//alert("至多50个字")
			$("#writeProduct").css({"color":"red","background":"pink"});
			$(".product-model").css({"border-top":"2px solid pink","background":"pink"})
		}
	})
	//产品型号
	$("#writeProduct").blur(function(){
		var writeProduct=$("#writeProduct").val();
		if(writeAddress.length<=50){
			$("#writeAddress").css({"color":"#404040","background":"#fff"});
			$(".product-model").css({"border-top":"none","background":"#fff"})
		}else if(writeProduct==""){
			alert("请填写产品包装上的型号")
		}else{
			//alert("至多50个字")
			$("#writeProduct").css({"color":"red","background":"pink"});
			$(".product-model").css({"border-top":"2px solid pink","background":"pink"})
		}
	})
	//购买数量
	$("#writeNum").blur(function(){
		var writeNum=$("#writeNum").val();
		if(writeAddress.length<=4){
			$("#writeNum").css({"color":"#404040","background":"#fff"});
			$(".number").css({"border-top":"none","background":"#fff"})
		}else if(writeNum==""){
			alert("请填写您本次购买的商品数量")
		}else{
			//alert("至多4个字")
			$("#writeNum").css({"color":"red","background":"pink"});
			$(".number").css({"border-top":"2px solid pink","background":"pink"})
		}
	})
	//备注
	$("#writeMore").blur(function(){
		var writeNum=$("#writeMore").val();
		if(writeAddress.length<=4){
			$("#writeMore").css({"color":"#404040","background":"#fff"});
			$(".remark").css({"border-top":"none","background":"#fff"})
		}else if(writeNum==""){
			alert("	最多200个字")
		}else{
			//alert("至多200个字")
			$("#writeMore").css({"color":"red","background":"pink"});
			$(".remark").css({"border-top":"2px solid pink","background":"pink"})
		}
	})
	
	//姓名
	$("#writeName").on("blur",function(e){	
		var writeNameLength=$("#writeName").val();	
		localStorage.setItem("writeName",writeNameLength)
		if(writeNameLength.length<=5){
			correctColor("#writeName",".name")
		}else if($(this).val()==""){
			alert("消费者的姓名不能为空，请填写消费者的姓名");
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                message: "消费者的姓名不能为空，请填写消费者的姓名"
            },
            function() {})*/
		}else{
			alert("姓名至多5个字");				
			wrongColor("#writeName",".name")
		}	
		fix();	
	})



	//弹框函数
	function toggleObj(clickObj,elements,changObj){
		$(clickObj).click(function(){
			$(elements).css("display",changObj);
		})	
	}
	function showAddhide(){
		toggleObj("#sure","#modal","none");
		toggleObj("#sure","#smark","none");
		toggleObj("#smark","#modal","none");
		toggleObj("#smark","#smark","none");
	}
	//弹框中内容变化
	function cont(content){
		$("#smark").show();
		$("#modal").show();
		$("#modal .artile").html(content)
	}
		//姓名
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？[0-9]") 
	$("#writeName").on("blur",function(e){	
		var writeNameLength=$("#writeName").val();	
		if(writeNameLength.length>0 && writeNameLength.length<=5 && (!pattern.test(writeNameLength))){			
			correctColor("#writeName",".name")			
		}else if(writeNameLength==""){		
			$("#writeName").val("姓名不能为空")
            wrongColor("#writeName",".name")
		}else if(pattern.test(writeNameLength)){
			alert("含有非法字符且长度大于5!")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#writeName",".name")
		}else{
			cont("姓名至多5个字!")
			showAddhide()
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "姓名至多5个字"
                },
                function() {})*/
			wrongColor("#writeName",".name")
		}	
		fix();
	})		
	$("#writeName").focus(function(){
		correctColor("#writeName",".name")
	})

	//商家短信验证码
	getAgencyCode();
	function getAgencyCode(){
		mess("#getMessage")
		$("#getMessage").click(function(){	
			if(!this.flag){		
			//$.ajax({
	//			url:"",
	//			type:"",
	//			success:function(){
	//				var timeSec=60;
	//				setInterval(function(){
	//					that.html(timeSec--)
	//				},1000)				
	//			}
	//		})
				this.flag=true;
				var that=this;			
				var timeSec=10;
				this.innerHTML="10秒";
				var timer=setInterval(function(){
					that.innerHTML=--timeSec+"秒";	
					if(timeSec==0){
						clearInterval(timer)
						that.innerHTML="获取验证码";
						that.flag=false;	
						$("#getMessage").css({"color":"#ff7a11"})
					}
				},1000)
				$("#getMessage").css({"color":"#404040"})		
			}
		})
	}
	
	
	
	
		$("#getMessage").click(function(){	
		if(!this.flag){		
			$.ajax({
				url:orginUrl+"/wpservice/device/getDeviceCaptcha",
				type:"POST",
				data:{
					mobile:doEncrypt($("#agencyName").val(),baseKeyStr)
				},
				success:function(datas){
					if(datas.errMsg=="验证码错误"){
						new Toast({context:$('body'),message:'验证码错误'}).show();
					}
//							var timeSec=60;
//							setInterval(function(){
//								that.html(timeSec--)
//							},1000)				
				}
			})
			this.flag=true;
			var that=this;			
			var timeSec=60;
			this.innerHTML="60秒";
			var timer=setInterval(function(){
				that.innerHTML=--timeSec+"秒";	
				if(timeSec==0){
					clearInterval(timer)
					that.innerHTML="获取验证码";
					that.flag=false;	
					$("#getMessage").css({"color":"#ff7a11"})
				}
			},1000)					
		}
		$("#getMessage").css({"color":"#404040"})	
		fix();
	})
/*	//聚焦时定位
	function getFocus(focusObj){
		$(focusObj).focus(function(){
			$(".top").css({
				'width':'100%',
				'height':'0.88rem',
				'background':'#333',
				'color':'white',
				'font-size':'0.35rem',
				'position':'fixed',
				'top':'0',
				'left':'0',
				'z-index':'3'
			})
		})
	}
	getFocus("#writeName");
	getFocus("#writeNumber");
	getFocus("#writeAddress");
	getFocus("#writeProduct");
	getFocus("#writeNum");
	getFocus("#writeMore");
	getFocus("#agencyConsumer");
	getFocus("#agencyPhone");
	getFocus("#agencyAddress");
	getFocus("#agencyName");
	getFocus("#agencyTelephone");
	getFocus("#agencyModel");
	getFocus("#agencyRemark");*/
	

	//姓名
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");
	var nameReg = /[\u4e00-\u9fa5a-zA-Z0-9]+$/	;
	var numReg = /\d+$/;
	var numberReg = /^\d+$/;
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;	
	var userErr=[];
	$("#writeName").on("blur",function(e){	
		var writeName=$("#writeName").val();
		$("#writeName").attr('realVal',writeName);
		var err='writeName';
		if(writeName.length>0 && writeName.length<=5 && (!numReg.test(writeName)) && nameReg.test(writeName) && (!pattern.test(writeName))){			
			correctColor("#writeName",".name")	
			err=''
		}else if(writeName==""){		
			$("#writeName").val("姓名不能为空")
            wrongColor("#writeName",".name")
            
		}else if(pattern.test(writeName)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#writeName",".name")

		}else if(numReg.test(writeName)){
			new Toast({context:$('body'),message:'含有数字或长度大于5'}).show(); 
			wrongColor("#writeName",".name")

		}else{
			new Toast({context:$('body'),message:'姓名至多5个字'}).show(); 
			wrongColor("#writeName",".name")

		}	
		if(err){
			userErr.push(err)
		}
		fix();
	})	
		//备注
	$("#writeMore").on("blur",function(e){
		var writeMore=$("#writeMore").val();
		$("#writeMore").attr('realVal',writeMore);
		var err='writeMore';
		if(writeMore.length>0 && writeMore.length<=200 && (!pattern.test(writeMore))){
			correctColor("#writeMore",".remark")
			err=''
		}else if(writeMore==""){
			$("#writeMore").val("")
			correctColor("#writeMore",".remark")
			err=''
		}else if(pattern.test(writeMore)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于200'}).show(); 
			wrongColor("#writeMore",".remark")
		}else{
			new Toast({context:$('body'),message:'备注至多200个字'}).show(); 
			wrongColor("#writeMore",".remark")
		}	
		if(err){
			userErr.push(err)
		}
		fix();
	})
	$("#writeMore").focus(function(){
		correctColor("#writeMore",".remark")
		$("#writeMore").val($("#writeMore").attr('realVal'))
	})
//点击提交
	$(".submit").click(function(){		
		if(!$(this).hasClass("disabled")){
			$("#writeName").blur();
			$("#writeNumber").blur();
			$("#writeAddress").blur();
			$("#writeProduct").blur();
			$("#writeNum").blur();
			$("#writeMore").blur();
			$(".no-install-require").click();
			$(".finish-install").click();
			if(userErr.length){
				alert(userErr.length+"aa")
				new Toast({context:$('body'),message:'数据有误'}).show(); 
			}else{
				var $t=$(this);
				$(this).addClass("disabled");
				var dts={};
		  		window.type="";
		  		if(isSold=="yes"){		
		  			type="0"
		  		}
		  		if(isSold=="no"){
		  			if(consumer==1 && noFinish==4){
		  				//0-安装
		  				//1-售出
			  			//2-both
			  			type="1"
			  		}
		  			/*else if(consumer==1 && finish==3){
			  			type="0"
			  		}else if((consumer==1 && finish==3) && (consumer==1 && noFinish==4)){
			  			type="2"
			  		}*/
		  		}
		  		if(isSold=="no"){
		  			if(consumer==1 && finish==3){
			  			type="0"
			  		}
		  		}
		  		if(isSold=="no"){
		  			if((consumer==1 && finish==3) && (consumer==1 && noFinish==4)){
			  			type="2"
			  		}
		  		}
		  		getKeyStr(function(baseKeyStr){
		  			if($("#consumer-content:visible").length){
			  			dts={
			  				"labelCode":doEncrypt(labelCode,baseKeyStr),
							"consumerName":doEncrypt($("#writeName").val(),baseKeyStr),
							"consumerMobile":doEncrypt($("#writeNumber").val(),baseKeyStr),
							"consumerAddress":doEncrypt($("#writeAddress").val(),baseKeyStr),
							"captcha":doEncrypt($("#writeCode").val(),baseKeyStr),
							"standard":doEncrypt($("#writeProduct").val(),baseKeyStr),
							"quantity":doEncrypt($("#writeNum").val(),baseKeyStr),
							"remark":doEncrypt($("#writeMore").val(),baseKeyStr),
							"type":doEncrypt(type,baseKeyStr)
						}
			  		}else{
			  			dts={
			  				"labelCode":doEncrypt(labelCode,baseKeyStr),
							"consumerName":doEncrypt($("#agencyConsumer").val(),baseKeyStr),
							"consumerMobile":doEncrypt($("#agencyPhone").val(),baseKeyStr),
							"consumerAddress":doEncrypt($("#agencyAddress").val(),baseKeyStr),
							"captcha":doEncrypt($("#agencyMessage").val(),baseKeyStr),
							"sellerName":doEncrypt($("#agencyName").val(),baseKeyStr),
							"sellerMobile":doEncrypt($("#agencyTelephone").val(),baseKeyStr),
							"standard":doEncrypt($("#agencyModel").val(),baseKeyStr),
							"quantity":doEncrypt($("#agencyNumber").val(),baseKeyStr),
							"remark":doEncrypt($("#agencyRemark").val(),baseKeyStr),
							"type":doEncrypt(type,baseKeyStr)
			  			}
			  		}
			  		alert(type+"type")
			  		$.ajax({
						type:"POST",
						url:orginUrl+"/wpservice/device/install29",
						async:true,
						data:dts,
						timeout:10000,
						success:function(datas){
							alert(JSON.stringify(datas))
							$t.removeClass("disabled")
							if(datas.success){
								$(".picture").hide();
								$(".consumer-agency").hide();
								$(".background").hide();
								$("#consumer-content").hide();
								$(".footer").hide();
								$(".loading").show();
								$("body").css("background","#F8F8F8")
								$(".loadEffect").hide().siblings(".middle").show();
								$(".middle img").attr('src',"images/enterSuccess.png");
								$(".middle p").html("登录成功");
							}else{
								//new Toast({context:$('body'),message:'登录失败'}).show();
							}
						},
						error:function(jqXHR, textStatus, errorThrown){
							if(textStatus=="timeout"){
								new Toast({context:$('body'),message:'网络超时'}).show();
							} 
						}
					});
			  	})
				fix();
			}	
		}		
	})











