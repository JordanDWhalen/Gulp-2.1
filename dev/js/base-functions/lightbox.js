function lightboxOpen(trigger){

  var activeBox = trigger.attr("class").split(" ").pop();

  $(".lightbox." + activeBox).addClass("open");
  positionFauxed(true);

}

function lightboxClose(trigger){

  var activeBox = trigger.parent().attr("class").split(" ").pop();

  $(".lightbox." + activeBox).removeClass("open");

  positionFauxed(false);

}
