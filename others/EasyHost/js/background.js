var myid="";
var socktId;
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
	if("sendMail"==request.id){
		myid = request.myid;
		sendMail(request,sender,sendResponse);
	}
});
//chrome.sockets.tcp.onReceiveError.addListener(function(info){
//    sendMsg({id:"sendMail",msg:"SMTP服务器错误！"});
//});
chrome.sockets.tcp.onReceive.addListener(function(info){
	var data = ab2str(info.data);
    if(socktId==info.socketId){
		if(1==mailStatus){
			if(data.indexOf("250")>-1){
				mailStatus =2;
				chrome.sockets.tcp.send(socktId, str2ab("auth login\r\n"), function(infoa){});
				return;
			}else if(data.indexOf("220")<0){
				sendMsg({id:"sendMail",msg:"与SMTP服务器握手失败！"});
			}
		}else if(2==mailStatus){
			if(data.indexOf("334")>-1){
				mailStatus =3;
				chrome.sockets.tcp.send(socktId, str2ab(Base64.encode(mailReq.from)+"\r\n"), function(infob){});
				return;
			}
			sendMsg({id:"sendMail",msg:"SMTP服务器禁止登陆！"});
		}else if(3==mailStatus){
			if(data.indexOf("334")>-1){
				mailStatus =4;
				chrome.sockets.tcp.send(socktId, str2ab(Base64.encode(mailReq.pwd)+"\r\n"), function(infoc){});
				return;
			}
			sendMsg({id:"sendMail",msg:"SMTP服务器登陆失败！"});
		}else if(4==mailStatus){
			if(data.indexOf("235")>-1){
				mailStatus =5;
				var mltr="mail from <"+mailReq.from+">\r\nrcpt to <"+mailReq.to+">\r\ndata\r\nfrom:"+mailReq.from+"\r\nto:"+mailReq.to+"\r\nsubject:";
				mltr+=mailReq.tit+"\r\n\r\n"+mailReq.txt+"\r\n.\r\n";
				chrome.sockets.tcp.send(socktId, str2ab(mltr), function(infod){});
				return;
			}
			sendMsg({id:"sendMail",msg:"SMTP服务器登陆失败！"});
		}else if(5==mailStatus){
			if(data.indexOf("250")>-1){
				mailStatus =6;
				chrome.sockets.tcp.send(socktId, str2ab("quit\r\n"), function(infoj){});
				sendMsg({id:"sendMail",msg:"邮件发送成功！"});
			}
		}
		
	}
});
function sendMail(request,sender,sendResponse){
	mailReq = request;
	var socktOpt = {persistent: true,name: 'tcpSocket',bufferSize: 4096};
	chrome.sockets.tcp.create(socktOpt, function(infa){
		socktId = infa.socketId;
		mailStatus =0;
		chrome.sockets.tcp.connect(socktId, request.smtp, parseInt(request.port), function(code){
			if(!code){
				mailStatus =1;
				chrome.sockets.tcp.send(socktId, str2ab("helo Email\r\n"), function(infob){});
			}else{
				sendMsg({id:"sendMail",msg:"连接SMTP服务器失败！"});
				closeSockt(infa.socketId);
			}
		});
	});
	sendResponse({msg:"邮件正在发送..."});
}


function sendMsg(data){
	chrome.runtime.sendMessage(myid,data,function(response) {});
}
function closeSockt(sid){
	chrome.sockets.tcp.close(sid, function(){});
}
// 创建Base64对象Base64.encode;Base64.decode
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// ArrayBuffer转为字符串
function ab2str(buf) {
   return String.fromCharCode.apply(null, new Uint8Array(buf));
}
// 字符串转为ArrayBuffer对象
function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
         bufView[i] = str.charCodeAt(i);
    }
    return buf;
}