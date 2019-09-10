$(document).ready(function () {
	
    //1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
	function goodslist(id,count){
		$.ajax({ 
            url:'http://localhost/js1907/thesecond/php/cart.php',//获取所有的接口数据
            
			dataType:'json'
		}).done(function(data){
            // console.log(data)
			$.each(data,function(index,value){
                // console.log(value.sid)
                if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                    
					var $clonebox=$('.goodlist:hidden').clone(true,true);
					$clonebox.find('.pic').find('img').attr('src',value.url);
					$clonebox.find('.pic').find('img').attr('sid',value.sid);
					$clonebox.find('.infor').find('span').html(value.titile);
                    $clonebox.find('.oneprice').find('span').html(value.price);
                    
                    $clonebox.find('.numbox').find('input').val(count);
                    
                    $clonebox.find('.integral').html(value.price);
					//计算每个商品的价格。
					$clonebox.find('.sum-price').find('span').html((value.price*count).toFixed(2));
					$clonebox.css('display','list-item');
					$('.car-list').append($clonebox);
					priceall();//计算总价的
				}
			});
		})
    }
    
    //2.获取cookie，执行渲染列表的函数
	if(getcookie('cookiesid') && getcookie('cookienum')){
		var s=getcookie('cookiesid').split(',');//数组sid
		var n=getcookie('cookienum').split(',');//数组num
		$.each(s,function(i,value){
			goodslist(s[i],n[i]);
		});
	}


   	
	//3.如果购物车为空，显示car-none盒子(购物车空空的)
	kong();
	function kong(){
		if(getcookie('cookiesid') && getcookie('cookienum')){
			$('.car-none').hide();//cookie存在，购物车有商品，隐藏盒子。
		}else{
			$('.car-none').show();
		}
    }
    
    //4.计算总价和总的商品件数，必须是选中的商品。
	function priceall(){
		var $sum=0;//总价的初始值
		var $count=0;
		$('.goodlist:visible').each(function(index,element){
		  if($(element).find('.check input').prop('checked')){
		  	$sum+=parseInt($(element).find('.numbox').find('input').val());
			$count+=parseFloat($(element).find('.sum-price').find('span').html());
		  }
		});
		
		$('.status').find('span').html($sum);
		$('.price .all-price').html($count.toFixed(2));
	}
	
	//5.全选操作
	$('.all-check').on('change',function(){
		$('.goodlist:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
		$('.all-check').prop('checked',$(this).prop('checked'));
		priceall();//取消选项，重算总和。
	});
	
	var $inputs=$('.goodlist:visible').find(':checkbox');
	$('.car-list').on('change',$inputs,function(){//事件的委托的this指向被委托的元素
		if($('.goodlist:visible').find('input:checkbox').length==$('.goodlist:visible').find('input:checked').size()){
			$('.all-check').prop('checked',true);
		}else{
			$('.all-check').prop('checked',false);
		}
		priceall();//取消选项，重算总和。
	});
	
	//6.数量的改变
	//改变商品数量++
	$('.add').on('click', function() {
	    var $count = $(this).parents('.goodlist').find('.numbox input').val();//值
	    $count++;
	    if ($count >= 1999) {
	        $count = 1999;
	    }
	    $(this).parents('.goodlist').find('.numbox input').val($count);//赋值回去
	 	$(this).parents('.goodlist').find('.sum-price').find('span').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();//重新计算总和。
	    setcookie($(this));//将改变的数量重新添加到cookie
	
	});
	
	//改变商品数量--
	$('.cut').on('click', function() {
	    var $count = $(this).parents('.goodlist').find('.numbox input').val();
	    $count--;
	    if ($count <= 1) {
	        $count = 1;
	    }
	    $(this).parents('.goodlist').find('.numbox input').val($count);
	    $(this).parents('.goodlist').find('.sum-price').find('span').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();
	    setcookie($(this));
	});
	
	//直接输入改变数量
	$('.numbox input').on('input', function() {
	    var $reg = /^\d+$/g; //只能输入数字
	    var $value = parseInt($(this).val());
	    if ($reg.test($value)) {//是数字
	        if ($value >= 1999) {//限定范围
	            $(this).val(1999);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {//不是数字
	        $(this).val(1);
	    }
	    $(this).parents('.goodlist').find('.sum-price').find('span').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();
	    setcookie($(this));
	});
	
	//7.计算数量改变后单个商品的价格
	function singlegoodsprice(obj) { //obj:当前元素
	    var $dj = parseFloat(obj.parents('.goodlist').find('.oneprice').find('span').html());//单价
	    var $cnum = parseInt(obj.parents('.goodlist').find('.numbox input').val());//数量
	    return ($dj * $cnum).toFixed(2);//结果
	}
	
	//8.将改变后的数量的值存放到cookie
	//点击按钮将商品的数量和id存放cookie中
	var arrsid=[]; //商品的id
	var arrnum=[]; //商品的数量
	//提前获取cookie里面id和num
	function cookietoarray(){
		if(getcookie('cookiesid') && getcookie('cookienum')){
			arrsid=getcookie('cookiesid').split(',');//cookie商品的sid  
			arrnum=getcookie('cookienum').split(',');//cookie商品的num
		}
	}
	function setcookie(obj) { //obj:当前操作的对象
		cookietoarray();//得到数组
	    var $index = obj.parents('.goodlist').find('img').attr('sid');//通过id找数量的位置
	    arrnum[$.inArray($index,arrsid)] = obj.parents('.goodlist').find('.numbox input').val();
	    addcookie('cookienum', arrnum.toString(), 7);
	}
	
	//9.删除操作
	//删除cookie
	function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
	    var $index = -1;
	    $.each(arrsid,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
	    	if(sid==value){
	    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
	    	}
	    });
	    arrsid.splice($index, 1);//删除数组对应的值
	    arrnum.splice($index, 1);//删除数组对应的值
	    addcookie('cookiesid', arrsid.toString(), 100);//添加cookie
	    addcookie('cookienum', arrnum.toString(), 100);//添加cookie
	}
	
	//删除单个商品的函数(委托)
	$('.car-list').on('click', '.dele', function(ev) {
		cookietoarray();//得到数组,上面的删除cookie需要。
	    if(confirm('你确定要删除吗？')){
	     	$(this).first().parents('.goodlist').remove();//通过当前点击的元素找到整个一行列表，删除
	    }
	    delgoodslist($(this).first().parents('.goodlist').find('img').attr('sid'), arrsid);
	    priceall();
	});


	//删除全部商品的函数
	$('.all-dele').on('click', function() {
		cookietoarray();//得到数组,上面的删除cookie需要。
		if(confirm('你确定要全部删除吗？')){
		    $('.goodlist:visible').each(function() {
		        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
		            $(this).remove();
		            delgoodslist($(this).find('img').attr('sid'), arrsid);
		        }
		    });
		    priceall();
		}
	});


  


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


     // 加购商品数量
     function Num() {
        this.count = $('.num').val();
    }

    Num.prototype.init = function () {
        var _this = this;
        $('.cut').on('click', function () {
            _this.count--;
            $('.num').val(_this.count);
        })
        $('.add').on('click', function () {
            _this.count++;
            $('.num').val(_this.count);
        })
    }
    let sum = new Num;
    sum.init();
})