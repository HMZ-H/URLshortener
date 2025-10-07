import type { IUrlRepository } from "../../domain/repositories/IUrlRepository.js";

export class GetOriginalUrlUseCase {
  constructor(private urlRepository: IUrlRepository) {}

  async execute(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) throw new Error("URL not found");
    return url.originalUrl;
  }
}
