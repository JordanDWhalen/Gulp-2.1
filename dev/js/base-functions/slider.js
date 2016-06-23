// Markup reflected in base-elements/slider.html

function sliderLayout(){

  $(".slider").each( function() {

    var self = $(this),
    slideWrapper = self.find(".slide-wrapper"),
    count = slideWrapper.find(".slide").length,
    width = 100 * count + "%";

    slideWrapper.css("width", width);
    self.attr("slide-shown", "0");

  });

}

function sliderShift(arrow){

  self = arrow.parents(".slider"),
  slideWrapper = self.find(".slide-wrapper"),
  count = self.find(".slide").length,
  slideAmount = 100 / count,
  slideShown = parseInt(self.attr("slide-shown")),
  arrows = self.find(".arrows"),
  progress = self.find(".progress"),
  clickedArrow = arrow.attr("class").split(" ")[0];

  if( clickedArrow === "next" ){

    slideShown++;
    self.attr( "slide-shown", slideShown );

    var slideTotal = slideAmount * (slideShown * -1);

    slideWrapper.velocity({ translateX: slideTotal + "%" }, { duration: 250, delay: 0 });

  } else {

    slideShown--;
    self.attr( "slide-shown", slideShown );

    var slideTotal = slideAmount * ( slideShown * -1);

    slideWrapper.velocity({ translateX: slideTotal + "%" }, { duration: 250, delay: 0 });

  }

  progress.children("a").removeClass("active");
  progress.children("a:nth-of-type(" + (1 + slideShown) + ")").addClass("active");

  if( slideShown === 0 ){

    arrows.children(".prev").addClass("disabled");

  } else if ( (slideShown + 1) === count ) {

    arrows.children(".next").addClass("disabled");

  } else {

    arrows.children().removeClass("disabled");

  }

}
