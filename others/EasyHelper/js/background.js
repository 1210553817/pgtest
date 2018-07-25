$PageReqs="";
chrome.webRequest.onBeforeRequest.addListener (
    function(dtl) {
        $PageReqs+="\n----------"+dtl.type+"----------\n"+dtl.url+"\n";
    },
    {urls:["*://*/*"]},
    ["blocking"] 
);

function clearPageReqs(){
    $PageReqs="";
}
function getPageReqs(){
    return $PageReqs;
}
