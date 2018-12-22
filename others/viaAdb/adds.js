var uls=[
"mglvqian",
"hm.baidu",
"qdhhsnz",
"zpgjz",
"lsdys",
"fccxp",
"youle55",
"dsgy521",
"youhuomeishi",
"ynjk",
"data:",
"base64",
"hbwcl",
"heygugu",
"818tu",
"how5",
"configx",
"webofxm",
"srdoudizhu",
"haizirv",
"haofengsuye",
"lkflw",
"bxlsl",
"wanmancn",
"hmcvs.cn",
"4r3z2ahp8",
"umm6.cn",
"hzblic",
"lwinl",
"wangketuan",
"xyxy",
"ysyspb",
"jdcbuy",
"cnzz.com",
"maziyou",
"laiduobao",
"haohaizi",
"qcwzx",
"jianduankm",
"lovelala",
"muduli",
"qhuade",
"ntjacb",
"lanhouhou",
"feipukeplus",
"hsq3z.com",
"huanqiucaizhi",
"hnhgw.cn",
"sufficient.cn",
"jscsd",
"wgewj",
"sysapr",
"xkhejx",
"haoxiehui",
"8000zq",
"afp.alicdn.com",
"uplusbrand",
"yuyue",
"wsf-gz",
"cdxzx-tech",
"lotusland",
"gangaotong",
"blockplus.cc",
"mengmob",
"xdzlaser",
"hbb123",
"pwrt.pw",
"juseyx",
"weiceton",
"shnhnjn",
"kuxuan.pw",
"urI6.com",
"2008612.com",
"dema1905",
"wanmancn",
"guangyaoli",
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
			var original = itm.getAttribute("original");
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
					break;
				}
				if(original){
					itm.setAttribute("original","0");
					itm.style.display="none";
					break;
				}
				var atr=window.getComputedStyle(itm);
				if(atr.backgroundImage&&atr.backgroundImage.indexOf(itn)>-1){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.style.display="none";
					parentHide(itm,ptm);
					break;
				}
				var tsfm0=atr["transform"];
				if(tsfm0&&(tsfm0.indexOf("matrix")>-1||tsfm0.indexOf("rotate")>-1)){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.src=" ";
					itm.style.display="none";
					parentHide(itm,ptm);
					break;
				}
				var tsfm1=atr["-webkit-transform"];
				if(tsfm1&&(tsfm1.indexOf("matrix")>-1||tsfm1.indexOf("rotate")>-1)){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.src=" ";
					itm.style.display="none";
					parentHide(itm,ptm);
					break;
				}
				var tsfm2=atr["animation"];
				if(tsfm2){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.src=" ";
					itm.style.display="none";
					parentHide(itm,ptm);
					break;
				}
				var tsfm3=atr["-webkit-animation"];
				if(tsfm3){
					itm.style.backgroundImage="url(./null.jpg)";
					itm.src=" ";
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
if(hostName.indexOf("tv6")>-1||hostName.indexOf("9zdm")>-1||hostName.indexOf("74zu")>-1||hostName.indexOf("babayu")>-1||hostName.indexOf("micaitu")>-1||hostName.indexOf("88k")>-1||hostName.indexOf("40yb")>-1||hostName.indexOf("97kp")>-1)doFilter();