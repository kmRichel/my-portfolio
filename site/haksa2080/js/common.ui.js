$(document).ready(function() {

	$(window).scroll(function() {
		var scrollHeigth = $(document).scrollTop();
		//console.log(scrollHeigth);
	  if(scrollHeigth > 60) {
		$("#wrap").addClass('scroll_fixed');
	  } else {
		$("#wrap").removeClass('scroll_fixed');
	  }
	});

	 $('#header .btn-family-site').click(function(){
		var famDisPlay = $(".fam_slide_area").css("display");

		if(famDisPlay=="none"){
			$(this).addClass("active");
			$('.fam_site_dim').show();
			$(".fam_slide_area").show();

			//첫번째 메뉴 swiper
			var swiperFamSlideArea = new Swiper('.fam_slide', {
				pagination: '.swiper-pagination',
				slidesPerView: "auto",
				paginationClickable: true,
				spaceBetween: 0,
				freeMode: true,
				initialSlide: 0,
				pagination: false

			});

			//두번째 contents swiper
			var swiperFamCategory = new Swiper('.fam_category', {
				autoHeight: true,
				slidesPerView: 1,
				loop:true,
				spaceBetween: 0,
				initialSlide: 0,
				pagination: false
			});

			//menu index
			var menuTabLen = $('.fam_slide .sw_menu > li').length;

			$('.fam_slide .sw_menu > li').on('click', function(e){
				$(this).addClass('active').siblings().removeClass('active');
				tabIdx = $(this).index();
				swiperFamCategory.slideTo(tabIdx+1, 300);
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
		}else {
			$(".btn-family-site").removeClass("active");
			$(".fam_slide_area").hide();
			$(".fam_site_dim").hide();
		}
	});

	//패밀리 사이트
	$('.fam_site_dim').click(function(){
		$(this).hide();
		$(".btn-family-site").removeClass("active");
		$(".fam_slide_area").hide();
	});

	// lnb
	$(".lnb_menu").on("click", function(){
		$(".lnb_all_menu").show();
		$(".lnb_all_menu").animate({
			"left":"0%"
		},300);

		$("html,body").css({
			"height":"100%",
			"overflow":"hidden"
		});

		return false;
	});

	// lnb
	$(".lnb_all_menu").find(".lnb_menu_close").on("click", function(){
		$(".lnb_all_menu").animate({
			"left":"-100%"
			},300,
			function(){
			$(".lnb_all_menu").hide();
		});
		$("html,body").css({
			"height":"auto",
			"overflow":"auto"
		})

		return false;
	});

	//메인 빅배너
	 var swiperMainBnrTop = new Swiper('.main_bnr_top', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      }
    });

	//메인 - 선배들의 합격 노하우
	var swiperMainPassTip = new Swiper('.main_bnr_tip', {
		 slidesPerView: 1.7,
		 spaceBetween: 10
	});

	//메인 - 스타교수
	var swiperMainPassTip = new Swiper('.main_bnr_star', {
		 slidesPerView: 2.7,
		 spaceBetween: 10
	});


	//강의신청 빅배너
	 var swiperBooksBnrTop = new Swiper('.books_bnr_top', {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      }
    });

	//교재신청 빅배너
	var booksBestStore = new Swiper('.books_best_store', {
		slidesPerView: 1.3,
		spaceBetween: 20,
		loop: true,
		centeredSlides: true
	 });

	//교재신청 상세보기 - 연계강의
	var swiperMainPassTip = new Swiper('.store_view_bnr', {
		 slidesPerView: 1.8,
		 spaceBetween: 10
	});

	 //학과 페이지
	var bookDepartGsnb = new Swiper('.book_depart_gsnb', {
		slidesPerView: "auto",
		spaceBetween: 15
	});

	$('.book_depart_gsnb ul > li').on('click', function(e){
		$(this).addClass('active').siblings().removeClass('active');
		e.preventDefault();
	});





	//alim dim 클릭시
	$(".alim_dim").click(function(){
		$(".alim_layer").hide();
	});

	//tab menu txt일떄
	$(".tab_menu_area .tab_tit li").click(function(){
		var tabMenuIndex = $(this).index();
		var tabTitEl = $(this).parent();

		$(tabTitEl).find("li").each(function(idx){
			$(this).addClass("active");
			if(tabMenuIndex != idx) {
				$(this).removeClass("active");
			}
		});
		$(tabTitEl).parent().find("div.tab_con_box").eq(tabMenuIndex).show().addClass("active").siblings('div').removeClass("active").hide();
	});

	//tab menu 이미지일때
	$(".tab_img_area .tab_tit li").click(function(){
		var tabTitIndex = $(this).index();
		var tabTitImgEl = $(this).parent();

		$(tabTitImgEl).find("li").each(function(idx){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off','_on'));
			if(tabTitIndex != idx) {
				$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on','_off'));
			}
		});

		$(tabTitImgEl).parent().find("div.tab_con_box").eq(tabTitIndex).show().addClass("active").siblings('div').removeClass("active").hide();
	});
});


//검색 패널
function btnClickClass(cls){
	$(".btnSearch").toggleClass("active");
	var elView = $("."+cls).css("display");
	if(elView == "block"){
		$("."+cls).hide();
	} else {
		$("."+cls).show();
	}
}

//clickBtn
function btnClickView(cls){
	$(".btnTit").toggleClass("active");
	var elView = $("."+cls).css("display");
	if(elView == "block"){
		$("."+cls).hide();
		$("."+cls).removeClass("active");
	} else {
		$("."+cls).show();
		$("."+cls).addClass("active");
	}
}



//알림 레이어 오픈
function alimLayer(elId){
	$("#" + elId).show();
}

//알림 레이어 닫기
function alimLayerClose(elId){
	$("#" + elId).hide();
}