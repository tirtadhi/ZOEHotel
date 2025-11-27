# Deployment Guide

## Deploy to Vercel (Recommended)

### Prerequisites

- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Environment Variables**

   - In Vercel dashboard, go to Settings > Environment Variables
   - Add your environment variables from `.env.example`

4. **Custom Domain (Optional)**
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

## Deploy to Netlify

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Build the project**

```bash
npm run build
```

3. **Deploy**

```bash
netlify deploy --prod
```

## Deploy to Railway

1. **Install Railway CLI**

```bash
npm install -g @railway/cli
```

2. **Login to Railway**

```bash
railway login
```

3. **Initialize project**

```bash
railway init
```

4. **Deploy**

```bash
railway up
```

## Deploy to VPS (DigitalOcean, AWS, etc.)

### Prerequisites

- VPS with Ubuntu 20.04+
- Node.js 18+
- Nginx
- PM2

### Steps

1. **SSH into your server**

```bash
ssh user@your-server-ip
```

2. **Install Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2**

```bash
sudo npm install -g pm2
```

4. **Clone repository**

```bash
git clone <your-repo-url>
cd booking
```

5. **Install dependencies**

```bash
npm install
```

6. **Build the application**

```bash
npm run build
```

7. **Start with PM2**

```bash
pm2 start npm --name "booking-app" -- start
pm2 save
pm2 startup
```

8. **Configure Nginx**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable SSL with Let's Encrypt**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Configuration

For production, make sure to set these environment variables:

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## Database Setup (Future Implementation)

When you integrate a database:

1. **PostgreSQL on Vercel**

   - Use Vercel Postgres
   - Auto-configured with deployment

2. **PostgreSQL on Railway**

   - Add PostgreSQL plugin
   - Copy connection string to env variables

3. **MongoDB Atlas**
   - Create free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas)
   - Get connection string
   - Add to environment variables

## Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Check responsive design on mobile
- [ ] Verify SEO metadata
- [ ] Test form submissions
- [ ] Check image loading
- [ ] Test navigation
- [ ] Verify analytics integration (if any)
- [ ] Test in different browsers
- [ ] Check performance with Lighthouse
- [ ] Setup monitoring (e.g., Sentry, LogRocket)

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Troubleshooting

### Build Errors

- Clear `.next` folder and rebuild
- Check Node.js version compatibility
- Verify all dependencies are installed

### Performance Issues

- Enable Next.js Image Optimization
- Implement lazy loading
- Use dynamic imports for large components
- Enable caching headers

### 404 Errors

- Verify all routes are properly configured
- Check dynamic route naming
- Ensure proper redirects in `next.config.ts`

## Monitoring & Analytics

Consider integrating:

- **Google Analytics** - User tracking
- **Sentry** - Error monitoring
- **Vercel Analytics** - Performance metrics
- **Hotjar** - User behavior analysis

## Backup Strategy

- Regular database backups (when implemented)
- Repository backup on GitHub
- Environment variables documented
- Media files backup on cloud storage
