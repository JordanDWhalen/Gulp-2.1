// Markup reflected in base-elements/slider.html

// Setting some defaults for each slider
function ug_sliderHeroDefaults() {

  $(".ug.slider-hero").each( function() {
    var self = $(this),
        arrows = self.find(".arrows");


    $(this).find(".slide-wrapper").find(".slide").first().addClass("active");
    $(this).attr("slide-shown", "0");
    $(this).find(".active").removeClass("active");
    $(this).find(".progress span.0").addClass("active");
    $(this).find(".wrapper").velocity({ translateX: 0 });

    if( self.find(".progress").length > 0  ) {


      $(".progress span").remove();

      var  slideCount = self.find(".slide-item").length;

      for ( var i = 0; i < slideCount; i++ ) {
        $("<span class='" + i+ "'></span>").appendTo(".progress");
      }

      $(".ug.slider-hero .progress span").click( function(){
        console.log($(this));
        ug_sliderHeroShift($(this));
      });

    }


    // setTimeout( function() {
      ug_sliderHeroButtonSet(arrows, self);
    // }, 50);



  });

}

function ug_sliderHeroLayout(){

  $(".ug.slider-hero").each( function(index) {

    $(this).addClass("" + index);

    var self = $(this),
    slideWrapper = self.find(".slide-wrapper"),
    wrapper = self.find(".wrapper"),
    arrows = self.find(".arrows"),
    sliderNumber = $(this).attr("class").split(" ").pop(),
    slides = $(".ug.slider-hero." + sliderNumber + " .slide-wrapper a"),
    count = slides.length;

    $(this).css("opacity", "1");

  });

}

function ug_sliderHeroShift(arrow){

  self = arrow.parents(".ug.slider-hero"),
  slideWrapper = self.find(".slide-wrapper .wrapper"),
  count = self.find(".slide").length,
  slideAmount = 100,
  slideShown = parseInt(self.attr("slide-shown")),
  arrows = self.find(".arrows"),
  progress = self.find(".progress"),
  clickedArrow = arrow.attr("class").split(" ")[0];

  console.log($(self));

  if( clickedArrow === "next" ){

    slideShown++;
    self.attr( "slide-shown", slideShown );

    var slideTotal = slideAmount * (slideShown * -1);


    slideWrapper.velocity({ translateX: slideTotal + "%" }, { duration: 250, delay: 0 });

  } else if ( clickedArrow === "prev") {

    slideShown--;
    self.attr( "slide-shown", slideShown );

    var slideTotal = slideAmount * ( slideShown * -1);

    slideWrapper.velocity({ translateX: slideTotal + "%" }, { duration: 250, delay: 0 });

  } else {

    self.attr( "slide-shown", clickedArrow );

    var slideTotal = slideAmount * ( clickedArrow * -1 );

    slideWrapper.velocity({ translateX: slideTotal + "%" }, { duration: 250, delay: 0 });

  }

  // progress.children("a").removeClass("active");
  // progress.children("a:nth-of-type(" + (1 + slideShown) + ")").addClass("active");

  ug_sliderHeroButtonSet(arrows, self);

}

function ug_sliderHeroButtonSet(arrows, slider) {

    var slideShown = parseInt($(slider).attr("slide-shown")),
        count = slider.find(".slide-item").length;

    slider.find(".progress span").removeClass("active");
    slider.find(".progress ." + slideShown).addClass("active");

    if ( ((slideShown + 1) === count) && (slideShown === 0)){

      arrows.children().addClass("disabled");

    } else if ( (slideShown + 1) === count ) {

      arrows.children().removeClass("disabled");
      arrows.children(".next").addClass("disabled");

    }  else if( slideShown === 0 ) {

      arrows.children().removeClass("disabled");
      arrows.children(".prev").addClass("disabled");

    }  else {

      arrows.children().removeClass("disabled");

    }

}

ug_sliderHeroLayout();
ug_sliderHeroDefaults();

$(window).resize( function() {
  ug_sliderHeroLayout();
});

$(".ug.slider-hero .arrows a").click( function(e){
  e.preventDefault();
  ug_sliderHeroShift($(this));
});
