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
function confidentialEncrypt(message, password) {
  var encryptionLevelOne = encode(message);
  return encode(encryptionLevelOne + password);
}


//decrypts input message using password from two levels of encoding
function confidentialDecrypt(message, password) {
  var decryptionLevelOne = decode(message);
  var encryptedPassword = decryptionLevelOne.slice(-password.length);
  console.log(encryptedPassword);
  if (encryptedPassword === password) {
    return decode(decryptionLevelOne.slice(0, -password.length));
  }
}

function secretEncrypt(message, password) {
  var confidentialMessage = confidentialEncrypt(message, password);
  var confidentialArray = confidentialMessage.split('');
  var secretArray = [];
  while (confidentialArray.length != 0) {
    secretArray.push(confidentialArray.pop());
  }
  return encode(secretArray.join(''));
}

function secretDecrypt(message, password) {
  var secretArray = decode(message).split('');
  var confidentialArray = [];
  while (secretArray.length != 0) {
    confidentialArray.push(secretArray.pop());
  }
  var decryptedMessage = confidentialDecrypt(confidentialArray.join(''), password);
  return decryptedMessage;
}

function topSecretEncrypt(message, password) {
  var secretString = secretEncrypt(message, password);
  var encryptionString = '';
  var topSecretString = '';
  var topSecretNumber;
  while (secretString.length >= 7) {
    topSecretNumber = Math.floor(Math.random() * (7 - 3) + 3);
    encryptionString = secretString.slice(-topSecretNumber);
    secretString = secretString.slice(0, -topSecretNumber);
    topSecretString += (encryptionString + topSecretNumber);
    if (secretString.length < 7) {
      topSecretString += (secretString + secretString.length);
      secretString = '';
    }
  }
  return encode(topSecretString);
}

function topSecretDecrypt(message, password) {
  var topSecretString = decode(message);
  var encryptionString = '';
  var secretString = '';
  var topSecretNumber;
  while (topSecretString.length != 0) {
    topSecretNumber = parseInt(topSecretString.slice(-1)) + 1;
    encryptionString = topSecretString.slice(-topSecretNumber);
    topSecretString = topSecretString.slice(0, -topSecretNumber);
    secretString += encryptionString.slice(0, -1);
  }
  return secretDecrypt(secretString, password);
}

// var testMessage = "12345678123456781234567812345678123";
// var testArray = testMessage.split('');
// var tempArray = [];
// var finalArray = [];
//
// function encrypt() {
//   while (testArray.length > 0) {
//     for (var i = 0; i < 8; i++) {
//       tempArray.push(testArray.pop())
//       if (testArray.length === 0) {
//         break;
//       }
//     }
//     finalArray.push(tempArray.join(''));
//   }
// }
