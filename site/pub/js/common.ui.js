$(document).ready(function() {

	// 모바일 커뮤니티 이미지 확대
    $('.tb_view img').on('click',function(){
        if($(this).parent('a').length){

        }else{
            imgView($(this).attr('src'));
        }
    });

	//lnbMenu
	lnbMenu();

	//메인 최근 수강 내역
	layerMainLect();

	//tabMenuType
	tabMenuType.menuTxt();
	tabMenuType.menuImg();

	//결제관리
	myPayclick();

	//acodianMenu
	acodianMenu.orderTxtAg();

	//마이페이지 펼침 메뉴
	myPageDisplay();


    // 패밀리 사이트 190403
		var click=0; //클릭횟수
		var menu_default = 0;
		$('#header .btn_family_open').click(function(){
        var dimWidth = $(window).width();
        var dimHeight = $(window).height();

        if($(this).hasClass("active")  == false){
            $(this).addClass("active");
            $(this).parent().next("#header .fam_slide_area").show();
            $('.familysite_dim').css({'width':dimWidth,'height':dimHeight} - 60);
            $("#header").after('<div class="familysite_dim"></div>');

            var swiperFamSlideArea = new Swiper('.fam_slide', {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                paginationClickable: true,
                watchSlidesVisibility:true,
                spaceBetween: 0,
                freeMode: true,
                pagination: false

            });

            //두번째 contents swiper
            var swiperFamCategory = new Swiper('.fam_category', {
                autoHeight: true,
                slidesPerView: 1,
                loop:true,
                spaceBetween: 0,
                pagination: false,
                speed:0
            });

            //menu index
            var menuTabLen = $('.fam_slide .sw_menu > li').length;

            $('.fam_slide .sw_menu > li').on('click', function(e){
                tabIdx = $(this).index();
								menu_default = tabIdx;
                swiperFamCategory.slideTo(tabIdx+1);
                e.preventDefault();
            });

            //두번째 contents slide 일때 이벤트
            swiperFamCategory.on('slideChange', function(){
                var famCategoryIdx = swiperFamCategory.activeIndex - 1;
                if( famCategoryIdx < 0 ) {
                    famCategoryIdx = menuTabLen - 1;
                } else if( famCategoryIdx == menuTabLen ){
                    famCategoryIdx = 0;
                }
                $('.sw_menu > li').removeClass('active').eq(famCategoryIdx).addClass('active');
                if( famCategoryIdx < menuTabLen ) {
                    swiperFamSlideArea.slideTo(famCategoryIdx-1, 300);

                }
			});

					if(click==0) {
						$('.fam_slide_area').children('.fam_slide').children('.sw_menu').find('li').eq(1).trigger('click');
					} else {
						$('.fam_slide_area').children('.fam_slide').children('.sw_menu').find('li').eq(menu_default).trigger('click');
					}

						click++;

        }else {
            $(this).parent().next("#header .fam_slide_area").hide();
            $(this).removeClass('active');
            $(".familysite_dim").remove();
        }
    });

	//공통 탭
	if($(".js-tab-type1").length > 0){
		com_tab();
	}

	$('.js-detail-btn').click(function(){
		if($(this).hasClass("on")  == 0){
			$(this).addClass("on");
			$($(this).attr('href')).show();
		}else{
			$(this).removeClass("on");
			$($(this).attr('href')).hide();
		}
		return false;
	});

	//input type Checkbox
	$('.checkbox').children('input[type="checkbox"]').parent().each(function(index){
		if($('.checkbox').children('input[type="checkbox"]').parent().eq(index).children('input[type="checkbox"]').is(':checked')){
			$('.checkbox').children('input[type="checkbox"]').parent().eq(index).addClass('active');
		}
	});

	$(' .check-radio').children('input[type="checkbox"]').parent().each(function(index){
		if($('.check-radio').children('input[type="checkbox"]').parent().eq(index).children('input[type="checkbox"]').is(':checked')){
			$('.check-radio').children('input[type="checkbox"]').parent().eq(index).addClass('active');
		}
	});

	$('.check-radio').children('input[type="checkbox"]').click(function(){
		var $this = $(this);
		if($this.is(':checked')){
			$this.parent().addClass('active');
		} else {
			$this.parent().removeClass('active');
		}
	});

	$('.checkbox').children('input[type="checkbox"]').click(function(){
		var $this = $(this);
		if($this.is(':checked')){
			$this.parent().addClass('active');
		} else {
			$this.parent().removeClass('active');
		}
	});

	//체크 라디오박스
	$(".radio-box input[type='radio']").click(function(){
		  var $this = $(this);
		  var chekOff = $(this).parent().parent().parent().parent();

		  if(chekOff.is('.none_off')){
			//체크 해제
			$this.prop('checked', false);

		  } else {
			$(".radio-box label").removeClass("active");
			  if($this.is(':checked')){
					$this.next().addClass("active");
			  }
		  }
	});

	$(".radio-square input[type='radio']").click(function(){
		  var $this = $(this);
		  var chekOff = $(this).parent().parent().parent().parent();

		  if(chekOff.is('.none_off')){
			//체크 해제
			$this.prop('checked', false);

		  } else {
			$(".radio-square label").removeClass("active");
			  if($this.is(':checked')){
					$this.next().addClass("active");
			  }
		  }
	});

	/* 최상단 이동 */
	$(window).scroll(function() {
		var $topScroll = $('#quickTop');
		var $flotiongScroll = $('.floting_box');
		var $headScroll = $('#header');
		var $footLine = $('#footer');

		if($(this).scrollTop() > 0) {
			$topScroll.fadeIn("fast");
			$flotiongScroll.fadeIn("slow");
			//$headScroll.addClass('active');
		}else{
			$topScroll.fadeOut("fast");
			$flotiongScroll.fadeOut("slow");
			//$headScroll.removeClass('active');
		}
	});

	//리사이징
	$(window).bind('resize', function() {
       //레이어 팝업
	   $('.layer-popup, #layerPostFind').center();
    });

	//멤버십
	$(".chk_area.input_chk label .sub_ico").hover(function(){
		var x = $(this).offset().left,
			y = $(this).offset().top - 5;
		if($("#login_info").hasClass("on") == false){
			$("#login_info").fadeIn(100).addClass("on");
			$("#login_info").css({'left':x,'top':y});
		}
	});

	//체크박스 스크립트
	$(".input_chk input").click(function(){
		if($(this).parents(".input_chk").hasClass("radio_input") == false){
			if($(this).is(':checked') == false){
				$(this).parents(".input_chk").removeClass("on");
			}else{
				$(this).parents(".input_chk").addClass("on");
			}
		}else{
			//if($(this).is(':checked') == true){
				var $this = $(this);
				$("input[name="+$this.attr("name")+"]").each(function(){
					$(this).parents(".radio_input ").removeClass("on");
					$this.parents(".input_chk").addClass("on");
				})
			//}
		}
	});

	//약관동의
	$(".arrow_btn").click(function(){
		$(this).toggleClass("on");
	});

});


//toggle
var myPayclick = function(){
	var tgTit = $('.my_cp_area .cp_tit');

	tgTit.click(function(){
		$(this).toggleClass("active");
		$(this).next(".cp_txt").toggleClass("active");
	});
}


// lnb_area
var lnbMenu = function(){
	var lnbArea = $('.lnb_area');
	var showDisplay = null;

	lnbArea.find('>ul>li .btn-arrow').click(function(){
		var showDisplay = $(this).next("ul").css("display");
			if(showDisplay == "none"){
				lnbArea.find('>ul>li>ul').hide();
				lnbArea.find('>ul>li').removeClass('active');
				$(this).next('ul').show().parent('li').addClass('active');

			} else {
				$(this).next('ul').hide().parent('li').removeClass('active');
			}
	});

}

// 최근 수강 내역
var layerMainLect = function(){
	var lectLeyerOpen = $(".main_lect_open");
	var lectLeyerBox = $(".main_lect_box");

	//메인 최근 수강 신청
	lectLeyerOpen.click(function(){
		lectLeyerOpen.hide();
		lectLeyerBox.animate({bottom:0});
		dimLayer.open();
	});

	lectLeyerBox.find(".layer_lect_close").click(function(){
		lectLeyerOpen.show();
		lectLeyerBox.animate({bottom:-1000});
		dimLayer.close();
	});
}

//마이페이지 펼침 메뉴
var myPageDisplay = function(){
	var clickEven = $(".myPage_top .icon_myslide");
	var showCon = $(".showMyCon .register_certificate");

	clickEven.click(function(){
		var _this = $(this);
			$(_this).parent().next().slideToggle(function() {
			if ($(this).is(':visible')) {
				_this.text('접힘').addClass("active");
			} else {
				_this.text('펼침').removeClass("active");
			}
		});

	});

}
//탭 메뉴
var tabMenuType = {
	//텍스트일때
	menuTxt  : function(){
		var tabMenuTit = $(".tab_menu_area .tab_tit li");
		var tabConBox = $('.tab_menu_area .tab_con_box');

		tabMenuTit.click(function(){
			var tabMenuIndex = $(this).index();
			tabMenuTit.each(function(idx){
				$(this).addClass("active");
				if(tabMenuIndex != idx) {
					$(this).removeClass("active");
				}
			});
			tabConBox.eq(tabMenuIndex).show().addClass("active").siblings('div').removeClass("active").hide();
		});
	},

	//이미지일때
	menuImg  : function(){
		var tabMenuTitI = $(".tab_img_area .tab_tit li");
		var tabConBoxI = $('.tab_img_area .tab_con_box');

		tabMenuTitI.click(function(){
			var tabTitIndex = $(this).index();
			tabMenuTitI.each(function(idx){
				$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off','_on'));
				if(tabTitIndex != idx) {
					$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on','_off'));
				}
			});

			tabConBoxI.eq(tabTitIndex).show().addClass("active").siblings('div').removeClass("active").hide();
		});
	}
}

//acodianMenu
var acodianMenu = {
	orderTxtAg : function(){
		var acodianMenuTit = $(".acodian_menu dt a");
		var acodianMenuBox = $('.acodian_menu dd');

		acodianMenuTit.click(function(){
			var $this = $(this);
			var viewDisplay = $this.parent().next("dd").css("display");
			if(viewDisplay == "none"){
				acodianMenuBox.hide();
				acodianMenuTit.parent().removeClass("active");
				$this.parent().addClass("active").next().show();
			} else  {
				acodianMenuTit.parent().removeClass("active");
				acodianMenuBox.hide();
			}
		});
	}
}


// layer mask
var dimLayer ={
	open : function(){
		var dimWid = $(window).width();
		var dimHei = $(window).height();

		$('.mask-box').css({'width':dimWid,'height':dimHei});
		$("#header").before('<div class="mask-box"></div>');
	},
	close : function(){
		$(".mask-box").remove();
	}
}

//공통 탭 클릭시
function com_tab(){
	$(".js-tab-type1 li a").click(function(){
		var $div = $(this).parent().parent().parent();
		var $li = $(this).parent();
		var nm = $li.parent().find("li").index($li);

        if($(this).hasClass('return')) {
            alert('준비중입니다.');
        } else {
            $li.siblings("li").removeClass("on");
            $li.addClass("on");
            $div.find(">.js-tab-type1-con").hide();
            $div.find(">.js-tab-type1-con").eq(nm).show();
            return false;
        }
	});
}

//레이어 팝업 오픈
function ly_open(obj) {
    var _temp = $('#' + obj);
	var _head = $('header').outerHeight() + $('.top_banner').outerHeight();
	var _pos = $(document).scrollTop();
	var _wh = $(window).innerHeight();

    _temp.fadeIn();
    _temp.children('.lypop_inner').css('margin-top', + (_pos - _head + _wh*0.5 - _temp.children('.lypop_inner').outerHeight() *0.5) + 'px' );

	_temp.find('.bg').bind('touchstart', function(e){
		_temp.fadeOut();
		e.preventDefault();
	});

	$('header').bind('touchstart', function(){
		_temp.fadeOut();
	});
}

// 커뮤니티 게시판 이미지 확대 기능
function imgView(img){
    img1= new Image();
    img1.src=(img);
    imgControll(img);
}
function imgControll(img){
    if((img1.width!=0)&&(img1.height!=0)){
        viewImage(img);
    }
}
function viewImage(img){
    W=img1.width;
    H=img1.height;
    O="width="+W+",height="+H+",scrollbars=yes";
    imgWin=window.open("","",O);
    imgWin.document.write("<html><head><title>이미지상세보기</title></head>");
    imgWin.document.write("<body topmargin=0 leftmargin=0>");
    imgWin.document.write("<img src="+img+" onclick='self.close()' style='width:100%;' title ='닫기'>");
    imgWin.document.close();
}

//레이어 팝업 닫기
function ly_close(obj) {
    var _temp = $('#' + obj);
	_temp.fadeOut();
}

//레이어 팝업
function layerOpen(IdOpen){
	//화면의 높이와 너비를 구한다.
	var maskWidth = $(window).width();
	var maskHeight = $(window).height();

//	$('body').addClass("no-scroll");
	$('.mask-box').css({'width':maskWidth,'height':maskHeight});
	$(IdOpen).before('<div class="mask-box"></div>');
	$(IdOpen).show();
	// body top 5000 문제 하단 영역 늘어남 190514
	// var top = $("body").scrollTop(); $("body").css('position','fixed').css('overflow','hidden').css('top',-top).css('width','100%').css('height',top+5000);
	 var top = $("body").scrollTop(); $("body").css('position','fixed').css('overflow','hidden').css('top',-top).css('width','100%');

};

//레이어 팝업 닫기
function layerClose(IdClose){
	$('body').removeClass("no-scroll");
	$(IdClose).hide();
	$(".mask-box").remove();
	var top = $("body").position().top; $("body").css('position','relative').css('overflow','auto').css('top',0).scrollTop(-top);
}

//리사이징
$.fn.center = function () {
    this.css("position","fixed");
    this.css("top", ( $(window).height() - this.outerHeight() ) / 2  + "px");
    this.css("left", ( $(window).width() - this.outerWidth() ) / 2 + "px");
    return this;
}

//멤버쉽 토글
function toggle_btn(el,etc){
	$(function(){
		$("."+etc).hide();
		$("#"+el).toggle();
	});
}



function getId(id)
{
    return document.getElementById(id);
}

function sendAjax(url, data, callback, error_callback, async, method, data_type)
{
    $.ajax({
        type: ((method !== undefined) ? method : 'POST'),
        url: url,
        data: data,
        async: (async !== undefined) ? async : false,
        dataType: (data_type !== undefined) ? data_type : 'json'
    }).success(function (data, status, req) {
        if(typeof callback === "function") {
            callback(data);
        }
    }).error(function(req, status, err) {
        if(typeof error_callback === "function") {
            //alert("code:"+req.status+"\n"+"message:"+req.responseText+"\n"+"error:"+err);
            var json = JSON.parse(req.responseText);

            if (req.status == 422) {
                json = { 'ret_cd': false, ret_msg: Object.values(json)[0][0] };
            }

            error_callback(json, req.status);
        }
    });
}

var rooturl = 'https://mpublic.hackers.com';
