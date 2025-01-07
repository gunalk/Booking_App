import { Toast } from "@/components/Toast";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client"

type ToastMessage ={
    message:string;
    type:"SUCCESS"|"ERROR"
}

type AppContext ={
    showToast:(toastMesage:ToastMessage)=>void;
    isLoggedIn:boolean;
}

const AppContext =React.createContext<AppContext|undefined>(undefined)

export const AppContextProvider =({children}:{
    children:React.ReactNode
})=>{
    const {isError}=useQuery("validateToken",apiClient.validateToken,{
        retry:false
    })
    const [toastMessage, setToastMessage] =useState<ToastMessage |undefined>(undefined)
return (
    <AppContext.Provider value={{
        showToast: (toastMessage:ToastMessage) => {
           setToastMessage(toastMessage)
        },
        isLoggedIn:!isError,
        


    }}>
        {toastMessage && (
            <Toast message={toastMessage?.message??""} type={
                toastMessage?.type??"ERROR"} onClose ={()=>setToastMessage(undefined)}/>
        )}
        {children}
    </AppContext.Provider>
 
)
}

export const useAppContext =()=>{
    const context=useContext(AppContext)
    return context as AppContext
}