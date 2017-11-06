'use strict';
// This app takes in user input and encodes it at various security levels.  A key is added.  The message can only be decoded by someone who holds the key.

//Variable declaration
var user;  //Check for returning users
var newUser; //For first time users

//Helper functions



//Check localStorage for a returning user
function getUser(){
  if (localStorage.user){
    user = localStorage.user;
    document.getElementById('alias').value=user;
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

  return user;
}

//Function to check for input
function save(e){
  event.preventDefault(); //Prevent reload
  user = e.target.user.value; //Get user name
  localStorage.user = user;  //Store in localStorage
  //Hide user input box
  document.getElementById('welcome').setAttribute('class', 'inactive');
  var main = document.getElementsByTagName('main')[0];
  main.style.display = 'block';
  newUser.style.display = 'none';    document.getElementById('alias').value=user;
}

getUser();
