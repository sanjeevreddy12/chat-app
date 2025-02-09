import {Request, Response} from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";

interface signinBody {
    email: string;
    name: string;
    provider: string;
    oauth_id: string;
    image?: string;
}

export const signin = async(req: Request, res: Response): Promise<void> => {
    try {
        const body: signinBody = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        
        if(!user) {
            await prisma.user.create({
                data: body
            });
        }
        
        const jwtpayload = {
            name: body.name,
            email: body.email,
            id: user?.id,
        };
        
        const token = jwt.sign(jwtpayload, process.env.JWTSECRET as string);
        res.status(200).json({
            message: "User Loggedin Successfully",
            user: {
                ...user,
                token: `Bearer ${token}`
            }
        });
    } catch(e) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}