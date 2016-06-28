
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

function ug_gridSliderLayout(){
  // Adding a unique class to each slider for differentiation of
  $(".ug.grid-slider").each( function( index, value ) {

    $(this).addClass("" + index);

    var sliderNumber = $(this).attr("class").split(" ").pop(),

    products = $(".ug.grid-slider." + sliderNumber + " .wrapper a");

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

    $(".ug.grid-slider." + currentSliderClass + " .prev").removeClass("hidden");
    $(".ug.grid-slider." + currentSliderClass + " .next").removeClass("hidden");

    $(currentWrapper).css("transform", "translateX(0)");
    $(currentWrapper).attr("slide-shown", "0");

    $(currentWrapper).children(".wrapper").removeClass("view-all");
    $(currentSlides).attr("class", "slide");

    ug_gridSliderActiveSet();

  } else {

    $(button).text("View Less");

    $(currentWrapper).removeClass("line");
    $(currentWrapper).addClass("grid");

    $(".ug.grid-slider." + currentSliderClass + " .prev").addClass("hidden");
    $(".ug.grid-slider." + currentSliderClass + " .next").addClass("hidden");

    $(currentWrapper).css("transform", "translateX(0)");
    $(currentWrapper).attr("slide-shown", "0");

    $(currentWrapper).children(".wrapper").addClass("view-all");
    $(currentSlides).attr("class", "slide active");

  }

}

// Setting some defaults for each slider
function ug_gridSliderDefaults() {
  $(".ug.grid-slider").each( function(index, value) {
    $(this).children().children(".slide-wrapper").children().children().first().addClass("active");
    $(this).children().children(".lead").children().children(".prev").addClass("disabled");
    $(this).children().children(".slide-wrapper").attr("slide-shown", "0");

    var slideNumber = $(this).children().children(".slide-wrapper").children().children(".slide").length;

    if(slideNumber <= 1){
      $(this).children().children(".lead").children(".controls").hide();
    }
  });
}

function ug_viewAllDefaults() {

  $(".ug.grid-slider").each( function() {

    var currentWrapper = $(this).children().children(".slide-wrapper"),
    currentSliderClass = $(this).attr("class").split(" ").pop(),
    currentSlides = currentWrapper.children().children(".slide");

    if(currentWrapper.hasClass("grid")){

      $(".ug.grid-slider." + currentSliderClass + " .button.view-all").text("View Less");

      $(currentWrapper).removeClass("line");
      $(currentWrapper).addClass("grid");

      $(".ug.grid-slider." + currentSliderClass + " .prev").addClass("hidden");
      $(".ug.grid-slider." + currentSliderClass + " .next").addClass("hidden");

      $(currentWrapper).css("transform", "translateX(0)");
      $(currentWrapper).attr("slide-shown", "0");

      $(currentWrapper).children(".wrapper").addClass("view-all");
      $(currentSlides).attr("class", "slide active");

    }

  });

};

// Setting the first slide active
function ug_gridSliderActiveSet() {
  $(".ug.grid-slider .slide-wrapper").each( function(){
    var slideAmount = $(this).attr("slide-shown"),
    activeSlide = (slideAmount * -1 / 100) + 1,
    slideNumber = $(this).children().length;

    $(this).children().children(".slide:nth-child(" + activeSlide + ")").addClass("active");

  });
}

// Creating a function to disable the arrow buttons based on slide position
function ug_disabledButtons( currentSliderClass ) {

  var slideTotal = ($(".ug.grid-slider." + currentSliderClass + " .wrapper .slide").length) - 1,
      currentSlide = parseInt($(".ug.grid-slider." + currentSliderClass + " .slide-wrapper").attr("slide-shown"));

      console.log("Current Slide: " + currentSlide);
      console.log("Slide Total: " + (slideTotal))
      console.log(".ug.grid-slider." + currentSliderClass + " .slide-wrapper");


  if( currentSlide === (slideTotal)){
    $(".ug.grid-slider." + currentSliderClass + " .next").addClass("disabled");
    if ( currentSlide !== 0 ){
      $(".ug.grid-slider." + currentSliderClass + " .prev").removeClass("disabled");
    }
  } else if( currentSlide === 0 ) {
    $(".ug.grid-slider." + currentSliderClass + " .prev").addClass("disabled");
    if ( currentSlide !== slideTotal ){
      $(".ug.grid-slider." + currentSliderClass + " .next").removeClass("disabled");
    }
  } else {
    $(".ug.grid-slider." + currentSliderClass + " .button").removeClass("disabled");
  }

}

// Setting up functions for shifting the sliders appropriately

function ug_slideLeft(currentSlide, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift){

  currentSlide--;

  slideAmount = currentSlide * -100;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + slideAmount + "%)");
  $(currentWrapper).attr("slide-shown", currentSlide);
  $(currentActiveSlide).prev().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    ug_disabledButtons(currentSliderClass);
  }, 50)

}

function ug_slideRight(currentSlide, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift){

  currentSlide++;

  slideAmount = currentSlide * -100;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + slideAmount + "%)");
  $(currentWrapper).attr("slide-shown", currentSlide);
  $(currentActiveSlide).prev().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    ug_disabledButtons(currentSliderClass);
  }, 50)

}

ug_gridSliderLayout();
ug_gridSliderDefaults();
ug_viewAllDefaults();


$(window).resize( function() {
  ug_gridSliderLayout();
  ug_gridSliderActiveSet();
});



$(".ug.grid-slider .button").click(function(e){
  e.preventDefault();
  var button = $(this),
  type = $(this).attr("class").split(" ").pop(),
  currentSliderClass = $(this).parents(".grid-slider").attr("class").split(" ").pop(),
  currentWrapper = $(this).parent().parent().parent().children(".slide-wrapper"),
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children().children(".active"),

  currentAmount = parseInt(currentWrapper.attr("slide-shown"), 0);

  if(type === "next"){

    ug_slideRight(currentAmount, currentWrapper, currentActiveSlide, currentSliderClass);

  } else if (type === "prev"){

    ug_slideLeft(currentAmount, currentWrapper, currentActiveSlide, currentSliderClass);

  } else if ( type === "view-all" ){

    ug_viewAllLayout(currentWrapper, currentSliderClass, currentSlides, button);

  }

  ug_disabledButtons(currentSliderClass);

});

$(".ug.grid-slider .product").click( function(e){

  var parentSlide = $(this).parent(),
  currentWrapper = $(this).parent().parent().parent(),
  currentSliderClass = currentWrapper.parent().parent().attr("class").split(" ").pop(),
  currentAmount = parseInt(currentWrapper.attr("slide-shown"), 0),
  shiftAmount = 100,
  potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children().children(".active");



  if( !parentSlide.hasClass("active") ){
    e.preventDefault();

    if( parentSlide.prev().hasClass("active") ) {
      ug_slideRight( currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift );
    } else if ( parentSlide.next().hasClass("active") ){
      ug_slideLeft( currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift );
    }

  }
});

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

    // setTimeout(function(){

    if( self.find(".progress").length > 0  ) {

      console.log("running?");

      $(".progress span").remove();

      var  slideCount = self.find(".slide").length;


      for ( var i = 0; i < slideCount; i++ ) {
        $("<span class='" + i+ "'></span>").appendTo(".progress");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiLCJiYXNlLWZ1bmN0aW9ucy9iYXNlLmpzIiwiYmFzZS1mdW5jdGlvbnMvY29tcG9uZW50cy9mYXV4LXBvc2l0aW9uLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9ncmlkLXNsaWRlci5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvaGVhZGVyLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9saWdodGJveC5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIiLCJmdW5jdGlvbiBtaW5XaWR0aCh3aWR0aCkge1xuICB2YXIgc2NyZWVuV2lkdGggPSAgJCh3aW5kb3cpLndpZHRoKCk7XG4gIGlmICggc2NyZWVuV2lkdGggPj0gd2lkdGggKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heFdpZHRoKHdpZHRoKSB7XG4gIHZhciBzY3JlZW5XaWR0aCA9ICAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYgKCBzY3JlZW5XaWR0aCA8PSB3aWR0aCApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIFRoaXMgZnVuY3Rpb24gdGFrZXMgY2FyZSBvZiBhbGwgdGhlIHdlaXIgaXNzdWVzIHlvdSBtaWdodCBydW4gaW50byB3aGVuIHRyeWluZyB0byBkbyBhIGZpeGVkIHBvc2l0aW9uIG92ZXJsYXkgb24gbW9iaWxlLlxuXG5mdW5jdGlvbiBwb3NpdGlvbkZhdXhlZChvbil7XG4gIHZhciBoZWFkZXJPZmZzZXQgPSBwYXJzZUludCgkKFwiaGVhZGVyLmdsb2JhbFwiKS5oZWlnaHQoKSwgMTApO1xuICB2YXIgZmFrZVNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSAtIGhlYWRlck9mZnNldDtcbiAgdmFyIHNjcm9sbEFtb3VudCA9IHBhcnNlSW50KCQoXCJtYWluLm5vc2Nyb2xsXCIpLmNzcyhcInRvcFwiKSwgMTApIC0gaGVhZGVyT2Zmc2V0O1xuICBzY3JvbGxBbW91bnQgPSBwYXJzZUludChzY3JvbGxBbW91bnQsIDEwKTtcbiAgc2Nyb2xsQW1vdW50ID0gc2Nyb2xsQW1vdW50ICogLTE7XG5cbiAgaWYob24gPT09IHRydWUpe1xuICAgICQoXCJtYWluXCIpLmFkZENsYXNzKFwibm9zY3JvbGxcIik7XG4gICAgJChcIm1haW5cIikuY3NzKFwidG9wXCIsICsgKGZha2VTY3JvbGwgICogLTEpKTtcblxuICB9IGVsc2Uge1xuXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICQoXCJtYWluXCIpLnJlbW92ZUNsYXNzKFwibm9zY3JvbGxcIik7XG4gICAgICAkKFwibWFpblwiKS5jc3MoXCJ0b3BcIiwgXCIwXCIpO1xuICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChzY3JvbGxBbW91bnQpO1xuICAgIH0sIDEpO1xuXG4gIH1cbn1cbiIsImZ1bmN0aW9uIHVnX2dyaWRTbGlkZXJMYXlvdXQoKXtcbiAgLy8gQWRkaW5nIGEgdW5pcXVlIGNsYXNzIHRvIGVhY2ggc2xpZGVyIGZvciBkaWZmZXJlbnRpYXRpb24gb2ZcbiAgJChcIi51Zy5ncmlkLXNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIlwiICsgaW5kZXgpO1xuXG4gICAgdmFyIHNsaWRlck51bWJlciA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcblxuICAgIHByb2R1Y3RzID0gJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIHNsaWRlck51bWJlciArIFwiIC53cmFwcGVyIGFcIik7XG5cbiAgICBpZiggcHJvZHVjdHMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG5cbiAgICAgIHByb2R1Y3RzLnVud3JhcCgpO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCgxNDUwKSApIHtcbiAgICAgIGlmKCBwcm9kdWN0cy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgcHJvZHVjdHMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDgwMCkgJiYgbWF4V2lkdGgoMTIwMCkgKSB7XG4gICAgICBpZiggcHJvZHVjdHMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHByb2R1Y3RzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1Z192aWV3QWxsTGF5b3V0KGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50U2xpZGVyQ2xhc3MsIGN1cnJlbnRTbGlkZXMsIGJ1dHRvbikge1xuXG4gIGlmKCAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLmhhc0NsYXNzKFwidmlldy1hbGxcIikgKXtcblxuICAgICQoYnV0dG9uKS50ZXh0KFwiVmlldyBBbGxcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5hZGRDbGFzcyhcImxpbmVcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikucmVtb3ZlQ2xhc3MoXCJncmlkXCIpO1xuXG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikucmVtb3ZlQ2xhc3MoXCJ2aWV3LWFsbFwiKTtcbiAgICAkKGN1cnJlbnRTbGlkZXMpLmF0dHIoXCJjbGFzc1wiLCBcInNsaWRlXCIpO1xuXG4gICAgdWdfZ3JpZFNsaWRlckFjdGl2ZVNldCgpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICAkKGJ1dHRvbikudGV4dChcIlZpZXcgTGVzc1wiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLnJlbW92ZUNsYXNzKFwibGluZVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5hZGRDbGFzcyhcImdyaWRcIik7XG5cbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5hZGRDbGFzcyhcInZpZXctYWxsXCIpO1xuICAgICQoY3VycmVudFNsaWRlcykuYXR0cihcImNsYXNzXCIsIFwic2xpZGUgYWN0aXZlXCIpO1xuXG4gIH1cblxufVxuXG4vLyBTZXR0aW5nIHNvbWUgZGVmYXVsdHMgZm9yIGVhY2ggc2xpZGVyXG5mdW5jdGlvbiB1Z19ncmlkU2xpZGVyRGVmYXVsdHMoKSB7XG4gICQoXCIudWcuZ3JpZC1zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIikuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmxlYWRcIikuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgIHZhciBzbGlkZU51bWJlciA9ICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIikubGVuZ3RoO1xuXG4gICAgaWYoc2xpZGVOdW1iZXIgPD0gMSl7XG4gICAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIubGVhZFwiKS5jaGlsZHJlbihcIi5jb250cm9sc1wiKS5oaWRlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdWdfdmlld0FsbERlZmF1bHRzKCkge1xuXG4gICQoXCIudWcuZ3JpZC1zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY3VycmVudFdyYXBwZXIgPSAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgICBjdXJyZW50U2xpZGVyQ2xhc3MgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gICAgY3VycmVudFNsaWRlcyA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIik7XG5cbiAgICBpZihjdXJyZW50V3JhcHBlci5oYXNDbGFzcyhcImdyaWRcIikpe1xuXG4gICAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLmJ1dHRvbi52aWV3LWFsbFwiKS50ZXh0KFwiVmlldyBMZXNzXCIpO1xuXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5yZW1vdmVDbGFzcyhcImxpbmVcIik7XG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5hZGRDbGFzcyhcImdyaWRcIik7XG5cbiAgICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKTtcbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikuYWRkQ2xhc3MoXCJ2aWV3LWFsbFwiKTtcbiAgICAgICQoY3VycmVudFNsaWRlcykuYXR0cihcImNsYXNzXCIsIFwic2xpZGUgYWN0aXZlXCIpO1xuXG4gICAgfVxuXG4gIH0pO1xuXG59O1xuXG4vLyBTZXR0aW5nIHRoZSBmaXJzdCBzbGlkZSBhY3RpdmVcbmZ1bmN0aW9uIHVnX2dyaWRTbGlkZXJBY3RpdmVTZXQoKSB7XG4gICQoXCIudWcuZ3JpZC1zbGlkZXIgLnNsaWRlLXdyYXBwZXJcIikuZWFjaCggZnVuY3Rpb24oKXtcbiAgICB2YXIgc2xpZGVBbW91bnQgPSAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiKSxcbiAgICBhY3RpdmVTbGlkZSA9IChzbGlkZUFtb3VudCAqIC0xIC8gMTAwKSArIDEsXG4gICAgc2xpZGVOdW1iZXIgPSAkKHRoaXMpLmNoaWxkcmVuKCkubGVuZ3RoO1xuXG4gICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlOm50aC1jaGlsZChcIiArIGFjdGl2ZVNsaWRlICsgXCIpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIH0pO1xufVxuXG4vLyBDcmVhdGluZyBhIGZ1bmN0aW9uIHRvIGRpc2FibGUgdGhlIGFycm93IGJ1dHRvbnMgYmFzZWQgb24gc2xpZGUgcG9zaXRpb25cbmZ1bmN0aW9uIHVnX2Rpc2FibGVkQnV0dG9ucyggY3VycmVudFNsaWRlckNsYXNzICkge1xuXG4gIHZhciBzbGlkZVRvdGFsID0gKCQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAud3JhcHBlciAuc2xpZGVcIikubGVuZ3RoKSAtIDEsXG4gICAgICBjdXJyZW50U2xpZGUgPSBwYXJzZUludCgkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnNsaWRlLXdyYXBwZXJcIikuYXR0cihcInNsaWRlLXNob3duXCIpKTtcblxuICAgICAgY29uc29sZS5sb2coXCJDdXJyZW50IFNsaWRlOiBcIiArIGN1cnJlbnRTbGlkZSk7XG4gICAgICBjb25zb2xlLmxvZyhcIlNsaWRlIFRvdGFsOiBcIiArIChzbGlkZVRvdGFsKSlcbiAgICAgIGNvbnNvbGUubG9nKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnNsaWRlLXdyYXBwZXJcIik7XG5cblxuICBpZiggY3VycmVudFNsaWRlID09PSAoc2xpZGVUb3RhbCkpe1xuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIGlmICggY3VycmVudFNsaWRlICE9PSAwICl7XG4gICAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG4gIH0gZWxzZSBpZiggY3VycmVudFNsaWRlID09PSAwICkge1xuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIGlmICggY3VycmVudFNsaWRlICE9PSBzbGlkZVRvdGFsICl7XG4gICAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG59XG5cbi8vIFNldHRpbmcgdXAgZnVuY3Rpb25zIGZvciBzaGlmdGluZyB0aGUgc2xpZGVycyBhcHByb3ByaWF0ZWx5XG5cbmZ1bmN0aW9uIHVnX3NsaWRlTGVmdChjdXJyZW50U2xpZGUsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcywgcG90ZW50aWFsU2hpZnQpe1xuXG4gIGN1cnJlbnRTbGlkZS0tO1xuXG4gIHNsaWRlQW1vdW50ID0gY3VycmVudFNsaWRlICogLTEwMDtcblxuICAvLyAkKGN1cnJlbnRXcmFwcGVyKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IGN1cnJlbnRBbW91bnQgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiA1MDAsIGVhc2luZzogXCJzd2luZ1wifSk7XG4gICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoXCIgKyBzbGlkZUFtb3VudCArIFwiJSlcIik7XG4gICQoY3VycmVudFdyYXBwZXIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBjdXJyZW50U2xpZGUpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucHJldigpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIHVnX2Rpc2FibGVkQnV0dG9ucyhjdXJyZW50U2xpZGVyQ2xhc3MpO1xuICB9LCA1MClcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZVJpZ2h0KGN1cnJlbnRTbGlkZSwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzLCBwb3RlbnRpYWxTaGlmdCl7XG5cbiAgY3VycmVudFNsaWRlKys7XG5cbiAgc2xpZGVBbW91bnQgPSBjdXJyZW50U2xpZGUgKiAtMTAwO1xuXG4gIC8vICQoY3VycmVudFdyYXBwZXIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogY3VycmVudEFtb3VudCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDUwMCwgZWFzaW5nOiBcInN3aW5nXCJ9KTtcbiAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWChcIiArIHNsaWRlQW1vdW50ICsgXCIlKVwiKTtcbiAgJChjdXJyZW50V3JhcHBlcikuYXR0cihcInNsaWRlLXNob3duXCIsIGN1cnJlbnRTbGlkZSk7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5wcmV2KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgdWdfZGlzYWJsZWRCdXR0b25zKGN1cnJlbnRTbGlkZXJDbGFzcyk7XG4gIH0sIDUwKVxuXG59XG5cbnVnX2dyaWRTbGlkZXJMYXlvdXQoKTtcbnVnX2dyaWRTbGlkZXJEZWZhdWx0cygpO1xudWdfdmlld0FsbERlZmF1bHRzKCk7XG5cblxuJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24oKSB7XG4gIHVnX2dyaWRTbGlkZXJMYXlvdXQoKTtcbiAgdWdfZ3JpZFNsaWRlckFjdGl2ZVNldCgpO1xufSk7XG5cblxuXG4kKFwiLnVnLmdyaWQtc2xpZGVyIC5idXR0b25cIikuY2xpY2soZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdmFyIGJ1dHRvbiA9ICQodGhpcyksXG4gIHR5cGUgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gIGN1cnJlbnRTbGlkZXJDbGFzcyA9ICQodGhpcykucGFyZW50cyhcIi5ncmlkLXNsaWRlclwiKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICBjdXJyZW50V3JhcHBlciA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgY3VycmVudFNsaWRlcyA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIiksXG4gIGN1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuYWN0aXZlXCIpLFxuXG4gIGN1cnJlbnRBbW91bnQgPSBwYXJzZUludChjdXJyZW50V3JhcHBlci5hdHRyKFwic2xpZGUtc2hvd25cIiksIDApO1xuXG4gIGlmKHR5cGUgPT09IFwibmV4dFwiKXtcblxuICAgIHVnX3NsaWRlUmlnaHQoY3VycmVudEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKTtcblxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicHJldlwiKXtcblxuICAgIHVnX3NsaWRlTGVmdChjdXJyZW50QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG4gIH0gZWxzZSBpZiAoIHR5cGUgPT09IFwidmlldy1hbGxcIiApe1xuXG4gICAgdWdfdmlld0FsbExheW91dChjdXJyZW50V3JhcHBlciwgY3VycmVudFNsaWRlckNsYXNzLCBjdXJyZW50U2xpZGVzLCBidXR0b24pO1xuXG4gIH1cblxuICB1Z19kaXNhYmxlZEJ1dHRvbnMoY3VycmVudFNsaWRlckNsYXNzKTtcblxufSk7XG5cbiQoXCIudWcuZ3JpZC1zbGlkZXIgLnByb2R1Y3RcIikuY2xpY2soIGZ1bmN0aW9uKGUpe1xuXG4gIHZhciBwYXJlbnRTbGlkZSA9ICQodGhpcykucGFyZW50KCksXG4gIGN1cnJlbnRXcmFwcGVyID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKSxcbiAgY3VycmVudFNsaWRlckNsYXNzID0gY3VycmVudFdyYXBwZXIucGFyZW50KCkucGFyZW50KCkuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgY3VycmVudEFtb3VudCA9IHBhcnNlSW50KGN1cnJlbnRXcmFwcGVyLmF0dHIoXCJzbGlkZS1zaG93blwiKSwgMCksXG4gIHNoaWZ0QW1vdW50ID0gMTAwLFxuICBwb3RlbnRpYWxTaGlmdCA9IChwYXJzZUludChjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLmxlbmd0aCwgMTApIC0gMSkgKiBzaGlmdEFtb3VudCAqIC0xLFxuICBjdXJyZW50U2xpZGVzID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKSxcbiAgY3VycmVudEFjdGl2ZVNsaWRlID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5hY3RpdmVcIik7XG5cblxuXG4gIGlmKCAhcGFyZW50U2xpZGUuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiggcGFyZW50U2xpZGUucHJldigpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICkge1xuICAgICAgdWdfc2xpZGVSaWdodCggY3VycmVudEFtb3VudCwgc2hpZnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcywgcG90ZW50aWFsU2hpZnQgKTtcbiAgICB9IGVsc2UgaWYgKCBwYXJlbnRTbGlkZS5uZXh0KCkuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKXtcbiAgICAgIHVnX3NsaWRlTGVmdCggY3VycmVudEFtb3VudCwgc2hpZnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcywgcG90ZW50aWFsU2hpZnQgKTtcbiAgICB9XG5cbiAgfVxufSk7XG4iLCIkKFwiLnVnIG5hdi5nbG9iYWxcIikuY2xvbmUoKS5hcHBlbmRUbyhcImhlYWRlci51Zy5nbG9iYWwgZGl2Lm1lbnVcIik7XG5cbiQoXCIudWcgZGl2Lm1lbnUgLm1lbnUtdHJpZ2dlclwiKS5jbGljayggZnVuY3Rpb24oKXtcbiAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG59KTtcblxuJChcIi51ZyAuZHJvcGRvd25cIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gIC8vIENvbnNpZGVyIGFkZGluZyBpbiBjb2RlIHRvIGR5bmFtaWNhbGx5IHRyYWNrIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiBkcm9wZG93blxufSk7XG4iLCJmdW5jdGlvbiB1Z19MaWdodGJveE9wZW4odHJpZ2dlcil7XG5cbiAgdmFyIGFjdGl2ZUJveCA9IHRyaWdnZXIuYXR0cihcImJveFwiKTtcblxuICBjb25zb2xlLmxvZyhhY3RpdmVCb3gpO1xuXG4gICQoXCIudWcubGlnaHRib3hbYm94PScwJ11cIiApLmFkZENsYXNzKFwib3BlblwiKTtcblxuICBwb3NpdGlvbkZhdXhlZCh0cnVlKTtcblxufVxuXG5mdW5jdGlvbiB1Z19MaWdodGJveENsb3NlKHRyaWdnZXIpe1xuXG4gIHZhciBhY3RpdmVCb3ggPSB0cmlnZ2VyLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCk7XG5cbiAgJChcIi51Zy5saWdodGJveC5cIiArIGFjdGl2ZUJveCkucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuXG4gIHBvc2l0aW9uRmF1eGVkKGZhbHNlKTtcblxufVxuXG4kKFwiLnVnIC5saWdodGJveC10cmlnZ2VyXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHVnX0xpZ2h0Ym94T3BlbigkKHRoaXMpKTtcblxufSk7XG5cbiQoXCIudWcubGlnaHRib3ggLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdWdfTGlnaHRib3hDbG9zZSgkKHRoaXMpKTtcblxufSk7XG4iLCIvLyBNYXJrdXAgcmVmbGVjdGVkIGluIGJhc2UtZWxlbWVudHMvc2xpZGVyLmh0bWxcblxuLy8gU2V0dGluZyBzb21lIGRlZmF1bHRzIGZvciBlYWNoIHNsaWRlclxuZnVuY3Rpb24gdWdfc2xpZGVyRGVmYXVsdHMoKSB7XG5cbiAgJChcIi51Zy5zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oKSB7XG5cbiAgICAkKHRoaXMpLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKS5maW5kKFwiLnNsaWRlXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuICAgICQodGhpcykuZmluZChcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLnByb2dyZXNzIHNwYW4uMFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIud3JhcHBlclwiKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IDAgfSk7XG5cbiAgICB2YXIgYXJyb3dzID0gJCh0aGlzKS5maW5kKFwiLmFycm93c1wiKSxcbiAgICAgICAgc2xpZGVTaG93biA9ICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIpO1xuXG4gICAgdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgJCh0aGlzKSk7XG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyTGF5b3V0KCl7XG5cbiAgJChcIi51Zy5zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJcIiArIGluZGV4KTtcblxuICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgICB3cmFwcGVyID0gc2VsZi5maW5kKFwiLndyYXBwZXJcIiksXG4gICAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgICBzbGlkZXJOdW1iZXIgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gICAgc2xpZGVzID0gJChcIi51Zy5zbGlkZXIuXCIgKyBzbGlkZXJOdW1iZXIgKyBcIiAuc2xpZGUtd3JhcHBlciBhXCIpLFxuICAgIGNvdW50ID0gc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmKCBzbGlkZXMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG5cbiAgICAgIHNsaWRlcy51bndyYXAoKTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDE0NTApICkge1xuXG4gICAgICBpZiggc2xpZGVzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBzbGlkZXMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCg4MDApICYmIG1heFdpZHRoKDEyMDApICkge1xuICAgICAgaWYoIHNsaWRlcy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgc2xpZGVzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblxuICAgIGlmKCBzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIikubGVuZ3RoID4gMCAgKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwicnVubmluZz9cIik7XG5cbiAgICAgICQoXCIucHJvZ3Jlc3Mgc3BhblwiKS5yZW1vdmUoKTtcblxuICAgICAgdmFyICBzbGlkZUNvdW50ID0gc2VsZi5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aDtcblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzbGlkZUNvdW50OyBpKysgKSB7XG4gICAgICAgICQoXCI8c3BhbiBjbGFzcz0nXCIgKyBpKyBcIic+PC9zcGFuPlwiKS5hcHBlbmRUbyhcIi5wcm9ncmVzc1wiKTtcbiAgICAgIH1cblxuICAgICAgJChcIi51Zy5zbGlkZXIgLnByb2dyZXNzIHNwYW5cIikuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykpO1xuICAgICAgICB1Z19zbGlkZXJTaGlmdCgkKHRoaXMpKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgJCh0aGlzKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgIHVnX3NsaWRlckJ1dHRvblNldChhcnJvd3MsICQodGhpcykpO1xuXG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlclNoaWZ0KGFycm93KXtcblxuICBzZWxmID0gYXJyb3cucGFyZW50cyhcIi51Zy5zbGlkZXJcIiksXG4gIHNsaWRlV3JhcHBlciA9IHNlbGYuZmluZChcIi5zbGlkZS13cmFwcGVyIC53cmFwcGVyXCIpLFxuICBjb3VudCA9IHNlbGYuZmluZChcIi5zbGlkZVwiKS5sZW5ndGgsXG4gIHNsaWRlQW1vdW50ID0gMTAwLFxuICBzbGlkZVNob3duID0gcGFyc2VJbnQoc2VsZi5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpLFxuICBwcm9ncmVzcyA9IHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKSxcbiAgY2xpY2tlZEFycm93ID0gYXJyb3cuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKVswXTtcblxuICBjb25zb2xlLmxvZyhhcnJvdyk7XG5cbiAgaWYoIGNsaWNrZWRBcnJvdyA9PT0gXCJuZXh0XCIgKXtcblxuICAgIHNsaWRlU2hvd24rKztcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqIChzbGlkZVNob3duICogLTEpO1xuXG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2UgaWYgKCBjbGlja2VkQXJyb3cgPT09IFwicHJldlwiKSB7XG5cbiAgICBzbGlkZVNob3duLS07XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoIHNsaWRlU2hvd24gKiAtMSk7XG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2Uge1xuXG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIGNsaWNrZWRBcnJvdyApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggY2xpY2tlZEFycm93ICogLTEgKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH1cblxuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYTpudGgtb2YtdHlwZShcIiArICgxICsgc2xpZGVTaG93bikgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgc2VsZik7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgc2xpZGVyKSB7XG5cbiAgICB2YXIgc2xpZGVTaG93biA9IHBhcnNlSW50KHNsaWRlci5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICAgICAgICBjb3VudCA9IHNsaWRlci5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aDtcblxuICAgIHNsaWRlci5maW5kKFwiLnByb2dyZXNzIHNwYW5cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgc2xpZGVyLmZpbmQoXCIucHJvZ3Jlc3MgLlwiICsgc2xpZGVTaG93bikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICBpZiggc2xpZGVTaG93biA9PT0gMCApe1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oXCIucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfSBlbHNlIGlmICggKHNsaWRlU2hvd24gKyAxKSA9PT0gY291bnQgKSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5uZXh0XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfVxuXG59XG5cbnVnX3NsaWRlckxheW91dCgpO1xudWdfc2xpZGVyRGVmYXVsdHMoKTtcblxuJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24oKSB7XG4gIHVnX3NsaWRlckxheW91dCgpO1xufSk7XG5cbiQoXCIudWcuc2xpZGVyIC5hcnJvd3MgYVwiKS5jbGljayggZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdWdfc2xpZGVyU2hpZnQoJCh0aGlzKSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
