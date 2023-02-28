import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { ServerError } from "../errors/server.error";
import { User } from "../models/user.model";
import { SuccessResponse } from "../util/success.response";

export class UserController {
    public list(req: Request, res: Response) {
        try {
            const database = new UserDatabase();
            let users = database.list();

            const result = users.map((user) => user.toJson());

            res.status(200).send({
                ok: true,
                message: "Users successfully listed",
                data: result,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public get(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const database = new UserDatabase();
            const user = database.get(userId);

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found",
                });
            }

            res.status(200).send({
                ok: true,
                message: "User successfully obtained",
                data: user,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public create(req: Request, res: Response) {
        try {
            const { username, password, confirmPassword } = req.body;

            const user = new User(username, password);

            const database = new UserDatabase();
            database.create(user);

            return SuccessResponse.created(
                res,
                "User was successfully created",
                user
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const database = new UserDatabase();
            const userIndex = database.getIndex(id);

            if (userIndex < 0) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found",
                });
            }

            database.delete(userIndex);

            return SuccessResponse.ok(
                res,
                "User was successfully deleted",
                userIndex
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
