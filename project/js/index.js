$("#LaoDieHeadTopic").css("opacity", 0);
$("#SubTitle").css("opacity", 0);
$("#TopicLogo").css("opacity", 0);
$("#TopicHr").css("opacity", 0);
$("#DownLoad").css("opacity", 0);
$(".TopicHrefText").css("opacity", 0);

setTimeout(function(){
	$("#TopicLogo").animate({opacity: 0.4}, 1500, function(){
		$("#LaoDieHeadTopic").animate({opacity: 1}, 700, function(){
			$("#SubTitle").animate({opacity: 1}, 700);
			$("#TopicHr").animate({opacity: 1}, 700);
			setTimeout(function(){
				$("#DownLoad").animate({opacity: 1}, 500);
				$(".TopicHrefText").animate({opacity: 1}, 500);
			}, 300);
		});
	});
	$("#TopicLogo").rotate({animateTo: 720, duration: 3000});
}, 1500);

var MenuClose = "";

$(".TopicHrefText").mouseenter(function(){
	var MenuList = ($(this).attr("data-menu")).split(" ");
	$(this).stop(true, false);
	$(this).animate({color : "rgba(170, 110, 70, 1)"}, 200);
	if(MenuList.length > 1){
		if(MenuClose != "") clearTimeout(MenuClose);
		MenuClose = "";
		$("#HeadMenu").stop(true, false);
		$("#HeadMenu").css("pointer-events", "all");
		$("#HeadMenu").css("top", "140px");
		$("#HeadMenu").animate({left : $(this).offset().left, opacity: 1, height : MenuList.length / 2 * 40}, 400);
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
$(".TopicHrefText").mouseleave(function(){
	var MenuList = ($(this).attr("data-menu")).split(" ");
	$(this).stop(true, false);
	$(this).animate({color : "rgba(180, 180, 180, 1)"}, 200);
	if(MenuList.length > 1){
		if(MenuClose != "") clearTimeout(MenuClose);
		MenuClose = "";
		MenuClose = setTimeout(HideHeadMenu, 100);
	}
});

function HideHeadMenu(){
	$("#HeadMenu").stop(true, false);
	$("#HeadMenu").css("pointer-events", "none");
	$("#HeadMenu").animate({height : 0, opacity : 0}, 400);
	$(".MenuItem").animate({opacity : 0}, 200);
}

function RefreshLink(){
	$("label").mousedown(function(){
		if($(this).attr("data-jump") != null){
			window.location.href = $(this).attr("data-jump");
		}else if($(this).attr("data-open") != null){
			window.open($(this).attr("data-jump"));
		}
	})
}
$(".ServeItem").mouseenter(function(){
	$(this).stop(true,false);
	$(this).animate({marginTop: -5, height: 470}, 400);
	$(this).children(".ServeImg").stop(true, false);
	$(this).children(".ServeImg").animate({height: 200}, 400);
})
$(".ServeItem").mouseleave(function(){
	$(this).stop(true,false);
	$(this).animate({marginTop: 15, height: 430}, 400);
	$(this).children(".ServeImg").stop(true, false);
	$(this).children(".ServeImg").animate({height: 160}, 400);
})

$("#LearnMore").mousedown(function(){
	$("body").stop(true, false);
	$("html,body").animate({scrollTop: $("#Page002").offset().top}, 600, function(){
		$("body").css("overflow-y", "auto");
	})
});

$(".CareerMask").mouseenter(function(){
	$(this).stop(true, false);
	$(this).animate({backgroundColor : "rgba(0, 0, 0, 0.6)"}, 400);
	$(this).find(".CareerTitle").stop(true, false);
	$(this).find(".CareerTitle").animate({fontSize: 30, lineHeight: 70}, 400);
	$(this).find(".MessageItemTitle").stop(true, false);
	$(this).find(".MessageItemTitle").animate({fontSize: 44, lineHeight: 100}, 400);
})
$(".CareerMask").mouseleave(function(){
	$(this).stop(true, false);
	$(this).animate({backgroundColor : "rgba(0, 0, 0, 0.2)"}, 400);
	$(this).find(".CareerTitle").stop(true, false);
	$(this).find(".CareerTitle").animate({fontSize: 26, lineHeight: 60}, 400);
	$(this).find(".MessageItemTitle").stop(true, false);
	$(this).find(".MessageItemTitle").animate({fontSize: 36, lineHeight: 80}, 400);
})

var GuiderHide = true;
function ShowHeadGuider(){
	if($("html").scrollTop() > 70 && GuiderHide){
		GuiderHide = false;
		$("#HeadGuider").stop(true, false);
		$("#HeadGuider").css("pointer-events", "all");
		$("#HeadGuider").animate({top : 0}, 300);
	}else if($("html").scrollTop() < 70 && !GuiderHide){
		GuiderHide = true;
		$("#HeadGuider").stop(true, false);
		$("#HeadGuider").css("pointer-events", "none");
		$("#HeadGuider").animate({top : -70}, 300);
	}
	window.requestAnimationFrame(ShowHeadGuider);
}
window.requestAnimationFrame(ShowHeadGuider);

if($("html").scrollTop() > 0){
   $("body").css("overflow-y", "auto");
}
if(LoginName != ""){
	$("#LoginWelcomePage").html(LoginName);
}


