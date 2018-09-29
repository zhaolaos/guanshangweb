//
function slide() {
    //
    var imgLis = $(".slide-img").children('li');
    var bannerImgs = $(".slide-img");
    var adot = $(".dot").children('li');  //控制圆点（也可以修改为数字）切换效果
    var title = $(".slide-description").children('li'); //控制文字描述的切换
     // 
    var liLength = imgLis.length * 100;
    var liWidth = 100 / imgLis.length;
    $(".slide-img").css('width', liLength+"%");
    $(".slide-img li").css('width', liWidth + "%");
    //console.log($(".slide-img").css('width'));
    
    var index = 1;

    //默认显示的应该是第二张图片
    bannerImgs.css('transform', "translateX(" + (index * -liWidth) + "%)");

    //添加过渡效果
    function setTransition() {
        //bannerImgs.css('property', 'value');.webkitTransition = "all .2s";
        bannerImgs.css('transition', 'all .2s');
    }

    //清除过渡效果
    function clearTransition() {
        //bannerImgs.style.webkitTransition = "none";
        bannerImgs.css('transition', 'none');
    }

    //设置移动距离
    function setTranslateX(distance) {
        //bannerImgs.style.webkitTransform = "translateX(" + distance + "%)";
        bannerImgs.css('transform', "translateX(" + distance + "%)");
    }

    //控制小圆点和文字描述
    function setPoint() {
        
        for (var i = 0; i < adot.length; i++) {
            if($(adot[i]).hasClass('active')) {
                $(adot[i]).removeClass('active');
            }
            if ($(title[i]).hasClass('cur')) {
                $(title[i]).removeClass('cur');
            }
        }
        $(adot[index - 1]).addClass('active');
        $(title[index - 1]).addClass('cur');

    }

    //设置定时器
    var timer = setInterval(function() {
        index++;
        setTransition();
        setTranslateX(index * liWidth * -1);
    }, 3000);

    //添加过渡动画结束事件
    bannerImgs.bind("transitionend", function() {
        if (index > imgLis.length-2) {
            index = 1;
        } else if (index < 1) {
            index = imgLis.length-2;
        }
        clearTransition();
        setTranslateX(index * liWidth * -1);
        setPoint();
    })


    // 添加touch事件
    var startX = 0;
    var moveX = 0;
    var isMove = false;

    bannerImgs.bind("touchstart", function(event) {
        isMove = false;
        clearInterval(timer);
        startX = event.touches[0].clientX;
    })

    bannerImgs.bind("touchmove", function(event) {
        isMove = true;
        moveX = event.touches[0].clientX - startX;
        if(moveX>0){
        	setTranslateX(index * liWidth);
        }else{
        	setTranslateX(index * liWidth * -1);
        }
    })

    bannerImgs.bind("touchend", function(event) {
        if(isMove && Math.abs(moveX) > screenWidth/3){
            if (moveX < 0) {
                index++;
            } else if (moveX > 0) {
                index--;
            }
        }
        setTransition();
        setTranslateX(index * liWidth * -1);
        timer = setInterval(function() {
            index++;
            setTransition();
            setTranslateX(index * liWidth * -1);
        }, 3000);
    })
}