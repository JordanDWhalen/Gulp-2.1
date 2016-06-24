function lightboxOpen(trigger){

  var activeBox = trigger.attr("box");

  console.log(activeBox);

  $(".lightbox[box='0']" ).addClass("open");

  positionFauxed(true);

}

function lightboxClose(trigger){

  var activeBox = trigger.parent().attr("class").split(" ").pop();

  $(".lightbox." + activeBox).removeClass("open");

  positionFauxed(false);

}

$(".lightbox-trigger").click( function(e){
  e.preventDefault();

  lightboxOpen($(this));

});

$(".lightbox .close").click(function(e){
  e.preventDefault();

  lightboxClose($(this));

});
