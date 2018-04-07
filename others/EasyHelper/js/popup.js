var downParam={};
window.onload=function(){
	initTabs();
	initEvents();
	//$BG = chrome.extension.getBackgroundPage();
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
	var sglbtn = _$G("taba_single");
	sglbtn.onclick=function(){window.open("../popup.html","newwindow");};
	//test...
	var btn21 = _$G("tabb_btn1");
	btn21.onclick=function(){tipCase({code:"A",msg:'<img src="../imgs/icon48.png" style="width:30px;height:30px;"/>'});};
	var btn22 = _$G("tabb_btn2");
	btn22.onclick=function(){
		panelCaseA({ title:'Test22...........', content:"I am test22 Dialog", width:280, btn1:"确定", btn2:"取消", btn3:"忽略",
			fun1: function(mbdy){
				return true;
			},closed: function(){
				tipCase({msg:"FROM: "+this.innerHTML});
			}
		});
	};

}
function initDatas(){
	downParam.dwnFolder = _getStorage("dwnFolder");
	downParam.dwnSubFolder = _getStorage("dwnSubFolder");	
	downParam.dwnStartIndx = _getStorage("dwnStartIndx");
	downParam.dwnEndIndx = _getStorage("dwnEndIndx");
	chrome.downloads.onDeterminingFilename.addListener(function (downloadItem,suggest){
		suggest({
			filename:downParam.dwnFolder+"\\"+downParam.dwnSubFolder+"\\"+downParam.dwnFname,
			conflictAction: 'uniquify'
		});
	});
}

function startDown(){
	var ctt = [
		'<div style="display:inline-block;width:50px;">文件夹:</div></div><input id="beforeDownName" type="text" value="',downParam.dwnFolder,'" style="width:80px;"/>&nbsp;&nbsp;',
		'<div style="display:inline-block;width:50px;">序号:</div><input id="beforeDownIndx" type="text" value="',downParam.dwnSubFolder,'" style="width:80px;"/><br/><br/>',
		'<div style="display:inline-block;width:50px;">去头数:</div><input id="beforeDownStart" type="text" value="',downParam.dwnStartIndx,'" style="width:80px;"/>&nbsp;&nbsp;',
		'<div style="display:inline-block;width:50px;">去尾数:</div><input id="beforeDownEnd" type="text" value="',downParam.dwnEndIndx,'" style="width:80px;"/>'
	].join("");
	panelCaseA({ title: '文件下载', content:ctt, btn1:"开始", btn2: "取消",
		fun1: function(mbdy){
			var fbf=_$G("beforeDownName",mbdy);
			var fin=_$G("beforeDownIndx",mbdy);		
			var fst=_$G("beforeDownStart",mbdy);
			var fen=_$G("beforeDownEnd",mbdy);
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
	var reg = new RegExp("((http).*)","g");
	//.replace(/[\r\n]/g, "")
	//var reg = new RegExp("(.*\.ts)","g");
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
