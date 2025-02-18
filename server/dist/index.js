"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket/socket");
const admin_ui_1 = require("@socket.io/admin-ui");
const redis_streams_adapter_1 = require("@socket.io/redis-streams-adapter");
const redis_config_1 = __importDefault(require("./config/redis.config"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000"],
        credentials: true
    },
    adapter: (0, redis_streams_adapter_1.createAdapter)(redis_config_1.default)
});
exports.io = io;
(0, admin_ui_1.instrument)(io, {
    auth: false,
    mode: "development"
});
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
});
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Server is running!"
    });
});
(0, socket_1.CreateSocket)(io);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
