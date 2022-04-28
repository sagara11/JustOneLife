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
      if (doctor) {
        let patientPassword = prompt(`Doctor ${doctor.name} wants to access your data, please type in your password?`);
        const encrypPatientPassword = await doctorKey.encrypt(patientPassword, "base64")
        socket.emit('respond-password', encrypPatientPassword, currentUser._id);
      }
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
