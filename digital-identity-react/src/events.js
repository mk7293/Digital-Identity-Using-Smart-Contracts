//  npm install aes256
import identity from "./identity";
import web3 from "./web3";

var aes256 = require("aes256");

export const saveProfile = async n => {
  const accounts = await web3.eth.getAccounts();

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
  const accounts = await web3.eth.getAccounts();

  var sendName = "";
  var sendAddress = "";
  var dob = "";
  var phone = "";
  var email = "";
  var ssn = "";
  var gender = "";
  var uniqueKey = "hello";

  // var crypt = Crypt();

  const receipientPublicKey = await identity.methods
    .getPublicKey(n.receipientAddress)
    .call({
      from: accounts[0]
    });

  console.log(receipientPublicKey);

  const retrivedProfile = await identity.methods.getData().call({
    from: accounts[0]
  });

  retrivedProfile[0] = aes256.decrypt(n.sendPassword, retrivedProfile[0]);
  retrivedProfile[1] = aes256.decrypt(n.sendPassword, retrivedProfile[1]);
  retrivedProfile[2] = aes256.decrypt(n.sendPassword, retrivedProfile[2]);
  retrivedProfile[3] = aes256.decrypt(n.sendPassword, retrivedProfile[3]);
  retrivedProfile[4] = aes256.decrypt(n.sendPassword, retrivedProfile[4]);
  retrivedProfile[5] = aes256.decrypt(n.sendPassword, retrivedProfile[5]);
  retrivedProfile[6] = aes256.decrypt(n.sendPassword, retrivedProfile[6]);

  if (n.isName) {
    sendName = aes256.encrypt(uniqueKey, retrivedProfile[0]);
  }
  if (n.isAddress) {
    sendAddress = aes256.encrypt(uniqueKey, retrivedProfile[1]);
  }
  if (n.isDOB) {
    dob = aes256.encrypt(uniqueKey, retrivedProfile[2]);
  }
  if (n.isPhone) {
    phone = aes256.encrypt(uniqueKey, retrivedProfile[3]);
  }
  if (n.isEmail) {
    email = aes256.encrypt(uniqueKey, retrivedProfile[4]);
  }
  if (n.ssn) {
    ssn = aes256.encrypt(uniqueKey, retrivedProfile[5]);
  }
  if (n.isGender) {
    gender = aes256.encrypt(uniqueKey, retrivedProfile[6]);
  }

  // var randomKey = crypt.encrypt(receipientPublicKey, uniqueKey);

  await identity.methods
    .uploadData(
      sendName,
      sendAddress,
      dob,
      phone,
      email,
      ssn,
      gender,
      n.receipientAddress
    )
    .send({
      from: accounts[0],
      value: web3.utils.toWei("0.12", "ether")
    });
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
};

export const viewReceivedProfile = async n => {
  const accounts = await web3.eth.getAccounts();

  var key = "hello";
  const retriveReceivedProfile = await identity.methods
    .getOthersData(n.senderAddress)
    .call({
      from: accounts[0]
    });

  if (retriveReceivedProfile[0] !== "") {
    retriveReceivedProfile[0] = aes256.decrypt(key, retriveReceivedProfile[0]);
  }
  if (retriveReceivedProfile[1] !== "")
    retriveReceivedProfile[1] = aes256.decrypt(key, retriveReceivedProfile[1]);
  if (retriveReceivedProfile[2] !== "")
    retriveReceivedProfile[2] = aes256.decrypt(key, retriveReceivedProfile[2]);
  if (retriveReceivedProfile[3] !== "")
    retriveReceivedProfile[3] = aes256.decrypt(key, retriveReceivedProfile[3]);
  if (retriveReceivedProfile[4] !== "")
    retriveReceivedProfile[4] = aes256.decrypt(key, retriveReceivedProfile[4]);
  if (retriveReceivedProfile[5] !== "")
    retriveReceivedProfile[5] = aes256.decrypt(key, retriveReceivedProfile[5]);
  if (retriveReceivedProfile[6] !== "")
    retriveReceivedProfile[6] = aes256.decrypt(key, retriveReceivedProfile[6]);

  return retriveReceivedProfile;
};
