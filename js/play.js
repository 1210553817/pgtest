﻿var play = play || {};
play.init = function(a) {
    play.my = 1, play.nowManKey = !1, play.pace = [], play.isPlay = !0, play.bylaw = com.bylaw, play.show = com.show, play.showPane = com.showPane, play.isOffensive = !0, play.depth = play.depth || 2, play.random = play.random || 2, play.isOffense = play.isOffense || !0, play.regretCount = 3, play.isFoul = !1, com.pane.isShow = !1, com.childList.length = 2, com.isWin = !1, com.showBox(["red"]), setTimeout(function() {
        com.showBox([])
    }, 2e3), com.shareData.title = com.clasli[com.clasliInx].loser + com.loserTexts[Math.floor(Math.random() * com.loserTexts.length)];
    //for (var b = 1; 500 > b; b++) {
    //    var c = ["wuzi", "wxwzyi", "wxgame", "wdwxwzq", "wxwzqyi", "daboluoyi", "haokuna", "wsdyx", "nsfewssyi", "ffddctyyi", "lllztyer", "wyyger", "wyygerer", "glwdyxer", "wyqdler"],
    //        d = c[com.random(c.length - 1)] + com.random(50),
    //        e = com.random(1) ? "http://" + d + ".qiniudn.com/" : "http://dn-" + d + ".qbox.me";
    //com.shareData.link = getRandomURL() + "?target=/wuziqi/index.html";
	 com.shareData.link = "./";
    //}
    if (com.shareData.img_url = "./" + (com.clasli[com.clasliInx].ico || "icon.png"), !com.isWeixin) try {
        log(com.shareData.link), log(com.shareData.title), log(com.shareData.img_url)
    } catch (f) {}
    play.map = function(a) {
        for (var b = [], c = 0; 15 > c; c++)
            for (var d = 0; 15 > d; d++) {
                var e = a[d][c];
                if (b[d] || (b[d] = []), b[d][c] = e || 0, e) {
                    var f = -1 == e ? 0 : e;
                    play.makeMan(c, d, e, f)
                }
            }
        return b
    }(a), play.show(), com.canvas.addEventListener("click", play.clickCanvas), com.get("regretBtn").innerHTML = "悔   棋(" + play.regretCount + ")", com.get("regretBtn").style.opacity = 1
}, play.mapShow = function(a) {
    for (var b = 0; 15 > b; b++)
        for (var c = 0; 15 > c; c++) {
            var d = a[c][b];
            if (d) {
                var e = -1 == d ? 0 : d;
                play.makeMan(b, c, d, e)
            }
        }
    com.show()
}, play.regret = function() {
    if (!play.regretCount || play.pace.length <= 0 || !play.isPlay) return !1;
    if (play.pace.length <= 2) return !play.init(com.clasli[com.clasliInx].map);
    var a = play.pace.pop();
    com.childList.pop(), play.map[a[1]][a[0]] = 0, a = play.pace.pop(), com.childList.pop(), play.map[a[1]][a[0]] = 0, a = play.pace[play.pace.length - 1], com.showPane(a[0], a[1]), com.show(), play.regretCount--, 0 === play.regretCount && (com.get("regretBtn").style.opacity = .5), com.get("regretBtn").innerHTML = "悔   棋(" + play.regretCount + ")"
}, play.makeMan = function(a, b, c, d) {
    var e = new com.class.Man(a, b, c, d);
    com.childList.push(e)
}, play.clickPoint = function(a, b) {
    play.map[b][a] = play.my, play.pace.push([a, b]);
    var c = -1 == play.my && !play.isOffense || 1 == play.my && play.isOffense,
        d = new com.class.Man(a, b, play.my, c);
    return com.childList.push(d), com.show(), play.isWin(a, b) ? (play.showWin(play.my), !1) : !0
}, play.clickCanvas = function(a) {
    if (!play.isPlay) return !1;
    var b = play.getClickPoint(a),
        c = b.x,
        d = b.y;
    if (com.get("clickAudio").play(), !play.map[d][c]) {
        var e = play.clickPoint(c, d);
        e && setTimeout(function() {
            play.AIPlay(c, d)
        }, 100)
    }
}, play.AIPlay = function(a, b, c) {
    play.isPlay = !1, play.my = -1;
    var c = c || AI(play.map, play.depth, play.my, a, b, play.arg);
    com.showPane(c.x, c.y), setTimeout(function() {
        com.get("selectAudio").play();
        var a = play.clickPoint(c.x, c.y);
        a && (play.isPlay = !0, play.my = 1)
    }, play.arg.timer)
}, play.getClickPoint = function(a) {
    var b = play.getDomXY(com.canvas),
        c = Math.round((a.pageX - b.x - com.pointStartX - 30) / com.spaceX),
        d = Math.round((a.pageY - b.y - com.pointStartY - 30) / com.spaceY);
    return c > 14 && (c = 14), d > 14 && (d = 14), 0 > c && (c = 0), 0 > d && (d = 0), {
        x: c,
        y: d
    }
}, play.getDomXY = function(a) {
    for (var b = a.offsetLeft, c = a.offsetTop, d = a.offsetParent; null !== d;) b += d.offsetLeft, c += d.offsetTop, d = d.offsetParent;
    return {
        x: b,
        y: c
    }
}, play.isWin = function(a, b) {
    function c(a) {
        for (var b = 0, c = 0, d = a.length; d > c; c++)
            if (a[c] === play.my) {
                if (b++, 5 == b) return !0
            } else b = 0;
        return !1
    }
    var d = play.map,
        e = 0,
        f = d[b];
    if (c(f, e)) return !0;
    for (var f = [], g = 0; g < d.length; g++) f.push(d[g][a]);
    if (c(f, e)) return !0;
    for (var f = [], g = 0; g < d.length; g++) {
        var h = d[g][a + (b - g)];
        void 0 !== h && f.push(h)
    }
    if (c(f, e)) return !0;
    for (var f = [], g = 0; g < d.length; g++) {
        var h = d[g][a - (b - g)];
        void 0 !== h && f.push(h)
    }
    return c(f, e) ? !0 : !1
}, play.showWin = function(a) {
    play.isPlay = !1, com.stopTime(), setTimeout(function() {
        1 === a ? setTimeout(com.win, 1e3) : setTimeout(com.lose, 1e3)
    }, 300)
};
