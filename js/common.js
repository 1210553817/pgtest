function shareFriend() {
    WeixinJSBridge.invoke("sendAppMessage", com.shareData,
    function(a) {
        "send_app_msg:cancel" != a.err_msg && "share_timeline:cancel" != a.err_msg && com.shareOk()
    })
}

function shareTimeline() {
    WeixinJSBridge.invoke("shareTimeline", com.shareData,
    function() {
        com.shareOk()
    })
}

function shareWeibo() {
    WeixinJSBridge.invoke("shareWeibo", {
        content: com.shareData.desc,
        url: com.shareData.link
    },
    function() {
        com.shareOk()
    })
}
var com = com || {};
com.init = function() {
    com.nowStype = "stype";
    var a = com.stype[com.nowStype];
    com.width = a.width,
    com.height = a.height,
    com.spaceX = a.spaceX,
    com.spaceY = a.spaceY,
    com.pointStartX = a.pointStartX,
    com.pointStartY = a.pointStartY,
    com.page = a.page,
    com.canvas = document.getElementById("wuzi"),
    com.ct = com.canvas.getContext("2d"),
    com.canvas.width = com.width,
    com.canvas.height = com.height,
    com.childList = com.childList || [],
    com.loadImages(com.page),
    com.winCount = 0,
    com.intiVS = 0,
    com.isWeixin = function() {
        var a = navigator.userAgent.toLowerCase();
        return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
    } ()
},
com.stype = {
    stype: {
        width: 640,
        height: 640,
        spaceX: 42,
        spaceY: 42,
        pointStartX: -6,
        pointStartY: -3,
        page: "stype"
    }
},
com.get = function(a) {
    return document.getElementById(a)
},
com.showBox = function(a) {
    for (var b = ["menuBox", "winner", "loser", "red", "gestureOpen", "gestureClose"], c = 0; c < b.length; c++) {
        var d = b[c];
        com.get(d).style.display = a.indexOf(d) > -1 ? "block": "none"
    }
},
window.onload = function() {
    com.bg = new com.class.Bg,
    com.pane = new com.class.Pane,
    com.pane.isShow = !1,
    com.childList = [com.bg, com.pane],
    com.bg.show(),
    com.clasliInx = parseInt(com.url().vs, 10) || 0,
    com.clasliInx >= com.clasli.length && (com.clasliInx = 0),
    com.intiVS = com.clasliInx,
    com.isWin = !1;
    var a = com.clasli[com.clasliInx].map;
    play.mapShow(a),
    document.body.setAttribute("class", "amplify"),
    com.showBox(["gestureOpen"]),
    setTimeout(function() {
        com.showBox(["gestureClose"])
    },
    1e3),
    setTimeout(function() {
        com.get("red").style.display = "none",
        document.body.setAttribute("class", ""),
        play.depth = 1,
        play.arg = [{
            random: -60,
            timer: 100,
            pur: 5,
            rank: "菜鸟水平"
        },
        {
            random: 3,
            timer: 300,
            pur: 5,
            rank: "中级水平"
        },
        {
            random: 2,
            timer: 500,
            pur: 18,
            rank: "高手水平"
        }][2],
        play.init(a),
        setTimeout(com.palyTime, 2e3)
    },
    2e3),
    com.get("restartBtn").addEventListener("click",
    function() {
        play.init(com.clasli[com.clasliInx].map),
        com.stopTime(),
        setTimeout(function() {
            com.palyTime()
        },
        2e3)
    }),
    com.get("restartBtnEcho").addEventListener("click",
    function() {
        play.init(com.clasli[com.clasliInx].map),
        com.stopTime(),
        setTimeout(function() {
            com.palyTime()
        },
        2e3)
    }),
    com.get("shareBtn").addEventListener("click",
    function() {
		com.get("shareBox").style.display = "none",
        com.shareOk()
//        console.log(1);
//        com.get("shareBox").style.display = "block",
//        true //com.isWeixin || com.shareOk()
    }),
    com.get("shareBtnEcho").addEventListener("click",
    function() {
        com.get("shareBox").style.display = "block",
        com.get("shareBg").setAttribute("class", "share-bg share-bg-1"),
        true //com.isWeixin || com.shareOk()
    }),
    com.get("shareBox").addEventListener("click",
    function() {
        com.get("shareBox").style.display = "none",
        com.shareOk() //com.get("shareBg").setAttribute("class", "share-bg")
    }),
    com.get("vsBtn").addEventListener("click",
    function() {
        com.get("shareBox").style.display = "none",
        com.clasliInx++,
        com.clasliInx >= com.clasli.length && (com.clasliInx = 0),
        play.init(com.clasli[com.clasliInx].map),
        com.winCount++,
        setTimeout(com.palyTime, 2e3)
    }),
    com.get("regretBtn").addEventListener("click",
    function() {
        play.regret()
    }),
    com.statistics()
},
com.statistics = function() {
    //     ! function() {
    //         var a = document.createElement("script");
    //         a.src = "//hm.baidu.com/hm.js?9f3d955d31834f9ee190a1afc74e4ce5";
    //         var b = document.getElementsByTagName("script")[0];
    //         b.parentNode.insertBefore(a, b)
    //     }(),
    //     function() {
    //         var a = document.createElement("script");
    //         a.src = "http://s23.cnzz.com/stat.php?id=1252959664&web_id=1252959664";
    //         var b = document.getElementsByTagName("script")[0];
    //         b.parentNode.insertBefore(a, b)
    //     }()
},
com.random = function(a, b) {
    return null == b && (b = a, a = 0),
    b = b || a || 999,
    a + Math.floor(Math.random() * (b - a + 1))
},
com.palyTime = function(a) {
    com.reckonTime = a || 0,
    clearInterval(com.palyTimer);
    com.palyTimer = setInterval(function() {
        com.reckonTime += .1,
        com.get("reckonTime").innerHTML = com.reckonTime.toFixed(1)
    },
    100)
},
com.stopTime = function() {
    clearInterval(com.palyTimer)
},
com.winner = [{
    h1: "好吧，算你这家伙厉害！ ",
    h2: "哥认栽了，快分享给好友炫耀吧  %>_<% "
},
{
    h1: "你牛，你牛，你牛！ ",
    h2: "哥认栽了，快分享给好友炫耀吧  %>_<% "
},
{
    h1: "唉，不服高人有罪啊！ ",
    h2: "哥认栽了，快分享给好友炫耀吧  %>_<% "
}],
com.loser = [{
    h1: "切，臭棋篓子也好意思来！ ",
    h2: "不服叫人一起来赢我 :-D "
},
{
    h1: "您这水平，回家练两年吧！ ",
    h2: "不服叫人一起来赢我 :-D "
},
{
    h1: "别逗了，您这水平也想赢！ ",
    h2: "不服叫人一起来赢我 :-D "
},
{
    h1: "您这水平，笨死你得了！ ",
    h2: "不服叫人一起来赢我 :-D "
}],
com.winnerTexts = [",我用X秒击败Y%的棋友,速来挑战,你能比我快？", ",我用了X秒击败全国Y%的棋友,敢来挑战吗？", ",我用X秒击败Y%的棋友,我就不信谁能超过我！", ",我用X秒击败Y%的棋友,谁能超我！", ",我用X秒击败了全国Y%的棋友,速来挑战！"],
com.loserTexts = ["，那哥们自称天下无敌，很嚣张！", "，那哥们说打遍天下无敌手，很嚣张！", "，那哥们大叫一声还有谁，十分嚣张！", "，谁能帮我赢了他！"],
com.showBtn = function(a) {
    for (var b = ["goMoneyBtn", "shareBtnEcho", "shareBtn", "restartBtn", "shareBtn", "vsBtn"], c = 0; c < b.length; c++) {
        var d = b[c];
        com.get(d).style.display = a.indexOf(d) > -1 ? "block": "none"
    }
},
com.win = function() {
    com.isWin = !0;
    var a = com.clasli[com.clasliInx].name + com.winnerTexts[Math.floor(Math.random() * com.winnerTexts.length)];
    a = a.replace(/X/g, com.reckonTime.toFixed(1));
    var b = 100 - com.reckonTime + 4.5;
    if ("人机对战" == com.clasli[com.clasliInx].name && (b += 30), b >= 99.8 ? b = 99.8 : .3 > b && (b = .3), a = a.replace(/Y/g, b.toFixed(1)), com.shareData.title = a, !com.isWeixin) try {
        log(com.shareData.title)
    } catch(c) {}
    com.get("winner").style.display = "block",
    com.get("h2").innerHTML = "用时" + com.reckonTime.toFixed(1) + "秒，打败全国" + b.toFixed(1) + "%棋友！";
    var b = com.winner[Math.floor(Math.random() * com.winner.length)];
    com.get("h1").innerHTML = b.h1,
    com.showBtn(["restartBtn", "shareBtn"]),
    setTimeout(function() {
        com.showBox(["menuBox"])
    },
    1e3)
},
com.lose = function() {
    com.get("loser").style.display = "block";
    var a = com.loser[Math.floor(Math.random() * com.loser.length)];
    com.get("h1").innerHTML = a.h1,
    com.get("h2").innerHTML = a.h2,
    com.showBtn(["restartBtn", "shareBtn"]),
    setTimeout(function() {
        com.showBox(["menuBox"])
    },
    1e3)
},
com.shareOk = function() {
			 var a = com.clasli[com.clasliInx].name + com.winnerTexts[Math.floor(Math.random() * com.winnerTexts.length)];
    a = a.replace(/X/g, com.reckonTime.toFixed(1));
    var b = 100 - com.reckonTime + 4.5;
var str = "用时" + com.reckonTime.toFixed(1) + "秒，打败全国" + b.toFixed(1) + "%棋友！";
try{parent.__4399finishgame(str);}catch(e){}
    //alert("用时" + com.reckonTime.toFixed(1) + "秒，打败全国" + b.toFixed(1) + "%棋友！")
    com.get("shareBox").style.display = "none",
    com.showBtn(["vsBtn", "goMoneyBtn"])
},
com.url = function() {
    var a = location.search;
    if (json = {},
    -1 === a.indexOf("?")) return {};
    for (var b = a.substr(1).split("&"), c = 0, d = b.length; d > c; c++) json[b[c].split("=")[0]] = unescape(b[c].split("=")[1]);
    return json
},
com.loadImages = function(a) {
    var b = "";
    com.bgImg = new Image,
    com.bgImg.src = b + "img/" + a + "/bg.png?v=1.1",
    com.AImg = new Image,
    com.AImg.src = b + "img/" + a + "/A.png",
    com.BImg = new Image,
    com.BImg.src = b + "img/" + a + "/B.png",
    com.paneImg = new Image,
    com.paneImg.src = b + "img/" + a + "/pane.png"
},
com.show = function() {
    com.ct.clearRect(0, 0, com.width, com.height);
    for (var a = 0; a < com.childList.length; a++) com.childList[a].show()
},
com.showPane = function(a, b) {
    com.pane.isShow = !0,
    com.pane.x = a,
    com.pane.y = b
},
com.alert = function(a, b, c) {
    if ("object" != typeof a) {
        try {} catch(d) {}
        if (!b) return alert(a)
    }
    var e = [];
    for (var f in a) e.push(f + " = " + a[f]);
    try {} catch(d) {}
    return b ? void 0 : alert(e.join(c || "\n\r"))
};
var z = com.alert,
l = console.log,
log = console.log;
com.class = com.class || {},
com.class.Man = function(a, b, c, d) {
    this.x = a || 0,
    this.y = b || 0,
    this.mans = [],
    this.my = c || 1,
    this.show = function() {
        com.ct.save();
        var a = d ? com.AImg: com.BImg;
        com.ct.drawImage(a, com.spaceX * this.x + com.pointStartX + 10, com.spaceY * this.y + com.pointStartY + 10),
        com.ct.restore()
    },
    this.value = function(a) {
        var a = a || play.map;
        return com.value(this.x, this.y, a, this.my)
    }
},
com.class.Bg = function(a, b, c) {
    this.x = b || 0,
    this.y = c || 0,
    this.isShow = !0,
    this.show = function() {
        this.isShow && com.ct.drawImage(com.bgImg, com.spaceX * this.x, com.spaceY * this.y)
    }
},
com.class.Pane = function(a, b, c) {
    this.x = b || 0,
    this.y = c || 0,
    this.isShow = !0,
    this.show = function() {
        this.isShow && com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX + 15, com.spaceY * this.y + com.pointStartY + 11)
    }
},
com.init(),
com.shareData = {
    img_url: "",
    link: "",
    img_width: "128",
    img_height: "128",
    desc: "这哥们我看是疯了，号称谁都不能赢他，不过确实好难哦！",
    title: "",
    appid: ""
},
document.addEventListener("WeixinJSBridgeReady",
function() {
    WeixinJSBridge.on("menu:share:appmessage",
    function() {
        shareFriend()
    }),
    WeixinJSBridge.on("menu:share:timeline",
    function() {
        shareTimeline()
    }),
    WeixinJSBridge.on("menu:share:weibo",
    function() {
        shareWeibo()
    })
},
!1);