import AuthorizeContract from "../../contracts/Authorize.json";

function managerServices(params) {
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

    const roleHash = this.web3.utils.keccak256(process.env.REACT_APP_ROLE_MANAGER);
    let hasRole = await instance.methods
      .hasRole(roleHash, this.address)
      .call({from: this.accounts[0]});
    if(!hasRole) {
      const managerRoleUpdate = await instance.methods.setManager(this.address).send({from: this.accounts[0]});
      return managerRoleUpdate;
    } else {
      return Promise.reject("Can't authorize. This account already has manager role");
    }
  }
}

export default managerServices;
