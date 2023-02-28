import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { UserController } from "../controllers/user.controller";
import { UserValidatorMiddleware } from "../middlewares/user-validator";

export const userRoutes = () => {
    const app = Router();

    app.get("/", new UserController().list);

    app.post(
        "/",
        UserValidatorMiddleware.validateFieldsCreate,
        new UserController().create
    );

    app.delete("/:id", new UserController().delete);

    app.post("/:id", new NoteController().create);
    app.post("/:id", new NoteController().delete);

    return app;
};
