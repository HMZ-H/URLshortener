import express from "express";
import { UrlController } from "../../interfaces/controllers/UrlController.js";
import { CreateShortUrlUseCase } from "../../application/usecases/CreateShortUrlUseCase.js";
import { GetOriginalUrlUseCase } from "../../application/usecases/GetOriginalUrlUseCase.js";
import { PrismaUrlRepository } from "../database/PrismaUrlRepository.js";
import { config } from "../config/config.js";

const router = express.Router();

const urlRepository = new PrismaUrlRepository();
const createShortUrlUseCase = new CreateShortUrlUseCase(urlRepository, config.baseUrl);
const getOriginalUrlUseCase = new GetOriginalUrlUseCase(urlRepository);
const urlController = new UrlController(createShortUrlUseCase, getOriginalUrlUseCase);

router.post("/shorten", urlController.shorten);
router.get("/analytics/:code", urlController.getAnalytics);
router.get("/analytics/overall", urlController.getOverallAnalytics);
router.get("/clicks/:code", urlController.getClicks);

export default router;
