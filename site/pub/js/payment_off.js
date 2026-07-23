$(function(){

    $("#agreePayAll").click("on",function(){
        if (this.checked === true) { // 전체선택 활성화
            $('.acodian_menu input[type="checkbox"]').each(function(){
                if (!this.checked) {
                    $(this).trigger("click");
                }
            });
        } else { // 전체선택 비활성화
            $('.acodian_menu input[type="checkbox"]').each(function(){
                if (this.checked) {
                    $(this).trigger("click");
                }
            });
        }
    });

    $('.acodian_menu input[type="checkbox"]').click("on",function(){
        var isChecked = checkIsAllChecked();
        console.log(1);
        console.log(isChecked);

        if(isChecked === true){ // 모든 체크밖스 체크
            if ($('#agreePayAll').is(":checked") === true){
                // no action
            }else{
                $('#agreePayAll').trigger("click");
            }
        }else{
            if ($('#agreePayAll').is(":checked") === true){
                $('#agreePayAll').attr("checked", false);
                $('#agreePayAll').parent().removeClass('active');
            }else{
                // no action
            }
        }
    });
});

// 단일 체크밖스 모두 체크되었는지 확인
function checkIsAllChecked(){
    var isChecked = true;

    $('.acodian_menu input[type="checkbox"]').each(function(){
        if (!this.checked) {
            isChecked = false;
            return isChecked;
        }
    });

    return isChecked;
}

function show_couponeLayer(lmno,lecNo){

    var middle_discount = $("#middle_discount").val();

    $.ajax({
        url: "/payment/pay_off/getCoupons",
        type:"POST",
        dataType: "html",
        data:{
            order_num : lmno,
            lec_no : lecNo,
            middle_discount : middle_discount
        },
        success : function(data){
            $(".cLayer"+lmno).find('tbody').empty();
            $(".cLayer"+lmno).find('p').remove();
            if(data){
                $(".cLayer"+lmno).find('tbody').append(data);
            }else{
                $(".cLayer"+lmno).append("<p align=\"center\">사용 가능한 쿠폰이 없습니다.</p>");
            }

        }
    });

    $(".cLayer"+lmno).show();
}

// 쿠폰 적용
function coupone_apply(no){
    var kind = $("input[name=r]:checked").val();

    var cval = no; // 쿠폰 no값
    var lmno = $("#order_num").val();

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var cnowDate = year+":"+month+":"+day;
    var cstartDate = $("#startDate_"+cval).val();

    if(!cval){
        alert('선택한 쿠폰이 없습니다.');
        return;
    }

    if(cnowDate < cstartDate){
        alert('사용하실 수 없습니다. 날짜를 확인해주세요.');
        return;
    }

    $.ajax({
        url: "/payment/pay_off/discount_process",
        type: "POST",
        dataType: "json",
        data:{
            type : 'coupone_apply',
            no : lmno,
            cval : cval
        },
        success : function(data){
            $(".total_order_total").text(data.lp); // 상품 총금액
            $(".sale_price_total").text(data.dp); // 할인 금액
            $(".total_price_total").text(data.op); // 결제 금액
            $("#discount"+lmno).text(data.coupone);
            $(".before_process_"+lmno).css("display", "none"); // 적용창 숨김
            $(".cLayer"+lmno).css("display", "none"); // 쿠폰창도 숨김
            $(".after_process_"+lmno).css("display", "block");
            $("#discount_type_"+lmno).val("coupone");
            $("#lec_code_"+lmno).val(data.lec_no);
            $("#auth_lec_no_"+lmno).val(data.auth_lec_no);
            var coupon_count = $(".coupon_have").text();
            $(".coupon_have").text(coupon_count-1);
            if(data.msg == 'clear'){
                $(".pay_btn").html("<a href=\"javascript:trade_acc();\" class=\"btn_blue\" >결제하기</a>");
            }
        }
    });

}

// 할인 적용 취소
function discount_cancel(no){
    var discount_type = $("#discount_type_"+no).val();

    if(discount_type == "point"){
        //point_cancel(no);
    }else{
        var lec_code = $("lec_code_"+no).val();
        var auth_lec_no = $("auth_lec_no_"+no).val();

        coupone_cancel(no,lec_code,auth_lec_no);
    }
}

// 쿠폰 취소
var coupone_cancel = function(no, lec_no, auth_lec_no){

    $.ajax({
        url: "/payment/pay_off/discount_process",
        type:"POST",
        dataType: "json",
        async: false,
        data:{
            type:'coupone_cancel',
            no:no
        },
        success : function(data){
            $(".total_order_total").text(data.lp); // 상품 총금액
            $(".sale_price_total").text(data.dp); // 할인 금액
            $(".total_price_total").text(data.op); // 결제 금액
            $("#discount"+no).text(0); // XX원 할인
            $(".before_process_"+no).css("display", "block"); // 적용창 원복
            $(".after_process_"+no).css("display", "none");
            $(".cList").find('tbody').empty(); // 쿠폰 리스트 날려버림
            $("#discount_type_"+no).val("");
            $("#lec_code_"+no).val("");
            $("#auth_lec_no_"+no).val("");
            var coupon_count = $(".coupon_have").text();
            $(".coupon_have").text(parseInt(coupon_count)+1);
            $(".pay_btn").html("<a href=\"javascript:trade_ok();\" class=\"btn_blue\" >결제하기</a>");
        }
    });
}

// 할인 적용 모두 취소
function cancelAll(){

    discount_cancel($('.lmno').val());

    layerClose(layerPayCoupon);
}

// 정상 결제
var trade_ok = function(){

    var privacy_agree = $("#privacy_agree").val(); //개인정보 위탁동의 여부
    var mac_chk1 = $("input[id=refund1]").is(':checked');
    var mac_chk2 = $("input[id=refund2]").is(':checked');
    var mac_chk3 = $("input[id=agreePay1]").is(':checked');
    var mac_chk4 = $("input[id=agreePay2]").is(':checked');
    var order_num = $("#order_num").val();					//결제주문번호
    var lecno = $("#class_no").val();				//강의코드
    var method = $("input[name=payCard]:checked").val(); // 결제방법
    var DEV = $("#DEV").val();

    if (mac_chk1 != 1) {
        alert('환불안내 내용을 확인해주셔야 결제가 가능합니다');
        $("input[id=chk1]").focus();
        return;
    }

    if (mac_chk2 != 1) {
        alert('약관을 확인해주셔야 결제가 가능합니다.');
        $("input[id=chk2]").focus();
        return;
    }

    if (mac_chk3 != 1) {
        alert('개인정보보호안내에 동의해주셔야 결제가 가능합니다');
        $("input[id=chk3]").focus();
        return;
    }

    if (privacy_agree == 0) {
        if (mac_chk4 != 1) {
            alert('개인정보 처리업무 위탁안내에 동의해주셔야 결제가 가능합니다');
            $("input[id=chk3]").focus();
            return;
        }
    }

    if(DEV == "l"){
        location.href = "http://m"+DEV+"public.hackers.com/payment/pay_off/pay_LGU?order_num="+order_num+"&lecno="+lecno+"&method="+method;
    }else if(DEV == "q"){
        location.href = "https://m"+DEV+"public.hackers.com:447/payment/pay_off/pay_LGU?order_num="+order_num+"&lecno="+lecno+"&method="+method;
    }else{
        location.href = "https://m"+DEV+"public.hackers.com/payment/pay_off/pay_LGU?order_num="+order_num+"&lecno="+lecno+"&method="+method;
    }


}

// 쿠폰 사용으로 0원 결제
function trade_acc(){
    var mac_chk1 = $("input[id=refund1]").is(':checked');
    var mac_chk2 = $("input[id=refund2]").is(':checked');
    var mac_chk3 = $("input[id=agreePay1]").is(':checked');
    var order_num = $("#order_num").val();					//결제주문번호
    var lecno = $("#class_no").val();				//강의코드

    if (mac_chk1 != 1) {
        alert('환불안내 내용을 확인해주셔야 결제가 가능합니다');
        $("input[id=chk1]").focus();
        return;
    }

    if (mac_chk2 != 1) {
        alert('약관을 확인해주셔야 결제가 가능합니다.');
        $("input[id=chk2]").focus();
        return;
    }

    if (mac_chk3 != 1) {
        alert('개인정보보호안내에 동의해주셔야 결제가 가능합니다');
        $("input[id=chk3]").focus();
        return;
    }

    location.href = "/payment/pay_off/payfree_ok?order_num="+order_num+"&lecno="+lecno;
}