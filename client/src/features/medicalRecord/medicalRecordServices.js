import MedicalRecord from "../../contracts/MedicalRecord.json";
const { create } = require("ipfs-http-client");
const {sha256} = require('js-sha256').sha256;
const aes256 = require('aes256');

const client = create("https://ipfs.infura.io:5001");

function medicalRecordServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;
  this.file = params.file;
  this.patientAddress = params.patientAddress;
  this.password = params.password
  this.hash_1 = params.hash_1

  this.getMedicalRecordList = async () => {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = MedicalRecord.networks[networkId];
    const instance = new this.web3.eth.Contract(
      MedicalRecord.abi,
      deployedNetwork && deployedNetwork.address
    );

    let medicalRecordList = await instance.methods
      .getMedicalRecord(this.currentUser.publicAddress, 0)
      .call({from: this.currentUser.publicAddress});

    return medicalRecordList;
  };

  this.saveFile = async () => {
    console.log("submiting...");
    if (!this.file) {
      alert("There is no file");
      return;
    }

    if (!this.patientAddress) {
      return;
    }

    if (this.patientAddress === this.currentUser.publicAddress) {
      return;
    }

    const encryptedPlainText = aes256.encrypt(this.hash_1, this.file);
    const uploadFile = await client.add(encryptedPlainText);

    // const decryptedPlainText = aes256.decrypt(this.hash_1, encryptedPlainText);
    // console.log(decryptedPlainText)

    console.log(uploadFile);
    if (uploadFile) {
      console.log("Saving cid to blockchain...");
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = MedicalRecord.networks[networkId];
      const instance = new this.web3.eth.Contract(
        MedicalRecord.abi,
        deployedNetwork && deployedNetwork.address
      );
      const tx = await instance.methods
        .addMedicalRecord(this.patientAddress, uploadFile.path)
        .send({from: this.currentUser.publicAddress});
      return tx;
    }

    return Promise.reject("File save failed");
  };

  this.hashingPassword = async () => {
    const {password} = this.password
    const hash_1 = await sha256(password)
    const hash_2 = await sha256(hash_1)
    return {hash_1, hash_2}
  }
}

export default medicalRecordServices;
