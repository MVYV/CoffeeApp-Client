import {Role} from "./roles.model";

export class User {
  constructor (
    public id?: number,
    public userName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public roles?: Role[],
    public isActive?: number) { }
}
