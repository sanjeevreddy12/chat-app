import { Router } from "express";

import { signin } from "../controllers/Auth";
import middleware from "../middlewares/middleware";
import { Chat, getchat, getchats,updatechat,deletechat } from "../controllers/Chat";

const router = Router();

router.post("/auth/signin", signin);
//@ts-ignore

router.post("/chat", middleware, Chat);
//@ts-ignore
router.get("/chat/:id", middleware, getchat);

//@ts-ignore
router.get("/chats", middleware, getchats);

//@ts-ignore
router.put("/chat/:id", middleware, updatechat);

//@ts-ignore
router.delete("/chat/:id", middleware, deletechat);

export default router;
