'use strict';
// This app takes in user input and encodes it at various security levels.  A key is added.  The message can only be decoded by someone who holds the key.

//Variable declaration
var newUser; //For first time users
var password=document.getElementById('key');//Password for encrypting and decrypting messages
var message=document.getElementById('large_box'); //Message to be encrypted

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

  if (e.target.innerHTML==='Destroy Message'){
    message.value='';
    password.value='';

  } else if (e.target.innerHTML==='Encrypt'){
    if (!checker()){
      alert('Please enter missing fields.');
      return;
      }
      var level = document.getElementById('difficulty').value;
      if (level==='value1'){
        var output = confidentialEncrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML=output;
      }else if (level==='value2'){
        var output = secretEncrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML=output;
      }else if (level==='value3'){
        var output = topSecretEncrypt(message.value, password.value);
        document.getElementById('read_only_message').innerHTML=output;
      }else if (level==='value4'){
        alert('NSA Encryption Detected.');
      }

  } else if (e.target.innerHTML==='Decrypt'){
    if (!checker()){
      alert('Please enter missing fields.');
      return;
      }
      var level = document.getElementById('difficulty').value;
    if (level==='value1'){
      var output = confidentialDecrypt(message.value, password.value);
      document.getElementById('read_only_message').innerHTML=output;
    }else if (level==='value2'){
      var output = secretDecrypt(message.value, password.value);
      document.getElementById('read_only_message').innerHTML=output;
    }else if (level==='value3'){
      var output = topSecretDecrypt(message.value, password.value);
      document.getElementById('read_only_message').innerHTML=output;
    }else if (level==='value4'){
      alert('NSA Encryption Detected.');
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

getUser();

//Adding event listeners on buttons
document.getElementById('encode').addEventListener('click', button);
document.getElementById('decode').addEventListener('click', button);
document.getElementById('clearbtn').addEventListener('click', button);
