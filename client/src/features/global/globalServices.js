import AuthorizeContract from "../../contracts/Authorize.json";

function globalServices(params) {
  this.web3 = params.web3;
  this.accounts = params.accounts;
  this.currentUser = params.currentUser;

  this.getRole = async () => {
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = AuthorizeContract.networks[networkId];
    const instance = new this.web3.eth.Contract(
      AuthorizeContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    const userRole = await instance.methods.getRole(this.accounts[0]).call();
    return userRole;
  }
}

export default globalServices;
