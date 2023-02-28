import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { ServerError } from "../errors/server.error";
import { Note } from "../models/note.model";
import { SuccessResponse } from "../util/success.response";

export class NoteController {
    public create(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { description, detail } = req.body;
            const database = new UserDatabase();

            if (!description) {
                return res.status(400).send({
                    ok: false,
                    message: "Description were not provided",
                });
            }
            if (!detail) {
                return res.status(400).send({
                    ok: false,
                    message: "Detail were not provided",
                });
            }

            const user = database.get(id);

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found",
                });
            }

            let newNotes = new Note(detail, description);
            user.notes = user.notes.concat(newNotes);
            return SuccessResponse.created(
                res,
                "Notes was successfully created",
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
