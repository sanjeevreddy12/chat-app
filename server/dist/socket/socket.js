"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSocket = void 0;
const CreateSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("socket is connected", socket.id);
        socket.on("message", (data) => {
            console.log("serverside message", data);
            socket.emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });
    });
};
exports.CreateSocket = CreateSocket;
