var fromId="";
var mailSid;
var mailStatus=0;
var mailReq={};
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('one.html', {
        'id': 'one',
        'bounds': {'width': 600,'height': 400},
        'resizable': false,
        'frame': 'none'
    });
});
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
  	fromId = sender.id;
	if("sendMail"==request.id){
		sendMail(request,sender);
	}
});
//chrome.sockets.tcp.onReceiveError.addListener(function(info){//{resultCode,socketId}
//    sendMsg({id:"sendMail",msg:"SMTP服务器错误！"});
//});
chrome.sockets.tcp.onReceive.addListener(function(info){
	ab2str(info.data,function(data){
		if(mailSid==info.socketId){
			pushMail(data);
		}
	});
});
function sendMail(request,sender){
	mailReq = request;
	var opt = {persistent: false,name: 'tcpSocket',bufferSize: 4096};
	chrome.sockets.tcp.create(opt, function(info){
		mailSid = info.socketId;
		mailStatus =0;
		chrome.sockets.tcp.connect(mailSid, request.smtp, parseInt(request.port), function(code){
			if(code)sendMsg({id:"sendMail",msg:"网络错误！"});
			else sendMsg({id:"sendMail",msg:"邮件正在发送..."});
		});
	});
	
}
function pushMail(data){
	console.log("-------"+mailStatus+"-------");
	console.log(data);
	console.log("\r\n");
	if(data.indexOf("354 ")==0)return;
	if(0==mailStatus){
		if(data.indexOf("220 "==0)){
			mailStatus =1;
			tcpSendStr("helo Email\r\n");
			return;
		}
		sendMsg({id:"sendMail",msg:"连接SMTP服务器失败！"});
	}else if(1==mailStatus){
		if(data.indexOf("250 ")==0){
			mailStatus =2;
			tcpSendStr("auth login\r\n");
			return;
		}
		sendMsg({id:"sendMail",msg:"与SMTP服务器握手失败！"});
	}else if(2==mailStatus){
		if(data.indexOf("334 ")==0){
			mailStatus =3;
			tcpSendStr(Base64.encode(mailReq.from)+"\r\n");
			return;
		}
		sendMsg({id:"sendMail",msg:"SMTP服务器禁止登陆！"});
	}else if(3==mailStatus){
		if(data.indexOf("334 ")==0){
			mailStatus =4;
			tcpSendStr(Base64.encode(mailReq.pwd)+"\r\n");
			return;
		}
		sendMsg({id:"sendMail",msg:"SMTP服务器登陆失败！"});
	}else if(4==mailStatus){
		if(data.indexOf("235 ")==0){
			mailStatus =5;
			var mltr="mail from:<"+mailReq.from+">\r\nrcpt to:<"+mailReq.to+">\r\ndata\r\nfrom:"+mailReq.from+"\r\nto:"+mailReq.to+"\r\nsubject:";
			mltr+=mailReq.tit+"\r\n\r\n"+mailReq.txt+"\r\n.\r\n";
			tcpSendStr(mltr);
			return;
		}
		sendMsg({id:"sendMail",msg:"SMTP服务器登陆失败！"});
	}else if(5==mailStatus){
		if(data.indexOf("250 ")==0){
			mailStatus =6;
			tcpSendStr("quit\r\n");
			sendMsg({id:"sendMail",msg:"邮件发送成功！"});
			return;
		}
		sendMsg({id:"sendMail",msg:"邮件发送错误！"});
	}
	
}

function tcpSendStr(str){
	str2ab(str,function(ab){chrome.sockets.tcp.send(mailSid, ab, function(){})});
}

function sendMsg(data){
	chrome.runtime.sendMessage(fromId,data,function(response) {});
}
function closeSockt(sid){
	chrome.sockets.tcp.close(sid, function(){});
}
function ab2str(u,f) {
   var b = new Blob([u]);
   var r = new FileReader();
	r.readAsText(b, 'utf-8');
	r.onload = function (){if(f)f.call(null,r.result)}
}
function str2ab(s,f) {
	var b = new Blob([s],{type:'text/plain'});
	var r = new FileReader();
	r.readAsArrayBuffer(b);
	r.onload = function (){if(f)f.call(null,r.result)}
}
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
