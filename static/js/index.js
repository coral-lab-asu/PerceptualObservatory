window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
    bulmaCarousel.attach('.sample-carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    });

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    var revealTargets = document.querySelectorAll('.section, .hero-landing, .footer');
    revealTargets.forEach(function(target) {
      target.classList.add('reveal');
    });

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealTargets.forEach(function(target) {
        revealObserver.observe(target);
      });
    } else {
      revealTargets.forEach(function(target) {
        target.classList.add('is-visible');
      });
    }

    window.addEventListener('load', function() {
      document.body.classList.add('is-loaded');
      document.body.classList.remove('loading');
    });

    var bibtexButton = document.getElementById('bibtex-copy-button');
    var bibtexCode = document.getElementById('bibtex-code');
    var bibtexStatus = document.getElementById('bibtex-copy-status');
    if (bibtexButton && bibtexCode) {
      var copyLabel = bibtexButton.querySelector('span:last-child');
      var resetTimer = null;
      bibtexButton.addEventListener('click', function() {
        var textToCopy = bibtexCode.innerText.trim();
        var onSuccess = function() {
          if (bibtexStatus) {
            bibtexStatus.textContent = 'Copied!';
          }
          if (copyLabel) {
            copyLabel.textContent = 'Copied';
          }
          if (resetTimer) {
            clearTimeout(resetTimer);
          }
          resetTimer = setTimeout(function() {
            if (bibtexStatus) {
              bibtexStatus.textContent = '';
            }
            if (copyLabel) {
              copyLabel.textContent = 'Copy BibTeX';
            }
          }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(onSuccess);
        } else {
          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(bibtexCode);
          selection.removeAllRanges();
          selection.addRange(range);
          try {
            document.execCommand('copy');
            onSuccess();
          } catch (err) {
            if (bibtexStatus) {
              bibtexStatus.textContent = 'Copy failed';
            }
          }
          selection.removeAllRanges();
        }
      });
    }

})
