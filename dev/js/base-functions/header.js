$("nav.global").clone().appendTo("header.global div.menu");

$("div.menu").click( function(){
  $(this).toggleClass("open");
});
