import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";
import { UrlController } from "../../interfaces/controllers/UrlController.js";
import { CreateShortUrlUseCase } from "../../application/usecases/CreateShortUrlUseCase.js";
import { GetOriginalUrlUseCase } from "../../application/usecases/GetOriginalUrlUseCase.js";
import { PrismaUrlRepository } from "../database/PrismaUrlRepository.js";
import { config } from "../config/config.js";

export const app = express();

// Initialize URL controller for redirects
const urlRepository = new PrismaUrlRepository();
const createShortUrlUseCase = new CreateShortUrlUseCase(urlRepository, config.baseUrl);
const getOriginalUrlUseCase = new GetOriginalUrlUseCase(urlRepository);
const urlController = new UrlController(createShortUrlUseCase, getOriginalUrlUseCase);

app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  credentials: true
}));
app.use(bodyParser.json());

// API routes
app.use("/api", routes);

// Redirect route (not under /api prefix)
app.get("/:code", urlController.redirect);
