'use strict';
// This app takes in user input and encodes it at various security levels.  A key is added.  The message can only be decoded by someone who holds the key.

//Variable declaration
var newUser; //For first time users
var password = document.getElementById('key');//Password for encrypting and decrypting messages
var message = document.getElementById('large_box'); //Message to be encrypted

//Helper functions

//Check localStorage for a returning user
function getUser(){
  if (localStorage.user){
    document.getElementById('alias').value = localStorage.user;
  }else{
  //If new visitor, display element for name.
    newUser = document.getElementById('welcome');
    //  Also, hide other elements
    newUser.setAttribute('class', 'active');
    newUser.addEventListener('submit', save);
    var main = document.getElementsByTagName('main')[0];
    main.style.display = 'none';
    newUser.style.display = 'block';
  }
  return localStorage.user;
}

function reuseKey(event) {
  password.value = event.target.value;
}

function keyListSave(password) {
  if (!password) {
    return;
  }
  var keyArray = [];
  if (localStorage[localStorage.user + 'keys']) {
    keyArray = localStorage[localStorage.user + 'keys'].split(',');
  }
  for (var i = 0; i < keyArray.length; i++) {
    if (keyArray[i] === password) {
      return;
    }
  }
  if (keyArray.length === 5) {
    keyArray = keyArray.slice(-4);
  }
  keyArray.push(password);
  localStorage[localStorage.user + 'keys'] = keyArray;
  var keySlot;
  for (var j = 0; j < keyArray.length; j++) {
    var key = j + 1;
    keySlot = document.getElementById('slot' + key);
    keySlot.value = keyArray[j];
    keySlot.innerHTML = '';
    keySlot.innerHTML = keyArray[j];
  }
}

//Function to save username
function save(e){
  event.preventDefault(); //Prevent reload
  localStorage.user = e.target.user.value; //Get user name
  //Hide user input box
  document.getElementById('welcome').setAttribute('class', 'inactive');
  var main = document.getElementsByTagName('main')[0];
  main.style.display = 'block';
  newUser.style.display = 'none';
  document.getElementById('alias').value = localStorage.user;
}

//Function to check which button was selected
function button(e){
  e.preventDefault();

  if (e.target.innerHTML === 'Destroy Message and Keys'){
    window.location.reload(true);

  } else if (e.target.innerHTML === 'Encrypt'){
    if (!checker()){
      alert('Please enter missing fields.');
      return;
    }
    var level = document.getElementById('difficulty').value;
    if (level === 'value1'){
      var output = confidentialEncrypt(localStorage.user + ' says: ' + message.value, password.value);
      document.getElementById('read_only_message').innerHTML = output;
    }else if (level === 'value2'){
      var output = secretEncrypt(localStorage.user + ' says: ' + message.value, password.value);
      document.getElementById('read_only_message').innerHTML = output;
    }else if (level === 'value3'){
      var output = topSecretEncrypt(localStorage.user + ' says: ' + message.value, password.value);
      document.getElementById('read_only_message').innerHTML = output;
    }else if (level === 'value4'){
      alert('NSA Encryption Detected.');
    }
    keyListSave(password.value);
  } else if (e.target.innerHTML === 'Decrypt'){
    if (!checker()){
      alert('Please enter missing fields.');
      return;
    }
    try {
      var level = document.getElementById('difficulty').value;
      if (level === 'value1'){
        var output = confidentialDecrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML = output;
      }else if (level === 'value2'){
        var output = secretDecrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML = output;
      }else if (level === 'value3'){
        var output = topSecretDecrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML = output;
      }else if (level === 'value4'){
        alert('NSA Encryption Detected.');
      }
    }
    catch (e) {
      var output = 'The input message is not encrypted, the cypher key used is invalid, and/or an incorrect encryption level was selected.'
      document.getElementById('read_only_message').innerHTML = output;
    }
  }
}

function checker(){
  if (!password.value) {
    return false;
  }
  if (!message.value) {
    return false;
  }
  return true;
}

function resetUser(e) {
  e.preventDefault();
  localStorage.removeItem('user');
  document.getElementById('username').value = '';
  getUser();
}

getUser();

//Adding event listeners on buttons
document.getElementById('encode').addEventListener('click', button);
document.getElementById('decode').addEventListener('click', button);
document.getElementById('clearbtn').addEventListener('click', button);
document.getElementById('clearLocal').addEventListener('click', resetUser);
document.getElementById('keylog').addEventListener('change', reuseKey);

//Copy button
var copybtn = document.getElementById('copylink');
copybtn.addEventListener('click', copy);

function copy() {
  //Create dummy element that isn't displayed
  var dummy = document.createElement('textarea');
  // Add it to the document
  document.body.appendChild(dummy);
  // Set its ID
  dummy.setAttribute('id', 'dummy_id');
  // output to dummy element textrea
  document.getElementById('dummy_id').value = 'Go to this website to decode this message: https://montgomeryrd.github.io/201-project/index.html \n\n' +
  'Use decryption key: ' + document.getElementById('key').value + '\n\n' +
  'Use Security level: ' + document.getElementById('difficulty').options[document.getElementById('difficulty').selectedIndex].text + '\n\n' +
  'Here is the message: ' + document.getElementById('read_only_message').value;
  // Select it
  dummy.select();
  // Copy its contents
  document.execCommand('copy');
  // Remove it as its not needed anymore
  document.body.removeChild(dummy);

  copyInfoToggle();
  window.setTimeout(copyInfoToggle, 350);
}

function copyInfoToggle(){
  var copiedtxt = document.getElementById('togglecopy');
  if(copybtn.getAttribute('class') === 'clicked_btn') {
    copybtn.setAttribute('class', 'unclicked_btn');
    copiedtxt.setAttribute('class', 'unclicked_btn');
    copybtn.setAttribute('src', './img/copy.png');
    copiedtxt.innerHTML = 'Copy';
  } else {
    copybtn.setAttribute('class', 'clicked_btn');
    copiedtxt.setAttribute('class', 'clicked_btn');
    copybtn.setAttribute('src', './img/copied.png');
    copiedtxt.innerHTML = 'Copied!';
  }
}
