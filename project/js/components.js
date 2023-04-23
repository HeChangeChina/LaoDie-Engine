// JavaScript Document
var MenuClose = "";

$(".Button").mouseenter(function(){
	$(this).stop(true, false);
	$(this).animate({borderColor : "rgba(220, 220, 220, 1)"}, 150);
});

$(".Button").mouseleave(function(){
	$(this).stop(true, false);
	$(this).animate({borderColor : "rgba(220, 220, 220, 0)"}, 150);
});
$("#HeadGuider").append('<div id="HeadMenu"></div>');
$(".HeadButton").mouseenter(function(){
	$(this).stop(true, false);
	$(this).animate({backgroundColor : "rgba(255, 255, 255, 0.25)"}, 200);
	var MenuList = ($(this).attr("data-menu") == undefined ? "" : $(this).attr("data-menu")).split(" ");
	if(MenuList.length > 1){
		if(MenuClose != "") clearTimeout(MenuClose);
		MenuClose = "";
		$("#HeadMenu").stop(true, false);
		$("#HeadMenu").css("pointer-events", "all");
		$("#HeadMenu").css("top", "70px");
		$("#HeadMenu").animate({left : $(this).offset().left - 25, opacity: 1, height : MenuList.length / 2 * 40}, 400);
		$(".MenuItem").stop(true, false);
		$(".MenuItem").animate({opacity : 0}, 100);
		setTimeout(function(){
			$(".MenuItem").remove();
			for(var i = 0; i < MenuList.length; i += 2){
				$("#HeadMenu").append('<label class="MenuItem" + data-jump="' + MenuList[i + 1] + '">' + MenuList[i] + '</label>');
			}
			$(".MenuItem").css("opacity", 0);
			$(".MenuItem").animate({opacity : 1}, 200);
			$(".MenuItem").mouseenter(function(){
				$(this).stop(true, true);
				$(this).animate({backgroundColor: "rgba(200, 200, 200, 1.00)"}, 100);
			});
			$(".MenuItem").mouseleave(function(){
				$(this).stop(true, true);
				$(this).animate({backgroundColor: "rgba(200, 200, 200, 0.00)"}, 100);
			});
			RefreshLink();
		}, 200);
	}
});
$(".HeadButton").mouseleave(function(){
	$(this).stop(true, false);
	$(this).animate({backgroundColor : "rgba(255, 255, 255, 0.00)"}, 200);
	var MenuList = ($(this).attr("data-menu") == undefined ? "" : $(this).attr("data-menu")).split(" ");
	if(MenuList.length > 1){
		if(MenuClose != "") clearTimeout(MenuClose);
		MenuClose = "";
		MenuClose = setTimeout(HideHeadMenu, 100);
	}
});
$("#HeadMenu").mouseenter(function(){
	if(MenuClose != "") clearTimeout(MenuClose);
	MenuClose = "";
});
$("#HeadMenu").mouseleave(function(){
	MenuClose = setTimeout(HideHeadMenu, 200);
});

function HideHeadMenu(){
	$("#HeadMenu").stop(true, false);
	$("#HeadMenu").css("pointer-events", "none");
	$("#HeadMenu").animate({height : 0, opacity : 0}, 400);
	$(".MenuItem").animate({opacity : 0}, 200);
}

function RefreshLink(){
	$("*").mousedown(function(){
		if($(this).attr("data-jump") != null){
			window.location.href = $(this).attr("data-jump");
		}else if($(this).attr("data-open") != null){
			window.open($(this).attr("data-open"));
		}
	})
}
function CustomAlert(topic, text, recall){
	if($(".AlertBG").length == 0){
		$("body").append('<div class="AlertBG"><div class="AlertDiv"><a class="CenterTopic">' + topic + '</a><label class="AlertButton">✕</label><div class="AlertTextArea"><a class="AlertText">' + text + '</a></div></div></div>');
		$(".AlertBG").animate({opacity: 1}, 500);
		$(".AlertDiv").animate({width: 360, height: 360, top: innerHeight / 2 - 200, left: innerWidth / 2 - 200}, 300, function(){
			$(".AlertTextArea").animate({opacity: 1}, 200);
		});
		$(".AlertButton").click(function(){
			$(".AlertBG").stop(true, false);
			$(".AlertDiv").stop(true, false);
			$(".AlertTextArea").stop(true, false);
			$(".AlertBG").animate({opacity: 0}, 500, function(){
					$(".AlertBG").remove();
				})
			$(".AlertTextArea").animate({opacity: 0}, 200, function(){
				if(recall != undefined) recall();
				$(".AlertDiv").animate({width: 0, height: 0, top: innerHeight / 2 - 20, left: innerWidth / 2 - 20}, 300);
			});
		})
	}
}

function Login(Account, Password){
	var AccountList = localStorage.getItem("AccountsList").split("|");
	for(var i = 0; i < AccountList.length; i+=2){
		if(Account == AccountList[i] && Password == AccountList[i + 1]){
			AccountData = "Account_" + Account;
			var AccountInfo = localStorage.getItem(AccountData).split("|");
			localStorage.setItem("LoginAccount", Account + "|" + Password)
			$("#Login").html(AccountInfo[0]);
			$("#Login").addClass("LoginAccount");
			LoginName = AccountInfo[0];
			LoginInfo = AccountInfo;
			return true;
		}
	}
	return false;
}
var LoginName = "";
var AccountData = ""
var LoginInfo = [];
if(localStorage.getItem("LoginAccount") != null && localStorage.getItem("AccountsList") != null){
	var LoginAccount = localStorage.getItem("LoginAccount").split("|");
	Login(LoginAccount[0], LoginAccount[1]);
}
RefreshLink();

function HavePermit(Name){
	if(LoginName == "") return false;
	for(var i = 1; i < LoginInfo.length; i++){
		if(LoginInfo[i] == Name) return true;
	}
	return false;
}
function GetPermit(Name){
	if(LoginName == "") return false;
	if(!HavePermit(Name)){
		LoginInfo.push(Name);
		localStorage.setItem(AccountData, LoginInfo.join("|"))
	}
}
function DeletePermit(Name){
	if(LoginName == "") return false;
	if(HavePermit(Name)){
		LoginInfo.splice(LoginInfo.indexOf(Name), 1);
		localStorage.setItem(AccountData, LoginInfo.join("|"))
	}
}
function SearchPermit(Name){
	switch(Name){
		case "LaoDiePro":
			return "老爹引擎专业版";
		case "LaoDieCom":
			return "老爹引擎企业版";
		case "Multi":
			return "Multiply 游戏托管服务";
	}
	return null;
}
function GetQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

