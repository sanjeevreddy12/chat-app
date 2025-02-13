import { Server } from "socket.io";

export const CreateSocket = (io : Server)=>{
    io.use((socket , next)=>{
        const room = socket.handshake.auth.room || socket.handshake.headers
        if(!room){
            return next(new Error("Invalid Room check pls"))
        }
        //@ts-ignore
        socket.room=room;
        next()
    })

    io.on("connection" , (socket)=>{
        //@ts-ignore
        socket.join(socket.room);
        console.log("socket is connected" , socket.id)
        

        socket.on("message" , (data)=>{
            console.log("serverside message" , data)
            
            //@ts-ignore
            io.to(socket.room).emit("message" , data)
        })
        socket.on("disconnect" , ()=>{
            console.log("user disconnected" ,socket.id)
        })
    })

}