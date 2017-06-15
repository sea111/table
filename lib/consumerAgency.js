$(function(){
	var orginUrl = "https://prea.wpwl.org";
	var baseKeyStr = null;
	var urlRequest=getUrlRequest();
	var install=0;
	var installs=0;
	//var labelCode = "31111120000000039";
	//获取链接中的数据
	function getUrlRequest() {
	    var url = location.search; //获取url中"?"符后的字串
	    var theRequest = new Object();
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        var regUrl = /^(\d+)/;
	        theRequest = regUrl.exec(str)[1];
	    }
	    return theRequest;
	}
	//获取key
	function getKeyStr(fn){	
	    $.ajax({
	    	// http://192.168.199.14/wpwl/getKey?clientType=5
	        url: orginUrl+"/wpservice/getKey?clientType=5",
	        type:"POST",
	        success: function (res) {
//	            baseKeyStr = res.data;
	            fn && fn(res.data)
	            console.log(res.data)
	        }
	    });
	}
	function getZPKKeyStr(fn){
		$.ajax({
	    	// http://192.168.199.14/wpwl/getKey?clientType=5
	        url: orginUrl+"/wpwl/getKey?clientType=5",
	        type:"POST",
	        success: function (res) {
				fn && fn(res.data)
	        }
	    });
	}
	getZPKKeyStr(function(keyCode){
		commodityData(keyCode)
	})
//	getKeyStr()	
	//加密函数
    function doEncrypt(plaintText,baseKeyStr){
        var keyStr = base64decode(baseKeyStr);
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var encryptedBase64Str = encryptedData.toString();
        return encryptedBase64Str;
    } 
	//展示图片，产品名，品牌名，
	function commodityData(keyCode){
		window.labelCode=urlRequest.toString();
		$.ajax({
			type:"POST",
			url:orginUrl+'/wpwl/saleRecord/getById',
			timeout:10000,
			data:{
				serialNo:doEncrypt(labelCode,keyCode),
				"versionId":27
			},
			success:function(datas){
				if(datas.success==false){
				
					$(".picture").hide();
					$(".consumer-agency").hide();
					$(".background").hide();
					$("#consumer-content").hide();
					$(".footer").hide();
					$("body").css("background","#F8F8F8")
					$(".loadEffect").hide().siblings(".middle").show();
					$(".middle img").attr('src',"images/error_else.png");
					$(".middle p").html("出错了，请稍后再试");
					//window.location.href="errorPage.html"
				}else{
					try{
						if(datas.success){
							var dt=datas.data;
							console.log(dt)
							window.isSold=dt.isSold;
							console.log(isSold)
							var img=dt.productUrl;
							var brandName=dt.brandName;
							var standard=dt.standard;
							var productName=dt.productName;								
							if(isSold=="yes"){
								//出售
								consumer=1;
								install=3;
								agency=2;
								installs=5;
							}else{
								//未出售
								consumer=1;
								install=0;
								agency=2;
								installs=5;
								installs=0;
								$(".commodity-status").show()
								$(".agency-identity").show()
							}
							$(".brand-picture img").attr("src",img);
							$(".brand-name").html(brandName+"."+productName+" "+standard)
							$(".loading").hide();
						}
					}catch(e){
						$(".picture").hide();
						$(".consumer-agency").hide();
						$(".background").hide();
						$("#consumer-content").hide();
						$(".footer").hide();
						$("body").css("background","#F8F8F8")
						$(".loadEffect").hide().siblings(".middle").show();
						$(".middle img").attr('src',"images/error_else.png");
						$(".middle p").html("出错了，请稍后再试");
						//window.location.href="errorPage.html"
					}
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
				if(textStatus=="timeout"){
					$(".picture").hide();
					$(".consumer-agency").hide();
					$(".background").hide();
					$("#consumer-content").hide();
					$(".footer").hide();
					$(".loadEffect").hide().siblings(".middle").show();
				}
			}
		});
	}
//	commodityData()	
	//重新加载
	$("#wpReload").click(function(){
		commodityData(keyCode)
		window.location.reload()
	})	
	//我是消费者和我是商家切换
	$(".consumer").click(function(){
		consumer=1;
		$(this).css({"border-top":"4px solid #4e9cfc","color":"#4e9cfc","background":"#f2f2f2"})
		$('.agency').css({"border-top":"4px solid #fff","color":"#bdbdbd","background":"#fff"})
		$("#consumer-content").show();
		$("#agency-content").hide();	
	})
	$(".agency").click(function(){
		agency=2;
		$(this).css({"border-top":"4px solid #4e9cfc","color":"#4e9cfc","background":"#f2f2f2"})
		$(".consumer").css({"border-top":"4px solid #fff","color":"#bdbdbd","background":"#fff"})
		$("#agency-content").show();
		$("#consumer-content").hide();
	})	
	//商品状态及你的身份
	$(".finish-install").click(function(){
		install=3;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".no-install-require").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
	$(".no-install-require").click(function(){
		install=4;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".finish-install").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
	$(".install-master").click(function(){
		installs=5;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".salesman").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
	$(".salesman").click(function(){
		installs=6;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".install-master").css({"background":"#f2f2f2","color":"#bdbdbd"})
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
	//Toast提示
	var Toast = function(config){  
	    this.context = config.context==null?$('body'):config.context;//上下文  
	    this.message = config.message;//显示内容  
	    this.time = config.time==null?3000:config.time;//持续时间  
	    this.left = config.left;//距容器左边的距离  
	    this.top = config.top;//距容器上方的距离  
	    this.init();  
	}  
	var msgEntity;  
	Toast.prototype = {  
	    //初始化显示的位置内容等  
	    init : function(){  
	        $("#toastMessage").remove();  
	        //设置消息体  
	        var msgDIV = new Array();  
	        msgDIV.push('<div id="toastMessage">');  
	        msgDIV.push('<span>'+this.message+'</span>');  
	        msgDIV.push('</div>');  
	        msgEntity = $(msgDIV.join('')).appendTo(this.context);  
	        //设置消息样式  
	        var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2-20 : this.left;  
	        var bottom = this.bottom == null ? '20px' : this.bottom;  
	        msgEntity.css({position:'absolute',bottom:bottom,'z-index':'99',left:left,'background-color':'black',color:'white','font-size':'12px',padding:'10px',margin:'10px'});  
//		        msgEntity.hide();  
	    },  
	    //显示动画  
	    show :function(){  
	        msgEntity.fadeIn(this.time/2);  
	        msgEntity.fadeOut(this.time/2);  
	    }  	          
	}
	//验证码
	$("#get").click(function(){	
		if($("#writeNumber").val()!="" && reg.test($("#writeNumber").val())){
			if(!this.flag){	
				_t=this;
				getKeyStr(function(baseKeyStr){
					$.ajax({
						url:orginUrl+"/wpservice/device/getDeviceCaptcha",
						type:"POST",
						data:{
							mobile:doEncrypt($("#writeNumber").val(),baseKeyStr)
						},
						success:function(datas){
							/*if(datas.errMsg=="验证码错误"){
								new Toast({context:$('body'),message:'验证码错误'}).show();
							}*/			
						}
					})
					_t.flag=true;		
					var timeSec=60;
					_t.innerHTML="60秒";
					var timer=setInterval(function(){
						_t.innerHTML=--timeSec+"秒";	
						if(timeSec==0){
							clearInterval(timer)
							_t.innerHTML="获取验证码";
							_t.flag=false;	
							$("#get").css({"color":"#ff7a11"})
						}
					},1000)		
				})
				$("#get").css({"color":"#404040"})	
			}			
		}
		fix();		
	})
	
	$("#getMessage").click(function(){	
		if($("#agencyTelephone").val()!="" && reg.test($("#agencyTelephone").val())){
			if(!this.flag){	
				var _t=this;
				getKeyStr(function(baseKeyStr){
					$.ajax({
						url:orginUrl+"/wpservice/device/getDeviceCaptcha",
						type:"POST",
						data:{
							mobile:doEncrypt($("#agencyTelephone").val(),baseKeyStr)
						},
						success:function(datas){
							/*console.log(JSON.stringify(datas))
							if(datas.errMsg=="验证码错误"){
								new Toast({context:$('body'),message:'验证码错误'}).show();
							}else if(datas.errMsg=="验证码超时")		{
								new Toast({context:$('body'),message:'验证码超时'}).show();
							}*/
						}
					})
					_t.flag=true;
					var timeSec=60;
					_t.innerHTML="60秒";
					var timer=setInterval(function(){
						_t.innerHTML=--timeSec+"秒";	
						if(timeSec==0){
							clearInterval(timer)
							_t.innerHTML="获取验证码";
							_t.flag=false;	
							$("#getMessage").css({"color":"#ff7a11"})
						}
					},1000)		
				})		
				$("#getMessage").css({"color":"#404040"})	
			}
		}
		fix();
	})

	/*--------------------我是消费者的内容--------------------*/		
	//姓名
	window.pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");
	window.nameReg = /[\u4e00-\u9fa5a-zA-Z0-9]+$/	;
	window.numReg = /\d+$/;
	window.numberReg = /^\d+$/;
	window.reg = /^1[3|4|5|7|8][0-9]{9}$/;	
	window.userErr={};
	window.agencyErr={};
	$("#writeName").on("blur",function(e){	
		var writeName=$("#writeName").val();
		$("#writeName").attr('realVal',writeName);
		var err='writeName';
		if(writeName.length>0 && writeName.length<=5 && (!numReg.test(writeName)) && nameReg.test(writeName) && (!pattern.test(writeName))){			
			correctColor("#writeName",".name")	
			err=''
		}else if(writeName==""){	
			$("#writeName").val("姓名不能为空");		
			//new Toast({context:$('body'),message:'姓名不能为空'}).show();
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
		userErr['writeName']=err
		fix();
	})		
	$("#writeName").focus(function(){
		correctColor("#writeName",".name")
		$("#writeName").val($("#writeName").attr('realVal'))
	})
	//手机号
	$("#writeNumber").on("blur",function(e){	
		var writeNumber=$("#writeNumber").val();
		$("#writeNumber").attr('realVal',writeNumber);
		var err='writeNumber';
		if(reg.test(writeNumber)){
			correctColor("#writeNumber",".phonenumber")
			err=''
		}else if(writeNumber==""){
			//$("#writeNumber").val("手机号不能为空")
			new Toast({context:$('body'),message:'手机号不能为空'}).show(); 
            wrongColor("#writeNumber",".phonenumber")
		}else{
			new Toast({context:$('body'),message:'请填写正确的手机号'}).show(); 
			wrongColor("#writeNumber",".phonenumber")
		}	
		userErr['writeNumber']=err
		fix();
	})
	$("#writeNumber").focus(function(){
		correctColor("#writeNumber",".phonenumber")
		$("#writeNumber").val($("#writeNumber").attr('realVal'))
	})
	//验证码
	$("#writeCode").blur(function(){
		var err='writeCode';
		/*if($("#writeCode").val().length>0 &&$("#writeCode").val().length<=6)){
			err=''
		}else */
		if($("#writeCode").val().length>6){
			new Toast({context:$('body'),message:'长度大于6'}).show(); 
		}
		userErr['writeCode']=err
	})
	//住址
	$("#writeAddress").on("blur",function(e){
		var writeAddress=$("#writeAddress").val();
		$("#writeAddress").attr('realVal',writeAddress);
		var err='writeAddress';
		if(writeAddress.length>0 && writeAddress.length<=30 && (!pattern.test(writeAddress))){			
			correctColor("#writeAddress",".address");
			err=''
		}else if(writeAddress==""){
			$("#writeAddress").val('');
			correctColor("#writeAddress",".address");
			err=''
		}else if(pattern.test(writeAddress)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#writeAddress",".address");

		}else{
			new Toast({context:$('body'),message:'住址至多30个字'}).show(); 
			wrongColor("#writeAddress",".address");

		}	
		userErr['writeAddress']=err
		fix();
	})
	$("#writeAddress").focus(function(){
		correctColor("#writeAddress",".address")
		$("#writeAddress").val($("#writeAddress").attr('realVal'))
	})
	//产品型号
	$("#writeProduct").on("blur",function(e){
		var writeProduct=$("#writeProduct").val();
		$("#writeProduct").attr('realVal',writeProduct);
		var err='writeProduct';
		if(writeProduct.length>0 && writeProduct.length<=50 && (!pattern.test(writeProduct))){
			correctColor("#writeProduct",".product-model")
			err=''
		}else if(writeProduct==""){
            $("#writeProduct").val("")
            correctColor("#writeProduct",".product-model")
            err=''
		}else if(pattern.test(writeProduct)){
			new Toast({context:$('body'),message:'含有非法字符'}).show(); 
			wrongColor("#writeProduct",".product-model")
		}else{
			new Toast({context:$('body'),message:'产品型号至多50个字'}).show(); 
			wrongColor("#writeProduct",".product-model")
			 
		}	
		userErr['writeProduct']=err
		fix();
	})
	$("#writeProduct").focus(function(){
		correctColor("#writeProduct",".product-model")
		$("#writeProduct").val($("#writeProduct").attr('realVal'))
	})
	//购买数量
	$("#writeNum").on("blur",function(e){
		var writeNum=$("#writeNum").val();
		$("#writeNum").attr('realVal',writeNum);
		var err='writeNum';
		if(writeNum.length>0 && writeNum.length<=4 && numberReg.test(writeNum)){
			correctColor("#writeNum",".number")
			err=''
		}else if(writeNum==""){
			$("#writeNum").val("")
			correctColor("#writeNum",".number")	
			err=''
		}else{
			new Toast({context:$('body'),message:'购买数量至多4个或只能输入数字'}).show(); 
			wrongColor("#writeNum",".number");
		}	
		userErr['writeNum']=err
		fix();
	})
	$("#writeNum").focus(function(){
		correctColor("#writeNum",".number")
		$("#writeNum").val($("#writeNum").attr('realVal'))
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
		userErr['writeMore']=err
		fix();
	})
	$("#writeMore").focus(function(){
		correctColor("#writeMore",".remark")
		$("#writeMore").val($("#writeMore").attr('realVal'))
	})
	//点击提交
	/*alert(install)*/
	$(".submit").click(function(){	
	/*	alert(install)*/
		if(install!==3 && install!==4){
			/*alert(1111)*/
			new Toast({context:$('body'),message:'商品状态/你的身份不能为空'}).show();
		}else{
			if(consumer==1){
				if(!$(this).hasClass("disabled")){
					$("#writeName").blur();
					$("#writeNumber").blur();
					$("#writeAddress").blur();
					$("#writeProduct").blur();
					$("#writeNum").blur();
					$("#writeMore").blur();
					/*$("#writeCode").blur();*/
					/*$(".no-install-require").click();
					$(".finish-install").click();*/
					var err=false;
					for(var name in userErr){
						if(userErr[name]){
							err=true;
						}
					}
					if(err.length){
						new Toast({context:$('body'),message:'数据有误'}).show(); 
						for(var name in userErr){
							userErr[name]=''
						}
					}else{
						var $t=$(this);
						$(this).addClass("disabled");
						var dts={};
				  		window.type="";
				  		if(isSold=="yes"){		
				  			type="0"
				  		}
				  		if(isSold=="no"){
				  			if(consumer==1 && install==4){
				  				//install=3代表安装=4代表不安装0-安装//1-售出//2-both
					  			type="1"
					  		}else if(consumer==1 && install==3){
					  			type="2"
					  		}
				  		}
//						alert(type)
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
					  		$.ajax({
								type:"POST",
								url:orginUrl+"/wpservice/device/install29",
								async:true,
								data:dts,
								timeout:10,
								success:function(datas){
//									alert(JSON.stringify(datas))
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
										$(".middle p").html("登记成功");
									}else{
										var mes=datas.errMsg;
										new Toast({context:$('body'),message:mes}).show();
									}
								},
								error:function(jqXHR, textStatus, errorThrown){
									if(textStatus=="timeout"){
										new Toast({context:$('body'),message:'网络超时'}).show();
									} 
									alert(1)
									$t.addClass("disabled");
									
								}
							});
					  	})
						fix();
					}	
				}	
			}			
		}

	})
	/*--------------------我是商家的内容--------------------*/
	//商家消费者姓名
	$("#agencyConsumer").on("blur",function(e){
		var agencyConsumer=$("#agencyConsumer").val();
		$("#agencyConsumer").attr('realVal',agencyConsumer);
		var aerr='agencyConsumer';
		if(agencyConsumer.length>0 && agencyConsumer.length<=5 && (!numReg.test(agencyConsumer)) && nameReg.test(agencyConsumer) && (!pattern.test(agencyConsumer))){
			correctColor("#agencyConsumer",".consumer-name")
			aerr=''
		}else if(agencyConsumer==""){
			$("#agencyConsumer").val("消费者姓名不能为空")
			wrongColor("#agencyConsumer",".consumer-name")			
		}else if(pattern.test(agencyConsumer)){ 
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#agencyConsumer",".consumer-name")
		}else if(numReg.test(agencyConsumer)){
			new Toast({context:$('body'),message:'含有数字符或长度大于5'}).show(); 
			wrongColor("#agencyConsumer",".consumer-name")
		}else{
			new Toast({context:$('body'),message:'消费者姓名至多5个字'}).show(); 
			wrongColor("#agencyConsumer",".consumer-name")
		}	
		agencyErr['agencyConsumer']=aerr
		fix();
	})
	$("#agencyConsumer").focus(function(){
		correctColor("#agencyConsumer",".consumer-name")
		$("#agencyConsumer").val($("#agencyConsumer").attr('realVal'))
	})
	//商家消费者手机号
	$("#agencyPhone").on("blur",function(e){	
		var agencyPhone=$("#agencyPhone").val();
		$("#agencyPhone").attr('realVal',agencyPhone);
		var aerr='agencyPhone';
		if(reg.test(agencyPhone)){
			correctColor("#agencyPhone",".consumer-phonenumber")
			aerr=''
		}else if(agencyPhone==""){
			$("#agencyPhone").val("消费者手机号不能为空")
			wrongColor("#agencyPhone",".consumer-phonenumber")
		}else{
			new Toast({context:$('body'),message:'请填写正确的手机号'}).show(); 
			wrongColor("#agencyPhone",".consumer-phonenumber")
		}	
		agencyErr['agencyPhone']=aerr
		fix();
	})
	$("#agencyPhone").focus(function(){
		correctColor("#agencyPhone",".consumer-phonenumber")
		$("#agencyPhone").val($("#agencyPhone").attr('realVal'))
	})
	//商家消费者住址
	$("#agencyAddress").on("blur",function(e){
		var agencyAddress=$("#agencyAddress").val();
		$("#agencyAddress").attr('realVal',agencyAddress);
		var aerr='agencyAddress';
		if(agencyAddress.length>0 && agencyAddress.length<=30 && (!pattern.test(agencyAddress))){
			correctColor("#agencyAddress",".consumer-address")
			aerr=''
		}else if(agencyAddress==""){
			$("#agencyAddress").val("")
			correctColor("#agencyAddress",".consumer-address")
			aerr=''
		}else if(pattern.test(agencyAddress)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#agencyAddress",".consumer-address")
		}else{
			new Toast({context:$('body'),message:'消费者住址至多30个字'}).show(); 
			wrongColor("#agencyAddress",".consumer-address")
		}
		agencyErr['agencyAddress']=aerr
		fix();
	})
	$("#agencyAddress").focus(function(){
		correctColor("#agencyAddress",".consumer-address")
		$("#agencyAddress").val($("#agencyAddress").attr('realVal'))
	})
	//商家您的姓名
	$("#agencyName").on("blur",function(e){
		var agencyName=$("#agencyName").val();
		$("#agencyName").attr('realVal',agencyName);
		var aerr='agencyName';
		if(agencyName.length>0 && agencyName.length<=5 && (!numReg.test(agencyName)) && nameReg.test(agencyName) && (!pattern.test(agencyName))){
			correctColor("#agencyName",".agency-name")
			aerr=''
		}else if(agencyName==""){
			$("#agencyName").val("您的姓名不能为空")
			wrongColor("#agencyName",".agency-name")
		}else if(pattern.test(agencyName)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#agencyName",".agency-name")
		}else if(numReg.test(agencyName)){
			new Toast({context:$('body'),message:'含有数字符或长度大于5'}).show(); 
			wrongColor("#agencyName",".agency-name")
		}else{
			new Toast({context:$('body'),message:'姓名至多5个字'}).show(); 
			wrongColor("#agencyName",".agency-name")
		}
		agencyErr['agencyName']=aerr
		fix();
	})
	$("#agencyName").focus(function(){
		correctColor("#agencyName",".agency-name")
		$("#agencyName").val($("#agencyName").attr('realVal'))
	})
	//商家您的手机号
	$("#agencyTelephone").on("blur",function(e){
		var agencyTelephone=$("#agencyTelephone").val();
		$("#agencyTelephone").attr('realVal',agencyTelephone);
		var aerr='agencyTelephone';
		if(reg.test(agencyTelephone)){
			correctColor("#agencyTelephone",".agency-phonenumber")
			aerr=''
		}else if(agencyTelephone==""){	
			$("#agencyTelephone").val("您的手机号不能为空")
			wrongColor("#agencyTelephone",".agency-phonenumber")
		}else{
			new Toast({context:$('body'),message:'请填写正确的手机号'}).show(); 
			wrongColor("#agencyTelephone",".agency-phonenumber")
		}
		agencyErr['agencyTelephone']=aerr
		fix();
	})
	$("#agencyTelephone").focus(function(){
		correctColor("#agencyTelephone",".agency-phonenumber")
		$("#agencyTelephone").val($("#agencyTelephone").attr('realVal'))
	})
	//验证码
	$("#agencyMessage").blur(function(){
		var aerr='agencyMessage';
		/*if($("#agencyMessage").val().length>0 && $("#agencyMessage").val().length<=6){
			aerr=""
		}else*/
		if($("#agencyMessage").val().length>6){
			new Toast({context:$('body'),message:'长度大于6'}).show(); 
		}
		agencyErr['agencyMessage']=aerr
	})
	//商家产品型号
	$("#agencyModel").on("blur",function(e){
		var agencyModel=$("#agencyModel").val();
		$("#agencyModel").attr('realVal',agencyModel);
		var aerr='agencyModel';
		if(agencyModel.length>0 && agencyModel.length<=50 && (!pattern.test(agencyModel))){
			correctColor("#agencyModel",".agency-product-model")
			aerr=''
		}else if(agencyModel==""){
			$("#agencyModel").val("")
			correctColor("#agencyModel",".agency-product-model")
			aerr=''
		}else if(pattern.test(agencyModel)){
			new Toast({context:$('body'),message:'含有非法字符'}).show(); 
			wrongColor("#agencyModel",".agency-product-model")
		}else{
			new Toast({context:$('body'),message:'产品型号至多50个字'}).show(); 
			wrongColor("#agencyModel",".agency-product-model")
		}	
		agencyErr['agencyModel']=aerr
		fix();
	})
	$("#agencyModel").focus(function(){
		correctColor("#agencyModel",".agency-product-model")
		$("#agencyModel").val($("#agencyModel").attr('realVal'))
	})
	//商家购买数量
	$("#agencyNumber").on("blur",function(e){
		var agencyNumber=$("#agencyNumber").val();
		$("#agencyNumber").attr('realVal',agencyNumber);
		var aerr='agencyNumber';
		if(agencyNumber.length>0 && agencyNumber.length<=4 && numberReg.test(agencyNumber)){
			correctColor("#agencyNumber",".agency-number")
			aerr=''
		}else if(agencyNumber==""){
			$("#agencyNumber").val("")
			correctColor("#agencyNumber",".agency-number")
			aerr=''
		}else{
			new Toast({context:$('body'),message:'购买数量至多4个或只能输入数字'}).show(); 
			wrongColor("#agencyNumber",".agency-number")
		}	
		agencyErr['agencyNumber']=aerr
		fix();
	})
	$("#agencyNumber").focus(function(){
		correctColor("#agencyNumber",".agency-number")
		$("#agencyNumber").val($("#agencyNumber").attr('realVal'))
	})
	//商家备注
	$("#agencyRemark").on("blur",function(e){
		var agencyRemark=$("#agencyRemark").val();
		$("#agencyRemark").attr('realVal',agencyRemark);
		var aerr='agencyRemark';
		if(agencyRemark.length>0 && agencyRemark.length<=200 && (!pattern.test(agencyRemark))){
			correctColor("#agencyRemark",".agency-remark");
			aerr=''
		}else if(agencyRemark==""){
			$("#agencyRemark").val("")
			correctColor("#agencyRemark",".agency-remark");
			aerr=''
		}else if(pattern.test(agencyRemark)){
			new Toast({context:$('body'),message:'含有非法字符且长度大于5'}).show(); 
			wrongColor("#agencyRemark",".agency-remark")
		}else{
			new Toast({context:$('body'),message:'备注至多200个字'}).show(); 
			wrongColor("#agencyRemark",".agency-remark")
		}	
		agencyErr['agencyRemark']=aerr
		fix();
	})
	$("#agencyRemark").focus(function(){
		correctColor("#agencyRemark",".agency-remark")
		$("#agencyRemark").val($("#agencyRemark").attr('realVal'))
	})
	//点击商家的提交	
	$(".submits").click(function(){
		if(installs!==5 && installs!==6){
			new Toast({context:$('body'),message:'商品状态/你的身份不为空'}).show();	
		}else{
				if(agency==2){
					if(!$(this).hasClass("disabled")){
						$("#agencyConsumer").blur();
						$("#agencyPhone").blur();
						$("#agencyAddress").blur();
						$("#agencyName").blur();
						$("#agencyTelephone").blur();
						$("#agencyModel").blur();
						$("#agencyNumber").blur();
						$("#agencyRemark").blur();	
						/*$("#agencyMessage").blur();*/
						/*$(".install-master").click();
						$(".salesman").click();*/
						var aerr=false;
						for(var names in agencyErr){
							if(agencyErr[names]){
								aerr=true;
							}
						}
						if(aerr.length){
							new Toast({context:$('body'),message:'数据有误'}).show(); 
							for(var names in agencyErr){
								agencyErr[names]=''
							}
						}else{
						/*if(agencyErr.length){
							new Toast({context:$('body'),message:'数据有误'}).show(); 
							agencyErr.length=0;
						}else{*/
							var $t=$(this);
							$(this).addClass("disabled");
							var dts={};
				  			window.type="";
					   		if(isSold=="yes"){
					  			type="0"
					  		}
					   		if(isSold=="no"){
					  			if(agency==2 && installs==6){
					  				//install=5代表安装师=6代表销售0-安装//1-售出//2-both
						  			type="1"
						  		}else if(agency==2 && installs==5){
						  			type="2"
						  		}				
					  		}
					  		getKeyStr(function(baseKeyStr){
					  			if($("#agency-content:visible").length){
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
						  		}else{
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
						  		}
//						  		alert(type)
						  		$.ajax({
									type:"POST",
									url:orginUrl+"/wpservice/device/install29",
									async:true,
									data:dts,
									timeout:10,
									success:function(datas){
//										alert(JSON.stringify(datas))
										$t.removeClass("disabled")								
										if(datas.success){
											$(".picture").hide();
											$(".consumer-agency").hide();
											$(".background").hide();
											$("#agency-content").hide();
											$(".footer").hide();
											$("body").css("background","#F8F8F8")
											$(".loading").show()
											$(".loadEffect").hide().siblings(".middle").show();
											$(".middle img").attr('src',"images/enterSuccess.png");
											$(".middle p").html("登记成功");
										}else{
											var mess=datas.errMsg;
											//alert(mess)
											new Toast({context:$('body'),message:mess}).show();
										}
									},
									error:function(jqXHR, textStatus, errorThrown){
										if(textStatus=="timeout"){
							            	new Toast({context:$('body'),message:'网络超时'}).show();
							            }
										$t.addClass("disabled");
									}
								});
						  	})
							fix();
						}
					}				
				}				
			}
		})	
})
    