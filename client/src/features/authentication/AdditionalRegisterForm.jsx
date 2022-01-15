import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useDispatch, useSelector} from "react-redux";
import {updateAccount} from "./authenticationSlice";
import {globalState} from "../global/globalSlice";

function AdditionalRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();

  const {currentUser} = useSelector(globalState);

  const onSubmit = (data) => {
    currentUser &&
      dispatch(
        updateAccount({publicAddress: currentUser.publicAddress, data: data})
      );
  };

  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="additional-register-form">
      <div className="form-element">
        <label htmlFor="form_username">Username</label>
        <input
          {...register("name", {required: "This is required."})}
          className="form-control"
          id="form_username"
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <div className="form-element">
        <label htmlFor="form_email">Email</label>
        <input
          className="form-control"
          id="form_email"
          {...register("email", {
            required: "This is required.",
            pattern: {
              value: regexEmail,
              message: "This is wrong type of email.",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <div className="form-element">
        <label htmlFor="form_phone">Phone</label>
        <input
          className="form-control"
          id="form_phone"
          {...register("phone", {
            maxLength: {
              value: 12,
              message: "This input require max 12 numbers",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="phone"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <button className="btn btn-primary" id="form_submit">
        Submit
      </button>
    </form>
  );
}
export default AdditionalRegisterForm;
