# E-32 Exo AI Frontend

> AI-powered exoplanet detection and analysis platform using machine learning to identify and characterize exoplanets from transit parameters.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)

## 📋 Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [Forms and Validation](#forms-and-validation)
- [Internationalization](#internationalization)
- [Animations and Interactions](#animations-and-interactions)
- [Contributing](#contributing)
- [License](#license)

## 🌌 Overview

E-32 Exo AI is a cutting-edge web application that democratizes exoplanet detection. By leveraging ensemble machine learning models (Random Forest and Histogram Gradient Boosting), the platform analyzes transit parameters to determine the likelihood of a celestial body being an exoplanet.

The application serves two primary user groups:
- **General Users**: Simplified form with essential transit parameters
- **Scientists/Researchers**: Advanced form with computed fields for precise predictions

## Demo 📷
https://github.com/user-attachments/assets/d755f102-ce21-4dbd-ae59-ab0d67fc5a20


## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Detection**: Ensemble ML models (Random Forest, Histogram Gradient Boosting) for accurate predictions
- 📊 **Dual Interface**: User-friendly and scientist-focused forms
- 🌍 **Interactive Visualizations**: 3D planet displays, animated globes, and surface textures
- 📈 **Comprehensive Dashboard**: Model metrics, feature importance, and explainability data
- 🔬 **Scientific Analysis**: Detailed planet characteristics, stellar parameters, and habitability scores
- 🌐 **Bilingual Support**: Full internationalization (English and Portuguese)

### User Experience
- ⚡ **Real-time Validation**: Form validation with Zod schemas and React Hook Form
- 🎨 **Modern UI**: Built with Shadcn UI, Radix UI, and Tailwind CSS
- 📱 **Responsive Design**: Mobile-first approach for all device sizes
- 🎭 **Rich Animations**: Framer Motion and Rive animations for engaging interactions
- 🔄 **Loading States**: Smooth transitions and loading indicators

### Technical Features
- 🚀 **Next.js App Router**: Server-side rendering and optimized routing
- 📦 **Type Safety**: Full TypeScript coverage with interfaces
- 🎯 **Performance Optimized**: Minimal client-side rendering, lazy loading
- 🐳 **Docker Ready**: Containerized deployment support
- 🔐 **API Integration**: Axios-based API client with timeout handling

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - Reusable component library
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variants
- **Lucide React** - Icon library

### Forms & Validation
- **React Hook Form 7.64** - Performant form handling
- **Zod 4.1** - Schema validation
- **@hookform/resolvers** - Form resolver integration

### Animation & Interaction
- **Framer Motion 12** - Animation library
- **Rive** - Interactive animations
- **tw-animate-css** - Tailwind animation utilities

### Data Fetching
- **Axios 1.12** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher
- **npm** 10.x or higher (comes with Node.js)
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/e-32-exo-ai-frontend.git
cd e-32-exo-ai-frontend
```

2. **Install dependencies**
```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
```

**Required Variables:**
- `NEXT_PUBLIC_API_URL` - Base URL for the exoplanet detection API backend

### Running the Application

#### Development Mode
```bash
npm run dev
```
The application will start at [http://localhost:3000](http://localhost:3000)

#### Production Build
```bash
npm run build
npm start
```

### Docker Deployment

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t e32-exo-ai-frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api \
  e32-exo-ai-frontend
```

## 📁 Project Structure

```
e-32-exo-ai-frontend/
├── public/                      # Static assets
│   ├── background-planet.jpg    # Background images
│   ├── earth-surface-map.jpg    # Earth texture
│   ├── surface-map.jpg          # Planet surface textures
│   ├── space-shuttle.png        # UI elements
│   └── logo.riv                 # Rive animation file
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   └── tabs.tsx
│   │   │
│   │   ├── forms/               # Form components
│   │   │   ├── schemas/         # Zod validation schemas
│   │   │   │   ├── user-form-schema.ts
│   │   │   │   └── scientist-form-schema.ts
│   │   │   ├── components/
│   │   │   │   └── loading-page.tsx
│   │   │   ├── user-form.tsx    # Simplified form
│   │   │   └── scientist-form.tsx # Advanced form
│   │   │
│   │   ├── hero/                # Hero section components
│   │   │   ├── index.tsx
│   │   │   ├── hero-content.tsx
│   │   │   ├── hero-text.tsx
│   │   │   └── scroll-space-shuttle.tsx
│   │   │
│   │   ├── dashboard-cards.tsx           # Dashboard metrics
│   │   ├── detection-result-card.tsx     # Detection results
│   │   ├── exoplanet-knowledge-section.tsx
│   │   ├── globe.tsx                     # 3D globe visualization
│   │   ├── min-globe.tsx                 # Compact globe
│   │   ├── motion-planet.tsx             # Animated planet
│   │   ├── planet-display.tsx            # Planet details
│   │   ├── planet-info-card.tsx          # Planet information
│   │   ├── not-planet-candidate-card.tsx # Negative result
│   │   ├── header.tsx                    # Site header
│   │   ├── language-toggle.tsx           # Language switcher
│   │   ├── popover-info-form.tsx         # Info popovers
│   │   └── rive-logo.tsx                 # Animated logo
│   │
│   ├── lib/                     # Utilities and configurations
│   │   ├── i18n/               # Internationalization
│   │   │   ├── language-context.tsx  # Language context provider
│   │   │   └── translations.ts       # Translation strings
│   │   ├── api.ts              # Axios instance configuration
│   │   └── utils.ts            # Utility functions
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── exoplanet.ts        # Exoplanet-related types
│   │
│   └── constants/
│       └── animation-data.ts   # Animation configurations
│
├── components.json              # Shadcn UI configuration
├── Dockerfile                   # Docker configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration
└── README.md                   # This file
```

## 🔑 Key Components

### Forms

#### User Form (`user-form.tsx`)
Simplified interface for general users with essential transit parameters:
- Orbital period (days)
- Transit depth (ppm)
- Planet radius (Earth radii)
- Planet mass (Earth masses)
- Stellar temperature (Kelvin)
- Stellar radius (Solar radii)
- Stellar mass (Solar masses)

#### Scientist Form (`scientist-form.tsx`)
Advanced interface for researchers with additional computed fields:
- All user form fields
- Transit duration (hours)
- Radius ratio (Rp/Rs)
- Semi-major axis (AU)
- Equilibrium temperature (K)
- Log orbital period
- Period-mass interaction
- Stellar temperature bin

### Visualizations

#### Globe Component (`globe.tsx`)
Interactive 3D planet visualization with:
- Texture mapping for different planet types
- Rotation and zoom controls
- Real-time surface rendering

#### Detection Result Card (`detection-result-card.tsx`)
Displays AI model predictions with:
- Classification label (exoplanet/not exoplanet)
- Confidence scores from ensemble models
- Individual model probabilities (RF, HGB)
- Visual confidence indicators

#### Dashboard Cards (`dashboard-cards.tsx`)
Scientific analysis dashboard featuring:
- Model performance metrics (ROC-AUC, Precision, Recall, F1-Score)
- Exoplanet characteristics
- Habitability indicators
- Comparison to Earth

### Hero Section (`hero/`)
Engaging landing section with:
- Animated space shuttle
- Dynamic text transitions
- Scroll-triggered animations
- Mission highlights

## 🔌 API Integration

### API Configuration (`lib/api.ts`)

The application uses Axios for API communication:

```typescript
const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```


### Form Features
- Real-time validation with error messages
- Default values representing Earth-like candidates
- Info popovers explaining each parameter
- Loading states during API requests
- Success/error handling with visual feedback
- Reset functionality for new analyses

## 🌐 Internationalization

### Supported Languages
- 🇬🇧 English (default)
- 🇧🇷 Portuguese (Português)


## 🧪 Development Workflow

### Code Style
- Use functional programming patterns
- Avoid classes, prefer pure functions
- Use TypeScript interfaces over types
- Implement declarative JSX

### File Naming
- Components: PascalCase (e.g., `HeroContent.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Directories: kebab-case (e.g., `hero-section/`)

## 👥 Team

**Developed for NASA Hackathon - Team E-32** 🏆

**Ivisson Alves** – AI Engineer & Backend Developer  
LinkedIn: [@ivi-aiengineer](https://www.linkedin.com/in/ivi-aiengineer)  
Email: ivipnascimento@hotmail.com

**Daniela Menezes** – Researcher  
LinkedIn: [@daniela-menezes-43478624a](https://www.linkedin.com/in/daniela-menezes-43478624a/)  
Email: academicosdani@gmail.com

**Edson Mota** – Data Scientist  
LinkedIn: [@emvalencaf](https://www.linkedin.com/in/emvalencaf/)  
Email: edsonmvf@gmail.com

**Hugo Henrique** – Designer  
LinkedIn: [@hugo-henrique-a-b935361bb](https://www.linkedin.com/in/hugo-henrique-a-b935361bb/)  
Email: hugohenrixoto@gmail.com

**Marcos Bueno** – Software Engineer  
LinkedIn: [@marcos-bueno-estevam](https://www.linkedin.com/in/marcos-bueno-estevam/)  
Email: mvbueno07@gmail.com