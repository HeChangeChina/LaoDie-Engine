// JavaScript Document
function Refresh(){
	$(".Item").mouseenter(function(){
		$(this).stop(true, false);
		$(this).animate({marginTop: 0, height: 190, marginBottom: 0, borderColor: "rgba(230,180,110,0.00)"}, 300);
		$(this).children(".DownLoad").stop(true, false);
		$(this).children(".DownLoad").animate({opacity: 1}, 300)
	})
	$(".Item").mouseleave(function(){
		$(this).stop(true, false);
		$(this).animate({marginTop: 15, height: 150, marginBottom: 20, top: 0}, 300);
		$(this).children(".DownLoad").stop(true, false);
		$(this).children(".DownLoad").animate({opacity: 0}, 300)
	})
}
Refresh();
$(".ChoiceMenu label").mousedown(function(){
	$(".ChoiceMenu label").removeClass("Choice");
	$(this).addClass("Choice");
	$("#UpdatingDiv").css("display", "none");
	$("#AllDiv").css("display", "none");
	$("#NotSupportDiv").css("display", "none");
	$("#" + $(this).attr('id') + "Div").css("display", "inherit");
})
var arg = GetQueryVariable("item");
if(arg != false){
	$(window).scrollTop($("." + arg).offset().top - 200);
	$("." + arg).css("border-color", "rgba(230,180,110,1.00)");
	$("." + arg).animate({borderColor: "rgba(230,180,110,0.00)"}, 2000);
}

if(HavePermit("LaoDiePro")){
	$(".LaoDiePro .Permit").html("下载");
	$(".LaoDiePro .Permit").removeClass("Permit");
}
if(HavePermit("LaoDieCom")){
	$(".LaoDieCom .Permit").html("下载");
	$(".LaoDieCom .Permit").removeClass("Permit");
}
if(HavePermit("Multi")){
	$(".Multi .Permit").html("下载");
	$(".Multi .Permit").removeClass("Permit");
}
function PermitGet(Name){
	if(LoginName != ""){
		GetPermit(Name)
		CustomAlert("提示", "成功获取许可证", function(){
			window.location.href = "products.html";
		})
	}else{
		CustomAlert("提示", "请先登录", function(){
			window.location.href = "login.html";
		})
	}
}

$(".LaoDiePro .Permit").mousedown(function(){
	PermitGet("LaoDiePro")
})
$(".LaoDieCom .Permit").mousedown(function(){
	PermitGet("LaoDieCom")
})
$(".Multi .Permit").mousedown(function(){
	PermitGet("Multi")
})
$(".DownLoad").mousedown(function(){
	CustomAlert("警告", "该资源不存在。")
})

