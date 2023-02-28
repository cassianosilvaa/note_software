import { v4 as createUuid } from "uuid";
import { Note } from "./note.model";

export class User {
    private _id: string;

    constructor(
        private _userName: string,
        private _password: string,
        private _notes?: Note[]
    ) {
        this._id = createUuid();
    }

    public get username() {
        return this._userName;
    }
    public get password() {
        return this._password;
    }
    public get id() {
        return this._id;
    }
    public get notes() {
        return this._notes ?? [];
    }
    public set notes(notes: Note[]) {
        this._notes = notes;
    }

    public toJson() {
        return {
            id: this._id,
            username: this._userName,
            password: this._password,
            notes: this._notes,
        };
    }
}
