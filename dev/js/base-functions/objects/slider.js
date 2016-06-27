// Markup reflected in base-elements/slider.html

function ug_sliderLayout(){

  $(".ug.slider").each( function(index) {

    $(this).addClass("" + index);

    var self = $(this),
    slideWrapper = self.find(".slide-wrapper"),
    count = slideWrapper.find(".slide").length,
    width = 100 * count + "%",
    sliderNumber = $(this).attr("class").split(" ").pop(),
    slides = $(".ug.slider." + sliderNumber + " .slide-wrapper a");

    $(this).children(".arrows").children(".prev").addClass("disabled");

    self.attr("slide-shown", "0");

    console.log(slides.length);


    if( slides.parent().is(".slide") ) {

      slides.unwrap();

      for( var i = 0; i < slides.length; i+=4 ) {
        slides.slice(i, i+4).wrapAll('<div class="slide"></div>');
      }

    } else {

      for( var i = 0; i < slides.length; i+=4 ) {
        slides.slice(i, i+4).wrapAll('<div class="slide"></div>');
      }

    }

    if ( minWidth(1450) ) {
      console.log("true?");

      if( slides.parent().is(".slide") ) {
        slides.unwrap();
        for( var i = 0; i < slides.length; i+=5 ) {
          slides.slice(i, i+5).wrapAll('<div class="slide"></div>');
          console.log(i);
        }
      } else {
        for( var i = 0; i < slides.length; i+=5 ) {
          slides.slice(i, i+5).wrapAll('<div class="slide"></div>');
        }
      }
    }

    if ( minWidth(800) && maxWidth(1200) ) {
      if( slides.parent().is(".slide") ) {
        slides.unwrap();
        for( var i = 0; i < slides.length; i+=3 ) {
          slides.slice(i, i+3).wrapAll('<div class="slide"></div>');
        }
      } else {
        for( var i = 0; i < slides.length; i+=3 ) {
          slides.slice(i, i+3).wrapAll('<div class="slide"></div>');
        }
      }
    }

  });

}

function ug_sliderShift(arrow){

  self = arrow.parents(".ug.slider"),
  slideWrapper = self.find(".slide-wrapper .wrapper"),
  count = self.find(".slide").length,
  slideAmount = 100,
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


$(window).resize( function() {
  ug_sliderLayout();
});

$(".ug.slider .arrows a").click( function(e){
  e.preventDefault();
  ug_sliderShift($(this));
});


ug_sliderLayout();
