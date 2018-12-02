pragma solidity ^0.4.17;

contract SmartID {

    mapping(address => string) public name;
    mapping(address => string) public mail_address;
    mapping(address => string) public dob;
    mapping(address => string) public phone;
    mapping(address => string) public email;
    address public manager;

    // we need to store the unique key locally

    function SmartID() public {
        manager = msg.sender;
    }

    function saveProfile(string _name, string _mail, string _dob, string _phone, string _email) public payable {
        require(msg.value > 0.01 ether);

        name[msg.sender] = _name;
        mail_address[msg.sender] = _mail;
        dob[msg.sender] = _dob;
        phone[msg.sender] = _phone;
        email[msg.sender] = _email;
    }
}
