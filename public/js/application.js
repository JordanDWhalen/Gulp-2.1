
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiLCJiYXNlLWZ1bmN0aW9ucy9iYXNlLmpzIiwiYmFzZS1mdW5jdGlvbnMvY29tcG9uZW50cy9mYXV4LXBvc2l0aW9uLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9ncmlkLXNsaWRlci5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvaGVhZGVyLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9saWdodGJveC5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiZnVuY3Rpb24gbWluV2lkdGgod2lkdGgpIHtcbiAgdmFyIHNjcmVlbldpZHRoID0gICQod2luZG93KS53aWR0aCgpO1xuICBpZiAoIHNjcmVlbldpZHRoID49IHdpZHRoICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXhXaWR0aCh3aWR0aCkge1xuICB2YXIgc2NyZWVuV2lkdGggPSAgJCh3aW5kb3cpLndpZHRoKCk7XG4gIGlmICggc2NyZWVuV2lkdGggPD0gd2lkdGggKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2YgYWxsIHRoZSB3ZWlyIGlzc3VlcyB5b3UgbWlnaHQgcnVuIGludG8gd2hlbiB0cnlpbmcgdG8gZG8gYSBmaXhlZCBwb3NpdGlvbiBvdmVybGF5IG9uIG1vYmlsZS5cblxuZnVuY3Rpb24gcG9zaXRpb25GYXV4ZWQob24pe1xuICB2YXIgaGVhZGVyT2Zmc2V0ID0gcGFyc2VJbnQoJChcImhlYWRlci5nbG9iYWxcIikuaGVpZ2h0KCksIDEwKTtcbiAgdmFyIGZha2VTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSBoZWFkZXJPZmZzZXQ7XG4gIHZhciBzY3JvbGxBbW91bnQgPSBwYXJzZUludCgkKFwibWFpbi5ub3Njcm9sbFwiKS5jc3MoXCJ0b3BcIiksIDEwKSAtIGhlYWRlck9mZnNldDtcbiAgc2Nyb2xsQW1vdW50ID0gcGFyc2VJbnQoc2Nyb2xsQW1vdW50LCAxMCk7XG4gIHNjcm9sbEFtb3VudCA9IHNjcm9sbEFtb3VudCAqIC0xO1xuXG4gIGlmKG9uID09PSB0cnVlKXtcbiAgICAkKFwibWFpblwiKS5hZGRDbGFzcyhcIm5vc2Nyb2xsXCIpO1xuICAgICQoXCJtYWluXCIpLmNzcyhcInRvcFwiLCArIChmYWtlU2Nyb2xsICAqIC0xKSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwibWFpblwiKS5yZW1vdmVDbGFzcyhcIm5vc2Nyb2xsXCIpO1xuICAgICAgJChcIm1haW5cIikuY3NzKFwidG9wXCIsIFwiMFwiKTtcbiAgICAgICQod2luZG93KS5zY3JvbGxUb3Aoc2Nyb2xsQW1vdW50KTtcbiAgICB9LCAxKTtcblxuICB9XG59XG4iLCJmdW5jdGlvbiB1Z19ncmlkU2xpZGVyTGF5b3V0KCl7XG4gIC8vIEFkZGluZyBhIHVuaXF1ZSBjbGFzcyB0byBlYWNoIHNsaWRlciBmb3IgZGlmZmVyZW50aWF0aW9uIG9mXG4gICQoXCIudWcuZ3JpZC1zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcblxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJcIiArIGluZGV4KTtcblxuICAgIHZhciBzbGlkZXJOdW1iZXIgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG5cbiAgICBwcm9kdWN0cyA9ICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBzbGlkZXJOdW1iZXIgKyBcIiAud3JhcHBlciBhXCIpO1xuXG4gICAgaWYoIHByb2R1Y3RzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuXG4gICAgICBwcm9kdWN0cy51bndyYXAoKTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoMTQ1MCkgKSB7XG4gICAgICBpZiggcHJvZHVjdHMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHByb2R1Y3RzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCg4MDApICYmIG1heFdpZHRoKDEyMDApICkge1xuICAgICAgaWYoIHByb2R1Y3RzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBwcm9kdWN0cy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9KTtcbn1cblxuZnVuY3Rpb24gdWdfdmlld0FsbExheW91dChjdXJyZW50V3JhcHBlciwgY3VycmVudFNsaWRlckNsYXNzLCBjdXJyZW50U2xpZGVzLCBidXR0b24pIHtcblxuICBpZiggJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5oYXNDbGFzcyhcInZpZXctYWxsXCIpICl7XG5cbiAgICAkKGJ1dHRvbikudGV4dChcIlZpZXcgQWxsXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuYWRkQ2xhc3MoXCJsaW5lXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLnJlbW92ZUNsYXNzKFwiZ3JpZFwiKTtcblxuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpO1xuICAgICQoY3VycmVudFdyYXBwZXIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwidmlldy1hbGxcIik7XG4gICAgJChjdXJyZW50U2xpZGVzKS5hdHRyKFwiY2xhc3NcIiwgXCJzbGlkZVwiKTtcblxuICAgIHVnX2dyaWRTbGlkZXJBY3RpdmVTZXQoKTtcblxuICB9IGVsc2Uge1xuXG4gICAgJChidXR0b24pLnRleHQoXCJWaWV3IExlc3NcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5yZW1vdmVDbGFzcyhcImxpbmVcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikuYWRkQ2xhc3MoXCJncmlkXCIpO1xuXG4gICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikuYWRkQ2xhc3MoXCJ2aWV3LWFsbFwiKTtcbiAgICAkKGN1cnJlbnRTbGlkZXMpLmF0dHIoXCJjbGFzc1wiLCBcInNsaWRlIGFjdGl2ZVwiKTtcblxuICB9XG5cbn1cblxuLy8gU2V0dGluZyBzb21lIGRlZmF1bHRzIGZvciBlYWNoIHNsaWRlclxuZnVuY3Rpb24gdWdfZ3JpZFNsaWRlckRlZmF1bHRzKCkge1xuICAkKFwiLnVnLmdyaWQtc2xpZGVyXCIpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5sZWFkXCIpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICB2YXIgc2xpZGVOdW1iZXIgPSAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLmxlbmd0aDtcblxuICAgIGlmKHNsaWRlTnVtYmVyIDw9IDEpe1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmxlYWRcIikuY2hpbGRyZW4oXCIuY29udHJvbHNcIikuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVnX3ZpZXdBbGxEZWZhdWx0cygpIHtcblxuICAkKFwiLnVnLmdyaWQtc2xpZGVyXCIpLmVhY2goIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGN1cnJlbnRXcmFwcGVyID0gJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gICAgY3VycmVudFNsaWRlckNsYXNzID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICAgIGN1cnJlbnRTbGlkZXMgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpO1xuXG4gICAgaWYoY3VycmVudFdyYXBwZXIuaGFzQ2xhc3MoXCJncmlkXCIpKXtcblxuICAgICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5idXR0b24udmlldy1hbGxcIikudGV4dChcIlZpZXcgTGVzc1wiKTtcblxuICAgICAgJChjdXJyZW50V3JhcHBlcikucmVtb3ZlQ2xhc3MoXCJsaW5lXCIpO1xuICAgICAgJChjdXJyZW50V3JhcHBlcikuYWRkQ2xhc3MoXCJncmlkXCIpO1xuXG4gICAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLmFkZENsYXNzKFwidmlldy1hbGxcIik7XG4gICAgICAkKGN1cnJlbnRTbGlkZXMpLmF0dHIoXCJjbGFzc1wiLCBcInNsaWRlIGFjdGl2ZVwiKTtcblxuICAgIH1cblxuICB9KTtcblxufTtcblxuLy8gU2V0dGluZyB0aGUgZmlyc3Qgc2xpZGUgYWN0aXZlXG5mdW5jdGlvbiB1Z19ncmlkU2xpZGVyQWN0aXZlU2V0KCkge1xuICAkKFwiLnVnLmdyaWQtc2xpZGVyIC5zbGlkZS13cmFwcGVyXCIpLmVhY2goIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHNsaWRlQW1vdW50ID0gJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIiksXG4gICAgYWN0aXZlU2xpZGUgPSAoc2xpZGVBbW91bnQgKiAtMSAvIDEwMCkgKyAxLFxuICAgIHNsaWRlTnVtYmVyID0gJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aDtcblxuICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZTpudGgtY2hpbGQoXCIgKyBhY3RpdmVTbGlkZSArIFwiKVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICB9KTtcbn1cblxuLy8gQ3JlYXRpbmcgYSBmdW5jdGlvbiB0byBkaXNhYmxlIHRoZSBhcnJvdyBidXR0b25zIGJhc2VkIG9uIHNsaWRlIHBvc2l0aW9uXG5mdW5jdGlvbiB1Z19kaXNhYmxlZEJ1dHRvbnMoIGN1cnJlbnRTbGlkZXJDbGFzcyApIHtcblxuICB2YXIgc2xpZGVUb3RhbCA9ICgkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLndyYXBwZXIgLnNsaWRlXCIpLmxlbmd0aCkgLSAxLFxuICAgICAgY3VycmVudFNsaWRlID0gcGFyc2VJbnQoJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5zbGlkZS13cmFwcGVyXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiKSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBTbGlkZTogXCIgKyBjdXJyZW50U2xpZGUpO1xuICAgICAgY29uc29sZS5sb2coXCJTbGlkZSBUb3RhbDogXCIgKyAoc2xpZGVUb3RhbCkpXG4gICAgICBjb25zb2xlLmxvZyhcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5zbGlkZS13cmFwcGVyXCIpO1xuXG5cbiAgaWYoIGN1cnJlbnRTbGlkZSA9PT0gKHNsaWRlVG90YWwpKXtcbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICBpZiAoIGN1cnJlbnRTbGlkZSAhPT0gMCApe1xuICAgICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICB9IGVsc2UgaWYoIGN1cnJlbnRTbGlkZSA9PT0gMCApIHtcbiAgICAkKFwiLnVnLmdyaWQtc2xpZGVyLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICBpZiAoIGN1cnJlbnRTbGlkZSAhPT0gc2xpZGVUb3RhbCApe1xuICAgICAgJChcIi51Zy5ncmlkLXNsaWRlci5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgICQoXCIudWcuZ3JpZC1zbGlkZXIuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAuYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gIH1cblxufVxuXG4vLyBTZXR0aW5nIHVwIGZ1bmN0aW9ucyBmb3Igc2hpZnRpbmcgdGhlIHNsaWRlcnMgYXBwcm9wcmlhdGVseVxuXG5mdW5jdGlvbiB1Z19zbGlkZUxlZnQoY3VycmVudFNsaWRlLCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MsIHBvdGVudGlhbFNoaWZ0KXtcblxuICBjdXJyZW50U2xpZGUtLTtcblxuICBzbGlkZUFtb3VudCA9IGN1cnJlbnRTbGlkZSAqIC0xMDA7XG5cbiAgLy8gJChjdXJyZW50V3JhcHBlcikudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBjdXJyZW50QW1vdW50ICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogNTAwLCBlYXNpbmc6IFwic3dpbmdcIn0pO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKFwiICsgc2xpZGVBbW91bnQgKyBcIiUpXCIpO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgY3VycmVudFNsaWRlKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnByZXYoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICB1Z19kaXNhYmxlZEJ1dHRvbnMoY3VycmVudFNsaWRlckNsYXNzKTtcbiAgfSwgNTApXG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVSaWdodChjdXJyZW50U2xpZGUsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcywgcG90ZW50aWFsU2hpZnQpe1xuXG4gIGN1cnJlbnRTbGlkZSsrO1xuXG4gIHNsaWRlQW1vdW50ID0gY3VycmVudFNsaWRlICogLTEwMDtcblxuICAvLyAkKGN1cnJlbnRXcmFwcGVyKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IGN1cnJlbnRBbW91bnQgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiA1MDAsIGVhc2luZzogXCJzd2luZ1wifSk7XG4gICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoXCIgKyBzbGlkZUFtb3VudCArIFwiJSlcIik7XG4gICQoY3VycmVudFdyYXBwZXIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBjdXJyZW50U2xpZGUpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucHJldigpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIHVnX2Rpc2FibGVkQnV0dG9ucyhjdXJyZW50U2xpZGVyQ2xhc3MpO1xuICB9LCA1MClcblxufVxuXG51Z19ncmlkU2xpZGVyTGF5b3V0KCk7XG51Z19ncmlkU2xpZGVyRGVmYXVsdHMoKTtcbnVnX3ZpZXdBbGxEZWZhdWx0cygpO1xuXG5cbiQod2luZG93KS5yZXNpemUoIGZ1bmN0aW9uKCkge1xuICB1Z19ncmlkU2xpZGVyTGF5b3V0KCk7XG4gIHVnX2dyaWRTbGlkZXJBY3RpdmVTZXQoKTtcbn0pO1xuXG5cblxuJChcIi51Zy5ncmlkLXNsaWRlciAuYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHZhciBidXR0b24gPSAkKHRoaXMpLFxuICB0eXBlID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICBjdXJyZW50U2xpZGVyQ2xhc3MgPSAkKHRoaXMpLnBhcmVudHMoXCIuZ3JpZC1zbGlkZXJcIikuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgY3VycmVudFdyYXBwZXIgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gIGN1cnJlbnRTbGlkZXMgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLFxuICBjdXJyZW50QWN0aXZlU2xpZGUgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmFjdGl2ZVwiKSxcblxuICBjdXJyZW50QW1vdW50ID0gcGFyc2VJbnQoY3VycmVudFdyYXBwZXIuYXR0cihcInNsaWRlLXNob3duXCIpLCAwKTtcblxuICBpZih0eXBlID09PSBcIm5leHRcIil7XG5cbiAgICB1Z19zbGlkZVJpZ2h0KGN1cnJlbnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInByZXZcIil7XG5cbiAgICB1Z19zbGlkZUxlZnQoY3VycmVudEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKTtcblxuICB9IGVsc2UgaWYgKCB0eXBlID09PSBcInZpZXctYWxsXCIgKXtcblxuICAgIHVnX3ZpZXdBbGxMYXlvdXQoY3VycmVudFdyYXBwZXIsIGN1cnJlbnRTbGlkZXJDbGFzcywgY3VycmVudFNsaWRlcywgYnV0dG9uKTtcblxuICB9XG5cbiAgdWdfZGlzYWJsZWRCdXR0b25zKGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbn0pO1xuXG4kKFwiLnVnLmdyaWQtc2xpZGVyIC5wcm9kdWN0XCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcblxuICB2YXIgcGFyZW50U2xpZGUgPSAkKHRoaXMpLnBhcmVudCgpLFxuICBjdXJyZW50V3JhcHBlciA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCksXG4gIGN1cnJlbnRTbGlkZXJDbGFzcyA9IGN1cnJlbnRXcmFwcGVyLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gIGN1cnJlbnRBbW91bnQgPSBwYXJzZUludChjdXJyZW50V3JhcHBlci5hdHRyKFwic2xpZGUtc2hvd25cIiksIDApLFxuICBzaGlmdEFtb3VudCA9IDEwMCxcbiAgcG90ZW50aWFsU2hpZnQgPSAocGFyc2VJbnQoY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKS5sZW5ndGgsIDEwKSAtIDEpICogc2hpZnRBbW91bnQgKiAtMSxcbiAgY3VycmVudFNsaWRlcyA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIiksXG4gIGN1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuYWN0aXZlXCIpO1xuXG5cblxuICBpZiggIXBhcmVudFNsaWRlLmhhc0NsYXNzKFwiYWN0aXZlXCIpICl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYoIHBhcmVudFNsaWRlLnByZXYoKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgIHVnX3NsaWRlUmlnaHQoIGN1cnJlbnRBbW91bnQsIHNoaWZ0QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MsIHBvdGVudGlhbFNoaWZ0ICk7XG4gICAgfSBlbHNlIGlmICggcGFyZW50U2xpZGUubmV4dCgpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICl7XG4gICAgICB1Z19zbGlkZUxlZnQoIGN1cnJlbnRBbW91bnQsIHNoaWZ0QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MsIHBvdGVudGlhbFNoaWZ0ICk7XG4gICAgfVxuXG4gIH1cbn0pO1xuIiwiJChcIi51ZyBuYXYuZ2xvYmFsXCIpLmNsb25lKCkuYXBwZW5kVG8oXCJoZWFkZXIudWcuZ2xvYmFsIGRpdi5tZW51XCIpO1xuXG4kKFwiLnVnIGRpdi5tZW51IC5tZW51LXRyaWdnZXJcIikuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xufSk7XG5cbiQoXCIudWcgLmRyb3Bkb3duXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xuICAvLyBDb25zaWRlciBhZGRpbmcgaW4gY29kZSB0byBkeW5hbWljYWxseSB0cmFjayB0aGUgaGVpZ2h0IG9mIGEgZ2l2ZW4gZHJvcGRvd25cbn0pO1xuIiwiZnVuY3Rpb24gdWdfTGlnaHRib3hPcGVuKHRyaWdnZXIpe1xuXG4gIHZhciBhY3RpdmVCb3ggPSB0cmlnZ2VyLmF0dHIoXCJib3hcIik7XG5cbiAgY29uc29sZS5sb2coYWN0aXZlQm94KTtcblxuICAkKFwiLnVnLmxpZ2h0Ym94W2JveD0nMCddXCIgKS5hZGRDbGFzcyhcIm9wZW5cIik7XG5cbiAgcG9zaXRpb25GYXV4ZWQodHJ1ZSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfTGlnaHRib3hDbG9zZSh0cmlnZ2VyKXtcblxuICB2YXIgYWN0aXZlQm94ID0gdHJpZ2dlci5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpO1xuXG4gICQoXCIudWcubGlnaHRib3guXCIgKyBhY3RpdmVCb3gpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcblxuICBwb3NpdGlvbkZhdXhlZChmYWxzZSk7XG5cbn1cblxuJChcIi51ZyAubGlnaHRib3gtdHJpZ2dlclwiKS5jbGljayggZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB1Z19MaWdodGJveE9wZW4oJCh0aGlzKSk7XG5cbn0pO1xuXG4kKFwiLnVnLmxpZ2h0Ym94IC5jbG9zZVwiKS5jbGljayhmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHVnX0xpZ2h0Ym94Q2xvc2UoJCh0aGlzKSk7XG5cbn0pO1xuIiwiLy8gTWFya3VwIHJlZmxlY3RlZCBpbiBiYXNlLWVsZW1lbnRzL3NsaWRlci5odG1sXG5cbi8vIFRPRE86IFJlc2V0dGluZyBsYXlvdXQgb24gcmVzaXplLCBjdXJyZW50bHkgdGhlIGJ1dHRvbnMgYmVjb21lIGRpc2FibGVkIHdoZW5ldmVyIHRoZSBncmlkIGNoYW5nZXMuXG5cbi8vIFNldHRpbmcgc29tZSBkZWZhdWx0cyBmb3IgZWFjaCBzbGlkZXJcbmZ1bmN0aW9uIHVnX3NsaWRlckRlZmF1bHRzKCkge1xuXG4gICQoXCIudWcuc2xpZGVyXCIpLmVhY2goIGZ1bmN0aW9uKCkge1xuXG4gICAgJCh0aGlzKS5maW5kKFwiLnNsaWRlLXdyYXBwZXJcIikuZmluZChcIi5zbGlkZS1pdGVtXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgdmFyIGFycm93cyA9ICQodGhpcykuZmluZChcIi5hcnJvd3NcIiksXG4gICAgICAgIHNsaWRlU2hvd24gPSAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiKTtcblxuXG4gICAgdWdfc2xpZGVyRGlzYWJsZWRCdXR0b25zKGFycm93cywgJCh0aGlzKSk7XG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyTGF5b3V0KCl7XG5cbiAgJChcIi51Zy5zbGlkZXJcIikuZWFjaCggZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJcIiArIGluZGV4KTtcblxuICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgICB3cmFwcGVyID0gc2VsZi5maW5kKFwiLndyYXBwZXJcIiksXG4gICAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgICBjb3VudCA9IHNsaWRlV3JhcHBlci5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aCxcbiAgICB3aWR0aCA9IDEwMCAqIGNvdW50ICsgXCIlXCIsXG4gICAgc2xpZGVyTnVtYmVyID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICAgIHNsaWRlcyA9ICQoXCIudWcuc2xpZGVyLlwiICsgc2xpZGVyTnVtYmVyICsgXCIgLnNsaWRlLXdyYXBwZXIgYVwiKTtcblxuICAgIGlmKCBzbGlkZXMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG5cbiAgICAgIHNsaWRlcy51bndyYXAoKTtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDE0NTApICkge1xuXG4gICAgICBpZiggc2xpZGVzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBzbGlkZXMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCg4MDApICYmIG1heFdpZHRoKDEyMDApICkge1xuICAgICAgaWYoIHNsaWRlcy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgc2xpZGVzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuXG4gICAgdWdfc2xpZGVyRGlzYWJsZWRCdXR0b25zKGFycm93cywgJCh0aGlzKSk7XG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyU2hpZnQoYXJyb3cpe1xuXG4gIHNlbGYgPSBhcnJvdy5wYXJlbnRzKFwiLnVnLnNsaWRlclwiKSxcbiAgc2xpZGVXcmFwcGVyID0gc2VsZi5maW5kKFwiLnNsaWRlLXdyYXBwZXIgLndyYXBwZXJcIiksXG4gIGNvdW50ID0gc2VsZi5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aCxcbiAgc2xpZGVBbW91bnQgPSAxMDAsXG4gIHNsaWRlU2hvd24gPSBwYXJzZUludChzZWxmLmF0dHIoXCJzbGlkZS1zaG93blwiKSksXG4gIGFycm93cyA9IHNlbGYuZmluZChcIi5hcnJvd3NcIiksXG4gIHByb2dyZXNzID0gc2VsZi5maW5kKFwiLnByb2dyZXNzXCIpLFxuICBjbGlja2VkQXJyb3cgPSBhcnJvdy5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpWzBdO1xuXG4gIGlmKCBjbGlja2VkQXJyb3cgPT09IFwibmV4dFwiICl7XG5cbiAgICBzbGlkZVNob3duKys7XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoc2xpZGVTaG93biAqIC0xKTtcblxuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHNsaWRlU2hvd24tLTtcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggc2xpZGVTaG93biAqIC0xKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH1cblxuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYTpudGgtb2YtdHlwZShcIiArICgxICsgc2xpZGVTaG93bikgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgdWdfc2xpZGVyRGlzYWJsZWRCdXR0b25zKGFycm93cywgc2VsZik7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyQWN0aXZlU2V0KCkge1xuICAkKFwiLnVnLnNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbigpe1xuICAgIHZhciBzbGlkZUFtb3VudCA9ICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIpLFxuICAgIGFjdGl2ZVNsaWRlID0gKHNsaWRlQW1vdW50ICogLTEgLyAxMDApICsgMSxcbiAgICBzbGlkZU51bWJlciA9ICQodGhpcykuY2hpbGRyZW4oKS5sZW5ndGg7XG5cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlckRpc2FibGVkQnV0dG9ucyhhcnJvd3MsIHNsaWRlcikge1xuXG4gICAgdmFyIHNsaWRlU2hvd24gPSBwYXJzZUludChzbGlkZXIuYXR0cihcInNsaWRlLXNob3duXCIpKSxcbiAgICAgICAgY291bnQgPSBzbGlkZXIuZmluZChcIi5zbGlkZVwiKS5sZW5ndGg7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvdW50KTtcblxuICAgIGlmKCBzbGlkZVNob3duID09PSAwICl7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9IGVsc2UgaWYgKCAoc2xpZGVTaG93biArIDEpID09PSBjb3VudCApIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKFwiLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9XG5cbn1cblxudWdfc2xpZGVyTGF5b3V0KCk7XG51Z19zbGlkZXJEZWZhdWx0cygpO1xuXG4kKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbigpIHtcbiAgdWdfc2xpZGVyTGF5b3V0KCk7XG59KTtcblxuJChcIi51Zy5zbGlkZXIgLmFycm93cyBhXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB1Z19zbGlkZXJTaGlmdCgkKHRoaXMpKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
