"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.deletechat = exports.updatechat = exports.getchat = exports.getchats = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const getchats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const user = req.user;
        const chats = yield db_config_1.default.chatGroup.findMany({
            where: {
                user_id: user.id
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return res.status(200).json({
            message: "Chats fetched successfully",
            chats
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});
exports.getchats = getchats;
const getchat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const chat = yield db_config_1.default.chatGroup.findUnique({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Chat fetched successfully",
            data: chat
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong when fetching "
        });
    }
});
exports.getchat = getchat;
const updatechat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedchat = yield db_config_1.default.chatGroup.update({
            where: {
                id: id
            },
            data: {
                title: body.title,
                password: body.password
            }
        });
        return res.status(200).json({
            message: "Chat updated successfully",
            updatedchat
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong while updating "
        });
    }
});
exports.updatechat = updatechat;
const deletechat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedchat = yield db_config_1.default.chatGroup.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Chat deleted successfully",
            deletedchat
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting "
        });
    }
});
exports.deletechat = deletechat;
const Chat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, password, user_id } = req.body;
        const chat = yield db_config_1.default.chatGroup.create({
            data: {
                title,
                password,
                user_id: user_id
            }
        });
        return res.status(200).json({
            message: "Chat group created successfully",
            chat
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});
exports.Chat = Chat;
