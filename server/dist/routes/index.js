"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const router = (0, express_1.Router)();
router.post("/auth/signin", Auth_1.signin);
exports.default = router;
