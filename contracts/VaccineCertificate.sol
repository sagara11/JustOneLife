// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Authorize.sol";

contract VaccineCertificate {
    struct vaccineCertificateInfo {
        string name;
        string lotNumber;
        string location;
        string date;
    }

    Authorize internal authorize;
    mapping(address => vaccineCertificateInfo[]) private userToData;

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
        string memory _date
    ) public onlyAllowedRole(authorize.DOCTOR_ROLE(), msg.sender) {
        require(
            bytes(_name).length != 0 &&
                bytes(_location).length != 0 &&
                bytes(_date).length != 0,
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

    function getVaccineCertificate(address _userAddress)
        public
        view
        returns (vaccineCertificateInfo[] memory)
    {
        return userToData[_userAddress];
    }
}
