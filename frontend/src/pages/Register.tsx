import React from "react";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client"
import { useMutation } from "react-query";
import { formInput, formLabel, textError } from "@/utilities/commonCss";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
 export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register,watch,handleSubmit,formState:{errors} } = useForm<RegisterFormData>();
  const {showToast}=useAppContext()
  const navigate=useNavigate()
  const mutation=useMutation(apiClient.register,{
    onSuccess: async (data) => {
      console.log("User registered successfully", data);
      showToast({message:"User registered successfully",type:"SUCCESS"})
      navigate("/")
      // Redirect to the login page
      // history.push("/login");
    },
    onError: (error:Error) => {
      showToast({message:error?.message,type:"ERROR"})
    },
  })
  const onSubmit =handleSubmit((data)=>{
   mutation.mutate(data)
  })
  
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold">Create An Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className={formLabel}>
          First Name
          <input className={formInput} {...register("firstName",{
            required:"This field is required"
          })} />
          {
            errors.firstName && <p className={textError}>{errors.firstName.message}</p>
          }
        </label>
        <label className={formLabel}>
          Last Name
          <input className={formInput} {...register("lastName",{
            required:"This field is required"
          })}/>
          {
            errors.lastName && <p className={textError}>{errors.lastName.message}</p>
          }
        </label>
      </div>
      
        <label className={formLabel}>
          Email
          <input type="email" className={formInput} {...register("email",{
            required:"This field is required"
          })} />
           {
            errors.email && <p className={textError}>{errors.email.message}</p>
          }
        </label>
        <label className={formLabel}>
          Password
          <input type="password" className={formInput} {...register("password",{
           required:"This field is required",
           minLength:{
             value:6,
             message:"Password must be at least 6 characters long"
           }
          })}/>
           {
            errors.password && <p className={textError}>{errors.password.message}</p>
          }
        </label>
        <label className={formLabel}>
         Confirm Password
          <input type="password" className={formInput} {...register("confirmPassword",{
           
            validate:(val)=>{
              if(!val){
                return "This field is required";

              }
              else if(watch("password")!==val){
                return "Passwords do not match";

              }
            }
            
          })}/>
           {
            errors.confirmPassword && <p className={textError}>{errors.confirmPassword.message}</p>
          }
        </label>
     
    <span> <button type="submit" className="bg-blue-600 rounded-lg  text-white px-3 py-2 hover:bg-blue-500 ">
    Create Account
     </button>
     </span>
    </form>
  );
};

export default Register;
