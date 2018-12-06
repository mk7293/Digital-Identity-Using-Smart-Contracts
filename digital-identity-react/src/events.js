//  npm install aes256
import identity from "./identity";
import web3 from "./web3";
var Crypt = require("hybrid-crypto-js").Crypt;
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

  crypt = Crypt();

  var sendName = "";
  var sendAddress = "";
  var dob = "";
  var phone = "";
  var email = "";
  var ssn = "";
  var gender = "";
  var uniqueKey = n.sendPassword;

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
    sendName = crypt.encrypt(uniqueKey, retrivedProfile[0]);
  }
  if (n.isAddress) {
    sendAddress = crypt.encrypt(uniqueKey, retrivedProfile[1]);
  }
  if (n.isDOB) {
    dob = crypt.encrypt(uniqueKey, retrivedProfile[2]);
  }
  if (n.isPhone) {
    phone = crypt.encrypt(uniqueKey, retrivedProfile[3]);
  }
  if (n.isEmail) {
    email = crypt.encrypt(uniqueKey, retrivedProfile[4]);
  }
  if (n.ssn) {
    ssn = crypt.encrypt(uniqueKey, retrivedProfile[5]);
  }
  if (n.isGender) {
    gender = crypt.encrypt(uniqueKey, retrivedProfile[6]);
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
  //   var pk =
  //     "-----BEGIN RSA PRIVATE KEY-----\
  // MIIJKgIBAAKCAgEAikti5r1l8iEE/SAIM/Yp4Vf5gU0Qz+iQImjyfsYXg3rdtZas\
  // hd2pTN9IGMBqRJ9TIIrC/ZyTm6ua8hxEkDfoWchD+RsYdoUhmISSAxHHF+TvPz70\
  // ZOC39MDu34se9UVKSDEwRFxcKuGbsel/zMogDWqHTuF37JQ0HuV6/EwWZDRo+VED\
  // JWStRbuYNjti76eVlzvuIE30V/zuFvpsvaSQ8oCxQ7E0s7ryx0lreURaQ0MUalqs\
  // T7I6qw5sSB4AznxcLlYQmtGGLmwy9mch6XbrSDf0T3VWGahBbuGSEa1o4hc17TDi\
  // u29cKyaUHlBC/kLQIuCEM+/9Scw2qGvTwhJfS7wU7eCVq/MLHURvF0ITJyPC7PRA\
  // us7JTE9C+d5NXDQpoxYXYT0wATGh/2E4x5CGVAohXssleL9nSG+63sj5LZnNuMhQ\
  // zUIfJyRTJ2YbOpZH/2PXYjT6cZxrc+U8Ndh+aGgCmOaZYcq8uFWl5DY3BAH/SVLi\
  // 1kOjiRN7K26T0YxfVeogLmB/vCS9pRJfvRbRrV9RJkzWWnFUx1fGtaISB8TW13IN\
  // CtUDsYTrhCC8Epb+dVxq2iSyz0hdxRphiafFdlxyYEZJB3MdrDWhGk2DqtdZXSTT\
  // dc3zsaAKj0WVrDFxL8sOdQV1BUqedPQa3oWGB5QG66VwT77SbUeMarsKunkCAwEA\
  // AQKCAgEAgajeiGGI5HPK3pwatMUWTP2To4QiwBtWj7x/pxaI0y/uEKO9CyFg6v7o\
  // 9LPqrn4GjRssaGVWC3zgICEas3CHey4FdNfPnseBUSLyVshjNubg3RZkQvRh5KrD\
  // C3m/Q8x8MaVUkLNbgqTVuf+nX9UeKhX32KASNRBasaEMJuIbmEV/KkmnPnbe8eNJ\
  // eYdCYlloKkv5HfaYoao1e/u82i0h7Qt1p3bMZ7pehzQx/Jd2XVvWF0T+CxaaZOh3\
  // 40GmFfKI5rSwisbpHDs7qMPXCrIBNEup1pm3aQTUnGYG8mX4UQnb+I999Kga7SYV\
  // dzpfJU51IE4KBTv76SX7FPtLpchd6Rj2rgyKamI9tCi915peNvlbHzR2191EZeKY\
  // r5pKP7uIwOvT9KzAY80spoeQU2wOqu8okqI0WujbMg4z/pXF5czPpzLFia8O3UU2\
  // vEWygbrfdjA/VTm5atC0hj7EZhpvfQOwwWEK6CoxK+hcaYufHKgJGdfLDqDPEoNu\
  // vOIPtzJ+PM6B/tW2oQ2WLP88t6MVOpCwdPqjKilkPBdX95Q8GyQhi62y6ub1XpNJ\
  // qVMM6Kyyfkavplkb/t9kZk8Q5XTM+C5y55D1cSm2IVklnw0jrUfawHE8R52nLKkv\
  // 7LE7j1KYY0S1fELeLz+ZVD5xODgw+/e3/oOu+LsiqAOdfFAk4UUCggEBAN8C0fIk\
  // E3Mt2i1kVGsBfcs4Jf4qY663p1+Lr3y12IjfLFjYgOmeDK9ZumCt68e8zy2JXgYK\
  // DLj3ZS4bEtmyzpaVKo8njyO80NgyM3WnIeOS1efZJaSqJJrPogALJG69IaGHEPqP\
  // m8rsSeOoLBhbZyQwymtqenboeF0CflF7JiEZuFoyBxc5jCA3YF4gF4sb1CiewSuq\
  // AmdM+y5Y+QawkTRixYWvOQVXNFDaq8ulJfouEboHzwfjcpSsN+UOQiVhWw0hFZd5\
  // v5xQIlODc7c5tMthHuU5OzF8LPzzgZOazPmRhE3uyYsNL0I8XIiMbmcM2igwzIaQ\
  // UTqEKt1brchOkbcCggEBAJ7AceLRV6bqOMsMV8XgFK47BeQmqaJ/tr9Z0oQdWnTq\
  // Au34qLg9p88C/SlG9tBZRAJlm6RAYpmbpJKBQiFTvzB2ECG8JT0zPmUToH+Y0RPL\
  // d+M0EEVxLNAD9RyuKIuVRiU9AJ4BfnvdfQANnkkGz+/JC/KC5t0tLOzPzzp3a01z\
  // o8ASseSQUv0qcbpWOXnofu8QqetfcdsIWpGUCcIXZIGktnJHMaQ1o2BvqwmKYfeW\
  // 2jHb3eRotDF1CoVq/ezH1g0dPvN3cQGDzX02L3bkgU/32853jI8ZFkUA7CbHGl8C\
  // XQt0bxPSB/aB2g87mawaRrIG1VLjubr1PbW7bmbmVU8CggEBANZ4TNY1Eat8Vk2/\
  // Jlx+Y67zwb4MoC8gGkwN92fVLnh7QJf1Jw0FXaepgE+IE6/Uid5+NDlUouWjrt/H\
  // U7qfdoRk0jg4UDWLWcIBjXHBmRrWVPcS41vX8TodIuwtywzgwR4p2g9N2wMteOYD\
  // Dt0h0jCA57qj/UCr002Hn1nXOFUu+hdr81vHkVZOS1RaQqoayk+CVb4bUxJre0kY\
  // ce2YEx0xPEqTuB/FvN9hXUSM/9f5RD0HU3h/qesHMP4NV1nBpiIbRjuV78txWYG9\
  // cqSsT44kSeUixCWUCWP+/weoISaGZpnYYmVi+acWi9saSva56ngqbhefZS8EeoDF\
  // sXxo60MCggEADGSBf29QJFuMa21fPLctZhx9bT4HaAQIRA/C+0U/VnkeGW2b3iYR\
  // /3sAQESl58XQJU/BQqU0DUG1Kyqj+u4KssHEqJ2DWq+xYzqRAOTxDVaI2VerHYCk\
  // OujULZT63Uqd2zJT5gG/2fOEWoi1noXFnbZYFGpbk1B/fU0LpEjGO5mXYtsSwAD0\
  // OYcisaUhf37Cye7HFPSycqLITyz7RgeFdQlipLEiEuuNAW42L9x5oVZJWjMLs1Tp\
  // HCNC2v9rKxy+fO+XhnIAhFnBpNCiC+nynkd/BTMX6ePPdTuJM82/JUON9+Ly+N0g\
  // egHQ//drG6BBfIxEAuB8EzgpxRIIoEfCyQKCAQEAm8g8VlqCyENlBnKrzx73IFsh\
  // vValq8/d7wvSLVyfEHeYDLYZOl8jMpdY72QPjB8kHGMLS5HY8dVgnB0nkWTC/9jG\
  // NCN+cXXtwWTUt7NkJqmoRIIWJE4rucwSUK9f2H61L9k8YaZzBygA2YWhzcZlN0Dc\
  // ST0uMtQ9plseDvfmpULUyjo5rU+q9FKIY9PFQcuMzoR7IYPSHsOzbw2DnB7QPiJU\
  // Au/fxUXCD3VLtQ5rZV7kQcylmJzpZZVMSajMhGsV0K3CBzspZrkF1lrOF/zw15Ba\
  // jZ9EiMhOhgZHVpWF/ypSdEgayN0wPYvFmtkpPaULfDxkhndiGyiCKF27IfQleA==\
  // -----END RSA PRIVATE KEY-----";
  //
  //   var de = aes256.encrypt(pk, "mk");
  //   alert(de);
  //   alert(aes256.decrypt(pk, de));

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

  var key = n.privateKey;

  const retriveReceivedProfile = await identity.methods
    .getOthersData(n.senderAddress)
    .call({
      from: accounts[0]
    });

  crypt = Crypt();

  if (retriveReceivedProfile[0] !== "") {
    retriveReceivedProfile[0] = crypt.decrypt(key, retriveReceivedProfile[0]);
  }
  if (retriveReceivedProfile[1] !== "")
    retriveReceivedProfile[1] = crypt.decrypt(key, retriveReceivedProfile[1]);
  if (retriveReceivedProfile[2] !== "")
    retriveReceivedProfile[2] = crypt.decrypt(key, retriveReceivedProfile[2]);
  if (retriveReceivedProfile[3] !== "")
    retriveReceivedProfile[3] = crypt.decrypt(key, retriveReceivedProfile[3]);
  if (retriveReceivedProfile[4] !== "")
    retriveReceivedProfile[4] = crypt.decrypt(key, retriveReceivedProfile[4]);
  if (retriveReceivedProfile[5] !== "")
    retriveReceivedProfile[5] = crypt.decrypt(key, retriveReceivedProfile[5]);
  if (retriveReceivedProfile[6] !== "")
    retriveReceivedProfile[6] = crypt.decrypt(key, retriveReceivedProfile[6]);

  return retriveReceivedProfile;
};
