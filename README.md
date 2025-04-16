# Granite World Catalogue

A modern web application for showcasing granite products and managing customer inquiries.

## Features

- Product catalogue with detailed product information
- Dark/Light mode support
- Contact form for customer inquiries
- Admin panel for managing products and inquiries
- Image gallery with filtering capabilities
- Responsive design for all devices

## Tech Stack

- Frontend:
  - React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - React Router for navigation

- Backend:
  - Node.js with Express
  - MongoDB for database
  - TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/granite-world-catalogue.git
cd granite-world-catalogue
```

2. Install dependencies for frontend:
```bash
npm install
```

3. Install dependencies for backend:
```bash
cd backend
npm install
```

4. Create `.env` files:

Frontend `.env`:
```
VITE_API_URL=http://localhost:5000
```

Backend `.env`:
```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

5. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Deployment

This project is configured for deployment on Vercel. The frontend and backend are deployed as separate projects.

## License

MIT 