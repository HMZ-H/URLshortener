import { Prisma, type Url } from "@prisma/client";
import { UrlEntity } from "../../domain/entities/UrlEntity.js";
import type { IUrlRepository } from "../../domain/repositories/IUrlRepository.js";
import { prisma } from "./prismaClient.js";


export class PrismaUrlRepository implements IUrlRepository {
    async create(url: UrlEntity): Promise<UrlEntity> {
        const record = await prisma.url.create({
            data: {
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
            },
        });
        return new UrlEntity(record.id, record.originalUrl, record.shortCode, record.createdAt);
    }

    async findByShortCode(shortCode: string): Promise<UrlEntity | null> {
        const record = await prisma.url.findUnique({where: {shortCode}});
        return record
            ? new UrlEntity(record.id, record.originalUrl, record.shortCode, record.createdAt)
            : null;
    }
}