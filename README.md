# BridgeBound Admin Portal

This is the administrative frontend for the BridgeBound platform, providing interfaces for college management, student applications, and franchise operations.

## Features

- Multi-portal system:
  - Admin Portal: Complete system management
  - College Portal: Institution-specific content and application management
  - Franchise Portal: Lead management and tracking
  - Student Portal: Application interface

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/bridgebound-admin.git
cd bridgebound-admin
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Environment Variables

The application requires the following environment variables:

```env
# Local development (.env file)
VITE_API_URL=http://localhost:5000/api  # Local API endpoint

# Production (Vercel)
VITE_API_URL=https://api.your-domain.com  # Production API endpoint
```

## Deployment to Vercel

### Quick Deploy (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Add environment variables
vercel env add VITE_API_URL production
# Then paste your production API URL when prompted
```

### Manual Deploy (Dashboard)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Keep default build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
3. Configure environment variables:
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` for Production
   - Value: Your API endpoint (e.g., https://api.your-domain.com)
4. Deploy:
   - Vercel will auto-deploy on push to main branch
   - Or manual deploy: click "Redeploy" in dashboard

### Verify Deployment

1. Open your deployed site
2. Check Network tab in browser DevTools
3. Verify API requests go to correct VITE_API_URL
4. Test login functionality

## Project Structure

```
bridgebound-admin/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   ├── layouts/        # Layout components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── public/            # Public assets
└── index.html         # HTML template
```

## Connecting with Existing Repositories

This admin portal works in conjunction with:
- Student Portal: [bridgebound-frontend](https://github.com/techsupport-png/bridgeboundcollegesfrontend)
- Main Website: [bridge](https://github.com/techsupport-png/bridge)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint