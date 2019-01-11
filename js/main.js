var $lis = $('.bar ul li')
var $pics = $('#pics')
var current = 0;
var $images = $pics.children('img')

var index = 1

init()


var timer = setInterval(function(){
    if(index > $lis.length-1){
        index = 0
    }
    goToNext(index)
    index++
}, 3000)

document.addEventListener('visibilitychange', function(e){
    if(document.hidden){
        window.clearInterval(timer)
    }else{
        timer = setInterval(function(){
            if(index > $lis.length-1){
                index = 0
            }
            goToNext(index)
            index++
        }, 3000)
    }
})

bindEvent()

function bindEvent(){
    $('.bar > ul').on('click', 'li', function(e){
        let $li = $(e.currentTarget)
        let index = $li.index()
        window.clearInterval(timer)
        goToNext(index)

        timer = setInterval(function(){
            if(index > $lis.length-1){
                index = 0
            }   
            goToNext(index)
            index++
        }, 3000)

    })
    
}

function goToNext(index){
    if(index === 0 && current === $lis.length-1){ //last -> first
        active(index)
        $pics.css({transform: `translateX(-${($lis.length+1)*920}px)`}).one('transitionend', function(){
            $pics.hide().offset()
            $pics.css({transform: 'translateX(-920px)'}).show()
        })
    }else if(index === $lis.length-1 && current === 0){ //first -> last
        active(index)
        $pics.css({transform: `translateX(0px)`}).one('transitionend', function(){
            $pics.hide().offset()
            $pics.css({transform: `translateX(-${(index+1)*920}px)`}).show()
        })
    }else{
        $pics.css({transform: `translateX(-${(index+1)*920}px)`})
        active(index)
    }
    current = index
}

function active(index){
    $lis.eq(index).addClass('active').siblings().removeClass('active')
}

function init(){
    $pics.css({transform: 'translateX(-920px)'})
    active(0)
    var $first = $images.eq(0).clone(true)
    var $last = $images.eq($images.length-1).clone(true)
    $pics.append($first)
    $pics.prepend($last)
}
