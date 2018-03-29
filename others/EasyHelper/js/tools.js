function _$G(e){
	return document.getElementById(e);
}
function _$C(a) {
	return document.createElement(a);
}
function _$A(b, a) {
	a.appendChild(b);
}
var _$P=function(g,p,s){
	var oid;
	try{
		if(_$Ava(p)){
			if(typeof p == "object"&&p.tagName){
				var id = "TMPQUERYID"+new Date().getTime()+p.tagName+p.innerHTML.length;
				oid = p?p.getAttribute("id"):null,nid = oid || id;
				p.id=nid;
				if(s) return document.querySelector("[id='"+nid+"'] "+g);
				else return document.querySelectorAll("[id='"+nid+"'] "+g);
			}else{
				return s?null:[];
			}
		}else{
			if(s) return document.querySelector(g);
			else return document.querySelectorAll(g);
		}
	}catch(err){return s?null:[];}finally{
		if(typeof p == "object"&&p.tagName&&!oid)p.removeAttribute("id");
	}
};
var _$Q=function(g,p){return _$P(g,p,1);}
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
function getPgsz(){
	var dmd=document.compatMode=="CSS1Compat";
	var r=new Array();
	var wa=dmd?document.documentElement.clientWidth:document.body.clientWidth;
	var ha=dmd?document.documentElement.clientHeight:document.body.clientHeight;
	r.push(wa);
	r.push(ha);
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
	var carr=getPgsz();
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
/**
*option{
* code 编号,
* title 标题,
* content 内容,
* btn1 按钮1,
* fun1 回调1,
* btn2 按钮2,
* fun2 回调2,
* btn3 按钮3,
* fun3 回调3,
* width 宽度,
* headColor 颜色,
* claza ClassA,
* clazb ClassB,
* clazc ClassC,
*}
*/
function opnCfmBox(option){
	var mboxw=option.width?option.width:300;
	var carr=getPgsz();
	var pgw=carr[0];
	var pgh=carr[1];
	if(_$Null(option.code))option.code="";
	var mbox = _$G("cfmBox"+option.code);
	var clay,mboxtit,mboxclr,mboxbody,tittxt,mbox_btna,mbox_btnb,mbox_btnc;
	clay=_$G("cfmbackLayer"+option.code);
	mboxtit=_$Q("#cfmBox_header",mbox);
	mboxclr=_$Q("#cfmBox_closer",mbox);
	mboxbody=_$Q("#cfmBox_body",mbox);
	tittxt=_$Q("#cfmboxTit",mbox);
	mboxmsg=_$Q("#cfmboxMsg",mbox);
	mbox_btna=_$Q("#cfmBoxbtna",mbox);
	mbox_btnb=_$Q("#cfmBoxbtnb",mbox);
	mbox_btnc=_$Q("#cfmBoxbtnc",mbox);
	if(option.title){
		tittxt.innerHTML=option.title;
	}
	if(option.content){
		mboxmsg.innerHTML=option.content;
	}

	if(!option.btn1){
		mbox_btna.style.display="none";
	}else{
		mbox_btna.innerHTML=option.btn1;
		mbox_btna.style.display="inline-block";
		mbox_btna.onclick=function(){
			if(option.fun1){
				var b=option.fun1.call(mbox_btnc,mboxbody);
				if(b){
					_$FadeOut(mbox,15);
					_$FadeOut(clay,20,0,70);
				}
			}else{
				// mbox.style.display="none";
				// clay.style.display="none";
				_$FadeOut(mbox,15);
				_$FadeOut(clay,20,0,70);
			}
		};
	}
	if(!option.btn2){
		mbox_btnb.style.display="none";
	}else{
		mbox_btnb.innerHTML=option.btn2;
		mbox_btnb.style.display="inline-block";
		mbox_btnb.onclick=function(){
			if(option.fun2){
				var b=option.fun2.call(mbox_btnc,mboxbody);
				if(b){
					_$FadeOut(mbox,15);
					_$FadeOut(clay,20,0,70);
				}
			}else{
				// mbox.style.display="none";
				// clay.style.display="none";
				_$FadeOut(mbox,15);
				_$FadeOut(clay,20,0,70);
			}
		};
	}
	if(!option.btn1){
		mbox_btnc.style.display="none";
	}else{
		mbox_btnc.innerHTML=option.btn1;
		mbox_btnc.style.display="inline-block";
		mbox_btnc.onclick=function(){
			if(option.fun3){
				var b=option.fun3.call(mbox_btnc,mboxbody);
				if(b){
					_$FadeOut(mbox,15);
					_$FadeOut(clay,20,0,70);
				}
			}else{
				// mbox.style.display="none";
				// clay.style.display="none";
				_$FadeOut(mbox,15);
				_$FadeOut(clay,20,0,70);
			}
		};
	}
	mboxclr.onclick=function(){
		// mbox.style.display="none";
		// clay.style.display="none";
		_$FadeOut(mbox,15);
		_$FadeOut(clay,20,0,70);
	}
	mbox.style.width=mboxw+"px";
	if(option.headColor)mboxtit.style.backgroundColor=option.headColor;
	if(option.claza)mbox_btna.className=option.claza;
	if(option.clazb)mbox_btnb.className=option.clazb;
	if(option.clazc)mbox_btnc.className=option.clazc;

	clay.style.width=pgw+"px";
	clay.style.height=pgh+"px";
	mbox.style.left=(pgw/2-(mboxw/2))+"px";
	mbox.style.top=-10000+"px";
	_$Q("#cfmBox_body",mbox).style.maxHeight=pgh-5+"px";
	mbox.style.display="block";
	clay.style.display="block";
	var mboxht=parseInt(mbox.offsetHeight);
	var mboxposy=(pgh/2-(mboxht/2));
	//_$MoveDu(mbox,20,mboxposy-50,mboxposy);
	mbox.style.top=mboxposy+"px";
	_$FadeIn(clay,15,70);
	_$FadeIn(mbox,20);
	
}
function opnCfmBoxA(opt){
	opnCfmBox({code:opt.code,title:opt.title,content:opt.content,btn1:opt.btn1,fun1:opt.fun1,btn2:opt.btn2,fun2:opt.fun2,btn3:opt.btn3,fun3:opt.fun3,headColor:"#efefef",claza:"btn btn-mini btn-green"});
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