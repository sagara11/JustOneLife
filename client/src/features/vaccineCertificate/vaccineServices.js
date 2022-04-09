import VaccineCertificate from "../../contracts/VaccineCertificate.json";

function vaccineServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;
  this.data = params.data;

  this.createNewVaccineCertificate = async () => {
    try {
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = VaccineCertificate.networks[networkId];
      const instance = new this.web3.eth.Contract(
        VaccineCertificate.abi,
        deployedNetwork && deployedNetwork.address
      );

      const { vaccine } = this.data;

      if (!vaccine) return Promise.reject("Insufficient data");

      await instance.methods
        .addVaccineCertificate(
          vaccine.patientPublicAddress,
          vaccine.name,
          vaccine.lotNumber,
          vaccine.location,
          vaccine.date
        )
        .send({ from: this.currentUser.publicAddress });

      return vaccine;
    } catch (err) {
      console.log(err);
    }
  };

  this.getVaccineCertificateList = async () => {
    try {
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = VaccineCertificate.networks[networkId];
      const instance = new this.web3.eth.Contract(
        VaccineCertificate.abi,
        deployedNetwork && deployedNetwork.address
      );

      let list = await instance.methods
        .getVaccineCertificate(this.currentUser.publicAddress)
        .call({ from: this.currentUser.publicAddress });

      return list;
    } catch (err) {
      console.log(err);
    }
  };
}

export default vaccineServices;
