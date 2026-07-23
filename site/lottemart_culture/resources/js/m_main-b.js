$(document).ready(function () {

	refreshMainConH();
	mainVisual();

	mainControlBtn();
	mainControlPage();

	mainBTab();
	mainBrightOpen();
	mainBrightClose();

	$(window).resize(function(){
		refreshMainConH();
	});

	setTimeout(function(){
		$("#wrap.mainB").parent().addClass("load");

	}, 300);


});



var vrPlay = true;
var aniIdx = 0;

dummyStyle = document.createElement('div').style;
vendor = (function () {
	var vendors = 't,webkitT,MozT,msT,OT'.split(','),
		t,
		i = 0,
		l = vendors.length;

	for ( ; i < l; i++ ) {
		t = vendors[i] + 'ransform';
		if ( t in dummyStyle ) {
			return vendors[i].substr(0, vendors[i].length - 1);
		}
	}

	return false;
})();

TRNEND_EV = (function () {
	if ( vendor === false ) return false;

	var transitionEnd = {
			''			: 'transitionend',
			'webkit'	: 'webkitTransitionEnd',
			'Moz'		: 'transitionend',
			'O'			: 'otransitionend',
			'ms'		: 'MSTransitionEnd'
		};

	return transitionEnd[vendor];
})();
ANI_EV = (function () {
	if ( vendor === false ) return false;

	var animationEnd = {
			''			: 'animationend',
			'webkit'	: 'webkitAnimationEnd',
			'Moz'		: 'AnimationEnd',
			'O'			: 'oAnimationEnd',
			'ms'		: 'MSAnimationEnd'
		};

	return animationEnd[vendor];
})();

(function ($) {
	$.fn.TRANSITION = function( callback ) {
		var ver = getIEVersion();
		if(ver > -1 && ver < 10){
			callback( $(this) );
			return;
		}
		if(TRNEND_EV != undefined){
			$(this).one(TRNEND_EV, function() {
				callback( $(this) );
			})
		}
		else{
			callback( $(this) );
		}
	}
})(jQuery);

(function ($) {
	$.fn.ANI = function( callback ) {
		if(ANI_EV != undefined){
			$(this).one(ANI_EV, function() {
				callback( this );
			})
		}
		else{
			callback( this );
		}
	}
})(jQuery);


function getIEVersion() {
	 var rv = -1; // Return value assumes failure.
	 if (navigator.appName == 'Microsoft Internet Explorer') {
		  var ua = navigator.userAgent;
		  var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		  if (re.exec(ua) != null)
			  rv = parseFloat(RegExp.$1);
		 }
	 return rv;
}

//리사이즈
function refreshMainConH(){
	var windowH = $(window).height();
	var windowH2 = windowH * 2.452
	var headerH = $("#header").height();
	var contH = windowH - (headerH);
	var rightCon = $("#wrap.mainB .right-con-wrap").height();
	//var checkMargin = (contH - rightCon) / 2;

	if(contH < 600)
		contH = 600;

	$("#wrap.mainB .mainB-type").height(contH);
	$("#wrap.mainB #container").height(contH);
	$("#wrap.mainB .mainB-right-con").height(contH);
	//$("#wrap.mainB .right-con-wrap").css( { "margin-top" : checkMargin, "margin-bottom" : checkMargin } );
}

function scaleVR(idx){
	if(!vrPlay)
		return;

	$("#mainB-visual div.on").ANI(function() {
		var old = $("#mainB-visual div.on");
        var visual_cnt = $('#mainB-visual').children().length;
        
		old.removeClass("fadeIn");
		if(idx > 0)
			aniIdx = idx;
		else
			aniIdx++;
        
		if(aniIdx > visual_cnt-1)
			aniIdx = 0;

		$(".mainB-control a").removeClass("on");
		$(".mainB-control a").eq(aniIdx).addClass("on");

		//메인 가운데 텍스트 문구 교체
		$(".mainB-txt > p").removeClass("active");
		$(".mainB-txt > p").eq(aniIdx).addClass("active");


		$("#mainB-visual div").eq(aniIdx).addClass("fadeIn on").TRANSITION(function() {
			$("#mainB-visual div").eq(aniIdx).addClass("on");
			old.removeClass("on");
			scaleVR(-1);
		});
	});
}

var mainVisual = function(){
	$("#mainB-visual div.first").addClass("on");
	scaleVR(-1);
}

//비쥬얼 버튼 컨트롤
var mainControlBtn = function(){
	var controlStop = $(".mainB-control a.btn-stop");
	var controlPlay = $(".mainB-control a.btn-play");

	controlStop.click(function(){
		vrPlay = false;
		$(this).hide();
		controlPlay.show();
		$("#mainB-visual div").removeClass("running");
		$("#mainB-visual div").addClass("paused");
		return false;
	});
	controlPlay.click(function(){
		vrPlay = true;
		$(this).hide();
		controlStop.show();
		$("#mainB-visual div").removeClass("paused");
		$("#mainB-visual div").addClass("running");
		scaleVR(-1);
		return false;
	});
}

//비쥬얼 페이지 컨트롤
var mainControlPage = function(){
	var controlPage = $(".mainB-control a.page");

	controlPage.click(function(){
		var idx = parseInt($(this).attr("data-idx"));
		$(".kv-copy li").off("transitionend webkitTransitionEnd transitionend otransitionend MSTransitionEnd");
		$("#mainB-visual div").off("transitionend webkitTransitionEnd transitionend otransitionend MSTransitionEnd");
		$("#mainB-visual div").off("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd");


		var old = $("#mainB-visual div.on");
		old.removeClass("fadeIn");
		aniIdx = idx;

		$(".mainB-control > a").removeClass("on");
		$(".mainB-control > a").eq(aniIdx).addClass("on");

		//메인 가운데 텍스트 문구 교체
		$(".mainB-txt > p").removeClass("active");
		$(".mainB-txt > p").eq(aniIdx).addClass("active");



		$("#mainB-visual > div").eq(aniIdx).addClass("fadeIn on").TRANSITION(function() {
			$("#mainB-visual > div").eq(aniIdx).addClass("on");
			old.removeClass("on");
		});

		scaleVR(-1);
		return false;
	});
}
// 메인 탭메뉴
var mainBTab = function(){
	var tabMenu = $(".mainB-tabs-menu > ul > li");
	var tabCon = $(".mainB-tabs-con");

	tabMenu.mouseover(function(){
		var tabType = $(this).index();
		tabMenu.each(function(index){
			$(this).addClass("active");

			if(tabType != index){
				$(this).removeClass("active");
			}
		});

		tabCon.eq(tabType).show().siblings('div').hide();
	});
}

//오른쪽 컨텐츠 열기
var mainBrightOpen = function(){
	var clickEvent = $(".mainB-right-open > a");
	var openCon = $(".mainB-right-con");

	clickEvent.click(function(){
		openCon.animate({right: "+=2000px"}, 600);
	});
}

//오른쪽 컨텐츠 닫기
var mainBrightClose = function(){
	var clickEvent = $(".mainB-right .btn-right-close");
	var openCon = $(".mainB-right-con");

	clickEvent.click(function(){
		openCon.animate({right: "-=2000px"}, 600);
	});
}


//


