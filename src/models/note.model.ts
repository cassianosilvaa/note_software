import { v4 as createUuid } from "uuid";

export class Note {
    private _id: string;

    constructor(private _detail: string, private _description: string) {
        this._id = createUuid();
    }

    public get description() {
        return this._description;
    }
    public get detail() {
        return this._detail;
    }
    public get id() {
        return this._id;
    }

    public toJson() {
        return {
            id: this._id,
            username: this._description,
            password: this._detail,
        };
    }
}
