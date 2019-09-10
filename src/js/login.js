$('#submitHtml').click(function(){
    var type = $('#logintype').val();
    var m_name=$('#m_name').val();
    if(m_name==''){
        $('#login-hint').html('请输入手机号'); return false;
    }
    if(type==0){
        if($('#token').val()==''){
            $('#login-hint').html('请先点击智能验证');return false;
        }
        if($('#captcha').val()==''){
            $('#login-hint').html('请输入短信验证码');return false;
        }
    }else{
        var passwd=$('#m_password').val();
        if(!passwd || passwd.length<6){
            $('#login-hint').html('密码长度必须为6位以上'); return false;
        }
    }
    $('#login-hint').html('');
    $('#submitHtml').val('正在登录').attr('disabled','disabeld');
    var data=$('#myForm').serialize();
    $.post("/Home/User/doLogin",data,function(data){
        if(typeof(data)=='undefined' || data.error){
            $('#login-hint').html(data.error);
            $('#submitHtml').removeAttr('disabled').val('登  录');
        }else{
            typeof(_hmt)!='undefined'?_hmt.push(['_setUserTag', '5667', '已登录用户状态']):'';
            $('#submitHtml').val('正在跳转');
            setTimeout('window.location.href="'+data.url+'"',1000);
        }
    },'json');
});



$('.l-select').click(function(){
    if($('#savelogin').val()==0){
        $('.l-select').css({'background-positionY':'-18px'});
        $('#savelogin').val(1);
    }else{
        $('.l-select').css({'background-positionY':'0px'});
        $('#savelogin').val(0);
    }
});

$('.l-two-i').click(function(){
    //默认12秒后刷新
    setTimeout('window.location.reload()',12000);
});
//安全级别简单校验
$('input[name="password"]').keyup(function(){
    var passwd=$(this).val();
    if (passwd.length>=6 && passwd.match(/\d/g) && passwd.match(/\w/g) && passwd.match(/[^\w]/g)) {
        $('.pass_level').html('密码安全级别：高');
    } else if (passwd.length>=6 && passwd.match(/[a-zA-Z]/g) && passwd.match(/\d/g)) {
        $('.pass_level').html('密码安全级别：中');
    }else {
        $('.pass_level').html('密码安全级别：弱');
    }
});
//注册检查
function checkRegister(){
    var m_name =$("input[name='m_name']").val();
    if(m_name.search(/^(1)[3|5|7|8|9](\d){9}$/)==-1){
        $('#login-hint').html('请输入正确的手机号码'); return false;
    }else{
        $('#login-hint').html('');
    }
    var password =$("input[name='m_password']").val();
    if(password.length<6){
        $('#login-hint').html('密码长度不能小于6位'); return false;
    }else{
        $('#login-hint').html('');
    }
    /*	var repassword =$("input[name='repassword']").val();
        if(password!=repassword){
            $('#login-hint').html('两次输入密码不一致'); return false;
        }else{
            $('#login-hint').html('');
        }*/
    var captcha =$("input[name='captcha']").val();
    if(captcha==''){
        $('#login-hint').html('验证码必填'); return false;
    }
    if($('#captcha_code').val().trim()==''){
        $('#login-hint').html('请先输入计算结果');
        return false;
    }
    $('#login-hint').html('');
    var savelogin =$("input[name='savelogin']").val();
    if(savelogin==''){
        $('#login-hint').html('您不同意我们的注册协议,表示您放弃本次注册'); return false;
    }else{
        $('#login-hint').html('');
    }
    $('#registerButton').attr('disabled','disabled').val('正在注册');
    $.post('/Home/User/doRegister',$('#registerForm').serialize(),function(data){
        if(data.error){
            $('#login-hint').html(data.error);
            $('#registerButton').removeAttr('disabled').val('注 册');
        }else{
            alertbox('恭喜您注册成功');
            $('#registerButton').val('注册成功');
            //推送注册信息到易博
            if(typeof(_adwq)=='object'){
                var mid=data.m_id;
                var back_adwq=_adwq.push(['_setAction', '7udo5a',mid.toString()]);
            }
            setTimeout('window.location.href="'+data.backurl+'"',1000);
        }
    },'json')
}
var timer=60;
//发送验证码
$('#get_captcha').click(function(){
    if($('#get_captcha').attr('disabled')=='disabled'){
        return;
    }
    var m_name =$("input[name='m_name']").val();
    if(m_name.search(/^(1)[3|5|7|8|9](\d){9}$/)==-1){
        $('#login-hint').html('请输入正确的手机号码'); return;
    }
    if($('#token').val()==''){
        $('#login-hint').html('请先点击智能验证'); return;
    }
    $('#login-hint').html('');
    $('#get_captcha').attr('disabled','disabled');
    downTimer();
    var sms_type=$('#sms_type').val();
    $.post('/Home/User/sendMobileCode',$('#myForm').serialize(),function(data){
        if(data.error){
            timer=0;
            $('#login-hint').html(data.error);
            $('#registerButton').removeAttr('disabled');
        }else{
            $('#login-hint').html('验证码发送成功!请注意查收');
        }
    },'json')
});
function downTimer(){
    timer--;
    timer=timer<=0?0:timer;
    $('#get_captcha').html(timer+'秒');
    if(timer<=0){
        clearTimeout(donwTime);
        timer=60;
        $('#get_captcha').html('重新发送').removeAttr('disabled');
        return false;
    }
    var donwTime=setTimeout(downTimer,1000);
}
function checkRelation(){
    var m_name =$("input[name='mobile']").val();
    if(!m_name){
        $('#login-hint').html('请输入账号或者手机号'); return false;
    }else{
        $('#login-hint').html('');
    }
    var password =$("input[name='password']").val();
    if(password.length<6){
        $('#login-hint').html('密码长度不能小于6位'); return false;
    }else{
        $('#login-hint').html('');
    }
    var is_new =$("input[name='is']").val();
    if(is_new==0){
        var captcha =$("input[name='captcha']").val();
        if(captcha==''){
            $('#login-hint').html('验证码必填'); return false;
        }else{
            $('#login-hint').html('');
        }
    }
    if($('input[name="savelogin"]').val()!=1){
        $('#login-hint').html('您不同意老板官方注册协议,表示您放弃本次注册!'); return false;
    }else{
        $('#login-hint').html('');
    }
    $.post('/Home/User/dorelation',$('#relationForm').serialize(),function(data){
        if(data.error){
            alert(data.error);
        }else{
            window.location.href=data.backurl;
        }
    },'json');
}
function resetForm(){
    var password =$("input[name='m_password']").val();
    if(password.length<6){
        $('#login-hint').html('密码长度不能小于6位'); return false;
    }else{
        $('#login-hint').html('');
    }
    var repassword =$("input[name='repassword']").val();
    if(password!=repassword){
        $('#login-hint').html('两次输入密码不一致'); return false;
    }else{
        $('#login-hint').html('');
    }
    $('#resetForm').submit();
}
function checkForget(){
    var m_name =$("input[name='m_name']").val();
    if(m_name.search(/^(1)[3|5|7|8|9](\d){9}$/)==-1){
        $('#login-hint').html('请输入正确的手机号码'); return false;
    }else{
        $('#login-hint').html('');
    }
    $('#submitHtml').val('正在提交').attr('disabled','disabeld');
    var captcha =$("input[name='captcha']").val();
    if(captcha==''){
        $('#login-hint').html('短信验证码必填'); return false;
    }else{
        $('#login-hint').html('');
    }
    $('#forgetForm').submit();
}

$('.tab h3').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    o = $(this).index()==0?2:0;
    $('.tab'+o).hide();
    $('.tab'+$(this).index()).fadeIn();
    $('#logintype').val($(this).index());
    $('#login-hint').html('');
});