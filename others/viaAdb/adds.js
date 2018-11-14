var uls=[
"srdoudizhu",
"haizirv",
"haofengsuye",
"lkflw.com",
"bxlsl.com",
"xyxy3638",
"wanmancn.com",
"hmcvs.cn",
"4r3z2ahp8.com",
"umm6.cn",
"hzblic.com",
"lwinl.com",
"wx2.sinaimg.cn",
"wangketuan.com",
"xyxy8862.com",
"ysyspb.com",
"jdcbuy.com",
"cnzz.com",
"maziyou.com",
"51laiduobao.com",
"myhaohaizi.com",
"qcwzx.net",
"jianduankm.com",
"lovelala.cn",
"muduli.cn",
"qhuade.com",
"ntjacb.com",
"lanhouhou.cn",
"feipukeplus.com",
"hsq3z.com",
"huanqiucaizhi.com",
"hnhgw.cn",
"sufficient.cn",
"jscsd.cn",
"wgewj.cn",
"sysapr.cn",
"xkhejx.cn",
"haoxiehui.com",
"8000zq.com",
"afp.alicdn.com",
"s1.uplusbrand.com",
"img.yuyue007.cn",
"img.wsf-gz.cn",
"img.cdxzx-tech.com",
"okfg.lotuslandstory.com",
"wywl.gangaotongbaozheng.com",
"kiss.blockplus.cc",
"dfh3.mengmob.com",
"mob.xdzlaser.com",
"hbb123.top",
"wap.baidu.com.pwrt.pw",
"dx.juseyx.com",
"mob.weiceton.com",
"dz2017.shnhnjn.com",
"kuxuan.pw",
"urI6.com",
"mobile.2008612.com",
"dema1905.top",
"clc.wanmancn.com",
"usaos.guangyaoli.cn",
"apple.com"
];
var hostName = window.location.host;
function $Q(e){return document.querySelectorAll(e);}
function doFilter(){
	var aps = $Q("div,a,img,iframe,script");
	if(aps.length>0){
		for(var i=0;i<aps.length;i++){
			var itm = aps[i];
			var ptm = itm.parentNode;
			var dsrc = itm.getAttribute("data-src");
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
				if(dsrc){
					itm.setAttribute("data-src","0");
					itm.style.display="none";
					parentHide(itm,ptm);
					break;
				}
				var atr=window.getComputedStyle(itm);
				if(atr.backgroundImage&&atr.backgroundImage.indexOf(itn)>-1){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.style.display="none";
					parentHide(itm,ptm);
					break;
				}
			}
		}
	}
}
function parentHide(itm,ptm){
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
}
if(hostName.indexOf("9zdm")>-1||hostName.indexOf("74zu")>-1||hostName.indexOf("babayu")>-1||hostName.indexOf("micaitu")>-1||hostName.indexOf("88k")>-1||hostName.indexOf("40yb")>-1||hostName.indexOf("97kp")>-1)doFilter();