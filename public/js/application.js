
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

$(".ug.accordion header").click( function(){

  var contentHeight = $(this).parent().find(".content").outerHeight();

  $(this).parent().toggleClass("open");

  if( $(this).parent().hasClass("open") ){
    $(this).siblings(".content-wrapper").velocity({ maxHeight: contentHeight }, { duration: 250, easing: "easeInOut" });
  }  else {
    $(this).siblings(".content-wrapper").velocity({ maxHeight: 0 }, { duration: 250, easing: "easeInOut" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiLCJiYXNlLWZ1bmN0aW9ucy9iYXNlLmpzIiwiYmFzZS1mdW5jdGlvbnMvY29tcG9uZW50cy9mYXV4LXBvc2l0aW9uLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9hY2NvcmRpb24uanMiLCJiYXNlLWZ1bmN0aW9ucy9vYmplY3RzL2hlYWRlci5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvbGlnaHRib3guanMiLCJiYXNlLWZ1bmN0aW9ucy9vYmplY3RzL3NsaWRlci1ncmlkLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9zbGlkZXItaGVyby5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwiZnVuY3Rpb24gbWluV2lkdGgod2lkdGgpIHtcbiAgdmFyIHNjcmVlbldpZHRoID0gICQod2luZG93KS53aWR0aCgpO1xuICBpZiAoIHNjcmVlbldpZHRoID49IHdpZHRoICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXhXaWR0aCh3aWR0aCkge1xuICB2YXIgc2NyZWVuV2lkdGggPSAgJCh3aW5kb3cpLndpZHRoKCk7XG4gIGlmICggc2NyZWVuV2lkdGggPD0gd2lkdGggKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2YgYWxsIHRoZSB3ZWlyIGlzc3VlcyB5b3UgbWlnaHQgcnVuIGludG8gd2hlbiB0cnlpbmcgdG8gZG8gYSBmaXhlZCBwb3NpdGlvbiBvdmVybGF5IG9uIG1vYmlsZS5cblxuZnVuY3Rpb24gcG9zaXRpb25GYXV4ZWQob24pe1xuICB2YXIgaGVhZGVyT2Zmc2V0ID0gcGFyc2VJbnQoJChcImhlYWRlci5nbG9iYWxcIikuaGVpZ2h0KCksIDEwKTtcbiAgdmFyIGZha2VTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSBoZWFkZXJPZmZzZXQ7XG4gIHZhciBzY3JvbGxBbW91bnQgPSBwYXJzZUludCgkKFwibWFpbi5ub3Njcm9sbFwiKS5jc3MoXCJ0b3BcIiksIDEwKSAtIGhlYWRlck9mZnNldDtcbiAgc2Nyb2xsQW1vdW50ID0gcGFyc2VJbnQoc2Nyb2xsQW1vdW50LCAxMCk7XG4gIHNjcm9sbEFtb3VudCA9IHNjcm9sbEFtb3VudCAqIC0xO1xuXG4gIGlmKG9uID09PSB0cnVlKXtcbiAgICAkKFwibWFpblwiKS5hZGRDbGFzcyhcIm5vc2Nyb2xsXCIpO1xuICAgICQoXCJtYWluXCIpLmNzcyhcInRvcFwiLCArIChmYWtlU2Nyb2xsICAqIC0xKSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwibWFpblwiKS5yZW1vdmVDbGFzcyhcIm5vc2Nyb2xsXCIpO1xuICAgICAgJChcIm1haW5cIikuY3NzKFwidG9wXCIsIFwiMFwiKTtcbiAgICAgICQod2luZG93KS5zY3JvbGxUb3Aoc2Nyb2xsQW1vdW50KTtcbiAgICB9LCAxKTtcblxuICB9XG59XG4iLCIkKFwiLnVnLmFjY29yZGlvbiBoZWFkZXJcIikuY2xpY2soIGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGNvbnRlbnRIZWlnaHQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuY29udGVudFwiKS5vdXRlckhlaWdodCgpO1xuXG4gICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xuXG4gIGlmKCAkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKFwib3BlblwiKSApe1xuICAgICQodGhpcykuc2libGluZ3MoXCIuY29udGVudC13cmFwcGVyXCIpLnZlbG9jaXR5KHsgbWF4SGVpZ2h0OiBjb250ZW50SGVpZ2h0IH0sIHsgZHVyYXRpb246IDI1MCwgZWFzaW5nOiBcImVhc2VJbk91dFwiIH0pO1xuICB9ICBlbHNlIHtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKFwiLmNvbnRlbnQtd3JhcHBlclwiKS52ZWxvY2l0eSh7IG1heEhlaWdodDogMCB9LCB7IGR1cmF0aW9uOiAyNTAsIGVhc2luZzogXCJlYXNlSW5PdXRcIiB9KTtcbiAgfVxuXG59KTtcbiIsIiQoXCIudWcgbmF2Lmdsb2JhbFwiKS5jbG9uZSgpLmFwcGVuZFRvKFwiaGVhZGVyLnVnLmdsb2JhbCBkaXYubWVudVwiKTtcblxuJChcIi51ZyBkaXYubWVudSAubWVudS10cmlnZ2VyXCIpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbn0pO1xuXG4kKFwiLnVnIC5kcm9wZG93blwiKS5jbGljayhmdW5jdGlvbigpe1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcbiAgLy8gQ29uc2lkZXIgYWRkaW5nIGluIGNvZGUgdG8gZHluYW1pY2FsbHkgdHJhY2sgdGhlIGhlaWdodCBvZiBhIGdpdmVuIGRyb3Bkb3duXG59KTtcbiIsImZ1bmN0aW9uIHVnX0xpZ2h0Ym94T3Blbih0cmlnZ2VyKXtcblxuICB2YXIgYWN0aXZlQm94ID0gdHJpZ2dlci5hdHRyKFwiYm94XCIpO1xuXG4gIGNvbnNvbGUubG9nKGFjdGl2ZUJveCk7XG5cbiAgJChcIi51Zy5saWdodGJveFtib3g9JzAnXVwiICkuYWRkQ2xhc3MoXCJvcGVuXCIpO1xuXG4gIHBvc2l0aW9uRmF1eGVkKHRydWUpO1xuXG59XG5cbmZ1bmN0aW9uIHVnX0xpZ2h0Ym94Q2xvc2UodHJpZ2dlcil7XG5cbiAgdmFyIGFjdGl2ZUJveCA9IHRyaWdnZXIucGFyZW50KCkuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKTtcblxuICAkKFwiLnVnLmxpZ2h0Ym94LlwiICsgYWN0aXZlQm94KS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG5cbiAgcG9zaXRpb25GYXV4ZWQoZmFsc2UpO1xuXG59XG5cbiQoXCIudWcgLmxpZ2h0Ym94LXRyaWdnZXJcIikuY2xpY2soIGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdWdfTGlnaHRib3hPcGVuKCQodGhpcykpO1xuXG59KTtcblxuJChcIi51Zy5saWdodGJveCAuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB1Z19MaWdodGJveENsb3NlKCQodGhpcykpO1xuXG59KTtcbiIsImZ1bmN0aW9uIHVnX3NsaWRlckdyaWRMYXlvdXQoKXtcbiAgLy8gQWRkaW5nIGEgdW5pcXVlIGNsYXNzIHRvIGVhY2ggc2xpZGVyIGZvciBkaWZmZXJlbnRpYXRpb24gb2ZcbiAgJChcIi51Zy5zbGlkZXItZ3JpZFwiKS5lYWNoKCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIlwiICsgaW5kZXgpO1xuXG4gICAgdmFyIHNsaWRlck51bWJlciA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcblxuICAgIHByb2R1Y3RzID0gJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIHNsaWRlck51bWJlciArIFwiIC53cmFwcGVyIGFcIik7XG5cbiAgICBpZiggcHJvZHVjdHMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG5cbiAgICAgIHByb2R1Y3RzLnVud3JhcCgpO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCgxNDUwKSApIHtcbiAgICAgIGlmKCBwcm9kdWN0cy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgcHJvZHVjdHMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDgwMCkgJiYgbWF4V2lkdGgoMTIwMCkgKSB7XG4gICAgICBpZiggcHJvZHVjdHMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHByb2R1Y3RzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1Z192aWV3QWxsTGF5b3V0KGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50U2xpZGVyQ2xhc3MsIGN1cnJlbnRTbGlkZXMsIGJ1dHRvbikge1xuXG4gIGlmKCAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLmhhc0NsYXNzKFwidmlldy1hbGxcIikgKXtcblxuICAgICQoYnV0dG9uKS50ZXh0KFwiVmlldyBBbGxcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5hZGRDbGFzcyhcImxpbmVcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikucmVtb3ZlQ2xhc3MoXCJncmlkXCIpO1xuXG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5yZW1vdmVDbGFzcyhcInZpZXctYWxsXCIpO1xuICAgICQoY3VycmVudFNsaWRlcykuYXR0cihcImNsYXNzXCIsIFwic2xpZGVcIik7XG5cbiAgICB1Z19zbGlkZXJHcmlkQWN0aXZlU2V0KFwiMFwiKTtcblxuICB9IGVsc2Uge1xuXG4gICAgJChidXR0b24pLnRleHQoXCJWaWV3IExlc3NcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5yZW1vdmVDbGFzcyhcImxpbmVcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikuYWRkQ2xhc3MoXCJncmlkXCIpO1xuXG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY2hpbGRyZW4oXCIud3JhcHBlclwiKS5hZGRDbGFzcyhcInZpZXctYWxsXCIpO1xuICAgICQoY3VycmVudFNsaWRlcykuYXR0cihcImNsYXNzXCIsIFwic2xpZGUgYWN0aXZlXCIpO1xuXG4gIH1cblxufVxuXG4vLyBTZXR0aW5nIHNvbWUgZGVmYXVsdHMgZm9yIGVhY2ggc2xpZGVyXG5mdW5jdGlvbiB1Z19zbGlkZXJHcmlkRGVmYXVsdHMoKSB7XG4gICQoXCIudWcuc2xpZGVyLWdyaWRcIikuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIikuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmxlYWRcIikuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgdmFyIHNsaWRlTnVtYmVyID0gJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIikuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKS5sZW5ndGg7XG5cbiAgICBpZihzbGlkZU51bWJlciA8PSAxKXtcbiAgICAgICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5sZWFkXCIpLmNoaWxkcmVuKFwiLmNvbnRyb2xzXCIpLmhpZGUoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1Z192aWV3QWxsRGVmYXVsdHMoKSB7XG5cbiAgJChcIi51Zy5zbGlkZXItZ3JpZFwiKS5lYWNoKCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjdXJyZW50V3JhcHBlciA9ICQodGhpcykuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZS13cmFwcGVyXCIpLFxuICAgIGN1cnJlbnRTbGlkZXJDbGFzcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgICBjdXJyZW50U2xpZGVzID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKTtcblxuICAgIGlmKGN1cnJlbnRXcmFwcGVyLmhhc0NsYXNzKFwiZ3JpZFwiKSl7XG5cbiAgICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAuYnV0dG9uLnZpZXctYWxsXCIpLnRleHQoXCJWaWV3IExlc3NcIik7XG5cbiAgICAgICQoY3VycmVudFdyYXBwZXIpLnJlbW92ZUNsYXNzKFwibGluZVwiKTtcbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmFkZENsYXNzKFwiZ3JpZFwiKTtcblxuICAgICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpO1xuICAgICAgJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgXCIwXCIpO1xuXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLmFkZENsYXNzKFwidmlldy1hbGxcIik7XG4gICAgICAkKGN1cnJlbnRTbGlkZXMpLmF0dHIoXCJjbGFzc1wiLCBcInNsaWRlIGFjdGl2ZVwiKTtcblxuICAgIH1cblxuICB9KTtcblxufTtcblxuLy8gU2V0dGluZyB0aGUgZmlyc3Qgc2xpZGUgYWN0aXZlXG5mdW5jdGlvbiB1Z19zbGlkZXJHcmlkQWN0aXZlU2V0KCBzbGlkZXJDbGFzcyApIHtcblxuICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgc2xpZGVyQ2xhc3MpLmVhY2goIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgYWN0aXZlU2xpZGUgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiKSkgKyAxO1xuXG4gICAgY29uc29sZS5sb2coJCh0aGlzKS5maW5kKFwiLnNsaWRlOm50aC1vZi10eXBlKFwiICsgYWN0aXZlU2xpZGUgKyBcIilcIikpO1xuXG4gICAgJCh0aGlzKS5maW5kKFwiLnNsaWRlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICQodGhpcykuZmluZChcIi5zbGlkZTpudGgtb2YtdHlwZShcIiArIGFjdGl2ZVNsaWRlICsgXCIpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIH0pO1xuXG59XG5cbi8vIENyZWF0aW5nIGEgZnVuY3Rpb24gdG8gZGlzYWJsZSB0aGUgYXJyb3cgYnV0dG9ucyBiYXNlZCBvbiBzbGlkZSBwb3NpdGlvblxuZnVuY3Rpb24gdWdfZGlzYWJsZWRCdXR0b25zKCBjdXJyZW50U2xpZGVyQ2xhc3MgKSB7XG5cbiAgdmFyIHNsaWRlVG90YWwgPSAoJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC53cmFwcGVyIC5zbGlkZVwiKS5sZW5ndGgpIC0gMSxcbiAgICAgIGN1cnJlbnRTbGlkZSA9IHBhcnNlSW50KCQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MpLmF0dHIoXCJzbGlkZS1zaG93blwiKSk7XG5cbiAgaWYoIGN1cnJlbnRTbGlkZSA9PT0gKHNsaWRlVG90YWwpKXtcbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICBpZiAoIGN1cnJlbnRTbGlkZSAhPT0gMCApe1xuICAgICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5wcmV2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICB9IGVsc2UgaWYoIGN1cnJlbnRTbGlkZSA9PT0gMCApIHtcbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICBpZiAoIGN1cnJlbnRTbGlkZSAhPT0gc2xpZGVUb3RhbCApe1xuICAgICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAuYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gIH1cblxufVxuXG4vLyBTZXR0aW5nIHVwIGZ1bmN0aW9ucyBmb3Igc2hpZnRpbmcgdGhlIHNsaWRlcnMgYXBwcm9wcmlhdGVseVxuXG5mdW5jdGlvbiB1Z19zbGlkZUxlZnQoY3VycmVudFNsaWRlLCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3Mpe1xuXG4gIGN1cnJlbnRTbGlkZS0tO1xuXG4gIHNsaWRlQW1vdW50ID0gY3VycmVudFNsaWRlICogLTEwMDtcblxuICAvLyAkKGN1cnJlbnRXcmFwcGVyKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IGN1cnJlbnRBbW91bnQgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiA1MDAsIGVhc2luZzogXCJzd2luZ1wifSk7XG4gICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoXCIgKyBzbGlkZUFtb3VudCArIFwiJSlcIik7XG4gICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIsIGN1cnJlbnRTbGlkZSk7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5wcmV2KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgdWdfZGlzYWJsZWRCdXR0b25zKGN1cnJlbnRTbGlkZXJDbGFzcyk7XG4gICAgdWdfc2xpZGVyR3JpZEFjdGl2ZVNldChjdXJyZW50U2xpZGVyQ2xhc3MpO1xuICB9LCA1MClcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZVJpZ2h0KGN1cnJlbnRTbGlkZSwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKXtcblxuICBjdXJyZW50U2xpZGUrKztcblxuICBzbGlkZUFtb3VudCA9IGN1cnJlbnRTbGlkZSAqIC0xMDA7XG5cbiAgLy8gJChjdXJyZW50V3JhcHBlcikudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBjdXJyZW50QW1vdW50ICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogNTAwLCBlYXNpbmc6IFwic3dpbmdcIn0pO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKFwiICsgc2xpZGVBbW91bnQgKyBcIiUpXCIpO1xuICAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBjdXJyZW50U2xpZGUpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucHJldigpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAkKGN1cnJlbnRBY3RpdmVTbGlkZSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIHVnX2Rpc2FibGVkQnV0dG9ucyhjdXJyZW50U2xpZGVyQ2xhc3MpO1xuICAgIHVnX3NsaWRlckdyaWRBY3RpdmVTZXQoY3VycmVudFNsaWRlckNsYXNzKTtcbiAgfSwgNTApXG5cbn1cblxudWdfc2xpZGVyR3JpZExheW91dCgpO1xudWdfc2xpZGVyR3JpZERlZmF1bHRzKCk7XG51Z192aWV3QWxsRGVmYXVsdHMoKTtcblxuXG4kKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbigpIHtcbiAgdWdfc2xpZGVyR3JpZExheW91dCgpO1xuICB1Z19zbGlkZXJHcmlkQWN0aXZlU2V0KFwiMFwiKTtcbn0pO1xuXG5cblxuJChcIi51Zy5zbGlkZXItZ3JpZCAuYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHZhciBidXR0b24gPSAkKHRoaXMpLFxuICB0eXBlID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICBjdXJyZW50U2xpZGVyQ2xhc3MgPSAkKHRoaXMpLnBhcmVudHMoXCIuc2xpZGVyLWdyaWRcIikuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgY3VycmVudFdyYXBwZXIgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gIGN1cnJlbnRTbGlkZXMgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLFxuICBjdXJyZW50QWN0aXZlU2xpZGUgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmFjdGl2ZVwiKSxcblxuICBjdXJyZW50QW1vdW50ID0gJChidXR0b24pLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIpO1xuXG4gIGlmKHR5cGUgPT09IFwibmV4dFwiKXtcblxuICAgIHVnX3NsaWRlUmlnaHQoIGN1cnJlbnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInByZXZcIil7XG5cbiAgICB1Z19zbGlkZUxlZnQoIGN1cnJlbnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbiAgfSBlbHNlIGlmICggdHlwZSA9PT0gXCJ2aWV3LWFsbFwiICl7XG5cbiAgICB1Z192aWV3QWxsTGF5b3V0KGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50U2xpZGVyQ2xhc3MsIGN1cnJlbnRTbGlkZXMsIGJ1dHRvbik7XG5cbiAgfVxuXG4gIHVnX2Rpc2FibGVkQnV0dG9ucyhjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG59KTtcblxuJChcIi51Zy5zbGlkZXItZ3JpZCAuc2xpZGUtaXRlbVwiKS5jbGljayggZnVuY3Rpb24oZSl7XG5cbiAgdmFyIHBhcmVudFNsaWRlID0gJCh0aGlzKS5wYXJlbnQoKSxcbiAgY3VycmVudFdyYXBwZXIgPSAkKHRoaXMpLnBhcmVudHMoXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgY3VycmVudFNsaWRlckNsYXNzID0gJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICBjdXJyZW50QW1vdW50ID0gICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIpLFxuICBzaGlmdEFtb3VudCA9IDEwMCxcbiAgcG90ZW50aWFsU2hpZnQgPSAocGFyc2VJbnQoY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKS5sZW5ndGgsIDEwKSAtIDEpICogc2hpZnRBbW91bnQgKiAtMSxcbiAgY3VycmVudFNsaWRlcyA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIiksXG4gIGN1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKFwiLmFjdGl2ZVwiKTtcblxuXG4gIGlmKCAhcGFyZW50U2xpZGUuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiggcGFyZW50U2xpZGUucHJldigpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICkge1xuXG4gICAgICB1Z19zbGlkZVJpZ2h0KCBjdXJyZW50QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG4gICAgfSBlbHNlIGlmICggcGFyZW50U2xpZGUubmV4dCgpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICl7XG5cbiAgICAgIHVnX3NsaWRlTGVmdCggY3VycmVudEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKTtcblxuICAgIH1cbiAgfVxuXG59KTtcbiIsIi8vIE1hcmt1cCByZWZsZWN0ZWQgaW4gYmFzZS1lbGVtZW50cy9zbGlkZXIuaHRtbFxuXG4vLyBTZXR0aW5nIHNvbWUgZGVmYXVsdHMgZm9yIGVhY2ggc2xpZGVyXG5mdW5jdGlvbiB1Z19zbGlkZXJIZXJvRGVmYXVsdHMoKSB7XG5cbiAgJChcIi51Zy5zbGlkZXItaGVyb1wiKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9ICQodGhpcyksXG4gICAgICAgIGFycm93cyA9IHNlbGYuZmluZChcIi5hcnJvd3NcIik7XG5cblxuICAgICQodGhpcykuZmluZChcIi5zbGlkZS13cmFwcGVyXCIpLmZpbmQoXCIuc2xpZGVcIikuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIucHJvZ3Jlc3Mgc3Bhbi4wXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuZmluZChcIi53cmFwcGVyXCIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogMCB9KTtcblxuICAgIGlmKCBzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIikubGVuZ3RoID4gMCAgKSB7XG5cblxuICAgICAgJChcIi5wcm9ncmVzcyBzcGFuXCIpLnJlbW92ZSgpO1xuXG4gICAgICB2YXIgIHNsaWRlQ291bnQgPSBzZWxmLmZpbmQoXCIuc2xpZGUtaXRlbVwiKS5sZW5ndGg7XG5cbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNsaWRlQ291bnQ7IGkrKyApIHtcbiAgICAgICAgJChcIjxzcGFuIGNsYXNzPSdcIiArIGkrIFwiJz48L3NwYW4+XCIpLmFwcGVuZFRvKFwiLnByb2dyZXNzXCIpO1xuICAgICAgfVxuXG4gICAgICAkKFwiLnVnLnNsaWRlci1oZXJvIC5wcm9ncmVzcyBzcGFuXCIpLmNsaWNrKCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygkKHRoaXMpKTtcbiAgICAgICAgdWdfc2xpZGVySGVyb1NoaWZ0KCQodGhpcykpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8vIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgdWdfc2xpZGVySGVyb0J1dHRvblNldChhcnJvd3MsIHNlbGYpO1xuICAgIC8vIH0sIDUwKTtcblxuXG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVySGVyb0xheW91dCgpe1xuXG4gICQoXCIudWcuc2xpZGVyLWhlcm9cIikuZWFjaCggZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJcIiArIGluZGV4KTtcblxuICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgICB3cmFwcGVyID0gc2VsZi5maW5kKFwiLndyYXBwZXJcIiksXG4gICAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgICBzbGlkZXJOdW1iZXIgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gICAgc2xpZGVzID0gJChcIi51Zy5zbGlkZXItaGVyby5cIiArIHNsaWRlck51bWJlciArIFwiIC5zbGlkZS13cmFwcGVyIGFcIiksXG4gICAgY291bnQgPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgJCh0aGlzKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJIZXJvU2hpZnQoYXJyb3cpe1xuXG4gIHNlbGYgPSBhcnJvdy5wYXJlbnRzKFwiLnVnLnNsaWRlci1oZXJvXCIpLFxuICBzbGlkZVdyYXBwZXIgPSBzZWxmLmZpbmQoXCIuc2xpZGUtd3JhcHBlciAud3JhcHBlclwiKSxcbiAgY291bnQgPSBzZWxmLmZpbmQoXCIuc2xpZGVcIikubGVuZ3RoLFxuICBzbGlkZUFtb3VudCA9IDEwMCxcbiAgc2xpZGVTaG93biA9IHBhcnNlSW50KHNlbGYuYXR0cihcInNsaWRlLXNob3duXCIpKSxcbiAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKSxcbiAgcHJvZ3Jlc3MgPSBzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIiksXG4gIGNsaWNrZWRBcnJvdyA9IGFycm93LmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIilbMF07XG5cbiAgY29uc29sZS5sb2coJChzZWxmKSk7XG5cbiAgaWYoIGNsaWNrZWRBcnJvdyA9PT0gXCJuZXh0XCIgKXtcblxuICAgIHNsaWRlU2hvd24rKztcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqIChzbGlkZVNob3duICogLTEpO1xuXG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2UgaWYgKCBjbGlja2VkQXJyb3cgPT09IFwicHJldlwiKSB7XG5cbiAgICBzbGlkZVNob3duLS07XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoIHNsaWRlU2hvd24gKiAtMSk7XG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2Uge1xuXG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIGNsaWNrZWRBcnJvdyApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggY2xpY2tlZEFycm93ICogLTEgKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH1cblxuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYTpudGgtb2YtdHlwZShcIiArICgxICsgc2xpZGVTaG93bikgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgdWdfc2xpZGVySGVyb0J1dHRvblNldChhcnJvd3MsIHNlbGYpO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlckhlcm9CdXR0b25TZXQoYXJyb3dzLCBzbGlkZXIpIHtcblxuICAgIHZhciBzbGlkZVNob3duID0gcGFyc2VJbnQoJChzbGlkZXIpLmF0dHIoXCJzbGlkZS1zaG93blwiKSksXG4gICAgICAgIGNvdW50ID0gc2xpZGVyLmZpbmQoXCIuc2xpZGUtaXRlbVwiKS5sZW5ndGg7XG5cbiAgICBzbGlkZXIuZmluZChcIi5wcm9ncmVzcyBzcGFuXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgIHNsaWRlci5maW5kKFwiLnByb2dyZXNzIC5cIiArIHNsaWRlU2hvd24pLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgaWYgKCAoKHNsaWRlU2hvd24gKyAxKSA9PT0gY291bnQpICYmIChzbGlkZVNob3duID09PSAwKSl7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9IGVsc2UgaWYgKCAoc2xpZGVTaG93biArIDEpID09PSBjb3VudCApIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5uZXh0XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9ICBlbHNlIGlmKCBzbGlkZVNob3duID09PSAwICkge1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgYXJyb3dzLmNoaWxkcmVuKFwiLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gIGVsc2Uge1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfVxuXG59XG5cbnVnX3NsaWRlckhlcm9MYXlvdXQoKTtcbnVnX3NsaWRlckhlcm9EZWZhdWx0cygpO1xuXG4kKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbigpIHtcbiAgdWdfc2xpZGVySGVyb0xheW91dCgpO1xufSk7XG5cbiQoXCIudWcuc2xpZGVyLWhlcm8gLmFycm93cyBhXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB1Z19zbGlkZXJIZXJvU2hpZnQoJCh0aGlzKSk7XG59KTtcbiIsIi8vIE1hcmt1cCByZWZsZWN0ZWQgaW4gYmFzZS1lbGVtZW50cy9zbGlkZXIuaHRtbFxuXG4vLyBTZXR0aW5nIHNvbWUgZGVmYXVsdHMgZm9yIGVhY2ggc2xpZGVyXG5mdW5jdGlvbiB1Z19zbGlkZXJEZWZhdWx0cygpIHtcblxuICAkKFwiLnVnLnNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbigpIHtcblxuICAgICQodGhpcykuZmluZChcIi5zbGlkZS13cmFwcGVyXCIpLmZpbmQoXCIuc2xpZGVcIikuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIucHJvZ3Jlc3Mgc3Bhbi4wXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuZmluZChcIi53cmFwcGVyXCIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogMCB9KTtcblxuICAgIHZhciBhcnJvd3MgPSAkKHRoaXMpLmZpbmQoXCIuYXJyb3dzXCIpLFxuICAgICAgICBzbGlkZVNob3duID0gJCh0aGlzKS5hdHRyKFwic2xpZGUtc2hvd25cIik7XG5cbiAgICB1Z19zbGlkZXJCdXR0b25TZXQoYXJyb3dzLCAkKHRoaXMpKTtcblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJMYXlvdXQoKXtcblxuICAkKFwiLnVnLnNsaWRlclwiKS5lYWNoKCBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIlwiICsgaW5kZXgpO1xuXG4gICAgdmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgIHNsaWRlV3JhcHBlciA9IHNlbGYuZmluZChcIi5zbGlkZS13cmFwcGVyXCIpLFxuICAgIHdyYXBwZXIgPSBzZWxmLmZpbmQoXCIud3JhcHBlclwiKSxcbiAgICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpLFxuICAgIHNsaWRlck51bWJlciA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgICBzbGlkZXMgPSAkKFwiLnVnLnNsaWRlci5cIiArIHNsaWRlck51bWJlciArIFwiIC5zbGlkZS13cmFwcGVyIGFcIiksXG4gICAgY291bnQgPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYoIHNsaWRlcy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcblxuICAgICAgc2xpZGVzLnVud3JhcCgpO1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoMTQ1MCkgKSB7XG5cbiAgICAgIGlmKCBzbGlkZXMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHNsaWRlcy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz01ICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDgwMCkgJiYgbWF4V2lkdGgoMTIwMCkgKSB7XG4gICAgICBpZiggc2xpZGVzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBzbGlkZXMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9MyApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSszKS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKS5sZW5ndGggPiAwICApIHtcblxuICAgICAgc2VsZi5maW5kKFwiLnByb2dyZXNzIHNwYW5cIikucmVtb3ZlKCk7XG5cbiAgICAgIHZhciAgc2xpZGVDb3VudCA9IHNlbGYuZmluZChcIi5zbGlkZVwiKS5sZW5ndGg7XG5cblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2xpZGVDb3VudDsgaSsrICkge1xuICAgICAgICAkKFwiPHNwYW4gY2xhc3M9J1wiICsgaSsgXCInPjwvc3Bhbj5cIikuYXBwZW5kVG8oc2VsZi5maW5kKFwiLnByb2dyZXNzXCIpKTtcbiAgICAgIH1cblxuICAgICAgJChcIi51Zy5zbGlkZXIgLnByb2dyZXNzIHNwYW5cIikuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykpO1xuICAgICAgICB1Z19zbGlkZXJTaGlmdCgkKHRoaXMpKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgJCh0aGlzKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgIHVnX3NsaWRlckJ1dHRvblNldChhcnJvd3MsICQodGhpcykpO1xuXG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlclNoaWZ0KGFycm93KXtcblxuICBzZWxmID0gYXJyb3cucGFyZW50cyhcIi51Zy5zbGlkZXJcIiksXG4gIHNsaWRlV3JhcHBlciA9IHNlbGYuZmluZChcIi5zbGlkZS13cmFwcGVyIC53cmFwcGVyXCIpLFxuICBjb3VudCA9IHNlbGYuZmluZChcIi5zbGlkZVwiKS5sZW5ndGgsXG4gIHNsaWRlQW1vdW50ID0gMTAwLFxuICBzbGlkZVNob3duID0gcGFyc2VJbnQoc2VsZi5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpLFxuICBwcm9ncmVzcyA9IHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKSxcbiAgY2xpY2tlZEFycm93ID0gYXJyb3cuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKVswXTtcblxuICBjb25zb2xlLmxvZyhhcnJvdyk7XG5cbiAgaWYoIGNsaWNrZWRBcnJvdyA9PT0gXCJuZXh0XCIgKXtcblxuICAgIHNsaWRlU2hvd24rKztcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqIChzbGlkZVNob3duICogLTEpO1xuXG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2UgaWYgKCBjbGlja2VkQXJyb3cgPT09IFwicHJldlwiKSB7XG5cbiAgICBzbGlkZVNob3duLS07XG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIHNsaWRlU2hvd24gKTtcblxuICAgIHZhciBzbGlkZVRvdGFsID0gc2xpZGVBbW91bnQgKiAoIHNsaWRlU2hvd24gKiAtMSk7XG5cbiAgICBzbGlkZVdyYXBwZXIudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiBzbGlkZVRvdGFsICsgXCIlXCIgfSwgeyBkdXJhdGlvbjogMjUwLCBkZWxheTogMCB9KTtcblxuICB9IGVsc2Uge1xuXG4gICAgc2VsZi5hdHRyKCBcInNsaWRlLXNob3duXCIsIGNsaWNrZWRBcnJvdyApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggY2xpY2tlZEFycm93ICogLTEgKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH1cblxuICAvLyBwcm9ncmVzcy5jaGlsZHJlbihcImFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYTpudGgtb2YtdHlwZShcIiArICgxICsgc2xpZGVTaG93bikgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgc2VsZik7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgc2xpZGVyKSB7XG5cbiAgICB2YXIgc2xpZGVTaG93biA9IHBhcnNlSW50KHNsaWRlci5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICAgICAgICBjb3VudCA9IHNsaWRlci5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aDtcblxuICAgIHNsaWRlci5maW5kKFwiLnByb2dyZXNzIHNwYW5cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgc2xpZGVyLmZpbmQoXCIucHJvZ3Jlc3MgLlwiICsgc2xpZGVTaG93bikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICBpZiggc2xpZGVTaG93biA9PT0gMCApe1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oXCIucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfSBlbHNlIGlmICggKHNsaWRlU2hvd24gKyAxKSA9PT0gY291bnQgKSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5uZXh0XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfVxuXG59XG5cbnVnX3NsaWRlckxheW91dCgpO1xudWdfc2xpZGVyRGVmYXVsdHMoKTtcblxuJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24oKSB7XG4gIHVnX3NsaWRlckxheW91dCgpO1xufSk7XG5cbiQoXCIudWcuc2xpZGVyIC5hcnJvd3MgYVwiKS5jbGljayggZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdWdfc2xpZGVyU2hpZnQoJCh0aGlzKSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
