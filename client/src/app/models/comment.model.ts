export class Comment {
  constructor (
    public id?: number,
    public commentText?: string,
    public productId?: number,
    public newsId?: number,
    public userId?: number,
    public fullName?: string,
    public commentDate?: any) {}
}
