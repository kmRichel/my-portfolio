$(document).ready(function(){

	//selectbox
	$("select").selectOrDie();

	//placeholder
	$("input").placeholder();

	//챗봇 닫기
	$( ".chatbotHead .btnClose" ).click(function() {
		$( "#chatbot_popup").hide();
	});

	//챗봇 상단 추가 레이어
	$( ".chatbotHead .btnPrev" ).click(function() {
		$( ".chatbotLayerBox" ).toggle();
	});

	//챗봇 상단 추가 레이어 닫기
	$(".chatbotLayerHead .chatbotLayer-close").click(function(){
		$( ".chatbotLayerBox" ).toggle();
	});

	//하단 부가옵션 닫기 열기
	$(".chatbotFoot .counsel-option-open, .counsel-option-layer .addClose-btn").click(function(){
		 $( ".chatbotFoot .counsel-option-layer" ).slideToggle("fast",function(){
			if($('.chatbotFoot .counsel-option-layer').is(':hidden')){
				$(".chatbotFoot .counsel-option-open img").attr({
					src: "images/chat-btn-plus.png",
					alt: "상담 부가창 버튼 열기"
				});
			} else {
				$(".chatbotFoot .counsel-option-open img").attr({
					src: "images/chat-btn-plus-on.png",
					alt: "상담 부가창 버튼 닫기"
				});
			}
		 });
	});

	//체크 라디오박스
	$(".radio-box input[type='radio']").click(function(){
		  var $this = $(this);
		  $(".radio-box label").removeClass("active");

		  if($this.is(':checked')){
                $this.next().addClass("active");
            }
	});

	//레이어 시간선택
	$(".reservation-time dd").click(function(){
		$(".reservation-time dd").removeClass("active");
		$(this).addClass("active");

	});


	//레이어 인원 선택 1씩 증가
	$('.numUp').click(function(){
		var nIndex = $('.numUp').index(this);
		var numberCount = $(".numCount:eq("+nIndex+")").text();
		numberCount = $(".numCount:eq("+nIndex+")").text(numberCount*1+1);
	});

	//레이어 인원 선택 1씩 감소
	$('.numDown').click(function(){
		var nIndex = $('.numDown').index(this);
		var numberCount = $(".numCount:eq("+nIndex+")").text();

		if(numberCount != 0){
			numberCount = $(".numCount:eq("+nIndex+")").text(numberCount*1-1);
		}
	});

	//레이어 팝업 - 달력
	$(".dayTableList td a").click(function(){
		$(".dayTableList td a").removeClass("on");
		$(this).addClass("on");
	});


	//리사이징
	$(window).bind('resize', function() {
       $('.layer-popup').center();
    });

	//input type Checkbox
	$('.checkbox').children('input[type="checkbox"]').parent().each(function(index){
		if($('.checkbox').children('input[type="checkbox"]').parent().eq(index).children('input[type="checkbox"]').is(':checked')){
			$('.checkbox').children('input[type="checkbox"]').parent().eq(index).addClass('active');
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
});

//레이어 팝업
function layerPopup(IdName){

	//화면의 높이와 너비를 구한다.
	var maskWidth = $(window).width();
	var maskHeight = $(window).height();

	$('.mask-box').css({'width':maskWidth,'height':maskHeight});
	$(IdName).before('<div class="mask-box"></div>');
	$(IdName).show();
	$(IdName).center();
};

//레이어 팝업 닫기
function layerPopupClose(IdInfo){
	$(IdInfo).hide();
	$(".mask-box").remove();
}

//리사이징
$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $("#chatbot_popup").height() - this.outerHeight() ) / 2  + "px");
    this.css("left", ( $("#chatbot_popup").width() - this.outerWidth() ) / 2 + "px");
    return this;


}

