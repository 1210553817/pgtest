function _$G(a) {
	return document.getElementById(a);
}
function _$C(a) {
	return document.createElement(a);
}
function _$A(b, a) {
	a.appendChild(b);
}
function _$SB() {
	this._str_ = new Array();
}
_$SB.prototype.append = function(a) {
	this._str_.push(a);
};
_$SB.prototype.toString = function() {
	return this._str_.join("");
};
function _$Ava(a) {
	if (null == a || "" == a||undefined==a) {
		return false;
	} else {
		return true;
	}
}

function dtFmt(formatStr){  
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
    str=str.replace(/MM/,this.getMonth()+1>9?this.getMonth()+1:'0' + (this.getMonth()+1));   
    str=str.replace(/M/g,this.getMonth()+1);   
    str=str.replace(/w|W/g,Week[this.getDay()]);   
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());    
    return str;   
}

function hotkey(event,ctrlKey, shiftKey, altKey, keycode){
	if (event.ctrlKey == ctrlKey&& event.shiftKey == shiftKey&& event.altKey == altKey&& event.keyCode == keycode) {
	   return true;
	}
   return false;
}

var loopId=-1;
var faceId;
function fnKeydown(evnt){
	var e=evnt||window.event;
	if(hotkey(e,false,false,true,192)){
		if(-1==loopId)
			letsDoThis();
		else
			letsStopThis();
	}
}
function clkByTagA(clz){
	var lis=document.getElementsByTagName('a');
	for(var i=0,len=lis.length;i<len;i++){
		var cua=lis[i];
		if(clz==cua.className){
			cua.click();
		}
	}
	
}

function mainLoop(){
	var curTm=new Date().Format('yyyy-MM-dd hh:mm:ss  星期w');
	var extCtt=_$G("atosd_msg").value;
	var appElement = document.querySelector('[ng-controller=chatSenderController]');
	var $scope = angular.element(appElement).scope();
	$scope.editAreaCtn = curTm+"\n"+extCtt;
	$scope.sendTextMessage();
	if(faceId){
		clkByTagA('web_wechat_face');
		clkByTagA('face qqface'+faceId);
		$scope.sendTextMessage();
	}
} 
function letsDoThis(){
	if(loopId>0) return;
	Date.prototype.Format =dtFmt;
	var itvl=_$G("atosd_itvl").value-0;
	faceId=_$G("atosd_face").value;
	if(!itvl||itvl<0) itvl=60;
	loopId=window.setInterval('mainLoop()',itvl*1000);
	_$G("autoSender_ctntr1").style.display="none";
}
function letsStopThis(){
	if(loopId<0) return;
	clearInterval(loopId);
	loopId=-1;
	_$G("autoSender_ctntr1").style.display="table-row";
}
function isAnum(str){
	var reg=new RegExp("^[1-9][0-9]*$");
	return reg.test(str);
}
function numTest(){
	var tval=this.value;
	if(!tval) return;
	if(!isAnum(tval)){
		this.value="";
		this.focus();
		this.style.border="2px solid red";
		alert("请填写正整数!");
	}else{
		var cval=tval-0;
		if("atosd_itvl"==this.id){
			if(cval<5){
				this.value="";
				this.focus();
				this.style.border="2px solid red";
				alert("时间间隔不能小于5秒");
			}
			
		}else if("atosd_face"==this.id){
			if(cval>104){
				this.value="";
				this.focus();
				this.style.border="2px solid red";
				alert("表情编号应不大于104！");
			}
		}
	}
	this.style.border="";
}
/**
*add Listener & init View
*/
if (document.addEventListener)
	document.addEventListener("keydown",fnKeydown,true);
else
	document.attachEvent("onkeydown",fnKeydown);
var ctner=_$C("div");ctner.style.position="fixed";ctner.style.left="0px";ctner.style.top="0px";ctner.style.background="#000";ctner.style.color="#666";ctner.style.borderRadius="5px";
var ctntb=_$C("table");ctntb.style.width="100%";
var ctntbd=_$C("tbody");
var ctntr1=_$C("tr");ctntr1.id="autoSender_ctntr1";
var ctntr1td1=_$C("td");ctntr1td1.innerHTML="Interval:";ctntr1td1.align="right";ctntr1td1.fontFamily="Microsoft YaHei,SimHei";
var ctntr1td2=_$C("td");ctntr1td2.align="left";
var ctntr1td3=_$C("td");ctntr1td3.innerHTML="Face:";ctntr1td3.align="right";ctntr1td3.fontFamily="Microsoft YaHei,SimHei";
var ctntr1td4=_$C("td");ctntr1td4.align="left";
var ctntr2=_$C("tr");ctntr2.id="autoSender_ctntr2";
var ctntr2td1=_$C("td");ctntr2td1.colSpan="4";
var atosd_itvl;atosd_itvl=_$C("input");atosd_itvl.style.width="50px";atosd_itvl.type="text";atosd_itvl.id="atosd_itvl";atosd_itvl.onblur=numTest;_$A(atosd_itvl,ctntr1td2);
var atosd_face;atosd_face=_$C("input");atosd_face.style.width="50px";atosd_face.type="text";atosd_face.id="atosd_face";atosd_face.onblur=numTest;_$A(atosd_face,ctntr1td4);
var atosd_msg;atosd_msg=_$C("textarea");atosd_msg.id="atosd_msg";atosd_msg.className="atosd_msg";atosd_msg.style.width="250px";atosd_msg.rows="10";_$A(atosd_msg,ctntr2td1);atosd_msg.style.fontSize="14px";
_$A(ctntr1td1,ctntr1);
_$A(ctntr1td2,ctntr1);
_$A(ctntr1td3,ctntr1);
_$A(ctntr1td4,ctntr1);
_$A(ctntr2td1,ctntr2);
_$A(ctntr1,ctntbd);
_$A(ctntr2,ctntbd);
_$A(ctntbd,ctntb);
_$A(ctntb,ctner);
document.body.appendChild(ctner);