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
            const { id, noteId } = req.params;

            const database = new UserDatabase();
            const user = database.get(id);

            const userNote = user!.notes;

            console.log(userNote);

            const userNoteIndex = userNote.findIndex(
                (item) => item.id === noteId
            );

            console.log(userNoteIndex);

            if (userNoteIndex < 0) {
                return res.status(404).send({
                    ok: false,
                    message: "Note not found",
                });
            }

            const deletedNote = userNote.splice(userNoteIndex, 1);

            return SuccessResponse.ok(
                res,
                "Note was successfully deleted",
                deletedNote
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public update(req: Request, res: Response) {
        try {
            const { newDescription, newDetail } = req.body;

            const { id, noteId } = req.params;

            const database = new UserDatabase();
            const user = database.get(id);

            const noteIndexFind = user!.notes.findIndex(
                (note) => note.id === noteId
            );

            if (newDescription) {
                user!.notes[noteIndexFind].description = newDescription;
            }

            if (newDetail) {
                user!.notes[noteIndexFind].detail = newDetail;
            }
            return SuccessResponse.ok(
                res,
                "Notes was successfully Edited",
                user!.notes[noteIndexFind]
            );
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
