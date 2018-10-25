function $Q(e){return document.querySelectorAll(e);}
var aps = $Q("a,img,iframe");
alert("Length: "+aps.length);
if(aps.length>0){
	for(var i=0;i<aps.length;i++){
		var itm = aps[i];
		if(itm.href&&itm.href.indexOf("gif")>-1){
			itm.style.display="none";
			continue;
		}
		if(itm.src&&itm.src.indexOf("gif")>-1){
			itm.style.display="none";
		}
	}
}