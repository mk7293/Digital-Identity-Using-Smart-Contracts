pragma solidity ^0.4.17;

contract SmartID {

    mapping(address => string) public name;
    mapping(address => string) public mailAddress;
    mapping(address => string) public dob;
    mapping(address => string) public phone;
    mapping(address => string) public email;
    mapping(address => string) public ssn;
    mapping(address => string) public gender;

    mapping(address => string) public publicKey;

    mapping(address => mapping(address => TempData)) dataToSend;

    struct TempData {
        string name;
        string mailAddress;
        string dob;
        string phone;
        string email;
        string ssn;
        string gender;
    }

    address public manager;

    function SmartID() public {
        manager = msg.sender;
    }

    function saveProfile(string _name, string _mail, string _dob, string _phone,
        string _email, string _ssn, string _gender, string _publicKey) public payable {
        require(msg.value > 0.01 ether);

        name[msg.sender] = _name;
        mailAddress[msg.sender] = _mail;
        dob[msg.sender] = _dob;
        phone[msg.sender] = _phone;
        email[msg.sender] = _email;
        ssn[msg.sender] = _ssn;
        gender[msg.sender] = _gender;
        publicKey[msg.sender] = _publicKey;
    }

    function getData() public view returns (string, string, string, string, string, string, string) {
        return (name[msg.sender], mailAddress[msg.sender], dob[msg.sender], phone[msg.sender],
            email[msg.sender], ssn[msg.sender], gender[msg.sender]);
    }

    function getPublicKey(address receiversAddress) public view returns (string) {
        return publicKey[receiversAddress];
    }

    function uploadData(string _name, string _mail, string _dob, string _phone,
        string _email, string _ssn, string _gender, address receiversAddress) public payable {
        require(msg.value > 0.01 ether);

        TempData memory tempData = TempData({
            name: _name,
            mailAddress: _mail,
            dob: _dob,
            phone: _phone,
            email: _email,
            ssn: _ssn,
            gender: _gender
        });

        dataToSend[msg.sender][receiversAddress] = tempData;

    }

    function getOthersData(address sendersAddress) public view returns (string, string, string, string, string, string, string) {
        TempData memory tempData = dataToSend[sendersAddress][msg.sender];

        return (tempData.name, tempData.mailAddress, tempData.dob, tempData.phone, tempData.email, tempData.ssn, tempData.gender);
    }

    // "hello1", "hello2", "hello3", "hello4", "hello5", "hello6", "hello7"

}
