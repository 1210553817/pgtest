var downParam={};
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

}
function initDatas(){
	downParam.dwnFolder = _getStorage("dwnFolder");
	downParam.dwnSubFolder = _getStorage("dwnSubFolder");	
	downParam.dwnStartIndx = _getStorage("dwnStartIndx");
	downParam.dwnEndIndx = _getStorage("dwnEndIndx");
}

/*tsDown*/
function startDown(){
	var ctt = '<div style="display:inline-block;width:50px;">文件夹:</div></div><input id="beforeDownName" type="text" value="'+downParam.dwnFolder+'" style="width:80px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;">序号:</div><input id="beforeDownIndx" type="text" value="'+downParam.dwnSubFolder+'" style="width:80px;"/><br/><br/>'+
		'<div style="display:inline-block;width:50px;">去头数:</div><input id="beforeDownStart" type="text" value="'+downParam.dwnStartIndx+'" style="width:80px;"/>&nbsp;&nbsp;'+
		'<div style="display:inline-block;width:50px;">去尾数:</div><input id="beforeDownEnd" type="text" value="'+downParam.dwnEndIndx+'" style="width:80px;"/>';
	panelCaseA({ title: '文件下载', content:ctt, btn1:"开始", btn2: "取消",
		fun1: function(mbdy){
			var fbf=_$Q("#beforeDownName",mbdy);
			var fin=_$Q("#beforeDownIndx",mbdy);		
			var fst=_$Q("#beforeDownStart",mbdy);
			var fen=_$Q("#beforeDownEnd",mbdy);
			downParam.dwnFolder = fbf.value;
			downParam.dwnSubFolder = fin.value;
			_setStorage("dwnFolder", downParam.dwnFolder);
			_setStorage("dwnSubFolder", downParam.dwnSubFolder);
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
			var parr = parseUrls();
			multDowner(parr,0,
				function(indx,len){
					downbtn.innerHTML=(indx+1)+" / "+len+" ( "+downParam.dwnStartIndx+" ~ "+downParam.dwnEndIndx+" )";
					downParam.dwnFname = prefixInteger(indx+1,4)+".ts";
					return downParam.dwnFolder+"/"+downParam.dwnSubFolder+"/"+downParam.dwnFname;
				},
				function(){
					downbtn.onclick=startDown;
					downbtn.innerHTML="开始下载";
				});
			downbtn.onclick=null;
			return true;
		}
	});

}

function parseUrls(){
	var dtxt = _$G("down_urls").value;
	var dprm = _$G("down_prms").value;
	dprm = _$Ava(dprm)?dprm:"";
	var rearr=[];
	
	//var reg = new RegExp("((http).*)","g");
	//var reg = new RegExp("(.*\.ts)","g");
	//var reg = new RegExp("(.*\.mp4.*)","g");
	//.replace(/[\r\n]/g, "")
	
	var reg = new RegExp("(.*\.ts.*)","g");
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
		},1000);
	});
}
