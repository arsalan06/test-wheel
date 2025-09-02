import { 
  type User, 
  type InsertUser, 
  type Brand, 
  type InsertBrand,
  type Wheel, 
  type InsertWheel,
  type Fitment,
  type InsertFitment,
  type BasketItem,
  type InsertBasketItem,
  type Testimonial,
  type InsertTestimonial,
  type GalleryImage,
  type InsertGalleryImage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Brands
  getBrands(): Promise<Brand[]>;
  getBrand(id: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  // Wheels
  getWheels(filters?: {
    brandIds?: string[];
    sizes?: string[];
    finishes?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    sortBy?: string;
  }): Promise<Wheel[]>;
  getWheel(id: string): Promise<Wheel | undefined>;
  createWheel(wheel: InsertWheel): Promise<Wheel>;
  
  // Fitments
  getFitments(): Promise<Fitment[]>;
  getFitmentsByVehicle(make: string, model?: string, year?: number): Promise<Fitment[]>;
  createFitment(fitment: InsertFitment): Promise<Fitment>;
  
  // Basket
  getBasketItems(sessionId: string): Promise<BasketItem[]>;
  addToBasket(item: InsertBasketItem): Promise<BasketItem>;
  removeFromBasket(id: string): Promise<void>;
  clearBasket(sessionId: string): Promise<void>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Gallery
  getGalleryImages(category?: string): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private brands: Map<string, Brand>;
  private wheels: Map<string, Wheel>;
  private fitments: Map<string, Fitment>;
  private basketItems: Map<string, BasketItem>;
  private testimonials: Map<string, Testimonial>;
  private galleryImages: Map<string, GalleryImage>;

  constructor() {
    this.users = new Map();
    this.brands = new Map();
    this.wheels = new Map();
    this.fitments = new Map();
    this.basketItems = new Map();
    this.testimonials = new Map();
    this.galleryImages = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private async initializeData() {
    // Create sample brands
    const bbsBrand = await this.createBrand({ name: "BBS", description: "Premium German wheel manufacturer" });
    const ozBrand = await this.createBrand({ name: "OZ Racing", description: "Italian racing heritage" });
    const enkeiBrand = await this.createBrand({ name: "Enkei", description: "Japanese performance wheels" });
    const raysBrand = await this.createBrand({ name: "Rays", description: "JDM performance specialists" });
    const vossenBrand = await this.createBrand({ name: "Vossen", description: "Luxury forged wheels" });
    const hreBrand = await this.createBrand({ name: "HRE", description: "American forged excellence" });

    // Create sample wheels
    await this.createWheel({
      name: "BBS CH-R II",
      brandId: bbsBrand.id,
      description: "Satin Black with Stainless Steel Rim",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
      finishes: ["Satin Black", "Silver", "Gold"],
      sizes: ["18x8", "19x8.5", "20x9"],
      price: 485,
      pcd: "5x112",
      offsetMin: 25,
      offsetMax: 45,
      centerBore: 66.6,
      stock: 12,
      rating: 4.8,
      reviewCount: 24,
      isNew: true,
      financeAvailable: true,
    });

    await this.createWheel({
      name: "OZ Superturismo GT",
      brandId: ozBrand.id,
      description: "Race White with Red Lettering",
      images: ["https://pixabay.com/get/gf602187d46c5c0b5a42c624da685303f08febebc90845adc2ab52c45dff4e021638d411c8620fb518a317fc667ccca8545374ff2378977b2afb954d5bca79472_1280.jpg"],
      finishes: ["Race White", "Matt Black", "Anthracite"],
      sizes: ["17x7.5", "18x8", "19x8.5"],
      price: 325,
      pcd: "5x100",
      offsetMin: 35,
      offsetMax: 48,
      centerBore: 68.0,
      stock: 3,
      rating: 4.6,
      reviewCount: 18,
      isNew: false,
      financeAvailable: false,
    });

    // Add more sample wheels...
    await this.createWheel({
      name: "Vossen CV3-R",
      brandId: vossenBrand.id,
      description: "Gloss Graphite Machined",
      images: ["https://pixabay.com/get/g764b2253d937a792221c545ef6d39abb80662056452b16b82fb369deda81d4cbd996a21711b661692f2fd515fd9d3583a7d813654d463302ad4f14247d262a69_1280.jpg"],
      finishes: ["Gloss Graphite", "Matte Black", "Silver"],
      sizes: ["19x8.5", "19x9.5", "20x10"],
      price: 745,
      pcd: "5x120",
      offsetMin: 20,
      offsetMax: 35,
      centerBore: 72.6,
      stock: 8,
      rating: 5.0,
      reviewCount: 31,
      isNew: false,
      financeAvailable: true,
    });

    await this.createWheel({
      name: "HRE P111SC",
      brandId: hreBrand.id,
      description: "Satin Charcoal",
      images: ["https://pixabay.com/get/ge9675550ea05298b8bcb14b4120f6dc677d65c479af9a7508e9eaf0326d420cf11eb258c52d1f492ea5ccb50b7727cc90b00dd0fcc1f45b6c89c6b6a82bf86a8_1280.jpg"],
      finishes: ["Satin Charcoal", "Gloss Black", "Brushed"],
      sizes: ["20x9", "20x10.5", "21x12"],
      price: 1240,
      pcd: "5x114.3",
      offsetMin: 15,
      offsetMax: 30,
      centerBore: 70.3,
      stock: 0,
      rating: 5.0,
      reviewCount: 12,
      isNew: false,
      financeAvailable: true,
    });

    await this.createWheel({
      name: "Enkei RPF1",
      brandId: enkeiBrand.id,
      description: "Matte Black",
      images: ["https://pixabay.com/get/gb23364a5ea198b44c5493c5f6a07efea1e859e8172fe5eb3936387dc8e97a4e2e3b96933fa0697f69bf723ad2a71144fa62e576116410ff113c8d31c22338541_1280.jpg"],
      finishes: ["Matte Black", "Silver", "White"],
      sizes: ["17x9", "18x9.5", "18x10.5"],
      price: 225,
      pcd: "5x114.3",
      offsetMin: 12,
      offsetMax: 38,
      centerBore: 73.1,
      stock: 15,
      rating: 4.7,
      reviewCount: 67,
      isNew: false,
      financeAvailable: false,
    });

    await this.createWheel({
      name: "Rays TE37 Ultra",
      brandId: raysBrand.id,
      description: "Diamond Silver",
      images: ["https://pixabay.com/get/g279279a1be8d101235047fbb0b00c1c4ee9622d218b18edc39abbd562792c74d387e6b2e4a612dc55b931f2cd3123547c548a6b61e781c34356cac7ba5cb360b_1280.jpg"],
      finishes: ["Diamond Silver", "Bronze", "White"],
      sizes: ["18x9.5", "18x10.5"],
      price: 890,
      pcd: "5x114.3",
      offsetMin: 12,
      offsetMax: 22,
      centerBore: 73.1,
      stock: 6,
      rating: 5.0,
      reviewCount: 45,
      isNew: false,
      financeAvailable: true,
    });

    // Create sample fitments
    await this.createFitment({
      make: "BMW",
      model: "M3",
      year: 2020,
      engine: "Competition",
      wheelSpecs: {
        frontSize: "19x9.5",
        rearSize: "19x10.5",
        pcd: "5x120",
        offsetRange: "22-35",
        centerBore: 72.6,
      },
    });

    await this.createFitment({
      make: "Audi",
      model: "A4",
      year: 2019,
      engine: "2.0T",
      wheelSpecs: {
        frontSize: "18x8",
        rearSize: "18x8",
        pcd: "5x112",
        offsetRange: "35-45",
        centerBore: 66.6,
      },
    });

    // Create sample testimonials
    await this.createTestimonial({
      name: "James Mitchell",
      location: "London, UK",
      rating: 5,
      comment: "Exceptional service and quality. The team helped me find the perfect wheels for my BMW and the fitment was flawless. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
      vehicle: "BMW M3 Competition",
    });

    await this.createTestimonial({
      name: "Sarah Johnson",
      location: "Manchester, UK",
      rating: 5,
      comment: "Outstanding customer service and expertise. They guided me through the entire process and delivered exactly what they promised.",
      avatar: "https://pixabay.com/get/g83d3a67aad1bafa722ec4e3ce8ab22c1ca4c09062a17f835bff5b895b0b7d727df7d03c8d0f1c65605c643ba966e46ebf62645987f5fa188a8bd07381783bec0_1280.jpg",
      vehicle: "Mercedes-Benz S-Class",
    });

    await this.createTestimonial({
      name: "Michael Chen",
      location: "Birmingham, UK",
      rating: 5,
      comment: "Best wheel supplier I've used. Competitive prices, fast delivery, and the quality is top-notch. Will definitely use again.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
      vehicle: "Porsche 911 GT3",
    });

    // Create sample gallery images
    await this.createGalleryImage({
      vehicle: "BMW M3 Competition",
      wheelInfo: "BBS CH-R II 19x9.5",
      image: "https://pixabay.com/get/g3d8af527ecbf2d351846f2c205b5e6bbe2b4fa497235a85377046e3faf14e4af0b4d03ec6b0499d8169154bf77e3d649cb9f0f5df24ebee81a6a87847fe9eae5_1280.jpg",
      category: "sports",
    });

    await this.createGalleryImage({
      vehicle: "Mercedes-Benz S-Class",
      wheelInfo: "Vossen VFS-1 20x10",
      image: "https://pixabay.com/get/g8a0d220eff7c61491b51adbbc0f049138e2c9930d3281f5cc082ca1ef10882d754ea87a17eacac4dea5a522708f634fa242e8b79198efa2ea47ff7a40c3a61c9_1280.jpg",
      category: "luxury",
    });

    await this.createGalleryImage({
      vehicle: "Ford F-150 Raptor",
      wheelInfo: "Method 501 VT-Spec 17x8.5",
      image: "https://pixabay.com/get/g03eb205bfc6d75bf49d3d86c1dc8877a460ff672254a935701a59c039ab1b852129984d75bb33346acf4cdd2957e8e152704fea780c4c2809c4200f435eeddf3_1280.jpg",
      category: "offroad",
    });

    await this.createGalleryImage({
      vehicle: "Porsche 911 GT3",
      wheelInfo: "OZ Superturismo 19x11",
      image: "https://pixabay.com/get/g3eda435662f4feb62c5d68634e249309bf0331b32a0f57463445e73f8a166f8da385fb69af8c6dff62bb61d5c7eb0bccdfe7fc99bf1bcfdde677a23a74313d87_1280.jpg",
      category: "sports",
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrand(id: string): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = randomUUID();
    const brand: Brand = { ...insertBrand, id };
    this.brands.set(id, brand);
    return brand;
  }

  // Wheel methods
  async getWheels(filters?: {
    brandIds?: string[];
    sizes?: string[];
    finishes?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    sortBy?: string;
  }): Promise<Wheel[]> {
    let wheels = Array.from(this.wheels.values());

    if (filters) {
      if (filters.brandIds?.length) {
        wheels = wheels.filter(wheel => filters.brandIds!.includes(wheel.brandId));
      }
      
      if (filters.sizes?.length) {
        wheels = wheels.filter(wheel => 
          wheel.sizes.some(size => filters.sizes!.includes(size))
        );
      }
      
      if (filters.finishes?.length) {
        wheels = wheels.filter(wheel => 
          wheel.finishes.some(finish => filters.finishes!.includes(finish))
        );
      }
      
      if (filters.minPrice !== undefined) {
        wheels = wheels.filter(wheel => wheel.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        wheels = wheels.filter(wheel => wheel.price <= filters.maxPrice!);
      }
      
      if (filters.inStockOnly) {
        wheels = wheels.filter(wheel => wheel.stock > 0);
      }
      
      // Sorting
      switch (filters.sortBy) {
        case "price_asc":
          wheels.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          wheels.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          wheels.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          wheels.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          wheels.sort((a, b) => b.rating - a.rating);
      }
    }

    return wheels;
  }

  async getWheel(id: string): Promise<Wheel | undefined> {
    return this.wheels.get(id);
  }

  async createWheel(insertWheel: InsertWheel): Promise<Wheel> {
    const id = randomUUID();
    const wheel: Wheel = { ...insertWheel, id };
    this.wheels.set(id, wheel);
    return wheel;
  }

  // Fitment methods
  async getFitments(): Promise<Fitment[]> {
    return Array.from(this.fitments.values());
  }

  async getFitmentsByVehicle(make: string, model?: string, year?: number): Promise<Fitment[]> {
    let fitments = Array.from(this.fitments.values());
    
    fitments = fitments.filter(f => f.make.toLowerCase() === make.toLowerCase());
    
    if (model) {
      fitments = fitments.filter(f => f.model.toLowerCase() === model.toLowerCase());
    }
    
    if (year) {
      fitments = fitments.filter(f => f.year === year);
    }
    
    return fitments;
  }

  async createFitment(insertFitment: InsertFitment): Promise<Fitment> {
    const id = randomUUID();
    const fitment: Fitment = { ...insertFitment, id };
    this.fitments.set(id, fitment);
    return fitment;
  }

  // Basket methods
  async getBasketItems(sessionId: string): Promise<BasketItem[]> {
    return Array.from(this.basketItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToBasket(insertItem: InsertBasketItem): Promise<BasketItem> {
    const id = randomUUID();
    const item: BasketItem = { ...insertItem, id };
    this.basketItems.set(id, item);
    return item;
  }

  async removeFromBasket(id: string): Promise<void> {
    this.basketItems.delete(id);
  }

  async clearBasket(sessionId: string): Promise<void> {
    const items = await this.getBasketItems(sessionId);
    items.forEach(item => this.basketItems.delete(item.id));
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Gallery methods
  async getGalleryImages(category?: string): Promise<GalleryImage[]> {
    let images = Array.from(this.galleryImages.values());
    
    if (category && category !== "all") {
      images = images.filter(image => image.category === category);
    }
    
    return images;
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = { ...insertImage, id };
    this.galleryImages.set(id, image);
    return image;
  }
}

export const storage = new MemStorage();
