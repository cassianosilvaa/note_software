import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { UserController } from "../controllers/user.controller";
import { NoteValidatorMiddleware } from "../middlewares/note-validator";
import { UserValidatorMiddleware } from "../middlewares/user-validator";

export const userRoutes = () => {
    const app = Router();

    app.get("/", new UserController().list);

    app.post(
        "/",
        UserValidatorMiddleware.validateFieldsCreate,
        new UserController().create
    );

    app.post("/:id", new NoteController().create);
    app.delete("/deleteNote/:id/:noteId", new NoteController().delete);

    app.put(
        "/updateNote/:id/:noteId",
        NoteValidatorMiddleware.validateFieldsEdited,
        new NoteController().update
    );

    app.all("/*", (req, res) => {
        res.status(500).send({
            ok: false,
            message: "Route not exist",
        });
    });
    return app;
};
