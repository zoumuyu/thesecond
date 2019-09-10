//1.随机数的方法
function rannum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
//2.自定义函数
function double(n) {
    return n < 10 ? '0' + n : n;
}
//3.兼容获取任意的css属性的值
function getstyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}
//4.事件绑定的方法
function addEvent(obj, etype, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(etype, fn, false);
    } else {
        obj.attachEvent('on' + etype, fn);
    }
}

function removeEvent(obj, etype, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(etype, fn, false);
    } else {
        obj.detachEvent('on' + etype, fn);
    }
}
//5.缓冲运动
function buffermove(obj, json, fn) {
    clearInterval(obj.timer);
    var speed = 0;
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            //1.取当前值
            var cssvalue = null;
            if (attr === 'opacity') {
                cssvalue = Math.round(getstyle(obj, attr) * 100);
            } else {
                cssvalue = parseInt(getstyle(obj, attr));
            }
            //2.求速度
            speed = (json[attr] - cssvalue) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.运动的判断
            if (cssvalue !== json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (cssvalue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (cssvalue + speed) + ')';
                } else {
                    obj.style[attr] = cssvalue + speed + 'px';
                }
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn();
        }
    }, 10);
    //求任意css值。
    function getstyle(obj, attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
}
//6.ajax函数封装
function ajax(obj) {
    let ajax = new XMLHttpRequest();
    obj.type = obj.type || 'get';
    if (!obj.url) {
        throw new Error('接口地址不存在');
    }

    function objToString(obj) {
        let arr = [];
        for (let attr in obj) {
            arr.push(attr + '=' + obj[attr]);
        }
        return arr.join('&');
    }
    if (obj.data) {
        if (typeof obj.data === 'object' && !Array.isArray(obj.data)) {
            obj.data = objToString(obj.data);
        } else {
            obj.data = obj.data;
        }
    }
    if (obj.data && obj.type === 'get') {
        obj.url += '?' + obj.data;
    }
    if (obj.async === 'false' || obj.async === false) {
        obj.async = false;
    } else {
        obj.async = true;
    }
    ajax.open(obj.type, obj.url, obj.async);
    if (obj.data && obj.type === 'post') {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(obj.data);
    } else {
        ajax.send();
    }
    if (obj.async) {
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    let apidata = ajax.responseText;
                    if (obj.dataType === 'json') {
                        apidata = JSON.parse(apidata)
                    }
                    obj.success && typeof obj.success === 'function' && obj.success(apidata);
                } else {
                    obj.error && typeof obj.error === 'function' && obj.error('接口地址有误' + ajax.status);
                }
            }
        }
    } else {
        obj.success && typeof obj.success === 'function' && obj.success(ajax.responseText);
    }
}
//7.cookie添加，获取，删除
function addcookie(key, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
}

function getcookie(key) {
    let arr = decodeURIComponent(document.cookie).split('; ');
    for (let value of arr) {
        let newarr = value.split('=');
        if (key === newarr[0]) {
            return newarr[1];
        }
    }
}

function delcookie(key) {
    addcookie(key, '', -1);
}