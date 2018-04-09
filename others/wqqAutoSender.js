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
function md5(string){
			function md5_RotateLeft(lValue, iShiftBits) {
					return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
			}
			function md5_AddUnsigned(lX,lY){
					var lX4,lY4,lX8,lY8,lResult;
					lX8 = (lX & 0x80000000);
					lY8 = (lY & 0x80000000);
					lX4 = (lX & 0x40000000);
					lY4 = (lY & 0x40000000);
					lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
					if (lX4 & lY4) {
							return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
					}
					if (lX4 | lY4) {
							if (lResult & 0x40000000) {
									return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
							} else {
									return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
							}
					} else {
							return (lResult ^ lX8 ^ lY8);
					}
			}         
			function md5_F(x,y,z){
					return (x & y) | ((~x) & z);
			}
			function md5_G(x,y,z){
					return (x & z) | (y & (~z));
			}
			function md5_H(x,y,z){
					return (x ^ y ^ z);
			}
			function md5_I(x,y,z){
					return (y ^ (x | (~z)));
			}
			function md5_FF(a,b,c,d,x,s,ac){
					a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
					return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			}; 
			function md5_GG(a,b,c,d,x,s,ac){
					a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
					return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			};
			function md5_HH(a,b,c,d,x,s,ac){
					a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
					return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			}; 
			function md5_II(a,b,c,d,x,s,ac){
					a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
					return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			};
			function md5_ConvertToWordArray(string) {
					var lWordCount;
					var lMessageLength = string.length;
					var lNumberOfWords_temp1=lMessageLength + 8;
					var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
					var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
					var lWordArray=Array(lNumberOfWords-1);
					var lBytePosition = 0;
					var lByteCount = 0;
					while ( lByteCount < lMessageLength ) {
							lWordCount = (lByteCount-(lByteCount % 4))/4;
							lBytePosition = (lByteCount % 4)*8;
							lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
							lByteCount++;
					}
					lWordCount = (lByteCount-(lByteCount % 4))/4;
					lBytePosition = (lByteCount % 4)*8;
					lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
					lWordArray[lNumberOfWords-2] = lMessageLength<<3;
					lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
					return lWordArray;
			}; 
			function md5_WordToHex(lValue){
					var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
					for(lCount = 0;lCount<=3;lCount++){
							lByte = (lValue>>>(lCount*8)) & 255;
							WordToHexValue_temp = "0" + lByte.toString(16);
							WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
					}
					return WordToHexValue;
			};
			function md5_Utf8Encode(string){
					string = string.replace(/\r\n/g,"\n");
					var utftext = ""; 
					for (var n = 0; n < string.length; n++) {
							var c = string.charCodeAt(n); 
							if (c < 128) {
									utftext += String.fromCharCode(c);
							}else if((c > 127) && (c < 2048)) {
									utftext += String.fromCharCode((c >> 6) | 192);
									utftext += String.fromCharCode((c & 63) | 128);
							} else {
									utftext += String.fromCharCode((c >> 12) | 224);
									utftext += String.fromCharCode(((c >> 6) & 63) | 128);
									utftext += String.fromCharCode((c & 63) | 128);
							} 
					} 
					return utftext;
			}; 
			var x=Array();
			var k,AA,BB,CC,DD,a,b,c,d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
			string = md5_Utf8Encode(string);
			x = md5_ConvertToWordArray(string); 
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; 
			for (k=0;k<x.length;k+=16) {
					AA=a; BB=b; CC=c; DD=d;
					a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
					d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
					c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
					b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
					a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
					d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
					c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
					b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
					a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
					d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
					c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
					b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
					a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
					d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
					c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
					b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
					a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
					d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
					c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
					b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
					a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
					d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
					c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
					b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
					a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
					d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
					c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
					b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
					a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
					d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
					c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
					b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
					a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
					d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
					c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
					b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
					a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
					d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
					c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
					b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
					a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
					d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
					c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
					b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
					a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
					d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
					c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
					b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
					a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
					d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
					c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
					b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
					a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
					d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
					c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
					b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
					a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
					d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
					c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
					b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
					a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
					d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
					c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
					b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
					a=md5_AddUnsigned(a,AA);
					b=md5_AddUnsigned(b,BB);
					c=md5_AddUnsigned(c,CC);
					d=md5_AddUnsigned(d,DD);
			}
	return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}
var Ajax = function () {};
Ajax.getHttpRequest = function () {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.createRequest) {
        return window.createRequest();
    }
    var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
    for (var i = 0; i < prefixes.length; i++) {
        try { return new ActiveXObject(prefixes[i] + ".XmlHttp"); }
        catch (ex) { }
    }
    throw new Error("Could not find an installed XML parser.");
}
Ajax.post = function (url, data, callback) {
    var req = Ajax.getHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (callback) callback(eval("("+req.responseText+")"));
        }
    };
    req.send(data);
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
var faceLen=0;
var faceArr;
function fnKeydown(evnt){
	var e=evnt||window.event;
	if(hotkey(e,true,false,false,192)){
		letsDoThis();
	}else if(hotkey(e,false,true,false,192)){
		letsStopThis();
	}else if(hotkey(e,false,false,true,192)){

	}
}
function getFaceIs(){
	var reiArr=new Array(); 
	var uls=_$G("face_images").getElementsByTagName("ul");
	var tul,i;
	for(i in uls){
		if(uls[i].className=="wrap"){
			tul=uls[i];
			break;
		}
			
	}
	var ils=tul.getElementsByTagName("i");
	var ti,j;
	faceLen=0;
	for(j in ils){
		faceLen++;
		ti=ils[j];
		if(ti.title=="delKey"){
			continue;
		}
		reiArr.push(ti);
	}
	return reiArr;
}
var oldMsgMd5;
function mainLoop(){
	var curTm=new Date().Format('yyyy-MM-dd hh:mm:ss  星期w');
	var extCtt=_$G("atosd_msg").value;
	if(!extCtt){
		var lstctt=getLastbuddyChat();
		if(lstctt&&oldMsgMd5!=md5(lstctt)){
			var acsSrc="http://www.tuling123.com/openapi/api";
			Ajax.post(acsSrc,"key=cfb3fd10a7938dcd89f34a958121c3c6&info="+lstctt,
			function(res){
				if(res.text){
					var txtare=_$G("chat_textarea");
					txtare.value=res.text;
					var sdBtn=_$G("send_chat_btn");sdBtn.click();
					oldMsgMd5=md5(lstctt);
				}
			});
		}
		return;
	}
	var txtar=_$G("chat_textarea");txtar.value=curTm+"\n"+extCtt;
	faceArr[parseInt(faceId)-1].click();
	var senderBtn=_$G("send_chat_btn");senderBtn.click();
} 
function letsDoThis(){
	if(loopId>0) return;
	var itvl=_$G("atosd_itvl").value-0;
	faceId=_$G("atosd_face").value;
	if(!faceId||faceId<1)faceId=1;
	if(!itvl||itvl<0) itvl=60;
	loopId=window.setInterval('mainLoop()',itvl*1000);
	_$G("autoSender_ctntr1").style.display="none";
	if(!faceArr) faceArr=getFaceIs();
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
			if(cval>faceLen-1){
				this.value="";
				this.focus();
				this.style.border="2px solid red";
				alert("表情编号应不大于"+(faceLen-1));
			}
		}
	}
	this.style.border="";
}
function trim(str){
　　 return str.replace(/(^\s*)|(\s*$)/g, "");
}
function getLastbuddyChat(){
	var budds=_$G("container").getElementsByTagName("p");
	var i;
	var curp;
	if(budds)
	for(i in budds){
		var curbud=budds[i];
		if(curbud.className&&curbud.className.trim()=="chat_content"&&curbud.parentNode.className&&curbud.parentNode.className.trim()=="chat_content_group buddy"){
			curp=curbud;
		}
	}
	if(curp){
		return curp.innerHTML;
	}
	return null;
}
/**
*add Listener & init View
*/
if (document.addEventListener)
	document.addEventListener("keydown",fnKeydown,true);
else
	document.attachEvent("onkeydown",fnKeydown);
var ctner=_$C("div");ctner.style.position="fixed";ctner.style.left="0px";ctner.style.top="0px";ctner.style.background="#000";ctner.style.color="#666";ctner.style.borderRadius="5px";ctner.style.padding="5px";
var ctntb=_$C("table");ctntb.style.width="100%";
var ctntbd=_$C("tbody");
var ctntr1=_$C("tr");ctntr1.id="autoSender_ctntr1";
var ctntr1td1=_$C("td");ctntr1td1.innerHTML="Interval:";ctntr1td1.align="right";ctntr1td1.fontFamily="Microsoft YaHei SimHei";
var ctntr1td2=_$C("td");ctntr1td2.align="left";
var ctntr1td3=_$C("td");ctntr1td3.innerHTML="Face:";ctntr1td3.align="right";ctntr1td3.fontFamily="Microsoft YaHei SimHei";
var ctntr1td4=_$C("td");ctntr1td4.align="left";
var ctntr2=_$C("tr");ctntr2.id="autoSender_ctntr2";
var ctntr2td1=_$C("td");ctntr2td1.colSpan="4";
var atosd_itvl;atosd_itvl=_$C("input");atosd_itvl.style.width="50px";atosd_itvl.type="text";atosd_itvl.id="atosd_itvl";atosd_itvl.onblur=numTest;_$A(atosd_itvl,ctntr1td2);
var atosd_face;atosd_face=_$C("input");atosd_face.style.width="50px";atosd_face.type="text";atosd_face.id="atosd_face";atosd_face.onblur=numTest;_$A(atosd_face,ctntr1td4);
var atosd_msg;atosd_msg=_$C("textarea");atosd_msg.id="atosd_msg";atosd_msg.className="atosd_msg";atosd_msg.style.width="250px";atosd_msg.rows="10";_$A(atosd_msg,ctntr2td1);atosd_msg.style.fontSize="14px";atosd_msg.style.marginTop="3px";
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
var mrbtfrmctn=_$C("div");mrbtfrmctn.id="mrbtfrmctn";
_$A(mrbtfrmctn,document.body);
Date.prototype.Format =dtFmt;
