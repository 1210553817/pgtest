window.onload=function(){
	initTabs();
	var tmpbtn = _$G("defpop_getBkmks");
	tmpbtn.onclick=function(){
		//var bg = chrome.extension.getBackgroundPage();
		//bg.testAlert();
		testPanel();
		//opnTbox("����һ�°�",1500,function(){console.log(1111111111111111);});
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

	var ctt = ['<div style="display:inline-block;width:50px;">�ļ���:</div></div><input id="beforeDownName" type="text" value="','name','" style="width:80px;"/>&nbsp;&nbsp;',
		'<div style="display:inline-block;width:50px;">���:</div><input id="beforeDownIndx" type="text" value="','NO.','" style="width:80px;"/><br/><br/>',
		'<div style="display:inline-block;width:50px;">ȥͷ��:</div><input id="beforeDownStart" type="text" value="','Header','" style="width:80px;"/>&nbsp;&nbsp;',
		'<div style="display:inline-block;width:50px;">ȥβ��:</div><input id="beforeDownEnd" type="text" value="','Tail','" style="width:80px;"/>'].join("");
		
	opnCfmBoxA({ title: '�ļ�����111', content:ctt, btn1:"��ʼ1", btn2: "ȡ��1",
		fun1: function(mbdy){
		
			opnCfmBoxA({ code:1, title: '�ļ�����222', content:ctt, btn1:"��ʼ2", btn2: "ȡ��2",
				fun1: function(mbdy){
					alert("�Ǻǣ�");
				}
			});
			
		}
	});
}
