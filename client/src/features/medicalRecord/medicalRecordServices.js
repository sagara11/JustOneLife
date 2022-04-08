import MedicalRecord from "../../contracts/MedicalRecord.json";
import { createMedicalTransactionAPI } from "./medicalRecordAPI";
const {create} = require("ipfs-http-client");

const client = create("https://ipfs.infura.io:5001");

function medicalRecordServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;
  this.file = params.file;
  this.patientAddress = params.patientAddress;

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

      if (tx) {
        const data = await createMedicalTransactionAPI({
          publicAddress: this.patientAddress,
          IpfsHash: uploadFile.path,
          transactionHash: tx.transactionHash
        });

        console.log(data);
      }
      return tx;
    }

    return Promise.reject("File save failed");
  };
}

export default medicalRecordServices;
