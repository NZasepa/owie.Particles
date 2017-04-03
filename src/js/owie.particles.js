(function() {
  'use strict';
  // Object assign polyfill
  if (typeof Object.assign !== 'function') {
    Object.assign = function(target, varArgs) {
      if (target === null) {
        throw new Error('Cannot convert null to an object');
      }

      // Target object
      var to = Object(target);

      // Assign arguments into a new object
      for (var i = 1; i < arguments.length; i += 1) {
        var nextSource = arguments[i];

        if (nextSource !== null) { // Skip null and undefined
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    };
  }

  function define() {
    var OwieParticles = {};

    OwieParticles = (function() {
      var instanceUid = 0;

      function OwieParticles(settings) {
        var _this = this;

        // Default options
        _this.defaults = {
          selector: 'img.owie-particles',
          wrapperElement: 'div',
          wrapperClasses: []
        };

        // Initial settings
        _this.initials = {

        };

        // Extend library with initial settings
        Object.assign(_this, _this.initials);

        // Options object
        _this.options = Object.assign({}, _this.defaults, settings);

        // Increase instance id
        _this.instanceUid = instanceUid += 1;

        // Init images
        var images = document.querySelectorAll(_this.options.selector);

        if (images.length) {
          for (var imageIndex = 0; imageIndex < images.length; imageIndex += 1) {
            _this.init(images[imageIndex]);
          }
        }
      }

      return OwieParticles;
    }());

    OwieParticles.prototype.wrapImage = function(imageElement) {
      var _this = this;
      var clonedImageElement = imageElement.cloneNode(true);
      var wrapperElement = document.createElement(_this.options.wrapperElement);

      // Add wrapper classes
      wrapperElement.classList.add('owie-properties-wrapper');

      // Add options classes
      if (_this.options.wrapperClasses.length) {
        for (var classIndex = 0; classIndex < _this.options.wrapperClasses.length; classIndex += 1) {
          wrapperElement.classList.add(_this.options.wrapperClasses[classIndex]);
        }
      }

      // Add cloned image to the new element
      wrapperElement.appendChild(clonedImageElement);

      // Insert before an image
      imageElement.parentNode.insertBefore(wrapperElement, imageElement);
      imageElement.parentNode.removeChild(imageElement);
    };

    OwieParticles.prototype.init = function(imageElement) {
      var _this = this;

      // Check if image is loaded
      if (imageElement.complete) {
        _this.wrapImage(imageElement);
      } else { // Add an event if it's not
        imageElement.addEventListener('load', OwieParticles.prototype.wrapImage.call(_this, imageElement));
      }
    };

    return OwieParticles;
  }

  // Check whether library is already defined or not
  if (typeof OwieParticles === 'undefined') {
    window.OwieParticles = define();
  } else {
    throw new Error('owie.Particles library already defined');
  }
}());