export class UrlEntity {
  constructor(
    public id: number | null,
    public originalUrl: string,
    public shortCode: string,
    public createdAt: Date = new Date()
  ) {}
}
