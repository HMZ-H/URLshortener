import { UrlEntity } from "../entities/UrlEntity.js";

export interface IUrlRepository {
  create(url: UrlEntity): Promise<UrlEntity>;
  findByShortCode(shortCode: string): Promise<UrlEntity | null>;
}
