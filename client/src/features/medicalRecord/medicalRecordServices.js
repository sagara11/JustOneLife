import {isEmpty} from "lodash";
import MedicalRecord from "../../contracts/MedicalRecord.json";
import {createMedicalTransactionAPI} from "./medicalRecordAPI";
const {create} = require("ipfs-http-client");
const {sha256} = require("js-sha256").sha256;
const aes256 = require("aes256");

const client = create("https://ipfs.infura.io:5001");

function medicalRecordServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;
  this.file = params.file;
  this.patientAddress = params.patientAddress;
  this.passwordPatient = params.passwordPatient;
  this.passwordDoctor = params.passwordDoctor;
  this.hash_1_Patient = params.hash_1_Patient;
  this.hash_1_Doctor = params.hash_1_Doctor;
  this.keyLevel_2 = params.keyLevel_2;

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

  this.processFile = async (hashValue, userAddress, patientKey) => {
    const encryptedPlainText = await aes256.encrypt(hashValue, this.file);
    const encryptedPlainText_final = isEmpty(patientKey)
      ? encryptedPlainText
      : await aes256.encrypt(patientKey, encryptedPlainText);
    const uploadFile = await client.add(encryptedPlainText_final);

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
        .addMedicalRecord(userAddress, uploadFile.path)
        .send({from: this.currentUser.publicAddress});

      if (tx) {
        const data = await createMedicalTransactionAPI({
          publicAddress: this.patientAddress,
          IpfsHash: uploadFile.path,
          transactionHash: tx.transactionHash,
        });

        console.log(data);
      }
      return tx;
    }
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

    const {patientKey} = this.keyLevel_2;
    if (isEmpty(patientKey)) {
      console.log("The Doctor are not authorized from patient");
      return;
    }

    await this.processFile(
      this.hash_1_Patient,
      this.patientAddress,
      patientKey
    );
    console.log(`Created successfully Patient file`);
    await this.processFile(
      this.hash_1_Doctor,
      this.currentUser.publicAddress,
      null
    );
    console.log(`Created successfully Doctor file`);

    return Promise.reject("File save failed");
  };

  this.hashingPassword = async () => {
    const passwordPatient = this.passwordPatient;
    const passwordDoctor = this.passwordDoctor;
    const patient = await this.processHashing(passwordPatient);
    const doctor = await this.processHashing(passwordDoctor);

    return {
      hash_1_Patient: patient.hash_1,
      hash_2_Patient: patient.hash_2,
      hash_1_Doctor: doctor.hash_1,
      hash_2_Doctor: doctor.hash_2,
    };
  };

  this.processHashing = async (password) => {
    const hash_1 = await sha256(password);
    const hash_2 = await sha256(hash_1);
    return {hash_1, hash_2};
  };
}

export default medicalRecordServices;
