'use strict';

var toggle = document.getElementById('difficulty');
var overlay = document.getElementById('overlay');
var timeoutVar;

toggle.addEventListener('change', displayNSA);

function displayNSA() {
  console.log('change:', this.value);
  if (this.value === 'value4') {
    overlay.setAttribute('class', 'active');
    document.getElementsByTagName('main')[0].style.display = 'none';
    document.getElementsByTagName('header')[0].style.display = 'none';
    document.getElementsByTagName('footer')[0].style.display = 'none';
    overlay.style.display = 'block';
    timeoutVar = window.setTimeout(displayPage, 10000);
  }
}

overlay.addEventListener('click', displayPage);
function displayPage() {

  document.getElementsByTagName('main')[0].style.display = 'block';
  document.getElementsByTagName('header')[0].style.display = 'block';
  document.getElementsByTagName('footer')[0].style.display = 'block';
  overlay.style.display = 'none';
  clearTimeout(timeoutVar);
}
