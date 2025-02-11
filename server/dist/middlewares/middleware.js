"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => {
    console.log("middleware");
    const header = req.headers.authorization;
    if (!header) {
        console.log("no header");
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const token = header.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        //@ts-ignore
        console.log("user", user.id);
        req.user = user;
        next();
    });
};
exports.default = middleware;
