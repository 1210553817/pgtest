var uls=[
"sbs.ysyspb.com",
"dyb.jdcbuy.com",
"s6.cnzz.com",
"js.maziyou.com",
"qtu.51laiduobao.com",
"tt.myhaohaizi.com",
"f.qcwzx.net.cn",
"km.jianduankm.com",
"pic.lovelala.cn",
"t.muduli.cn",
"hea.qhuade.com",
"tba.ntjacb.com",
"onjgk.lanhouhou.cn",
"uu.feipukeplus.com",
"bllo.hsq3z.com",
"h.huanqiucaizhi.com",
"s.hnhgw.cn",
"s.sufficient.cn",
"w.jscsd.cn",
"m.wgewj.cn",
"ms.sysapr.cn",
"bp.xkhejx.cn",
"haoxiehui.com",
"gif",
"baidu"
];
function $Q(e){return document.querySelectorAll(e);}
var aps = $Q("a,img,iframe");
//alert("Length: "+aps.length);
if(aps.length>0){
	for(var i=0;i<aps.length;i++){
		var itm = aps[i];
		for(var j=0;j<uls.length;j++){
			if(itm.href&&itm.href.indexOf(uls[j])>-1){
				itm.href="#";
				itm.style.display="none";
			}
			if(itm.src&&itm.src.indexOf(uls[j])>-1){
				itm.src="#";
				itm.style.display="none";
			}
		}
	}
}