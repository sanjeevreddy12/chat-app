import { Router } from "express";

import { signin } from "../controllers/Auth";
import middleware from "../middlewares/middleware";
import { Chat, getchat, getchats,updatechat,deletechat } from "../controllers/Room";
import { Retrieve } from "../controllers/messages";
import { CreateUser, getUsers } from "../controllers/Chat";

const router = Router();

router.post("/auth/signin", signin);
//@ts-ignore

router.post("/chat", middleware, Chat);
//@ts-ignore
router.get("/chat/:id",  getchat);

//@ts-ignore
router.get("/chats", middleware, getchats);

//@ts-ignore
router.put("/chat/:id", middleware, updatechat);

//@ts-ignore
router.delete("/chat/:id", middleware, deletechat);

//@ts-ignore
router.get("/users/:id", getUsers);

//@ts-ignore

router.post("/user", CreateUser);

//@ts-ignore
router.get("/messages/:id", Retrieve);


export default router;
