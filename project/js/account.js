// JavaScript Document
if(LoginName == "") window.location.href = "login.html";
$("#AccountName").html(LoginName)
$("#Account").html("(" + LoginAccount[0] + ")");
for(var i = 1; i < LoginInfo.length; i++){
	$("#PermitInfo").append('<span class="PermitItem"><a>' + SearchPermit(LoginInfo[i]) + '</a><label data-permit="' + LoginInfo[i] + '">退还</label></span>');
}
$('.PermitItem label').mousedown(function(){
	console.log($(this).data("permit"));
	DeletePermit($(this).data("permit"));
	CustomAlert("提示", "许可证已退还", function(){
		window.location.href = "account.html";
	})
})
$("#Logout").mousedown(function(){
	localStorage.removeItem("LoginAccount");
	CustomAlert("提示", "已退出登录", function(){
		window.location.href = "login.html";
	})
})
$(".PermitItem").mouseenter(function(){
	$(this).stop(true, false);
	$(this).animate({marginTop: 5, marginBottom: 5, paddingTop: 20, paddingBottom: 20, backgroundSize: 100, backgroundPositionY: -5, backgroundPositionX: 5}, 300);
})
$(".PermitItem").mouseleave(function(){
	$(this).stop(true, false);
	$(this).animate({marginTop: 15, marginBottom: 15, paddingTop: 10, paddingBottom: 10, backgroundSize: 90, backgroundPositionY: -10, backgroundPositionX: -10}, 300);
})