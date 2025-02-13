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
exports.getUsers = getUsers;
exports.CreateUser = CreateUser;
const db_config_1 = __importDefault(require("../config/db.config"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roomId } = req.query;
            const users = yield db_config_1.default.groupUsers.findMany({
                where: {
                    group_id: roomId,
                }
            });
            return res.json({
                message: "Users Fetched Successfully", data: users
            });
        }
        catch (e) {
            return (res.json({
                message: "Failed to fetch Users try again."
            }));
        }
    });
}
function CreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const user = yield db_config_1.default.groupUsers.create({
                data: body
            });
            console.log(user);
            return res.json({
                message: "User Created Successfully", data: { user: user }
            });
        }
        catch (e) {
            return res.json({ msg: "Try Again" });
        }
    });
}
