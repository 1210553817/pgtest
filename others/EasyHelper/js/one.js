window.onload=function(){
	$BG = chrome.extension.getBackgroundPage();
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
			}
		}
	}
}
function initEvents(){

	_$G("tabc_btn3").onclick=function(){
		$BG.clearPageReqs();
	};
	_$G("tabc_btn4").onclick=function(){
		var txtarea = _$G("defpop_txts");
		txtarea.value=$BG.getPageReqs();
	};

}
function initDatas(){

}