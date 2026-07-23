
$(function(){
    var book = $("#book_sale").val();
    if (book > 0) {
        address_input('old');
    }

    /*var no = "<?=$data[no]?>";
    var use_point = "<?=$data['Use_point']?>";

    if(use_point == 'cp' && no < 50000){
        $("#pt"+no).html('사용불가');
    }else if(use_point == 'pt' && no < 50000){
        $("#cp"+no).html('사용불가');
    }*/

    IEVersionCheck();

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

function IEVersionCheck(){
    var word;
    var version = "N/A";

    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    if ( name == "Microsoft Internet Explorer" ) word = "msie ";

    else {
        // IE 11
        if ( agent.search("trident") > -1 ) word = "trident/.*rv:";
        // IE 12
        else if ( agent.search("edge/") > -1 ) word = "edge/";
    }

    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );

    if (  reg.exec( agent ) != null  )  version = RegExp.$1 + RegExp.$2;

    if(version <= 10) $('.IE_Version_10').show();
    else $('.IE_Version_10').hide();
}

// 주소 조회창 띠우기
function goZipSearch(){
    var maskWidth = $(window).width();
    var maskHeight = $(window).height();
    
    $('.mask-box').css({'width':maskWidth,'height':maskHeight});
	$('#layerPostFind').before('<div class="mask-box"></div>');
	$('#layerPostFind').show();
    //$('#layerPostFind').center();  20180710 테스트 주석 pkm
    
    //$('.pop_post_box,.dim_bg').fadeIn('fast');
    $('.post_txt_default').show();
    $('.post_txt_click').hide();
    $('.postcode_list').hide();
    $('.postcode_list ul').html('');
    $('#zipForm input[name=currentPage]').val(1);
    $('#zipForm input[name=keyword]').val('');

}

function jusoCallBack(zip, addr0, addr1){
    $('#layerPostFind, .mask-box').fadeOut('fast');
    $('#zip').val(zip);
    $('#address1').val(addr0+' '+ addr1);
}

function pop_post_close(type){
    $(type).fadeOut('fast');
}

// 우편번호 찾기 layer 스크립트 시작
var zip_flag = false;
$(function() {
    $('#zipForm input[name=currentPage]').val(1);
    $('.postcode_list').hide();
    $('.postcode_list ul').html('');
    $('.postcode_list').scroll(function() {
        if(zip_flag == false && $(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
            zip_flag = true;
            $('#zipForm input[name=currentPage]').val(parseInt($('#zipForm input[name=currentPage]').val(),10)+1);
            goZipSearch2();
        }
    });
});

function goZipSearch1() {
    $('.post_txt_default').hide();
    $('.post_txt_click').show();
    $('#zipForm input[name=currentPage]').val(1);
    $('.postcode_list ul').html('');
    goZipSearch2();
}

function goZipSearch2(){
    $.ajax({
        url :"//www.juso.go.kr/addrlink/addrLinkApiJsonp.do"  //인터넷망
        ,type:"post"
        ,data:$("#zipForm").serialize()
        ,dataType:"jsonp"
        ,crossDomain:true
        ,success:function(xmlStr){
            zip_flag = false;
            if(navigator.appName.indexOf("Microsoft") > -1){
                var xmlData = new ActiveXObject("Microsoft.XMLDOM");
                xmlData.loadXML(xmlStr.returnXml)
            }else{
                var xmlData = xmlStr.returnXml;
            }
            var errCode = $(xmlData).find("errorCode").text();
            var errDesc = $(xmlData).find("errorMessage").text();
            var totalCount = $(xmlData).find("totalCount").text();
            if(errCode != "0"){
                alert(errCode+"="+errDesc);
            }else{
                if(Number(totalCount) > 0 ) makeList(xmlData);
                else{
                    $('.post_txt_click').hide();
                    $('.no_data_txt').show();
                    $('.postcode_list').hide();
                }
            }

            // $('#layerPostFind').center();  20180710 테스트 주석 pkm
        }

        ,error: function(xhr,status, error){
            alert("에러발생");
        }
    });
}

function makeList(xmlStr){
    var htmlStr = "";
    $(xmlStr).find("juso").each(function(){
        htmlStr += "<li>";
        htmlStr += "<a href=\"#\" onclick=\"jusoCallBack('"+$(this).find('zipNo').text()+"','"+$(this).find('roadAddrPart1').text()+"','"+$(this).find('roadAddrPart2').text()+"'); return false;\"><strong>"+$(this).find('zipNo').text()+"</strong>";
        htmlStr += "- 도로명: " + $(this).find('roadAddrPart1').text() + " "+ $(this).find('roadAddrPart2').text()+ "<br>";
        htmlStr += "- 지번: " + $(this).find('jibunAddr').text();
        htmlStr += "</a></li>";
    });
    $('.postcode_list ul').append(htmlStr);
    $('.no_data_txt').hide();
    $('.postcode_list').show();
}
// 우편번호 찾기 layer 스크립트 끝

function show_couponLayer(lmno,lecNo){

    $.ajax({
        url: "/payment/pay_on/getCoupons",
        type:"POST",
        dataType: "html",
        data:{
            lmno : lmno,
            lec_no : lecNo
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

var point_check = function(no){

    var pt = new Array();
    var ptcnt = $("input[name=dispt]").size(); // 포인트 입력input 갯수
    var total_pt = 0; // 사용할 총 포인트

    var usepoint = $(".point_have").html().replace(/,/g,''); // 보유 포인트
    for(i=0; i<ptcnt; i++){
        pt[i] = $("input[name=dispt]").eq(i).val();
        if(!pt[i]){
            pt[i] = 0;
        }
        total_pt += parseInt(pt[i],10);
    }

    //var usedpoint = $("#ptsale").html().replace(' P','').replace(/,/g,'');
    //var targe_point = $('#dispt'+no).val();

    if(total_pt > usepoint /*|| parseInt(usedpoint) + parseInt(targe_point) > usepoint*/){
        alert('보유포인트를 초과하였습니다.');
        $('#dispt'+no).val('');
    }
};

// 포인트 적용
function point_apply(no){
    var point_use = $('#dispt'+no).val();

    var total_pay_price = $(".total_price_total").text().replace(",","");
    if(point_use > parseInt(total_pay_price)/2){
        alert('포인트는 결제금액의 50%까지만 사용 가능합니다.');
        return;
    }

    if(point_use < 100){
        alert('100포인트 이상 사용 가능합니다.');
        return;
    }

    $.ajax({
        url: "/payment/pay_on/discount_process",
        type:"POST",
        dataType: "json",
        data:{
            type : 'point_apply',
            no : no,
            point : point_use
        },
        success : function(data){
            if(data.order_num == 'point_over'){
                alert('강의가격보다 포인트 사용금액이 큽니다. 다시 확인해주세요.');
            }else if(data.order_num == 'point_not_enough'){
                alert('보유포인트를 초과하였습니다.');
                $('#dispt'+no).val('0');
            }else if(data.order_num == 'double'){
                alert('쿠폰/포인트 중복할인은 불가합니다.');
                $('#dispt'+no).val('0');
            }else{
                $(".total_order_total").text(data.rp); // 상품 총금액
                $(".sale_price_total").text(data.dp); // 할인 금액
                $(".total_price_total").text(data.tp); // 결제 금액
                /*$("#ptsale").text(data.pdis); // 포인트 할인 금액
                $("#cpsale").text(decodeURIComponent(data.cdis)); // 쿠폰 할인 금액*/
                $("#discount"+no).text(data.point);
                $("#point_get").text(data.point_get); // 예상 적립 포인트
                $(".before_process_"+no).hide(); // 적용창 숨김
                $(".cLayer"+no).hide(); // 쿠폰창도 숨김
                $(".after_process_"+no).show();
                $("#discount_type_"+no).val("point");

                var point_value = parseInt($(".point_have").text().replace(",","")); // 팝업 보유 포인트 갱신
                var point_after_discount = point_value - data.point;
                $(".point_have").text(numberWithCommas(point_after_discount));

                //$('#layerPayCoupon').center();   20180710 테스트 주석 pkm

                //$("#lmno_"+no).val("point");
                if(data.msg == 'clear'){ // 포인트를 사용하여 결제금액이 0원일 때
                    $(".pay_btn").html("<a href=\"javascript:trade_acc();\" class=\"btn_blue\" >결제하기</a>");
                }
            }
        }
    });
}

// 포인트 적용 취소
function point_cancel(no){

    $.ajax({
        url: "/payment/pay_on/discount_process",
        type:"POST",
        dataType: "json",
        async: false,
        data:{
            type :'point_cancel',
            no : no
        },
        success : function(data){
            $(".total_order_total").text(data.rp); // 상품 총금액
            $(".sale_price_total").text(data.dp); // 할인 금액
            $(".total_price_total").text(data.tp); // 결제 금액
            /*$("#ptsale").text(data.pdis); // 포인트 할인 총금액
            $("#cpsale").text(decodeURIComponent(data.cdis)); // 쿠폰 할인 총금액*/
            $("#discount"+no).text(0); // XX원 할인
            $("#point_get").text(data.point_get); // 예상 적립 포인트
            $(".before_process_"+no).css("display", "block"); // 적용창 원복
            $(".after_process_"+no).css("display", "none");
            $("#discount_type_"+no).val("");

            var point_value = parseInt($(".point_have").text().replace(",","")); // 팝업 보유 포인트 갱신
            var point_after_discount = point_value + parseInt(data.point);
            $(".point_have").text(numberWithCommas(point_after_discount));

            $("#dispt"+no).val(''); // 포인트 적용 input 초기화
            $(".pay_btn").html("<a href=\"javascript:trade_ok();\" class=\"btn_blue\" >결제하기</a>");
        }
    });
}

// 쿠폰 적용
function coupone_apply(no){

    var cval = no; // 쿠폰 no값
    var lmno = $("#lmno_"+no).val();
    var conum = $("#conum_"+cval).val();

    var book = $("#book_sale").val();
    var check_mno = $("#check_mno").val();
    var book_check = $("#book_check").val();
    var book_pr = $("#book_pr").val(); // undefined

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
        url: "/payment/pay_on/discount_process",
        type:"POST",
        dataType: "json",
        data:{
            type : 'coupone_apply',
            no : lmno,
            cval : cval
        },
        success : function(data){
            console.log(data);
            if(data.order_num == 'double'){
                alert('쿠폰/포인트 중복할인은 불가합니다.');
            }else if(data.order_num == 'already_use'){
                alert('현재 결제에서 이미 사용한 쿠폰입니다.');
            }else{
                $(".total_order_total").text(data.rp); // 상품 총금액
                $(".sale_price_total").text(data.dp); // 할인 금액
                $(".total_price_total").text(data.tp); // 결제 금액
                $("#discount"+lmno).text(data.coupone);
                $("#point_get").text(data.point_get); // 예상 적립 포인트
                $(".before_process_"+lmno).css("display", "none"); // 적용창 숨김
                $(".cLayer"+lmno).css("display", "none"); // 쿠폰창도 숨김
                $(".after_process_"+lmno).css("display", "block");
                $("#discount_type_"+lmno).val("coupone");
                $("#lec_code_"+lmno).val(data.lec_no);
                $("#auth_lec_no_"+lmno).val(data.auth_lec_no);

                $(".cLayer"+lmno).find('tbody').empty();
                $(".cLayer"+lmno).find('p').remove();

                var coupon_count = $(".coupon_have").text();
                $(".coupon_have").text(coupon_count-1);
                if(data.msg == 'clear'){ // 쿠폰을 사용하여 결제금액이 0원일 때
                    $(".pay_btn").html("<a href=\"javascript:trade_acc();\" class=\"btn_blue\" >결제하기</a>");
                }
            }
        }
    });
}

// 쿠폰 적용 취소
var coupone_cancel = function(no, lec_no, auth_lec_no){

    var book_refund = $('#book_refund').val();

    if(book_refund == 2 && lec_no != 72 && auth_lec_no == "FREEPASS"){
        alert("배송비의 할인쿠폰을 먼저 취소해주세요.");
        return;
    }

    $.ajax({
        url: "/payment/pay_on/discount_process",
        type: "POST",
        dataType: "json",
        async: false,
        data:{
            type : 'coupone_cancel',
            no : no
        },
        success : function(data){
            console.log(data);
            if(auth_lec_no == "FREEPASS"){ // 프리패스 쿠폰 취소	s
                $('#book_check').val("N");
                $('#add_tr_book').remove();
                $('#add_tr_book2').remove();
            }

            $(".total_order_total").text(data.rp); // 상품 총금액
            $(".sale_price_total").text(data.dp); // 할인 금액
            $(".total_price_total").text(data.tp); // 결제 금액
            $("#discount"+no).text(0); // XX원 할인
            $("#point_get").text(data.point_get); // 예상 적립 포인트
            $(".before_process_"+no).css("display", "block"); // 적용창 원복
            $(".after_process_"+no).css("display", "none");
            $(".cList").find('tbody').empty(); // 쿠폰 리스트 날려버림
            $("#dispt"+no).val(''); // 포인트 적용 input 초기화
            $("#discount_type_"+no).val("");
            $("#lec_code_"+no).val("");
            $("#auth_lec_no_"+no).val("");
            var coupon_count = $(".coupon_have").text();
            $(".coupon_have").text(parseInt(coupon_count)+1);
            $(".pay_btn").html("<a href=\"javascript:trade_ok();\" class=\"btn_blue\" >결제하기</a>");
        }
    });
}

// 할인 적용 취소
function discount_cancel(no){
    var discount_type = $("#discount_type_"+no).val();

    if(discount_type == "point"){
        point_cancel(no);
    }else{
        var lec_code = $("lec_code_"+no).val();
        var auth_lec_no = $("auth_lec_no_"+no).val();

        coupone_cancel(no,lec_code,auth_lec_no);
    }
}

// 할인 적용 모두 취소
function cancelAll(){

    var lmno = new Array();
    $('.lmno').each(function(){
        lmno.push(this.value);
    });

    for(var i = 0; i < lmno.length; i++){
        discount_cancel(lmno[i]);
    }

    layerClose(layerPayCoupon);
}

// 우편번호 자동입력
function address_input(type){

    if (type == 'new') {

        $("#zip").val("");

        $("#bname").val("");
        $("#address1").val("");
        $("#address2").val("");

        $("#tel1").val("");
        $("#tel2").val("");
        $("#tel3").val("");

    } else {
        $.ajax({
            url:"/payment/pay_on/address_info",
            type:"POST",
            dataType: "json",
            data:{
                type:type
            },
            success : function(data){
                console.log(data);

                $("#zip").val(data.zip);

                $("#bname").val(data.bname);
                $("#address1").val(data.address1);
                $("#address2").val(data.address2);

                $("#tel1").val(data.tel1);
                $("#tel2").val(data.tel2);
                $("#tel3").val(data.tel3);
            }
        });
    }

}

// 쿠폰 혹은 포인트 사용하여 결제금액이 0원일 때
function trade_acc(){
    var oid = $("#order_num").val();
    var book = $("#book_sale").val();
    var event_code = $("#event_code").val();
    var send = new Array();
    var mac_chk1 = $("input[id=refund1]").is(':checked');
    var mac_chk2 = $("input[id=refund2]").is(':checked');
    var mac_chk3 = $("input[id=agreePay1]").is(':checked');

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

    if(book > 0){

        if( !$("#zip").val() && !$("#address1").val() ){
            alert('우편번호를 검색해주세요.');
            $("#zip_btn").focus();
            return;
        }

        if(!$("#address2").val()){
            alert('상세 주소를 입력 해주세요.');
            $("#address2").focus();
            return;
        }

        if( !$("#bname").val() ){
            alert('받으실 분 이름을 기입해주세요.');
            $("#bname").focus();
            return;
        }

        if( !$("#tel2").val() ){
            alert('휴대전화번호를 기입해주세요.');
            $("#tel2").focus();
            return;
        }

        if( !$("#tel3").val() ){
            alert('휴대전화번호를 기입해주세요.');
            $("#tel3").focus();
            return;
        }

        if (!/^[0-9]{3,4}$/.test($('#tel2').val())){
            alert("올바른 휴대전화번호를 입력해주세요.");
            $("#tel2").focus();
            return;
        }

        if (!/^[0-9]{4,4}$/.test($('#tel3').val())){
            alert("올바른 휴대전화번호를 입력해주세요.");
            $("#tel3").focus();
            return;
        }

        send[0] = $("#zip").val();
        send[1] = $("#address1").val();
        send[2] = $("#address2").val();
        send[3] = $("#bname").val();
        send[4] = $("#tel1").val();
        send[5] = $("#tel2").val();
        send[6] = $("#tel3").val();

        $.ajax({
            url: "/payment/pay_on/besong_input",
            type:"POST",
            data:{
                oid : oid,
                send : send,
                event_code : event_code
            },
            success : function(data){
                if(data == 'ok'){
                    location.href = "/payment/pay_on/payfree_ok?oid="+oid;
                }
            }
        });

    }else{
        location.href = "/payment/pay_on/payfree_ok?oid="+oid;
    }
}

// 정상 결제
function trade_ok()
{
    var mac_chk1 = $("input[id=refund1]").is(':checked');
    var mac_chk2 = $("input[id=refund2]").is(':checked');
    var mac_chk3 = $("input[id=agreePay1]").is(':checked');
    var mac_chk4 = $("input[id=agreePay2]").is(':checked');
    var book = $("#book_sale").val();
    var event_code = $("#event_code").val();
    var send = new Array();
    var oid = $("#order_num").val();
    var method = $("input[name=payCard]:checked").val();
    var policy_agree = $("#policy_agree").val();
    var DEV = $("#DEV").val();

    var total_price = parseInt($('.total_price_total').text());
    if (total_price == 0) {
        method = 30;
    }

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

    if (policy_agree == 0) {
        if (mac_chk4 != 1) {
            alert('개인정보 처리업무 위탁안내에 동의해주셔야 결제가 가능합니다');
            $("input[id=chk3]").focus();
            return;
        }
    }

    if (!method) {
        alert('결제방식을 선택해주세요.');
        $("input[name=payCard]").focus();
        return;
    }

    //교재포함 강의일 경우
    if(book > 0){
        if( !$("#zip").val() && !$("#address1").val() ){
            alert('우편번호를 검색해주세요.');
            $("#zip_btn").focus();
            return;
        }

        if(!$("#address2").val()){
            alert('상세 주소를 입력 해주세요.');
            $("#address2").focus();
            return;
        }


        if( !$("#bname").val() ){
            alert('받으실 분 이름을 기입해주세요.');
            $("#bname").focus();
            return;
        }

        if( !$("#tel2").val() ){
            alert('휴대전화번호를 기입해주세요.');
            $("#tel2").focus();
            return;
        }

        if( !$("#tel3").val() ){
            alert('휴대전화번호를 기입해주세요.');
            $("#tel3").focus();
            return;
        }

        if (!/^[0-9]{3,4}$/.test($('#tel2').val())){
            alert("올바른 휴대전화번호를 입력해주세요.");
            $("#tel2").focus();
            return;
        }

        if (!/^[0-9]{4,4}$/.test($('#tel3').val())){
            alert("올바른 휴대전화번호를 입력해주세요.");
            $("#tel3").focus();
            return;
        }

        send[0] = $("#zip").val();
        send[1] = $("#address1").val();
        send[2] = $("#address2").val();
        send[3] = $("#bname").val();
        send[4] = $("#tel1").val();
        send[5] = $("#tel2").val();
        send[6] = $("#tel3").val();

        $.ajax({
            url: "/payment/pay_on/besong_input",
            type:"POST",
            data:{
                oid:oid,
                send:send,
                event_code:event_code,
                method:method
            },
            success : function(data){
                if(data != 'ok'){
                    alert('배송지가 누락되었습니다. 결제를 재시도 해주세요.');
                    return false;
                }else{
                    if(method == '35'){ // 프리패스 구매  || 0원 결제
                        var freeLecMemNo = $("#freeLecMemNo").val();
                        //location.href = "/A_online/payment/payfree_ok.php?oid="+oid+"&regi_method="+method+"&freecode="+freeLecMemNo;
                        location.href = "/payment/pay_on/pay_free?oid="+oid+"&regi_method="+method+"&freecode="+freeLecMemNo;
                    }else{	// 신용카드 / 체크카드 구매시
                        //location.href = "/edu_m/LGU_payment/LGU/pay_online/payreq.php?oid="+oid+"&method="+method;
                        if(DEV == "l"){
                            location.href = "http://m"+DEV+"public.hackers.com/payment/pay_on/pay_LGU?order_num="+oid+"&method="+method;
                        }else{
                            location.href = "https://m\"+DEV+\"public.hackers.com/payment/pay_on/pay_LGU?order_num="+oid+"&method="+method;
                        }

                    }
                }
            }
        });
    }else{
        if(method == '35'){ // 프리패스 구매
            var freeLecMemNo = $("#freeLecMemNo").val();
            //location.href = "/A_online/payment/payfree_ok.php?oid="+oid+"&regi_method="+method+"&freecode="+freeLecMemNo;
            location.href = "/payment/pay_on/pay_free?oid="+oid+"&regi_method="+method+"&freecode="+freeLecMemNo;
        }else if(method == 30){ // 0원 결제
            location.href = "/payment/pay_on/payfree_ok?oid="+oid;
        }else{	// 신용카드 / 체크카드 구매시
            //location.href = "/edu_m/LGU_payment/LGU/pay_online/payreq.php?oid="+oid+"&method="+method;
            if(DEV == "l"){
                location.href = "http://m"+DEV+"public.hackers.com/payment/pay_on/pay_LGU?order_num="+oid+"&method="+method;
            }else if(DEV =='q'){
                location.href = "https://m"+DEV+"public.hackers.com:447/payment/pay_on/pay_LGU?order_num="+oid+"&method="+method;
            }else{
                location.href = "https://m"+DEV+"public.hackers.com/payment/pay_on/pay_LGU?order_num="+oid+"&method="+method;
            }

        }
    }

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}