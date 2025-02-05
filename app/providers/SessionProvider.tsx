"use client"
import { SessionProvider } from "next-auth/react"

export const Sessionprovider = ({children } : {
    children : React.ReactNode
})=>{
    return(
        <SessionProvider>
            {children}

        </SessionProvider>
    )
}