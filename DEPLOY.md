# Deployment Guide

This guide covers deploying the BridgeBound Admin Portal to Vercel.

## Prerequisites

- Node.js 16+ and npm
- Git repository with your code
- Vercel account
- Your API endpoint URL

## Local Verification

Before deploying, verify locally:

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and set VITE_API_URL

# Verify build works
npm run build

# Optional: Run locally
npm run dev
```

## Deploy to Vercel

### Option 1: CLI Deploy (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Link to existing project (if already created)
vercel link

# 4. Add environment variables
vercel env add VITE_API_URL production
# Paste your production API URL when prompted

# 5. Deploy to production
vercel --prod
```

### Option 2: Git Integration

1. Push code to GitHub/GitLab
2. In Vercel Dashboard:
   - New Project → Import repository
   - Configure project:
     ```
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```
   - Add environment variables:
     - Name: `VITE_API_URL`
     - Value: Your production API URL
     - Environment: Production

## Environment Variables

Local development:
```env
# .env file
VITE_API_URL=http://localhost:5000/api
```

Vercel production:
```env
VITE_API_URL=https://api.your-domain.com
```

## Verify Deployment

### 1. Check Build Logs
- Vercel dashboard → Deployments → Latest
- Verify build completed successfully

### 2. Test API Connection
```bash
# Check your deployed frontend URL
curl -I https://your-frontend-url.vercel.app

# If you have a health endpoint, test it
curl -I https://your-api-url/health
```

### 3. Browser Verification
1. Open deployed URL
2. Open Chrome DevTools (F12)
3. Go to Network tab
4. Try to log in
5. Verify requests go to correct API URL
6. Check for any CORS errors

### 4. Common Issues

1. API URL wrong or unreachable:
   - Check VITE_API_URL in Vercel dashboard
   - Verify API is accessible
   - Check CORS settings on API

2. Build fails:
   - Check Vercel build logs
   - Verify package.json scripts
   - Test build locally first

3. Runtime errors:
   - Check browser console
   - Verify all env vars are set
   - Check Network tab for failed requests

## Rollback

To rollback to previous deployment:

1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click ⋮ → Promote to Production

## Quick Commands Reference

```bash
# Development
npm run dev                 # Start local dev server
npm run build              # Test production build

# Deployment
vercel                     # Deploy to preview URL
vercel --prod             # Deploy to production
vercel env add            # Add environment variable
vercel env ls             # List environment variables
vercel logs              # View deployment logs
```