// Trigger CSS animations on scroll.
// Detailed explanation can be found at http://www.bram.us/2013/11/20/scroll-animations/

jQuery(function($) {
  
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {
    
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');
    
    // Unbind scroll handler if we have no animatables
    if ($animatables.size() == 0) {
      $(window).off('scroll', doAnimations);
    }
    
    // Check all animatables and animate them if necessary
		$animatables.each(function(i) {
       var $animatable = $(this);
			if (($animatable.offset().top + $animatable.height() - 20) < offset) {
        $animatable.removeClass('animatable').addClass('animated');
			}
    });

	};
  
  // Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);
  $(window).trigger('scroll');

});




/* ---- particles.js config ---- */
//Credit: Vincent Garreau, http://vincentgarreau.com/particles.js/
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "image",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 0
      },
      "image": {
        "src": "img/code-logo.png",
        "width": 300,
        "height": 300
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 6,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});



//to top appear animation

$(document).ready(function () {
  // Show or hide the sticky back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#go-top').fadeIn(200);
    } else {
      $('#go-top').fadeOut(200);
    }
  });




  /* ---- Bar Graph Animation ---- */
  //Inspired by alex rodrigues, https://codepen.io/alex_rodrigues/pen/ogYZdr - and - Daniel Tonon, https://stackoverflow.com/questions/21561480/trigger-event-when-user-scroll-to-specific-element-with-jquery

  var element_position = $('#bargraphs').offset().top,
      screen_height = $(window).height(),
      activation_offset = 0.5, //determines how far up the the page the element needs to be before triggering the function
      activation_point = element_position - (screen_height * activation_offset),
      max_scroll_height = $('body').height() - screen_height - 5; //-5 for a little bit of buffer

  //Does something when user scrolls to it OR
  //Does it when user has reached the bottom of the page and hasn't triggered the function yet
  $(window).on('scroll', function () {
    var y_scroll_pos = window.pageYOffset,

    element_in_view = y_scroll_pos > activation_point,
    has_reached_bottom_of_page = max_scroll_height <= y_scroll_pos && !element_in_view;

    if (element_in_view || has_reached_bottom_of_page) {

      setTimeout(function start() {

        $('.bar').each(function (i) {
          var $bar = $(this);
          $(this).append('<span class="count"></span>')
          setTimeout(function () {
            $bar.css('width', $bar.attr('data-percent'));
          }, i * 100);
        });

        $('.count').each(function () {
          $(this).prop('Counter', 0).animate({
            Counter: $(this).parent('.bar').attr('data-percent')
          }, {
            duration: 1500,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now) + '%');
            }
          });
        });

      })

      $(window).off('scroll')
    }
  });


});








//google maps
function initMap() {
  var uluru = {
    lat: 33.761022,
    lng: -118.152724
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru,
    disableDefaultUI: true,
    zoomControl: true,
    //  mapTypeControl: true,
    scaleControl: true,
    //  streetViewControl: true,
    rotateControl: true,
    //  fullscreenControl: true,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#041a25"
            }
        ]
    },
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "gamma": 0.01
            },
          {
            "lightness": 20
            }
        ]
    },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "saturation": -31
            },
          {
            "lightness": -33
            },
          {
            "weight": 2
            },
          {
            "gamma": 0.8
            }
        ]
    },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
            }
        ]
    },
      {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
          {
            "color": "#898989"
            },
          {
            "visibility": "simplified"
            }
        ]
    },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#220606"
            }
        ]
    },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "off"
            }
        ]
    },
      {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ff0000"
            }
        ]
    },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ff0000"
            }
        ]
    },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
            },
          {
            "color": "#00a8ff"
            }
        ]
    },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": 30
            },
          {
            "saturation": 30
            },
          {
            "visibility": "simplified"
            }
        ]
    },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1c3a4a"
            }
        ]
    },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#193849"
            }
        ]
    },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
          {
            "color": "#ff0000"
            }
        ]
    },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ff0000"
            }
        ]
    },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#05aaff"
            }
        ]
    },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
          {
            "color": "#ff0000"
            }
        ]
    },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ff0000"
            }
        ]
    },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "saturation": 20
            }
        ]
    },
      {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#193849"
            }
        ]
    },
      {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": 20
            },
          {
            "saturation": -20
            },
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "off"
            }
        ]
    },
      {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.school",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
            },
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#335263"
            }
        ]
    },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
            }
        ]
    },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": 10
            },
          {
            "saturation": -30
            },
          {
            "visibility": "on"
            },
          {
            "color": "#0c2d37"
            }
        ]
    },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "saturation": 25
            },
          {
            "lightness": 25
            }
        ]
    },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "simplified"
            },
          {
            "color": "#51626a"
            }
        ]
    },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#041a25"
            }
        ]
    }
]
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: 'https://coderjones.com/img/blue-dot.png'
  });

}

 


//Google Analytics

      (function(b, o, i, l, e, r) {
        b.GoogleAnalyticsObject = l;
        b[l] || (b[l] =
          function() {
            (b[l].q = b[l].q || []).push(arguments)
          });
        b[l].l = +new Date;
        e = o.createElement(i);
        r = o.getElementsByTagName(i)[0];
        e.src = 'https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e, r)
      }(window, document, 'script', 'ga'));
      ga('create', 'UA-105665758-1', 'auto');
      ga('send', 'pageview');
