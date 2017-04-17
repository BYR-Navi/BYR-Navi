// query-suggest.js

(function() {
    var A = window.baidu || { version: "1-1-0" };
    A.object = A.object || {};
    A.object.extend = function(B, D) {
        for (var C in D) {
            if (D.hasOwnProperty(C)) { B[C] = D[C] } } };
    A.extend = A.object.extend;
    A.dom = A.dom || {};
    A.dom.g = function(B) {
        if ("string" == typeof B || B instanceof String) {
            return document.getElementById(B) } else {
            if (B && (B.nodeName && (B.nodeType == 1 || B.nodeType == 9))) {
                return B } }
        return null };
    A.g = A.G = A.dom.g;
    A.dom.getDocument = function(B) { B = A.dom.g(B);
        return B.nodeType == 9 ? B : B.ownerDocument || B.document };
    A.dom._styleFixer = A.dom._styleFixer || {};
    A.dom._styleFilter = A.dom._styleFilter || [];
    A.dom._styleFilter.filter = function(C, G, E) {
        for (var B = 0, D = A.dom._styleFilter, F; F = D[B]; B++) {
            if (F = F[E]) { G = F(C, G) } }
        return G };
    A.string = A.string || {};
    A.string.toCamelCase = function(B) {
        return String(B).replace(/[-_]\D/g, function(C) {
            return C.charAt(1).toUpperCase() }) };
    A.dom.getStyle = function(F, G) {
        var D = A.dom;
        F = D.g(F);
        G = A.string.toCamelCase(G);
        var B = F.style[G];
        if (B) {
            return B }
        var C = D._styleFixer[G],
            E = F.currentStyle || (A.browser.ie ? F.style : getComputedStyle(F, null));
        B = "object" == typeof C && C.get ? C.get(F, E) : E[C || G];
        if (C = D._styleFilter) { B = C.filter(G, B, "get") }
        return B };
    A.getStyle = A.dom.getStyle;
    A.browser = A.browser || {};
    if (/msie (\d+\.\d)/i.test(navigator.userAgent)) { A.ie = A.browser.ie = parseFloat(RegExp.$1) }
    if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) { A.browser.opera = parseFloat(RegExp.$1) }
    A.browser.isWebkit = /webkit/i.test(navigator.userAgent);
    A.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    A.browser.isStrict = document.compatMode == "CSS1Compat";
    A.dom.getPosition = function(D) {
        var B = A.dom.getDocument(D),
            E = A.browser;
        D = A.dom.g(D);
        var I = E.isGecko > 0 && (B.getBoxObjectFor && (A.dom.getStyle(D, "position") == "absolute" && (D.style.top === "" || D.style.left === ""))),
            J = { left: 0, top: 0 },
            H = E.ie && !E.isStrict ? B.body : B.documentElement;
        if (D == H) {
            return J }
        var C = null,
            F;
        if (D.getBoundingClientRect) { F = D.getBoundingClientRect();
            J.left = Math.floor(F.left) + Math.max(B.documentElement.scrollLeft, B.body.scrollLeft);
            J.top = Math.floor(F.top) + Math.max(B.documentElement.scrollTop, B.body.scrollTop);
            J.left -= B.documentElement.clientLeft;
            J.top -= B.documentElement.clientTop;
            if (E.ie && !E.isStrict) { J.left -= 2;
                J.top -= 2 } } else {
            if (B.getBoxObjectFor && !I) { F = B.getBoxObjectFor(D);
                var G = B.getBoxObjectFor(H);
                J.left = F.screenX - G.screenX;
                J.top = F.screenY - G.screenY } else { C = D;
                do { J.left += C.offsetLeft;
                    J.top += C.offsetTop;
                    if (E.isWebkit > 0 && A.dom.getStyle(C, "position") == "fixed") { J.left += B.body.scrollLeft;
                        J.top += B.body.scrollTop;
                        break }
                    C = C.offsetParent } while (C && C != D);
                if (E.opera > 0 || E.isWebkit > 0 && A.dom.getStyle(D, "position") == "absolute") { J.top -= B.body.offsetTop }
                C = D.offsetParent;
                while (C && C != B.body) { J.left -= C.scrollLeft;
                    if (!b.opera || C.tagName != "TR") { J.top -= C.scrollTop }
                    C = C.offsetParent } } }
        return J };
    A.event = A.event || {};
    A.event._unload = function() {
        var C = A.event._listeners,
            B = C.length,
            D = !(!window.removeEventListener),
            E, F;
        while (B--) { E = C[B];
            F = E[0];
            if (F.removeEventListener) { F.removeEventListener(E[1], E[3], false) } else {
                if (F.detachEvent) { F.detachEvent("on" + E[1], E[3]) } } }
        if (D) { window.removeEventListener("unload", A.event._unload, false) } else { window.detachEvent("onunload", A.event._unload) } };
    if (window.attachEvent) { window.attachEvent("onunload", A.event._unload) } else { window.addEventListener("unload", A.event._unload, false) }
    A.event._listeners = A.event._listeners || [];
    A.event.on = function(F, B, E) { B = B.replace(/^on/i, "");
        if ("string" == typeof F) { F = A.dom.g(F) }
        var C = function(G) { E.call(F, G) },
            D = A.event._listeners;
        D[D.length] = [F, B, E, C];
        if (F.attachEvent) { F.attachEvent("on" + B, C) } else {
            if (F.addEventListener) { F.addEventListener(B, C, false) } }
        return F };
    A.on = A.event.on;
    A.event.preventDefault = function(B) {
        if (B.preventDefault) { B.preventDefault() } else { B.returnValue = false } };
    A.ui = A.ui || {};
    A.suggestion = A.ui.suggestion = A.ui.suggestion || {};
    (function() {
        var B = {},
            C = function(E) {
                var D = {};
                E.listen = function(F, H) { D[F] = D[F] || [];
                    var G = 0;
                    while (G < D[F].length && D[F][G] != H) { G++ }
                    if (G == D[F].length) { D[F].push(H) }
                    return E };
                E.call = function(G) {
                    if (D[G]) {
                        for (var F = 0; F < D[G].length; F++) { D[G][F].apply(this, Array.prototype.slice.call(arguments, 1)) } }
                    return E } };
        B.extend = function(D) { new C(D);
            return D };
        B.extend(B);
        A.suggestion._Central = B })();
    A.ui.suggestion._Div = function(V, o, Z, a, X) {
        var d = this,
            h, T, Y, l, f = X.class_prefix,
            U, S = document.createElement("DIV");
        S.id = f + (new Date()).getTime();
        S.className = f + "wpr";
        S.style.display = "none";
        var c = document.createElement("IFRAME");
        c.className = f + "sd";
        c.style.display = "none";
        c.style.position = "absolute";
        c.style.borderWidth = "0px";
        if (X.apd_body) { document.body.appendChild(S) } else { o.parentNode.appendChild(S) }
        S.parentNode.insertBefore(c, S);
        V.listen("start", function() { A.on(document, "mousedown", function(B) { B = B || window.event;
                var C = B.target || B.srcElement;
                if (C == o) {
                    return }
                while (C = C.parentNode) {
                    if (C == S) {
                        return } }
                W() });
            A.on(window, "blur", W) });
        V.listen("key_enter", function() {
            var B = i(),
                C = B[0] == -1 ? l : B[1];
            X.onconfirm(Z.getValue(), B[0], C, B[2], true);
            W() });

        function m(F, D) {
            if (S.style.display == "none") { V.call("need_data", Z.getValue());
                return }
            var B = i()[0];
            j();
            if (F) {
                if (B == 0) { g(D);
                    B--;
                    return }
                if (B == -1) { B = T.length }
                B-- } else {
                if (B == T.length - 1) { g(D);
                    B = -1;
                    return }
                B++ }
            n(B);
            k();
            var E = Z.getValue();
            g(B);
            var C = i();
            X.onpick(E, C[0], C[1], C[2]) }
        V.listen("key_up", function(B) { m(1, B) });
        V.listen("key_down", function(B) { m(0, B) });
        V.listen("key_tab", W);
        V.listen("key_esc", W);
        V.listen("all_clear", W);
        V.listen("data_ready", function(E, C) { l = C;
            T = [];
            Y = [];
            for (var B = 0, D = C.length; B < D; B++) {
                if (typeof C[B].input != "undefined") { T[B] = C[B].input;
                    Y[B] = C[B].selection } else { Y[B] = T[B] = C[B] } }
            if (T.length != 0) { U = a(S, Y, d);
                for (var B = 0, D = U.length; B < D; B++) { A.on(U[B], "mouseover", function() { j();
                        this.className = f + "mo";
                        k() });
                    A.on(U[B], "mouseout", j);
                    A.on(U[B], "mousedown", function(F) { V.call("mousedown_item");
                        if (!A.ie) { F.stopPropagation();
                            F.preventDefault();
                            return false } });
                    A.on(U[B], "click", e(B)) } } else { W() } });

        function j() {
            for (var B = 0; B < U.length; B++) { U[B].className = f + "ml" } }

        function i() {
            if (U && S.style.display != "none") {
                for (var B = 0; B < U.length; B++) {
                    if (U[B].className == f + "mo") {
                        return [B, T[B], Y[B]] } } }
            return [-1, ""] }

        function k() {
            var B = i();
            X.onhighlight(Z.getValue(), B[0], B[1], B[2]) }

        function n(B) { j();
            U[B].className = f + "mo" }

        function g(C) {
            var B = T && (typeof C == "number" && typeof T[C] != "undefined") ? T[C] : C;
            V.call("pick_word", B) }

        function W() {
            if (S.style.display == "none") {
                return null }
            c.style.display = S.style.display = "none";
            X.onhide() }

        function e(B) {
            var C = B;
            return function() { V.call("confirm_item", Z.getValue(), T[C], C, Y[C]);
                var D = Z.getValue();
                g(T[C]);
                X.onpick(D, C, T[C], Y[C]);
                X.onconfirm(Z.getValue(), C, T[C], Y[C]);
                W() } }
        return { element: S, shade: c, pick: g, highlight: n, hide: W, dispose: function() { S.parentNode.removeChild(S) } } };
    A.ui.suggestion._Data = function(D, B) {
        var C = this,
            E = {};
        D.listen("response_data", function(G, F) { E[G] = F;
            D.call("data_ready", G, F) });
        D.listen("need_data", function(F) {
            if (typeof E[F] == "undefined") { B(F) } else { D.call("data_ready", F, E[F]) } });
        return {} };
    A.ui.suggestion._InputWatcher = function(H, G, E) {
        var F = this,
            K, D = 0,
            L = "",
            C = "",
            J = "",
            M, I = false,
            N = false,
            B = false;
        G.setAttribute("autocomplete", "off");
        A.on(G, "keydown", function(O) {
            if (!B) { H.call("start");
                B = true }
            O = O || window.event;
            var P;
            switch (O.keyCode) {
                case 9:
                    P = "tab";
                    break;
                case 27:
                    P = "esc";
                    break;
                case 13:
                    P = "enter";
                    break;
                case 38:
                    P = "up";
                    A.event.preventDefault(O);
                    break;
                case 40:
                    P = "down" }
            if (P) { H.call("key_" + P, C) } });
        A.on(G, "mousedown", function() {
            if (!B) { H.call("start");
                B = true } });
        A.on(G, "beforedeactivate", function() {
            if (I) { window.event.cancelBubble = true;
                window.event.returnValue = false } });
        H.listen("start", function() { J = G.value;
            D = setInterval(function() {
                if (N) {
                    return }
                if (A.G(G) == null) { suggestion.dispose() }
                var O = G.value;
                if (O == L && (O != "" && (O != J && O != M))) {
                    if (K == 0) { K = setTimeout(function() { H.call("need_data", O) }, 100) } } else { clearTimeout(K);
                    K = 0;
                    if (O == "" && L != "") { M = "";
                        H.call("all_clear") }
                    L = O;
                    if (O != M) { C = O }
                    if (J != G.value) { J = "" } } }, 10) });
        H.listen("pick_word", function(O) {
            if (I) {
                try { G.blur(); } catch (e) { setTimeout(function() { G.blur(); }, 600); } }
            G.value = M = O;
            if (I) { G.focus() } });
        H.listen("mousedown_item", function(O) { I = true;
            N = true;
            setTimeout(function() { N = false;
                I = false }, 500) });
        H.listen("confirm_item", function(R, P, Q, O) { N = false;
            C = L = Q });
        return { getValue: function() {
                return G.value }, dispose: function() { clearInterval(D) } } };
    A.ui.suggestion._Suggestion = function(F, B) {
        var E = this,
            C = A.ui.suggestion._MessageDispatcher;
        E.options = { onpick: function() {}, onconfirm: function() {}, onhighlight: function() {}, onhide: function() {}, view: null, getData: false, prepend_html: "", append_html: "", class_prefix: "tangram_sug_", apd_body: false };
        A.extend(E.options, B);
        if (!(F = A.G(F))) {
            return null }
        E.inputElement = F;
        if (F.id) { E.options._inputId = F.id } else { F.id = E.options._inputId = E.options.class_prefix + "ipt" + (new Date()).getTime() }
        E._adjustPos = function(S) {
            var J = G.element,
                M = G.shade,
                P = document,
                N = P.compatMode == "BackCompat" ? P.body : P.documentElement,
                O = N.clientHeight,
                K = N.clientWidth;
            if (J.style.display == "none" && S) {
                return }
            var Q = A.dom.getPosition(F),
                L = [Q.top + F.offsetHeight - 1, Q.left, F.offsetWidth];
            L = typeof E.options.view == "function" ? E.options.view(L) : L;
            J.style.display = M.style.display = "block";
            M.style.top = L[0] + "px";
            M.style.left = L[1] + "px";
            M.style.width = L[2] + "px";
            var V = parseFloat(A.getStyle(J, "marginTop")) || 0,
                R = parseFloat(A.getStyle(J, "marginLeft")) || 0;
            J.style.top = L[0] - V + "px";
            J.style.left = L[1] - R + "px";
            if (A.ie && document.compatMode == "BackCompat") { J.style.width = L[2] + "px" } else {
                var U = parseFloat(A.getStyle(J, "borderLeftWidth")) || 0,
                    W = parseFloat(A.getStyle(J, "borderRightWidth")) || 0,
                    T = parseFloat(A.getStyle(J, "marginRight")) || 0;
                J.style.width = L[2] - U - W - R - T + "px" }
            M.style.height = J.offsetHeight + "px";
            if (O != N.clientHeight || K != N.clientWidth) { E._adjustPos() } };
        E._draw = function(M, T) {
            var Q = [],
                L = document.createElement("TABLE");
            L.cellPadding = 2;
            L.cellSpacing = 0;
            var R = document.createElement("TBODY");
            L.appendChild(R);
            for (var O = 0, J = T.length; O < J; O++) {
                var S = R.insertRow(-1);
                Q.push(S);
                var K = S.insertCell(-1);
                K.innerHTML = T[O] }
            var P = document.createElement("DIV");
            P.className = E.options.class_prefix + "pre";
            P.innerHTML = E.options.prepend_html;
            var N = document.createElement("DIV");
            N.className = E.options.class_prefix + "app";
            N.innerHTML = E.options.append_html;
            M.innerHTML = "";
            M.appendChild(P);
            M.appendChild(L);
            M.appendChild(N);
            E._adjustPos();
            return Q };
        var H = A.suggestion._Central.extend(E),
            D = new A.ui.suggestion._Data(H, E.options.getData),
            I = new A.ui.suggestion._InputWatcher(H, F, G),
            G = new A.ui.suggestion._Div(H, F, I, E._draw, E.options);
        H.listen("start", function() { setInterval(function() {
                var J = G.element;
                if (J.offsetWidth != 0 && F.offsetWidth != J.offsetWidth) { E._adjustPos() } }, 100);
            A.on(window, "resize", function() { E._adjustPos(true) }) });
        return { pick: G.pick, hide: G.hide, highlight: G.highlight, getElement: function() {
                return G.element }, getData: E.options.getData, giveData: function(K, J) { H.call("response_data", K, J) }, dispose: function() { G.dispose();
                I.dispose() } } };
    A.ui.suggestion.create = function(B, C) {
        return new A.ui.suggestion._Suggestion(B, C) };
    window.baidu = A })();
var BaiduSuggestion = (function() {
    var D = {};
    var E = {};

    function O(P) {
        return document.createElement(P) }
    var J = { createSugOptions: function(S, R, Q, P) {
            return { class_prefix: "bdSug_", onconfirm: function(Y, W, U, V, X) {
                    if (Q && W > -1) {
                        try { Q.apply(window, [U]) } catch (T) {} }
                    if (P && !X) { P.submit() } }, view: function(T) {
                    if (R && R.width) { T[2] = parseInt(R.width) }
                    if (R && R.XOffset && R.YOffset) {
                        return [T[0] - R.YOffset, T[1] - R.XOffset, T[2]] }
                    return [T[0], T[1], T[2]] }, getData: function(U) {
                    var V = (new Date()).getTime();
                    var W = baidu.G("bdSug_script");
                    if (W) { document.body.removeChild(W) }
                    var T = O("script");
                    T.setAttribute("charset", "gbk");
                    T.src = "http://unionsug.baidu.com/su?wd=" + encodeURIComponent(U) + "&p=3&cb=BaiduSuggestion.callbacks.give" + S + "&t=" + V;
                    T.id = "bdSug_script";
                    document.body.appendChild(T) }, append_html: "", apd_body: true } }, createSugCallback: function(P) {
            return function(R) {
                if (!R) {
                    return }
                var S = [];
                for (var T = 0; T < R.s.length; T++) {
                    var Q = {};
                    Q.input = R.s[T];
                    Q.selection = R.s[T];
                    S.push(Q) }
                E["sug" + P].giveData(R.q, S) } } };

    function I(T, Z, S, X) {
        if (!T) {
            return }
        if (typeof(T) == "string" || T instanceof String) { T = baidu.G(T) }
        if (!T.sugId) { T.sugId = (new Date).getTime() }
        if (E["sug" + T.sugId]) {
            return false }
        if (Z == null) {
            var Z = [] } else { X = Z.sugSubmit;
            var Q = Z.fontColor ? Z.fontColor : "#000";
            var W = Z.fontSize ? Z.fontSize : "14px";
            var P = Z.fontFamily ? Z.fontFamily : "verdana";
            var U = Z.bgcolorHI ? Z.bgcolorHI : "#36c";
            var R = Z.fontColorHI ? Z.fontColorHI : "#FFF";
            var Y = Z.borderColor ? Z.borderColor : "#817f82";
            L(".bdSug_wpr", "border:1px solid " + Y + ";position:absolute;z-index:9;top:28px;left:0;color:" + Q);
            L(".bdSug_wpr td", "font-size:" + W + ";font-family:" + P);
            L(".bdSug_mo", "background-color:" + U + ";color:" + R) }
        if (G(document.body, "position") == "relative" || G(document.body, "position") == "absolute") {
            var V = B(document.body);
            Z.XOffset = (Z.XOffset ? parseInt(Z.XOffset) : 0) + V.x;
            Z.YOffset = (Z.YOffset ? parseInt(Z.YOffset) : 0) + V.y }
        E["sug" + T.sugId] = baidu.suggestion.create(T, J.createSugOptions(T.sugId, Z, S, X ? N(T) : null));
        D["give" + T.sugId] = J.createSugCallback(T.sugId) }

    function N(Q) {
        var P = Q;
        while (P != document.body && P.tagName != "FORM") { P = P.parentNode }
        return (P.tagName == "FORM") ? P : null }

    function B(R) {
        var P = document;
        var Q = 0;
        var S = 0;
        if (R.getBoundingClientRect) {
            var T = R.getBoundingClientRect();
            Q = T.left + Math.max(P.documentElement.scrollLeft, P.body.scrollLeft);
            S = T.top + Math.max(P.documentElement.scrollTop, P.body.scrollTop);
            Q -= P.documentElement.clientLeft;
            S -= P.documentElement.clientTop } else {
            while (R = R.offsetParent) { Q += R.offsetLeft;
                S += R.offsetTop } }
        return { x: Q, y: S } }

    function L(R, Q) {
        var S = document.styleSheets;
        if (!S || S.length <= 0) {
            var P = document.createElement("STYLE");
            P.type = "text/css";
            var T = document.getElementsByTagName("HEAD")[0];
            T.appendChild(P) }
        S = document.styleSheets;
        S = S[S.length - 1];
        if (baidu.ie) { S.addRule(R, Q) } else { S.insertRule(R + " { " + Q + " }", S.cssRules.length) } }

    function G(R, P, Q) {
        if (!R) {
            return }
        if (Q != undefined) { R.style[P] = Q } else {
            if (R.style[P]) {
                return R.style[P] } else {
                if (R.currentStyle) {
                    return R.currentStyle[P] } else {
                    if (document.defaultView && document.defaultView.getComputedStyle) { P = P.replace(/([A-Z])/g, "-\u00241").toLowerCase();
                        var S = document.defaultView.getComputedStyle(R, "");
                        return S && S.getPropertyValue(P) || "" } } } } }

    function A() { L(".bdSug_wpr", "line-height:normal;background:#FFF;padding:0;margin:0;border:1px solid #817F82;position:absolute;z-index:9999;");
        L(".bdSug_wpr table", "padding:0;width:100%;background:#fff;cursor:default;");
        L(".bdSug_wpr tr", "padding:0;margin:0;");
        L(".bdSug_wpr td", "padding:10px 16px;margin:0;text-align:left;vertical-align:middle;font:14px verdana;font-weight:normal;text-decoration:none;text-indent:0;");
        L(".bdSug_mo", "background:#36c;color:#fff;");
        L(".bdSug_mo td", "font-weight:bold;");
        L(".bdSug_pre", "padding:0;margin:0;");
        L(".bdsug_copy", "margin:0;background:transparent url(http://www.baidu.com/img/bd.gif) no-repeat;font-size:13px;color:#77c;text-decoration:none;padding:0 2px 0 16px;") }
    A();
    var H = document.body.getElementsByTagName("INPUT");
    for (var K = 0, F = H.length; K < F; K++) {
        var M = H[K];
        if (M && M.type == "text" && (M.getAttribute("baiduSug") == 1 || M.getAttribute("baiduSug") == 2)) { M.sugId = K;
            var C = (M.getAttribute("baiduSug") == 1);
            I(M, null, null, C) } }
    return { bind: I, callbacks: D } })();
