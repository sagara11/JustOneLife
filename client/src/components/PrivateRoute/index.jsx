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
  }, [accounts, currentUser, dispatch, web3]);

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
