import type { Request, Response } from "express";
import { CreateShortUrlUseCase } from "../../application/usecases/CreateShortUrlUseCase.js";
import { GetOriginalUrlUseCase } from "../../application/usecases/GetOriginalUrlUseCase.js";

export class UrlController {
  constructor(
    private createShortUrlUseCase: CreateShortUrlUseCase,
    private getOriginalUrlUseCase: GetOriginalUrlUseCase
  ) {}

  shorten = async (req: Request, res: Response): Promise<void> => {
    try {
      const { originalUrl } = req.body;
      if (!originalUrl) {
        res.status(400).json({ error: "originalUrl is required" });
        return;
      }
      const shortUrl = await this.createShortUrlUseCase.execute(originalUrl);
      res.json({ shortUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  redirect = async (req: Request, res: Response): Promise<void> => {
    try {
      const { code } = req.params;
      if (!code) {
        res.status(400).send("Short code is required");
        return;
      }
      const originalUrl = await this.getOriginalUrlUseCase.execute(code);
      res.redirect(originalUrl);
    } catch {
      res.status(404).send("URL not found");
    }
  };

  getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { code } = req.params;
      if (!code) {
        res.status(400).json({ error: "Short code is required" });
        return;
      }
      
      // Mock analytics data for now - replace with real database queries
      const analytics = {
        totalClicks: Math.floor(Math.random() * 1000) + 100,
        topCountries: [
          { country: "United States", clicks: Math.floor(Math.random() * 200) + 50 },
          { country: "United Kingdom", clicks: Math.floor(Math.random() * 100) + 20 },
          { country: "Canada", clicks: Math.floor(Math.random() * 80) + 15 }
        ],
        topReferrers: [
          { referrer: "google.com", clicks: Math.floor(Math.random() * 150) + 30 },
          { referrer: "facebook.com", clicks: Math.floor(Math.random() * 100) + 20 },
          { referrer: "twitter.com", clicks: Math.floor(Math.random() * 50) + 10 }
        ],
        dailyClicks: [
          { date: "2024-01-15", clicks: Math.floor(Math.random() * 50) + 5 },
          { date: "2024-01-14", clicks: Math.floor(Math.random() * 40) + 3 },
          { date: "2024-01-13", clicks: Math.floor(Math.random() * 60) + 8 },
          { date: "2024-01-12", clicks: Math.floor(Math.random() * 30) + 2 },
          { date: "2024-01-11", clicks: Math.floor(Math.random() * 45) + 6 }
        ]
      };
      
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getOverallAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      // Mock overall analytics data - replace with real database queries
      const overallAnalytics = {
        totalClicks: Math.floor(Math.random() * 5000) + 1000,
        uniqueVisitors: Math.floor(Math.random() * 3000) + 800,
        topCountry: "United States",
        topCountries: [
          { country: "United States", clicks: Math.floor(Math.random() * 1000) + 500 },
          { country: "United Kingdom", clicks: Math.floor(Math.random() * 500) + 200 },
          { country: "Canada", clicks: Math.floor(Math.random() * 400) + 150 }
        ],
        topReferrers: [
          { referrer: "google.com", clicks: Math.floor(Math.random() * 800) + 300 },
          { referrer: "facebook.com", clicks: Math.floor(Math.random() * 600) + 200 },
          { referrer: "twitter.com", clicks: Math.floor(Math.random() * 300) + 100 },
          { referrer: "linkedin.com", clicks: Math.floor(Math.random() * 200) + 50 }
        ],
        dailyClicks: [
          { date: "2024-01-15", clicks: Math.floor(Math.random() * 200) + 50 },
          { date: "2024-01-14", clicks: Math.floor(Math.random() * 180) + 40 },
          { date: "2024-01-13", clicks: Math.floor(Math.random() * 220) + 60 },
          { date: "2024-01-12", clicks: Math.floor(Math.random() * 160) + 30 },
          { date: "2024-01-11", clicks: Math.floor(Math.random() * 190) + 45 }
        ]
      };
      
      res.json(overallAnalytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getClicks = async (req: Request, res: Response): Promise<void> => {
    try {
      const { code } = req.params;
      if (!code) {
        res.status(400).json({ error: "Short code is required" });
        return;
      }
      
      // Mock click count - replace with real database query
      const clicks = Math.floor(Math.random() * 100) + 10;
      
      res.json({ clicks });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
