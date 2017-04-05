/**
 * Created by Natan on 03.04.2017.
 */
(function() {
  function initOwieParticles() {
    var element = document.querySelector('img.main-image');
    var owieParticles = new OwieParticles(element);
  }

  window.addEventListener('load', initOwieParticles);
}());
