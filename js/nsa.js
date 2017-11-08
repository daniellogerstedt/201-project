'use strict';

var toggle = document.getElementById('difficulty');
var overlay = document.getElementById('overlay');
var timeoutVar;
var encrypt = document.getElementById('encode');
var decrypt = document.getElementById('decode');

//toggle.addEventListener('change', displayNSA);
encrypt.addEventListener('click', displayNSA);
decrypt.addEventListener('click', displayNSA);

function displayNSA() {
  console.log('change:', this.value);
  if (toggle.options[toggle.selectedIndex].value === 'value4' && document.getElementById('key').value && document.getElementById('large_box')) {
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
