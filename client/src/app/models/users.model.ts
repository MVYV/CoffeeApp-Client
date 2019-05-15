export class User {
  constructor (
    public id: number = 0,
    public name: string = '',
    public lastName: string = '',
    public email: string = '',
    public password: string = '',
    public role: string = '',
    public active: number = 0) { }
}
