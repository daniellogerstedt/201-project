'use strict';

// encodes input into Base64
function encode(input) {
  return btoa(input);
}

// decodes input from Base64
function decode(input) {
  return atob(input);
}

// adds spaces to messages post encryption for aesthetics

function spacify(message) {
  var messageToSpacify = message;
  var currentSpacePosition = 0;
  while (currentSpacePosition < messageToSpacify.length - 8) {
    currentSpacePosition = currentSpacePosition + Math.floor(Math.random() * (8 - 2) + 2);
    messageToSpacify = messageToSpacify.slice(0, currentSpacePosition) + ' ' + messageToSpacify.slice(currentSpacePosition, messageToSpacify.length);
    currentSpacePosition++;
  }
  return messageToSpacify;
}

// removes spaces from message for decryption

function despacify(message) {
  var despacifiedMessage = message.split(' ').join('');
  return despacifiedMessage;
}

// encrypts input message using password with two levels of encoding
function confidentialEncrypt(message, password) {
  var encryptionLevelOne = encode(message);
  return spacify(encode(encryptionLevelOne + password));
}

// decrypts input message using password from two levels of encoding
function confidentialDecrypt(message, password) {
  var decryptionLevelOne = decode(despacify(message));
  var encryptedPassword = decryptionLevelOne.slice(-password.length);
  console.log(encryptedPassword);
  if (encryptedPassword === password) {
    return decode(decryptionLevelOne.slice(0, -password.length));
  }
}

// encrypts using previous level encryption function, reverses string then encodes again.

function secretEncrypt(message, password) {
  var confidentialMessage = despacify(confidentialEncrypt(message, password));
  var confidentialArray = confidentialMessage.split('');
  var secretArray = [];
  while (confidentialArray.length != 0) {
    secretArray.push(confidentialArray.pop());
  }
  return spacify(encode(secretArray.join('')));
}

// decrypts through decoding, reversing then running previous level decryption.

function secretDecrypt(message, password) {
  var secretArray = decode(despacify(message)).split('');
  var confidentialArray = [];
  while (secretArray.length != 0) {
    confidentialArray.push(secretArray.pop());
  }
  var decryptedMessage = confidentialDecrypt(confidentialArray.join(''), password);
  return decryptedMessage;
}

// encrypts using previous level then divides chunks of random lengths from the string placing them into a new string before encoding.

function topSecretEncrypt(message, password) {
  var secretString = despacify(secretEncrypt(message, password));
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
  return spacify(encode(topSecretString));
}

// decodes and moves random lengthed chunks back into correct places then decrypts previous levels

function topSecretDecrypt(message, password) {
  var topSecretString = decode(despacify(message));
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
