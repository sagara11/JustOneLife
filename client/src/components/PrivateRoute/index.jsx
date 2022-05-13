import { Redirect, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationPage from "../../pages/AuthenticationPage/index";
import {
  fetchCurrentUser,
  globalState,
} from "../../features/global/globalSlice";
import { getCurrentUserRole } from "../../features/authorization/authorizationSlice";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import io from 'socket.io-client';
import MedicalRecord from "../../contracts/MedicalRecord.json";
import medicalRecordServices from '../../features/medicalRecord/medicalRecordServices';
import { authenticateIPFSAPI } from '../../features/medicalRecord/medicalRecordAPI';
let socket;
const NodeRSA = require("node-rsa");
const key = new NodeRSA();

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { web3, accounts, currentUser } = useSelector(globalState);

  useEffect(() => {
    if (!currentUser && localStorage.getItem("authToken")) {
      dispatch(fetchCurrentUser());
    }
    if (currentUser) {
      dispatch(getCurrentUserRole({ web3, accounts, currentUser }));
    }

    socket = io(process.env.REACT_APP_API_URL || "http://localhost:8080");

    socket.emit('join', currentUser?._id, (response) => {
      console.log("Connected to your room", response.data);
    })

    socket.on('password-sent', async(res) => {
      const { doctor, publicKey } = res;
      const doctorKey = await key.importKey(publicKey, "pkcs8-public-pem")
      if (!doctor) {
        return;
      }

      let patientPassword = prompt(`Doctor ${doctor.name} wants to access your data, please type in your password and submit?`);
      const medicalRecordService = new medicalRecordServices({key: 1});
      const { hash_2 } = await medicalRecordService.processHashing(
        patientPassword
      );
      const userAddress = currentUser.publicAddress;
      const result = await authenticateIPFSAPI({
        hash_2,
        userAddress,
      });

      if (!result.data) {
        alert("Wrong password, type again");
        return;
      }

      const encrypPatientPassword = await doctorKey.encrypt(patientPassword, "base64")

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MedicalRecord.networks[networkId];
      const instance = new web3.eth.Contract(
        MedicalRecord.abi,
        deployedNetwork && deployedNetwork.address
      );

      const inWhiteList = await instance.methods
        .whitelist(currentUser.publicAddress, doctor.publicAddress)
        .call();
      if (!inWhiteList) {
        const tx = await instance.methods
          .setWhiteList(doctor.publicAddress, true)
          .send({ from: currentUser.publicAddress });

        if (!tx) {
          alert("Failed to add doctor to whitelist");
          return;
        }
      }

      socket.emit('respond-password', encrypPatientPassword, currentUser._id);
    })
  }, [currentUser]);

  const isAlreadyRegister =
    currentUser && !isEmpty(currentUser.email) && !isEmpty(currentUser.name);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          isAlreadyRegister ? (
            <Component {...props} />
          ) : (
            <AuthenticationPage register={true} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
