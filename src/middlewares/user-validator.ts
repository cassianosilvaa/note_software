import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class UserValidatorMiddleware {
    public static validateFieldsCreate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { username, password, confirmPassword } = req.body;

            if (!username) {
                return RequestError.fieldNotProvided(res, "Username");
            }

            let database = new UserDatabase();
            let existUsername = database.getByUsername(username);
            console.log(existUsername);

            if (existUsername) {
                return res.status(400).send({
                    ok: false,
                    message: "Username already exists",
                });
            }

            if (!password) {
                return RequestError.fieldNotProvided(res, "Password");
            }

            if (!confirmPassword) {
                return RequestError.fieldNotProvided(res, "Confirm password");
            }

            if (password !== confirmPassword) {
                res.status(400).send({
                    ok: false,
                    message: "Password does not match",
                });
            }

            next();
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
