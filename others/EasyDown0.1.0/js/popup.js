function _$G(e,p,clz){
	if(p){
		var cs=p.getElementsByTagName("*");
		var i,c,arr=new Array();
		for(i=0;i<cs.length;i++){
			c=cs[i];
			if(e){
				if(e==c.id){
					return c;
				}
			}else{
				if(clz){
					var cclz=c.className;
					if(cclz){
						var czs=cclz.split(/\s+/);
						var j,cz,b=false;
						for(j=0;j<czs.length;j++){
							cz=czs[j];
							if(cz==clz){
								b=true;
							}
						}
						if(b){
							arr.push(c);
						}
					}
				}else{
					return null;
				}
			}
		}
		return arr;
	}else{
		return document.getElementById(e);
	}
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
	if ( a==undefined || typeof(a)=="undefined" || null==a || ""==a ) {
		return false;
	} else {
		return true;
	}
}
function _$Null(a) {
	return !_$Ava(a);
}
function dtFmt(fstr){
    var str = fstr;   
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
/**
*Tools
*/
function _getStorage (key) {
	if(localStorage&&localStorage.getItem(key)){
		return localStorage.getItem(key);
	}
	return "";
}
function _setStorage(key, value) {
	if(localStorage){
		localStorage.setItem(key,value);
	}else{
		opnTbox("localStorage not support on your browser!");
	}
}
/*
*tipBox
**/
function getClientSize(){
	var r=new Array();
	var wa=document.body.clientWidth-0;
	var ha=document.body.clientHeight-0;
	var wb=document.documentElement.clientWidth-0;
	var hb=document.documentElement.clientHeight-0;
	if(wa>wb){r.push(wa);}else{r.push(wb);}
	if(ha>hb){r.push(ha);}else{r.push(hb);}
	return r;
}
function _$SetOpacity(ele,val){
		ele.style.filter="alpha(opacity="+val+")";
		ele.style.opacity = val/100;
}

function _$FadeIn(elem, speed,op,fp) {
	speed = speed || 20;
	op = op || 100;
	elem.style.display = 'block';
	_$SetOpacity(elem, 0);
	var val = fp||0;
	(function() {
		_$SetOpacity(elem, val);
		val += 5;
		if (val <= op) {
			setTimeout(arguments.callee, speed)
		}
	})();
}

function _$FadeOut(elem, speed,op,fp) {
	speed = speed || 20;
	op = op || 0;
	var val = fp||100;
	( function() {
		_$SetOpacity(elem, val);
		val -= 5;
		if (val >= op) {
			setTimeout(arguments.callee, speed);
		} else if (val < op) {
			elem.style.display = 'none';
			_$SetOpacity(elem,100);
		}
	})();
}
function _$MoveDu(elem,step,fpos,tpos,speed) {
	if(0==step)return;
	speed = speed || 20; 
	tpos = tpos || 0;
	var val = fpos-0;
	elem.style.top=val+"px";
	( function() {
		elem.style.top=val+"px";
		val += step;
		if(step<0){
			if (val > tpos) {
				setTimeout(arguments.callee, speed);
			}
		}else{
			if (val < tpos) {
				setTimeout(arguments.callee, speed);
			}
		}
	})();
}

function opnTbox(m,prd,afun){
	var carr=getClientSize();
	var pgw=carr[0];
	var pgh=carr[1];
	var mtbox = _$G("mtbox");
	var mctt;
	if(mtbox){
		mctt=_$G("mtbox");
	}else{
		mtbox = _$C("a");
		mctt=_$C("div");
		mctt.style.display="block";
		mctt.style.position="fixed";
		mctt.style.zIndex="9999";
		mctt.style.maxWidth=pgw-10+"px";
	}
	mtbox.className="mtbox";
	mtbox.innerHTML=m;
	mctt.style.display="block";
	_$A(mtbox,mctt);
	_$A(mctt,document.body);
	var mcttw=parseInt(mctt.offsetWidth);
	var mctth=parseInt(mctt.offsetHeight);
	mctt.style.left=(pgw/2-(mcttw/2))+"px";
	mctt.style.top=(pgh/2-(mctth/2))+"px";
	_$FadeIn(mctt);
	if(!prd)prd=1500;
	window.setTimeout(function(){if(afun)afun();_$FadeOut(mctt);},prd);
}
function opnCfmBox(titx,msg,btnText1,fun1,btnText2,fun2,btnText3,fun3,mwidth,headColor,clazza,clazzb,clazzc){
	var mboxw=mwidth?mwidth:300;
	var carr=getClientSize();
	var pgw=carr[0];
	var pgh=carr[1];
	var mbox = _$G("cfmBox");
	var clay,mboxtit,mboxclr,mboxbody,tittxt,mbox_btna,mbox_btnb,mbox_btnc;
	clay=_$G("cfmbackLayer");
	mboxtit=_$G("cfmBox_header",mbox);
	mboxclr=_$G("cfmBox_closer",mbox);
	mboxbody=_$G("cfmBox_body",mbox);
	tittxt=_$G("cfmboxTit",mbox);
	mboxmsg=_$G("cfmboxMsg",mbox);
	mbox_btna=_$G("cfmBoxbtna",mbox);
	mbox_btnb=_$G("cfmBoxbtnb",mbox);
	mbox_btnc=_$G("cfmBoxbtnc",mbox);
	if(titx){
		tittxt.innerHTML=titx;
	}
	if(msg){
		mboxmsg.innerHTML=msg;
	}

	if(!btnText1){
		mbox_btna.style.display="none";
	}else{
		mbox_btna.innerHTML=btnText1;
		mbox_btna.style.display="inline-block";
		mbox_btna.onclick=function(){
			if(fun1){
				fun1.call(mbox_btna,mboxbody);
			}
			//mbox.style.display="none";
			//clay.style.display="none";
			_$FadeOut(mbox,15);
			_$FadeOut(clay,20,0,70);
		};
	}
	if(!btnText2){
		mbox_btnb.style.display="none";
	}else{
		mbox_btnb.innerHTML=btnText2;
		mbox_btnb.style.display="inline-block";
		mbox_btnb.onclick=function(){
			if(fun2){
				fun2.call(mbox_btnb,mboxbody);
			}
			// mbox.style.display="none";
			// clay.style.display="none";
			_$FadeOut(mbox,15);
			_$FadeOut(clay,20,0,70);
		};
	}
	if(!btnText3){
		mbox_btnc.style.display="none";
	}else{
		mbox_btnc.innerHTML=btnText3;
		mbox_btnc.style.display="inline-block";
		mbox_btnc.onclick=function(){
			if(fun3){
				fun3.call(mbox_btnc,mboxbody);
			}
			// mbox.style.display="none";
			// clay.style.display="none";
			_$FadeOut(mbox,15);
			_$FadeOut(clay,20,0,70);
		};
	}
	mboxclr.onclick=function(){
		// mbox.style.display="none";
		// clay.style.display="none";
		_$FadeOut(mbox,15);
		_$FadeOut(clay,20,0,70);
	}
	mbox.style.width=mboxw+"px";
	if(headColor)mboxtit.style.backgroundColor=headColor;
	if(clazza)mbox_btna.className=clazza;
	if(clazzb)mbox_btnb.className=clazzb;
	if(clazzc)mbox_btnc.className=clazzc;

	clay.style.width=pgw+"px";
	clay.style.height=pgh+"px";
	mbox.style.left=(pgw/2-(mboxw/2))+"px";
	mbox.style.top=-10000+"px";
	_$G("cfmBox_body",mbox).style.maxHeight=pgh-5+"px";
	mbox.style.display="block";
	clay.style.display="block";
	var mboxht=parseInt(mbox.offsetHeight);
	var mboxposy=(pgh/2-(mboxht/2));
	//_$MoveDu(mbox,20,mboxposy-50,mboxposy);
	mbox.style.top=mboxposy+"px";
	_$FadeIn(clay,15,70);
	_$FadeIn(mbox,20);
	
}
function opnCfmBoxA(tit,msg,at,ab,bt,bb,ct,cb){
	var bcl="btn btn-mini";
	if(!ct)bcl=null;
	opnCfmBox(tit,
	msg,at,ab,bt,bb,ct,cb,
	null,"#efefef","btn btn-mini btn-green",bcl);
}
/*tool fun*/
function prefixInteger(num, n) {
	return (Array(n).join(0) + num).slice(-n);
}
var Ajax = function(){};
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
};

Ajax.get = function (url, callback) {
    var req = Ajax.getHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (callback) callback(req.responseText);
        }
    };
    req.send(null);
};

Ajax.post = function (url, data, callback) {
    var req = Ajax.getHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (callback) callback(req.responseText);
        }
    };
    req.send(data);
};
/**downStart**/
var dwnFolder="";
var dwnSubFolder="";
var dwnStartIndx="";
var dwnEndIndx="";
var dwnFname="";
var dnbtn = null;
window.onload=function(){
	dwnFolder = _getStorage("dwnFolder");
	dwnSubFolder = _getStorage("dwnSubFolder");	
	dwnStartIndx = _getStorage("dwnStartIndx");
	dwnEndIndx = _getStorage("dwnEndIndx");
	chrome.downloads.onDeterminingFilename.addListener(function (downloadItem,suggest){
		suggest({
			filename:dwnFolder+"\\"+dwnSubFolder+"\\"+dwnFname,
			conflictAction: 'uniquify'
		});
	});
	dnbtn = _$G("defpop_mDown");
	dnbtn.onclick=startDownload;	
	var sglbtn = _$G("defpop_single");
	sglbtn.onclick=function(){window.open("../popup.html","newwindow");};
	var ykbtn = _$G("defpop_ykpaz");
	ykbtn.onclick=parseYkUrls;

};
function startDownload(){
	opnCfmBoxA('文件下载',
	'<div style="display:inline-block;width:50px;">文件夹:</div></div><input id="beforeDownName" type="text" value="'+dwnFolder+'" style="width:80px;"/>&nbsp;&nbsp;<div style="display:inline-block;width:50px;">序号:</div><input id="beforeDownIndx" type="text" value="'+dwnSubFolder+'" style="width:80px;"/>'
	+'<br/><br/><div style="display:inline-block;width:50px;">去头数:</div><input id="beforeDownStart" type="text" value="'+dwnStartIndx+'" style="width:80px;"/>&nbsp;&nbsp;<div style="display:inline-block;width:50px;">去尾数:</div><input id="beforeDownEnd" type="text" value="'+dwnEndIndx+'" style="width:80px;"/>',
	"开始",function(mbdy){
		var fbf=_$G("beforeDownName",mbdy);
		var fin=_$G("beforeDownIndx",mbdy);		
		var fst=_$G("beforeDownStart",mbdy);
		var fen=_$G("beforeDownEnd",mbdy);
		dwnFolder = fbf.value;
		dwnSubFolder = fin.value;
		_setStorage("dwnFolder", dwnFolder);
		_setStorage("dwnSubFolder", dwnSubFolder);
		var dnsr=parseInt(fst.value);
		var dnen=parseInt(fen.value);
		if(dnsr>=0){
			dwnStartIndx = dnsr;
			_setStorage("dwnStartIndx", dwnStartIndx);
		}
		if(dnen>=0){
			dwnEndIndx = dnen;
			_setStorage("dwnEndIndx", dwnEndIndx);
		}
		var parr = parseUrls();
		mutiDowner(parr,0);
		dnbtn.onclick=null;
	},
	"取消");
}

function parseUrls(){
	var dtxt = _$G("defpop_txts").value;
	var rearr=[];
	var reg = new RegExp("((http).*)","g");
	var result =null;
	do{
		result=reg.exec(dtxt);
		if(_$Ava(result)&&result[2]=="http"){
			rearr.push(result[1]);
		}
	}while(result!=null)
	var dnsr=parseInt(dwnStartIndx);
	var dnen=parseInt(dwnEndIndx);
	return rearr.slice(dnsr>=0?(dnsr+1):0,dnsr>=0?(rearr.length-dnen):(rearr.length));

}
function mutiDowner(urls,indx){
	if(urls.length<1||urls.length==indx){
		dnbtn.onclick=startDownload;
		dnbtn.innerHTML="开始下载";
		return;
	}
	var dnurl=urls[indx];
	dnbtn.innerHTML=(indx+1)+" / "+urls.length+" ( "+dwnStartIndx+" ~ "+dwnEndIndx+" )";
	dwnFname = prefixInteger(indx+1,4)+".ts";
	chrome.downloads.download({
		url: dnurl,
		conflictAction: 'uniquify',
		saveAs: false
	},function(){
		window.setTimeout(function(){
			mutiDowner(urls,indx+1);
		},200);
	});
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
		getYkDownUrl(stms,indx+1,txs,aft)
	});
}