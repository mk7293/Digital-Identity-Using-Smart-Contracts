//  npm install aes256
var aes256 = require("aes256");

export const saveProfile = n => {
  var encrpt_name = aes256.encrypt(n.password, n.name);
  var encrpt_addr = aes256.encrypt(n.password, n.address);
  var encrpt_dob = aes256.encrypt(n.password, n.dob);
  var encrpt_phone = aes256.encrypt(n.password, n.phone);
  var encrpt_email = aes256.encrypt(n.password, n.email);

  // send the info to sol to store in the blockchain
};

export const sendProfile = n => {};

export const viewProfile = n => {};

// function symmetricEncryption(key, data) {
//   return aes256.encrypt(key, data);
// }

function symmetricDecryption(key, data) {
  return aes256.decrypt(key, data);
}
