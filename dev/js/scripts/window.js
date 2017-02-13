$(window).load( function() {

});

$(window).scroll(function() {
  var scrollTop = $(window).scrollTop();
  headerScroll(scrollTop > 70);
});

var $video  = $('.hero video'),
    $window = $(window);

$(window).resize( function() {

  if($video){
    var height = $window.height();
    $video.css('height', height);

    var videoWidth = $video.width(),
        windowWidth = $window.width(),
        marginLeftAdjust =   (windowWidth - videoWidth) / 2;

    $video.css({
        'height': height,
        'marginLeft' : marginLeftAdjust
    });
  }
  
});
