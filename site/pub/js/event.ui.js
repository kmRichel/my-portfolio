$(document).ready(function() {

	user_id = $("#user_id").val();
    login_page = $("#login_page").val();

	//tab
	$(".js-tab li a").click(function(){
		var $li = $(this).parent();
		var $div = $(this).parent().parent().parent();
		var nm = $li.parent().find("li").index($li);
		$li.siblings("li").removeClass("on");
		$li.addClass("on");

		$(".js-tab-con",$div).hide();
		$(".js-tab-con",$div).eq(nm).show();
		return false;
	});

	//tab id로 제어 2014-10-27 추가
	if($(location).attr("search").length > 0){
		var url = $(location).attr("search").split("mod=");
		var nm = "#" + url[1];

		$(".js-tab-type1 a").each(function(){
			if($(this).attr("target") != "_blank"){
				var $div = $(this).parents(".js-tab-type1").parent();
				var $li = $(this).parent().siblings("li");
				var $id = $(this).attr("href");

				if($id == nm){
					$li.removeClass("on");
					$(this).parent().addClass("on");

					$(".js-tab-type1-con",$div).hide();
					$($id).show();
				}
			}
			return false;
		});
	}else{
		//set random tab
		var num = $(".random_tab li").length;
		if(num > 0){
			//set random index
			var index = (Math.floor((Math.random() * num) + 1))-1;
			var $a = $(".random_tab li").eq(index).children();

			var $div = $a.parents(".js-tab-type1").parent();
			var $li = $a.parent().siblings("li");
			var $id = $a.attr("href");

			$li.removeClass("on");
			$a.parent().addClass("on");

			$(".js-tab-type1-con",$div).hide();
			$($id).show();
		}
	}

	$(".js-tab-type1 a").click(function(){
		var $div = $(this).parents(".js-tab-type1").parent();
		var $li = $(this).parent().siblings("li");
		var $id = $(this).attr("href");

		if($(this).attr("target") != "_blank"){
			$li.removeClass("on");
			$(this).parent().addClass("on");

			$(".js-tab-type1-con",$div).hide();
			$($id).show();
			autoMap.printMap();
			return false;
		}else{
			return true;
		}
	});

	//화살표 이전 버튼
	$(".js-tab-type1-prev").click(function(){
		var $div = $(this).parent();
		var $li = $(".js-tab-type1 li",$div);
		var nm = $(".js-tab-type1 li.on",$div).index();
		tab_type1_arrow_show($li,$div,nm - 1);
	});
	//화살표 다음 버튼
	$(".js-tab-type1-next").click(function(){
		var $div = $(this).parent();
		var $li = $(".js-tab-type1 li",$div);
		var nm = $(".js-tab-type1 li.on",$div).index() + 1;
		if( nm == $li.length ){
			nm = 0;
		}

		tab_type1_arrow_show($li,$div,nm);
	});

	function tab_type1_arrow_show(li,div,nm){
		li.removeClass("on");
		li.eq(nm).addClass("on");

		$(".js-tab-type1-con",div).hide();
		$(".js-tab-type1-con",div).eq(nm).show();
	}


	$(".js-tab-type2 li a").click(function(){
		var nm = $(this).parent().index();
		var con = $(".js-tab-type2").parent();
		con.each(function(){
			var $li = $("li",this);
			$li.removeClass("on");
			$li.eq(nm).addClass("on");
			$(".js-tab-type2-con",this).hide();
			$(".js-tab-type2-con",this).eq(nm).show();
		});
	});

	//이용안내
	if($(".evt_box .lst_guide").length > 0){
		$(".evt_box .user_guide .tbl_info").css("display","none");
	}

	$(".evt_box .lst_guide").click(function(){
		if($(this).next(".evt_box .tbl_info").css("display")=="none"){
			$(".evt_box .user_guide .tbl_info").slideUp("fast");
			$(this).next(".evt_box .tbl_info").slideDown("fast");
			$(".evt_box .user_guide .tbl_info").removeClass("selected");
			$(this).addClass("selected");
		}else if($(this).next(".evt_box .tbl_info").css("display")=="block"){
			$(this).next(".evt_box .tbl_info").slideUp("fast");
			$(".evt_box .user_guide .tbl_info").removeClass("selected");
		}
	});
});


//레이어팝업
function e_layer_open(el){
	$(document).ready(function(){
		$("#"+el).show();
	});
}

function e_layer_close(el){
	$(document).ready(function(){
		$("#"+el).hide();
	});
}

function go_regi(lec_no){
	if (!user_id) {
        alert("로그인 후 이용 가능합니다.");
        if(login_page) location.href=login_page;
        return false;
    }

	$.ajax({
		url: "/payment/pay_on/pay_check",
		type:"POST",
		dataType: "json",
		async: false,
		data:{
			lec_no : lec_no
		},

		success : function(response){
			if (response.success == true) {
				location.href = '/payment/pay_on/pay_ready?larr='+lec_no;
			} else if (response.message == 'ing') {
				if(confirm("현재 수강 중인 강의입니다. 강의를 재구매 하시겠습니까?")){
					location.href = '/payment/pay_on/pay_ready?larr='+lec_no;
				}
			} else if (response.message == 'bought') {
				if(confirm("이미 수강하신 강의입니다. 강의를 재구매 하시겠습니까?")){
					location.href = '/payment/pay_on/pay_ready?larr='+lec_no;
				}
			}
		}
	});
}

function off_lec(lec_no){
	if (!user_id) {
        alert("로그인 후 이용 가능합니다.");
        if(login_page) location.href=login_page;
        return false;
    }
	location.href = "/payment/pay_off/pay_ready?lecno="+lec_no;

}

function joinEvent(mode,event_code,category,keywd,content,user_name,user_email,user_phone,downfileName,terms1,terms2){

	if(!user_id && !user_name && !user_email && !user_phone){
		loginCheck();
		return false;
	}

	var successMsg = "";
	if(event_code == '190126') successMsg = "문자알리미 서비스 신청이 완료되었습니다.\n(*한국사 모의고사가 지급되었습니다. 마이페이지 확인)\n";
	if(category == 'alertsms'){
		if(user_id){
            successMsg = "문자 알리미 신청이 완료 되었습니다.\n전기기사 필기 기출인강 30% 할인쿠폰이 마이페이지로 지급되었습니다 :)\n결제 페이지에서 적용 가능합니다. (~ 2019.07.31 까지)";
		}else{
			successMsg = "문자 알리미 신청이 완료 되었습니다.\n전기기사 필기 기출인강 30% 할인쿠폰 전달드립니다.\n(회원가입 후 사용해주세요^^)\n\n■ 쿠폰번호 : B3275B37345F28N7 (★ 메모필수)\n■ 사용기간 : 2019.07.31 까지\n\n* 쿠폰 등록방법\n로그인 > 마이클래스 > [포인트/쿠폰/수강권] 클릭 ▶ 쿠폰번호 등록 ▶ 결제 시 적용";
		}
	}
	else successMsg = (mode.indexOf('giveLec') != -1 ) ? '강의 지급 되었습니다. 마이클래스에서 확인 해주세요. :)' : '참여 완료 되었습니다. :)';

	$.ajax({
		url: "/event/main/joinEvent",
		method: "POST",
		cache: false,
		data:{
			mode:mode,
			event_code:event_code,
			category:category,
			keywd:keywd,
			content:content,
			user_name:user_name,
			user_email:user_email,
			user_phone:user_phone,
            policyChk_pre3:terms1,
            policyChk_pre4:terms2
		},

		success:function(data){
            if (data==1) {
            	alert('이미 참여 하셨습니다. :)');
                return false;
            }
            else if (data==2) {
                if(category == 'down_pdf'){
                }else{
                    alert(successMsg);
                }
            }
            else alert('이벤트 참여 실패');

			if(category == 'publicguide'){
				window.open('//public.hackers.com/edu/event/down/'+downfileName);
				return false;
			}

            if(category == 'countEvent'){
                window.open('//public.hackers.com/edu/event/dev/down_pdf.php?idx=181105_day_'+downfileName);
			}
			
			if(category == 'down_pdf') {
				window.open('//public.hackers.com/edu/event/dev/down.php?file='+downfileName);
			}

            if(category == 'full_service') {
                window.open(downfileName);
			}



			return false;
		},
		error:function(e){
			console.log(e.responseText);
		}
	});
}

function loginCheck(){
	if (!user_id) {
		alert("로그인 후 이용 가능합니다.");
		if(login_page) location.href=login_page;
		return false;
	}else{
		return true;
	}
}

//레이어팝업
function popOpen(layer,st){
	if(st !== 'close') {
		$(layer).addClass('open');
	}else{
		$(layer).removeClass('open');
	}
}

//jw play
function jw_play(div,url,w,h,auto){
	var auto = auto ? auto : 'false';
	jwplayer(div).setup({ 
		file: url, 
		primary:"HTML5", 
		width:w, 
		height:h,
		autostart: auto, 
		allowmenu: false,
		allowfullscreen:"true" 
	});
}

function removeNaver(event_code,category,keywd,email){
	if(confirm('네이버 아이디 연동회원은 참여 불가능합니다. 연동 해지 하시겠습니까?')){
		$.ajax({
			url: "/member/main/remove_naver",
			type: "POST",        
			cache: false,
			data:{ 
				user_id : user_id,
				mode : 'remove_naver',
				event_code : event_code,
				category : category,
				keywd : encodeURIComponent(keywd)
			},
			success:function(result){
				if(result != 'ok'){
					alert('연동해제 실패 재시도 해주세요.');
				}else{
					alert('네이버 계정 연동이 해제되었습니다.');

					$('#send_mail_div').load('/member/main/bizmailer_logger', {
						M_EMAIL		: email,
						M_MEMO1		: user_id ,
						auth_key	: '1542344264651'
					});

					location.reload();
				}
			},
			error:function(e){
				console.log(e.responseText);
			}
		});
	}
} 