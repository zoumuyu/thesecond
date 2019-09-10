$(document).ready(function () {

    function Detail() {
        this.picid = location.search.substring(1).split('=')[1];
        this.$shows = $('.golds-show');
        this.$sf = $('#sf');
        this.$spic = $('#spic');
        this.$simg = $('#spic').find('img');
        this.$bpic = $('#bpic');
        this.$bf = $('#bf');
        this.$bili = null;
        this.$ul = $('.pic-view ul');
    }
    Detail.prototype.init = function () {
        //2.将当前的id传给后端获取对应的数据
        $.ajax({
            url: '../php/details.php',
            data: {
                sid: this.picid
            },
            dataType: 'json'
        }).done(function (data) {//data:后端返回的和id对应的数据
            // console.log(data);
            $('#smallpic').attr('src', data.url);
            $('#bpic').attr('src', data.url);
            $('#smallpic').attr('sid', data.sid);
            $('.golds-description h3 span').html(data.title);
            $('.navshow-title span').html(data.title);
            $('.integral-right span').html(data.price);
            $('.oldprice').html(data.price);
            $('.newprice').html(data.newprice);
            // $('#zp-suit-desc').html(data.title);
            //console.log(data.price);
            var arr = data.urls.split(',');

            // console.log(arr);
            var str = '';
            $.each(arr, function (index, value) {
                str += '<li><img src="' + value + '"/></li>';
            });
            $('.pic-view ul').html(str);
        });
        this.scale();
    }
    // 放大镜效果
    Detail.prototype.scale = function () {

        var _this = this;
        this.$sf.css({
            width: this.$spic.width() * this.$bf.width() / this.$bpic.width(),
            height: this.$spic.height() * this.$bf.height() / this.$bpic.height()
        })

        this.$bili = this.$bpic.width() / this.$spic.width();

        this.$spic.hover(function () {
            $('#sf,#bf').css('visibility', 'visible');
            _this.$spic.on('mousemove', function (ev) {
                _this.drag(ev); //拖拽
            })
        }, function () {
            $('#sf,#bf').css('visibility', 'hidden');
        })
        this.$ul.on('click', 'li', function () {
            _this.changeurl($(this));
        })
    }

    Detail.prototype.drag = function (ev) {
        let l = ev.pageX - this.$shows.offset().left - this.$sf.width() / 2;
        let r = ev.pageY - this.$shows.offset().top - this.$sf.height() / 2;
        if (l <= 0) {
            l = 0;
        } else if (l >= this.$spic.width() - this.$sf.width()) {
            l = this.$spic.width() - this.$sf.width()
        }
        if (r <= 0) {
            r = 0;
        } else if (r >= this.$spic.height() - this.$sf.height()) {
            r = this.$spic.height() - this.$sf.height()
        }

        this.$sf.css({
            left: l,
            top: r
        })

        this.$bpic.css({
            left: -l * this.$bili,
            top: -r * this.$bili
        })
    }
    Detail.prototype.changeurl = function (obj) {
        let $imgurl = obj.find('img').attr('src');
        this.$spic.find('img').attr('src', $imgurl);
        this.$bpic.attr('src', $imgurl);
        this.$sf.css({
            width: this.$spic.width() * this.$bf.width() / this.$bpic.width(),
            height: this.$spic.height() * this.$bf.height() / this.$bpic.height()
        })

        this.$bili = this.$bpic.width() / this.$spic.width();
    }

    // 点击箭头进行切换 
    var $num = 5;//放大镜显示6张。
    $('.btn-right').on('click', function () {
        var $list = $('.pic-view ul li');
        if ($list.length > $num) {
            $num++;
            $('.pic-view ul').animate({
                left: -($num - 5) * $list.eq(0).innerWidth()
            })
        }
    });

    $('.btn-left').on('click', function () {
        var $list = $('.pic-view ul li');
        if ($num > 5) {
            $num--;
            $('.pic-view ul').animate({
                left: -($num - 5) * $list.eq(0).innerWidth()
            })
        }
    });

    let detail = new Detail;
    detail.init();


    // 详情图数据渲染
    function Detailpic() { }

    Detailpic.prototype.init = function () {
        $.ajax({
            url: 'http://localhost/js1907/the%20second/php/introduce.php',
            dataType: 'json'
        }).done(function (data) {
            data.length = 3;
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <p>
                <a href="" target="">
                    <img style="width:100%;float:left;display:block;" src="${value.url}">
                </a>
                </p> 
               `
            })
            $('.goldscontent').html($html);
        })
    }
    var item = new Detailpic;
    item.init();


    // 加购商品数量
    function Num() {
        this.count = $('#count').val();
    }

    Num.prototype.init = function () {
        var _this = this;
        $('.numdel').on('click', function () {
            _this.count--;
           
            $('#count').val(_this.count);
        })
        $('.numadd').on('click', function () {
            _this.count++;
            
            $('#count').val(_this.count);
        })
    }
    let num = new Num;
    num.init();

    // tap切换
    $('.particulars span').click(function (event) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        $('.content-item div').eq($(this).index()).addClass('show');
        $('.content-item div').eq($(this).index()).siblings().removeClass('show');
    })


    // 页面头部下部盒子的固定
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
    });

    // 详情页
    $(window).on('scroll', function () {
        var $top = $(window).scrollTop(); //滚动条的top值
        if ($top >= 924) {
            $('.header-bottom').css({
                display: "none"
            });
            $('.content-title').css({
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                background: '#fff',
                fontsize: '14px',
                color: '#333',
            });
            $('.output').css({
                display: "block"
            });
        } else {
            $('.content-title').css({
                position: "static",
            });
            $('.header-bottom').css({
                display: "block"
            });
            $('.output').css({
                display: "none"
            });
        }
    });



    // 倒计时效果
    setInterval(function () {
        var nowTime = new Date();
        var futureTime = new Date('2019,9,12 00:00:00');

        var time = parseInt((futureTime - nowTime) / 1000);
        var day = parseInt(time / 86400);
        var hour = parseInt(time % 86400 / 3600);
        var minite = parseInt(time % 3600 / 60);
        var second = time % 60;
        $(".limittime").html(day + "天" + hour + "小时" + minite + "分" + second + "秒");

    }, 1000);


    // 返回顶部

    $(function () {
        $(".scrolltt").click(function () {
            $('body,html').animate({
                scrollTop: 0
            },
                1000);
            return false;
        });
    });



//购物车部分

var arrsid = []; //商品的sid
var arrnum = []; //商品的数量
function cookietoarray() {``
    if(getcookie('cookiesid') && getcookie('cookienum')) {//判断商品是第一次存还是多次存储
        arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
        arrnum = getcookie('cookienum').split(','); //cookie商品的num
    }
}
$('#addToCart').on('click', function() { //点击加入购物车按钮。
    var $sid = $(this).parents('.goldmain').find('#spic img').attr('sid');
        
        //console.log($(this).parents('.goldmain').find('#spic img').attr('sid'));
		cookietoarray();//获取已经存在的cookie值。
		alert('添加购物车成功');
		if($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
			//先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
			var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
			arrnum[$.inArray($sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 100); //数组存入cookie
            

		} else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
			arrsid.push($sid); //将当前的id存入数组
			addcookie('cookiesid', arrsid.toString(), 100); //数组存入cookie
			arrnum.push($('#count').val());
			addcookie('cookienum', arrnum.toString(), 100); //数组存入cookie
		}
	});



});


