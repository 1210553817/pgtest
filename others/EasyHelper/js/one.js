var downParam={};
var mailParam={};
window.onload=function(){
	$BG = chrome.extension.getBackgroundPage();
	Date.prototype.toStr =dateFmt;
	initTabs();
	initEvents();
	initDatas()
};
function initTabs(){
	var mtabs = _$P(".mtabb");
	for(var i=0;i<mtabs.length;i++){
		var itm = mtabs[i];
		itm.onclick=function(){
			if(this.className.indexOf("mtab_titgry")>-1){
				var mtbs = _$P(".mtabb");
				for(var j=0;j<mtbs.length;j++){
					var im = mtbs[j];
					if(this!=im){
						 im.className="mtabb mtab_titgry";
						 _$G("tabctt_"+im.id).style.display="none";
					}else{
						im.className="mtabb mtab_tit";
						_$G("tabctt_"+im.id).style.display="block";
					}
				}
			}
		}
	}
}
function initEvents(){
	downbtn = _$G("tabb_down");
	downbtn.onclick=startDown;	
	
	pdnBtn = _$G("tabb_btn1");
	pdnBtn.onclick=function(){picDownUrl();};
	//testC...
	_$G("tabc_btn1").onclick=function(){
		var tip = tipCase({code:"A",msg:'<img src="../imgs/loading.gif" style="width:26px;height:26px;"/>',cover:1,abs:1});
		window.setTimeout(function(){tip.close();},5000)
	};
	_$G("tabc_btn2").onclick=function(){
		panelCaseA({ title:'Test22...........', content:"I am test22 Dialog", width:280, btn1:"确定", btn2:"取消", btn3:"忽略",
			fun1: function(mbdy){
				return true;
			},closed: function(){
				tipCase({msg:"FROM: "+this.innerHTML,cover:1});
			}
		});
	};
	_$G("tabc_btn3").onclick=function(){
		startMail();
	};
	//4
	_$G("tabd_btn1").onclick=function(){
		_$G("netreq_txts").value="";
		$BG.clearPageReqs();
		tipCase({msg:"Done"});
	};
	_$G("tabd_btn2").onclick=function(){
		var txtarea = _$G("netreq_txts");
		txtarea.value=$BG.getPageReqs();
	};
	//listener
	chrome.runtime.onMessageExternal.addListener(
	  function(request, sender, sendResponse) {
		if("sendMail"==request.id){
			tipCase({msg:request.msg});
		}
	});
}
function initDatas(){
	downParam.dwnFolder = _getStorage("dwnFolder");
	downParam.dwnSubFolder = _getStorage("dwnSubFolder");	
	downParam.dwnStartIndx = _getStorage("dwnStartIndx");
	downParam.dwnEndIndx = _getStorage("dwnEndIndx");
	downParam.dwnParseReg = _getStorage("dwnParseReg");
	downParam.dwnDownType = _getStorage("dwnDownType");
	
	mailParam.smtp = _getStorage("mailParamSmtp");
	mailParam.port = _getStorage("mailParamPort");	
	mailParam.from = _getStorage("mailParamFrom");
	mailParam.pwd = _getStorage("mailParamPwd");
	mailParam.to = _getStorage("mailParamTo");
	mailParam.tit = _getStorage("mailParamTit");
}

function startDown(){
	var ctt = '<div style="display:inline-block;width:50px;text-align:right;">文件夹:&nbsp;</div></div><input id="beforeDownName" type="text" value="'+downParam.dwnFolder+'" style="width:80px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;text-align:right;">序号:&nbsp;</div><input id="beforeDownIndx" type="text" value="'+downParam.dwnSubFolder+'" style="width:80px;"/><br/><br/>'+
		'<div style="display:inline-block;width:50px;text-align:right;">去头数:&nbsp;</div><input id="beforeDownStart" type="text" value="'+downParam.dwnStartIndx+'" style="width:80px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;text-align:right;">去尾数:&nbsp;</div><input id="beforeDownEnd" type="text" value="'+downParam.dwnEndIndx+'" style="width:80px;"/><br/><br/>'+
		'<div style="display:inline-block;width:50px;text-align:right;">匹配:&nbsp;</div><select id="beforeParseReg" type="text" style="width:80px;">'+
			'<option value="(.*\.ts.*)" '+("(.*\.ts.*)"==downParam.dwnParseReg?"selected":"")+'>.ts</option>'+
			'<option value="(.*ts\.php.*)" '+("(.*ts\.php.*)"==downParam.dwnParseReg?"selected":"")+'>ts.php</option>'+
			'<option value="(.*\.mp4.*)" '+("(.*\.mp4.*)"==downParam.dwnParseReg?"selected":"")+'>.mp4</option>'+
			'<option value="(.*\.f4v.*)" '+("(.*\.f4v.*)"==downParam.dwnParseReg?"selected":"")+'>.f4v</option>'+
			'<option value="(.*\.jpg.*)" '+("(.*\.jpg.*)"==downParam.dwnParseReg?"selected":"")+'>.jpg</option>'+
		'</select>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;text-align:right;">类型:&nbsp;</div><select id="beforeDownType" type="text" style="width:80px;">'+
			'<option value=".ts" '+(".ts"==downParam.dwnDownType?"selected":"")+'>.ts</option>'+
			'<option value=".mp4" '+(".mp4"==downParam.dwnDownType?"selected":"")+'>.mp4</option>'+
			'<option value=".f4v" '+(".f4v"==downParam.dwnDownType?"selected":"")+'>.f4v</option>'+
			'<option value=".jpg" '+(".jpg"==downParam.dwnDownType?"selected":"")+'>.jpg</option>'+
		'</select>';
	panelCaseA({ title: '文件下载', content:ctt, btn1:"开始", btn2: "取消",
		fun1: function(mbdy){
			var fbf=_$Q("#beforeDownName",mbdy);
			var fin=_$Q("#beforeDownIndx",mbdy);		
			var fst=_$Q("#beforeDownStart",mbdy);
			var fen=_$Q("#beforeDownEnd",mbdy);
			var frg=_$Q("#beforeParseReg",mbdy);
			var ftp=_$Q("#beforeDownType",mbdy);
			downParam.dwnFolder = fbf.value;
			downParam.dwnSubFolder = fin.value;
			downParam.dwnParseReg = frg.value;
			downParam.dwnDownType = ftp.value;
			_setStorage("dwnFolder", downParam.dwnFolder);
			_setStorage("dwnSubFolder", downParam.dwnSubFolder);
			_setStorage("dwnParseReg", downParam.dwnParseReg);
			_setStorage("dwnDownType", downParam.dwnDownType);
			var dnsr=parseInt(fst.value);
			var dnen=parseInt(fen.value);
			if(dnsr>=0){
				downParam.dwnStartIndx = dnsr;
				_setStorage("dwnStartIndx", downParam.dwnStartIndx);
			}
			if(dnen>=0){
				downParam.dwnEndIndx = dnen;
				_setStorage("dwnEndIndx", downParam.dwnEndIndx);
			}
			downbtn.onclick=null;
			downParam.pathArray = parseUrls();
			downParam.currDownIndex = 0;
			directDowner(downParam.pathArray,0,onBeforeDownloadPerFile,onAfterDownloadAllFile);
			return true;
		}
	});

}
function onBeforeDownloadPerFile(indx,len){
	downbtn.innerHTML=(indx+1)+" / "+len+" ( "+downParam.dwnStartIndx+" ~ "+downParam.dwnEndIndx+" )";
	downParam.dwnFname = prefixInteger(indx+1,4)+downParam.dwnDownType;
	return downParam.dwnFolder+"/"+downParam.dwnSubFolder+"/"+downParam.dwnFname;
}
function onAfterDownloadAllFile(indx,len){
	downbtn.onclick=startDown;
	downbtn.innerHTML="开始下载";
}
function directDowner(urls,indx,ing,bkf){
	if(urls.length<1||urls.length==indx){
		if(bkf)bkf.call(null);
		return;
	}
	downParam.currDownIndex = indx;
	var fnm="00"+indx;
	if(ing)fnm=ing.call(null,indx,urls.length);
	var dnurl=urls[indx];
	chrome.downloads.download({
		url: dnurl,
		filename: fnm,
		conflictAction: 'uniquify',
		saveAs: false
	},function(){
		window.setTimeout(function(){
			directDowner(urls,indx+1,ing,bkf);
		},1000);
	});
}
function parseUrls(){
	var dtxt = _$G("down_urls").value;
	var dprm = _$G("down_prms").value;
	dprm = _$Ava(dprm)?dprm:"";
	var rearr=[];
	//.replace(/[\r\n]/g, "")
	var reg = new RegExp(downParam.dwnParseReg,"g");
	var result =null;
	do{
		result=reg.exec(dtxt);
		if(result!=null){
			rearr.push(dprm+result[1]);
		}
	}while(result!=null)
	var dnsr=parseInt(downParam.dwnStartIndx);
	var dnen=parseInt(downParam.dwnEndIndx);
	return rearr.slice(dnsr>=0?(dnsr+1):0,dnen>=0?(rearr.length-dnen):(rearr.length));

}

/**youku url parse**/
function parseYkUrls(){
	var txtarea = _$G("defpop_txts");
	var dtxt = txtarea.value;
	dtxt=dtxt.replace(/json\d+\(\{/,"{").replace(/\}\}\)/,"}}");
	var dato = eval("("+dtxt+")");
	var stms = dato.data.stream;
	var dtxts=[];
	getYkDownUrl(stms,0,dtxts,function(){
		txtarea.value=dtxts.join("");
	});
	
}
function getYkDownUrl(stms,indx,txs,aft){
	if(indx==stms.length){
		aft.call(null);
		return;
	}
	var itm = stms[indx];
	var iurl = itm.m3u8_url;
	Ajax.get(iurl,function(rst){
		txs.push(rst);
		getYkDownUrl(stms,indx+1,txs,aft);
	});
}
/*mulpic*/
function picDownUrl(){
	var setStr = _$G("picdn_url").value;
	var reg = new RegExp("^((http)[s]*://.*)(\\[(\\d+)\-(\\d+)#(\\d)\\])(.*)$");
	var group = reg.exec(setStr); 
	if(!_$Ava(group)||group[2]!="http"){
		tipCase({msg:"请输入url,通配符,如:[1-23#2]"});
		return;
	}
	var lenInt=parseInt(group[6]);
	var startInt=parseInt(group[4]);
	var endInt=parseInt(group[5]);
	if(endInt<startInt){
		tipCase({msg:"通配符不正确，如：[1-23#2]"});
		return;
	}
	var now = new Date();
	downParam.dwnFolder=now.toStr('yyyy-MM-dd');
	downParam.dwnSubFolder=now.toStr('hh_mm_ss');
	picDowner(group[1],group[7],startInt,endInt,lenInt);
	pdnBtn.onclick=null;
}
function picDowner(urlpre,urlsuf,now,end,lenInt){
	if(now>end){
		pdnBtn.onclick=function(){picDownUrl();};
		pdnBtn.innerHTML="开始下载";
		return;
	}
	pdnBtn.innerHTML=now+" / "+end;
	var rindx=(lenInt>1)?prefixInteger(now, lenInt):now;
	downParam.dwnFname=rindx+urlsuf;
	var dnurl=urlpre+downParam.dwnFname;
	var fnm = downParam.dwnFolder+"/"+downParam.dwnSubFolder+"/"+downParam.dwnFname;
	chrome.downloads.download({
		url: dnurl,
		filename: fnm,
		conflictAction: 'uniquify',
		saveAs: false
	},function(){
		window.setTimeout(function(){
			picDowner(urlpre,urlsuf,now+1,end,lenInt);
		},600);
	});
}
/*test*/
function startMail(){
	var ctt = '<div style="display:inline-block;width:50px;text-align:right;padding-right:5px;">SMTP:</div></div><input id="mailParamSmtp" type="text" value="'+mailParam.smtp+'" style="width:180px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;text-align:right;padding-right:5px;">Port:</div><input id="mailParamPort" type="text" value="25" style="width:180px;" readonly="readonly"/><br/><br/>'+
		'<div style="display:inline-block;width:50px;text-align:right;padding-right:5px;">发送人:</div><input id="mailParamFrom" type="text" value="'+mailParam.from+'" style="width:180px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;text-align:right;padding-right:5px;">密码:</div><input id="mailParamPwd" type="password" value="'+mailParam.pwd+'" style="width:180px;"/><br/><br/>'+
		'<div style="display:inline-block;width:50px;text-align:right;padding-right:5px;">接收人:</div><input id="mailParamTo" type="text" value="'+mailParam.to+'" style="width:180px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;text-align:right;padding-right:5px;">标题:</div><input id="mailParamTit" type="text" value="'+mailParam.tit+'" style="width:180px;"/>';
	panelCaseA({ width:500,title: '发送邮件', content:ctt, btn1:"发送", btn2: "取消",
		fun1: function(mbdy){
			var mpSmtp=_$Q("#mailParamSmtp",mbdy);
			var mpPort=_$Q("#mailParamPort",mbdy);		
			var mpFrom=_$Q("#mailParamFrom",mbdy);
			var mpPwd=_$Q("#mailParamPwd",mbdy);
			var mpTo=_$Q("#mailParamTo",mbdy);
			var mpTit=_$Q("#mailParamTit",mbdy);
			mailParam.smtp = mpSmtp.value;
			mailParam.port = mpPort.value;
			mailParam.from = mpFrom.value;
			mailParam.pwd = mpPwd.value;
			mailParam.to = mpTo.value;
			mailParam.tit = mpTit.value;
			_setStorage("mailParamSmtp", mailParam.smtp);
			_setStorage("mailParamPort", mailParam.port);
			_setStorage("mailParamFrom", mailParam.from);
			_setStorage("mailParamPwd", mailParam.pwd);
			_setStorage("mailParamTo", mailParam.to);
			_setStorage("mailParamTit", mailParam.tit);
			var mailTxt = _$G("defpop_txts").value;
			sendMail(mailTxt);
			return true;
		}
	});

}
function sendMail(txt){
	chrome.management.getAll(function(exs){
		var exid=null;
		for(var i=0;i<exs.length;i++){
			var itm=exs[i];
			if("EasyHost"==itm.name){
				if(itm.enabled)exid=itm.id;
				break;
			}
		}
		if(exid==null){
			tipCase({msg:"EasyHost不可用！"});
			return;
		}
		mailParam.id = "sendMail";
		mailParam.txt = txt;
		chrome.runtime.sendMessage(exid, mailParam,function() {});
	});
}