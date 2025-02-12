import { Server } from "socket.io";

export const CreateSocket = (io : Server)=>{
    io.on("connection" , (socket)=>{
        console.log("socket is connected" , socket.id)
        

        socket.on("message" , (data)=>{
            console.log("serverside message" , data)
            socket.emit("message" ,data);
        })
        socket.on("disconnect" , ()=>{
            console.log("user disconnected" ,socket.id)
        })
    })

}