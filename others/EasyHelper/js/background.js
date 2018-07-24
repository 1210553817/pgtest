//监听所有请求
$PageReqs="";
$reqIndex=0;
chrome.webRequest.onBeforeRequest.addListener (
 
    function(dtl) {
        // $PageReqs+="\n"+"";
        // panelCaseA({ title: '文件下载', content:$PageReqs, btn1:"开始", btn2: "取消",
        //     fun1: function(mbdy){
        //     }
        // });
        //$reqIndex++;
        //document.write("<div style=\"display:block;position:fixed;left:0px;top:0px;width:700px;height:200px;\"">"+dtl.url+"</div>");
        //tipCase({msg:"请输入url,通配符,如:[1-23#2]"});
        //console.log(dtl);
        //alert(dtl.url);
        $PageReqs+=dtl.url+"\n"
    },
    {urls:["*://*/*"]},  //监听页面请求,你也可以通过*来匹配。
    ["blocking"] 
);

function getPageReqs(){
    return $PageReqs;
}
