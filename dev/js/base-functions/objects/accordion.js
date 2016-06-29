$(".ug.accordion header").click( function(){

  var contentHeight = $(this).parent().find(".content").outerHeight();

  $(this).parent().toggleClass("open");

  if( $(this).parent().hasClass("open") ){
    $(this).siblings(".content-wrapper").velocity({ maxHeight: contentHeight }, { duration: 250, easing: "easeInOut" });
  }  else {
    $(this).siblings(".content-wrapper").velocity({ maxHeight: 0 }, { duration: 250, easing: "easeInOut" });
  }

});
