'use strict';

// encodes input into Base64
function encode(input) {
  return btoa(input);
}

//decodes input from Base64
function decode(input) {
  return atob(input);
}

//encrypts input message using password with two levels of encoding
function encrypt(message, password) {
  var encryptionLevelOne = encode(message);
  return encode(encryptionLevelOne + password);
}


//decrypts input message using password from two levels of encoding
function decrypt(message, password) {
  var decryptionLevelOne = decode(message);
  var encryptedPassword = decryptionLevelOne.slice(-password.length);
  console.log(encryptedPassword);
  if (encryptedPassword === password) {
    decode(decryptionLevelOne.slice(0, -password.length));
  }
}
