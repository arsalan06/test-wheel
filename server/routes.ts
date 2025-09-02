import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBasketItemSchema, insertTestimonialSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Brands API
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  // Wheels API
  app.get("/api/wheels", async (req, res) => {
    try {
      const filters = {
        brandIds: req.query.brandIds ? (req.query.brandIds as string).split(',') : undefined,
        sizes: req.query.sizes ? (req.query.sizes as string).split(',') : undefined,
        finishes: req.query.finishes ? (req.query.finishes as string).split(',') : undefined,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        inStockOnly: req.query.inStockOnly === 'true',
        sortBy: req.query.sortBy as string,
      };
      
      const wheels = await storage.getWheels(filters);
      res.json(wheels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wheels" });
    }
  });

  app.get("/api/wheels/:id", async (req, res) => {
    try {
      const wheel = await storage.getWheel(req.params.id);
      if (!wheel) {
        return res.status(404).json({ error: "Wheel not found" });
      }
      res.json(wheel);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wheel" });
    }
  });

  // Fitments API
  app.get("/api/fitments", async (req, res) => {
    try {
      const { make, model, year } = req.query;
      const fitments = await storage.getFitmentsByVehicle(
        make as string,
        model as string,
        year ? parseInt(year as string) : undefined
      );
      res.json(fitments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fitments" });
    }
  });

  // Vehicle data API
  app.get("/api/vehicles/makes", async (req, res) => {
    try {
      const fitments = await storage.getFitments();
      const makes = [...new Set(fitments.map(f => f.make))].sort();
      res.json(makes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicle makes" });
    }
  });

  app.get("/api/vehicles/:make/models", async (req, res) => {
    try {
      const fitments = await storage.getFitmentsByVehicle(req.params.make);
      const models = [...new Set(fitments.map(f => f.model))].sort();
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicle models" });
    }
  });

  app.get("/api/vehicles/:make/:model/years", async (req, res) => {
    try {
      const fitments = await storage.getFitmentsByVehicle(req.params.make, req.params.model);
      const years = [...new Set(fitments.map(f => f.year))].sort((a, b) => b - a);
      res.json(years);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicle years" });
    }
  });

  // Basket API
  app.get("/api/basket/:sessionId", async (req, res) => {
    try {
      const items = await storage.getBasketItems(req.params.sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch basket items" });
    }
  });

  app.post("/api/basket", async (req, res) => {
    try {
      const validatedData = insertBasketItemSchema.parse(req.body);
      const item = await storage.addToBasket(validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to add item to basket" });
    }
  });

  app.delete("/api/basket/:id", async (req, res) => {
    try {
      await storage.removeFromBasket(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from basket" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  // Gallery API
  app.get("/api/gallery", async (req, res) => {
    try {
      const category = req.query.category as string;
      const images = await storage.getGalleryImages(category);
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  // Contact form API
  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        vehicle: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      });
      
      const validatedData = contactSchema.parse(req.body);
      
      // In a real app, this would send an email or save to database
      console.log("Contact form submission:", validatedData);
      
      res.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Newsletter subscription API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterSchema = z.object({
        email: z.string().email("Invalid email address"),
      });
      
      const validatedData = newsletterSchema.parse(req.body);
      
      // In a real app, this would add to newsletter service
      console.log("Newsletter subscription:", validatedData);
      
      res.json({ success: true, message: "Successfully subscribed to newsletter!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address", details: error.errors });
      }
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
