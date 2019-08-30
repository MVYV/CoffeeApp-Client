import { Role } from "./roles.model";

export class User {
  constructor (
    public id?: number,
    public userName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public roles?: any,
    public isActive?: number,
    public country?: string,
    public city?: string,
    public dateOfBirth?: any,
    public gender?: string,
    public avatar?: string ) { }
}
