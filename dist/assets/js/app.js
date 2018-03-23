/*
* Projet :
* Website : 
* Auteur : MrRayures - www.mr-rayures.com		
* Copyright (C) 2016
*/

/*  Breackpoint ------------------------------- */
// Use : if (window.innerWidth <= xsmall ) {}
var xsmall  = "450";
var small   = "767";
var medium  = "1024";
var large   = "1200";
var xlarge  = "1600";

/*  MObile detection ------------------------------- */
// if( isMobile.any() ) alert('Mobile');
// if( isMobile.iOS() ) alert('iOS');
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


// Viewport min width for mobile
if (screen.width < 600) {
  var mvp = document.getElementById('viewport');
  mvp.setAttribute('content','width=600, user-scalable=no');
}




(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');




$(window).resize(function() {});




/*
* Jquery Back Button
* 
*/

$(window).scroll(function() {

  if ($(this).scrollTop() >= 800 ) {
    $('.back-top').addClass('active');
  } else {
    $('.back-top').removeClass('active');
  }

});

/*
* Jquery Material Form
* A simple piece of code to reproduce the effects of Material Design
*/

var myField = $('.material-field input, .material-field textarea');

myField.each(function() {
  if( !$(this).val() == '' ) {
    $(this).parent().addClass('focus');
  }
});

myField.on('focusin', function(event) {
  if( $(this).val() == '') {
    $(this).parent().addClass('focus');
  }
});

myField.on('focusout', function(event) {
  if( $(this).val() == '') {
    $(this).parent().removeClass('focus');
  }
});

/*
* Jquery Off Canvas
* A simple piece of code to make your menu off canvas style
*/


var mobile_breakpoint = "767";
//if (window.innerWidth <= mobile_breakpoint ) {}


$(document).ready(function() {

  // Add overlay
  $('.off-canvas').parent().append('<div class="overlay"></div>');

  // Open (& close) off-canvas
  $('.off-canvas-btn').on('click', function(event) { 
    event.preventDefault(); 
    var window_width = window.innerWidth;
    var window_height = window.innerHeight;
    var menu_height = $('.off-canvas ul').height();
    var window_offset =  $(window).scrollTop();
    var direction = 'left';
    var direction = $(this).attr('data-direction');

    if($('.off-canvas').hasClass('opened')) {
      $('.off-canvas, .off-canvas-btn').removeClass('opened');
      $('.off-canvas').css({ 'height': 'auto', 'top': '0', 'overflow-y': 'none'});
      $('body').css({ 'width': 'auto', 'top': 'auto' }).removeClass('no-scroll move-left move-right');
      $('.overlay').fadeOut();
    } else {
      $('.off-canvas, .off-canvas-btn').addClass('opened');
      $('.off-canvas').css({ 'height' : window_height, 'top' : window_offset });
      if(menu_height > window_height) {
        $('.off-canvas').css({ 'overflow-y': 'scroll'});
      }
      $('body').css({ 'width': window_width, 'top': -window_offset }).addClass('no-scroll move-'+direction+'');
      $('.overlay').fadeIn('fast');
    }

  });
  
  // Close off-canvas
  $('.overlay, .close-canvas').on('click', function(event) {
    event.preventDefault(); 
    var window_width = window.innerWidth;
    var window_height = window.innerHeight;
    var menu_height = $('.off-canvas ul').height();
    var window_offset =  $(window).scrollTop();
    var direction = 'left';
    var direction = $(this).attr('data-direction');

    $('.off-canvas, .off-canvas-btn').removeClass('opened');
    $('.off-canvas').css({ 'height': 'auto', 'top': '0', 'overflow-y': 'none'});
    $('body').css({ 'width': 'auto', 'top': 'auto' }).removeClass('no-scroll move-left move-right');
    $('.overlay').fadeOut();
    //$(window).scrollTop( Math.abs(window_offset.top) );
  });


});



$(window).resize(function() {
 

});

/*
* Jquery Smooth Scroll
* 
*/


$(document).ready(function() {

  /* SMOOTH SCROLLING ------------------------------- */
  $('.smooth-scroll').bind('click',function(event){

    var $anchor = $(this);
    var speed  = 1500;
    var offset = 50; 
    var easing = 'swing'; 
    $d = $('html,body');
    $w = $(window);

    targetPos =  Math.abs( $($anchor.attr('href')).offset().top );
    distance = Math.abs( $w.scrollTop() - targetPos );
    duration = ( distance / speed ) * 1000;
    //console.log(targetPos);
    $d.animate({
      scrollTop: targetPos - offset
    }, duration, easing);
    event.preventDefault();
  });


});
