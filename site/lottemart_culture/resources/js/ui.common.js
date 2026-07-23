$(document).ready(function(){
    //헤더관련
    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
        $('body').addClass('mob');

        if($('body').hasClass('adaptive') || $('body').hasClass('lecturer')){
            $('.pc-header').show();
            $('.mob-header').hide();
        } else {
            $('.pc-header').hide();
            $('.mob-header').show();
        }

    }

    header.gnb();
    header.branch_menu();
    header.branch_srch();
    header.word_srch();
    header.mobile();


    //인풋관련
    input.checkbox();
    input.selectbox();

    // 디바이스 체크
    device_check.ie();

    //지점선택 모바일
    branch_mobile();

    $(window).on('resize',function(){
        branch_mobile();
        device_check.ie();
        mob_container();

        setTimeout(function(){
            if($('.mob-header').find('.gnb-list').length > 0)
                $('.mob-header').find('.menu-area').css({height:$('#container').outerHeight()+51});
            else
                $('.mob-header').find('.menu-area').css({height:$('#container').outerHeight()});
        },100);
    });

	fileUploadDesign();

    //지점선택
    branch_select();

    //관계사 사이트
    relative_site();

    datepicker_wrap();

    //퀵메뉴
    quickmenu();

    // TOP 버튼
    btn_top();

    
    /* 레이업팝업 */
    
    layer_popup("call_center");
	layer_popup("standby_app");
	layer_popup("write_save");
	layer_popup("write_cancel");
	layer_popup("talk_reg");
	layer_popup("talk_fail");
	layer_popup("layer_student_sel");
	layer_popup("register_certificate");
	layer_popup("pay_cencle");
	layer_popup("partial_payment");
	layer_popup("best_branch");
	layer_popup("layer_lecturer");
	layer_popup("receipt_con");
	layer_popup("contact_change");
	layer_popup("coupon_print");
	layer_popup('family_regist',0)
	layer_popup("family_regist02");
	layer_popup("cctv_policy");

	//강사 레이어팝업
	layer_popup("application_form");
	layer_popup("temporarily_save");
	layer_popup("application_save");
	layer_popup("agreement_error");
	layer_popup("agreement_ok");
	layer_popup("company_desk");
	layer_popup("post_search");

	/* 업체 */
	layer_popup("layer_busines_sel");
	layer_popup("layer_busines_sel02");
   
    //달력 값 초기화
    datepicker_init();
});

// 헤더 GNB 관련
var header = {
    //메뉴
    gnb : function(){
        var item = $('.pc-header .lst_gnb-area > li > a');
        var menu = $('.pc-header .lst_gnb-area').children('[class^=menu]');
        var pc_gnb_area = $('.pc-header .lst_gnb-area');
        var pc_bch_srch = $('.pc-header .btn_branch-srch');
        var pc_word_srch = $('.pc-header .btn_word-srch');
        var pc_gnb_bg = $('.pc-header .gnb-bg');

        item.on('mouseover',function(){
            pc_gnb_area.children('[class^=menu]').removeClass('active');
            $(this).parent().addClass('active');

            if(pc_bch_srch.hasClass('active'))
                pc_bch_srch.removeClass('active');

            if(pc_word_srch.hasClass('active'))
                pc_word_srch.removeClass('active');

            $('.pc-header .menu-area .branch_find-area, .pc-header .word_srch-area').hide();

            if(item.siblings('ul').is(':hidden')){
                item.siblings().stop().slideDown(400);

                pc_gnb_bg.children('.bg2').show().stop().animate({
                    height : 250
                },{duration:250, speed:400, easing:'linear'});

                gnb_bg('302');
            } else {
                item.siblings().show();
            }
        });

        menu.children('ul').find('a').mouseover(function(){
            menu.removeClass('active');
            $(this).closest('ul').parent().addClass('active');
        });

        $('#header').mouseleave(function(){
            pc_gnb_area.children('[class^=menu]').removeClass('active');
            pc_bch_srch.removeClass('active');
            pc_word_srch.removeClass('active');

            if($('#wrap').hasClass('theme1')){
                pc_gnb_bg.css({height:0}).hide();
                pc_gnb_bg.children('.bg2').css({height:250});
                $('.pc-header .menu-inner .lst_gnb-area ul, .pc-header .menu-inner .branch_find-area, .pc-header .menu-inner .word_srch-area').hide();
            } else {
                pc_gnb_bg.css({height:50});
                pc_gnb_bg.children('.bg2').hide();
                $('.pc-header .menu-inner .lst_gnb-area ul, .pc-header .menu-inner .branch_find-area, .pc-header .menu-inner .word_srch-area').hide();
            }

            if($('#wrap').hasClass('theme1')){
                if($('.pc-header .gnb-area .btn-gnb').hasClass('active')){
                    $('.pc-header .gnb-area .btn-gnb').removeClass('active');
                    $('.theme1 .pc-header .menu-inner').hide();
                }
                $('.gnb-area').removeClass('over');
            }

            gnb_bg('50');
        });

        if($('#wrap').hasClass('theme1')){
            $('.pc-header .btn-gnb').on('mouseover',function(){
                if(!$('.gnb-area').hasClass('over')){
                    if($('.pc-header .btn-gnb').hasClass('active')){
                        $(this).removeClass('active');
                        $('.pc-header .gnb-bg').hide();
                        $('.theme1 .pc-header .menu-inner').hide();
                        $('.pc-header .lst_gnb-area ul').css({display:'none'});
                        gnb_bg('0');
                    } else {
                        $(this).addClass('active');
                        $('.pc-header .gnb-bg').show();
                        $('.theme1 .pc-header .menu-inner').show();
                        $('.pc-header .lst_gnb-area ul').stop().slideDown(400);
                        gnb_bg('302');
                    }
                    $('.gnb-area').addClass('over');
                }
            });
            
            
            
            
        }
    },

    //지점찾기
    branch_srch : function(){
        $('.pc-header .btn_branch-srch').on('mouseover',function(){
            $('.pc-header .lst_gnb-area').children('[class^=menu]').removeClass('active');
            $(this).addClass('active');

            if($('.pc-header .btn_word-srch').hasClass('active'))
                $('.pc-header .btn_word-srch').removeClass('active');

            $('.pc-header .lst_gnb-area ul, .pc-header .word_srch-area').hide();

            if($('.pc-header .menu-area .branch_find-area').is(':hidden')){
                $('.pc-header .menu-area .branch_find-area').stop().slideDown(400);
                $('.pc-header .gnb-bg .bg2').show().stop().animate({
                    height : 250
                },{duration:250, speed:400, easing:'linear'});

                gnb_bg('302');
            }
        });
    },

    // 지역별 메뉴
    branch_menu : function(){
        branch_spot();
    },

    // 검색어 영역
    word_srch : function(){
        $('.pc-header .btn_word-srch').on('mouseover',function(){
            $(this).addClass('active');
            $('.pc-header .lst_gnb-area').children('[class^=menu]').removeClass('active');

            if($('.pc-header .btn_branch-srch').hasClass('active'))
                $('.pc-header .btn_branch-srch').removeClass('active');

            $('.pc-header .lst_gnb-area ul, .pc-header .menu-area .branch_find-area').hide();

            if($('.pc-header .word_srch-area').is(':hidden')){
                $('.pc-header .word_srch-area').stop().slideDown(200);
                $('.pc-header .gnb-bg .bg2').show().stop().animate({
                    height : 154
                },{duration:250, speed:400, easing:'linear'});

                gnb_bg('206');
            }
        });
    },

    mobile : function(){
        var m_header = $('.mob-header');
        m_header.find('.btn-mgnb').on('click',function(){
            if($(this).hasClass('m_active')){
                $(this).removeClass('m_active');
                m_header.find('.menu-area').stop().animate({
                    left : -307
                },{duration:700, easing:'easeOutQuart'});

                $('.mask-box').remove();
            } else {
                $(this).addClass('m_active');
                m_header.find('.menu-area').stop().animate({
                    left : 0
                },{duration:700, easing:'easeOutQuart'});

                $('#container').append('<div class="mask-box"></div>');

                $('.mask-box').on('click', function(){
                    m_header.find('.menu-area').stop().animate({
                        left : -307
                    },{duration:700, easing:'easeOutQuart'});

                    $('.btn-mgnb').removeClass('m_active');
                    $('.mask-box').remove();
                });
            }
        });

        m_header.find('.btn_menu_cls').on('click',function(){
            m_header.find('.menu-area').stop().animate({
                left : -307
            },{duration:700, easing:'easeOutQuart'});

            $('.btn-mgnb').removeClass('m_active');
            $('.mask-box').remove();
        });

        if(m_header.is(':visible')){
            var btn_srch = $('.mob-header').find('.btn_top_srch');
            btn_srch.click(function(){
                if($('.top_srch-area').is(':hidden'))
                    $('.top_srch-area').stop().fadeIn(200);
                else
                    $('.top_srch-area').stop().fadeOut(200);
            });
        }

        var m_gnb_list = m_header.find('.lst_gnb-area').children('li');

        m_gnb_list.each(function(idx){
            var m_gnb = m_gnb_list.eq(idx).children('a');

            if(m_gnb_list.eq(idx).children('ul').length > 0){
                m_gnb.click(function(event){
                    event.preventDefault();
                    if($(this).parent().hasClass('active')){
                        $(this).parent().removeClass('active');
                        $(this).siblings().hide();
                    } else {
                        $(this).parent().addClass('active').siblings().removeClass('active').children('ul').hide();
                        $(this).siblings().show();
                    }
                });
            }
        });

        $('html').bind('touchstart', function(e){
            if(!$(e.target).hasClass('gnb-depth1')){
                if($('.gnb-depth1').parent().hasClass('active')){
                    $('.gnb-depth1').parent().removeClass('active');
                }
            }
        });

        //주메뉴
        var gnb_list_slide = new Swiper('.gnb-list', {
            slidesPerView: 'auto',
            pagination: '.gnb-list .swiper-pagination',
            paginationClickable: true,
            resistanceRatio: 0,
            loop: false,
            onTouchMove: function(swiper){
                $('.gnb-list').find('.swiper-slide').removeClass('active');
            }
        });

        var gnb_menu = $('.gnb-list').find('.swiper-slide').children('a');

        gnb_menu.click(function(e){
            e.preventDefault();
            var idx = gnb_list_slide.clickedIndex;
            var item = $('.gnb-list').find('.swiper-slide').eq(idx);

            if(item.hasClass('active')){
                item.removeClass('active');
            } else {
                item.addClass('active').siblings('li').removeClass('active');
            }
        });

        //branch_spot();

        $(window).on('load',function(){

            if($('.mob-header').find('.gnb-list').length > 0){
                $('.mob-header').find('.menu-area').css({height:$('#wrap').height()-50});
            } else {
                $('.mob-header').find('.menu-area').css({height:$('#container').outerHeight()});
            }

            mob_container();
        });

        btn_setup();
    }
}

var gnb_bg = function(area){
    $('.gnb-bg').stop().animate({
        height : parseInt(area)
    },{duration:250, speed:400, easing:'linear'});
}


/* 디바이스 및 IE 체크 */
var device_check = {
    ie : function(){
        var agent = navigator.userAgent.toLowerCase();

        if(agent.indexOf('msie') != -1){
            if(parseInt(agent.split('msie')[1]) >= 8){
                this.resize();
            }
        } else {
            this.resize();
        }

    },

    resize : function(){
        var w_wd = $(window).width();
        var scr_wd = getScrollBarWidth();

        if(!$('body').hasClass('lecturer') && !$('body').hasClass('adaptive') && !$('body').hasClass('mob-adaptive')){
            if(w_wd < 640){
                $('body').addClass('mobile');
                $('body').removeClass('tablet');
                $('.pc-header').hide();
                $('.mob-header').show();
            } else if(w_wd < (1025 - scr_wd) && w_wd >= (657-scr_wd)){
                $('body').addClass('tablet');
                $('body').removeClass('mobile');
                $('.pc-header').hide();
                $('.mob-header').show();
            } else {
                $('body').removeClass('mobile tablet');
                $('.pc-header').show();
                $('.mob-header').hide();
            }
        } else {
            $('body').removeClass('mob');
        }
    }
}

var input = {
    checkbox : function(){
        var checkbox = $('.checkbox, .lay-checkbox').children('input[type="checkbox"]');
        var checkWrap = checkbox.parent();
        
        checkWrap.each(function(index){
            if(checkWrap.eq(index).children('input[type="checkbox"]').is(':checked')){
                checkWrap.eq(index).addClass('active');
            }
        });

        $('.chk_all').click(function(){
            if($('.chk_all').parent().hasClass('active')){
                $(this).closest('table').find('span.checkbox').removeClass('active');
                $(this).closest('table').find('input[type="checkbox"]').prop('checked',false);
            } else {
                $(this).closest('table').find('span.checkbox').addClass('active');
                $(this).closest('table').find('input[type="checkbox"]').prop('checked',true);
            }
        });
        
        var checkbox_list = $('.chk_all').closest('table').find('tbody').find('input[type="checkbox"]');
        checkbox_list.click(function(){
            var total = checkbox_list.length;
            var checked_list = $('.chk_all').closest('table').find('tbody').find('input[type="checkbox"]:checked');
            var count = checked_list.length;

            if(total == count){
                $('.chk_all').prop('checked',true).parent().addClass('active');
            } else {
                $('.chk_all').prop('checked',false).parent().removeClass('active');
            }
        });

        checkbox.click(function(){
            var $this = $(this);
            
            var checkbox_total = $this.closest('table').find('tbody').find('input[type="checkbox"]').length;
            var checked_total = $this.closest('table').find('tbody').find('input[type="checkbox"]:checked').length;
            
            
            if($this.prop('checked') == true){
                $this.prop('checked',true);
                $this.parent().addClass('active');
                
                if(checkbox_total == checked_total){
                    $('.chk_all').prop('checked',true).parent().addClass('active');
                }
                
            } else {
                $this.prop('checked',false);
                $this.parent().removeClass('active');
                
                if(checkbox_total != checked_total){
                    $('.chk_all').prop('checked',false).parent().removeClass('active');
                }
            }
        });
    },

    selectbox : function(){
        if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
            return;
        } else {
            if(!$('body').hasClass('mob-adaptive')){
                $('select').selectOrDie();
            }
        }
    }
}

/* 퀵메뉴 */
var quickmenu = function(){
    if($('.quickmenu-wrap').length > 0){
        var headea_ht = $('#header').outerHeight();
        var quickmenu = $('.quickmenu-wrap');
        var oTop = quickmenu.offset().top;
        var offset_y = 286;
        var space = 100;

        $(window).scroll(function(){
            var now_scroll = $(document).scrollTop();

            if(now_scroll == 0){
                oTop = offset_y;
            } else {
                oTop =  offset_y < (offset_y/2)+now_scroll ? (offset_y/2)+now_scroll : offset_y;
            }

            quickmenu.stop().animate({
                top : oTop
            },300,'linear');
        });
    }
}


/* 지역점 지점 */
var branch_spot = function(){
    $('.branch-menu li').each(function(index){
        var tabType = $(this).index();
        if($(this).hasClass('active')){
            $('.branch-con').eq(tabType).show();
        }

        $(this).mouseover(function(){
            $(this).addClass("active").siblings('li').removeClass('active');
            $(this).parent().siblings('div').eq(tabType).show().siblings('div').hide();
        });

        $('.branch_find-wrap').on('mouseleave',function(){
            if($(this).closest('.view-table').length < 1 || $(this).hasClass('none')){
                $(this).hide().siblings('.btn_branch-sel').removeClass('active');
            }
        });
    });

    if($('body').hasClass('mob')){
        var btn_sel = $('.branch_selc-wrap').children('.btn_branch-sel');
        if(btn_sel.hasClass('active')){
            btn_sel.click(function(){
                $(this).removeClass('active').siblings('div').hide();
            });
        }
    }
}

/* 레이어팝업 */
var layer_popup = function(layer, lay_top){
    var pop = $('.layer-pop');
    var btn_cls = pop.children('.lay_tit-area').children('a');
    var btn_bcls = pop.find('.btn-area').children('a');
    var win_wd = $(window).width();
    var win_ht = $(window).height();
    var layer_pop_wd;
    var layer_pop_ht;
    var scr_top = 0;
    var wrap = $('#wrap');

    $(window).scroll(function(){
        scr_top = $(window).scrollTop();
    });

    $('.'+layer).click(function(e){
        e.preventDefault();
        $(this).blur();
        
        if(pop.hasClass(layer+'-pop')){
            layer_pop_wd = $('.'+layer+'-pop').outerWidth();
            layer_pop_ht = $('.'+layer+'-pop').outerHeight();
        }
        
        
        if(lay_top == 0){
            pop.css({top:lay_top,left:(win_wd-layer_pop_wd)/2});
        } else {
            if($('body').height() > layer_pop_ht){
                pop.css({top:((win_ht-layer_pop_ht)/2+scr_top),left:(win_wd-layer_pop_wd)/2});
            } else {
                pop.css({top:0,left:(win_wd-layer_pop_wd)/2});
            }
        }

        $('.'+layer+'-pop').show();
        $('.'+layer+'-pop').after('<div class="mask"></div>');
    });


    btn_cls.on('click', function(e){
        e.preventDefault();
        pop.hide();
        $('.mask').remove();
    });

    btn_bcls.on('click', function(e){
		e.preventDefault();
		pop.hide();
		$('.mask').remove();
	});
    
    var header_ht = $('#header').height();
    var footer_ht = $('#footer').height();
    var pop_header_ht = pop.children('.lay_tit-area').height();
    var pop_content = pop.children('.lay_cont-area');
    
    if($('body').find('#wrap').length > 0){
        if(wrap.height() < pop.height()){
            pop_content.css({height:($('#wrap').height() - pop_header_ht - 75)+'px'});
        } else if(wrap.height()-header_ht < pop.height()){
            pop_content.css({height:($('#wrap').height() - pop_header_ht - header_ht - footer_ht)+'px'});
        }
    } else {
        pop_content.css({height:'auto'});
    }
    
    
}

//탭 메뉴
var tabPageMenu = function(){
	$('.page-menu li').click(function(){
		var tabType = $(this).index();
		$('.page-menu li').each(function(index){
			$(this).addClass("active");

			if(tabType != index){
				$(this).removeClass("active");
			}
		});
		$('.page-con').eq(tabType).show().siblings('div').hide();
	});
}

//클릭 active
var clickActive = function(){
	$(".day-btn-wrap a").click(function(){
		var clickType = $(this).index();
		$(".day-btn-wrap a").each(function(index){
			$(this).addClass("active");

			if(clickType != index){
				$(this).removeClass("active");
			}
		});

	});
}



//파일 업로드 - 마이페이지
var fileUploadDesign = function(){
	var fileTarget = $('.filebox .upload-hidden');
	fileTarget.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}

		$(this).siblings('.upload-name').val(filename);
	});
};


var branch_select = function(){
    var branch_sel = $('.btn_branch-sel');
    branch_sel.click(function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).siblings('.branch_find-wrap').hide();
        } else {
            $(this).addClass('active');
            $(this).siblings('.branch_find-wrap').show();
        }
    });
}

var branch_mobile = function(){
    if($('body').hasClass('mobile') || $('body').hasClass('tablet') || $('body').hasClass('mob-adaptive')){
        if($('body').hasClass('mobile') || $('body').hasClass('mob-adaptive')){
            branch_add_item();
        } else {
            branch_remove_item();
        }

        if($('.mob-header').is(':visible')){
             branch_add_item();
        }
    } else {
        branch_remove_item();
    }
}

var branch_add_item = function(){
    var branch_menu;
    var branch_con;

    if($('body').hasClass('tablet')){
        branch_menu = $('.tablet').find('#contents .branch-menu');
        branch_con = $('.tablet').find('#contents .branch-con');
    } else if($('body').hasClass('mobile')) {
        branch_menu = $('.mobile').find('#contents .branch-menu');
        branch_con = $('body').find('#contents .branch-con');
    } else if($('body').hasClass('mob-adaptive')) {
        branch_menu = $('.mob-adaptive').find('#contents .branch-menu');
        branch_con = $('.mob-adaptive').find('#contents .branch-con');
    }

    var mh_branch_menu = $('.mob-header').find('.branch-menu');
    var mh_menu_cnt = mh_branch_menu.children('li').length;

    if(mh_menu_cnt < 9){
        mh_branch_menu.children('li:nth-child(3n+1)').addClass('item');
        mh_branch_menu.children('li:last-child').after('<li></li>');
    }


    branch_menu.each(function(index){
        var list = branch_menu.eq(index).children('li');

        if(list.length < 9){
            branch_menu.children('li:nth-child(3n+1)').addClass('item');
            branch_menu.children('li:last-child').after('<li></li>');
        }
    });


    branch_con.each(function(index){
        var list = branch_con.eq(index).find('li:nth-child(3n+1)');

        if(!list.hasClass('item')){
            list.addClass('item');
        }
    });


    if($('body').hasClass('tablet')){
        var b_selc_wrap = $('#contents').find('.branch_selc-wrap');

        b_selc_wrap.each(function(){
            var b_list = $(this).find('.branch-menu');
            if(b_list.children('li').length == 9){
                b_list.children('li:last-child').remove();
            }
        });
    }
}

var branch_remove_item = function(){
    $('.branch-menu').children('li').removeClass('item');
    $('.branch-con').children('li').removeClass('item');

    $('.branch-menu').each(function(index){
        if($(this).children('li').length == 9){
            $(this).children('li:last-child').remove();
        }
    });
}



var relative_site = function(){
    var el = $('.foot .family > a');
    el.click(function(e){
        e.preventDefault();
        if($(this).siblings('ul').is(':hidden')){
            $(this).siblings('ul').show();

            $(this).parent().mouseleave(function(){
                $(this).children('ul').hide();
            });

        } else {
            $(this).siblings('ul').hide();
        }
    });
}

var getScrollBarWidth = function() {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild(inner);

	document.body.appendChild(outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;

	if (w1 == w2) {
		w2 = outer.clientWidth;
	}

	document.body.removeChild(outer);

    if($('body').children('.layer-pop').length > 0 && $('#wrap').siblings('.layer-pop').length > 0){
        return (w1 - w2);
    } else {
        if($(window).height() < $('.layer-pop').outerHeight()){
            return (w1 - w2);
        } else {
            return 0;
        }
    }
}

function datepicker_wrap(){
    if($('.datepicker').length > 0){
        $('.datepicker').focus(function(){
            $(this).blur();
        });
        $('.datepicker').wrap('<span class="datepicker-wrap"></span>');
        /*$('.date-area').children('.datepicker-wrap').children('input[type=text]').attr('placeholder', $.datepicker.formatDate($.datepicker.ATOM, new Date()));*/
    }
}

function btn_setup(){
    $('.setup-area').css({right:-($(window).width()),height:$(document).height()});

    var area = $('.btn_setup-area');
    var checkbox = area.find('input[type="checkbox"]');


    area.each(function(index){
        var check = $(this).find('input[type="checkbox"]');

        if(check.is(':checked')){
            check.closest('.btn_setup-area').addClass('on');
            check.siblings('.ico').addClass('active');
        }
    });

    checkbox.click(function(){
        var setup = $(this).closest('.btn_setup-area');
        if($(this).is(':checked')){
            if(setup.hasClass('on')){
                setup.removeClass('on');
                $(this).siblings('.ico').removeClass('active');
            }else{
                setup.addClass('on');
                $(this).siblings('.ico').addClass('active');
            }
        } else {
            setup.removeClass('on');
            $(this).siblings('.ico').removeClass('active');
        }
    });

    var setup_open = $('.lst_gnb-area').find('.setup').children('a');
    var setup_cls = $('.setup-area').children('h3').children('a');

    setup_open.on('click',function(e){
        e.preventDefault();
        $('.setup-area').show().stop().animate({
            right : 0
        },{duration:700, easing:'easeOutQuart'});
    });


    setup_cls.on('click',function(e){
        e.preventDefault();
        $('.setup-area').stop().animate({
            right : -($(window).width())
        },{duration:700, easing:'easeOutQuart', complete:function(){
            $('.setup-area').hide();
        }});
    });


    var el = $('.setup_inner-list').children('a');

    el.on('click',function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });
}

function mob_container(){
    if($('body').hasClass('mob') || $('body').hasClass('mobile') ||$('body').hasClass('tablet') || $('body').hasClass('mob-adaptive')){
        $('.menu-inner').css({height:'auto'});
    }
    /*
    if($('body').hasClass('mob') || $('body').hasClass('mobile') ||$('body').hasClass('tablet') || $('body').hasClass('mob-adaptive')){

        var win_ht = $(window).height();
        var head_ht = 51;
        var cont_ht = $('#container').outerHeight();
        var foot_ht = $('#footer').outerHeight();

        if(win_ht > head_ht+cont_ht+foot_ht){
            $('.menu-inner').css({height:head_ht+foot_ht});
        } else {
            $('.menu-inner').css({height:'auto'});
        }
    } else {
        $('.menu-inner').css({height:'auto'});
    }
    */
}

function btn_top(){
    var contents = $('#contents');
    var path;
    var link = document.location.href;

    link.indexOf('main') > 0 ? path = 'resources' : path = '../resources';

    contents.after('<div class="btn_top-area"><a href="#"><img src="'+path+'/images/btn/btn_top.gif" alt="TOP" /></a></div>');

    var top = $('.btn_top-area').children('a');

    if($(window).scrollTop() > 0){
         $('.btn_top-area').fadeIn(200);
    }

    $(window).scroll(function(){
        var win_ht = $(window).height();
        var win_scr = $(window).scrollTop();
        var off_y = $('#footer').offset().top;

        if(off_y <= win_ht + win_scr){
            $('.btn_top-area').css({position:'absolute'});
        } else {
            $('.btn_top-area').css({position:'fixed'});
        }


        if($(document).scrollTop() > 0){
            $('.btn_top-area').fadeIn(200);
        } else if($(document).scrollTop() == 0){
            $('.btn_top-area').fadeOut(200);
        }

        top.on('click',function(e){
            e.preventDefault();
            $(document).scrollTop(0);
        });
    });
}

function datepicker_init(){
    var dpickter = $(document).find('.datepicker');
    
    dpickter.click(function(){
        if(!$(this).val('')){
            $(this).attr({value:''});
        }
    });
    
    
}