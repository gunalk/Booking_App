import { Toast } from "@/components/Toast";
import React, { useContext, useState } from "react";

type ToastMessage ={
    message:string;
    type:"SUCCESS"|"ERROR"
}

type AppContext ={
    showToast:(toastMesage:ToastMessage)=>void
}

const AppContext =React.createContext<AppContext|undefined>(undefined)

export const AppContextProvider =({children}:{
    children:React.ReactNode
})=>{
    const [toastMessage, setToastMessage] =useState<ToastMessage |undefined>(undefined)
return (
    <AppContext.Provider value={{
        showToast: (toastMessage:ToastMessage) => {
           setToastMessage(toastMessage)
        }
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