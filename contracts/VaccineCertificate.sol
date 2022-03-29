// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Authorize.sol";

contract VaccineCertificate {
    struct vaccineCertificateInfo {
        string name;
        string lotNumber;
        string location;
        uint256 date;
    }

    Authorize internal authorize;
    mapping(address => vaccineCertificateInfo[]) public userToData;

    event addNewVaccineCertificate(address _userAdress);

    constructor(address _authorizeInstance) {
        authorize = Authorize(_authorizeInstance);
    }

    modifier onlyAllowedRole(bytes32 role, address account) {
        require(authorize.hasRole(role, account));
        _;
    }

    function addVaccineCertificate(
        address _userAddress,
        string memory _name,
        string memory _lotNumber,
        string memory _location,
        uint256 _date
    ) public onlyAllowedRole(authorize.DOCTOR_ROLE(), msg.sender) {
        require(
            bytes(_name).length != 0 &&
                bytes(_location).length != 0 &&
                _date != 0,
            "Insufficient data"
        );
        vaccineCertificateInfo memory newCertificate;

        newCertificate.name = _name;
        newCertificate.lotNumber = _lotNumber;
        newCertificate.location = _location;
        newCertificate.date = _date;

        userToData[_userAddress].push(newCertificate);

        emit addNewVaccineCertificate(_userAddress);
    }
}
