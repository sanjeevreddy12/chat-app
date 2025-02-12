"use client"
import { Getsocket } from "@/lib/socket"
import { useEffect, useMemo } from "react"
import {v4 as uuidV4} from "uuid"
import { Button } from "../ui/button"
export const Chatbase = ()=>{

    let socket = useMemo(()=>{
        const socket = Getsocket();
        return socket.connect();


    },[])

    useEffect(()=>{
        socket.on("message" , (data : any)=>{
            console.log("The message is " , data)
            
        })
        return ()=>{
            socket.close()
        }



    },[])
    const click = ()=>{
        socket.emit("message" , {id:uuidV4()})
    }
    return (
        <div>
            <Button onClick={click}>
                send
            </Button>
        </div>
    )

}