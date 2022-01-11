import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./components/NotFound";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import {
  globalState,
  setAccounts,
  setWeb3,
  setContract,
} from "./features/global/globalSlice";
import getWeb3 from "./getWeb3";
import HomePage from "./pages/HomePage";

const App = () => {
  const {web3} = useSelector(globalState);
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        dispatch(setWeb3(web3));
        dispatch(setAccounts(accounts));
        dispatch(setContract(instance));
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    init();
  }, [dispatch]);

  if (web3 === null) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={AuthenticationPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
