import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const brands = pgTable("brands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"),
  description: text("description"),
});

export const wheels = pgTable("wheels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  brandId: varchar("brand_id").notNull(),
  description: text("description"),
  images: json("images").$type<string[]>().default([]),
  finishes: json("finishes").$type<string[]>().default([]),
  sizes: json("sizes").$type<string[]>().default([]),
  price: real("price").notNull(),
  pcd: text("pcd"),
  offsetMin: integer("offset_min"),
  offsetMax: integer("offset_max"),
  centerBore: real("center_bore"),
  stock: integer("stock").default(0),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  isNew: boolean("is_new").default(false),
  financeAvailable: boolean("finance_available").default(false),
});

export const fitments = pgTable("fitments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engine: text("engine"),
  wheelSpecs: json("wheel_specs").$type<{
    frontSize: string;
    rearSize: string;
    pcd: string;
    offsetRange: string;
    centerBore: number;
  }>(),
});

export const basketItems = pgTable("basket_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  wheelId: varchar("wheel_id").notNull(),
  quantity: integer("quantity").default(1),
  selectedSize: text("selected_size"),
  selectedFinish: text("selected_finish"),
  sessionId: text("session_id"),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location"),
  rating: integer("rating").default(5),
  comment: text("comment").notNull(),
  avatar: text("avatar"),
  vehicle: text("vehicle"),
});

export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicle: text("vehicle").notNull(),
  wheelInfo: text("wheel_info"),
  image: text("image").notNull(),
  category: text("category").default("all"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
});

export const insertWheelSchema = createInsertSchema(wheels).omit({
  id: true,
});

export const insertFitmentSchema = createInsertSchema(fitments).omit({
  id: true,
});

export const insertBasketItemSchema = createInsertSchema(basketItems).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type Wheel = typeof wheels.$inferSelect;
export type Fitment = typeof fitments.$inferSelect;
export type BasketItem = typeof basketItems.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;

export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type InsertWheel = z.infer<typeof insertWheelSchema>;
export type InsertFitment = z.infer<typeof insertFitmentSchema>;
export type InsertBasketItem = z.infer<typeof insertBasketItemSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
