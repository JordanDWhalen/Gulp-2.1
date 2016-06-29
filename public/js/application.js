
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

$(".ug .search").click( function(event){
  var clicked = event.target;

  if( !$(clicked).hasClass("search") ) {
  } else {
    $(this).toggleClass("open");
  }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiLCJiYXNlLWZ1bmN0aW9ucy9iYXNlLmpzIiwiYmFzZS1mdW5jdGlvbnMvY29tcG9uZW50cy9mYXV4LXBvc2l0aW9uLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9hY2NvcmRpb24uanMiLCJiYXNlLWZ1bmN0aW9ucy9vYmplY3RzL2hlYWRlci5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvbGlnaHRib3guanMiLCJiYXNlLWZ1bmN0aW9ucy9vYmplY3RzL3NsaWRlci1ncmlkLmpzIiwiYmFzZS1mdW5jdGlvbnMvb2JqZWN0cy9zbGlkZXItaGVyby5qcyIsImJhc2UtZnVuY3Rpb25zL29iamVjdHMvc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsImZ1bmN0aW9uIG1pbldpZHRoKHdpZHRoKSB7XG4gIHZhciBzY3JlZW5XaWR0aCA9ICAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYgKCBzY3JlZW5XaWR0aCA+PSB3aWR0aCApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF4V2lkdGgod2lkdGgpIHtcbiAgdmFyIHNjcmVlbldpZHRoID0gICQod2luZG93KS53aWR0aCgpO1xuICBpZiAoIHNjcmVlbldpZHRoIDw9IHdpZHRoICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLy8gVGhpcyBmdW5jdGlvbiB0YWtlcyBjYXJlIG9mIGFsbCB0aGUgd2VpciBpc3N1ZXMgeW91IG1pZ2h0IHJ1biBpbnRvIHdoZW4gdHJ5aW5nIHRvIGRvIGEgZml4ZWQgcG9zaXRpb24gb3ZlcmxheSBvbiBtb2JpbGUuXG5cbmZ1bmN0aW9uIHBvc2l0aW9uRmF1eGVkKG9uKXtcbiAgdmFyIGhlYWRlck9mZnNldCA9IHBhcnNlSW50KCQoXCJoZWFkZXIuZ2xvYmFsXCIpLmhlaWdodCgpLCAxMCk7XG4gIHZhciBmYWtlU2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gaGVhZGVyT2Zmc2V0O1xuICB2YXIgc2Nyb2xsQW1vdW50ID0gcGFyc2VJbnQoJChcIm1haW4ubm9zY3JvbGxcIikuY3NzKFwidG9wXCIpLCAxMCkgLSBoZWFkZXJPZmZzZXQ7XG4gIHNjcm9sbEFtb3VudCA9IHBhcnNlSW50KHNjcm9sbEFtb3VudCwgMTApO1xuICBzY3JvbGxBbW91bnQgPSBzY3JvbGxBbW91bnQgKiAtMTtcblxuICBpZihvbiA9PT0gdHJ1ZSl7XG4gICAgJChcIm1haW5cIikuYWRkQ2xhc3MoXCJub3Njcm9sbFwiKTtcbiAgICAkKFwibWFpblwiKS5jc3MoXCJ0b3BcIiwgKyAoZmFrZVNjcm9sbCAgKiAtMSkpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgJChcIm1haW5cIikucmVtb3ZlQ2xhc3MoXCJub3Njcm9sbFwiKTtcbiAgICAgICQoXCJtYWluXCIpLmNzcyhcInRvcFwiLCBcIjBcIik7XG4gICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKHNjcm9sbEFtb3VudCk7XG4gICAgfSwgMSk7XG5cbiAgfVxufVxuIiwiJChcIi51Zy5hY2NvcmRpb24gaGVhZGVyXCIpLmNsaWNrKCBmdW5jdGlvbigpe1xuXG4gIHZhciBjb250ZW50SGVpZ2h0ID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmNvbnRlbnRcIikub3V0ZXJIZWlnaHQoKTtcblxuICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcblxuICBpZiggJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcyhcIm9wZW5cIikgKXtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKFwiLmNvbnRlbnQtd3JhcHBlclwiKS52ZWxvY2l0eSh7IG1heEhlaWdodDogY29udGVudEhlaWdodCB9LCB7IGR1cmF0aW9uOiAyNTAsIGVhc2luZzogXCJlYXNlSW5PdXRcIiB9KTtcbiAgfSAgZWxzZSB7XG4gICAgJCh0aGlzKS5zaWJsaW5ncyhcIi5jb250ZW50LXdyYXBwZXJcIikudmVsb2NpdHkoeyBtYXhIZWlnaHQ6IDAgfSwgeyBkdXJhdGlvbjogMjUwLCBlYXNpbmc6IFwiZWFzZUluT3V0XCIgfSk7XG4gIH1cblxufSk7XG4iLCIkKFwiLnVnIG5hdi5nbG9iYWxcIikuY2xvbmUoKS5hcHBlbmRUbyhcImhlYWRlci51Zy5nbG9iYWwgZGl2Lm1lbnVcIik7XG5cbiQoXCIudWcgZGl2Lm1lbnUgLm1lbnUtdHJpZ2dlclwiKS5jbGljayggZnVuY3Rpb24oKXtcbiAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG59KTtcblxuJChcIi51ZyAuZHJvcGRvd25cIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gIC8vIENvbnNpZGVyIGFkZGluZyBpbiBjb2RlIHRvIGR5bmFtaWNhbGx5IHRyYWNrIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiBkcm9wZG93blxufSk7XG5cbiQoXCIudWcgLnNlYXJjaFwiKS5jbGljayggZnVuY3Rpb24oZXZlbnQpe1xuICB2YXIgY2xpY2tlZCA9IGV2ZW50LnRhcmdldDtcblxuICBpZiggISQoY2xpY2tlZCkuaGFzQ2xhc3MoXCJzZWFyY2hcIikgKSB7XG4gIH0gZWxzZSB7XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XG4gIH1cbn0pO1xuIiwiZnVuY3Rpb24gdWdfTGlnaHRib3hPcGVuKHRyaWdnZXIpe1xuXG4gIHZhciBhY3RpdmVCb3ggPSB0cmlnZ2VyLmF0dHIoXCJib3hcIik7XG5cbiAgY29uc29sZS5sb2coYWN0aXZlQm94KTtcblxuICAkKFwiLnVnLmxpZ2h0Ym94W2JveD0nMCddXCIgKS5hZGRDbGFzcyhcIm9wZW5cIik7XG5cbiAgcG9zaXRpb25GYXV4ZWQodHJ1ZSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfTGlnaHRib3hDbG9zZSh0cmlnZ2VyKXtcblxuICB2YXIgYWN0aXZlQm94ID0gdHJpZ2dlci5wYXJlbnQoKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpO1xuXG4gICQoXCIudWcubGlnaHRib3guXCIgKyBhY3RpdmVCb3gpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcblxuICBwb3NpdGlvbkZhdXhlZChmYWxzZSk7XG5cbn1cblxuJChcIi51ZyAubGlnaHRib3gtdHJpZ2dlclwiKS5jbGljayggZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB1Z19MaWdodGJveE9wZW4oJCh0aGlzKSk7XG5cbn0pO1xuXG4kKFwiLnVnLmxpZ2h0Ym94IC5jbG9zZVwiKS5jbGljayhmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHVnX0xpZ2h0Ym94Q2xvc2UoJCh0aGlzKSk7XG5cbn0pO1xuIiwiZnVuY3Rpb24gdWdfc2xpZGVyR3JpZExheW91dCgpe1xuICAvLyBBZGRpbmcgYSB1bmlxdWUgY2xhc3MgdG8gZWFjaCBzbGlkZXIgZm9yIGRpZmZlcmVudGlhdGlvbiBvZlxuICAkKFwiLnVnLnNsaWRlci1ncmlkXCIpLmVhY2goIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG5cbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiXCIgKyBpbmRleCk7XG5cbiAgICB2YXIgc2xpZGVyTnVtYmVyID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuXG4gICAgcHJvZHVjdHMgPSAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgc2xpZGVyTnVtYmVyICsgXCIgLndyYXBwZXIgYVwiKTtcblxuICAgIGlmKCBwcm9kdWN0cy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcblxuICAgICAgcHJvZHVjdHMudW53cmFwKCk7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz00ICkge1xuICAgICAgICBwcm9kdWN0cy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoIG1pbldpZHRoKDE0NTApICkge1xuICAgICAgaWYoIHByb2R1Y3RzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuICAgICAgICBwcm9kdWN0cy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgcHJvZHVjdHMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoODAwKSAmJiBtYXhXaWR0aCgxMjAwKSApIHtcbiAgICAgIGlmKCBwcm9kdWN0cy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgcHJvZHVjdHMudW53cmFwKCk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHByb2R1Y3RzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVnX3ZpZXdBbGxMYXlvdXQoY3VycmVudFdyYXBwZXIsIGN1cnJlbnRTbGlkZXJDbGFzcywgY3VycmVudFNsaWRlcywgYnV0dG9uKSB7XG5cbiAgaWYoICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikuaGFzQ2xhc3MoXCJ2aWV3LWFsbFwiKSApe1xuXG4gICAgJChidXR0b24pLnRleHQoXCJWaWV3IEFsbFwiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLmFkZENsYXNzKFwibGluZVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5yZW1vdmVDbGFzcyhcImdyaWRcIik7XG5cbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwidmlldy1hbGxcIik7XG4gICAgJChjdXJyZW50U2xpZGVzKS5hdHRyKFwiY2xhc3NcIiwgXCJzbGlkZVwiKTtcblxuICAgIHVnX3NsaWRlckdyaWRBY3RpdmVTZXQoXCIwXCIpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICAkKGJ1dHRvbikudGV4dChcIlZpZXcgTGVzc1wiKTtcblxuICAgICQoY3VycmVudFdyYXBwZXIpLnJlbW92ZUNsYXNzKFwibGluZVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5hZGRDbGFzcyhcImdyaWRcIik7XG5cbiAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5uZXh0XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKTtcbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICAkKGN1cnJlbnRXcmFwcGVyKS5jaGlsZHJlbihcIi53cmFwcGVyXCIpLmFkZENsYXNzKFwidmlldy1hbGxcIik7XG4gICAgJChjdXJyZW50U2xpZGVzKS5hdHRyKFwiY2xhc3NcIiwgXCJzbGlkZSBhY3RpdmVcIik7XG5cbiAgfVxuXG59XG5cbi8vIFNldHRpbmcgc29tZSBkZWZhdWx0cyBmb3IgZWFjaCBzbGlkZXJcbmZ1bmN0aW9uIHVnX3NsaWRlckdyaWREZWZhdWx0cygpIHtcbiAgJChcIi51Zy5zbGlkZXItZ3JpZFwiKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKS5jaGlsZHJlbigpLmNoaWxkcmVuKCkuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIubGVhZFwiKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICB2YXIgc2xpZGVOdW1iZXIgPSAkKHRoaXMpLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLmxlbmd0aDtcblxuICAgIGlmKHNsaWRlTnVtYmVyIDw9IDEpe1xuICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLmxlYWRcIikuY2hpbGRyZW4oXCIuY29udHJvbHNcIikuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVnX3ZpZXdBbGxEZWZhdWx0cygpIHtcblxuICAkKFwiLnVnLnNsaWRlci1ncmlkXCIpLmVhY2goIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGN1cnJlbnRXcmFwcGVyID0gJCh0aGlzKS5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gICAgY3VycmVudFNsaWRlckNsYXNzID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICAgIGN1cnJlbnRTbGlkZXMgPSBjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpO1xuXG4gICAgaWYoY3VycmVudFdyYXBwZXIuaGFzQ2xhc3MoXCJncmlkXCIpKXtcblxuICAgICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5idXR0b24udmlldy1hbGxcIikudGV4dChcIlZpZXcgTGVzc1wiKTtcblxuICAgICAgJChjdXJyZW50V3JhcHBlcikucmVtb3ZlQ2xhc3MoXCJsaW5lXCIpO1xuICAgICAgJChjdXJyZW50V3JhcHBlcikuYWRkQ2xhc3MoXCJncmlkXCIpO1xuXG4gICAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgICAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJzbGlkZS1zaG93blwiLCBcIjBcIik7XG5cbiAgICAgICQoY3VycmVudFdyYXBwZXIpLmNoaWxkcmVuKFwiLndyYXBwZXJcIikuYWRkQ2xhc3MoXCJ2aWV3LWFsbFwiKTtcbiAgICAgICQoY3VycmVudFNsaWRlcykuYXR0cihcImNsYXNzXCIsIFwic2xpZGUgYWN0aXZlXCIpO1xuXG4gICAgfVxuXG4gIH0pO1xuXG59O1xuXG4vLyBTZXR0aW5nIHRoZSBmaXJzdCBzbGlkZSBhY3RpdmVcbmZ1bmN0aW9uIHVnX3NsaWRlckdyaWRBY3RpdmVTZXQoIHNsaWRlckNsYXNzICkge1xuXG4gICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBzbGlkZXJDbGFzcykuZWFjaCggZnVuY3Rpb24oKXtcblxuICAgIHZhciBhY3RpdmVTbGlkZSA9IHBhcnNlSW50KCQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIpKSArIDE7XG5cbiAgICBjb25zb2xlLmxvZygkKHRoaXMpLmZpbmQoXCIuc2xpZGU6bnRoLW9mLXR5cGUoXCIgKyBhY3RpdmVTbGlkZSArIFwiKVwiKSk7XG5cbiAgICAkKHRoaXMpLmZpbmQoXCIuc2xpZGUuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgJCh0aGlzKS5maW5kKFwiLnNsaWRlOm50aC1vZi10eXBlKFwiICsgYWN0aXZlU2xpZGUgKyBcIilcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgfSk7XG5cbn1cblxuLy8gQ3JlYXRpbmcgYSBmdW5jdGlvbiB0byBkaXNhYmxlIHRoZSBhcnJvdyBidXR0b25zIGJhc2VkIG9uIHNsaWRlIHBvc2l0aW9uXG5mdW5jdGlvbiB1Z19kaXNhYmxlZEJ1dHRvbnMoIGN1cnJlbnRTbGlkZXJDbGFzcyApIHtcblxuICB2YXIgc2xpZGVUb3RhbCA9ICgkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLndyYXBwZXIgLnNsaWRlXCIpLmxlbmd0aCkgLSAxLFxuICAgICAgY3VycmVudFNsaWRlID0gcGFyc2VJbnQoJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcykuYXR0cihcInNsaWRlLXNob3duXCIpKTtcblxuICBpZiggY3VycmVudFNsaWRlID09PSAoc2xpZGVUb3RhbCkpe1xuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAubmV4dFwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIGlmICggY3VycmVudFNsaWRlICE9PSAwICl7XG4gICAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLnByZXZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG4gIH0gZWxzZSBpZiggY3VycmVudFNsaWRlID09PSAwICkge1xuICAgICQoXCIudWcuc2xpZGVyLWdyaWQuXCIgKyBjdXJyZW50U2xpZGVyQ2xhc3MgKyBcIiAucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgIGlmICggY3VycmVudFNsaWRlICE9PSBzbGlkZVRvdGFsICl7XG4gICAgICAkKFwiLnVnLnNsaWRlci1ncmlkLlwiICsgY3VycmVudFNsaWRlckNsYXNzICsgXCIgLm5leHRcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgJChcIi51Zy5zbGlkZXItZ3JpZC5cIiArIGN1cnJlbnRTbGlkZXJDbGFzcyArIFwiIC5idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG59XG5cbi8vIFNldHRpbmcgdXAgZnVuY3Rpb25zIGZvciBzaGlmdGluZyB0aGUgc2xpZGVycyBhcHByb3ByaWF0ZWx5XG5cbmZ1bmN0aW9uIHVnX3NsaWRlTGVmdChjdXJyZW50U2xpZGUsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyl7XG5cbiAgY3VycmVudFNsaWRlLS07XG5cbiAgc2xpZGVBbW91bnQgPSBjdXJyZW50U2xpZGUgKiAtMTAwO1xuXG4gIC8vICQoY3VycmVudFdyYXBwZXIpLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogY3VycmVudEFtb3VudCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDUwMCwgZWFzaW5nOiBcInN3aW5nXCJ9KTtcbiAgJChjdXJyZW50V3JhcHBlcikuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWChcIiArIHNsaWRlQW1vdW50ICsgXCIlKVwiKTtcbiAgJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiwgY3VycmVudFNsaWRlKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnByZXYoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgJChjdXJyZW50QWN0aXZlU2xpZGUpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICB1Z19kaXNhYmxlZEJ1dHRvbnMoY3VycmVudFNsaWRlckNsYXNzKTtcbiAgICB1Z19zbGlkZXJHcmlkQWN0aXZlU2V0KGN1cnJlbnRTbGlkZXJDbGFzcyk7XG4gIH0sIDUwKVxuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlUmlnaHQoY3VycmVudFNsaWRlLCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3Mpe1xuXG4gIGN1cnJlbnRTbGlkZSsrO1xuXG4gIHNsaWRlQW1vdW50ID0gY3VycmVudFNsaWRlICogLTEwMDtcblxuICAvLyAkKGN1cnJlbnRXcmFwcGVyKS52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IGN1cnJlbnRBbW91bnQgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiA1MDAsIGVhc2luZzogXCJzd2luZ1wifSk7XG4gICQoY3VycmVudFdyYXBwZXIpLmNzcyhcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoXCIgKyBzbGlkZUFtb3VudCArIFwiJSlcIik7XG4gICQoY3VycmVudFdyYXBwZXIpLnBhcmVudHMoXCIudWcuc2xpZGVyLWdyaWRcIikuYXR0cihcInNsaWRlLXNob3duXCIsIGN1cnJlbnRTbGlkZSk7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5wcmV2KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICQoY3VycmVudEFjdGl2ZVNsaWRlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgdWdfZGlzYWJsZWRCdXR0b25zKGN1cnJlbnRTbGlkZXJDbGFzcyk7XG4gICAgdWdfc2xpZGVyR3JpZEFjdGl2ZVNldChjdXJyZW50U2xpZGVyQ2xhc3MpO1xuICB9LCA1MClcblxufVxuXG51Z19zbGlkZXJHcmlkTGF5b3V0KCk7XG51Z19zbGlkZXJHcmlkRGVmYXVsdHMoKTtcbnVnX3ZpZXdBbGxEZWZhdWx0cygpO1xuXG5cbiQod2luZG93KS5yZXNpemUoIGZ1bmN0aW9uKCkge1xuICB1Z19zbGlkZXJHcmlkTGF5b3V0KCk7XG4gIHVnX3NsaWRlckdyaWRBY3RpdmVTZXQoXCIwXCIpO1xufSk7XG5cblxuXG4kKFwiLnVnLnNsaWRlci1ncmlkIC5idXR0b25cIikuY2xpY2soZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdmFyIGJ1dHRvbiA9ICQodGhpcyksXG4gIHR5cGUgPSAkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gIGN1cnJlbnRTbGlkZXJDbGFzcyA9ICQodGhpcykucGFyZW50cyhcIi5zbGlkZXItZ3JpZFwiKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICBjdXJyZW50V3JhcHBlciA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuY2hpbGRyZW4oXCIuc2xpZGUtd3JhcHBlclwiKSxcbiAgY3VycmVudFNsaWRlcyA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuc2xpZGVcIiksXG4gIGN1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRXcmFwcGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oXCIuYWN0aXZlXCIpLFxuXG4gIGN1cnJlbnRBbW91bnQgPSAkKGJ1dHRvbikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIik7XG5cbiAgaWYodHlwZSA9PT0gXCJuZXh0XCIpe1xuXG4gICAgdWdfc2xpZGVSaWdodCggY3VycmVudEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKTtcblxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicHJldlwiKXtcblxuICAgIHVnX3NsaWRlTGVmdCggY3VycmVudEFtb3VudCwgY3VycmVudFdyYXBwZXIsIGN1cnJlbnRBY3RpdmVTbGlkZSwgY3VycmVudFNsaWRlckNsYXNzKTtcblxuICB9IGVsc2UgaWYgKCB0eXBlID09PSBcInZpZXctYWxsXCIgKXtcblxuICAgIHVnX3ZpZXdBbGxMYXlvdXQoY3VycmVudFdyYXBwZXIsIGN1cnJlbnRTbGlkZXJDbGFzcywgY3VycmVudFNsaWRlcywgYnV0dG9uKTtcblxuICB9XG5cbiAgdWdfZGlzYWJsZWRCdXR0b25zKGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbn0pO1xuXG4kKFwiLnVnLnNsaWRlci1ncmlkIC5zbGlkZS1pdGVtXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcblxuICB2YXIgcGFyZW50U2xpZGUgPSAkKHRoaXMpLnBhcmVudCgpLFxuICBjdXJyZW50V3JhcHBlciA9ICQodGhpcykucGFyZW50cyhcIi5zbGlkZS13cmFwcGVyXCIpLFxuICBjdXJyZW50U2xpZGVyQ2xhc3MgPSAkKGN1cnJlbnRXcmFwcGVyKS5wYXJlbnRzKFwiLnVnLnNsaWRlci1ncmlkXCIpLmF0dHIoXCJjbGFzc1wiKS5zcGxpdChcIiBcIikucG9wKCksXG4gIGN1cnJlbnRBbW91bnQgPSAgJChjdXJyZW50V3JhcHBlcikucGFyZW50cyhcIi51Zy5zbGlkZXItZ3JpZFwiKS5hdHRyKFwic2xpZGUtc2hvd25cIiksXG4gIHNoaWZ0QW1vdW50ID0gMTAwLFxuICBwb3RlbnRpYWxTaGlmdCA9IChwYXJzZUludChjdXJyZW50V3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKFwiLnNsaWRlXCIpLmxlbmd0aCwgMTApIC0gMSkgKiBzaGlmdEFtb3VudCAqIC0xLFxuICBjdXJyZW50U2xpZGVzID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oKS5jaGlsZHJlbihcIi5zbGlkZVwiKSxcbiAgY3VycmVudEFjdGl2ZVNsaWRlID0gY3VycmVudFdyYXBwZXIuY2hpbGRyZW4oXCIuYWN0aXZlXCIpO1xuXG5cbiAgaWYoICFwYXJlbnRTbGlkZS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmKCBwYXJlbnRTbGlkZS5wcmV2KCkuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKSB7XG5cbiAgICAgIHVnX3NsaWRlUmlnaHQoIGN1cnJlbnRBbW91bnQsIGN1cnJlbnRXcmFwcGVyLCBjdXJyZW50QWN0aXZlU2xpZGUsIGN1cnJlbnRTbGlkZXJDbGFzcyk7XG5cbiAgICB9IGVsc2UgaWYgKCBwYXJlbnRTbGlkZS5uZXh0KCkuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKXtcblxuICAgICAgdWdfc2xpZGVMZWZ0KCBjdXJyZW50QW1vdW50LCBjdXJyZW50V3JhcHBlciwgY3VycmVudEFjdGl2ZVNsaWRlLCBjdXJyZW50U2xpZGVyQ2xhc3MpO1xuXG4gICAgfVxuICB9XG5cbn0pO1xuIiwiLy8gTWFya3VwIHJlZmxlY3RlZCBpbiBiYXNlLWVsZW1lbnRzL3NsaWRlci5odG1sXG5cbi8vIFNldHRpbmcgc29tZSBkZWZhdWx0cyBmb3IgZWFjaCBzbGlkZXJcbmZ1bmN0aW9uIHVnX3NsaWRlckhlcm9EZWZhdWx0cygpIHtcblxuICAkKFwiLnVnLnNsaWRlci1oZXJvXCIpLmVhY2goIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICAgICAgYXJyb3dzID0gc2VsZi5maW5kKFwiLmFycm93c1wiKTtcblxuXG4gICAgJCh0aGlzKS5maW5kKFwiLnNsaWRlLXdyYXBwZXJcIikuZmluZChcIi5zbGlkZVwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuZmluZChcIi5wcm9ncmVzcyBzcGFuLjBcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLndyYXBwZXJcIikudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiAwIH0pO1xuXG4gICAgaWYoIHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKS5sZW5ndGggPiAwICApIHtcblxuXG4gICAgICAkKFwiLnByb2dyZXNzIHNwYW5cIikucmVtb3ZlKCk7XG5cbiAgICAgIHZhciAgc2xpZGVDb3VudCA9IHNlbGYuZmluZChcIi5zbGlkZS1pdGVtXCIpLmxlbmd0aDtcblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2xpZGVDb3VudDsgaSsrICkge1xuICAgICAgICAkKFwiPHNwYW4gY2xhc3M9J1wiICsgaSsgXCInPjwvc3Bhbj5cIikuYXBwZW5kVG8oXCIucHJvZ3Jlc3NcIik7XG4gICAgICB9XG5cbiAgICAgICQoXCIudWcuc2xpZGVyLWhlcm8gLnByb2dyZXNzIHNwYW5cIikuY2xpY2soIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykpO1xuICAgICAgICB1Z19zbGlkZXJIZXJvU2hpZnQoJCh0aGlzKSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLy8gc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICB1Z19zbGlkZXJIZXJvQnV0dG9uU2V0KGFycm93cywgc2VsZik7XG4gICAgLy8gfSwgNTApO1xuXG5cblxuICB9KTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJIZXJvTGF5b3V0KCl7XG5cbiAgJChcIi51Zy5zbGlkZXItaGVyb1wiKS5lYWNoKCBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIlwiICsgaW5kZXgpO1xuXG4gICAgdmFyIHNlbGYgPSAkKHRoaXMpLFxuICAgIHNsaWRlV3JhcHBlciA9IHNlbGYuZmluZChcIi5zbGlkZS13cmFwcGVyXCIpLFxuICAgIHdyYXBwZXIgPSBzZWxmLmZpbmQoXCIud3JhcHBlclwiKSxcbiAgICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpLFxuICAgIHNsaWRlck51bWJlciA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKS5wb3AoKSxcbiAgICBzbGlkZXMgPSAkKFwiLnVnLnNsaWRlci1oZXJvLlwiICsgc2xpZGVyTnVtYmVyICsgXCIgLnNsaWRlLXdyYXBwZXIgYVwiKSxcbiAgICBjb3VudCA9IHNsaWRlcy5sZW5ndGg7XG5cbiAgICAkKHRoaXMpLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlckhlcm9TaGlmdChhcnJvdyl7XG5cbiAgc2VsZiA9IGFycm93LnBhcmVudHMoXCIudWcuc2xpZGVyLWhlcm9cIiksXG4gIHNsaWRlV3JhcHBlciA9IHNlbGYuZmluZChcIi5zbGlkZS13cmFwcGVyIC53cmFwcGVyXCIpLFxuICBjb3VudCA9IHNlbGYuZmluZChcIi5zbGlkZVwiKS5sZW5ndGgsXG4gIHNsaWRlQW1vdW50ID0gMTAwLFxuICBzbGlkZVNob3duID0gcGFyc2VJbnQoc2VsZi5hdHRyKFwic2xpZGUtc2hvd25cIikpLFxuICBhcnJvd3MgPSBzZWxmLmZpbmQoXCIuYXJyb3dzXCIpLFxuICBwcm9ncmVzcyA9IHNlbGYuZmluZChcIi5wcm9ncmVzc1wiKSxcbiAgY2xpY2tlZEFycm93ID0gYXJyb3cuYXR0cihcImNsYXNzXCIpLnNwbGl0KFwiIFwiKVswXTtcblxuICBjb25zb2xlLmxvZygkKHNlbGYpKTtcblxuICBpZiggY2xpY2tlZEFycm93ID09PSBcIm5leHRcIiApe1xuXG4gICAgc2xpZGVTaG93bisrO1xuICAgIHNlbGYuYXR0ciggXCJzbGlkZS1zaG93blwiLCBzbGlkZVNob3duICk7XG5cbiAgICB2YXIgc2xpZGVUb3RhbCA9IHNsaWRlQW1vdW50ICogKHNsaWRlU2hvd24gKiAtMSk7XG5cblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH0gZWxzZSBpZiAoIGNsaWNrZWRBcnJvdyA9PT0gXCJwcmV2XCIpIHtcblxuICAgIHNsaWRlU2hvd24tLTtcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggc2xpZGVTaG93biAqIC0xKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgY2xpY2tlZEFycm93ICk7XG5cbiAgICB2YXIgc2xpZGVUb3RhbCA9IHNsaWRlQW1vdW50ICogKCBjbGlja2VkQXJyb3cgKiAtMSApO1xuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfVxuXG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgLy8gcHJvZ3Jlc3MuY2hpbGRyZW4oXCJhOm50aC1vZi10eXBlKFwiICsgKDEgKyBzbGlkZVNob3duKSArIFwiKVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICB1Z19zbGlkZXJIZXJvQnV0dG9uU2V0KGFycm93cywgc2VsZik7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVySGVyb0J1dHRvblNldChhcnJvd3MsIHNsaWRlcikge1xuXG4gICAgdmFyIHNsaWRlU2hvd24gPSBwYXJzZUludCgkKHNsaWRlcikuYXR0cihcInNsaWRlLXNob3duXCIpKSxcbiAgICAgICAgY291bnQgPSBzbGlkZXIuZmluZChcIi5zbGlkZS1pdGVtXCIpLmxlbmd0aDtcblxuICAgIHNsaWRlci5maW5kKFwiLnByb2dyZXNzIHNwYW5cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgc2xpZGVyLmZpbmQoXCIucHJvZ3Jlc3MgLlwiICsgc2xpZGVTaG93bikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICBpZiAoICgoc2xpZGVTaG93biArIDEpID09PSBjb3VudCkgJiYgKHNsaWRlU2hvd24gPT09IDApKXtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKCkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gZWxzZSBpZiAoIChzbGlkZVNob3duICsgMSkgPT09IGNvdW50ICkge1xuXG4gICAgICBhcnJvd3MuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgYXJyb3dzLmNoaWxkcmVuKFwiLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gIGVsc2UgaWYoIHNsaWRlU2hvd24gPT09IDAgKSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICBhcnJvd3MuY2hpbGRyZW4oXCIucHJldlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXG4gICAgfSAgZWxzZSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9XG5cbn1cblxudWdfc2xpZGVySGVyb0xheW91dCgpO1xudWdfc2xpZGVySGVyb0RlZmF1bHRzKCk7XG5cbiQod2luZG93KS5yZXNpemUoIGZ1bmN0aW9uKCkge1xuICB1Z19zbGlkZXJIZXJvTGF5b3V0KCk7XG59KTtcblxuJChcIi51Zy5zbGlkZXItaGVybyAuYXJyb3dzIGFcIikuY2xpY2soIGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHVnX3NsaWRlckhlcm9TaGlmdCgkKHRoaXMpKTtcbn0pO1xuIiwiLy8gTWFya3VwIHJlZmxlY3RlZCBpbiBiYXNlLWVsZW1lbnRzL3NsaWRlci5odG1sXG5cbi8vIFNldHRpbmcgc29tZSBkZWZhdWx0cyBmb3IgZWFjaCBzbGlkZXJcbmZ1bmN0aW9uIHVnX3NsaWRlckRlZmF1bHRzKCkge1xuXG4gICQoXCIudWcuc2xpZGVyXCIpLmVhY2goIGZ1bmN0aW9uKCkge1xuXG4gICAgJCh0aGlzKS5maW5kKFwiLnNsaWRlLXdyYXBwZXJcIikuZmluZChcIi5zbGlkZVwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuYXR0cihcInNsaWRlLXNob3duXCIsIFwiMFwiKTtcbiAgICAkKHRoaXMpLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQodGhpcykuZmluZChcIi5wcm9ncmVzcyBzcGFuLjBcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJCh0aGlzKS5maW5kKFwiLndyYXBwZXJcIikudmVsb2NpdHkoeyB0cmFuc2xhdGVYOiAwIH0pO1xuXG4gICAgdmFyIGFycm93cyA9ICQodGhpcykuZmluZChcIi5hcnJvd3NcIiksXG4gICAgICAgIHNsaWRlU2hvd24gPSAkKHRoaXMpLmF0dHIoXCJzbGlkZS1zaG93blwiKTtcblxuICAgIHVnX3NsaWRlckJ1dHRvblNldChhcnJvd3MsICQodGhpcykpO1xuXG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHVnX3NsaWRlckxheW91dCgpe1xuXG4gICQoXCIudWcuc2xpZGVyXCIpLmVhY2goIGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiXCIgKyBpbmRleCk7XG5cbiAgICB2YXIgc2VsZiA9ICQodGhpcyksXG4gICAgc2xpZGVXcmFwcGVyID0gc2VsZi5maW5kKFwiLnNsaWRlLXdyYXBwZXJcIiksXG4gICAgd3JhcHBlciA9IHNlbGYuZmluZChcIi53cmFwcGVyXCIpLFxuICAgIGFycm93cyA9IHNlbGYuZmluZChcIi5hcnJvd3NcIiksXG4gICAgc2xpZGVyTnVtYmVyID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpLnBvcCgpLFxuICAgIHNsaWRlcyA9ICQoXCIudWcuc2xpZGVyLlwiICsgc2xpZGVyTnVtYmVyICsgXCIgLnNsaWRlLXdyYXBwZXIgYVwiKSxcbiAgICBjb3VudCA9IHNsaWRlcy5sZW5ndGg7XG5cbiAgICBpZiggc2xpZGVzLnBhcmVudCgpLmlzKFwiLnNsaWRlXCIpICkge1xuXG4gICAgICBzbGlkZXMudW53cmFwKCk7XG5cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NCApIHtcbiAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNCkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTQgKSB7XG4gICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzQpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKCBtaW5XaWR0aCgxNDUwKSApIHtcblxuICAgICAgaWYoIHNsaWRlcy5wYXJlbnQoKS5pcyhcIi5zbGlkZVwiKSApIHtcbiAgICAgICAgc2xpZGVzLnVud3JhcCgpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTUgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrNSkud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSs9NSApIHtcbiAgICAgICAgICBzbGlkZXMuc2xpY2UoaSwgaSs1KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpZGVcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggbWluV2lkdGgoODAwKSAmJiBtYXhXaWR0aCgxMjAwKSApIHtcbiAgICAgIGlmKCBzbGlkZXMucGFyZW50KCkuaXMoXCIuc2xpZGVcIikgKSB7XG4gICAgICAgIHNsaWRlcy51bndyYXAoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKz0zICkge1xuICAgICAgICAgIHNsaWRlcy5zbGljZShpLCBpKzMpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJzbGlkZVwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrPTMgKSB7XG4gICAgICAgICAgc2xpZGVzLnNsaWNlKGksIGkrMykud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWRlXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggc2VsZi5maW5kKFwiLnByb2dyZXNzXCIpLmxlbmd0aCA+IDAgICkge1xuXG4gICAgICBzZWxmLmZpbmQoXCIucHJvZ3Jlc3Mgc3BhblwiKS5yZW1vdmUoKTtcblxuICAgICAgdmFyICBzbGlkZUNvdW50ID0gc2VsZi5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aDtcblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzbGlkZUNvdW50OyBpKysgKSB7XG4gICAgICAgICQoXCI8c3BhbiBjbGFzcz0nXCIgKyBpKyBcIic+PC9zcGFuPlwiKS5hcHBlbmRUbyhzZWxmLmZpbmQoXCIucHJvZ3Jlc3NcIikpO1xuICAgICAgfVxuXG4gICAgICAkKFwiLnVnLnNsaWRlciAucHJvZ3Jlc3Mgc3BhblwiKS5jbGljayggZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKSk7XG4gICAgICAgIHVnX3NsaWRlclNoaWZ0KCQodGhpcykpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAkKHRoaXMpLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgdWdfc2xpZGVyQnV0dG9uU2V0KGFycm93cywgJCh0aGlzKSk7XG5cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gdWdfc2xpZGVyU2hpZnQoYXJyb3cpe1xuXG4gIHNlbGYgPSBhcnJvdy5wYXJlbnRzKFwiLnVnLnNsaWRlclwiKSxcbiAgc2xpZGVXcmFwcGVyID0gc2VsZi5maW5kKFwiLnNsaWRlLXdyYXBwZXIgLndyYXBwZXJcIiksXG4gIGNvdW50ID0gc2VsZi5maW5kKFwiLnNsaWRlXCIpLmxlbmd0aCxcbiAgc2xpZGVBbW91bnQgPSAxMDAsXG4gIHNsaWRlU2hvd24gPSBwYXJzZUludChzZWxmLmF0dHIoXCJzbGlkZS1zaG93blwiKSksXG4gIGFycm93cyA9IHNlbGYuZmluZChcIi5hcnJvd3NcIiksXG4gIHByb2dyZXNzID0gc2VsZi5maW5kKFwiLnByb2dyZXNzXCIpLFxuICBjbGlja2VkQXJyb3cgPSBhcnJvdy5hdHRyKFwiY2xhc3NcIikuc3BsaXQoXCIgXCIpWzBdO1xuXG4gIGNvbnNvbGUubG9nKGFycm93KTtcblxuICBpZiggY2xpY2tlZEFycm93ID09PSBcIm5leHRcIiApe1xuXG4gICAgc2xpZGVTaG93bisrO1xuICAgIHNlbGYuYXR0ciggXCJzbGlkZS1zaG93blwiLCBzbGlkZVNob3duICk7XG5cbiAgICB2YXIgc2xpZGVUb3RhbCA9IHNsaWRlQW1vdW50ICogKHNsaWRlU2hvd24gKiAtMSk7XG5cblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH0gZWxzZSBpZiAoIGNsaWNrZWRBcnJvdyA9PT0gXCJwcmV2XCIpIHtcblxuICAgIHNsaWRlU2hvd24tLTtcbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgc2xpZGVTaG93biApO1xuXG4gICAgdmFyIHNsaWRlVG90YWwgPSBzbGlkZUFtb3VudCAqICggc2xpZGVTaG93biAqIC0xKTtcblxuICAgIHNsaWRlV3JhcHBlci52ZWxvY2l0eSh7IHRyYW5zbGF0ZVg6IHNsaWRlVG90YWwgKyBcIiVcIiB9LCB7IGR1cmF0aW9uOiAyNTAsIGRlbGF5OiAwIH0pO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBzZWxmLmF0dHIoIFwic2xpZGUtc2hvd25cIiwgY2xpY2tlZEFycm93ICk7XG5cbiAgICB2YXIgc2xpZGVUb3RhbCA9IHNsaWRlQW1vdW50ICogKCBjbGlja2VkQXJyb3cgKiAtMSApO1xuXG4gICAgc2xpZGVXcmFwcGVyLnZlbG9jaXR5KHsgdHJhbnNsYXRlWDogc2xpZGVUb3RhbCArIFwiJVwiIH0sIHsgZHVyYXRpb246IDI1MCwgZGVsYXk6IDAgfSk7XG5cbiAgfVxuXG4gIC8vIHByb2dyZXNzLmNoaWxkcmVuKFwiYVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgLy8gcHJvZ3Jlc3MuY2hpbGRyZW4oXCJhOm50aC1vZi10eXBlKFwiICsgKDEgKyBzbGlkZVNob3duKSArIFwiKVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICB1Z19zbGlkZXJCdXR0b25TZXQoYXJyb3dzLCBzZWxmKTtcblxufVxuXG5mdW5jdGlvbiB1Z19zbGlkZXJCdXR0b25TZXQoYXJyb3dzLCBzbGlkZXIpIHtcblxuICAgIHZhciBzbGlkZVNob3duID0gcGFyc2VJbnQoc2xpZGVyLmF0dHIoXCJzbGlkZS1zaG93blwiKSksXG4gICAgICAgIGNvdW50ID0gc2xpZGVyLmZpbmQoXCIuc2xpZGVcIikubGVuZ3RoO1xuXG4gICAgc2xpZGVyLmZpbmQoXCIucHJvZ3Jlc3Mgc3BhblwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICBzbGlkZXIuZmluZChcIi5wcm9ncmVzcyAuXCIgKyBzbGlkZVNob3duKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgIGlmKCBzbGlkZVNob3duID09PSAwICl7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbihcIi5wcmV2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9IGVsc2UgaWYgKCAoc2xpZGVTaG93biArIDEpID09PSBjb3VudCApIHtcblxuICAgICAgYXJyb3dzLmNoaWxkcmVuKFwiLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGFycm93cy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG5cbiAgICB9XG5cbn1cblxudWdfc2xpZGVyTGF5b3V0KCk7XG51Z19zbGlkZXJEZWZhdWx0cygpO1xuXG4kKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbigpIHtcbiAgdWdfc2xpZGVyTGF5b3V0KCk7XG59KTtcblxuJChcIi51Zy5zbGlkZXIgLmFycm93cyBhXCIpLmNsaWNrKCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB1Z19zbGlkZXJTaGlmdCgkKHRoaXMpKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
