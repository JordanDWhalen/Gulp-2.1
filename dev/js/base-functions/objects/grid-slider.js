function ug_gridSliderLayout(){
  // Adding a unique class to each slider for differentiation of
  $(".ug.grid-slider").each( function( index, value ) {

    $(this).addClass("" + index);

    var sliderNumber = $(this).attr("class").split(" ").pop(),

    products = $(".ug.grid-slider." + sliderNumber + " .wrapper a");

    console.log(products);

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
    $(currentWrapper).attr("data-shift-amount", "0");

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
    $(currentWrapper).attr("data-shift-amount", "0");

    $(currentWrapper).children(".wrapper").addClass("view-all");
    $(currentSlides).attr("class", "slide active");

  }

}

// Setting some defaults for each slider
function ug_gridSliderDefaults() {
  $(".ug.grid-slider").each( function(index, value) {
    $(this).children().children(".slide-wrapper").children().children().first().addClass("active");
    $(this).children().children(".lead").children().children(".prev").addClass("disabled");
    $(this).children().children(".slide-wrapper").attr("data-shift-amount", "0");

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
      $(currentWrapper).attr("data-shift-amount", "0");

      $(currentWrapper).children(".wrapper").addClass("view-all");
      $(currentSlides).attr("class", "slide active");

    }

  });

};

// Setting the first slide active
function ug_gridSliderActiveSet() {
  $(".ug.grid-slider .slide-wrapper").each( function(){
    var slideAmount = $(this).attr("data-shift-amount"),
    activeSlide = (slideAmount * -1 / 100) + 1,
    slideNumber = $(this).children().length;

    $(this).children().children(".slide:nth-child(" + activeSlide + ")").addClass("active");

  });
}

// Creating a function to disable the arrow buttons based on slide position
function ug_disabledButtons(currentSliderClass, currentAmount, potentialShift) {
  if(currentAmount === potentialShift){
    $(".ug.grid-slider." + currentSliderClass + " .next").addClass("disabled");
    if ( currentAmount !== 0 ){
      $(".ug.grid-slider." + currentSliderClass + " .prev").removeClass("disabled");
    }
  } else if( currentAmount === 0 ) {
    $(".ug.grid-slider." + currentSliderClass + " .prev").addClass("disabled");
    if ( currentAmount !== potentialShift ){
      $(".ug.grid-slider." + currentSliderClass + " .next").removeClass("disabled");
    }
  } else {
    $(".ug.grid-slider." + currentSliderClass + " .button").removeClass("disabled");
  }

  if (potentialShift === 0) {
    console.log("No shit");
  }

}

// Setting up functions for shifting the sliders appropriately
function ug_slideLeft(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift){

  currentAmount = currentAmount + shiftAmount;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + currentAmount + "%)");
  $(currentWrapper).attr("data-shift-amount", currentAmount);
  $(currentActiveSlide).prev().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    ug_disabledButtons(currentSliderClass, currentAmount, potentialShift);
  }, 50)

}

function ug_slideRight(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift){

  currentAmount = currentAmount - shiftAmount;

  // $(currentWrapper).velocity({ translateX: currentAmount + "%" }, { duration: 500, easing: "swing"});
  $(currentWrapper).css("transform", "translateX(" + currentAmount + "%)");
  $(currentWrapper).attr("data-shift-amount", currentAmount);
  $(currentActiveSlide).next().addClass("active");
  $(currentActiveSlide).removeClass("active");

  setTimeout(function(){
    ug_disabledButtons(currentSliderClass, currentAmount, potentialShift);
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
  currentSliderClass = $(this).parent().parent().parent().parent().attr("class").split(" ").pop(),
  currentWrapper = $(this).parent().parent().parent().children(".slide-wrapper"),
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children().children(".active"),
  shiftAmount = 100,
  potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
  currentAmount = parseInt(currentWrapper.attr("data-shift-amount"), 0);

  if(type === "next"){

    ug_slideRight(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift);

  } else if (type === "prev"){

    ug_slideLeft(currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift);

  } else if ( type === "view-all" ){

    ug_viewAllLayout(currentWrapper, currentSliderClass, currentSlides, button);

  }

  ug_disabledButtons(currentSliderClass, currentAmount, potentialShift);

});

$(".ug.grid-slider .product").click( function(e){

  var parentSlide = $(this).parent(),
  currentWrapper = $(this).parent().parent().parent(),
  currentSliderClass = currentWrapper.parent().parent().attr("class").split(" ").pop(),
  currentAmount = parseInt(currentWrapper.attr("data-shift-amount"), 0),
  shiftAmount = 100,
  potentialShift = (parseInt(currentWrapper.children().children(".slide").length, 10) - 1) * shiftAmount * -1,
  currentSlides = currentWrapper.children().children(".slide"),
  currentActiveSlide = currentWrapper.children().children(".active");

  // console.log(currentSliderClass);


  if( !parentSlide.hasClass("active") ){
    e.preventDefault();

    if( parentSlide.prev().hasClass("active") ) {
      ug_slideRight( currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift );
    } else if ( parentSlide.next().hasClass("active") ){
      ug_slideLeft( currentAmount, shiftAmount, currentWrapper, currentActiveSlide, currentSliderClass, potentialShift );
    }

  }
});
