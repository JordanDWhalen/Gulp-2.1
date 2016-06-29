
function minWidth(width) {
  var screenWidth =  $(window).width();
  if ( screenWidth >= width ) {
    return true;
  } else {
    return false;
  }
}

function maxWidth(width) {
  var screenWidth =  $(window).width();
  if ( screenWidth <= width ) {
    return true;
  } else {
    return false;
  }
}

// This function takes care of all the weir issues you might run into when trying to do a fixed position overlay on mobile.

function positionFauxed(on){
  var headerOffset = parseInt($("header.global").height(), 10);
  var fakeScroll = $(window).scrollTop() - headerOffset;
  var scrollAmount = parseInt($("main.noscroll").css("top"), 10) - headerOffset;
  scrollAmount = parseInt(scrollAmount, 10);
  scrollAmount = scrollAmount * -1;

  if(on === true){
    $("main").addClass("noscroll");
    $("main").css("top", + (fakeScroll  * -1));

  } else {

    setTimeout( function(){
      $("main").removeClass("noscroll");
      $("main").css("top", "0");
      $(window).scrollTop(scrollAmount);
    }, 1);

  }
}

$(".ug nav.global").clone().appendTo("header.ug.global div.menu");

$(".ug div.menu .menu-trigger").click( function(){
  $(this).parent().toggleClass("open");
});

$(".ug .dropdown").click(function(){
  $(this).toggleClass("open");
  // Consider adding in code to dynamically track the height of a given dropdown
});

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

function ug_sliderGridLayout(){
  // Adding a unique class to each slider for differentiation of
  $(".ug.slider-grid").each( function( index, value ) {

    $(this).addClass("" + index);

    var sliderNumber = $(this).attr("class").split(" ").pop(),

    products = $(".ug.slider-grid." + sliderNumber + " .wrapper a");

    if( products.parent().is(".slide") ) {

      products.unwrap();

      for( var i = 0; i < products.length; i+=4 ) {
        products.slice(i, i+4).wrapAll('<div class="slide"></div>');
      }

    } else {

      for( var i = 0; i < products.length; i+=4 ) {
        products.slice(i, i+4).wrapAll('<div class="slide"></div>');
      }

    }

    if ( minWidth(1450) ) {
      if( products.parent().is(".slide") ) {
        products.unwrap();
        for( var i = 0; i < products.length; i+=5 ) {
          products.slice(i, i+5).wrapAll('<div class="slide"></div>');
        }
      } else {
        for( var i = 0; i < products.length; i+=5 ) {
          products.slice(i, i+5).wrapAll('<div class="slide"></div>');
        }
      }
    }

    if ( minWidth(800) && maxWidth(1200) ) {
      if( products.parent().is(".slide") ) {
        products.unwrap();
        for( var i = 0; i < products.length; i+=3 ) {
          products.slice(i, i+3).wrapAll('<div class="slide"></div>');
        }
      } else {
        for( var i = 0; i < products.length; i+=3 ) {
          products.slice(i, i+3).wrapAll('<div class="slide"></div>');
        }
      }
    }

  });
}

function ug_viewAllLayout(currentWrapper, currentSliderClass, currentSlides, button) {

  if( $(currentWrapper).children(".wrapper").hasClass("view-all") ){

    $(button).text("View All");

    $(currentWrapper).addClass("line");
    $(currentWrapper).removeClass("grid");

    $(".ug.slider-grid." + currentSliderClass + " .prev").removeClass("hidden");
    $(".ug.slider-grid." + currentSliderClass + " .next").removeClass("hidden");

    $(currentWrapper).css("transform", "translateX(0)");
    $(currentWrapper).parents(".ug.slider-grid").attr("slide-shown", "0");

    $(currentWrapper).children(".wrapper").removeClass("view-all");
    $(currentSlides).attr("class", "slide");

    ug_sliderGridActiveSet("0");

  } else {

    $(button).text("View Less");

    $(currentWrapper).removeClass("line");
    $(currentWrapper).addClass("grid");

    $(".ug.slider-grid." + currentSliderClass + " .prev").addClass("hidden");
    $(".ug.slider-grid." + currentSliderClass + " .next").addClass("hidden");

    $(currentWrapper).css("transform", "translateX(0)");
    $(currentWrapper).parents(".ug.slider-grid").attr("slide-shown", "0");

    $(currentWrapper).children(".wrapper").addClass("view-all");
    $(currentSlides).attr("class", "slide active");

  }

}

// Setting some defaults for each slider
function ug_sliderGridDefaults() {
  $(".ug.slider-grid").each( function(index, value) {
    $(this).children().children(".slide-wrapper").children().children().first().addClass("active");
    $(this).children().children(".lead").children().children(".prev").addClass("disabled");
    $(this).attr("slide-shown", "0");

    var slideNumber = $(this).children().children(".slide-wrapper").children().children(".slide").length;

    if(slideNumber <= 1){
      $(this).children().children(".lead").children(".controls").hide();
    }
  });
}

function ug_viewAllDefaults() {

  $(".ug.slider-grid").each( function() {

    var currentWrapper = $(this).children().children(".slide-wrapper"),
    currentSliderClass = $(this).attr("class").split(" ").pop(),
    currentSlides = currentWrapper.children().children(".slide");

    if(currentWrapper.hasClass("grid")){

      $(".ug.slider-grid." + currentSliderClass + " .button.view-all").text("View Less");

      $(currentWrapper).removeClass("line");
      $(currentWrapper).addClass("grid");

      $(".ug.slider-grid." + currentSliderClass + " .prev").addClass("hidden");
      $(".ug.slider-grid." + currentSliderClass + " .next").addClass("hidden");

      $(currentWrapper).css("transform", "translateX(0)");
      $(currentWrapper).parents(".ug.slider-grid").attr("slide-shown", "0");

      $(currentWrapper).children(".wrapper").addClass("view-all");
      $(currentSlides).attr("class", "slide active");

    }

  });

};

// Setting the first slide active
function ug_sliderGridActiveSet( sliderClass ) {

  $(".ug.slider-grid." + sliderClass).each( function(){

    var activeSlide = parseInt($(this).attr("slide-shown")) + 1;

    console.log($(this).find(".slide:nth-of-type(" + activeSlide + ")"));

    $(this).find(".slide.active").removeClass("active");

    $(this).find(".slide:nth-of-type(" + activeSlide + ")").addClass("active");

  });

}

// Creating a function to disable the arrow buttons based on slide position
function ug_disabledButtons( currentSliderClass ) {

  var slideTotal = ($(".ug.slider-grid." + currentSliderClass + " .wrapper .slide").length) - 1,
      currentSlide = parseInt($(".ug.slider-grid." + currentSliderClass).attr("slide-shown"));

  if( currentSlide === (slideTotal)){
    $(".ug.slider-grid." + currentSliderClass + " .next").addClass("disabled");
    if ( currentSlide !== 0 ){
      $(".ug.slider-grid." + currentSliderClass + " .prev").removeClass("disabled");
    }
  } else if( currentSlide === 0 ) {
    $(".ug.slider-grid." + currentSliderClass + " .prev").addClass("disabled");
    if ( currentSlide !== slideTotal ){
      $(".ug.slider-grid." + currentSliderClass + " .next").removeClass("disabled");
    }
  } else {
    $(".ug.slider-grid." + currentSliderClass + " .button").removeClass("disabled");
  }

}

// Setting up functions for shifting the sliders appropriately

function ug_slideLeft(currentSlide, currentWrapper, currentActiveSlide, currentSliderClass){

  currentSlide--;

  slideAmount = currentSlide * -100;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + slideAmount + "%)");
  $(currentWrapper).parents(".ug.slider-grid").attr("slide-shown", currentSlide);
  $(currentActiveSlide).prev().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    ug_disabledButtons(currentSliderClass);
    ug_sliderGridActiveSet(currentSliderClass);
  }, 50)

}

function ug_slideRight(currentSlide, currentWrapper, currentActiveSlide, currentSliderClass){

  currentSlide++;

  slideAmount = currentSlide * -100;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + slideAmount + "%)");
  $(currentWrapper).parents(".ug.slider-grid").attr("slide-shown", currentSlide);
  $(currentActiveSlide).prev().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    ug_disabledButtons(currentSliderClass);
    ug_sliderGridActiveSet(currentSliderClass);
  }, 50)

}

ug_sliderGridLayout();
ug_sliderGridDefaults();
ug_viewAllDefaults();


$(window).resize( function() {
  ug_sliderGridLayout();
  ug_sliderGridActiveSet("0");
});



$(".ug.slider-grid .button").click(function(e){
  e.preventDefault();
  var button = $(this),
  type = $(this).attr("class").split(" ").pop(),
  currentSliderClass = $(this).parents(".slider-grid").attr("class").split(" ").pop(),
  currentWrapper = $(this).parent().parent().parent().children(".slide-wrapper"),
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children().children(".active"),

  currentAmount = $(button).parents(".ug.slider-grid").attr("slide-shown");

  if(type === "next"){

    ug_slideRight( currentAmount, currentWrapper, currentActiveSlide, currentSliderClass);

  } else if (type === "prev"){

    ug_slideLeft( currentAmount, currentWrapper, currentActiveSlide, currentSliderClass);

  } else if ( type === "view-all" ){

    ug_viewAllLayout(currentWrapper, currentSliderClass, currentSlides, button);

  }

  ug_disabledButtons(currentSliderClass);

});

$(".ug.slider-grid .slide-item").click( function(e){

  var parentSlide = $(this).parent(),
  currentWrapper = $(this).parents(".slide-wrapper"),
  currentSliderClass = $(currentWrapper).parents(".ug.slider-grid").attr("class").split(" ").pop(),
  currentAmount =  $(currentWrapper).parents(".ug.slider-grid").attr("slide-shown"),
  shiftAmount = 100,
  potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children(".active");


  if( !parentSlide.hasClass("active") ){
    e.preventDefault();

    if( parentSlide.prev().hasClass("active") ) {

      ug_slideRight( currentAmount, currentWrapper, currentActiveSlide, currentSliderClass);

    } else if ( parentSlide.next().hasClass("active") ){

      ug_slideLeft( currentAmount, currentWrapper, currentActiveSlide, currentSliderClass);

    }
  }

});

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

// Markup reflected in base-elements/slider.html

// Setting some defaults for each slider
function ug_sliderDefaults() {

  $(".ug.slider").each( function() {

    $(this).find(".slide-wrapper").find(".slide").first().addClass("active");
    $(this).attr("slide-shown", "0");
    $(this).find(".active").removeClass("active");
    $(this).find(".progress span.0").addClass("active");
    $(this).find(".wrapper").velocity({ translateX: 0 });

    var arrows = $(this).find(".arrows"),
        slideShown = $(this).attr("slide-shown");

    ug_sliderButtonSet(arrows, $(this));

  });

}

function ug_sliderLayout(){

  $(".ug.slider").each( function(index) {

    $(this).addClass("" + index);

    var self = $(this),
    slideWrapper = self.find(".slide-wrapper"),
    wrapper = self.find(".wrapper"),
    arrows = self.find(".arrows"),
    sliderNumber = $(this).attr("class").split(" ").pop(),
    slides = $(".ug.slider." + sliderNumber + " .slide-wrapper a"),
    count = slides.length;

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

    if( self.find(".progress").length > 0  ) {

      self.find(".progress span").remove();

      var  slideCount = self.find(".slide").length;


      for ( var i = 0; i < slideCount; i++ ) {
        $("<span class='" + i+ "'></span>").appendTo(self.find(".progress"));
      }

      $(".ug.slider .progress span").click( function(){
        console.log($(this));
        ug_sliderShift($(this));
      });

    }

    $(this).css("opacity", "1");

    ug_sliderButtonSet(arrows, $(this));

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

  console.log(arrow);

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

  ug_sliderButtonSet(arrows, self);

}

function ug_sliderButtonSet(arrows, slider) {

    var slideShown = parseInt(slider.attr("slide-shown")),
        count = slider.find(".slide").length;

    slider.find(".progress span").removeClass("active");
    slider.find(".progress ." + slideShown).addClass("active");

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiLCJiYXNlLWZ1bmN0aW9ucy9iYXNlLmpzIiwiYmFzZS1mdW5jdGlvbnMvY29tcG9uZW50cy9mYXV4LXBvc2l0aW9uLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9oZWFkZXIuanMiLCJiYXNlLWZ1bmN0aW9ucy9vYmplY3RzL2xpZ2h0Ym94LmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9zbGlkZXItZ3JpZC5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvc2xpZGVyLWhlcm8uanMiLCJiYXNlLWZ1bmN0aW9ucy9vYmplY3RzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiZnVuY3Rpb24gbWluV2lkdGgod2lkdGgpIHtcbiAgdmFyIHNjcmVlbldpZHRoID0gICQod2luZG93KS53aWR0aCgpO1xuICBpZiAoIHNjcmVlbldpZHRoID49IHdpZHRoICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXhXaWR0aCh3aWR0aCkge1xuICB2YXIgc2NyZWVuV2lkdGggPSAgJCh3aW5kb3cpLndpZHRoKCk7XG4gIGlmICggc2NyZWVuV2lkdGggPD0gd2lkdGggKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2YgYWxsIHRoZSB3ZWlyIGlzc3VlcyB5b3UgbWlnaHQgcnVuIGludG8gd2hlbiB0cnlpbmcgdG8gZG8gYSBmaXhlZCBwb3NpdGlvbiBvdmVybGF5IG9uIG1vYmlsZS5cblxuZnVuY3Rpb24gcG9zaXRpb25GYXV4ZWQob24pe1xuICB2YXIgaGVhZGVyT2Zmc2V0ID0gcGFyc2VJbnQoJChcImhlYWRlci5nbG9iYWxcIikuaGVpZ2h0KCksIDEwKTtcbiAgdmFyIGZha2VTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSBoZWFkZXJPZmZzZXQ7XG4gIHZhciBzY3JvbGxBbW91bnQgPSBwYXJzZUludCgkKFwibWFpbi5ub3Njcm9sbFwiKS5jc3MoXCJ0b3BcIiksIDEwKSAtIGhlYWRlck9mZnNldDtcbiAgc2Nyb2xsQW1vdW50ID0gcGFyc2VJbnQoc2Nyb2xsQW1vdW50LCAxMCk7XG4gIHNjcm9sbEFtb3VudCA9IHNjcm9sbEFtb3VudCAqIC0xO1xuXG4gIGlmKG9uID09PSB0cnVlKXtcbiAgICAkKFwibWFpblwiKS5hZGRDbGFzcyhcIm5vc2Nyb2xsXCIpO1xuICAgICQoXCJtYWluXCIpLmNzcyhcInRvcFwiLCArIChmYWtlU2Nyb2xsICAqIC0xKSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwibWFpblwiKS5yZW1vdmVDbGFzcyhcIm5vc2Nyb2xsXCIpO1xuICAgICAgJChcIm1haW5cIikuY3NzKFwidG9wXCIsIFwiMFwiKTtcbiAgICAgICQod2luZG93KS5zY3JvbGxUb3Aoc2Nyb2xsQW1vdW50KTtcbiAgICB9LCAxKTtcblxuICB9XG59XG4iLCIkKFwiLnVnIG5hdi5nbG9iYWxcIikuY2xvbmUoKS5hcHBlbmRUbyhcImhlYWRlci51Zy5nbG9iYWwgZGl2Lm1lbnVcIik7XG5cbiQoXCIudWcgZGl2Lm1lbnUgLm1lbnUtdHJpZ2dlclwiKS5jbGljayggZnVuY3Rpb24oKXtcbiAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG59KTtcblxuJChcIi51ZyAuZHJvcGRvd25cIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gIC8vIENvbnNpZGVyIGFkZGluZyBpbiBjb2RlIHRvIGR5bmFtaWNhbGx5IHRyYWNrIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiBkcm9wZG93blxufSk7XG4iLCJmdW5jdGlvbiB1Z19MaWdodGJveE9wZW4odHJpZ2dlcil7XG5cbiAgdmFyIGFjdGl2ZUJveCA9IHRyaWdnZXIuYXR0cihcImJveFwiKTtcblxuICBjb25zb2xlLmxvZyhhY3RpdmVCb3gpO1xuXG4gICQoXCIudWcubGlnaHRib3hbYm94PScwJ11cIiApLmFkZENsYXNzKFwib3BlblwiKTtcblxuICBwb3NpdGlvbkZhdXhlZCh0cnVlKTtcblxufVxuXG5mdW5jdGlvbiB1Z19MaWdodGJveENsb3NlKHRyaWdnZXIpe1xuXG4gIHZhciBhY3RpdmVCb3ggPSB0cmlnZ2VyLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCk7XG5cbiAgJChcIi51Zy5saWdodGJveC5cIiArIGFjdGl2ZUJveCkucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuXG4gIHBvc2l0aW9uRmF1eGVkKGZhbHNlKTtcblxufVxuXG4kKFwiLnVnIC5saWdodGJveC10cmlnZ2VyXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHVnX0xpZ2h0Ym94T3BlbigkKHRoaXMpKTtcblxufSk7XG5cbiQoXCIudWcubGlnaHRib3ggLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdWdfTGlnaHRib3hDbG9zZSgkKHRoaXMpKTtcblxufSk7XG4iLCJmdW5jdGlvbiB1Z19zbGlkZXJHcmlkTGF5b3V0KCl7XG4gIC8vIEFkZGluZyBhIHVuaXF1ZSBjbGFzcyB0byBlYWNoIHNsaWRlciBmb3IgZGlmZmVyZW50aWF0aW9uIG9mXG4gICQoXCIudWcuc2xpZGVyLWdyaWRcIikuZWFjaCggZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcblxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJcIiArIGluZGV4KTtcblxuICAgIHZhciBzbGlkZXJOdW1iZXIgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG5cbiAgICBwcm9kdWN0cyA9ICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBzbGlkZXJOdW1iZXIgKyBcIiAud3JhcHBlciBhXCIpO1xuXG4gICAgaWYoIHByb2R1Y3RzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuXG4gICAgICBwcm9kdWN0cy51bndyYXAoKTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoMTQ1MCkgKSB7XG4gICAgICBpZiggcHJvZHVjdHMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHByb2R1Y3RzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCg4MDApICYmIG1heFdpZHRoKDEyMDApICkge1xuICAgICAgaWYoIHByb2R1Y3RzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBwcm9kdWN0cy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9KTtcbn1cblxuZnVuY3Rpb24gdWdfdmlld0FsbExheW91dChjdXJyZW50V3JhcHBlciwgY3VycmVudFNsaWRlckNsYXNzLCBjdXJyZW50U2xpZGVzLCBidXR0b24pIHtcblxuICBpZiggJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5oYXNDbGFzcyhcInZpZXctYWxsXCIpICl7XG5cbiAgICAkKGJ1dHRvbikudGV4dChcIlZpZXcgQWxsXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuYWRkQ2xhc3MoXCJsaW5lXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLnJlbW92ZUNsYXNzKFwiZ3JpZFwiKTtcblxuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikucmVtb3ZlQ2xhc3MoXCJ2aWV3LWFsbFwiKTtcbiAgICAkKGN1cnJlbnRTbGlkZXMpLmF0dHIoXCJjbGFzc1wiLCBcInNsaWRlXCIpO1xuXG4gICAgdWdfc2xpZGVyR3JpZEFjdGl2ZVNldChcIjBcIik7XG5cbiAgfSBlbHNlIHtcblxuICAgICQoYnV0dG9uKS50ZXh0KFwiVmlldyBMZXNzXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikucmVtb3ZlQ2xhc3MoXCJsaW5lXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLmFkZENsYXNzKFwiZ3JpZFwiKTtcblxuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikuYWRkQ2xhc3MoXCJ2aWV3LWFsbFwiKTtcbiAgICAkKGN1cnJlbnRTbGlkZXMpLmF0dHIoXCJjbGFzc1wiLCBcInNsaWRlIGFjdGl2ZVwiKTtcblxuICB9XG5cbn1cblxuLy8gU2V0dGluZyBzb21lIGRlZmF1bHRzIGZvciBlYWNoIHNsaWRlclxuZnVuY3Rpb24gdWdfc2xpZGVyR3JpZERlZmF1bHRzKCkge1xuICAkKFwiLnVnLnNsaWRlci1ncmlkXCIpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5sZWFkXCIpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgIHZhciBzbGlkZU51bWJlciA9ICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIikubGVuZ3RoO1xuXG4gICAgaWYoc2xpZGVOdW1iZXIgPD0gMSl7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIubGVhZFwiKS5jaGlsZHJlbihcIi5jb250cm9sc1wiKS5oaWRlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdWdfdmlld0FsbERlZmF1bHRzKCkge1xuXG4gICQoXCIudWcuc2xpZGVyLWdyaWRcIikuZWFjaCggZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY3VycmVudFdyYXBwZXIgPSAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgICBjdXJyZW50U2xpZGVyQ2xhc3MgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gICAgY3VycmVudFNsaWRlcyA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIik7XG5cbiAgICBpZihjdXJyZW50V3JhcHBlci5oYXNDbGFzcyhcImdyaWRcIikpe1xuXG4gICAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLmJ1dHRvbi52aWV3LWFsbFwiKS50ZXh0KFwiVmlldyBMZXNzXCIpO1xuXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5yZW1vdmVDbGFzcyhcImxpbmVcIik7XG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5hZGRDbGFzcyhcImdyaWRcIik7XG5cbiAgICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKTtcbiAgICAgICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgICAgJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5hZGRDbGFzcyhcInZpZXctYWxsXCIpO1xuICAgICAgJChjdXJyZW50U2xpZGVzKS5hdHRyKFwiY2xhc3NcIiwgXCJzbGlkZSBhY3RpdmVcIik7XG5cbiAgICB9XG5cbiAgfSk7XG5cbn07XG5cbi8vIFNldHRpbmcgdGhlIGZpcnN0IHNsaWRlIGFjdGl2ZVxuZnVuY3Rpb24gdWdfc2xpZGVyR3JpZEFjdGl2ZVNldCggc2xpZGVyQ2xhc3MgKSB7XG5cbiAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIHNsaWRlckNsYXNzKS5lYWNoKCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGFjdGl2ZVNsaWRlID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIikpICsgMTtcblxuICAgIGNvbnNvbGUubG9nKCQodGhpcykuZmluZChcIi5zbGlkZTpudGgtb2YtdHlwZShcIiArIGFjdGl2ZVNsaWRlICsgXCIpXCIpKTtcblxuICAgICQodGhpcykuZmluZChcIi5zbGlkZS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAkKHRoaXMpLmZpbmQoXCIuc2xpZGU6bnRoLW9mLXR5cGUoXCIgKyBhY3RpdmVTbGlkZSArIFwiKVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICB9KTtcblxufVxuXG4vLyBDcmVhdGluZyBhIGZ1bmN0aW9uIHRvIGRpc2FibGUgdGhlIGFycm93IGJ1dHRvbnMgYmFzZWQgb24gc2xpZGUgcG9zaXRpb25cbmZ1bmN0aW9uIHVnX2Rpc2FibGVkQnV0dG9ucyggY3VycmVudFNsaWRlckNsYXNzICkge1xuXG4gIHZhciBzbGlkZVRvdGFsID0gKCQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAud3JhcHBlciAuc2xpZGVcIikubGVuZ3RoKSAtIDEsXG4gICAgICBjdXJyZW50U2xpZGUgPSBwYXJzZUludCgkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzKS5hdHRyKFwic2xpZGUtc2hvd25cIikpO1xuXG4gIGlmKCBjdXJyZW50U2xpZGUgPT09IChzbGlkZVRvdGFsKSl7XG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgaWYgKCBjdXJyZW50U2xpZGUgIT09IDAgKXtcbiAgICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIH1cbiAgfSBlbHNlIGlmKCBjdXJyZW50U2xpZGUgPT09IDAgKSB7XG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgaWYgKCBjdXJyZW50U2xpZGUgIT09IHNsaWRlVG90YWwgKXtcbiAgICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLmJ1dHRvblwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICB9XG5cbn1cblxuLy8gU2V0dGluZyB1cCBmdW5jdGlvbnMgZm9yIHNoaWZ0aW5nIHRoZSBzbGlkZXJzIGFwcHJvcHJpYXRlbHlcblxuZnVuY3Rpb24gdWdfc2xpZGVMZWZ0KGN1cnJlbnRTbGlkZSwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKXtcblxuICBjdXJyZW50U2xpZGUtLTtcblxuICBzbGlkZUFtb3VudCA9IGN1cnJlbnRTbGlkZSAqIC0xMDA7XG5cbiAgLy8gJChjdXJyZW50V3JhcHBlcikudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBjdXJyZW50QW1vdW50ICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogNTAwLCBlYXNpbmc6IFwic3dpbmdcIn0pO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKFwiICsgc2xpZGVBbW91bnQgKyBcIiUpXCIpO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBjdXJyZW50U2xpZGUpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucHJldigpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIHVnX2Rpc2FibGVkQnV0dG9ucyhjdXJyZW50U2xpZGVyQ2xhc3MpO1xuICAgIHVnX3NsaWRlckdyaWRBY3RpdmVTZXQoY3VycmVudFNsaWRlckNsYXNzKTtcbiAgfSwgNTApXG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVSaWdodChjdXJyZW50U2xpZGUsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyl7XG5cbiAgY3VycmVudFNsaWRlKys7XG5cbiAgc2xpZGVBbW91bnQgPSBjdXJyZW50U2xpZGUgKiAtMTAwO1xuXG4gIC8vICQoY3VycmVudFdyYXBwZXIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogY3VycmVudEFtb3VudCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDUwMCwgZWFzaW5nOiBcInN3aW5nXCJ9KTtcbiAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWChcIiArIHNsaWRlQW1vdW50ICsgXCIlKVwiKTtcbiAgJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgY3VycmVudFNsaWRlKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnByZXYoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICB1Z19kaXNhYmxlZEJ1dHRvbnMoY3VycmVudFNsaWRlckNsYXNzKTtcbiAgICB1Z19zbGlkZXJHcmlkQWN0aXZlU2V0KGN1cnJlbnRTbGlkZXJDbGFzcyk7XG4gIH0sIDUwKVxuXG59XG5cbnVnX3NsaWRlckdyaWRMYXlvdXQoKTtcbnVnX3NsaWRlckdyaWREZWZhdWx0cygpO1xudWdfdmlld0FsbERlZmF1bHRzKCk7XG5cblxuJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24oKSB7XG4gIHVnX3NsaWRlckdyaWRMYXlvdXQoKTtcbiAgdWdfc2xpZGVyR3JpZEFjdGl2ZVNldChcIjBcIik7XG59KTtcblxuXG5cbiQoXCIudWcuc2xpZGVyLWdyaWQgLmJ1dHRvblwiKS5jbGljayhmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB2YXIgYnV0dG9uID0gJCh0aGlzKSxcbiAgdHlwZSA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgY3VycmVudFNsaWRlckNsYXNzID0gJCh0aGlzKS5wYXJlbnRzKFwiLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gIGN1cnJlbnRXcmFwcGVyID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLFxuICBjdXJyZW50U2xpZGVzID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKSxcbiAgY3VycmVudEFjdGl2ZVNsaWRlID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5hY3RpdmVcIiksXG5cbiAgY3VycmVudEFtb3VudCA9ICQoYnV0dG9uKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiKTtcblxuICBpZih0eXBlID09PSBcIm5leHRcIil7XG5cbiAgICB1Z19zbGlkZVJpZ2h0KCBjdXJyZW50QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJwcmV2XCIpe1xuXG4gICAgdWdfc2xpZGVMZWZ0KCBjdXJyZW50QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG4gIH0gZWxzZSBpZiAoIHR5cGUgPT09IFwidmlldy1hbGxcIiApe1xuXG4gICAgdWdfdmlld0FsbExheW91dChjdXJyZW50V3JhcHBlciwgY3VycmVudFNsaWRlckNsYXNzLCBjdXJyZW50U2xpZGVzLCBidXR0b24pO1xuXG4gIH1cblxuICB1Z19kaXNhYmxlZEJ1dHRvbnMoY3VycmVudFNsaWRlckNsYXNzKTtcblxufSk7XG5cbiQoXCIudWcuc2xpZGVyLWdyaWQgLnNsaWRlLWl0ZW1cIikuY2xpY2soIGZ1bmN0aW9uKGUpe1xuXG4gIHZhciBwYXJlbnRTbGlkZSA9ICQodGhpcykucGFyZW50KCksXG4gIGN1cnJlbnRXcmFwcGVyID0gJCh0aGlzKS5wYXJlbnRzKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gIGN1cnJlbnRTbGlkZXJDbGFzcyA9ICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgY3VycmVudEFtb3VudCA9ICAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiKSxcbiAgc2hpZnRBbW91bnQgPSAxMDAsXG4gIHBvdGVudGlhbFNoaWZ0ID0gKHBhcnNlSW50KGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIikubGVuZ3RoLCAxMCkgLSAxKSAqIHNoaWZ0QW1vdW50ICogLTEsXG4gIGN1cnJlbnRTbGlkZXMgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLFxuICBjdXJyZW50QWN0aXZlU2xpZGUgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbihcIi5hY3RpdmVcIik7XG5cblxuICBpZiggIXBhcmVudFNsaWRlLmhhc0NsYXNzKFwiYWN0aXZlXCIpICl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYoIHBhcmVudFNsaWRlLnByZXYoKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcblxuICAgICAgdWdfc2xpZGVSaWdodCggY3VycmVudEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKTtcblxuICAgIH0gZWxzZSBpZiAoIHBhcmVudFNsaWRlLm5leHQoKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApe1xuXG4gICAgICB1Z19zbGlkZUxlZnQoIGN1cnJlbnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbiAgICB9XG4gIH1cblxufSk7XG4iLCIvLyBNYXJrdXAgcmVmbGVjdGVkIGluIGJhc2UtZWxlbWVudHMvc2xpZGVyLmh0bWxcblxuLy8gU2V0dGluZyBzb21lIGRlZmF1bHRzIGZvciBlYWNoIHNsaWRlclxuZnVuY3Rpb24gdWdfc2xpZGVySGVyb0RlZmF1bHRzKCkge1xuXG4gICQoXCIudWcuc2xpZGVyLWhlcm9cIikuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgICAgICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpO1xuXG5cbiAgICAkKHRoaXMpLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKS5maW5kKFwiLnNsaWRlXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuICAgICQodGhpcykuZmluZChcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLnByb2dyZXNzIHNwYW4uMFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIud3JhcHBlclwiKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IDAgfSk7XG5cbiAgICBpZiggc2VsZi5maW5kKFwiLnByb2dyZXNzXCIpLmxlbmd0aCA+IDAgICkge1xuXG5cbiAgICAgICQoXCIucHJvZ3Jlc3Mgc3BhblwiKS5yZW1vdmUoKTtcblxuICAgICAgdmFyICBzbGlkZUNvdW50ID0gc2VsZi5maW5kKFwiLnNsaWRlLWl0ZW1cIikubGVuZ3RoO1xuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzbGlkZUNvdW50OyBpKysgKSB7XG4gICAgICAgICQoXCI8c3BhbiBjbGFzcz0nXCIgKyBpKyBcIic+PC9zcGFuPlwiKS5hcHBlbmRUbyhcIi5wcm9ncmVzc1wiKTtcbiAgICAgIH1cblxuICAgICAgJChcIi51Zy5zbGlkZXItaGVybyAucHJvZ3Jlc3Mgc3BhblwiKS5jbGljayggZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKSk7XG4gICAgICAgIHVnX3NsaWRlckhlcm9TaGlmdCgkKHRoaXMpKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvLyBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIHVnX3NsaWRlckhlcm9CdXR0b25TZXQoYXJyb3dzLCBzZWxmKTtcbiAgICAvLyB9LCA1MCk7XG5cblxuXG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlckhlcm9MYXlvdXQoKXtcblxuICAkKFwiLnVnLnNsaWRlci1oZXJvXCIpLmVhY2goIGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiXCIgKyBpbmRleCk7XG5cbiAgICB2YXIgc2VsZiA9ICQodGhpcyksXG4gICAgc2xpZGVXcmFwcGVyID0gc2VsZi5maW5kKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gICAgd3JhcHBlciA9IHNlbGYuZmluZChcIi53cmFwcGVyXCIpLFxuICAgIGFycm93cyA9IHNlbGYuZmluZChcIi5hcnJvd3NcIiksXG4gICAgc2xpZGVyTnVtYmVyID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICAgIHNsaWRlcyA9ICQoXCIudWcuc2xpZGVyLWhlcm8uXCIgKyBzbGlkZXJOdW1iZXIgKyBcIiAuc2xpZGUtd3JhcHBlciBhXCIpLFxuICAgIGNvdW50ID0gc2xpZGVzLmxlbmd0aDtcblxuICAgICQodGhpcykuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVySGVyb1NoaWZ0KGFycm93KXtcblxuICBzZWxmID0gYXJyb3cucGFyZW50cyhcIi51Zy5zbGlkZXItaGVyb1wiKSxcbiAgc2xpZGVXcmFwcGVyID0gc2VsZi5maW5kKFwiLnNsaWRlLXdyYXBwZXIgLndyYXBwZXJcIiksXG4gIGNvdW50ID0gc2VsZi5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aCxcbiAgc2xpZGVBbW91bnQgPSAxMDAsXG4gIHNsaWRlU2hvd24gPSBwYXJzZUludChzZWxmLmF0dHIoXCJzbGlkZS1zaG93blwiKSksXG4gIGFycm93cyA9IHNlbGYuZmluZChcIi5hcnJvd3NcIiksXG4gIHByb2dyZXNzID0gc2VsZi5maW5kKFwiLnByb2dyZXNzXCIpLFxuICBjbGlja2VkQXJyb3cgPSBhcnJvdy5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpWzBdO1xuXG4gIGNvbnNvbGUubG9nKCQoc2VsZikpO1xuXG4gIGlmKCBjbGlja2VkQXJyb3cgPT09IFwibmV4dFwiICl7XG5cbiAgICBzbGlkZVNob3duKys7XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoc2xpZGVTaG93biAqIC0xKTtcblxuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfSBlbHNlIGlmICggY2xpY2tlZEFycm93ID09PSBcInByZXZcIikge1xuXG4gICAgc2xpZGVTaG93bi0tO1xuICAgIHNlbGYuYXR0ciggXCJzbGlkZS1zaG93blwiLCBzbGlkZVNob3duICk7XG5cbiAgICB2YXIgc2xpZGVUb3RhbCA9IHNsaWRlQW1vdW50ICogKCBzbGlkZVNob3duICogLTEpO1xuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHNlbGYuYXR0ciggXCJzbGlkZS1zaG93blwiLCBjbGlja2VkQXJyb3cgKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoIGNsaWNrZWRBcnJvdyAqIC0xICk7XG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9XG5cbiAgLy8gcHJvZ3Jlc3MuY2hpbGRyZW4oXCJhXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImE6bnRoLW9mLXR5cGUoXCIgKyAoMSArIHNsaWRlU2hvd24pICsgXCIpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIHVnX3NsaWRlckhlcm9CdXR0b25TZXQoYXJyb3dzLCBzZWxmKTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJIZXJvQnV0dG9uU2V0KGFycm93cywgc2xpZGVyKSB7XG5cbiAgICB2YXIgc2xpZGVTaG93biA9IHBhcnNlSW50KCQoc2xpZGVyKS5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICAgICAgICBjb3VudCA9IHNsaWRlci5maW5kKFwiLnNsaWRlLWl0ZW1cIikubGVuZ3RoO1xuXG4gICAgc2xpZGVyLmZpbmQoXCIucHJvZ3Jlc3Mgc3BhblwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICBzbGlkZXIuZmluZChcIi5wcm9ncmVzcyAuXCIgKyBzbGlkZVNob3duKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgIGlmICggKChzbGlkZVNob3duICsgMSkgPT09IGNvdW50KSAmJiAoc2xpZGVTaG93biA9PT0gMCkpe1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfSBlbHNlIGlmICggKHNsaWRlU2hvd24gKyAxKSA9PT0gY291bnQgKSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICBhcnJvd3MuY2hpbGRyZW4oXCIubmV4dFwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfSAgZWxzZSBpZiggc2xpZGVTaG93biA9PT0gMCApIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9ICBlbHNlIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH1cblxufVxuXG51Z19zbGlkZXJIZXJvTGF5b3V0KCk7XG51Z19zbGlkZXJIZXJvRGVmYXVsdHMoKTtcblxuJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24oKSB7XG4gIHVnX3NsaWRlckhlcm9MYXlvdXQoKTtcbn0pO1xuXG4kKFwiLnVnLnNsaWRlci1oZXJvIC5hcnJvd3MgYVwiKS5jbGljayggZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdWdfc2xpZGVySGVyb1NoaWZ0KCQodGhpcykpO1xufSk7XG4iLCIvLyBNYXJrdXAgcmVmbGVjdGVkIGluIGJhc2UtZWxlbWVudHMvc2xpZGVyLmh0bWxcblxuLy8gU2V0dGluZyBzb21lIGRlZmF1bHRzIGZvciBlYWNoIHNsaWRlclxuZnVuY3Rpb24gdWdfc2xpZGVyRGVmYXVsdHMoKSB7XG5cbiAgJChcIi51Zy5zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oKSB7XG5cbiAgICAkKHRoaXMpLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKS5maW5kKFwiLnNsaWRlXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuICAgICQodGhpcykuZmluZChcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLnByb2dyZXNzIHNwYW4uMFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIud3JhcHBlclwiKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IDAgfSk7XG5cbiAgICB2YXIgYXJyb3dzID0gJCh0aGlzKS5maW5kKFwiLmFycm93c1wiKSxcbiAgICAgICAgc2xpZGVTaG93biA9ICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIpO1xuXG4gICAgdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgJCh0aGlzKSk7XG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyTGF5b3V0KCl7XG5cbiAgJChcIi51Zy5zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJcIiArIGluZGV4KTtcblxuICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgICB3cmFwcGVyID0gc2VsZi5maW5kKFwiLndyYXBwZXJcIiksXG4gICAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgICBzbGlkZXJOdW1iZXIgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gICAgc2xpZGVzID0gJChcIi51Zy5zbGlkZXIuXCIgKyBzbGlkZXJOdW1iZXIgKyBcIiAuc2xpZGUtd3JhcHBlciBhXCIpLFxuICAgIGNvdW50ID0gc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmKCBzbGlkZXMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG5cbiAgICAgIHNsaWRlcy51bndyYXAoKTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDE0NTApICkge1xuXG4gICAgICBpZiggc2xpZGVzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBzbGlkZXMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCg4MDApICYmIG1heFdpZHRoKDEyMDApICkge1xuICAgICAgaWYoIHNsaWRlcy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgc2xpZGVzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCBzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIikubGVuZ3RoID4gMCAgKSB7XG5cbiAgICAgIHNlbGYuZmluZChcIi5wcm9ncmVzcyBzcGFuXCIpLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgIHNsaWRlQ291bnQgPSBzZWxmLmZpbmQoXCIuc2xpZGVcIikubGVuZ3RoO1xuXG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNsaWRlQ291bnQ7IGkrKyApIHtcbiAgICAgICAgJChcIjxzcGFuIGNsYXNzPSdcIiArIGkrIFwiJz48L3NwYW4+XCIpLmFwcGVuZFRvKHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKSk7XG4gICAgICB9XG5cbiAgICAgICQoXCIudWcuc2xpZGVyIC5wcm9ncmVzcyBzcGFuXCIpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpKTtcbiAgICAgICAgdWdfc2xpZGVyU2hpZnQoJCh0aGlzKSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgICQodGhpcykuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICB1Z19zbGlkZXJCdXR0b25TZXQoYXJyb3dzLCAkKHRoaXMpKTtcblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJTaGlmdChhcnJvdyl7XG5cbiAgc2VsZiA9IGFycm93LnBhcmVudHMoXCIudWcuc2xpZGVyXCIpLFxuICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlciAud3JhcHBlclwiKSxcbiAgY291bnQgPSBzZWxmLmZpbmQoXCIuc2xpZGVcIikubGVuZ3RoLFxuICBzbGlkZUFtb3VudCA9IDEwMCxcbiAgc2xpZGVTaG93biA9IHBhcnNlSW50KHNlbGYuYXR0cihcInNsaWRlLXNob3duXCIpKSxcbiAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgcHJvZ3Jlc3MgPSBzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIiksXG4gIGNsaWNrZWRBcnJvdyA9IGFycm93LmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIilbMF07XG5cbiAgY29uc29sZS5sb2coYXJyb3cpO1xuXG4gIGlmKCBjbGlja2VkQXJyb3cgPT09IFwibmV4dFwiICl7XG5cbiAgICBzbGlkZVNob3duKys7XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoc2xpZGVTaG93biAqIC0xKTtcblxuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfSBlbHNlIGlmICggY2xpY2tlZEFycm93ID09PSBcInByZXZcIikge1xuXG4gICAgc2xpZGVTaG93bi0tO1xuICAgIHNlbGYuYXR0ciggXCJzbGlkZS1zaG93blwiLCBzbGlkZVNob3duICk7XG5cbiAgICB2YXIgc2xpZGVUb3RhbCA9IHNsaWRlQW1vdW50ICogKCBzbGlkZVNob3duICogLTEpO1xuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHNlbGYuYXR0ciggXCJzbGlkZS1zaG93blwiLCBjbGlja2VkQXJyb3cgKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoIGNsaWNrZWRBcnJvdyAqIC0xICk7XG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9XG5cbiAgLy8gcHJvZ3Jlc3MuY2hpbGRyZW4oXCJhXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImE6bnRoLW9mLXR5cGUoXCIgKyAoMSArIHNsaWRlU2hvd24pICsgXCIpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIHVnX3NsaWRlckJ1dHRvblNldChhcnJvd3MsIHNlbGYpO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlckJ1dHRvblNldChhcnJvd3MsIHNsaWRlcikge1xuXG4gICAgdmFyIHNsaWRlU2hvd24gPSBwYXJzZUludChzbGlkZXIuYXR0cihcInNsaWRlLXNob3duXCIpKSxcbiAgICAgICAgY291bnQgPSBzbGlkZXIuZmluZChcIi5zbGlkZVwiKS5sZW5ndGg7XG5cbiAgICBzbGlkZXIuZmluZChcIi5wcm9ncmVzcyBzcGFuXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgIHNsaWRlci5maW5kKFwiLnByb2dyZXNzIC5cIiArIHNsaWRlU2hvd24pLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgaWYoIHNsaWRlU2hvd24gPT09IDAgKXtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKFwiLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gZWxzZSBpZiAoIChzbGlkZVNob3duICsgMSkgPT09IGNvdW50ICkge1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oXCIubmV4dFwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH1cblxufVxuXG51Z19zbGlkZXJMYXlvdXQoKTtcbnVnX3NsaWRlckRlZmF1bHRzKCk7XG5cbiQod2luZG93KS5yZXNpemUoIGZ1bmN0aW9uKCkge1xuICB1Z19zbGlkZXJMYXlvdXQoKTtcbn0pO1xuXG4kKFwiLnVnLnNsaWRlciAuYXJyb3dzIGFcIikuY2xpY2soIGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHVnX3NsaWRlclNoaWZ0KCQodGhpcykpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
