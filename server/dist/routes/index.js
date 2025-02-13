"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const middleware_1 = __importDefault(require("../middlewares/middleware"));
const Room_1 = require("../controllers/Room");
const messages_1 = require("../controllers/messages");
const Chat_1 = require("../controllers/Chat");
const router = (0, express_1.Router)();
router.post("/auth/signin", Auth_1.signin);
//@ts-ignore
router.post("/chat", middleware_1.default, Room_1.Chat);
//@ts-ignore
router.get("/chat/:id", Room_1.getchat);
//@ts-ignore
router.get("/chats", middleware_1.default, Room_1.getchats);
//@ts-ignore
router.put("/chat/:id", middleware_1.default, Room_1.updatechat);
//@ts-ignore
router.delete("/chat/:id", middleware_1.default, Room_1.deletechat);
//@ts-ignore
router.get("/users/:id", Chat_1.getUsers);
//@ts-ignore
router.post("/user", Chat_1.CreateUser);
//@ts-ignore
router.get("/messages/:id", messages_1.Retrieve);
exports.default = router;
