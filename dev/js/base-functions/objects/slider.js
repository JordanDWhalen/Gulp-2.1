// Markup reflected in base-elements/slider.html

// TODO: Resetting layout on resize, currently the buttons become disabled whenever the grid changes.

// Setting some defaults for each slider
function ug_sliderDefaults() {

  $(".ug.slider").each( function() {

    $(this).find(".slide-wrapper").find(".slide-item").first().addClass("active");
    $(this).attr("slide-shown", "0");

    var arrows = $(this).find(".arrows"),
        slideShown = $(this).attr("slide-shown");


    ug_sliderDisabledButtons(arrows, $(this));

  });

}

function ug_sliderLayout(){

  $(".ug.slider").each( function(index) {

    $(this).addClass("" + index);

    var self = $(this),
    slideWrapper = self.find(".slide-wrapper"),
    wrapper = self.find(".wrapper"),
    arrows = self.find(".arrows"),
    count = slideWrapper.find(".slide").length,
    width = 100 * count + "%",
    sliderNumber = $(this).attr("class").split(" ").pop(),
    slides = $(".ug.slider." + sliderNumber + " .slide-wrapper a");

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

      if( slides.parent().is(".slide") ) {
        slides.unwrap();
        for( var i = 0; i < slides.length; i+=5 ) {
          slides.slice(i, i+5).wrapAll('<div class="slide"></div>');
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


    ug_sliderDisabledButtons(arrows, $(this));

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

  // progress.children("a").removeClass("active");
  // progress.children("a:nth-of-type(" + (1 + slideShown) + ")").addClass("active");

  ug_sliderDisabledButtons(arrows, self);

}

function ug_sliderActiveSet() {
  $(".ug.slider").each( function(){
    var slideAmount = $(this).attr("slide-shown"),
    activeSlide = (slideAmount * -1 / 100) + 1,
    slideNumber = $(this).children().length;

  });
}

function ug_sliderDisabledButtons(arrows, slider) {

    var slideShown = parseInt(slider.attr("slide-shown")),
        count = slider.find(".slide").length;
        console.log(count);

    if( slideShown === 0 ){

      arrows.children(".prev").addClass("disabled");

    } else if ( (slideShown + 1) === count ) {

      arrows.children(".next").addClass("disabled");

    } else {

      arrows.children().removeClass("disabled");

    }

}

ug_sliderLayout();
ug_sliderDefaults();

$(window).resize( function() {
  ug_sliderLayout();
});

$(".ug.slider .arrows a").click( function(e){
  e.preventDefault();
  ug_sliderShift($(this));
});
