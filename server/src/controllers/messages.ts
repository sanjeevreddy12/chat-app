import { Request, Response } from "express";
import prisma from "../config/db.config";
import { validate as isUuid } from 'uuid'; // Import UUID validation

export async function Retrieve(req: Request, res: Response) {
    const { roomId } = req.params;
   
    const messages = await prisma.chats.findMany({
        where: {
            group_id: roomId
        }
    });
    return res.json({ data: messages });
}