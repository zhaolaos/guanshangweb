//
function slide() {
    //
    var oSlide = document.getElementsByClassName('slide');
    var oUls=oSlide[0].getElementsByTagName('ul');
    var bannerImgs=oUls[0];
    var Indexs=oUls[1].querySelectorAll("li");
    var imgLis=oUls[0].querySelectorAll("li");

    //var bannerImgs = document.querySelector(".banner_imgs");
    //var Indexs = document.querySelectorAll(".banner_index li");
    //var imgLis = document.querySelectorAll(".banner_imgs li");

    //屏幕宽度
    //var screenWidth = oSlide[0].width;
    var index = 1;

    //默认显示的应该是第二张图片
    bannerImgs.style.transform = "translateX(" + index * -14.3 + "%)";

    //添加过渡效果
    function setTransition() {
        bannerImgs.style.webkitTransition = "all .2s";
        bannerImgs.style.transition = "all .2s";
    }

    //清除过渡效果
    function clearTransition() {
        bannerImgs.style.webkitTransition = "none";
        bannerImgs.style.transition = "none";
    }

    //设置移动距离
    function setTranslateX(distance) {
        bannerImgs.style.webkitTransform = "translateX(" + distance + "%)";
        bannerImgs.style.transform = "translateX(" + distance + "%)";
    }

    //控制小圆点
    function setPoint() {
        for (var i = 0; i < Indexs.length; i++) {
            Indexs[i].className = "";
        }
        Indexs[index - 1].className = "active";
    }

    //设置定时器
    var timer = setInterval(function() {
        index++;
        setTransition();
        setTranslateX(index * -14.3);
    }, 3000);

    //添加过渡动画结束事件
    bannerImgs.addEventListener("transitionend", function() {
        if (index > 8) {
            index = 1;
        } else if (index < 1) {
            index = 8;
        }
        clearTransition();
        setTranslateX(index * -14.3);
        setPoint();
    })


    //添加touch事件
    var startX = 0;
    var moveX = 0;
    var isMove = false;

    bannerImgs.addEventListener("touchstart", function(event) {
        isMove = false;
        clearInterval(timer);
        startX = event.touches[0].clientX;
    })

    bannerImgs.addEventListener("touchmove", function(event) {
        isMove = true;
        moveX = event.touches[0].clientX - startX;
        if(moveX>0){
        	setTranslateX(index * 10);
        }else{
        	setTranslateX(index * -10);
        }
    })

    bannerImgs.addEventListener("touchend", function(event) {
        if(isMove && Math.abs(moveX) > screenWidth/3){
            if (moveX < 0) {
                index++;
            } else if (moveX > 0) {
                index--;
            }
        }
        setTransition();
        setTranslateX(index * -10);
        timer = setInterval(function() {
            index++;
            setTransition();
            setTranslateX(index * -10);
        }, 3000);
    })
}