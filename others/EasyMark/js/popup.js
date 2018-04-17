var downParam={};
window.onload=function(){
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
				if("tabtit0"==this.id)initDmLs();
			}
		}
	}
}
function initEvents(){
	_$G("defpop_getBkmks").onclick = getBkmks;
	_$G("defpop_setBkmks").onclick = setAllBkmk;
	_$G("defpop_setBkmksStore").onclick=addBkmk2dm;
	_$G("defpop_getBkmkDomain").onclick=showBkmkdm;
	_$G("defpop_setBkmkDomain").onclick=restoreBkmkdm;

}
function initDatas(){
	try{
		initDmLs();
	}catch(e){
		setBkmkdm("");
		tipCase({msg:"init list failed!"+e});
	}
}

function getBkmks() {
	tipCase({msg:'<img src="../imgs/loading.gif" style="width:24px;height:24px;"/>',cover:1,closed:function(){
		chrome.bookmarks.getTree( function(b) {
			var a = getBkmk(b);
			setBkmkJson(a);
		});
	}});
}
function getBkmk(e) {
	var a = "[";
	for ( var f = 0; f < e.length; f++) {
		var d = _$Ava(e[f].title) ? e[f].title : "";
		var c = _$Ava(e[f].url) ? e[f].url : "";
		if (f > 0) {
			a+=",";
		}
		a+="{";
		a+='"id":"' + (_$Ava(e[f].id) ? e[f].id : "") + '",';
		a+='"index":"' + (_$Ava(e[f].index) ? e[f].index : "") + '",';
		a+='"title":"' + escape(d) + '",';
		a+='"url":"' + escape(c) + '"';
		var b = e[f].children;
		if (_$Ava(b)) {
			a+=',"children":' + getBkmk(b);
		}
		a+="}";
	}
	a+="]";
	return a;
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
		tipCase({msg:"没有要还原的数据!",cover:1});
		return;
	}
	var tdt;
	try {
		tdt = eval("(" + setStr + ")");
	} catch (err) {
		tipCase({msg:"json data error! "+err});
		return;
	}
	panelCaseA({ title:'提示', content:"请选择要进行的书签操作！", btn1:"覆盖", btn2:"合并", btn3:"取消",
		fun1: function(mbdy){
			rmAllBkmk();
			var tnd=tdt[0];
			setBaseBkmk(tnd,tnd.id);
			if(doFun) doFun();
			initDmLs();
			return true;
		},fun2: function(mbdy){
			var tnd=tdt[0];
			setBaseBkmk(tnd,tnd.id);
			initDmLs();
			return true;
		}
	});
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
/*domain*/
function addBkmk2dm(){
	chrome.bookmarks.getTree( function(b) {
		var a = getBkmk(b);
		var setStr = _$G("defpop_txts").value;
		if(!_$Ava(setStr)||setStr.trim()==""){setStr=date2Str();}
		if(20<setStr.length){tipCase({msg:"名字太长了",cover:1});return;}
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
		tipCase({msg:setStr+"  已添加成功！",cover:1});
	});
}
function getBkmkdm(){
 return _getStorage("bkmkDomain");
}
function setBkmkdm(str){
 _setStorage("bkmkDomain",str);
}
function showBkmkdm(){
	tipCase({msg:'<img src="../imgs/loading.gif" style="width:24px;height:24px;"/>',cover:1,closed:function(){
		var b = _$G("defpop_domain_txts");
		b.value=getBkmkdm();
	}});
}
function restoreBkmkdm(){
	var b = _$G("defpop_domain_txts").value;
	if(""==b){
		panelCaseA({ title:'提示', content:"确定清空书签集吗？", btn1:"确定",btn2:"取消",
			fun1: function(mbdy){
				setBkmkdm("");
				return true;
			}
		});
		return;
	}
	try{
		var reg=new RegExp("^\\[{.*}\\]$");
		if(!reg.test(b)){
			tipCase({msg:"data error!"});
			return;
		}
		eval("("+b+")");
	}catch(e){
		tipCase({msg:"data error: not Json"});
		return;
	}
	panelCaseA({ title:'提示', content:"确定覆盖书签集吗？", btn1:"确定",btn2:"取消",
		fun1: function(mbdy){
			setBkmkdm(b);
			return true;
		}
	});
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
	panelCaseA({ title:'提示', content:"确定删除此书签集吗？", btn1:"确定",btn2:"取消",
		fun1: function(mbdy){
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
			return true;
		}
	});
}
function cvtDm2Str(dmls){
	var nsb="[";
	for(var k=0;k<dmls.length;k++){
		if(k>0) nsb+=",";
		nsb+="{\"bkmknm\":\""+dmls[k].bkmknm+"\",\"bkmkdata\":\""+dmls[k].bkmkdata+"\",\"ckd\":\""+dmls[k].ckd+"\"}";
	}
	nsb+="]";
	return nsb;
}
/*util*/
function encrypt(str, pwd) {
	if (pwd == null || pwd.length <= 0) {
		tipCase({msg:"Please enter a password with which to encrypt the message."});
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
		tipCase({msg:"Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password."});
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
		tipCase({msg:"A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted."});
		return null;
	}
	if (pwd == null || pwd.length <= 0) {
		tipCase({msg:"Please enter a password with which to decrypt the message."});
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