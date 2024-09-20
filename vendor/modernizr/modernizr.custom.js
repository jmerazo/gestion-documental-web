!function(e,t,n){function r(e,t){return typeof e===t}function s(e,t){return!!~(""+e).indexOf(t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):b?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function o(){var e=t.body;return e||(e=a(b?"svg":"body"),e.fake=!0),e}function i(e,n,r,s){var i,l,d,c,u="modernizr",f=a("div"),p=o();if(parseInt(r,10))for(;r--;)d=a("div"),d.id=s?s[r]:u+(r+1),f.appendChild(d);return i=a("style"),i.type="text/css",i.id="s"+u,(p.fake?p:f).appendChild(i),p.appendChild(f),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",c=T.style.overflow,T.style.overflow="hidden",T.appendChild(p)),l=n(f,e),p.fake?(p.parentNode.removeChild(p),T.style.overflow=c,T.offsetHeight):f.parentNode.removeChild(f),!!l}function l(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(t,n,r){var s;if("getComputedStyle"in e){s=getComputedStyle.call(e,t,n);var a=e.console;if(null!==s)r&&(s=s.getPropertyValue(r));else if(a){var o=a.error?"error":"log";a[o].call(a,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else s=!n&&t.currentStyle&&t.currentStyle[r];return s}function c(t,r){var s=t.length;if("CSS"in e&&"supports"in e.CSS){for(;s--;)if(e.CSS.supports(l(t[s]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var a=[];s--;)a.push("("+l(t[s])+":"+r+")");return a=a.join(" or "),i("@supports ("+a+") { #modernizr { position: absolute; } }",function(e){return"absolute"==d(e,null,"position")})}return n}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function f(e,t,o,i){function l(){f&&(delete k.style,delete k.modElem)}if(i=!r(i,"undefined")&&i,!r(o,"undefined")){var d=c(e,o);if(!r(d,"undefined"))return d}for(var f,p,g,m,v,h=["modernizr","tspan","samp"];!k.style&&h.length;)f=!0,k.modElem=a(h.shift()),k.style=k.modElem.style;for(g=e.length,p=0;g>p;p++)if(m=e[p],v=k.style[m],s(m,"-")&&(m=u(m)),k.style[m]!==n){if(i||r(o,"undefined"))return l(),"pfx"!=t||m;try{k.style[m]=o}catch(e){}if(k.style[m]!=v)return l(),"pfx"!=t||m}return l(),!1}function p(e,t){return function(){return e.apply(t,arguments)}}function g(e,t,n){var s;for(var a in e)if(e[a]in t)return!1===n?e[a]:(s=t[e[a]],r(s,"function")?p(s,n||t):s);return!1}function m(e,t,n,s,a){var o=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+C.join(o+" ")+o).split(" ");return r(t,"string")||r(t,"undefined")?f(i,t,s,a):(i=(e+" "+_.join(o+" ")+o).split(" "),g(i,t,n))}function v(e,t,r){return m(e,n,n,t,r)}var h=[],y={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){h.push({name:e,fn:t,options:n})},addAsyncTest:function(e){h.push({name:null,fn:e})}},S=function(){};S.prototype=y,S=new S;var w=[],T=t.documentElement,b="svg"===T.nodeName.toLowerCase(),x="Moz O ms Webkit",C=y._config.usePrefixes?x.split(" "):[];y._cssomPrefixes=C;var E={elem:a("modernizr")};S._q.push(function(){delete E.elem});var k={style:E.elem.style};S._q.unshift(function(){delete k.style});var _=y._config.usePrefixes?x.toLowerCase().split(" "):[];y._domPrefixes=_,y.testAllProps=m,y.testAllProps=v,S.addTest("backgroundsize",v("backgroundSize","100%",!0)),S.addTest("bgpositionshorthand",function(){var e=a("a"),t=e.style,n="right 10px bottom 10px";return t.cssText="background-position: "+n+";",t.backgroundPosition===n}),S.addTest("bgpositionxy",function(){return v("backgroundPositionX","3px",!0)&&v("backgroundPositionY","5px",!0)}),S.addTest("bgrepeatround",v("backgroundRepeat","round")),S.addTest("bgrepeatspace",v("backgroundRepeat","space")),S.addTest("bgsizecover",v("backgroundSize","cover")),S.addTest("borderradius",v("borderRadius","0px",!0)),S.addTest("cssanimations",v("animationName","a",!0));var P=y._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];y._prefixes=P,S.addTest("csscalc",function(){var e="width:",t=a("a");return t.style.cssText=e+P.join("calc(10px);"+e),!!t.style.length}),S.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&v("transform","scale(1)",!0)});var R="CSS"in e&&"supports"in e.CSS,z="supportsCSS"in e;S.addTest("supports",R||z),S.addTest("csstransforms3d",function(){return!!v("perspective","1px",!0)}),S.addTest("csstransitions",v("transition","all",!0)),S.addTest("flexboxtweener",v("flexAlign","end",!0));var N=y.testStyles=i;!function(){var e=navigator.userAgent,t=e.match(/w(eb)?osbrowser/gi),n=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9;return t||n}()?N('@font-face {font-family:"font";src:url("https://")}',function(e,n){var r=t.getElementById("smodernizr"),s=r.sheet||r.styleSheet,a=s?s.cssRules&&s.cssRules[0]?s.cssRules[0].cssText:s.cssText||"":"",o=/src/i.test(a)&&0===a.indexOf(n.split(" ")[0]);S.addTest("fontface",o)}):S.addTest("fontface",!1),S.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),S.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return!1}}),S.addTest("multiplebgs",function(){var e=a("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)}),S.addTest("preserve3d",function(){var t,n,r=e.CSS,s=!1;return!!(r&&r.supports&&r.supports("(transform-style: preserve-3d)"))||(t=a("a"),n=a("a"),t.style.cssText="display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);",n.style.cssText="display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);",t.appendChild(n),T.appendChild(t),s=n.getBoundingClientRect(),T.removeChild(t),s=s.width&&s.width<4)}),S.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(e){return!1}});var j={}.toString;S.addTest("smil",function(){return!!t.createElementNS&&/SVGAnimate/.test(j.call(t.createElementNS("http://www.w3.org/2000/svg","animate")))}),S.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(j.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),S.addTest("svgfilters",function(){var t=!1;try{t="SVGFEColorMatrixElement"in e&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(e){}return t}),S.addTest("svgforeignobject",function(){return!!t.createElementNS&&/SVGForeignObject/.test(j.call(t.createElementNS("http://www.w3.org/2000/svg","foreignObject")))}),S.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))});var A=a("canvas");S.addTest("todataurljpeg",function(){return!!S.canvas&&0===A.toDataURL("image/jpeg").indexOf("data:image/jpeg")}),S.addTest("todataurlpng",function(){return!!S.canvas&&0===A.toDataURL("image/png").indexOf("data:image/png")}),S.addTest("todataurlwebp",function(){var e=!1;try{e=!!S.canvas&&0===A.toDataURL("image/webp").indexOf("data:image/webp")}catch(e){}return e}),function(){var e,t,n,s,a,o,i;for(var l in h)if(h.hasOwnProperty(l)){if(e=[],t=h[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(s=r(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)o=e[a],i=o.split("."),1===i.length?S[i[0]]=s:(!S[i[0]]||S[i[0]]instanceof Boolean||(S[i[0]]=new Boolean(S[i[0]])),S[i[0]][i[1]]=s),w.push((s?"":"no-")+i.join("-"))}}(),function(e){var t=T.className,n=S._config.classPrefix||"";if(b&&(t=t.baseVal),S._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}S._config.enableClasses&&(t+=" "+n+e.join(" "+n),b?T.className.baseVal=t:T.className=t)}(w),delete y.addTest,delete y.addAsyncTest;for(var O=0;O<S._q.length;O++)S._q[O]();e.Modernizr=S}(window,document);