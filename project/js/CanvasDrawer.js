// JavaScript Document
// radius, interval, TargetHeight, NowHeight, ReachPointAmount, alpha, OffsetRate-x
var CircleList = [];
// row, position-x, strength, width, speed
var NoiseList = [];
// raduis, speed, now-x, now-y
//var LitList = [];
var GirdAlpha = 1;
var NowCircleHeight = -100;
var NowBackgroundColor = 254;
var NowFrame = 0;

var TargetCanvas = document.getElementById("BackgroundCanvas");
var Context = TargetCanvas.getContext("2d");

TargetCanvas.width = window.innerWidth + 40;
TargetCanvas.height = window.innerHeight;

Context.fillStyle = Color(255, 255, 255, 1);
Context.beginPath();  
Context.fillRect(0,0,TargetCanvas.width,TargetCanvas.height);  
Context.closePath();

for(var i = 6; i >= 1; i-=0.15){
	AddCircle(i);
}
for(i = 0; i <= 15; i++){
	AddRandomNoise();
}
/*function AddRandomLit(){
	var NowX = Math.random() < 0.5 ? -30 : TargetCanvas.width + 30
	LitList.push([5 + Math.random() * 15, (15 + Math.random() * 20) * (NowX < 0 ? 1 : -1), NowX, TargetCanvas.height * 0.1 + Math.random() * TargetCanvas.height * 0.25])
}*/
function AddRandomNoise(){
	var Row = -4 + Math.floor(Math.random()*38)
	var StrengthRate = (50 - Row) / 50;
	var Width = (window.innerWidth * 0.1 + Math.random() * window.innerWidth * 0.4) * StrengthRate
	NoiseList.push([Row, -window.innerWidth * 0.4 + Math.random() * window.innerWidth * 1.8, (3 + Math.random() * 10) * StrengthRate, Width, (window.innerWidth * 0.4 / (Width + window.innerWidth * 0.3)) * StrengthRate * 4])
}
function AddRandomWaitNoise(){
	var Row = -4 + Math.floor(Math.random()*38)
	var StrengthRate = (50 - Row) / 50;
	var Width = (window.innerWidth * 0.1 + Math.random() * window.innerWidth * 0.4) * StrengthRate
	NoiseList.push([Row, -window.innerWidth * 0.35 * Math.random() - Width, (3 + Math.random() * 10) * StrengthRate, Width, (window.innerWidth * 0.4 / (Width + window.innerWidth * 0.3)) * StrengthRate * 4])
}
function AddCircle(radius){
	CircleList.push([radius, radius * radius + radius + 5, TargetCanvas.height - NowCircleHeight, -CircleList.length * TargetCanvas.height / 5, 1, 1 - CircleList.length / 30, 0]);
	NowCircleHeight += radius * 3 + 6;
}
function Color(red, green, blue, alpha){
	return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'
}
function peaks(x, center, width, strength){
	var Rate = (width - Math.abs(center - x)) / width;
	return (Math.cos((Rate + 1) * Math.PI) + 1) * 10 * strength;
}

function Update(){
	if(WaitFrame < 10){
		WaitFrame ++;
		NowFrame ++;
		if(NowBackgroundColor > 0){
			NowBackgroundColor -= 4;
		}
		Context.fillStyle = Color(NowBackgroundColor, NowBackgroundColor, NowBackgroundColor, 1);
		Context.beginPath();  
		Context.fillRect(0,0,TargetCanvas.width,TargetCanvas.height);  
		Context.closePath();
		
		// draw the gird
		if(NowFrame > 179 && NowFrame < 281){
			GirdAlpha = GirdAlpha - 0.015 > 0 ? GirdAlpha - 0.015 : 0;
			var Gradient = Context.createLinearGradient(0, 0, 0, TargetCanvas.height + 25);
			Gradient.addColorStop(1, Color(0, 0, 0, 1));
			Gradient.addColorStop(GirdAlpha + 0.2 > 1 ? 1 : GirdAlpha + 0.2, Color(0, 0, 0, 1));
			Gradient.addColorStop(GirdAlpha,  Color(135, 135, 135, 1));
			Gradient.addColorStop(GirdAlpha - 0.2 < 0 ? 0 : GirdAlpha - 0.2, Color(0, 0, 0, 1));
			Gradient.addColorStop(0, Color(0, 0, 0, 1));
			Context.strokeStyle = Gradient;
			Context.lineWidth = 3;
			// vertical
			for(var VX = -50; VX < TargetCanvas.width + 50; VX += 40){
				Context.beginPath()
				Context.moveTo(VX, -5);
				Context.lineTo(VX, TargetCanvas.height + 5);
				Context.stroke();
			}
			// horizontal
			for(var HY = -50; HY < TargetCanvas.height; HY += 40){
				Context.beginPath()
				Context.moveTo(-5, HY);
				Context.lineTo(TargetCanvas.width + 5, HY);
				Context.stroke();
			}
		}

		// draw the points
		if(NowFrame > 20){
			// Move Noise
			for(var i = NoiseList.length - 1; i >= 0; i--){
				NoiseList[i][1] += NoiseList[i][4];
				if(NoiseList[i][1] - NoiseList[i][3] > TargetCanvas.width){
					NoiseList.splice(i, 1);
					AddRandomWaitNoise();
				}
			}
			// Draw the circle
			for(i = 0;i < CircleList.length; i++){
				// calculate-y
				if(Math.abs(CircleList[i][3] - CircleList[i][2]) <= 2){
					CircleList[i][3] = CircleList[i][2];
					CircleList[i][4] ++;
				}else{
					CircleList[i][3] -= (CircleList[i][3] - CircleList[i][2]) / 30 - 2;
				}
				// offset-x
				if(CircleList[i][6] < 1){
					CircleList[i][6] += 0.02;
				}else{
					CircleList[i][6] = 0;
				}
				var ReachAmount = CircleList[i][4];
				var Radius = CircleList[i][0];
				var Interval = CircleList[i][1]
				var NowX = TargetCanvas.width / 2 - Interval * CircleList[i][6];
				var NowY = CircleList[i][3];
				var Alpha = CircleList[i][5];
				Context.fillStyle = Color(255, 255, 255, Alpha);

				// calculate the noise
				// x-point, width, strength
				var AffectNoise = [];
				for(var i2 = 0; i2 < NoiseList.length; i2++){
					var RowDifference = Math.abs(NoiseList[i2][0] - i);
					var AffectWidth = NoiseList[i2][3] / 60;
					if(RowDifference < AffectWidth){
						var AffectRate = (AffectWidth - RowDifference) / AffectWidth;
						AffectNoise.push([NoiseList[i2][1], NoiseList[i2][3] * Math.sqrt(AffectRate), NoiseList[i2][2] * AffectRate]);
					}
				}

				// Draw the left
				while(NowX > -30){
					var OffsetY = 0;
					for(var i3 = 0; i3 < AffectNoise.length; i3++){
						//var ColorRate = 1 - (TargetCanvas.width / 2 - NowX) / (TargetCanvas.width / 2);
						//Context.fillStyle = Color(255, 255 - 50 * ColorRate, 255 - 175 * ColorRate, Alpha);
						var XDifference = Math.abs(AffectNoise[i3][0] - NowX);
						if(XDifference < AffectNoise[i3][1]){
							OffsetY += peaks(NowX, AffectNoise[i3][0], AffectNoise[i3][1], AffectNoise[i3][2]);
						}
					}
					Context.beginPath();
					Context.arc(NowX, NowY - OffsetY, Radius, 0, 2*Math.PI);
					Context.fill();
					Context.closePath();
					NowX -= Interval;
					ReachAmount -= 1;
					if(ReachAmount < 0){
						NowY -= -ReachAmount * Radius / 20
					}
				}
				ReachAmount = CircleList[i][4] - 1;
				Radius = CircleList[i][0];
				Interval = CircleList[i][1];
				NowX = TargetCanvas.width / 2 + Interval - Interval * CircleList[i][6];
				NowY = CircleList[i][3];
				// Draw the right
				while(NowX < TargetCanvas.width + 30){
					OffsetY = 0;
					for(i3 = 0; i3 < AffectNoise.length; i3++){
						//ColorRate = 1 - (TargetCanvas.width / 2 - NowX) / (TargetCanvas.width / 2);
						//Context.fillStyle = Color(255, 255 - 50 * ColorRate, 255 - 175 * ColorRate, Alpha);
						XDifference = Math.abs(AffectNoise[i3][0] - NowX);
						if(XDifference < AffectNoise[i3][1]){
							OffsetY += peaks(NowX, AffectNoise[i3][0], AffectNoise[i3][1], AffectNoise[i3][2]);
						}
					}
					Context.beginPath();
					Context.arc(NowX, NowY - OffsetY, Radius, 0, 2*Math.PI);
					Context.fill();
					Context.closePath();
					NowX += Interval;
					ReachAmount -= 1;
					if(ReachAmount < 0){
						NowY -= -ReachAmount * Radius / 20
					}
				}
			}
		}
		// Draw the light
		/*
		if(NowFrame > 50){
			if(LitList.length < 100) AddRandomLit();
			for(var i4 = LitList.length - 1; i4 >= 0; i4--){
				if(Math.abs(LitList[i4][1]) <= 1){
					LitList.splice(i4, 1);
				}else{
					LitList[i4][2] += LitList[i4][1];
					LitList[i4][1] -= LitList[i4][1] > 0 ? 1 : -1;
					Context.fillStyle = Color(160, 180, 235, LitList[i4][1] / 35);
					Context.beginPath();
					Context.arc(LitList[i4][2], LitList[i4][3], LitList[i4][0], 0, 2*Math.PI);
					Context.fill();
					Context.closePath();
				}
			}
		}*/
	}
}

var WaitFrame = 0;
var StopCanvasDraw = false;
setInterval(Update, 20);
function ContinueUpdate(){
	if(!StopCanvasDraw && $("html").scrollTop() < TargetCanvas.height + 10) WaitFrame = 0;
	window.requestAnimationFrame(ContinueUpdate);
}
window.requestAnimationFrame(ContinueUpdate);





