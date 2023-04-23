if(LoginName != ""){
	window.location.href = "account.html";
}
$("#login").mousedown(function(){
	var Account = $("#LoginAccount").val();
	var Password = $("#LoginPassWord").val();
	if(Login(Account, Password)){
		CustomAlert("登录成功", "欢迎，" + LoginInfo[0] + "。", function(){
			window.location = "login.html";
		});
	}else{
		CustomAlert("登录失败", "账号或密码错误。");
	}
});
$("#LoginPassWord").keydown(function(evt){
	if(evt.which == 13){
		$("#login").mousedown();
	}
})
$("#AccountTip").mousedown(function(){
	CustomAlert("关于账号","由于本次制作不涉及后端，所有的账号均存储在localStorage中，均为永久存储，不再需要使用的时候请注销所有的账号。");
})
$("#DeleteAllAccount").mousedown(function(){
	localStorage.removeItem("LoginAccount");
	var AccountsList = localStorage.getItem("AccountsList");
	if(AccountsList != null){
		AccountsList = AccountsList.split("|")
		for(var i = 0; i < AccountsList.length; i += 2){
			localStorage.removeItem("Account_" + AccountsList[i]);
		}
		localStorage.removeItem("AccountsList");
	}
	CustomAlert("注销账号","注销成功");
})
$("#FogetPassword").mousedown(function(){
	AllPassWord = "";
	var AccountsList = localStorage.getItem("AccountsList");
	if(AccountsList != null){
		AccountsList = AccountsList.split("|")
		for(var i = 0; i < AccountsList.length; i += 2){
			AllPassWord += "账号名："  + localStorage.getItem("Account_" + AccountsList[i]).split("|")[0] + "<br>";
			AllPassWord += "账号："  + AccountsList[i] + "<br>";
			AllPassWord += "密码："  + AccountsList[i + 1] + "<br><br>";
		}
		CustomAlert("账号列表", AllPassWord);
	}else{
		CustomAlert("账号列表", "没有任何已注册的账号。");
	}
})