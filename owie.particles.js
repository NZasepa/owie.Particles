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

      function OwieParticles(elements, settings) {
        var _this = this;

        // Default options
        _this.defaults = {
          selector: 'img.owie-particles',
          wrapperElement: 'div',
          wrapperClasses: [],
          wrapperScaleX: 1.3,
          wrapperScaleY: 1.3,
          wrapperScaleZ: 1.8,
          particles: 100,
          particlesElement: 'div',
          particlesClasses: [],
          particlesMinWidth: 10,
          particlesMaxWidth: 80,
          particlesMinHeight: 10,
          particlesMaxHeight: 80,
          particlesMinRotateY: 2,
          particlesMaxRotateY: 2,
          particlesMinRotateX: 2,
          particlesMaxRotateX: 2,
          imageBoundaries: 100,
          perspective: '100px'
        };

        // Initial settings
        _this.initials = {

        };

        // Extend library with initial settings
        Object.assign(_this, _this.initials);

        // General library options
        _this.elements = elements;

        // Options object
        _this.options = Object.assign({}, _this.defaults, settings);

        // Increase instance id
        _this.instanceUid = instanceUid += 1;

        // Init images
        if (!elements || elements instanceof NodeList) {
          var images = elements;

          if (!images) {
            images = document.querySelectorAll(_this.options.selector);
            _this.element = images;
          }

          if (images.length) {
            for (var imageIndex = 0; imageIndex < images.length; imageIndex += 1) {
              _this.init(images[imageIndex]);
            }
          }
        } else {
          _this.init(elements);
        }
      }

      return OwieParticles;
    }());

    OwieParticles.prototype.wrapImage = function(imageElement) {
      var _this = this;
      var clonedImageElement = imageElement.cloneNode(true);
      var wrapperElement = document.createElement(_this.options.wrapperElement);

      // Add wrapper classes
      wrapperElement.classList.add('owie-particles-wrapper');

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

      // Add particles wrapper
      _this.initParticlesWrapper(wrapperElement.querySelector('img'));
    };

    OwieParticles.prototype.initParticlesWrapper = function(imageElement) {
      var _this = this;
      var imageElementParent = imageElement.parentNode;
      var particlesWrapperElement = document.createElement('div');

      // Add particles wrapper classes
      particlesWrapperElement.classList.add('owie-particles-list');

      // Add perspective for 3D effects
      particlesWrapperElement.style.webkitPerspective = _this.options.perspective;
      particlesWrapperElement.style.perspective = _this.options.perspective;
      particlesWrapperElement.style.webkitTransform = 'scale3d(' + _this.options.wrapperScaleX + ', ' + _this.options.wrapperScaleY + ', ' + _this.options.wrapperScaleZ + ')';
      particlesWrapperElement.style.transform = 'scale3d(' + _this.options.wrapperScaleX + ', ' + _this.options.wrapperScaleY + ', ' + _this.options.wrapperScaleZ + ')';

      // Append particles list to the wrapper
      imageElementParent.appendChild(particlesWrapperElement);

      // Generate particles
      _this.initParticles(imageElement);
      console.log('generate');
    };

    OwieParticles.prototype.initParticles = function(imageElement) {
      var _this = this;
      var imageElementWidth = imageElement.offsetWidth;
      var imageElementHeight = imageElement.offsetHeight;
      var imageElementParent = imageElement.parentNode;
      var particlesWrapperElement = imageElementParent.querySelector('.owie-particles-list');
      var particlesAmount = _this.options.particles;

      for (var particlesIndex = 0; particlesIndex < particlesAmount; particlesIndex += 1) {
        var particleElement = document.createElement(_this.options.particlesElement);

        // Add classes to particle
        particleElement.classList.add('owie-particle');

        // Add options classes
        if (_this.options.particlesClasses.length) {
          for (var classIndex = 0; classIndex < _this.options.particlesClasses.length; classIndex += 1) {
            particleElement.classList.add(_this.options.particlesClasses[classIndex]);
          }
        }

        // Particle properties
        var particleWidth = Math.floor(Math.random() * _this.options.particlesMaxWidth) + _this.options.particlesMinWidth;
        var particleHeight = Math.floor(Math.random() * _this.options.particlesMaxHeight) + _this.options.particlesMinHeight;
        var particlePositionLeft = Math.random() * imageElementWidth;
        var particlePositionTop = Math.random() * imageElementHeight;
        var particleOpacity = Math.random();
        var particleRotateX = Math.floor(Math.random() * (_this.options.particlesMaxRotateX + 1)) - _this.options.particlesMinRotateX;
        var particleRotateY = Math.floor(Math.random() * (_this.options.particlesMaxRotateY + 1)) - _this.options.particlesMinRotateY;

        // Avoid almost invisible particles
        particleOpacity = (particleOpacity < 0.4) ? particleOpacity += 0.4 : particleOpacity;

        // Avoid placing particle outside of the boundaries
        if (imageElementWidth < (particlePositionLeft + particleWidth)) {
          particlePositionLeft -= particleWidth;
        }
        // Avoid placing particle outside of the boundaries
        if (imageElementHeight < (particlePositionTop + particleHeight)) {
          particlePositionTop -= particleHeight;
        }

        // Set particle properties
        Object.assign(particleElement.style, {
          position: 'absolute',
          left: particlePositionLeft + 'px',
          top: particlePositionTop + 'px',
          width: particleWidth + 'px',
          height: particleHeight + 'px',
          backgroundImage: 'url(' + imageElement.src + ')',
          backgroundPositionX: '-' + particlePositionLeft + 'px',
          backgroundPositionY: '-' + particlePositionTop + 'px',
          backgroundSize: imageElementWidth + 'px',
          transform: 'rotateX(' + particleRotateX + 'deg) rotateY(' + particleRotateY + 'deg)',
          opacity: particleOpacity,
          boxShadow: '10px 5px 10px rgba(0,0,0,0.5)'
        });


        // Append particle
        particlesWrapperElement.appendChild(particleElement);
      }
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