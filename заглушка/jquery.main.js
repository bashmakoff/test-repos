// iepp v2.1pre @jon_neal & @aFarkas github.com/aFarkas/iepp
// html5shiv @rem remysharp.com/html5-enabling-script
// Dual licensed under the MIT or GPL Version 2 licenses
/*@cc_on(function(a,b){function r(a){var b=-1;while(++b<f)a.createElement(e[b])}if(!window.attachEvent||!b.createStyleSheet||!function(){var a=document.createElement("div");return a.innerHTML="<elem></elem>",a.childNodes.length!==1}())return;a.iepp=a.iepp||{};var c=a.iepp,d=c.html5elements||"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|subline|summary|time|video",e=d.split("|"),f=e.length,g=new RegExp("(^|\\s)("+d+")","gi"),h=new RegExp("<(/*)("+d+")","gi"),i=/^\s*[\{\}]\s*$/,j=new RegExp("(^|[^\\n]*?\\s)("+d+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),k=b.createDocumentFragment(),l=b.documentElement,m=b.getElementsByTagName("script")[0].parentNode,n=b.createElement("body"),o=b.createElement("style"),p=/print|all/,q;c.getCSS=function(a,b){try{if(a+""===undefined)return""}catch(d){return""}var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,p.test(b)&&h.push(c.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},c.parseCSS=function(a){var b=[],c;while((c=j.exec(a))!=null)b.push(((i.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(g,"$1.iepp-$2")+c[4]);return b.join("\n")},c.writeHTML=function(){var a=-1;q=q||b.body;while(++a<f){var c=b.getElementsByTagName(e[a]),d=c.length,g=-1;while(++g<d)c[g].className.indexOf("iepp-")<0&&(c[g].className+=" iepp-"+e[a])}k.appendChild(q),l.appendChild(n),n.className=q.className,n.id=q.id,n.innerHTML=q.innerHTML.replace(h,"<$1font")},c._beforePrint=function(){if(c.disablePP)return;o.styleSheet.cssText=c.parseCSS(c.getCSS(b.styleSheets,"all")),c.writeHTML()},c.restoreHTML=function(){if(c.disablePP)return;n.swapNode(q)},c._afterPrint=function(){c.restoreHTML(),o.styleSheet.cssText=""},r(b),r(k);if(c.disablePP)return;m.insertBefore(o,m.firstChild),o.media="print",o.className="iepp-printshim",a.attachEvent("onbeforeprint",c._beforePrint),a.attachEvent("onafterprint",c._afterPrint)})(this,document)@*/
function initPage(){
	initAutoScalingNav({
		menuId: "nav",
		sideClasses: false,
		tag: "a"
	});
}

function initAutoScalingNav(o) {
	if (!o.menuId) o.menuId = "nav";
	if (!o.tag) o.tag = "a";
	if (!o.spacing) o.spacing = 0;
	if (!o.constant) o.constant = 0;
	if (!o.minPaddings) o.minPaddings = 0;
	if (!o.liHovering) o.liHovering = false;
	if (!o.sideClasses) o.sideClasses = false;
	if (!o.equalLinks) o.equalLinks = false;
	if (!o.flexible) o.flexible = false;
	var nav = document.getElementById(o.menuId);
	if(nav) {
		nav.className += " scaling-active";
		var lis = nav.getElementsByTagName("li");
		var asFl = [];
		var lisFl = [];
		var width = 0;
		for (var i=0, j=0; i<lis.length; i++) {
			if(lis[i].parentNode == nav) {
				var t = lis[i].getElementsByTagName(o.tag).item(0);
				asFl.push(t);
				asFl[j++].width = t.offsetWidth;
				lisFl.push(lis[i]);
				if(width < t.offsetWidth) width = t.offsetWidth;
			}
			if(o.liHovering) {
				lis[i].onmouseover = function() {
					this.className += " hover";
				}
				lis[i].onmouseout = function() {
					this.className = this.className.replace("hover", "");
				}
			}
		}
		var menuWidth = nav.clientWidth - asFl.length*o.spacing - o.constant;
		if(o.equalLinks && width * asFl.length < menuWidth) {
			for (var i=0; i<asFl.length; i++) {
				asFl[i].width = width;
			}
		}
		width = getItemsWidth(asFl);
		if(width < menuWidth) {
			var version = navigator.userAgent.toLowerCase();
			for (var i=0; getItemsWidth(asFl) < menuWidth; i++) {
				asFl[i].width++;
				if(!o.flexible) {
					asFl[i].style.width = asFl[i].width + "px";
				}
				if(i >= asFl.length-1) i=-1;
			}
			if(o.flexible) {
				for (var i=0; i<asFl.length; i++) {
					width = (asFl[i].width - o.spacing - o.constant/asFl.length)/menuWidth*100;
					if(i != asFl.length-1) {
						lisFl[i].style.width = width + "%";
					}
					else {
						if(navigator.appName.indexOf("Microsoft Internet Explorer") == -1 || version.indexOf("msie 8") != -1 || version.indexOf("msie 9") != -1)
							lisFl[i].style.width = width + "%";
					}
				}
			}
		}
		else if(o.minPaddings > 0) {
			for (var i=0; i<asFl.length; i++) {
				asFl[i].style.paddingLeft = o.minPaddings + "px";
				asFl[i].style.paddingRight = o.minPaddings + "px";
			}
		}
		if(o.sideClasses) {
			lisFl[0].className += " first-child";
			lisFl[0].getElementsByTagName(o.tag).item(0).className += " first-child-a";
			lisFl[lisFl.length-1].className += " last-child";
			lisFl[lisFl.length-1].getElementsByTagName(o.tag).item(0).className += " last-child-a";
		}
		nav.className += " scaling-ready";
	}
	function getItemsWidth(a) {
		var w = 0;
		for(var q=0; q<a.length; q++) {
			w += a[q].width;
		}
		return w;
	}
}
if (window.addEventListener)
	window.addEventListener("load", initPage, false);
else if (window.attachEvent)
	window.attachEvent("onload", initPage);

function pressedState(){
	var el = $('.counter a, .btn-approve, #nav ul li a, .bottom-nav ul li a'),
		pressedClass = 'pressed';
	el.mousedown(function(){
		$(this).addClass(pressedClass);
	}).mouseleave(function(){
		$(this).removeClass(pressedClass);
	})
}

$.fn.counter = function(options){
	var options = jQuery.extend({
		holder: this,
		parent: '.counter',
		plus: '.btn-increase',
		minus: '.btn-decrease',
		items: 'input'
	},options);
	var _holder = $(options.holder);
	if(!_holder.length) return false;
	var _plus = $(options.plus , _holder),
		_minus = $(options.minus , _holder),
		_items = $(options.items , _holder);
	var temp , item;
	_items.bind('change' , function(){calc($(this) , 0);})
	_plus.click(function(){
		calc($(this) , 10);
		return false;
	});
	_minus.click(function(){
		calc($(this) , -10);
		return false;
	});
	function calc(p , t){
		item = p.parents(options.parent).find(options.items);
		temp = parseInt(item.attr('value')) + t;
		if(temp && temp >= 0){
			item.attr('value' , "");
			item.attr('value' , temp);
		}
		else item.attr('value' , "0");
	}
}


function clearInputs(){
	$('input:text, input:password, textarea').each(function(){
		var _el = $(this);
		var _val = _el.val();
		_el.bind('focus', function(){
			if(this.value == _val) {
				this.value = '';
			}
		}).bind('blur', function(){
			if(this.value == '') {
				this.value = _val;
			}
		});
	});
};

/*
 * touchSwipe - jQuery Plugin
 * http://plugins.jquery.com/project/touchSwipe
 * http://labs.skinkers.com/touchSwipe/
 *
 * Copyright (c) 2010 Matt Bryson (www.skinkers.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * $version: 1.2.5
 */
;(function(a){a.fn.swipe=function(c){if(!this){return false}var k={fingers:1,threshold:75,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,click:null,triggerOnTouchEnd:true,allowPageScroll:"auto"};var m="left";var l="right";var d="up";var s="down";var j="none";var u="horizontal";var q="vertical";var o="auto";var f="start";var i="move";var h="end";var n="cancel";var t="ontouchstart" in window,b=t?"touchstart":"mousedown",p=t?"touchmove":"mousemove",g=t?"touchend":"mouseup",r="touchcancel";var e="start";if(c.allowPageScroll==undefined&&(c.swipe!=undefined||c.swipeStatus!=undefined)){c.allowPageScroll=j}if(c){a.extend(k,c)}return this.each(function(){var D=this;var H=a(this);var E=null;var I=0;var x={x:0,y:0};var A={x:0,y:0};var K={x:0,y:0};function z(N){var M=t?N.touches[0]:N;e=f;if(t){I=N.touches.length}distance=0;direction=null;if(I==k.fingers||!t){x.x=A.x=M.pageX;x.y=A.y=M.pageY;if(k.swipeStatus){y(N,e)}}else{C(N)}D.addEventListener(p,J,false);D.addEventListener(g,L,false)}function J(N){if(e==h||e==n){return}var M=t?N.touches[0]:N;A.x=M.pageX;A.y=M.pageY;direction=v();if(t){I=N.touches.length}e=i;G(N,direction);if(I==k.fingers||!t){distance=B();if(k.swipeStatus){y(N,e,direction,distance)}if(!k.triggerOnTouchEnd){if(distance>=k.threshold){e=h;y(N,e);C(N)}}}else{e=n;y(N,e);C(N)}}function L(M){M.preventDefault();distance=B();direction=v();if(k.triggerOnTouchEnd){e=h;if((I==k.fingers||!t)&&A.x!=0){if(distance>=k.threshold){y(M,e);C(M)}else{e=n;y(M,e);C(M)}}else{e=n;y(M,e);C(M)}}else{if(e==i){e=n;y(M,e);C(M)}}D.removeEventListener(p,J,false);D.removeEventListener(g,L,false)}function C(M){I=0;x.x=0;x.y=0;A.x=0;A.y=0;K.x=0;K.y=0}function y(N,M){if(k.swipeStatus){k.swipeStatus.call(H,N,M,direction||null,distance||0)}if(M==n){if(k.click&&(I==1||!t)&&(isNaN(distance)||distance==0)){k.click.call(H,N,N.target)}}if(M==h){if(k.swipe){k.swipe.call(H,N,direction,distance)}switch(direction){case m:if(k.swipeLeft){k.swipeLeft.call(H,N,direction,distance)}break;case l:if(k.swipeRight){k.swipeRight.call(H,N,direction,distance)}break;case d:if(k.swipeUp){k.swipeUp.call(H,N,direction,distance)}break;case s:if(k.swipeDown){k.swipeDown.call(H,N,direction,distance)}break}}}function G(M,N){if(k.allowPageScroll==j){M.preventDefault()}else{var O=k.allowPageScroll==o;switch(N){case m:if((k.swipeLeft&&O)||(!O&&k.allowPageScroll!=u)){M.preventDefault()}break;case l:if((k.swipeRight&&O)||(!O&&k.allowPageScroll!=u)){M.preventDefault()}break;case d:if((k.swipeUp&&O)||(!O&&k.allowPageScroll!=q)){M.preventDefault()}break;case s:if((k.swipeDown&&O)||(!O&&k.allowPageScroll!=q)){M.preventDefault()}break}}}function B(){return Math.round(Math.sqrt(Math.pow(A.x-x.x,2)+Math.pow(A.y-x.y,2)))}function w(){var P=x.x-A.x;var O=A.y-x.y;var M=Math.atan2(O,P);var N=Math.round(M*180/Math.PI);if(N<0){N=360-Math.abs(N)}return N}function v(){var M=w();if((M<=45)&&(M>=0)){return m}else{if((M<=360)&&(M>=315)){return m}else{if((M>=135)&&(M<=225)){return l}else{if((M>45)&&(M<135)){return s}else{return d}}}}}try{this.addEventListener(b,z,false);this.addEventListener(r,C)}catch(F){}})}})(jQuery);
// background resize init
function initBackgroundResize() {
	var holder = document.getElementById('bg');
	if(holder) {
		var images = holder.getElementsByTagName('img');
		for(var i = 0; i < images.length; i++) {
			BackgroundStretcher.stretchImage(images[i]);
		}
		BackgroundStretcher.setBgHolder(holder);
	}
}

if (window.addEventListener) window.addEventListener("load", initBackgroundResize, false);
else if (window.attachEvent) window.attachEvent("onload", initBackgroundResize);

// image stretch module
BackgroundStretcher = {
	images: [],
	holders: [],
	viewWidth: 0,
	viewHeight: 0,
	ieFastMode: true,
	stretchBy: 'window', // "window", "page", "block-id", or block
	init: function(){
		this.addHandlers();
		this.resizeAll();
		return this;
	},
	stretchImage: function(origImg) {
		// wrap image and apply smoothing
		var obj = this.prepareImage(origImg);
		
		// handle onload
		var img = new Image();
		img.onload = this.bind(function(){
			obj.iRatio = img.width / img.height;
			this.resizeImage(obj);
		});
		img.src = origImg.src;
		this.images.push(obj);
	},
	prepareImage: function(img) {
		var wrapper = document.createElement('span');
		img.parentNode.insertBefore(wrapper, img);
		wrapper.appendChild(img);
	
		if(/MSIE (6|7|8)/.test(navigator.userAgent) && img.tagName.toLowerCase() === 'img') {
			wrapper.style.position = 'absolute';
			wrapper.style.display = 'block';
			wrapper.style.zoom = 1;
			if(this.ieFastMode) {
				img.style.display = 'none';
				wrapper.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+img.src+'", sizingMethod="scale")'; // enable smoothing in IE6
				return wrapper;
			} else {
				img.style.msInterpolationMode = 'bicubic'; // IE7 smooth fix
				return img;
			}
		} else {
			return img;
		}
	},
	setBgHolder: function(obj) {
		this.holders.push(obj);
		this.resizeAll();
	},
	resizeImage: function(obj) {
		if(obj.iRatio) {
			// calculate dimensions
			var dimensions = this.getProportion({
				ratio: obj.iRatio,
				maskWidth: this.viewWidth,
				maskHeight: this.viewHeight
			});
			// apply new styles
			obj.style.width = dimensions.width + 'px';
			obj.style.height = dimensions.height + 'px';
			obj.style.top = dimensions.top + 'px';
			obj.style.left = dimensions.left +'px';
		}
	},
	resizeHolder: function(obj) {
		obj.style.width = this.viewWidth+'px';
		obj.style.height = this.viewHeight+'px';
	},
	getProportion: function(data) {
		// calculate element coords to fit in mask
		var ratio = data.ratio || (data.elementWidth / data.elementHeight);
		var slideWidth = data.maskWidth, slideHeight = slideWidth / ratio;
		if(slideHeight < data.maskHeight) {
			slideHeight = data.maskHeight;
			slideWidth = slideHeight * ratio;
		}
		return {
			width: slideWidth,
			height: slideHeight,
			top: (data.maskHeight - slideHeight) / 2,
			left: (data.maskWidth - slideWidth) / 2
		}
	},
	resizeAll: function() {
		// crop holder width by window size
		for(var i = 0; i < this.holders.length; i++) {
			this.holders[i].style.width = '100%'; 
		}
		
		// delay required for IE to handle resize
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(this.bind(function(){
			// hide background holders
			for(var i = 0; i < this.holders.length; i++) {
				this.holders[i].style.display = 'none';
			}
			
			// calculate real page dimensions with hidden background blocks
			if(typeof this.stretchBy === 'string') {
				// resize by window or page dimensions
				if(this.stretchBy === 'window' || this.stretchBy === 'page') {
					this.viewWidth = this.stretchFunctions[this.stretchBy].width();
					this.viewHeight = this.stretchFunctions[this.stretchBy].height();
				}
				// resize by element dimensions (by id)
				else {
					var maskObject = document.getElementById(this.stretchBy);
					this.viewWidth = maskObject ? maskObject.offsetWidth : 0;
					this.viewHeight = maskObject ? maskObject.offsetHeight : 0;
				}
			} else {
				this.viewWidth = this.stretchBy.offsetWidth;
				this.viewHeight = this.stretchBy.offsetHeight;
			}
			
			// show and resize all background holders
			for(i = 0; i < this.holders.length; i++) {
				this.holders[i].style.display = 'block';
				this.resizeHolder(this.holders[i]);
			}
			for(i = 0; i < this.images.length; i++) {
				this.resizeImage(this.images[i]);
			}
		}),10);
	},
	addHandlers: function() {
		if (window.addEventListener) {
			window.addEventListener('resize', this.bind(this.resizeAll), false);
			window.addEventListener('orientationchange', this.bind(this.resizeAll), false);
		} else if (window.attachEvent) {
			window.attachEvent('onresize', this.bind(this.resizeAll));
		}
	},
	stretchFunctions: {
		window: {
			width: function() {
				return typeof window.innerWidth === 'number' ? window.innerWidth : document.documentElement.clientWidth;
			},
			height: function() {
				return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
			}
		},
		page: {
			width: function() {
				return !document.body ? 0 : Math.max(
					Math.max(document.body.clientWidth, document.documentElement.clientWidth),
					Math.max(document.body.offsetWidth, document.body.scrollWidth)
				);
			},
			height: function() {
				return !document.body ? 0 : Math.max(
					Math.max(document.body.clientHeight, document.documentElement.clientHeight),
					Math.max(document.body.offsetHeight, document.body.scrollHeight)
				);
			}
		}
	},
	bind: function(fn, scope, args) {
		var newScope = scope || this;
		return function() {
			return fn.apply(newScope, args || arguments);
		}
	}
}.init();
// browser detect script
browserDetect = {
	matchGroups: [
		[
			{uaString:'win', className:'win'},
			{uaString:'mac', className:'mac'},
			{uaString:['linux','x11'], className:'linux'}
		],
		[
			{uaString:'msie', className:'trident'},
			{uaString:'applewebkit', className:'webkit'},
			{uaString:'gecko', className:'gecko'},
			{uaString:'opera', className:'presto'}
		],
		[
			{uaString:'msie 9.0', className:'ie9'},
			{uaString:'msie 8.0', className:'ie8'},
			{uaString:'msie 7.0', className:'ie7'},
			{uaString:'msie 6.0', className:'ie6'},
			{uaString:'firefox/2', className:'ff2'},
			{uaString:'firefox/3', className:'ff3'},
			{uaString:'firefox/4', className:'ff4'},
			{uaString:['opera','version/11'], className:'opera11'},
			{uaString:['opera','version/10'], className:'opera10'},
			{uaString:'opera/9', className:'opera9'},
			{uaString:['safari','version/3'], className:'safari3'},
			{uaString:['safari','version/4'], className:'safari4'},
			{uaString:['safari','version/5'], className:'safari5'},
			{uaString:'chrome', className:'chrome'},
			{uaString:'safari', className:'safari2'},
			{uaString:'unknown', className:'unknown'}
		]
	],
	init: function() {
		this.detect();
		return this;
	},
	addClass: function(className) {
		this.pageHolder = document.documentElement;
		document.documentElement.className += ' '+className;
	},
	detect: function() {
		for(var i = 0, curGroup; i < this.matchGroups.length; i++) {
			curGroup = this.matchGroups[i];
			for(var j = 0, curItem; j < curGroup.length; j++) {
				curItem = curGroup[j];
				if(typeof curItem.uaString === 'string') {
					if(this.uaMatch(curItem.uaString)) {
						this.addClass(curItem.className);
						break;
					}
				} else {
					for(var k = 0, allMatch = true; k < curItem.uaString.length; k++) {
						if(!this.uaMatch(curItem.uaString[k])) {
							allMatch = false;
							break;
						}
					}
					if(allMatch) {
						this.addClass(curItem.className);
						break;
					}
				}
			}
		}
	},
	uaMatch: function(s) {
		if(!this.ua) {
			this.ua = navigator.userAgent.toLowerCase();
		}
		return this.ua.indexOf(s) != -1;
	}
}.init();


;(function(b){var a={init:function(c){var e={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:550,scrollEasing:"easeOutCirc",mouseWheel:"auto",autoDraggerLength:true,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:20,scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false},callbacks:{onScroll:function(){},onTotalScroll:function(){},onTotalScrollOffset:0}},c=b.extend(true,e,c);b(document).data("mCS-is-touch-device",false);if(d()){b(document).data("mCS-is-touch-device",true)}function d(){return !!("ontouchstart" in window)?1:0}return this.each(function(){var m=b(this);if(c.set_width){m.css("width",c.set_width)}if(c.set_height){m.css("height",c.set_height)}if(!b(document).data("mCustomScrollbar-index")){b(document).data("mCustomScrollbar-index","1")}else{var s=parseInt(b(document).data("mCustomScrollbar-index"));b(document).data("mCustomScrollbar-index",s+1)}m.wrapInner("<div class='mCustomScrollBox' id='mCSB_"+b(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+b(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(c.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(!b(document).data("mCS-is-touch-device")){o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer' style='position:relative;'><div class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(c.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(c.scrollButtons.enable){if(c.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' style='display:block; position:relative;'></a>").append("<a class='mCSB_buttonRight' style='display:block; position:relative;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' style='display:block; position:relative;'></a>").append("<a class='mCSB_buttonDown' style='display:block; position:relative;'></a>")}}g.bind("scroll",function(){g.scrollTop(0).scrollLeft(0)});m.data({horizontalScroll:c.horizontalScroll,scrollInertia:c.scrollInertia,scrollEasing:c.scrollEasing,mouseWheel:c.mouseWheel,autoDraggerLength:c.autoDraggerLength,"scrollButtons-enable":c.scrollButtons.enable,"scrollButtons-scrollType":c.scrollButtons.scrollType,"scrollButtons-scrollSpeed":c.scrollButtons.scrollSpeed,"scrollButtons-scrollAmount":c.scrollButtons.scrollAmount,autoExpandHorizontalScroll:c.advanced.autoExpandHorizontalScroll,"onScroll-Callback":c.callbacks.onScroll,"onTotalScroll-Callback":c.callbacks.onTotalScroll,"onTotalScroll-Offset":c.callbacks.onTotalScrollOffset}).mCustomScrollbar("update");if(c.advanced.updateOnBrowserResize){var i;b(window).resize(function(){if(i){clearTimeout(i)}i=setTimeout(function(){m.mCustomScrollbar("update")},150)})}}else{var f=navigator.userAgent;if(f.indexOf("Android")!=-1){var r=parseFloat(f.slice(f.indexOf("Android")+8));if(r<3){j("mCSB_"+b(document).data("mCustomScrollbar-index"))}else{g.css({overflow:"auto","-webkit-overflow-scrolling":"touch"})}}else{g.css({overflow:"auto","-webkit-overflow-scrolling":"touch"})}o.addClass("mCS_no_scrollbar mCS_touch");m.data({horizontalScroll:c.horizontalScroll,scrollInertia:c.scrollInertia,scrollEasing:c.scrollEasing,autoExpandHorizontalScroll:c.advanced.autoExpandHorizontalScroll,"onScroll-Callback":c.callbacks.onScroll,"onTotalScroll-Callback":c.callbacks.onTotalScroll,"onTotalScroll-Offset":c.callbacks.onTotalScrollOffset});g.scroll(function(){m.mCustomScrollbar("callbacks",g,o)});function j(w){var t=document.getElementById(w),u=0,v=0;document.getElementById(w).addEventListener("touchstart",function(x){u=this.scrollTop+x.touches[0].pageY;v=this.scrollLeft+x.touches[0].pageX},false);document.getElementById(w).addEventListener("touchmove",function(x){if((this.scrollTop<this.scrollHeight-this.offsetHeight&&this.scrollTop+x.touches[0].pageY<u-5)||(this.scrollTop!=0&&this.scrollTop+x.touches[0].pageY>u+5)){x.preventDefault()}if((this.scrollLeft<this.scrollWidth-this.offsetWidth&&this.scrollLeft+x.touches[0].pageX<v-5)||(this.scrollLeft!=0&&this.scrollLeft+x.touches[0].pageX>v+5)){x.preventDefault()}this.scrollTop=u-x.touches[0].pageY;this.scrollLeft=v-x.touches[0].pageX},false)}}if(c.advanced.updateOnContentResize){var p;if(c.horizontalScroll){var n=o.outerWidth();if(d()){g.css({"-webkit-overflow-scrolling":"auto"})}}else{var n=o.outerHeight()}p=setInterval(function(){if(c.horizontalScroll){if(c.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var t=o.outerWidth()}else{var t=o.outerHeight()}if(t!=n){m.mCustomScrollbar("update");n=t}},300)}})},update:function(){var l=b(this),i=l.children(".mCustomScrollBox"),o=i.children(".mCSB_container");if(!b(document).data("mCS-is-touch-device")){o.removeClass("mCS_no_scrollbar")}var w=i.children(".mCSB_scrollTools"),m=w.children(".mCSB_draggerContainer"),k=m.children(".mCSB_dragger");if(l.data("horizontalScroll")){var y=w.children(".mCSB_buttonLeft"),r=w.children(".mCSB_buttonRight"),d=i.width();if(l.data("autoExpandHorizontalScroll")){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var x=o.outerWidth()}else{var u=w.children(".mCSB_buttonUp"),e=w.children(".mCSB_buttonDown"),p=i.height(),g=o.outerHeight()}if(g>p&&!l.data("horizontalScroll")&&!b(document).data("mCS-is-touch-device")){w.css("display","block");var q=m.height();if(l.data("autoDraggerLength")){var s=Math.round(p/g*q),j=k.data("minDraggerHeight");if(s<=j){k.css({height:j})}else{if(s>=q-10){var n=q-10;k.css({height:n})}else{k.css({height:s})}}k.children(".mCSB_dragger_bar").css({"line-height":k.height()+"px"})}var z=k.height(),v=(g-p)/(q-z);l.data("scrollAmount",v);l.mCustomScrollbar("scrolling",i,o,m,k,u,e,y,r);var B=Math.abs(Math.round(o.position().top));l.mCustomScrollbar("scrollTo",B,{callback:false})}else{if(x>d&&l.data("horizontalScroll")&&!b(document).data("mCS-is-touch-device")){w.css("display","block");var f=m.width();if(l.data("autoDraggerLength")){var h=Math.round(d/x*f),A=k.data("minDraggerWidth");if(h<=A){k.css({width:A})}else{if(h>=f-10){var c=f-10;k.css({width:c})}else{k.css({width:h})}}}var t=k.width(),v=(x-d)/(f-t);l.data("scrollAmount",v);l.mCustomScrollbar("scrolling",i,o,m,k,u,e,y,r);var B=Math.abs(Math.round(o.position().left));l.mCustomScrollbar("scrollTo",B,{callback:false})}else{i.unbind("mousewheel");i.unbind("focusin");if(l.data("horizontalScroll")){k.add(o).css("left",0)}else{k.add(o).css("top",0)}w.css("display","none");o.addClass("mCS_no_scrollbar")}}},scrolling:function(h,p,m,j,v,c,y,s){var l=b(this);if(!j.hasClass("ui-draggable")){if(l.data("horizontalScroll")){var i="x"}else{var i="y"}j.draggable({axis:i,containment:"parent",drag:function(B,C){l.mCustomScrollbar("scroll");j.addClass("mCSB_dragger_onDrag")},stop:function(B,C){j.removeClass("mCSB_dragger_onDrag")}})}m.unbind("click").bind("click",function(D){if(l.data("horizontalScroll")){var B=(D.pageX-m.offset().left);if(B<j.position().left||B>(j.position().left+j.width())){var C=B;if(C>=m.width()-j.width()){C=m.width()-j.width()}j.css("left",C);l.mCustomScrollbar("scroll")}}else{var B=(D.pageY-m.offset().top);if(B<j.position().top||B>(j.position().top+j.height())){var C=B;if(C>=m.height()-j.height()){C=m.height()-j.height()}j.css("top",C);l.mCustomScrollbar("scroll")}}});if(l.data("mouseWheel")){var t=l.data("mouseWheel");if(l.data("mouseWheel")==="auto"){t=8;var n=navigator.userAgent;if(n.indexOf("Mac")!=-1&&n.indexOf("Safari")!=-1&&n.indexOf("AppleWebKit")!=-1&&n.indexOf("Chrome")==-1){t=1}}h.unbind("mousewheel").bind("mousewheel",function(E,J){E.preventDefault();var I=Math.abs(J*t);if(l.data("horizontalScroll")){var D=j.position().left-(J*I);j.css("left",D);if(j.position().left<0){j.css("left",0)}var H=m.width(),G=j.width();if(j.position().left>H-G){j.css("left",H-G)}}else{var B=j.position().top-(J*I);j.css("top",B);if(j.position().top<0){j.css("top",0)}var F=m.height(),C=j.height();if(j.position().top>F-C){j.css("top",F-C)}}l.mCustomScrollbar("scroll")})}if(l.data("scrollButtons-enable")){if(l.data("scrollButtons-scrollType")==="pixels"){var A;if(b.browser.msie&&parseInt(b.browser.version)<9){l.data("scrollInertia",0)}if(l.data("horizontalScroll")){s.add(y).unbind("click mousedown mouseup mouseout",k,g);s.bind("click",function(B){B.preventDefault();if(!p.is(":animated")){A=Math.abs(p.position().left)+l.data("scrollButtons-scrollAmount");l.mCustomScrollbar("scrollTo",A)}});y.bind("click",function(B){B.preventDefault();if(!p.is(":animated")){A=Math.abs(p.position().left)-l.data("scrollButtons-scrollAmount");if(p.position().left>=-l.data("scrollButtons-scrollAmount")){A="left"}l.mCustomScrollbar("scrollTo",A)}})}else{c.add(v).unbind("click mousedown mouseup mouseout",r,f);c.bind("click",function(B){B.preventDefault();if(!p.is(":animated")){A=Math.abs(p.position().top)+l.data("scrollButtons-scrollAmount");l.mCustomScrollbar("scrollTo",A)}});v.bind("click",function(B){B.preventDefault();if(!p.is(":animated")){A=Math.abs(p.position().top)-l.data("scrollButtons-scrollAmount");if(p.position().top>=-l.data("scrollButtons-scrollAmount")){A="top"}l.mCustomScrollbar("scrollTo",A)}})}}else{if(l.data("horizontalScroll")){s.add(y).unbind("click mousedown mouseup mouseout",k,g);var x,e=m.width(),u=j.width();s.bind("mousedown",function(C){C.preventDefault();var B=e-u;x=setInterval(function(){var D=Math.abs(j.position().left-B)*(100/l.data("scrollButtons-scrollSpeed"));j.stop().animate({left:B},D,"linear");l.mCustomScrollbar("scroll")},20)});var k=function(B){B.preventDefault();clearInterval(x);j.stop()};s.bind("mouseup mouseout",k);var d;y.bind("mousedown",function(C){C.preventDefault();var B=0;d=setInterval(function(){var D=Math.abs(j.position().left-B)*(100/l.data("scrollButtons-scrollSpeed"));j.stop().animate({left:B},D,"linear");l.mCustomScrollbar("scroll")},20)});var g=function(B){B.preventDefault();clearInterval(d);j.stop()};y.bind("mouseup mouseout",g)}else{c.add(v).unbind("click mousedown mouseup mouseout",r,f);var o,q=m.height(),z=j.height();c.bind("mousedown",function(C){C.preventDefault();var B=q-z;o=setInterval(function(){var D=Math.abs(j.position().top-B)*(100/l.data("scrollButtons-scrollSpeed"));j.stop().animate({top:B},D,"linear");l.mCustomScrollbar("scroll")},20)});var r=function(B){B.preventDefault();clearInterval(o);j.stop()};c.bind("mouseup mouseout",r);var w;v.bind("mousedown",function(C){C.preventDefault();var B=0;w=setInterval(function(){var D=Math.abs(j.position().top-B)*(100/l.data("scrollButtons-scrollSpeed"));j.stop().animate({top:B},D,"linear");l.mCustomScrollbar("scroll")},20)});var f=function(B){B.preventDefault();clearInterval(w);j.stop()};v.bind("mouseup mouseout",f)}}}h.unbind("focusin").bind("focusin",function(){h.scrollTop(0).scrollLeft(0);var C=b(document.activeElement);if(C.is("input,textarea,select,button,a[tabindex],area,object")){if(l.data("horizontalScroll")){var J=p.position().left,G=C.position().left,E=h.width(),H=C.outerWidth();if(J+G>=0&&J+G<=E-H){}else{var K=G/l.data("scrollAmount");if(K>=m.width()-j.width()){K=m.width()-j.width()}j.css("left",K);l.mCustomScrollbar("scroll")}}else{var I=p.position().top,F=C.position().top,B=h.height(),D=C.outerHeight();if(I+F>=0&&I+F<=B-D){}else{var K=F/l.data("scrollAmount");if(K>=m.height()-j.height()){K=m.height()-j.height()}j.css("top",K);l.mCustomScrollbar("scroll")}}}})},scroll:function(h){var k=b(this),p=k.find(".mCSB_dragger"),n=k.find(".mCSB_container"),e=k.find(".mCustomScrollBox");if(k.data("horizontalScroll")){var g=p.position().left,m=-g*k.data("scrollAmount"),o=n.position().left,d=Math.round(o-m)}else{var f=p.position().top,j=-f*k.data("scrollAmount"),l=n.position().top,c=Math.round(l-j)}if(b.browser.webkit){var q=(window.outerWidth-8)/window.innerWidth,i=(q<0.98||q>1.02)}if(k.data("scrollInertia")===0||i){if(k.data("horizontalScroll")){n.css("left",m)}else{n.css("top",j)}if(!h){k.mCustomScrollbar("callbacks",e,n)}}else{if(k.data("horizontalScroll")){n.stop().animate({left:"-="+d},k.data("scrollInertia"),k.data("scrollEasing"),function(){if(!h){k.mCustomScrollbar("callbacks",e,n)}})}else{n.stop().animate({top:"-="+c},k.data("scrollInertia"),k.data("scrollEasing"),function(){if(!h){k.mCustomScrollbar("callbacks",e,n)}})}}},scrollTo:function(g,m){var f={moveDragger:false,callback:true},m=b.extend(f,m),i=b(this),c,d=i.find(".mCustomScrollBox"),j=d.children(".mCSB_container");if(!b(document).data("mCS-is-touch-device")){var e=i.find(".mCSB_draggerContainer"),k=e.children(".mCSB_dragger")}var l;if(g){if(typeof(g)==="number"){if(m.moveDragger){c=g}else{l=g;c=Math.round(l/i.data("scrollAmount"))}}else{if(typeof(g)==="string"){var h;if(g==="top"){h=0}else{if(g==="bottom"&&!i.data("horizontalScroll")){h=j.outerHeight()-d.height()}else{if(g==="left"){h=0}else{if(g==="right"&&i.data("horizontalScroll")){h=j.outerWidth()-d.width()}else{if(g==="first"){h=i.find(".mCSB_container").find(":first")}else{if(g==="last"){h=i.find(".mCSB_container").find(":last")}else{h=i.find(g)}}}}}}if(h.length===1){if(i.data("horizontalScroll")){l=h.position().left}else{l=h.position().top}if(b(document).data("mCS-is-touch-device")){c=l}else{c=Math.ceil(l/i.data("scrollAmount"))}}else{c=h}}}if(b(document).data("mCS-is-touch-device")){if(i.data("horizontalScroll")){d.stop().animate({scrollLeft:c},i.data("scrollInertia"),i.data("scrollEasing"),function(){if(m.callback){i.mCustomScrollbar("callbacks",d,j)}})}else{d.stop().animate({scrollTop:c},i.data("scrollInertia"),i.data("scrollEasing"),function(){if(m.callback){i.mCustomScrollbar("callbacks",d,j)}})}}else{if(i.data("horizontalScroll")){if(c>=e.width()-k.width()){c=e.width()-k.width()}k.css("left",c)}else{if(c>=e.height()-k.height()){c=e.height()-k.height()}k.css("top",c)}if(m.callback){i.mCustomScrollbar("scroll")}else{i.mCustomScrollbar("scroll",true)}}}},callbacks:function(e,h){var i=b(this);if(!b(document).data("mCS-is-touch-device")){if(i.data("horizontalScroll")){var g=Math.round(h.position().left);if(g<0&&g<=e.width()-h.outerWidth()+i.data("onTotalScroll-Offset")){i.data("onTotalScroll-Callback").call()}else{i.data("onScroll-Callback").call()}}else{var f=Math.round(h.position().top);if(f<0&&f<=e.height()-h.outerHeight()+i.data("onTotalScroll-Offset")){i.data("onTotalScroll-Callback").call()}else{i.data("onScroll-Callback").call()}}}else{if(i.data("horizontalScroll")){var d=Math.round(e.scrollLeft());if(d>0&&d>=h.outerWidth()-i.width()-i.data("onTotalScroll-Offset")){i.data("onTotalScroll-Callback").call()}else{i.data("onScroll-Callback").call()}}else{var c=Math.round(e.scrollTop());if(c>0&&c>=h.outerHeight()-i.height()-i.data("onTotalScroll-Offset")){i.data("onTotalScroll-Callback").call()}else{i.data("onScroll-Callback").call()}}}}};b.fn.mCustomScrollbar=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments)}else{b.error("Method "+c+" does not exist")}}}})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
;(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery)
/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
;(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.23",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
;(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
;(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
;(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?a.isFunction(b)?this.each(function(c){a(this).offset(b.call(this,c,a(this).offset()))}):this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),a.curCSS||(a.curCSS=a.css),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
;(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.23"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
;jQuery.effects||function(a,b){function c(b){var c;return b&&b.constructor==Array&&b.length==3?b:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))?[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)]:(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))?[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))?[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]:(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))?[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)]:(c=/rgba\(0, 0, 0, 0\)/.exec(b))?e.transparent:e[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=(a.curCSS||a.css)(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};return a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete,[b,c,d,e]}function l(b){return!b||typeof b=="number"||a.fx.speeds[b]?!0:typeof b=="string"&&!a.effects[b]?!0:!1}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){return a.isFunction(d)&&(e=d,d=null),this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class")||"";a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.23",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){return b=="toggle"&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;try{e.id}catch(f){e=document.body}return b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;return b.parent().is(".ui-effects-wrapper")?(c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus(),c):b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];return a.fx.off||!i?h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)}):i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="show",this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="hide",this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);return c[1].mode="toggle",this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}});var m={};a.each(["Quad","Cubic","Quart","Quint","Expo"],function(a,b){m[b]=function(b){return Math.pow(b,a+2)}}),a.extend(m,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return a===0||a===1?a:-Math.pow(2,8*(a-1))*Math.sin(((a-1)*80-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){var b,c=4;while(a<((b=Math.pow(2,--c))-1)/11);return 1/Math.pow(4,3-c)-7.5625*Math.pow((b*3-2)/22-a,2)}}),a.each(m,function(b,c){a.easing["easeIn"+b]=c,a.easing["easeOut"+b]=function(a){return 1-c(1-a)},a.easing["easeInOut"+b]=function(a){return a<.5?c(a*2)/2:c(a*-2+2)/-2+1}})}(jQuery);;

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);