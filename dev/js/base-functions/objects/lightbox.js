function ug_LightboxOpen(trigger){

  var activeBox = trigger.attr("box");

  console.log(activeBox);

  $(".ug.lightbox[box='0']" ).addClass("open");

  positionFauxed(true);

}

function ug_LightboxClose(trigger){

  var activeBox = trigger.parent().attr("class").split(" ").pop();

  $(".ug.lightbox." + activeBox).removeClass("open");

  positionFauxed(false);

}

$(".ug .lightbox-trigger").click( function(e){
  e.preventDefault();

  ug_LightboxOpen($(this));

});

$(".ug.lightbox .close").click(function(e){
  e.preventDefault();

  ug_LightboxClose($(this));

});
