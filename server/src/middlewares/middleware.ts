import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
    id: string;
    name: string;
    email: string;
}

const middleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware");
    const header = req.headers.authorization;
    
    if (!header) {
        console.log("no header");
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const token = header.split(" ")[1];
    
    jwt.verify(token, process.env.JWTSECRET as string, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        //@ts-ignore
        console.log("user", user.id);
        
        (req as any).user = user;
        next();
    });
};

export default middleware;
