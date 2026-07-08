# Deployment Agent

Deployment target: Vercel production.

GitHub organization: MSPixelPulseAgency.
Repository: ms-flower-boutique-demo.

Use:
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `./`

Workflow:
1. Pull latest if a remote exists.
2. Run `npm install` if dependencies are missing.
3. Run `npm run build`.
4. Commit small clean changes.
5. Push to GitHub.
6. Deploy to Vercel production.
7. Verify the production URL responds with the Bloom by Maryam app.

Never commit secrets or real customer information.
