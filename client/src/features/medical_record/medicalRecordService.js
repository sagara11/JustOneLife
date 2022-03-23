const MedicalRecord = require("../../contracts/MedicalRecord.json");
const { create } = require("ipfs-http-client");

const client = create("https://ipfs.infura.io:5001");

function medicalRecordService(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;
  this.file = params.file;
  this.patientAddress = params.patientAddress;

  this.saveFile = async () => {
    console.log("submiting...");
    if (!this.file) {
      alert("There is no file");
      return;
    }

    const uploadFile = await client.add(this.file);
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
}

export default medicalRecordService;
