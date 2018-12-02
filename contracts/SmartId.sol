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

    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function getData() public view returns (string) {
        return strConcat(name[msg.sender], "-", mail_address[msg.sender], "-", dob[msg.sender]);
    }

    function getData1() public view returns (string, string, string) {
        return (name[msg.sender], mail_address[msg.sender], dob[msg.sender]);
    }



    // function getPublicKey() public view returns (string) {
    //     return publicKey[msg.sender];
    // }

}
