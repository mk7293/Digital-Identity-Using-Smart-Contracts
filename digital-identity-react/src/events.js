//  npm install aes256
import identity from "./identity";
import web3 from "./web3";

var aes256 = require("aes256");

export const saveProfile = async n => {
  const accounts = await web3.eth.getAccounts();

  console.log("sdsd");
  console.log(accounts[0]);

  var encrpt_name = aes256.encrypt(n.password, n.name);
  var encrpt_addr = aes256.encrypt(n.password, n.address);
  var encrpt_dob = aes256.encrypt(n.password, n.dob);
  var encrpt_phone = aes256.encrypt(n.password, n.phone);
  var encrpt_email = aes256.encrypt(n.password, n.email);

  // send the info to sol to store in the blockchain

  await identity.methods
    .saveProfile(
      encrpt_name,
      encrpt_addr,
      encrpt_dob,
      encrpt_phone,
      encrpt_email
    )
    .send({
      from: accounts[0],
      value: web3.utils.toWei("0.12", "ether")
    });
};

export const sendProfile = n => {};

export const viewProfile = n => {
  alert("decrypt");
  alert(aes256.decrypt(n.password, "Yb3KxMth/nd3SD5DiksG5z9j"));
};

// function symmetricEncryption(key, data) {
//   return aes256.encrypt(key, data);
// }

// function symmetricDecryption(key, data) {
//   return aes256.decrypt(key, data);
// }
