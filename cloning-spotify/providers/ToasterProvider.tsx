'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = ()=>{
    return (
        <Toaster toastOptions={{
            style:{
                color:'#fff',
                background:'#333'
            }
        }}/>
    )
}

export default ToasterProvider;