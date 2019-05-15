import {Role} from "./roles.model";

export class User {
  constructor (
    public id: number = 0,
    public name: string = '',
    public lastName: string = '',
    public email: string = '',
    public password: string = '',
    public roles?: Role[],
    public active: number = 0) { }
}
// user.roles.forEach(r => console.log("role: " + r.role))
