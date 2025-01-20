import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface CelebsContextType{
    isReady: boolean;

}

export const CelebsModuleContext = createContext<CelebsContextType | undefined>(undefined);

export function CelebsModuleProvider({ children }: { children: ReactNode }){
    const[isReady,setIsReady]=useState(false);
    useEffect(()=>{
        setIsReady(true)
    },[])
    return(
        <CelebsModuleContext.Provider value={isReady}>
                {isReady ? children : <p>Not ready</p>}
        </CelebsModuleContext.Provider>
    )
}

export const useCelebsModuleContext=()=>{
    const context = useContext(CelebsModuleContext)
    if (context === undefined) {
        throw new Error("useCelebsModuleContext must be used within a CelebsModuleProvider");
    }
    return context
}
