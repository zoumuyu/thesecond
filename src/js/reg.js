// JavaScript Document
var step=0;
/*注册下一步*/
$('.nextStep').click(function(){
    if(step==0){
        return false;
    }
    var m_name=$('input[name="m_name"]');
    if(m_name.val().search(/^(1)[3|5|7|8|9](\d){9}$/)==-1){
        $('.nextError').html('请输入正确的手机号');
    }else{
        $('.nextError').html('');
    }
    var auton=0;
    if(auton==1){
        return false;
    }
    var sms_type=$('#sms_type').val();
    auton=1;
    $.post('/Home/User/nextStep',{m_name:m_name.val().trim(),sms_type:sms_type},function(data){
        if(data.error){
            $('.nextError').html(data.error);
            auton=0;
        }else{
            $('#m_name').html($('input[name="m_name"]').val());
            $('.stepOne').hide();
            $('.stepTwo').show(500);
            auton=0;
        }
    });
});
/*验证密码强弱*/
$('input[type="password"]').keyup(function(){
    var password=$(this).val();
    if(password.search(/\d/)!=-1 && password.search(/[a-zA-Z]/)!=-1 && password.search(/\W/)!=-1 && password.length>=6){
        $('input[type="password"]').next('label').html('密码强度:强');
    }else if( password.search(/\d/)!=-1 && password.search(/[a-zA-Z]/)!=-1 ){
        $('input[type="password"]').next('label').html('密码强度:中');
    }else{
        $('input[type="password"]').next('label').html('密码强度:弱');
    }
});


/*立即注册 找回密码*/
$('.registerButton').click(function(){
    var mobile=$('input[name="m_name"]').val().trim();
    if(mobile.search(/^1[3|4|5|7|8|9]\d{9}$/)==-1){
        $('#captcha_hint').html('请输入正确的手机号').show();
        return false;
    }
    var password =$("input[name='password']").val();
    if(password.length<6 || password.search(/\d+$/)==0){
        $('#captcha_hint').html('密码长度必须大于6位且不能全为数字').addClass('red'); return false;
    }else{
        $('#captcha_hint').html('').removeClass('red');
    }
    if($('#token').val()==''){
        $('#captcha_hint').html('请先点击智能验证').show();
        return false;
    }
    if($("input[name='captcha']").val().length!=4){
        $('#captcha_hint').html('请输入正确短信的验证码').show();
        return false;
    }else{
        $('#captcha_hint').html('').hide();
    }
    var regHtml=$('.registerButton').val();
    $('.registerButton').attr('disabled','disabled').val('正在处理');
    var act_type=$('input[name="act_type"]').val();
    var url;
    var msg;
    if(act_type=='register'){
        url='/Home/User/doRegister';
        msg='注册成功!';
    }else{
        url='/Home/User/doRegister';
        msg='设置成功!';
    }
    // $.post(url,$('#registerForm').serialize(),function(data){
    //     if(data.error){
    //         $('#captcha_hint').html(data.error).show();
    //         $('.registerButton').removeAttr('disabled').val(regHtml);
    //     }else{
    //         $('.registerButton').css('background-color','#ccc').val(msg);
    //         setTimeout("window.location.href='"+data.backurl+"'",1100);
    //     }
    // },'json');

});
var timer=60;
var downTimer='';
/*获取 短信验证码*/
function get_captcha(){
    if($('#get_captcha_button').attr('disabled')=='disabled'){
        return;
    }
    var m_name=$('input[name="m_name"]').val().trim();
    if(m_name.search(/^1\d{10}$/)==-1){
        $('#captcha_hint').html('请输入正确的手机号').show();
        return false;
    }
    if($('#token').val()==''){
        $('#captcha_hint').html('请先点击智能验证').show(); return;
    }
    $.post('/Home/User/sendMobileCode',$('#registerForm').serialize(),function(data){
        if(data.error){
            $('#captcha_hint').html(data.error).show();
            auto=0;
        }else{
            $('#captcha_hint').html('发送成功!请注意查收!').show();
            $('#get_captcha_button').attr('disabled','disabled');
            Dtimer();
        }
    });
}
function Dtimer(){
    if(timer<=0){
        timer=60;
        auto=0;
        $('#get_captcha_button').removeAttr('disabled').html('重新发送');
        clearTimeout(downTimer);
        return false;
    }
    timer--;
    $('#get_captcha_button').html(timer+'秒');
    setTimeout(Dtimer,1000);
}
/*关联账号*/
function checkRelation(){
    var password =$("input[name='password']").val();
    if(password.length<6){
        $('input[type="password"]').next('label').html('密码长度不能小于6位').addClass('red'); return false;
    }else{
        $('input[type="password"]').next('label').html('').removeClass('red');
    }
    if($("input[name='captcha']").val().trim()==''){
        $('#captcha_hint').html('请先输入验证码').show();
        return false;
    }else{
        $('#captcha_hint').html('').hide();
    }
    var regHtml=$('.registerButton').val();
    $('#captcha_hint').html('正在处理').show();
    // $.post('/Home/User/dorelation',$('#registerForm').serialize(),function(data){
    //     if(data.error){
    //         $('#captcha_hint').html(data.error).show();
    //     }else{
    //         $('#captcha_hint').html('关联成功').show();
    //         setTimeout("window.location.href='"+data.backurl+"'",1100);
    //     }
    // },'json');
}

function get_txcaptcha(){
    $('#verfiyimg').attr('src','/User/verify?r='+Math.random());
}