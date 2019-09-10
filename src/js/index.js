$(document).ready(function () {
    
    // 获取元素对象
    function Banner() {
        this.$bannerlr = $('.bannerlr');
        this.$prev = $('.bannerlr .prev');
        this.$next = $('.bannerlr .next');
        this.$btns = $('.btns span');
        this.$index = null;
        this.$timer = null;
    }
    // banner图数据渲染
        Banner.prototype.init = function () {
            $.ajax({
                url: 'http://localhost/js1907/thesecond/php/banner.php',
                dataType: 'json'
            }).done(function (data) {
                var $html = '';
                $.each(data, function (index, value) {
                    $html += `
                    <li>
                    <a href="" >
                       <img src="${value.url}" alt="" >
                    </a>
                    </li>
                   `
                })
                $('.bannerlr ul').html($html);
            })
            // 轮播图部分
            
            $('.bannerlr ul').find('li').css({
                height: 491,
                width: 985,
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0.5
            })
    
    
            this.btn();
            this.left();
            this.right();
            this.timer();
            this.hover();
        }
        Banner.prototype.btn = function () {
            var _this = this;
            this.$btns.on('click', function () {
                _this.$index = $(this).index();
                _this.$btns.eq(_this.$index).addClass('hover').siblings().removeClass('hover');
                $('.bannerlr ul').find('li').eq(_this.$index).stop(true).animate({
                    opacity: 1
                }, 2000).siblings().stop(true).animate({
                    opacity: 0
                }, 2000);
            })
        }
    
        Banner.prototype.left = function () {
            var _this = this;
            this.$prev.on('click', function () {
                _this.$index--;
                if (_this.$index < 0) {
                    _this.$index = 3;
                }
                _this.$btns.eq(_this.$index).addClass('hover').siblings().removeClass('hover');
                $('.bannerlr ul').find('li').eq(_this.$index).stop(true).animate({
                    opacity: 1
                }, 2000).siblings().stop(true).animate({
                    opacity: 0
                }, 2000);
    
            })
        }
    
    
        Banner.prototype.right = function () {
            var _this = this;
            this.$next.on('click', function () {
                _this.$index++;
                if (_this.$index > 3) {
                    _this.$index = 0;
                }
                _this.$btns.eq(_this.$index).addClass('hover').siblings().removeClass('hover');
                $('.bannerlr ul').find('li').eq(_this.$index).stop(true).animate({
                    opacity: 1
                }, 2000).siblings().stop(true).animate({
                    opacity: 0
                }, 2000);
    
            })
        }
    
        Banner.prototype.timer = function () {
            var _this = this;
            this.$timer = setInterval(function () {
                _this.$index++;
                if(_this.$index>3){
                    _this.$index=0
                }
                _this.$btns.eq(_this.$index).addClass('hover').siblings().removeClass('hover');
                $('.bannerlr ul').find('li').eq(_this.$index).stop(true).animate({
                    opacity: 1
                }, 2000).siblings().stop(true).animate({
                    opacity: 0
                }, 2000);
            }, 2000)
        }
    
        Banner.prototype.hover = function () {
            var _this = this;
            this.$bannerlr.hover(function () {
                clearInterval(_this.$timer);
            }, function () {
                _this.timer()
            })
        }
    
        var ban = new Banner;
        ban.init();

        // 二级目录图片数据渲染
        function Directory() {
        }
    
    Directory.prototype.init = function () {
            $.ajax({
                url: 'http://localhost/js1907/thesecond/php/list.php',
                dataType: 'json'
            }).done(function (data) {
                var $html = '';
                $.each(data, function (index, value) {
                    $html += `
                        <li class="picscale" style="float: left; width: 251px; height: 314px;">
                            <a href="">
                                <div class="pic">
                                    <img src="${value.url}" alt="">
                                    </div>
                                    <p class="tittle">${value.title}</p>
                                    <h2><span class="yuan">¥</span>${value.price}</h2>
                            </a>
                        </li>
                        `
                })
                $('.ban-prolist-goods ').html($html);
            })
        }
        var prolist = new Directory;
        prolist.init();


    // banner下部分福利部分数据渲染
    function Benefits() {
    }

    Benefits.prototype.init = function () {
        $.ajax({
            url: 'http://localhost/js1907/thesecond/php/bottom.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <li class="picscale">
                <a href="" target="_blank">
                   <img src="${value.url}" alt="" style="display: inline;">
                </a>
                <p>${value.title}</p>
                </li>
               `
            })
            $('.ban-bottom ul').html($html);
        })
    }
    var benefit = new Benefits;
    benefit.init();

    //限时活动部分数据渲染
    function Activity() {
    }

    Activity.prototype.init = function () {
        $.ajax({
            url: 'http://localhost/js1907/thesecond/php/activity.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <li class="productTab picscale">
                    <a href="http://localhost/js1907/thesecond/dist/details.html?sid=${value.sid}" target="_blank">
                        <div class="pic fl">
                            <img src="${value.url}" alt="">
                        </div>
                        <div class="con fr">
                            <h2>${value.title}</h2>
                            <p>下单赠价值299元刀具七件套，享12期免息购</p>
                            <div class="money"> 特惠价：¥
                                <span class="yuan">${value.price}</span>
                            </div>
                        <div class="more">立即购买</div>
                        </div>
                    </a>
                </li>
               `
            })
            $('.wel-limit .wel-limit-list').html($html);
        })
    }
    var activity = new Activity;
    activity.init();


    //热卖专区数据渲染
    function Hotsale() {
    }

    Hotsale.prototype.init = function () {
        $.ajax({
            url: 'http://localhost/js1907/thesecond/php/hot.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <li class="picscale">
                    <div class="bt">
                        <span class="red">立减400元</span>
                    </div>
                <div class="pic productTab">
                    <a href="" target="_blank">
                        <img src="${value.url}" alt=""  class="img lazy">
                        <div class="evaluate-box clear">
                            <h2>${value.evaluate}</h2>
                            <p>${value.evaluatetel}</p>
                        </div>
                    </a>
                </div>
                <div class="special-text">
                    <a href="" target="_blank">
                        <h2>${value.title}</h2>
                        <p>领券下单到手价${value.newprice}元</p>
                       
                        <div class="tt"> ¥
                            <span class="money">${value.price}</span>
                            <span class="jf clear"><i></i>赠送${value.price}积分</span>
                        </div>
                    </a>
                        <div class="btns">
                            <a href="" target="_blank" class="info">查看详情</a>
                            <a onclick="javascript:openSDK('561104');" href="javascript:;" class="have">咨询有礼</a>
                        </div>
                    </div>
                </li>
               `
            })
            $('.content .special-list').html($html);
        })
    }
    var hot = new Hotsale;
    hot.init();



// 页面头部底部盒子的固定
    $(window).on('scroll', function () {
        var $top = $(window).scrollTop(); //滚动条的top值
        if ($top >= 44) {
            $('.header-bottom').css({
                position: "fixed",
                top: 0,
                left: 0,
                right: 0
            });
        } else {
            $('.header-bottom').css({
                position: "static",
            });
        }
    })


$('.bannerlf .sublist').find('.tit');
console.log($('.bannerlf .sublist').find('.tit'))

   // 倒计时效果
   setInterval(function(){
    var nowTime = new Date();
    var futureTime = new Date('2019,9,15 00:00:00');

    var time =parseInt( (futureTime - nowTime) / 1000 ); 
    var day = parseInt(time / 86400);
    var hour = parseInt(time % 86400 / 3600);
    var minite = parseInt(time % 3600 / 60);
    var second = time % 60;
    $(".time").html(day + "天" + hour + "小时" + minite + "分" + second + "秒");
    
},1000);

})
