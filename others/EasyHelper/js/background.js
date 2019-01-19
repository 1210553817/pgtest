﻿$PageReqs="";
function onBeforeSendRequest(dtl){
	$PageReqs+="\n----------"+dtl.type+"----------\n"+dtl.url+"\n";
	
	/**
	if(dtl.url.indexOf("qq.com")>-1){
		return {cancel: true};
	}
	*/
}

function clearPageReqs(){
    $PageReqs="";
}
function getPageReqs(){
    return $PageReqs;
}
function enableNetFlag(){
    chrome.webRequest.onBeforeRequest.addListener(
		onBeforeSendRequest,
		{urls:["*://*/*"]},
		["blocking"]
	);
}
function disableNetFlag(){
     chrome.webRequest.onBeforeRequest.removeListener(onBeforeSendRequest);
}

/**flvcd parse**/
function onPageMenu(info, tab) {
      var a = encodeURIComponent(info.pageUrl);
      b='http://www.flvcd.com/parse.php?kw='+a;
      chrome.tabs.create({ url: b });
}
function onLinkMenu(info, tab) {
      var a = encodeURIComponent(info.linkUrl);
      b='http://www.flvcd.com/parse.php?kw='+a;
      chrome.tabs.create({ url: b });
}
var contexts = ["page","selection","link","editable","image","video","audio"];
chrome.contextMenus.create({"title": "FLVCD解析本页", "contexts":[contexts[0]],"onclick": onPageMenu});
chrome.contextMenus.create({"title": "FLVCD解析链接", "contexts":[contexts[2]],"onclick": onLinkMenu});

