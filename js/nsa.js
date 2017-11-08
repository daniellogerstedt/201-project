'use strict';

var toggle = document.getElementById('difficulty');
var overlay = document.getElementById('overlay');

toggle.addEventListener('change', function() {
  console.log('change:', this.value);
  if (this.value === 'value4') {
    overlay.setAttribute('class', 'active'); 
      overlay.style.display = 'block';
  }
});

overlay.addEventListener('click', function() {
  this.style.display = 'none';
});