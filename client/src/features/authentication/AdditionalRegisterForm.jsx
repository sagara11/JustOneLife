import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useDispatch} from "react-redux";
import {updateAccount} from "./authenticationSlice";

function AdditionalRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updateAccount(data));
  };
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
