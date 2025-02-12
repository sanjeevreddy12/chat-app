import express from "express";
import cors from "cors";
import router from "./routes";
import { createServer } from "http";
import {Server} from "socket.io"
import { connect } from "http2";
import { CreateSocket } from "./socket/socket";



const app = express();
const server  = createServer(app);
const io = new Server(server,{
 cors : {
  origin : "*"
 }
});

io.on("connection" , (socket)=>{
  console.log("user connected" , socket.id);

})

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.get("/",(req,res)=>{
    res.json({
        message:"Server is running!"
    })
})
CreateSocket(io);

export {io};

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




