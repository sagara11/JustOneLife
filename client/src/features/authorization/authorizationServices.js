import AuthorizeContract from "../../contracts/Authorize.json";

function authorizationServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;

  this.setPatientRole = async () => {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = AuthorizeContract.networks[networkId];
    const instance = new this.web3.eth.Contract(
      AuthorizeContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    const roleHash = this.web3.utils.keccak256(
      process.env.REACT_APP_ROLE_PATIENT
    );
    let hasRole = await instance.methods
      .hasRole(roleHash, this.currentUser.publicAddress)
      .call({from: this.accounts[0]});
    if (!hasRole) {
      await instance.methods
        .setPatient(this.currentUser.publicAddress)
        .send({from: this.accounts[0]});
    }

    const data = await instance.getPastEvents("RoleGranted");
    return data[0]["returnValues"];
  };
}

export default authorizationServices;
