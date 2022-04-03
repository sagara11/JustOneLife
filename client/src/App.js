import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./components/NotFound";
import {globalState, setAccounts, setWeb3} from "./features/global/globalSlice";
import {
  authenticationState,
  refreshToken,
  changeTokenValid,
} from "./features/authentication/authenticationSlice";
import getWeb3 from "./getWeb3";
import HomePage from "./pages/HomePage";
import ManagerPage from "./pages/ManagerPage";
import DoctorPage from "./pages/DoctorPage";
import UserPage from './pages/UserPage';
import {
  authorizationState,
  setRolePatient,
} from "./features/authorization/authorizationSlice";
import {isEmpty} from "lodash";
import NewMedicalRecordPage from './pages/MedicalRecordPage/new';
import MedicalRecordPage from "./pages/MedicalRecordPage";
import ShowMedicalRecord from './pages/MedicalRecordPage/show';

const jwt = require("jsonwebtoken");

const App = () => {
  const {web3, accounts, currentUser} = useSelector(globalState);
  const {userRole} = useSelector(authorizationState);
  const {tokenValid} = useSelector(authenticationState);
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        dispatch(setWeb3(web3));
        dispatch(setAccounts(accounts));
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    const tokenExpiredCheck = async (token) => {
      try {
        if (token) {
          await jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
        }
      } catch (err) {
        dispatch(changeTokenValid(false));
        dispatch(
          refreshToken({refreshToken: localStorage.getItem("refreshToken")})
        );
      }
    };
    tokenExpiredCheck(localStorage.getItem("authToken"));
  }, [dispatch, tokenValid]);

  useEffect(() => {
    if (currentUser && isEmpty(userRole))
      dispatch(setRolePatient({web3, accounts, currentUser}));
  }, [accounts, currentUser, dispatch, web3, userRole]);

  if (web3 === null) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/user/:patientPublicAddress" component={UserPage} />
        <PrivateRoute
          exact
          path="/medical-record/detail"
          component={ShowMedicalRecord}
        />
        <PrivateRoute
          path="/medical-record/:patientPublicAddress"
          component={MedicalRecordPage}
        />
        <PrivateRoute
          path="/vaccination-certificate/:patientPublicAddress"
          component={HomePage}
        />
        <PrivateRoute path="/medical-records" component={NewMedicalRecordPage} />
        <PrivateRoute path="/vaccination-certificates" component={HomePage} />
        <PrivateRoute path="/doctors" component={DoctorPage} />
        <PrivateRoute path="/managers" component={ManagerPage} />
        <PrivateRoute path="/settings" component={HomePage} />
        <Route path="/login" component={AuthenticationPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
