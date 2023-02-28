import { User } from "../models/user.model";
import { users } from "./users";

export class UserDatabase {
    public get(id: string) {
        return users.find((user) => user.id === id);
    }

    public list() {
        return [...users];
    }
    public create(user: User) {
        users.unshift(user);
    }

    public getByUsername(username: string) {
        return users.find((user) => user.username === username);
    }

    public getIndex(id: string) {
        return users.findIndex((user) => user.id === id);
    }

    public delete(index: number) {
        users.splice(index, 1);
    }
}
