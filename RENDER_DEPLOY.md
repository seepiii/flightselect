# Deploying FlightSelect on Render

## Quick Setup Steps

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign up/Login with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select the repository: `seepiii/flightselect`

3. **Configure the Service**
   - **Name**: `flightselect` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `./` if needed)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variable**
   - Scroll down to "Environment Variables"
   - Click "Add Environment Variable"
   - **Key**: `AVIATION_STACK_API_KEY`
   - **Value**: Your AviationStack API key
   - Click "Save Changes"

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically:
     - Clone your repo
     - Install dependencies
     - Build your Next.js app
     - Deploy it
   - Wait 5-10 minutes for the first deployment

6. **Get Your Live URL**
   - Once deployed, you'll get a URL like: `https://flightselect.onrender.com`
   - Share this URL with anyone to test your app!

## Notes

- **Free Tier**: Render free tier spins down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.
- **Upgrade**: For always-on service, upgrade to paid plan ($7/month)
- **Custom Domain**: You can add a custom domain in Render dashboard under "Settings" → "Custom Domains"

## Troubleshooting

- If build fails, check the build logs in Render dashboard
- Make sure `AVIATION_STACK_API_KEY` is set correctly
- Check that Node.js version is compatible (Render auto-detects from package.json)

