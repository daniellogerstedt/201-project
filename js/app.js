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
  var keyObj = {
  };
  if (localStorage[localStorage.user + 'keys']) {
    keyObj = JSON.parse(localStorage[localStorage.user + 'keys']);
  }
  for (var i = 0; i < 5; i++) {
    if (keyObj['key' + i] === password) {
      return;
    }
  }
  if (keyObj.key4) {
    keyObj.key0 = keyObj.key1;
    keyObj.key1 = keyObj.key2;
    keyObj.key2 = keyObj.key3;
    keyObj.key3 = keyObj.key4;
    keyObj.key4 = password;
  } else {
    for (var k = 0; k < 5; k++) {
      if (!keyObj['key' + k]) {
        keyObj['key' + k] = password;
        break;
      }
    }
  }
  localStorage[localStorage.user + 'keys'] = JSON.stringify(keyObj);
  updateKeylist();
}

//Refreshes Keylist with values
function updateKeylist() {
  var keySlot;
  for (var d = 1; d < 6; d++) {
    keySlot = document.getElementById('slot' + d);
    keySlot.removeAttribute('value');
    keySlot.innerHTML = '';
    keySlot.innerHTML = 'Key Slot';
  }
  if (!localStorage[localStorage.user + 'keys']) return;
  var keysObj = JSON.parse(localStorage[localStorage.user + 'keys']);
  for (var j = 0; j < 5; j++) {
    var key = j + 1;
    keySlot = document.getElementById('slot' + key);
    if (keysObj['key' + j]) {
      keySlot.value = keysObj['key' + j];
      keySlot.innerHTML = '';
      keySlot.innerHTML = keysObj['key' + j];
    }
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
  updateKeylist();
}

//Function to check which button was selected
function button(e){
  e.preventDefault();
  var output;
  var level;
  if (e.target.innerHTML === 'Destroy Message'){
    window.location.reload(true);

  } else if (e.target.innerHTML === 'Encrypt'){
    if (!checker()){
      alert('Please enter missing fields.');
      return;
    }
    level = document.getElementById('difficulty').value;
    if (level === 'value1'){
      output = confidentialEncrypt(localStorage.user + ' says: ' + message.value, password.value);
      document.getElementById('read_only_message').innerHTML = output;
    }else if (level === 'value2'){
      output = secretEncrypt(localStorage.user + ' says: ' + message.value, password.value);
      document.getElementById('read_only_message').innerHTML = output;
    }else if (level === 'value3'){
      output = topSecretEncrypt(localStorage.user + ' says: ' + message.value, password.value);
      document.getElementById('read_only_message').innerHTML = output;
    }
    keyListSave(password.value);
  } else if (e.target.innerHTML === 'Decrypt'){
    if (!checker()){
      alert('Please enter missing fields.');
      return;
    }
    try {
      level = document.getElementById('difficulty').value;
      if (level === 'value1'){
        output = confidentialDecrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML = output;
      }else if (level === 'value2'){
        output = secretDecrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML = output;
      }else if (level === 'value3'){
        output = topSecretDecrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML = output;
      }
    }
    catch (e) {
      output = 'The input message is not encrypted, the cypher key used is invalid, and/or an incorrect encryption level was selected.';
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
  updateKeylist();
}

getUser();
updateKeylist();

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

//Copy Button Animation
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

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('instructions').className = 'slideDown';
  }, 2000);
}, false);
