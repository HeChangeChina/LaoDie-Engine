// JavaScript Document
//if(LoginName != "") window.location = "login.html";
$("#Logon").mousedown(function(){
	if(!$("#Agreement").prop("checked")){
		CustomAlert("注册失败", "请先阅读并同意《老爹账号服务条款》与《隐私政策》");
		return;
	}
	var Name = $("#LogonName").val();
	var Password = $("#LogonPassWord").val();
	var Account = $("#LogonAccount").val();
	if(Name == ""){
		CustomAlert("注册失败", "账号名不能为空");
		return;
	}
	if(Password == "" || Account == ""){
		CustomAlert("注册失败", "账号与密码不能为空");
		return;
	} 
	if(Password.indexOf("|") != -1 || Account.indexOf("|") != -1){
		CustomAlert("注册失败", "账号与密码不能包含特殊符号");
		return;
	}
	if(Password == $("#ConfirmPassWord").val()){
		var AccountsList = localStorage.getItem("AccountsList");
		if(AccountsList != null){
			AccountsList = AccountsList.split("|");
			for(var i = 0; i < AccountsList.length; i += 2){
				if(AccountsList[i] == Account){
					CustomAlert("注册失败", "账号已存在");
					return;
				}
			}
			AccountsList.push(Account);
			AccountsList.push(Password);
			localStorage.setItem("AccountsList", AccountsList.join("|"));
			localStorage.setItem("LoginAccount", Account + "|" + Password);
			localStorage.setItem("Account_" + Account, Name);
			CustomAlert("注册成功", "欢迎，" + Name + "。", function(){
				window.location = "login.html";
			});
		}else{
			localStorage.setItem("AccountsList", Account + "|" + Password);
			localStorage.setItem("LoginAccount", Account + "|" + Password);
			localStorage.setItem("Account_" + Account, Name);
			CustomAlert("注册成功", "欢迎，" + Name + "。", function(){
				window.location = "login.html";
			});
		}
	}else{
		CustomAlert("注册失败", "两次输入的密码不一致");
	}
})
$("#Agreement").mousedown(function(){
	if(!$(this).prop("checked")){
		$("#AgreementLine").stop(true, false);
		$("#AgreementLine").animate({backgroundColor: "rgba(180, 220, 155, 1)"}, 200);
	}else{
		$("#AgreementLine").stop(true, false);
		$("#AgreementLine").animate({backgroundColor: "rgba(230, 190, 190, 1)"}, 200);
	}
})




