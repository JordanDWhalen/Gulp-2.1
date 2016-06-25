$("nav.global").clone().appendTo("header.global div.menu");

$("div.menu .menu-trigger").click( function(){
  $(this).parent().toggleClass("open");
});

$(".dropdown").click(function(){
  $(this).toggleClass("open");
});
