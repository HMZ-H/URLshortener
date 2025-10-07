import crypto from 'crypto';
import type { IUrlRepository } from '../../domain/repositories/IUrlRepository.js';
import { UrlEntity } from '../../domain/entities/UrlEntity.js';


export class CreateShortUrlUseCase {
    constructor(private urlRepository: IUrlRepository, private baseUrl: string) {}
    async execute(originalUrl: string): Promise<string> {
        const shortCode = crypto.randomBytes(4).toString("hex");
        const urlEntity = new UrlEntity(null, originalUrl, shortCode);
        await this.urlRepository.create(urlEntity);
        return `${this.baseUrl}/${shortCode}`;
    }
}