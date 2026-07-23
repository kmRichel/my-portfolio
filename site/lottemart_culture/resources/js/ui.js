$(document).ready(function(){
    detail_search();

	tab.hover();
	tab.slideQna();
	tab.moTabWeek();

	//하위 탭메뉴
	tabPageMenu();

	//클릭Active
	clickActive();

	//수강신청 상세검색
	srchDetail();

	//이용약관정책 바로가기
	provision();

	//연혁 슬라이드
	tabWidth();

	//수강신청 상세검색
	toggleOpen();

	//수강신청 리스트 필터
	listFilter();

	//이미지 교체
	imgChange();

	//요일 탭메뉴
	weekSelect();
	moWeekSelect();

	//시간 display
	timerCon();

	//공통 탭 메뉴
	tabMneuWrap();

	//강사정보 입력
	moStepSlide();

	//출강 강사 약정
	moStepEntyBox();
	pcStepEntyBox();

    $(window).resize(function(){
		//레이어팝업 동적 호출시
		$('.layer_busines_sel-pop').center();

        if($('.pc_visible').is(':visible')){
            $('.pc_visible').css({display:'none'});
        }
    });
});


// 상세검색
var detail_search = function(){
    var btn_detail = $('.btn_detail-srch');

    btn_detail.click(function(e){
        e.preventDefault();
        if($('.srch_optn-m').is(':hidden')){
            $(this).addClass('active');
            $('.srch_optn-m').show();
        } else {
            $(this).removeClass('active');
            $('.srch_optn-m').hide();
        }
    });
}

//지점검색
var branchSlct = function(){
    $('.pc_visible').css({display:'block'});

    var depth1 = $('.depth1 > li'),
        depth2 = $('.depth2');

    // 지역선택
    $('.depth1 > li > a').click(function(){
        depth1.removeClass('active').find('.depth2').removeClass('on');
        $(this).parent('li').addClass('active').find('.depth2').addClass('on');

    });

    // 지점선택
    $('.depth2 > li > a').click(function(){
        var getTxt = $(this).text();
        $('.slct-branch').val(getTxt);
        $('.pc_visible').css('display', 'none');
        depth1.removeClass('active');
        depth2.removeClass('on');
    });

    //모바일
    $('.m_depth2 select').change(function(){
        $('.slct').html($('.m_depth2 select option:selected' ).text());
    });
}


 //플리킹 탭메뉴
var tab = {
	hover : function(){
		var tabMenu = $('.tab-menu2 div');
		var tabConAll = $('.tab-menu-all');
		var tabConBox = $('.tab-menu-con');
		var menuIndex = "";

		tabConBox.hide();
		$('div.tab-menu-con:first').show();

		tabMenu.click(function(){
			tabMenu.removeClass('active');
			$(this).addClass('active');

			var textCheck = $(tabMenu).text();
			if(!textCheck.indexOf("전체")){
				if($(this).text() =="전체"){
					tabConAll.show();
				}else{
					menuIndex = $(this).index();
					tabConAll.hide();
					$("#tabCon"+menuIndex ).show();
				}

			} else {
				menuIndex = $(this).index() +1;
				tabConBox.hide();
				$("#tabCon"+menuIndex).show();
			}
		});
	},

	slideQna : function(){
		var qnaTitle = $(".qna-wrap dt");
		var qnaTxt = $(".qna-wrap dd");

		qnaTitle.click(function(){
			var slideMenu = $(this).next().css("display");
			if(slideMenu == "none"){
				qnaTxt.hide();
				$(this).next().show();
				qnaTitle.removeClass("active");
				$(this).addClass("active");

			}else{
				qnaTxt.hide();
				qnaTitle.removeClass("active");
			}
		});

	},

	moTabWeek : function(){
		var moTabMenu  = $('.mo-tab-menu li');
		var moTabCon = $('.mo-tab-con');
		var moTabIndex= "";

		moTabCon.hide();
		$('div.mo-tab-con:first').show();

		moTabMenu .click(function(){
			moTabMenu .removeClass('active');
			$(this).addClass('active');

			moTabIndex= $(this).index() +1;
			moTabCon.hide();
			$("#moTabCon"+moTabIndex).show();

		});
	}
}


//동적 레이어팝업
var selectSendTeach = function(){
	var selectIdName = $("#selectSendTeach");
	var moEntyBusiness = $(".mo-enty-business");
	var layerBusinesSel = $('.layer_busines_sel-pop');

	selectIdName.change(function(){
		var thisChangeVal = $(this).val();
		if(thisChangeVal == "개인강사"){
			moEntyBusiness.hide();
			layerBusinesSel.hide();

		} else if(thisChangeVal == "업체(협회) 출강 강사"){
			moEntyBusiness.show();			//show
			layerBusinesSel.center();			//리사이즈
			layerBusinesSel.layerLoad();		//팝업 로드
		}
	});
}

var selectSendTeachPc = function(){
	var selectIdName = $("#selectSendTeachPc input:radio[name='division1']");
	var moEntyBusiness = $(".enty-business");
	var layerBusinesSel = $('.layer_busines_sel-pop');

	selectIdName.change(function(){
		var thisChangeVal = $(this).val();
		if(thisChangeVal == "개인강사"){
			moEntyBusiness.hide();
			layerBusinesSel.hide();

		} else if(thisChangeVal == "업체(협회) 출강 강사"){
			moEntyBusiness.show();			//show
			layerBusinesSel.center();			//리사이즈
			layerBusinesSel.layerLoad();		//팝업 로드
		}
	});
}

$.fn.layerLoad = function () {
	$(this).show();
	$(this).after('<div class="mask"></div>');

}

$.fn.center = function () {
	this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	return this;
}


//하위메뉴 탭 메뉴
var tabPageMenu = function(){
	var tabMenu = $('.page-menu li');
	var tabCon = $('.page-con');

	tabCon.hide();
	$('div.page-con:first').show();


	tabMenu.click(function(){
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

//공통 탭 메뉴
var tabMneuWrap = function(){
	var tabMenuTit = $('.tabMneuWrap > ul > li');
	var tabConBox = $('.tabMneuCon');

	tabConBox.hide();
	$('div.tabMneuCon:first').show();

	tabMenuTit.click(function(){
		var tabIndex = $(this).index();
		tabMenuTit.each(function(index){
			$(this).addClass("active");

			if(tabIndex != index){
				$(this).removeClass("active");
			}
		});
		tabConBox.eq(tabIndex).show().siblings('div').hide();
	});
}

var clickActive = function(){
	var clickMenu =  $('.day-btn-wrap a');
	clickMenu.click(function(){
			clickMenu.removeClass('active');
			$(this).addClass('active');
	});
}

//수강신청 상세검색
var srchDetail = function(){
	var btnDetail = $('.btn-srch_detail'),
	btvClose = $('.srch-detail .close');

	btnDetail.click(function(e){
        e.preventDefault();
        if($('.srch-detail').is(':hidden')){
            $(this).addClass('active');
            $('.srch-detail').show();
        } else {
            $(this).removeClass('active');
            $('.srch-detail').hide();
        }
	});

	btvClose.click(function(e){
		e.preventDefault();
		btnDetail.removeClass('active');
		$('.srch-detail').hide();
	});
}

//footer 이용약관정책 바로가기
var provision = function(){
   $('.btn-provision_go').click(function(e){
        e.preventDefault();
        var position = $("#provision-list option:selected").val();
        location.href="#"+position;
   });
}

/* 315라인 추가 */
   $('#provision-list').change(function(e){
   e.preventDefault();
   var position = $("#provision-list option:selected").val();
   location.href="#"+position;
   });
/* 315라인 추가 */


//footer 연혁tab width값
var tabWidth = function(){
	var total = $('.year-tab').width(),
	width = total / 5;
	$('.year-tab .item').css('width', width);
}

//개인정보처리방침 팝업
var CustomerBakMove = function(obj){
	var value = $(obj).closest('.prev_list-box').find('select').val();

	if(value == '' || value == 'undefined') return false;
	if((location.pathname).indexOf('happycenter/popup') == -1) {
		window.open("http://www.lottemart.com/happycenter/popup/popup.do?param=" + value, '', 'width=900, height=800, scrollbars=yes, status=no, menubar=no, resizable=yes');
	} else {
		location.href = "http://www.lottemart.com/happycenter/popup/popup.do?param=" + value;
	}
}

//수강신청 상세검색
var toggleOpen = function(){
	$('.a-toggle').click(function(){
		$(this).parent().toggleClass('active');
	});
}

var listFilter = function(){
	var filters = $('.list-filter li');
	$('.list-filter a').click(function(){
		filters.removeClass('active');
		$(this).parent().addClass('active');
	});
}


//pc-mobile 이미지 교체
var imgChange = function(){

	var imgLoad1 = $(".imgChange1 img");
	var imgCh1 = $(".imgChange1");

	var imgLoad2 = $(".imgChange2 img");
	var imgCh2 = $(".imgChange2");

	if(imgLoad1.hasClass('img-change1') == true){
		imgCh1.find('img').each(function(){
			var imgSrc1 = $(this).attr('src');	//현재 이미지 가져오기
			imgSrc1 = imgSrc1.slice(0,-5);		// 이미지 주소 자르기
			imgPlus1 = imgSrc1 + "m.jpg";		// 자른 주소에서 + @로 주소 만들기
			imgMinus1 = imgSrc1 + "p.jpg";	// 자른 주소에서 + @로 주소 만들기

			var winWidth = $(window).width();

			if(winWidth < 658){
				imgLoad1.attr('src', imgPlus1);
			} else {
				imgLoad1.attr('src', imgMinus1);
			}

		});
	}

	if(imgLoad2.hasClass('img-change2') == true){
		imgCh2.find('img').each(function(){
			var imgSrc2 = $(this).attr('src');	//현재 이미지 가져오기
			imgSrc2 = imgSrc2.slice(0,-5);		// 이미지 주소 자르기
			imgPlus2 = imgSrc2 + "m.jpg";		// 자른 주소에서 + @로 주소 만들기
			imgMinus2 = imgSrc2 + "p.jpg";	// 자른 주소에서 + @로 주소 만들기

			var winWidth = $(window).width();

			if(winWidth < 658){
				imgLoad2.attr('src', imgPlus2);
			} else {
				imgLoad2.attr('src', imgMinus2);
			}

		});
	}

}


//요일 - 탭메뉴
var weekSelect = function(){
	var weekMenu = $(".week-select-box .week-select-menu li");
	var weekMenuCon = $(".week-select-con");

	weekMenu.click(function(){

		var subjectIndex = weekMenu.index(this);
		var viewState = weekMenuCon.eq(subjectIndex).css("display");

		if(viewState =="none"){
			weekMenu.eq(subjectIndex).addClass("active");
			weekMenuCon.eq(subjectIndex).show();
		} else {
			weekMenu.eq(subjectIndex).removeClass("active");
			weekMenuCon.eq(subjectIndex).hide();
		}
	});
}

//요일 - 탭메뉴
var moWeekSelect = function(){
	var weekMenu = $(".mo-week-box .week-select-menu li");
	var weekMenuCon = $(".mo-week-con");

	weekMenu.click(function(){

		var subjectIndex = weekMenu.index(this);
		var viewState = weekMenuCon.eq(subjectIndex).css("display");

		if(viewState =="none"){
			weekMenu.eq(subjectIndex).addClass("active");
			weekMenuCon.eq(subjectIndex).show();
		} else {
			weekMenu.eq(subjectIndex).removeClass("active");
			weekMenuCon.eq(subjectIndex).hide();
		}
	});
}

//요일 - 타이머 display
var timerCon = function(){
	var timerMenu = $(".timer-con li .hour-click");
	var timerMenuCon = $(".timer-setting");

	timerMenu.click(function(){
		var menuIndex = timerMenu.index(this);
		timerMenuCon.hide();
		$(this).next(timerMenuCon).show();
	});

	$(document).click(function(e){
		if($(".timer-con li .hour-click, .timer-setting").has(e.target).length===0){
				timerMenuCon.hide();
		}
	});
}


//출강 강사 약정 - 모바일
var moStepEntyBox = function(){
	var moStepBoxAgree = $(".mo-enty-agree-qna h4");
	moStepBoxAgree.each(function(){
		$(this).click(function(){

			var slideMenu = $(this).next().css("display");

			$(this).next().hide();
            $(this).next().next().hide();
			$(this).removeClass("active");

			if(slideMenu == "none"){
                $(this).next().show();
				$(this).next().next().show();
				$(this).removeClass("active");
				$(this).addClass("active");
			}
		});
	});
}
//출강 강사 약정
var pcStepEntyBox = function(){
	var moStepBoxAgree = $(".teach-agree-box h4");
	moStepBoxAgree.each(function(){
		$(this).click(function(){

			var slideMenu = $(this).next().css("display");

			$(this).next().hide();
            $(this).next().next().hide();
			$(this).removeClass("active");

			if(slideMenu == "none"){
				$(this).next().show();
                $(this).next().next().show();
				$(this).removeClass("active");
				$(this).addClass("active");
			}
		});
	});
}
var moStepSlide = function(){

	var moStepTitle = $(".mob-adaptive .mo-step-click");
	var moStepTxt = $(".mob-adaptive .mo-step-open");

	moStepTitle.click(function(){
		var slideMenu = $(this).next().css("display");
		if(slideMenu == "none"){
			moStepTxt.hide();
			$(this).next().show();
			moStepTitle.removeClass("active");
			$(this).addClass("active");

		}else{
			moStepTxt.hide();
			moStepTitle.removeClass("active");
		}
	});

}

