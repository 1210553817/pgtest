function $Q(e){return document.querySelectorAll(e);}
var aps = $Q("div,a,img,iframe");
//alert("Length: "+aps.length);
if(aps.length>0){
	for(var i=0;i<aps.length;i++){
		var itm = aps[i];
		var ptm = itm.parentNode;
		if(itm.href&&itm.href.indexOf("gif")>-1){
			itm.style.display="none";
			if("span"==ptm.tagName)itm.parentNode.style.display="none";
			continue;
		}
		if(itm.src&&itm.src.indexOf("gif")>-1){
			itm.style.display="none";
			if("span"==ptm.tagName)itm.parentNode.style.display="none";
			continue;
		}
		var atr=window.getComputedStyle(itm);
		if(atr.backgroundImage&&atr.backgroundImage.indexOf("gif")>-1){
			itm.style.display="none";
			if("span"==ptm.tagName){
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
	}
}