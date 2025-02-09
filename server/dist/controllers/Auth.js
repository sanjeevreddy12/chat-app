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
exports.signin = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield db_config_1.default.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            yield db_config_1.default.user.create({
                data: body
            });
        }
        const jwtpayload = {
            name: body.name,
            email: body.email,
            id: user === null || user === void 0 ? void 0 : user.id,
        };
        const token = jsonwebtoken_1.default.sign(jwtpayload, process.env.JWTSECRET);
        res.status(200).json({
            message: "User Loggedin Successfully",
            user: Object.assign(Object.assign({}, user), { token: `Bearer ${token}` })
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.signin = signin;
