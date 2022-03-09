import AuthorizeContract from "../../contracts/Authorize.json";

function doctorServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;
  this.address = params.address;

  this.updateRole = async () => {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = AuthorizeContract.networks[networkId];
    const instance = new this.web3.eth.Contract(
      AuthorizeContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    const roleHash = this.web3.utils.keccak256(
      process.env.REACT_APP_ROLE_DOCTOR
    );
    let hasRole = await instance.methods
      .hasRole(roleHash, this.address)
      .call({from: this.currentUser.publicAddress});

    if (!hasRole) {
      const doctorRoleUpdate = await instance.methods
        .setDoctor(this.currentUser.publicAddress, this.address)
        .send({from: this.currentUser.publicAddress});

      return doctorRoleUpdate;
    } else {
      return Promise.reject(
        "Can't authorize. This account already has doctor role"
      );
    }
  };

  this.getDoctorList = async () => {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = AuthorizeContract.networks[networkId];
    const instance = new this.web3.eth.Contract(
      AuthorizeContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    let doctorList = await instance.methods
      .getDoctors(this.currentUser.publicAddress)
      .call({from: this.currentUser.publicAddress});

    return doctorList;
  };
}

export default doctorServices;
