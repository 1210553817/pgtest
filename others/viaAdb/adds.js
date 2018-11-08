var uls=[
"www.bxlsl.com",
"d.xyxy3638.com",
"wc.wanmancn.com",
"haole.hmcvs.cn",
"li3.4r3z2ahp8.com",
"u.umm6.cn",
"i.hzblic.com",
"a.lwinl.com",
"wx2.sinaimg.cn",
"c.hzblic.com",
"imgs.wangketuan.com",
"m.xyxy8862.com",
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
"zs0308.jn-haoxiehui.com",
"zs0309.jn-haoxiehui.com",
"s1.tj-haoxiehui.com",
"up.lwinl.com",
"tx.lwinl.com",
"mobile.8000zq.com",
"afp.alicdn.com",
"s1.uplusbrand.com",
"img.yuyue007.cn",
"img.wsf-gz.cn",
"img.cdxzx-tech.com",
"okfg.lotuslandstory.com",
"wywl.gangaotongbaozheng.com",
"kiss.blockplus.cc",
"dfh3.mengmob.com",
"one85.lanhouhou.cn",
"mob.xdzlaser.com",
"hbb123.top",
"wap.baidu.com.pwrt.pw",
"dx.juseyx.com",
"mob.weiceton.com",
"dz2017.shnhnjn.com",
"ce32.kuxuan.pw",
"urI6.com",
"ce37.kuxuan.pw",
"mobile.2008612.com",
"dema1905.top",
"clc.wanmancn.com",
"usaos.guangyaoli.cn",
"itunes.apple.com"
];
var hostName = window.location.host;
function $Q(e){return document.querySelectorAll(e);}
function doFilter(){
	var aps = $Q("div,a,img,iframe");
	if(aps.length>0){
		for(var i=0;i<aps.length;i++){
			var itm = aps[i];
			var ptm = itm.parentNode;
			for(var j=0;j<uls.length;j++){
				var itn =  uls[j];
				if(itm.href&&itm.href.indexOf(itn)>-1){
					itm.href=" ";
					itm.style.display="none";
					break;
				}
				if(itm.src&&itm.src.indexOf(itn)>-1){
					itm.src=" ";
					itm.style.display="none";
					break;
				}
				var atr=window.getComputedStyle(itm);
				if(atr.backgroundImage&&atr.backgroundImage.indexOf(itn)>-1){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.style.display="none";
					if((hostName.indexOf("40yb")>-1||hostName.indexOf("97kp")>-1)&&"body"!=ptm.tagName){
						itm.parentNode.style.display="none";
						var chs=ptm.childNodes;
						if(chs){
							for(var i=0;i<chs.length;i++){
								var chtm=chs[i];
								chtm.style.display="none";
							}
						}
					}
					break;
				}
			}
		}
	}
}
if(hostName.indexOf("9zdm")>-1||hostName.indexOf("74zu")>-1||hostName.indexOf("babayu")>-1||hostName.indexOf("micaitu")>-1||hostName.indexOf("88k")>-1||hostName.indexOf("40yb")>-1||hostName.indexOf("97kp")>-1)doFilter();