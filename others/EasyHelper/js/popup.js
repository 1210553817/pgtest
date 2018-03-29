window.onload=function(){
	initTabs();
	var tmpbtn = _$G("defpop_getBkmks");
	tmpbtn.onclick=function(){
		//var bg = chrome.extension.getBackgroundPage();
		//bg.testAlert();
		testPanel();
		//opnTbox("测试一下啊",1500,function(){console.log(1111111111111111);});
	};
	
};
function initTabs(){
	var mtabs = _$P(".mtabb");
	for(var i=0;i<mtabs.length;i++){
		var itm = mtabs[i];
		itm.onclick=function(){
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
function testPanel(){

	var ctt = ['<div style="display:inline-block;width:50px;">文件夹:</div></div><input id="beforeDownName" type="text" value="','name','" style="width:80px;"/>&nbsp;&nbsp;',
		'<div style="display:inline-block;width:50px;">序号:</div><input id="beforeDownIndx" type="text" value="','NO.','" style="width:80px;"/><br/><br/>',
		'<div style="display:inline-block;width:50px;">去头数:</div><input id="beforeDownStart" type="text" value="','Header','" style="width:80px;"/>&nbsp;&nbsp;',
		'<div style="display:inline-block;width:50px;">去尾数:</div><input id="beforeDownEnd" type="text" value="','Tail','" style="width:80px;"/>'].join("");
		
	opnCfmBoxA({ title: '文件下载111', content:ctt, btn1:"开始1", btn2: "取消1",
		fun1: function(mbdy){
		
			opnCfmBoxA({ code:1, title: '文件下载222', content:ctt, btn1:"开始2", btn2: "取消2",
				fun1: function(mbdy){
					alert("呵呵！");
				}
			});
			
		}
	});
}
