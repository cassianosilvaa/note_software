import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class NoteValidatorMiddleware {
    public static validateFieldsEdited(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id, noteId } = req.params;

            if (!id) {
                return RequestError.fieldNotProvided(res, "Username");
            }

            let database = new UserDatabase();
            let existUsername = database.get(id);

            if (!existUsername) {
                return res.status(400).send({
                    ok: false,
                    message: "Username not exists",
                });
            }

            let findIndexNoteId = existUsername.notes.findIndex((note) => {
                return note.id === noteId;
            });

            if (findIndexNoteId < 0) {
                return res.status(400).send({
                    ok: false,
                    message: "Note not exists",
                });
            }
            next();
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
