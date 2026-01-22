# Setting Up Real Flight Prices with Amadeus API

## Overview
This app now supports real-time flight pricing using the **Amadeus API**, which provides actual prices similar to Google Flights.

## Step 1: Get Amadeus API Credentials

1. **Sign up for Amadeus for Developers**
   - Go to: https://developers.amadeus.com/
   - Click "Sign up" (it's free)
   - Create an account

2. **Create a New App**
   - Go to "My Self-Service Workspace"
   - Click "Create New App"
   - Choose "Flight Offers Search" API
   - Fill in app details
   - You'll get:
     - **API Key** (Client ID)
     - **API Secret** (Client Secret)

3. **Free Tier Limits**
   - 2,000 API calls/month (free tier)
   - Test environment available
   - Real flight pricing data

## Step 2: Add Environment Variables

Add these to your `.env.local` file:

```bash
AMADEUS_CLIENT_ID=your_client_id_here
AMADEUS_CLIENT_SECRET=your_client_secret_here
```

**For Render deployment:**
- Go to Render dashboard → Your service → Environment
- Add both variables:
  - `AMADEUS_CLIENT_ID`
  - `AMADEUS_CLIENT_SECRET`

## Step 3: How It Works

The new `/api/flight-price` endpoint:
- Takes origin, destination, and optional date/flight number
- Authenticates with Amadeus
- Searches for real flight offers with actual prices
- Returns prices in the same format as your existing flights

## Step 4: Integration Options

### Option A: Replace Current Prices
Update `/api/flights/route.ts` to call Amadeus for prices instead of random values.

### Option B: Add Price Check Button
Add a "Check Real Price" button that calls `/api/flight-price` when clicked.

### Option C: Hybrid Approach
- Show estimated prices initially
- Fetch real prices on-demand when user clicks "View Details"

## API Endpoint Usage

```typescript
// Get prices for a route
GET /api/flight-price?origin=JFK&destination=LAX&date=2025-02-15

// Get price for specific flight number
GET /api/flight-price?origin=JFK&destination=LAX&flightNumber=DL2930
```

## Alternative: Skyscanner API

If Amadeus doesn't work for you, you can also try:
- **Skyscanner API**: https://developers.skyscanner.net/
- Similar setup process
- Different pricing data sources

## Notes

- Amadeus uses **test environment** by default (change to production when ready)
- Prices are in real-time and accurate
- Free tier is generous for development/testing
- Consider caching prices to reduce API calls

