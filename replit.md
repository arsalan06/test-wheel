# replit.md

## Overview

This is a responsive ecommerce-style wheel retailer website built with React 18, Vite, TypeScript, and modern UI components. The application provides a comprehensive platform for browsing, filtering, and purchasing automotive wheels, complete with fitment finding, shopping cart functionality, and customer galleries. The project follows a full-stack architecture with both client-side React application and Express.js backend API.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for lightweight client state management
- **Data Fetching**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form with Zod validation schemas
- **Styling**: Tailwind CSS with CSS custom properties for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type consistency across the stack
- **API Design**: RESTful API endpoints with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot module replacement with Vite integration in development mode
- **Logging**: Custom request/response logging middleware for API monitoring

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle Kit
- **ORM**: Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL connection
- **Schema Management**: Schema definitions in shared TypeScript files
- **Migrations**: Automated schema migrations via Drizzle Kit

### Component Architecture
- **Design System**: Consistent component library following atomic design principles
- **Layout Structure**: App shell pattern with persistent header, footer, and navigation
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Theme System**: CSS custom properties with dark/light mode support
- **Icon System**: Lucide React icons for consistent visual language

### Data Models
The application uses a relational data structure with the following core entities:
- **Users**: Authentication and user management
- **Brands**: Wheel manufacturer information
- **Wheels**: Product catalog with specifications, pricing, and inventory
- **Fitments**: Vehicle compatibility data for precise wheel matching
- **Basket Items**: Shopping cart functionality with session management
- **Testimonials**: Customer reviews and ratings
- **Gallery Images**: Customer photo uploads categorized by vehicle type

### API Structure
RESTful endpoints organized by resource:
- `/api/brands` - Brand catalog management
- `/api/wheels` - Product catalog with advanced filtering
- `/api/fitments` - Vehicle compatibility lookup
- `/api/testimonials` - Customer feedback system
- `/api/gallery` - Image gallery management
- `/api/contact` - Contact form handling
- `/api/newsletter` - Email subscription management

## External Dependencies

### Core Framework Dependencies
- **React 18**: Modern React with concurrent features
- **Vite**: Next-generation frontend build tool
- **TypeScript**: Static type checking
- **Express.js**: Web application framework for Node.js

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Utility for managing component variants

### Database and ORM
- **PostgreSQL**: Primary database (configured for Neon Database)
- **Drizzle ORM**: TypeScript-first ORM
- **Drizzle Kit**: Database toolkit for migrations
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### State Management and Data Fetching
- **TanStack React Query**: Server state management
- **Zustand**: Client state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Development Tools
- **ESLint & Prettier**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Specialized Libraries
- **Wouter**: Minimalist routing
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel component
- **cmdk**: Command palette component
- **react-helmet-async**: Document head management

The architecture emphasizes type safety, performance, and maintainability with a clear separation of concerns between client and server code. The shared schema approach ensures consistency across the full stack while enabling independent development of frontend and backend components.