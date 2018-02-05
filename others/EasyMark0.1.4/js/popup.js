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
function getBkmks() {
	opnTbox("正在获取数据，请稍后...",1000,
		function(){
			var a = "";
			chrome.bookmarks.getTree( function(b) {
				a = getBkmk(b);
				setBkmkJson(a);
			});
		});
}
function getBkmk(e) {
	var a = new _$SB();
	a.append("[");
	for ( var f = 0; f < e.length; f++) {
		var d = _$Ava(e[f].title) ? e[f].title : "";
		var c = _$Ava(e[f].url) ? e[f].url : "";
		if (f > 0) {
			a.append(",");
		}
		a.append("{");
		a.append('"id":"' + (_$Ava(e[f].id) ? e[f].id : "") + '",');
		a.append('"index":"' + (_$Ava(e[f].index) ? e[f].index : "") + '",');
		a.append('"title":"' + escape(d) + '",');
		a.append('"url":"' + escape(c) + '"');
		var b = e[f].children;
		if (_$Ava(b)) {
			a.append(',"children":' + getBkmk(b));
		}
		a.append("}");
	}
	a.append("]");
	return a.toString();
}
function setBkmkJson(a) {
	_$G("defpop_txts").value = a;
}
function setAllBkmk(){
	var setStr = _$G("defpop_txts").value;
	setAllBkmkA(setStr);
}
function setAllBkmkA(str,doFun){
	var setStr = str;
	if (!_$Ava(setStr)) {
		opnTbox("没有要还原的数据!");
		return;
	}
	var tdt;
	try {
		tdt = eval("(" + setStr + ")");
	} catch (err) {
		opnTbox("json data error! " + err);
		return;
	}
	opnCfmBoxA("提示",
	"请选择要进行的书签操作！",
	"覆盖",function(){
		rmAllBkmk();
		var tnd=tdt[0];
		setBaseBkmk(tnd,tnd.id);
		if(doFun) doFun();
		initDmLs();
	},
	"合并",function(){
		var tnd=tdt[0];
		setBaseBkmk(tnd,tnd.id);
		initDmLs();
	},
	"取消");
}
function setBaseBkmk(tnd,tid){
	if(!_$Ava(tnd))return;
	chrome.bookmarks.getTree( function(b) {
		var bsids=new Array(); 
		if(_$Ava(b)&&_$Ava(b[0])&&_$Ava(b[0].children)){
			for(var k=0;k<b[0].children.length;k++){
				var bitm=b[0].children[k];
				bsids.push(bitm.id);
			}
		}
		
		for(var i=tnd.children.length-1;i>-1;i--){
			var itm=tnd.children[i];
			for(var j=itm.children.length-1;j>-1;j--){
				var itma=itm.children[j];
				setBkmk(itma, (bsids&&bsids.length>1)?bsids[i]:(i+1+""));
			}

		}
	
	});
}
function setBkmk(a, b) {
	if (!_$Ava(a)) {
		return;
	}
	var c = a.title;
	var d = (_$Ava(a.url)) ? a.url : "";
	chrome.bookmarks.create( {
		parentId :b,
		index :0,
		title :unescape(c),
		url :unescape(d)
	}, function(e) {
		var g = a.children;
		if (!_$Ava(g)) {
			return;
		}
		for ( var f = g.length - 1; f > -1; f--) {
			if(_$Ava(e)) setBkmk(g[f], e.id);
		}
	});
}
function rmAllBkmk() {
	chrome.bookmarks.getTree( function(a) {
		rmBkmk(a);
	});
}
function rmBkmk(a) {
	for ( var b = 0; b < a.length; b++) {
		if (_$Ava(a[b].children)) {
			rmBkmk(a[b].children);
		}
		if (0 != a[b].id && 1 != a[b].id && 2 != a[b].id) {
			chrome.bookmarks.removeTree(a[b].id, function() {
			});
		}
	}
}
var mactnH,mactnW;
var dwnSecond="";
window.onload = function() {
	Date.prototype.toStr =dtFmt;
	var b = _$G("defpop_getBkmks");
	b.onclick = getBkmks;
	var a = _$G("defpop_setBkmks");
	a.onclick = setAllBkmk;

	_$G("mdlg_tit_abtna").onclick=function(){ontabclk("a")};
	_$G("mdlg_tit_abtnb").onclick=function(){ontabclk("b")};
	_$G("mdlg_tit_abtnc").onclick=function(){ontabclk("c")};
	_$G("defpop_setBkmksStore").onclick=addBkmk2dm;
	_$G("defpop_getBkmkDomain").onclick=showBkmkdm;
	_$G("defpop_setBkmkDomain").onclick=restoreBkmkdm;

	var mactn=_$G("mactn");
	mactnW=mactn.offsetWidth;
	mactnH=mactn.offsetHeight;
	_$G("mdlg_cctner").style.width=mactnW+"px";
	_$G("subCtnera").style.height=mactnH+"px";
	var ta=_$G("defpop_txts");
	var tb=_$G("defpop_domain_txts");
	ta.style.height=(mactnH-30)+"px";
	ta.style.width=mactnW+"px";
	tb.style.height=(mactnH-30)+"px";
	tb.style.width=mactnW+"px";
	try{
		initDmLs();
	}catch(e){
		setBkmkdm("");
		opnTbox("init list failed!"+e);
	}
	
	_$G("defpop_MultiDown").onclick=mutiDownUrl;
	chrome.downloads.onDeterminingFilename.addListener(function (downloadItem,suggest){
		suggest({
			filename:dwnSecond+"\\"+downloadItem.filename,
			conflictAction: 'uniquify'
		});
	});
	
};
function ontabclk(idx){
	if("a"==idx){
		_$G("mdlg_tit_abtna").className="mdlg_tit_abtn bkGradient_orange bdrds";
		_$G("mdlg_tit_abtnb").className="mdlg_tit_abtn_grey bdrds";
		_$G("mdlg_tit_abtnc").className="mdlg_tit_abtn_grey bdrds";
		_$G("subCtnera").style.display="block";
		_$G("subCtnerb").style.display="none";
		_$G("subCtnerc").style.display="none";
		initDmLs();
	}else if("b"==idx){
		_$G("mdlg_tit_abtnb").className="mdlg_tit_abtn bkGradient_orange bdrds";
		_$G("mdlg_tit_abtna").className="mdlg_tit_abtn_grey bdrds";
		_$G("mdlg_tit_abtnc").className="mdlg_tit_abtn_grey bdrds";
		_$G("subCtnerb").style.display="block";
		_$G("subCtnera").style.display="none";
		_$G("subCtnerc").style.display="none";
	}else if("c"==idx){
		_$G("mdlg_tit_abtnc").className="mdlg_tit_abtn bkGradient_orange bdrds";
		_$G("mdlg_tit_abtna").className="mdlg_tit_abtn_grey bdrds";
		_$G("mdlg_tit_abtnb").className="mdlg_tit_abtn_grey bdrds";
		_$G("subCtnerc").style.display="block";
		_$G("subCtnera").style.display="none";
		_$G("subCtnerb").style.display="none";
	}

}
function addBkmk2dm(){
	chrome.bookmarks.getTree( function(b) {
		var a = getBkmk(b);
		var setStr = _$G("defpop_txts").value;
		if(!_$Ava(setStr)||setStr.trim()==""){setStr=new Date().toStr('yyyy-MM-dd');}
		if(20<setStr.length){opnTbox("名字太长了！");return;}
		var anew="{\"bkmknm\":\""+escape(setStr)+"\",\"bkmkdata\":\""+encrypt(a,"EasyMark")+"\",\"ckd\":\"1\"}";
		var dmstr=getBkmkdm();
		if(!dmstr){
			_setStorage("bkmkDomain","["+anew+"]");
		}else{
			var reg=new RegExp("^\\[{.*}\\]$");
			if(reg.test(dmstr)){
				dmstr=dmstr.replace(/\"ckd\":\"1\"/g,"\"ckd\":\"0\"");
				var nstr;
				if(2==dmstr.length){
					nstr=dmstr.substring(0,dmstr.length-1)+""+anew+"]";	
				}else{
					nstr=dmstr.substring(0,dmstr.length-1)+","+anew+"]";
				}
				_setStorage("bkmkDomain",nstr);
			}else{
				_setStorage("bkmkDomain","["+anew+"]");
			}
		}
		opnTbox(setStr+"  已添加成功！");
	});
}
function getBkmkdm(){
 return _getStorage("bkmkDomain");
}
function setBkmkdm(str){
 _setStorage("bkmkDomain",str);
}
function showBkmkdm(){
	opnTbox("正在获取数据，请稍后...",1000,
		function(){
			var b = _$G("defpop_domain_txts");
			b.value=getBkmkdm();
		});
}
function restoreBkmkdm(){
	var b = _$G("defpop_domain_txts").value;
	if(""==b){
		opnCfmBoxA("提示",
			"确定清空书签集吗？",
			"确定",function(){setBkmkdm("");},
			"取消");
		return;
	}
	try{
		var reg=new RegExp("^\\[{.*}\\]$");
		if(!reg.test(b)){
			opnTbox("data error!");
			return;
		}
		eval("("+b+")");
	}catch(e){
		opnTbox("data error: not Json");
		return;
	}
	opnCfmBoxA("提示",
		"确定覆盖书签集吗？",
		"确定",function(){setBkmkdm(b);},
		"取消");
}

function initDmLs(){
	var dmstr=getBkmkdm();
	var dmctn=_$G("subCtnera");
	dmctn.innerHTML="";
	if(dmstr==""){
		return;
	}
	var dmls=eval("("+dmstr+")");
	for(var i=dmls.length-1;i>=0;i--){
		var addiv=_$C("div");
		addiv.className="dmlsdiv";
		var ada=_$C("a");
		if("1"==dmls[i].ckd){
			ada.className="mdlg_dm_abtn";
		}else{
			ada.className="mdlg_dm_abtn_grey";
		}
		ada.innerHTML=unescape(dmls[i].bkmknm);
		ada.idx=i;
		ada.addEventListener('click',function(e) {
			var _this = e.target; 
			ondmaClk(_this.idx);
		}, false);
		var mrmer=_$C("a");
		mrmer.className="mrmer";
		mrmer.idx=i;
		mrmer.addEventListener('click',function(e) {
			var _this = e.target;
			ondmRmerClk(_this.idx);
		}, false);
		_$A(ada,addiv);
		_$A(mrmer,addiv);
		_$A(addiv,dmctn);
	}
}
function ondmaClk(idx){
	var curdata;
	var dmstr=getBkmkdm();
	if(dmstr=="") return;
	var dmls=eval("("+dmstr+")");
	for(var k=0;k<dmls.length;k++){
		if(k==idx){
			dmls[k].ckd=1;
			curdata=dmls[k].bkmkdata;
		}else{
			dmls[k].ckd=0;
		}
	}
	var rststr=cvtDm2Str(dmls);
	setAllBkmkA(decrypt(curdata,"EasyMark"),function(){
		setBkmkdm(rststr);
	});
}
function ondmRmerClk(idx){
	opnCfmBoxA("提示",
		"确定删除此书签集吗？",
		"确定",function(){
			var dmstr=getBkmkdm();
			if(dmstr=="") return;
			var dmls=eval("("+dmstr+")");
			var ndmls=[];
			for(var k=0;k<dmls.length;k++){
				if(k!=idx){
					ndmls.push(dmls[k]);
				}
			}
			var rststr=cvtDm2Str(ndmls);
			setBkmkdm(rststr);
			initDmLs();
		},
		"取消");	
}
function cvtDm2Str(dmls){
	var nsb=new _$SB();
	nsb.append("[");
	for(var k=0;k<dmls.length;k++){
		if(k>0) nsb.append(",");
		nsb.append("{\"bkmknm\":\""+dmls[k].bkmknm+"\",\"bkmkdata\":\""+dmls[k].bkmkdata+"\",\"ckd\":\""+dmls[k].ckd+"\"}");
	}
	nsb.append("]");
	return nsb.toString();
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
function _setStorage (key, value) {
	if(localStorage){
		localStorage.setItem(key,value);
	}else{
		opnTbox("localStorage not support on your browser!");
	}
}
function encrypt(str, pwd) {
	if (pwd == null || pwd.length <= 0) {
		opnTbox("Please enter a password with which to encrypt the message.");
		return null;
	}
	var prand = "";
	for ( var i = 0; i < pwd.length; i++) {
		prand += pwd.charCodeAt(i).toString();
	}
	var sPos = Math.floor(prand.length / 5);
	var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2)
			+ prand.charAt(sPos * 3) + prand.charAt(sPos * 4)
			+ prand.charAt(sPos * 5));
	var incr = Math.ceil(pwd.length / 2);
	var modu = Math.pow(2, 31) - 1;
	if (mult < 2) {
		opnTbox("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
		return null;
	}
	var salt = Math.round(Math.random() * 1000000000) % 100000000;
	prand += salt;
	while (prand.length > 10) {
		prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(
				10, prand.length))).toString();
	}
	prand = (mult * prand + incr) % modu;
	var enc_chr = "";
	var enc_str = "";
	for ( var i = 0; i < str.length; i++) {
		enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
		if (enc_chr < 16) {
			enc_str += "0" + enc_chr.toString(16);
		} else
			enc_str += enc_chr.toString(16);
		prand = (mult * prand + incr) % modu;
	}
	salt = salt.toString(16);
	while (salt.length < 8)
		salt = "0" + salt;
	enc_str += salt;
	return enc_str;
}

function decrypt(str, pwd) {
	if (str == null || str.length < 8) {
		opnTbox("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
		return null;
	}
	if (pwd == null || pwd.length <= 0) {
		opnTbox("Please enter a password with which to decrypt the message.");
		return null;
	}
	var prand = "";
	for ( var i = 0; i < pwd.length; i++) {
		prand += pwd.charCodeAt(i).toString();
	}
	var sPos = Math.floor(prand.length / 5);
	var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2)
			+ prand.charAt(sPos * 3) + prand.charAt(sPos * 4)
			+ prand.charAt(sPos * 5));
	var incr = Math.round(pwd.length / 2);
	var modu = Math.pow(2, 31) - 1;
	var salt = parseInt(str.substring(str.length - 8, str.length), 16);
	str = str.substring(0, str.length - 8);
	prand += salt;
	while (prand.length > 10) {
		prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(
				10, prand.length))).toString();
	}
	prand = (mult * prand + incr) % modu;
	var enc_chr = "";
	var enc_str = "";
	for ( var i = 0; i < str.length; i += 2) {
		enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16)
				^ Math.floor((prand / modu) * 255));
		enc_str += String.fromCharCode(enc_chr);
		prand = (mult * prand + incr) % modu;
	}
	return enc_str;
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
	var clay,mboxtit,mboxclr,tittxt,mbox_btna,mbox_btnb,mbox_btnc;
	clay=_$G("cfmbackLayer");
	mboxtit=_$G("cfmBox_header",mbox);
	mboxclr=_$G("cfmBox_closer",mbox);
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
				window.setTimeout(fun1,10);
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
				window.setTimeout(fun2,10);
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
				window.setTimeout(fun3,10);
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
	null,"#eee","btn btn-mini btn-orange",bcl);
}

function mutiDownUrl(){
	var setStr = _$G("defpop_txts").value;
	var reg = new RegExp("^((http)[s]*://.*)(\\[(\\d+)\-(\\d+)#(\\d)\\])(.*)$");
	var group = reg.exec(setStr); 
	if(!_$Ava(group)||group[2]!="http"){
		opnTbox("请输入url,通配符（如：[1-23#2]）");
		return;
	}
	var lenInt=parseInt(group[6]);
	var startInt=parseInt(group[4]);
	var endInt=parseInt(group[5]);
	if(group[4].length>lenInt||group[5].length>lenInt||endInt<startInt){
		opnTbox("通配符不正确，如：[1-23#2]");
	}
	dwnSecond=new Date().toStr('yyyy-MM-dd\\hh_mm_ss');
	mutiDowner(group[1],group[7],startInt,endInt,lenInt);
	
}
function mutiDowner(urlpre,urlsuf,now,end,lenInt){
	if(now>end)return;
	var rindx=(lenInt>1)?prefixInteger(now, lenInt):now;
	var dnurl=urlpre+rindx+urlsuf;
	opnTbox(dnurl);
	chrome.downloads.download({
		url: dnurl,
		conflictAction: 'uniquify',
		saveAs: false
	},function(){
		window.setTimeout(function(){
			mutiDowner(urlpre,urlsuf,now+1,end,lenInt);
		},1500);
	});
}
function prefixInteger(num, n) {
	return (Array(n).join(0) + num).slice(-n);
}