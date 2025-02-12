import {io , Socket} from "socket.io-client";
let socket :Socket;

// export const Getsocket=() : Socket =>{
//     if(!socket) {

//         socket = io("http://localhost:8000" , {autoConnect : false})
//     }
//     return socket;
    

// }
export const Getsocket = ()=>{
    if(!socket) {
        socket = io("http://localhost:8000" , {autoConnect : false})
    }
    return socket
}