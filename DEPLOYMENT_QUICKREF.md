# Deployment Quick Reference

## One-Line Deployment (After Vercel Login)

```bash
cd web && ./deploy.sh
```

## Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd web
vercel --prod
```

## Web Dashboard

1. Go to https://vercel.com/new
2. Import `jiangtao/cc-config`
3. Set root directory to `web`
4. Click "Deploy"

## Verify Deployment

```bash
curl https://ccconfig.vercel.app
```

## Update README

Uncomment line 7 in `README.md`:
```markdown
[![Live Site](https://img.shields.io/badge/🔗-Live_Site-blue)](https://ccconfig.vercel.app)
```

## Documentation

- **DEPLOYMENT_REPORT.md** - Complete task report
- **DEPLOYMENT_STATUS.md** - Current status and checklist
- **web/DEPLOYMENT.md** - Detailed deployment guide
- **web/DEPLOYMENT_README.md** - Quick-start instructions

## Status

✅ Ready for deployment
⏳ Awaiting Vercel authentication
