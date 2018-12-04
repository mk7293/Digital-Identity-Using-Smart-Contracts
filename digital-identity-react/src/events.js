//  npm install aes256
import identity from "./identity";
import web3 from "./web3";

var aes256 = require("aes256");

export const saveProfile = async n => {
  const accounts = await web3.eth.getAccounts();

  // console.log("sdsd");
  // console.log(accounts[0]);

  var encrypt_name = aes256.encrypt(n.password, n.name);
  var encrypt_addr = aes256.encrypt(n.password, n.address);
  var encrypt_dob = aes256.encrypt(n.password, n.dob);
  var encrypt_phone = aes256.encrypt(n.password, n.phone);
  var encrypt_email = aes256.encrypt(n.password, n.email);
  var encrypt_ssn = aes256.encrypt(n.password, n.ssn);
  var encrypt_gender = aes256.encrypt(n.password, n.gender);

  // send the info to sol to store in the blockchain

  await identity.methods
    .saveProfile(
      encrypt_name,
      encrypt_addr,
      encrypt_dob,
      encrypt_phone,
      encrypt_email,
      encrypt_ssn,
      encrypt_gender,
      n.publicKey
    )
    .send({
      from: accounts[0],
      value: web3.utils.toWei("0.12", "ether")
    });
};

export const sendProfile = async n => {
  // const accounts = await web3.eth.getAccounts();
  //
  // const retrivedProfile = await identity.methods.getData1().call({
  //   from: accounts[0]
  // });
  //
  // retrivedProfile[0] = aes256.decrypt(n.sendPassword, retrivedProfile[0]);
  // retrivedProfile[1] = aes256.decrypt(n.sendPassword, retrivedProfile[1]);
  // retrivedProfile[2] = aes256.decrypt(n.sendPassword, retrivedProfile[2]);
};

export const viewProfile = async n => {
  const accounts = await web3.eth.getAccounts();

  const retrivedProfile = await identity.methods.getData().call({
    from: accounts[0]
  });

  retrivedProfile[0] = aes256.decrypt(n.viewPassword, retrivedProfile[0]);
  retrivedProfile[1] = aes256.decrypt(n.viewPassword, retrivedProfile[1]);
  retrivedProfile[2] = aes256.decrypt(n.viewPassword, retrivedProfile[2]);
  retrivedProfile[3] = aes256.decrypt(n.viewPassword, retrivedProfile[3]);
  retrivedProfile[4] = aes256.decrypt(n.viewPassword, retrivedProfile[4]);
  retrivedProfile[5] = aes256.decrypt(n.viewPassword, retrivedProfile[5]);
  retrivedProfile[6] = aes256.decrypt(n.viewPassword, retrivedProfile[6]);

  return retrivedProfile;

  // return ["ABC", "DFF"];
};

// function symmetricEncryption(key, data) {
//   return aes256.encrypt(key, data);
// }

// function symmetricDecryption(key, data) {
//   return aes256.decrypt(key, data);
// }
