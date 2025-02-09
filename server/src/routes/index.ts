import { Router } from "express";

import { signin } from "../controllers/Auth";

const router = Router();

router.post("/auth/signin", signin);

export default router;
