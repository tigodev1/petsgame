# Virtual Pet 3D Game

## Overview

This is a 3D virtual pet simulation game built with React, Three.js, and Express. Players can adopt different pet species, customize their appearance, care for their pets, play mini-games, and decorate their virtual home environment. The application uses a full-stack architecture with a React frontend, Express backend, and Drizzle ORM for database management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js via React Three Fiber (@react-three/fiber)
- **3D Utilities**: React Three Drei for enhanced 3D components
- **UI Components**: Custom component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global application state
- **Build Tool**: Vite with custom configuration for 3D assets

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Server**: Hot module replacement via Vite middleware
- **Asset Handling**: Static file serving with 3D model support

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Local Storage**: Browser localStorage for client-side game state persistence
- **In-Memory Storage**: Fallback MemStorage implementation for development

## Key Components

### Game Core Systems
1. **Pet Management**: Pet adoption, stat tracking (hunger, happiness, energy), and leveling system
2. **3D Rendering**: Real-time 3D pet visualization with animations and environmental interactions
3. **Customization System**: Pet accessories and home theme decoration system
4. **Mini-Games**: Interactive games for earning coins and improving pet stats
5. **Audio System**: Background music and sound effects with mute controls

### State Management Stores
- `usePetStore`: Manages pet data, stats, accessories, and coins
- `useGameStore`: Handles game phases, room themes, and camera controls
- `useAudio`: Controls audio playback and mute functionality

### 3D Components
- `Game3D`: Main 3D scene orchestrator with camera controls
- `Pet3D`: 3D pet model with AI movement and animations
- `Environment3D`: Room environments with different themes
- `GameUI`: Overlay interface for game controls and stats

## Data Flow

1. **Game Initialization**: Player starts at adoption phase if no pet exists
2. **Pet Creation**: Player selects species and name, creates pet with base stats
3. **Game Loop**: Real-time stat decay, AI pet movement, player interactions
4. **Persistence**: Game state automatically saved to localStorage
5. **Database Sync**: User data can be synchronized to PostgreSQL backend

## External Dependencies

### Core Framework Dependencies
- React ecosystem: `react`, `@vitejs/plugin-react`
- Three.js ecosystem: `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- State management: `zustand`
- Database: `drizzle-orm`, `@neondatabase/serverless`

### UI and Styling
- Component library: `@radix-ui` components for accessible UI primitives
- Styling: `tailwindcss`, `autoprefixer`, `postcss`
- Icons: `lucide-react`
- Fonts: `@fontsource/inter`

### Development Tools
- Build tooling: `vite`, `esbuild`, `tsx`
- Type checking: `typescript`
- Database tooling: `drizzle-kit`

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR on port 3000
- **Backend**: Express server with tsx runtime on port 3001
- **Database**: Development connection to Neon Database
- **Asset Pipeline**: Vite handles 3D models, textures, and audio files

### Production Build
- **Frontend**: Static build output to `dist/public`
- **Backend**: ESBuild bundle to `dist/index.js`
- **Database**: Production PostgreSQL via environment variables
- **Deployment**: Single server deployment with static file serving

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)
- Asset serving configured for 3D file formats (GLTF, GLB, audio)

## Changelog

Changelog:
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.