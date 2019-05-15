import {Role} from "./role.model";

export class User {
  constructor (
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roles?: Role[] ) { }
}
