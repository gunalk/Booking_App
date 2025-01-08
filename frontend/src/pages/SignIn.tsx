import {
  formInput,
  formLabel,
  FormWrapper,
  heading,
  PrimaryBlueButton,
  textError,
} from "@/utilities/commonCss";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "@/contexts/AppContext";
export interface SignInFormData {
  email: string;
  password: string;
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async (data) => {
      console.log("User signed in successfully", data);
      showToast({ message: "User Logged in successfully", type: "SUCCESS" });
      // Redirect to the home page after successful sign in
      navigate("/");
    },
    onError: (error) => {
      console.error("Error signing in user:", error);
      // Show an error message to the user
      showToast({ message: "Error signing in user", type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className={FormWrapper} onSubmit={onSubmit}>
      <h2 className={heading}>Sign In</h2>
      <div className="flex flex-col gap-5 ">
        <label className={formLabel}>
          Email
          <input
            type="email"
            className={formInput}
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && <p className={textError}>{errors.email.message}</p>}
        </label>
        <label className={formLabel}>
          Password
          <input
            type="password"
            className={formInput}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className={textError}>{errors.password.message}</p>
          )}
        </label>
        <span>
          {" "}
          <button type="submit" className={PrimaryBlueButton}>
            Sign In
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignIn;
