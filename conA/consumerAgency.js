$(function(){
	//WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});
	//window.aesFail = "";	
	/*$.ajax({
		type:"post",
		url:wpCommon.Url+"/wpwl/getKey",
		async:true,
		success:function(datas){
			key=datas.data;
			localStorage.setItem('key',datas.data)
			commodityData(key);
		}
	});*/
	function commodityData(key){
//		WPBridge.callMethod("JsInvokeNative","wpEncrypt",{
//				key:key,
//				params:[posId]
//		},function(msg){
//			codeValue=msg.data.result;
/*			$.ajax({
				type:"get",
				url:"",
				timeout:10000,
				data:{
					posId:codeValue[0]
				}
				success:function(datas){
					if(datas.errMsg=="AES加密解密失败"){
						if(!aesFail){
							$.ajax({
								type:"post",
								url:wpCommon.Url+'/wpwl/getKey',
								success:function(datas){
									key = datas.data;
									localStorage.setItem('key',datas.data)
									commodityData(key);
								}
							})
							aesFail=true;
						}
					}else if(datas.success==false){
						$(".picture").hide();
						$(".consumer-agency").hide();
						$(".background").hide();
						$("#consumer-content").hide();
						$(".footer").hide();
						$(".loading").show();
						$(".middle img").attr('src',"images/enterSuccess.png");
						$(".middle p").html("登录成功");
						$("body").css("background","#F8F8F8")
						wpCommon.viewShow();
					}else{
						try{
							if(datas.success){
								
							}
						}catch(e){
							$(".picture").hide();
							$(".consumer-agency").hide();
							$(".background").hide();
							$("#consumer-content").hide();
							$(".footer").hide();
							$(".loading").show();
							$(".middle img").attr('src',"images/enterSuccess.png");
							$(".middle p").html("登录成功");
							$("body").css("background","#F8F8F8")
						}
						wpCommon.viewShow();
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(textStatus=="timeout"){
						$(".picture").hide();
						$(".consumer-agency").hide();
						$(".background").hide();
						$("#consumer-content").hide();
						$(".footer").hide();
						$(".loading").show();
						$(".top div").html("网络异常")
					}
					wpCommon.viewShow();
				}
			});*/
//		})	
	}
	commodityData()	
	//重新加载
	/*$("#wpReload").click(function(){
		commodityData(key);
	})*/	
	//我是消费者和我是商家切换
	$(".consumer").click(function(){
		$(this).css({"border-top":"4px solid #4e9cfc","color":"#4e9cfc","background":"#f2f2f2"})
		$('.agency').css({"border-top":"4px solid #fff","color":"#bdbdbd","background":"#fff"})
		$("#consumer-content").show();
		$("#agency-content").hide();			
	})
	$(".agency").click(function(){
		$(this).css({"border-top":"4px solid #4e9cfc","color":"#4e9cfc","background":"#f2f2f2"})
		$(".consumer").css({"border-top":"4px solid #fff","color":"#bdbdbd","background":"#fff"})
		$("#agency-content").show();
		$("#consumer-content").hide();
	})	
	//商品状态及你的身份
	$(".install").on("click","span",function(){
		$(this).css({"background":"#4e9cfc","color":"#fff"}).siblings().css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
	$(".install-identity").on("click","span",function(){
		$(this).css({"background":"#4e9cfc","color":"#fff"}).siblings().css({"background":"#f2f2f2","color":"#bdbdbd"})
	})	
	//错误时显示的颜色以及修改正确的颜色
	function correctColor(leftCorrect,rightCorrect){
		$(leftCorrect).css({"color":"#404040","background":"#fff"});
		$(rightCorrect).css({"border-top":"none","background":"#fff"})
	}
	function wrongColor(leftWrong,rightWrong){
		$(leftWrong).css({"color":"red","background":"#fee1e5"});
		$(rightWrong).css({"border-top":"2px solid #fee1e5","background":"#fee1e5"})
	}	
	//键盘弹起头部在中间在iOS中
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
		$(".commodity-list").on("focus","input",function(){
			$(".top").css({
				'position':'absolute'
			})
		})
	}
	//解决顶部脱离文档流
	function fix(){
		$(".top").css({
			'position':'fixed'
		})
		setTimeout(function(){
			var scrollTop=$(window).scrollTop();
			$(window).scrollTop(scrollTop)
		},1000/60)
	}
	/*--------------------我是消费者的内容--------------------*/		
	//姓名
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");
	var nameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/	;
	var numReg = /\d+$/;
	var numberReg = /^\d+$/;
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;	
	$("#writeName").on("blur",function(e){	
		var writeName=$("#writeName").val();	
		if(writeName.length>0 && writeName.length<=5 && (!numReg.test(writeName)) && nameReg.test(writeName) && (!pattern.test(writeName))){			
			correctColor("#writeName",".name")			
		}else if(writeName==""){		
			$("#writeName").val("姓名不能为空")
            wrongColor("#writeName",".name")
		}else if(pattern.test(writeName)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#writeName",".name")
		}else if(numReg.test(writeName)){
			alert("含有数字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有数字符且长度大于5"
                },
                function() {})*/
			wrongColor("#writeName",".name")
		}else{
			alert("姓名至多5个字")
			/*WPBridge.cal2lMethod("JsInvokeNative", "wpShowToast", {
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
	//手机号
	$("#writeNumber").on("blur",function(e){	
		var writeNumber=$("#writeNumber").val();
		if(reg.test(writeNumber)){
			correctColor("#writeNumber",".phonenumber")
		}else if(writeNumber==""){
			$("#writeNumber").val("手机号不能为空")
            wrongColor("#writeNumber",".phonenumber")
		}else{
			alert("请填写正确的手机号")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "请填写正确的手机号"
                },
                function() {})*/
			wrongColor("#writeNumber",".phonenumber")
		}	
		fix();
	})
	$("#writeNumber").focus(function(){
		correctColor("#writeNumber",".phonenumber")
	})
	//短信验证码
	getCode();
	function getCode(){
		$("#get").click(function(){	
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
					console.log(that.innerHTML)
					if(timeSec==0){
						clearInterval(timer)
						that.innerHTML="获取验证码";
						that.flag=false;	
						$("#get").css({"color":"#ff7a11"})
					}
				},1000)					
			}
			$("#get").css({"color":"#404040"})	
			fix();
		})
	}
	//住址
	$("#writeAddress").on("blur",function(e){
		var writeAddress=$("#writeAddress").val();
		if(writeAddress.length>0 && writeAddress.length<=30 && (!pattern.test(writeAddress))){			
			correctColor("#writeAddress",".address")
		}else if(writeAddress==""){
			$("#writeAddress").val('住址不能为空');
			wrongColor("#writeAddress",".address")
		}else if(pattern.test(writeAddress)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#writeAddress",".address")
		}else{
			alert("住址至多30个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "住址至多30个字"
                },
                function() {})*/
			wrongColor("#writeAddress",".address")
		}	
		fix();
	})
	$("#writeAddress").focus(function(){
		correctColor("#writeAddress",".address")
	})
	//产品型号
	$("#writeProduct").on("blur",function(e){
		var writeProduct=$("#writeProduct").val();
		if(writeProduct.length>0 && writeProduct.length<=50 && (!pattern.test(writeProduct))){
			correctColor("#writeProduct",".product-model")
		}else if(writeProduct==""){
            $("#writeProduct").val("产品型号不能为空")
            wrongColor("#writeProduct",".product-model")
		}else if(pattern.test(writeProduct)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#writeProduct",".product-model")
		}else{
			alert("产品型号至多50个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "产品型号至多50个字"
                },
                function() {})*/
			wrongColor("#writeProduct",".product-model")
		}	
		fix();
	})
	$("#writeProduct").focus(function(){
		correctColor("#writeProduct",".product-model")
	})
	//购买数量
	$("#writeNum").on("blur",function(e){
		var writeNum=$("#writeNum").val();
		if(writeNum.length>0 && writeNum.length<=1 && numberReg.test(writeNum)){
			correctColor("#writeNum",".number")
		}else if(writeNum==""){
			$("#writeNum").val("购买数量不能为空!")
			wrongColor("#writeNum",".number")
		}else{
			alert("购买数量至多4个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "购买数量至多4个字"
                },
                function() {})*/
			wrongColor("#writeNum",".number")
		}	
		fix();
	})
	$("#writeNum").focus(function(){
		correctColor("#writeNum",".number")
	})
	//备注
	$("#writeMore").on("blur",function(e){
		var writeMore=$("#writeMore").val();
		if(writeMore.length>0 && writeMore.length<=200 && (!pattern.test(writeMore))){
			correctColor("#writeMore",".remark")
		}else if(writeMore==""){
			$("#writeMore").val("备注不能为空")
			wrongColor("#writeMore",".remark")
		}else if(pattern.test(writeMore)){
			alert("含有非法字符且长度大于200")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#writeMore",".remark")
		}else{
			alert("备注至多200个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "备注至多200个字"
                },
                function() {})*/
			wrongColor("#writeMore",".remark")
		}	
		fix();
	})
	$("#writeMore").focus(function(){
		correctColor("#writeMore",".remark")
	})
	$(".finish-install").click(function(){
		var finish=$(this).text()
		localStorage.setItem("finish",finish);
	})
	//点击提交
	$(".submit").click(function(){
		$(".picture").hide();
		$(".consumer-agency").hide();
		$(".background").hide();
		$("#consumer-content").hide();
		$(".loading").show();
		$(".middle img").attr('src',"images/enterSuccess.png");
		$(".middle p").html("登录成功");
		$("body").css("background","#F8F8F8")
		fix();
	})
	/*--------------------我是商家的内容--------------------*/
	//商家消费者姓名
	$("#agencyConsumer").on("blur",function(e){
		var agencyConsumer=$("#agencyConsumer").val();
		if(agencyConsumer.length>0 && agencyConsumer.length<=5 && (!numReg.test(agencyConsumer)) && nameReg.test(agencyConsumer) && (!pattern.test(agencyConsumer))){
			correctColor("#agencyConsumer",".consumer-name")
		}else if(agencyConsumer==""){
			$("#agencyConsumer").val("消费者姓名不能为空")
			wrongColor("#agencyConsumer",".consumer-name")			
		}else if(pattern.test(agencyConsumer)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyConsumer",".consumer-name")
		}else if(numReg.test(agencyConsumer)){
			alert("含有数字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有数字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyConsumer",".consumer-name")
		}else{
			alert("消费者姓名至多5个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "消费者姓名至多5个字"
                },
                function() {})*/
			wrongColor("#agencyConsumer",".consumer-name")
		}	
		fix();
	})
	$("#agencyConsumer").focus(function(){
		correctColor("#agencyConsumer",".consumer-name")
	})
	//商家消费者手机号
	$("#agencyPhone").on("blur",function(e){	
		var agencyPhone=$("#agencyPhone").val();
		if(reg.test(agencyPhone)){
			correctColor("#agencyPhone",".consumer-phonenumber")
		}else if(agencyPhone==""){
			$("#agencyPhone").val("消费者手机号不能为空")
			wrongColor("#agencyPhone",".consumer-phonenumber")
		}else{
			alert("请填写正确的手机号")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "请填写消费者的手机号"
                },
                function() {})*/
			wrongColor("#agencyPhone",".consumer-phonenumber")
		}	
		fix();
	})
	$("#agencyPhone").focus(function(){
		correctColor("#agencyPhone",".consumer-phonenumber")
	})
	//商家消费者住址
	$("#agencyAddress").on("blur",function(e){
		var agencyAddress=$("#agencyAddress").val();
		if(agencyAddress.length>0 && agencyAddress.length<=30 && (!pattern.test(agencyAddress))){
			correctColor("#agencyAddress",".consumer-address")
		}else if(agencyAddress==""){
			$("#agencyAddress").val("消费者住址不能为空")
			wrongColor("#agencyAddress",".consumer-address")
		}else if(pattern.test(agencyAddress)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyAddress",".consumer-address")
		}else{
			alert("消费者住址至多30个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "消费者住址至多30个字"
                },
                function() {})*/
			wrongColor("#agencyAddress",".consumer-address")
		}
		fix();
	})
	$("#agencyAddress").focus(function(){
		correctColor("#agencyAddress",".consumer-address")
	})
	//商家您的姓名
	$("#agencyName").on("blur",function(e){
		var agencyName=$("#agencyName").val();
		if(agencyName.length>0 && agencyName.length<=5 && (!numReg.test(agencyName)) && nameReg.test(agencyName) && (!pattern.test(agencyName))){
			correctColor("#agencyName",".agency-name")
		}else if(agencyName==""){
			$("#agencyName").val("您的姓名不能为空")
			wrongColor("#agencyName",".agency-name")
		}else if(pattern.test(agencyName)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyName",".agency-name")
		}else if(numReg.test(agencyName)){
			alert("含有数字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有数字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyName",".agency-name")
		}else{
			alert("姓名至多5个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "姓名至多5个字"
                },
                function() {})*/
			wrongColor("#agencyName",".agency-name")
		}
		fix();
	})
	$("#agencyName").focus(function(){
		correctColor("#agencyName",".agency-name")
	})
	//商家您的手机号
	$("#agencyTelephone").on("blur",function(e){
		var agencyTelephone=$("#agencyTelephone").val();
		if(regs.test(agencyTelephone)){
			correctColor("#agencyTelephone",".agency-phonenumber")
		}else if(agencyTelephone==""){	
			$("#agencyTelephone").val("您的手机号不能为空")
			wrongColor("#agencyTelephone",".agency-phonenumber")
		}else{
			alert("请填写正确的手机号")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "请填写您的手机号"
                },
                function() {})*/
			wrongColor("#agencyTelephone",".agency-phonenumber")
		}
		fix();
	})
	$("#agencyTelephone").focus(function(){
		correctColor("#agencyTelephone",".agency-phonenumber")
	})
	//商家短信验证码
	getAgencyCode();
	function getAgencyCode(){
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
	//商家产品型号
	$("#agencyModel").on("blur",function(e){
		var agencyModel=$("#agencyModel").val();
		if(agencyModel.length>0 && agencyModel.length<=50 && (!pattern.test(agencyModel))){
			correctColor("#agencyModel",".agency-product-model")
		}else if(agencyModel==""){
			$("#agencyModel").val("产品型号不能为空")
			wrongColor("#agencyModel",".agency-product-model")
		}else if(pattern.test(agencyModel)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyModel",".agency-product-model")
		}else{
			alert("产品型号至多50个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "产品型号至多50个字"
                },
                function() {})*/
			wrongColor("#agencyModel",".agency-product-model")
		}	
		fix();
	})
	$("#agencyModel").focus(function(){
		correctColor("#agencyModel",".agency-product-model")
	})
	//商家购买数量
	$("#agencyNumber").on("blur",function(e){
		var agencyNumber=$("#agencyNumber").val();
		if(agencyNumber.length>0 && agencyNumber.length<=1 && numberReg.test(agencyNumber)){
			correctColor("#agencyNumber",".agency-number")
		}else if(agencyNumber==""){
			$("#agencyNumber").val("购买数量不能为空")
			wrongColor("#agencyNumber",".agency-number")
		}else{
			alert("购买数量至多4个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "购买数量至多4个字"
                },
                function() {})*/
			wrongColor("#agencyNumber",".agency-number")
		}	
		fix();
	})
	$("#agencyNumber").focus(function(){
		correctColor("#agencyNumber",".agency-number")
	})
	//商家备注
	$("#agencyRemark").on("blur",function(e){
		var agencyRemark=$("#agencyRemark").val();
		if(agencyRemark.length>0 && agencyRemark.length<=200 && (!pattern.test(agencyRemark))){
			correctColor("#agencyRemark",".agency-remark")
		}else if(agencyRemark==""){
			$("#agencyRemark").val("备注不能为空")
			wrongColor("#agencyRemark",".agency-remark")
		}else if(pattern.test(agencyRemark)){
			alert("含有非法字符且长度大于5")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "含有非法字符且长度大于5"
                },
                function() {})*/
			wrongColor("#agencyRemark",".agency-remark")
		}else{
			alert("备注至多200个字")
			/*WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "备注至多200个字"
                },
                function() {})*/
			wrongColor("#agencyRemark",".agency-remark")
		}	
		fix();
	})
	$("#agencyRemark").focus(function(){
		correctColor("#agencyRemark",".agency-remark")
	})
	//点击商家的提交
	$(".submits").click(function(){
		$(".picture").hide();
		$(".consumer-agency").hide();
		$(".background").hide();
		$("#agency-content").hide();
		$(".loading").show();
		$(".middle img").attr('src',"images/enterSuccess.png");
		$(".middle p").html("登录成功");
		$("body").css("background","#F8F8F8");
		fix();
	})	
	//返回上一页
	/*$("#back").on('click',function(){
		WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})*/
	
	//判断id是否售出
	//是的话状态消失
	
	
	
})
    