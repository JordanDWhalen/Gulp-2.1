$(".ug nav.global").clone().appendTo("header.ug.global div.menu");

$(".ug div.menu .menu-trigger").click( function(){
  $(this).parent().toggleClass("open");
});

$(".ug .dropdown").click(function(){
  $(this).toggleClass("open");
  // Consider adding in code to dynamically track the height of a given dropdown
});

$(".ug .search").click( function(event){
  var clicked = event.target;

  if( !$(clicked).hasClass("search") ) {
  } else {
    $(this).toggleClass("open");
  }
});
