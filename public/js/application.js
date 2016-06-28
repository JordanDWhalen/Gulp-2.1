
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

// TODO: Resetting layout on resize, currently the buttons become disabled whenever the grid changes.

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

      $(".progress span").remove();

      var  slideCount = self.find(".slide").length;

      console.log(slideCount);

      for ( var i = 0; i < slideCount; i++ ) {
        $("<span class='" + i+ "'></span>").appendTo(".progress");
      }

    }

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
        console.log(count);

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

$(".ug.slider .progress span").click( function(e){
  e.preventDefault();
  ug_sliderShift($(this));
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiLCJiYXNlLWZ1bmN0aW9ucy9iYXNlLmpzIiwiYmFzZS1mdW5jdGlvbnMvY29tcG9uZW50cy9mYXV4LXBvc2l0aW9uLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9ncmlkLXNsaWRlci5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvaGVhZGVyLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9saWdodGJveC5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsImZ1bmN0aW9uIG1pbldpZHRoKHdpZHRoKSB7XG4gIHZhciBzY3JlZW5XaWR0aCA9ICAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYgKCBzY3JlZW5XaWR0aCA+PSB3aWR0aCApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF4V2lkdGgod2lkdGgpIHtcbiAgdmFyIHNjcmVlbldpZHRoID0gICQod2luZG93KS53aWR0aCgpO1xuICBpZiAoIHNjcmVlbldpZHRoIDw9IHdpZHRoICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gVGhpcyBmdW5jdGlvbiB0YWtlcyBjYXJlIG9mIGFsbCB0aGUgd2VpciBpc3N1ZXMgeW91IG1pZ2h0IHJ1biBpbnRvIHdoZW4gdHJ5aW5nIHRvIGRvIGEgZml4ZWQgcG9zaXRpb24gb3ZlcmxheSBvbiBtb2JpbGUuXG5cbmZ1bmN0aW9uIHBvc2l0aW9uRmF1eGVkKG9uKXtcbiAgdmFyIGhlYWRlck9mZnNldCA9IHBhcnNlSW50KCQoXCJoZWFkZXIuZ2xvYmFsXCIpLmhlaWdodCgpLCAxMCk7XG4gIHZhciBmYWtlU2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gaGVhZGVyT2Zmc2V0O1xuICB2YXIgc2Nyb2xsQW1vdW50ID0gcGFyc2VJbnQoJChcIm1haW4ubm9zY3JvbGxcIikuY3NzKFwidG9wXCIpLCAxMCkgLSBoZWFkZXJPZmZzZXQ7XG4gIHNjcm9sbEFtb3VudCA9IHBhcnNlSW50KHNjcm9sbEFtb3VudCwgMTApO1xuICBzY3JvbGxBbW91bnQgPSBzY3JvbGxBbW91bnQgKiAtMTtcblxuICBpZihvbiA9PT0gdHJ1ZSl7XG4gICAgJChcIm1haW5cIikuYWRkQ2xhc3MoXCJub3Njcm9sbFwiKTtcbiAgICAkKFwibWFpblwiKS5jc3MoXCJ0b3BcIiwgKyAoZmFrZVNjcm9sbCAgKiAtMSkpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgJChcIm1haW5cIikucmVtb3ZlQ2xhc3MoXCJub3Njcm9sbFwiKTtcbiAgICAgICQoXCJtYWluXCIpLmNzcyhcInRvcFwiLCBcIjBcIik7XG4gICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKHNjcm9sbEFtb3VudCk7XG4gICAgfSwgMSk7XG5cbiAgfVxufVxuIiwiZnVuY3Rpb24gdWdfZ3JpZFNsaWRlckxheW91dCgpe1xuICAvLyBBZGRpbmcgYSB1bmlxdWUgY2xhc3MgdG8gZWFjaCBzbGlkZXIgZm9yIGRpZmZlcmVudGlhdGlvbiBvZlxuICAkKFwiLnVnLmdyaWQtc2xpZGVyXCIpLmVhY2goIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG5cbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiXCIgKyBpbmRleCk7XG5cbiAgICB2YXIgc2xpZGVyTnVtYmVyID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuXG4gICAgcHJvZHVjdHMgPSAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgc2xpZGVyTnVtYmVyICsgXCIgLndyYXBwZXIgYVwiKTtcblxuICAgIGlmKCBwcm9kdWN0cy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcblxuICAgICAgcHJvZHVjdHMudW53cmFwKCk7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDE0NTApICkge1xuICAgICAgaWYoIHByb2R1Y3RzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBwcm9kdWN0cy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoODAwKSAmJiBtYXhXaWR0aCgxMjAwKSApIHtcbiAgICAgIGlmKCBwcm9kdWN0cy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgcHJvZHVjdHMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVnX3ZpZXdBbGxMYXlvdXQoY3VycmVudFdyYXBwZXIsIGN1cnJlbnRTbGlkZXJDbGFzcywgY3VycmVudFNsaWRlcywgYnV0dG9uKSB7XG5cbiAgaWYoICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikuaGFzQ2xhc3MoXCJ2aWV3LWFsbFwiKSApe1xuXG4gICAgJChidXR0b24pLnRleHQoXCJWaWV3IEFsbFwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmFkZENsYXNzKFwibGluZVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5yZW1vdmVDbGFzcyhcImdyaWRcIik7XG5cbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5yZW1vdmVDbGFzcyhcInZpZXctYWxsXCIpO1xuICAgICQoY3VycmVudFNsaWRlcykuYXR0cihcImNsYXNzXCIsIFwic2xpZGVcIik7XG5cbiAgICB1Z19ncmlkU2xpZGVyQWN0aXZlU2V0KCk7XG5cbiAgfSBlbHNlIHtcblxuICAgICQoYnV0dG9uKS50ZXh0KFwiVmlldyBMZXNzXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikucmVtb3ZlQ2xhc3MoXCJsaW5lXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLmFkZENsYXNzKFwiZ3JpZFwiKTtcblxuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLmFkZENsYXNzKFwidmlldy1hbGxcIik7XG4gICAgJChjdXJyZW50U2xpZGVzKS5hdHRyKFwiY2xhc3NcIiwgXCJzbGlkZSBhY3RpdmVcIik7XG5cbiAgfVxuXG59XG5cbi8vIFNldHRpbmcgc29tZSBkZWZhdWx0cyBmb3IgZWFjaCBzbGlkZXJcbmZ1bmN0aW9uIHVnX2dyaWRTbGlkZXJEZWZhdWx0cygpIHtcbiAgJChcIi51Zy5ncmlkLXNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIubGVhZFwiKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgdmFyIHNsaWRlTnVtYmVyID0gJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIikuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKS5sZW5ndGg7XG5cbiAgICBpZihzbGlkZU51bWJlciA8PSAxKXtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5sZWFkXCIpLmNoaWxkcmVuKFwiLmNvbnRyb2xzXCIpLmhpZGUoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1Z192aWV3QWxsRGVmYXVsdHMoKSB7XG5cbiAgJChcIi51Zy5ncmlkLXNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjdXJyZW50V3JhcHBlciA9ICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLFxuICAgIGN1cnJlbnRTbGlkZXJDbGFzcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgICBjdXJyZW50U2xpZGVzID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKTtcblxuICAgIGlmKGN1cnJlbnRXcmFwcGVyLmhhc0NsYXNzKFwiZ3JpZFwiKSl7XG5cbiAgICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAuYnV0dG9uLnZpZXctYWxsXCIpLnRleHQoXCJWaWV3IExlc3NcIik7XG5cbiAgICAgICQoY3VycmVudFdyYXBwZXIpLnJlbW92ZUNsYXNzKFwibGluZVwiKTtcbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmFkZENsYXNzKFwiZ3JpZFwiKTtcblxuICAgICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpO1xuICAgICAgJChjdXJyZW50V3JhcHBlcikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgICAgJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5hZGRDbGFzcyhcInZpZXctYWxsXCIpO1xuICAgICAgJChjdXJyZW50U2xpZGVzKS5hdHRyKFwiY2xhc3NcIiwgXCJzbGlkZSBhY3RpdmVcIik7XG5cbiAgICB9XG5cbiAgfSk7XG5cbn07XG5cbi8vIFNldHRpbmcgdGhlIGZpcnN0IHNsaWRlIGFjdGl2ZVxuZnVuY3Rpb24gdWdfZ3JpZFNsaWRlckFjdGl2ZVNldCgpIHtcbiAgJChcIi51Zy5ncmlkLXNsaWRlciAuc2xpZGUtd3JhcHBlclwiKS5lYWNoKCBmdW5jdGlvbigpe1xuICAgIHZhciBzbGlkZUFtb3VudCA9ICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIpLFxuICAgIGFjdGl2ZVNsaWRlID0gKHNsaWRlQW1vdW50ICogLTEgLyAxMDApICsgMSxcbiAgICBzbGlkZU51bWJlciA9ICQodGhpcykuY2hpbGRyZW4oKS5sZW5ndGg7XG5cbiAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGU6bnRoLWNoaWxkKFwiICsgYWN0aXZlU2xpZGUgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgfSk7XG59XG5cbi8vIENyZWF0aW5nIGEgZnVuY3Rpb24gdG8gZGlzYWJsZSB0aGUgYXJyb3cgYnV0dG9ucyBiYXNlZCBvbiBzbGlkZSBwb3NpdGlvblxuZnVuY3Rpb24gdWdfZGlzYWJsZWRCdXR0b25zKCBjdXJyZW50U2xpZGVyQ2xhc3MgKSB7XG5cbiAgdmFyIHNsaWRlVG90YWwgPSAoJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC53cmFwcGVyIC5zbGlkZVwiKS5sZW5ndGgpIC0gMSxcbiAgICAgIGN1cnJlbnRTbGlkZSA9IHBhcnNlSW50KCQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAuc2xpZGUtd3JhcHBlclwiKS5hdHRyKFwic2xpZGUtc2hvd25cIikpO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgU2xpZGU6IFwiICsgY3VycmVudFNsaWRlKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2xpZGUgVG90YWw6IFwiICsgKHNsaWRlVG90YWwpKVxuICAgICAgY29uc29sZS5sb2coXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAuc2xpZGUtd3JhcHBlclwiKTtcblxuXG4gIGlmKCBjdXJyZW50U2xpZGUgPT09IChzbGlkZVRvdGFsKSl7XG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgaWYgKCBjdXJyZW50U2xpZGUgIT09IDAgKXtcbiAgICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIH1cbiAgfSBlbHNlIGlmKCBjdXJyZW50U2xpZGUgPT09IDAgKSB7XG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgaWYgKCBjdXJyZW50U2xpZGUgIT09IHNsaWRlVG90YWwgKXtcbiAgICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLmJ1dHRvblwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICB9XG5cbn1cblxuLy8gU2V0dGluZyB1cCBmdW5jdGlvbnMgZm9yIHNoaWZ0aW5nIHRoZSBzbGlkZXJzIGFwcHJvcHJpYXRlbHlcblxuZnVuY3Rpb24gdWdfc2xpZGVMZWZ0KGN1cnJlbnRTbGlkZSwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzLCBwb3RlbnRpYWxTaGlmdCl7XG5cbiAgY3VycmVudFNsaWRlLS07XG5cbiAgc2xpZGVBbW91bnQgPSBjdXJyZW50U2xpZGUgKiAtMTAwO1xuXG4gIC8vICQoY3VycmVudFdyYXBwZXIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogY3VycmVudEFtb3VudCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDUwMCwgZWFzaW5nOiBcInN3aW5nXCJ9KTtcbiAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWChcIiArIHNsaWRlQW1vdW50ICsgXCIlKVwiKTtcbiAgJChjdXJyZW50V3JhcHBlcikuYXR0cihcInNsaWRlLXNob3duXCIsIGN1cnJlbnRTbGlkZSk7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5wcmV2KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgdWdfZGlzYWJsZWRCdXR0b25zKGN1cnJlbnRTbGlkZXJDbGFzcyk7XG4gIH0sIDUwKVxuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlUmlnaHQoY3VycmVudFNsaWRlLCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MsIHBvdGVudGlhbFNoaWZ0KXtcblxuICBjdXJyZW50U2xpZGUrKztcblxuICBzbGlkZUFtb3VudCA9IGN1cnJlbnRTbGlkZSAqIC0xMDA7XG5cbiAgLy8gJChjdXJyZW50V3JhcHBlcikudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBjdXJyZW50QW1vdW50ICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogNTAwLCBlYXNpbmc6IFwic3dpbmdcIn0pO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKFwiICsgc2xpZGVBbW91bnQgKyBcIiUpXCIpO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgY3VycmVudFNsaWRlKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnByZXYoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICB1Z19kaXNhYmxlZEJ1dHRvbnMoY3VycmVudFNsaWRlckNsYXNzKTtcbiAgfSwgNTApXG5cbn1cblxudWdfZ3JpZFNsaWRlckxheW91dCgpO1xudWdfZ3JpZFNsaWRlckRlZmF1bHRzKCk7XG51Z192aWV3QWxsRGVmYXVsdHMoKTtcblxuXG4kKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbigpIHtcbiAgdWdfZ3JpZFNsaWRlckxheW91dCgpO1xuICB1Z19ncmlkU2xpZGVyQWN0aXZlU2V0KCk7XG59KTtcblxuXG5cbiQoXCIudWcuZ3JpZC1zbGlkZXIgLmJ1dHRvblwiKS5jbGljayhmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB2YXIgYnV0dG9uID0gJCh0aGlzKSxcbiAgdHlwZSA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgY3VycmVudFNsaWRlckNsYXNzID0gJCh0aGlzKS5wYXJlbnRzKFwiLmdyaWQtc2xpZGVyXCIpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gIGN1cnJlbnRXcmFwcGVyID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLFxuICBjdXJyZW50U2xpZGVzID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKSxcbiAgY3VycmVudEFjdGl2ZVNsaWRlID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5hY3RpdmVcIiksXG5cbiAgY3VycmVudEFtb3VudCA9IHBhcnNlSW50KGN1cnJlbnRXcmFwcGVyLmF0dHIoXCJzbGlkZS1zaG93blwiKSwgMCk7XG5cbiAgaWYodHlwZSA9PT0gXCJuZXh0XCIpe1xuXG4gICAgdWdfc2xpZGVSaWdodChjdXJyZW50QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJwcmV2XCIpe1xuXG4gICAgdWdfc2xpZGVMZWZ0KGN1cnJlbnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbiAgfSBlbHNlIGlmICggdHlwZSA9PT0gXCJ2aWV3LWFsbFwiICl7XG5cbiAgICB1Z192aWV3QWxsTGF5b3V0KGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50U2xpZGVyQ2xhc3MsIGN1cnJlbnRTbGlkZXMsIGJ1dHRvbik7XG5cbiAgfVxuXG4gIHVnX2Rpc2FibGVkQnV0dG9ucyhjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG59KTtcblxuJChcIi51Zy5ncmlkLXNsaWRlciAucHJvZHVjdFwiKS5jbGljayggZnVuY3Rpb24oZSl7XG5cbiAgdmFyIHBhcmVudFNsaWRlID0gJCh0aGlzKS5wYXJlbnQoKSxcbiAgY3VycmVudFdyYXBwZXIgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLFxuICBjdXJyZW50U2xpZGVyQ2xhc3MgPSBjdXJyZW50V3JhcHBlci5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICBjdXJyZW50QW1vdW50ID0gcGFyc2VJbnQoY3VycmVudFdyYXBwZXIuYXR0cihcInNsaWRlLXNob3duXCIpLCAwKSxcbiAgc2hpZnRBbW91bnQgPSAxMDAsXG4gIHBvdGVudGlhbFNoaWZ0ID0gKHBhcnNlSW50KGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIikubGVuZ3RoLCAxMCkgLSAxKSAqIHNoaWZ0QW1vdW50ICogLTEsXG4gIGN1cnJlbnRTbGlkZXMgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLFxuICBjdXJyZW50QWN0aXZlU2xpZGUgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmFjdGl2ZVwiKTtcblxuXG5cbiAgaWYoICFwYXJlbnRTbGlkZS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmKCBwYXJlbnRTbGlkZS5wcmV2KCkuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKSB7XG4gICAgICB1Z19zbGlkZVJpZ2h0KCBjdXJyZW50QW1vdW50LCBzaGlmdEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzLCBwb3RlbnRpYWxTaGlmdCApO1xuICAgIH0gZWxzZSBpZiAoIHBhcmVudFNsaWRlLm5leHQoKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApe1xuICAgICAgdWdfc2xpZGVMZWZ0KCBjdXJyZW50QW1vdW50LCBzaGlmdEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzLCBwb3RlbnRpYWxTaGlmdCApO1xuICAgIH1cblxuICB9XG59KTtcbiIsIiQoXCIudWcgbmF2Lmdsb2JhbFwiKS5jbG9uZSgpLmFwcGVuZFRvKFwiaGVhZGVyLnVnLmdsb2JhbCBkaXYubWVudVwiKTtcblxuJChcIi51ZyBkaXYubWVudSAubWVudS10cmlnZ2VyXCIpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbn0pO1xuXG4kKFwiLnVnIC5kcm9wZG93blwiKS5jbGljayhmdW5jdGlvbigpe1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbiAgLy8gQ29uc2lkZXIgYWRkaW5nIGluIGNvZGUgdG8gZHluYW1pY2FsbHkgdHJhY2sgdGhlIGhlaWdodCBvZiBhIGdpdmVuIGRyb3Bkb3duXG59KTtcbiIsImZ1bmN0aW9uIHVnX0xpZ2h0Ym94T3Blbih0cmlnZ2VyKXtcblxuICB2YXIgYWN0aXZlQm94ID0gdHJpZ2dlci5hdHRyKFwiYm94XCIpO1xuXG4gIGNvbnNvbGUubG9nKGFjdGl2ZUJveCk7XG5cbiAgJChcIi51Zy5saWdodGJveFtib3g9JzAnXVwiICkuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuXG4gIHBvc2l0aW9uRmF1eGVkKHRydWUpO1xuXG59XG5cbmZ1bmN0aW9uIHVnX0xpZ2h0Ym94Q2xvc2UodHJpZ2dlcil7XG5cbiAgdmFyIGFjdGl2ZUJveCA9IHRyaWdnZXIucGFyZW50KCkuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKTtcblxuICAkKFwiLnVnLmxpZ2h0Ym94LlwiICsgYWN0aXZlQm94KS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG5cbiAgcG9zaXRpb25GYXV4ZWQoZmFsc2UpO1xuXG59XG5cbiQoXCIudWcgLmxpZ2h0Ym94LXRyaWdnZXJcIikuY2xpY2soIGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdWdfTGlnaHRib3hPcGVuKCQodGhpcykpO1xuXG59KTtcblxuJChcIi51Zy5saWdodGJveCAuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB1Z19MaWdodGJveENsb3NlKCQodGhpcykpO1xuXG59KTtcbiIsIi8vIE1hcmt1cCByZWZsZWN0ZWQgaW4gYmFzZS1lbGVtZW50cy9zbGlkZXIuaHRtbFxuXG4vLyBUT0RPOiBSZXNldHRpbmcgbGF5b3V0IG9uIHJlc2l6ZSwgY3VycmVudGx5IHRoZSBidXR0b25zIGJlY29tZSBkaXNhYmxlZCB3aGVuZXZlciB0aGUgZ3JpZCBjaGFuZ2VzLlxuXG4vLyBTZXR0aW5nIHNvbWUgZGVmYXVsdHMgZm9yIGVhY2ggc2xpZGVyXG5mdW5jdGlvbiB1Z19zbGlkZXJEZWZhdWx0cygpIHtcblxuICAkKFwiLnVnLnNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbigpIHtcblxuICAgICQodGhpcykuZmluZChcIi5zbGlkZS13cmFwcGVyXCIpLmZpbmQoXCIuc2xpZGVcIikuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIucHJvZ3Jlc3Mgc3Bhbi4wXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuZmluZChcIi53cmFwcGVyXCIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogMCB9KTtcblxuICAgIHZhciBhcnJvd3MgPSAkKHRoaXMpLmZpbmQoXCIuYXJyb3dzXCIpLFxuICAgICAgICBzbGlkZVNob3duID0gJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIik7XG5cbiAgICB1Z19zbGlkZXJCdXR0b25TZXQoYXJyb3dzLCAkKHRoaXMpKTtcblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJMYXlvdXQoKXtcblxuICAkKFwiLnVnLnNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIlwiICsgaW5kZXgpO1xuXG4gICAgdmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgIHNsaWRlV3JhcHBlciA9IHNlbGYuZmluZChcIi5zbGlkZS13cmFwcGVyXCIpLFxuICAgIHdyYXBwZXIgPSBzZWxmLmZpbmQoXCIud3JhcHBlclwiKSxcbiAgICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpLFxuICAgIHNsaWRlck51bWJlciA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgICBzbGlkZXMgPSAkKFwiLnVnLnNsaWRlci5cIiArIHNsaWRlck51bWJlciArIFwiIC5zbGlkZS13cmFwcGVyIGFcIiksXG4gICAgY291bnQgPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYoIHNsaWRlcy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcblxuICAgICAgc2xpZGVzLnVud3JhcCgpO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoMTQ1MCkgKSB7XG5cbiAgICAgIGlmKCBzbGlkZXMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHNsaWRlcy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDgwMCkgJiYgbWF4V2lkdGgoMTIwMCkgKSB7XG4gICAgICBpZiggc2xpZGVzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBzbGlkZXMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgaWYoIHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKS5sZW5ndGggPiAwICApIHtcblxuICAgICAgJChcIi5wcm9ncmVzcyBzcGFuXCIpLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgIHNsaWRlQ291bnQgPSBzZWxmLmZpbmQoXCIuc2xpZGVcIikubGVuZ3RoO1xuXG4gICAgICBjb25zb2xlLmxvZyhzbGlkZUNvdW50KTtcblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2xpZGVDb3VudDsgaSsrICkge1xuICAgICAgICAkKFwiPHNwYW4gY2xhc3M9J1wiICsgaSsgXCInPjwvc3Bhbj5cIikuYXBwZW5kVG8oXCIucHJvZ3Jlc3NcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB1Z19zbGlkZXJCdXR0b25TZXQoYXJyb3dzLCAkKHRoaXMpKTtcblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJTaGlmdChhcnJvdyl7XG5cbiAgc2VsZiA9IGFycm93LnBhcmVudHMoXCIudWcuc2xpZGVyXCIpLFxuICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlciAud3JhcHBlclwiKSxcbiAgY291bnQgPSBzZWxmLmZpbmQoXCIuc2xpZGVcIikubGVuZ3RoLFxuICBzbGlkZUFtb3VudCA9IDEwMCxcbiAgc2xpZGVTaG93biA9IHBhcnNlSW50KHNlbGYuYXR0cihcInNsaWRlLXNob3duXCIpKSxcbiAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgcHJvZ3Jlc3MgPSBzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIiksXG4gIGNsaWNrZWRBcnJvdyA9IGFycm93LmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIilbMF07XG5cbiAgaWYoIGNsaWNrZWRBcnJvdyA9PT0gXCJuZXh0XCIgKXtcblxuICAgIHNsaWRlU2hvd24rKztcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqIChzbGlkZVNob3duICogLTEpO1xuXG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2UgaWYgKCBjbGlja2VkQXJyb3cgPT09IFwicHJldlwiKSB7XG5cbiAgICBzbGlkZVNob3duLS07XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoIHNsaWRlU2hvd24gKiAtMSk7XG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2Uge1xuXG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIGNsaWNrZWRBcnJvdyApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggY2xpY2tlZEFycm93ICogLTEgKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH1cblxuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYTpudGgtb2YtdHlwZShcIiArICgxICsgc2xpZGVTaG93bikgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgc2VsZik7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgc2xpZGVyKSB7XG5cbiAgICB2YXIgc2xpZGVTaG93biA9IHBhcnNlSW50KHNsaWRlci5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICAgICAgICBjb3VudCA9IHNsaWRlci5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aDtcbiAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xuXG4gICAgc2xpZGVyLmZpbmQoXCIucHJvZ3Jlc3Mgc3BhblwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICBzbGlkZXIuZmluZChcIi5wcm9ncmVzcyAuXCIgKyBzbGlkZVNob3duKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgIGlmKCBzbGlkZVNob3duID09PSAwICl7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9IGVsc2UgaWYgKCAoc2xpZGVTaG93biArIDEpID09PSBjb3VudCApIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKFwiLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9XG5cbn1cblxudWdfc2xpZGVyTGF5b3V0KCk7XG51Z19zbGlkZXJEZWZhdWx0cygpO1xuXG4kKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbigpIHtcbiAgdWdfc2xpZGVyTGF5b3V0KCk7XG59KTtcblxuJChcIi51Zy5zbGlkZXIgLmFycm93cyBhXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB1Z19zbGlkZXJTaGlmdCgkKHRoaXMpKTtcbn0pO1xuXG4kKFwiLnVnLnNsaWRlciAucHJvZ3Jlc3Mgc3BhblwiKS5jbGljayggZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdWdfc2xpZGVyU2hpZnQoJCh0aGlzKSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
