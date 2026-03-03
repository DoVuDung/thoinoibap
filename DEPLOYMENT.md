# Deployment Checklist — Bắp's 1st Birthday Web App

## 🚀 Pre-Deployment Setup

### 1. Firebase Project Setup

- [ ] Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
- [ ] Enable Firestore Database (start in test mode for development)
- [ ] Get your Firebase configuration:
  - Go to Project Settings > General > Your apps
  - Register a web app if not already done
  - Copy the Firebase SDK configuration snippet
- [ ] Update `.env.local` with your Firebase config values:
  ```bash
  NEXT_PUBLIC_FIREBASE_API_KEY=...
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
  NEXT_PUBLIC_FIREBASE_APP_ID=...
  ```

### 2. Google Sheets Integration Setup

- [ ] Create a new Google Sheet for RSVP tracking
  - Column A: Guest Name
  - Column B: Status (Attending/Not Attending)
  - Column C: Message
  - Column D: Timestamp
- [ ] Extract the Sheet ID from the URL:
    ```
    https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
    ```
- [ ] Create a Google Cloud Service Account:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing
  3. Enable Google Sheets API
  4. Go to IAM & Admin > Service Accounts
  5. Create a new service account
  6. Generate a JSON key
  7. Copy the entire JSON content
- [ ] Share your Google Sheet with the service account email:
  - Click "Share" on your spreadsheet
  - Add the service account email (found in JSON as `client_email`)
  - Grant **Editor** permissions
- [ ] Update `.env.local`:
  ```bash
  GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'  # Full JSON string
  GOOGLE_SHEET_ID=your_sheet_id_here
  ```

### 3. Image Assets Preparation

- [ ] Add hero image to `/public/images/hero-bap.jpg`
- [ ] Add gallery images:
  - `/public/images/gallery-1.jpg` (full width, 300px height)
  - `/public/images/gallery-2.jpg` (half width, 180px height)
  - `/public/images/gallery-3.jpg` (half width, 180px height)
- [ ] Create default OG image `/public/og-default.jpg` (1200x630px)
  - This will be shown when sharing on Zalo/Facebook

---

## ☁️ Vercel Deployment

### 4. Deploy to Vercel

- [ ] Push code to GitHub repository
- [ ] Import project to Vercel
- [ ] Configure environment variables in Vercel dashboard:
  - All Firebase variables
  - `GOOGLE_SERVICE_ACCOUNT_JSON` (paste full JSON string)
  - `GOOGLE_SHEET_ID`
- [ ] Deploy!

### 5. Post-Deployment Configuration

- [ ] Update the production URL in metadata (`app/layout.tsx`)
  ```typescript
  url: 'https://your-domain.vercel.app',
  ```
- [ ] Test RSVP form submission
- [ ] Verify data appears in Google Sheet
- [ ] Test social sharing preview (Zalo/Facebook)

---

## 🧪 Testing Checklist

### 6. Functional Testing

- [ ] Guest name personalization via URL parameter works
  - Test: `https://your-site.com?name=Uncle+Hung`
- [ ] RSVP form submits successfully
- [ ] Success/error messages display correctly
- [ ] Data appears in Google Sheet with correct format
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Paper grain texture overlay is subtle (not too strong)
- [ ] Fonts load correctly (Cormorant Garamond, Be Vietnam Pro)

### 7. Social Sharing (OpenGraph) Testing

- [ ] Use [Zalo Developers Tool](https://developers.zalo.me/tools/debug/share?url=YOUR_URL) to clear cache
- [ ] Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to verify OG tags
- [ ] Verify title shows: "Thôi Nôi Minh Anh — 11.03.2026"
- [ ] Verify description shows event details
- [ ] Verify OG image displays correctly

---

## 🔧 Troubleshooting

### Common Issues

#### Google Sheets API Returns 401/403
- ✅ Ensure service account email has Editor access to the sheet
- ✅ Check that `GOOGLE_SERVICE_ACCOUNT_JSON` is properly formatted (valid JSON)
- ✅ Verify Google Sheets API is enabled in Google Cloud Console

#### Firebase Connection Fails
- ✅ Check all `NEXT_PUBLIC_` environment variables are set
- ✅ Verify Firestore is enabled in Firebase Console
- ✅ Check browser console for specific error messages

#### Images Not Loading
- ✅ Ensure images are in `/public/images/` directory
- ✅ Check file names match exactly (case-sensitive)
- ✅ Verify image files are not corrupted

#### Fonts Not Loading
- ✅ Check internet connection (fonts load from Google CDN)
- ✅ Verify font family names in CSS match imported fonts
- ✅ Clear browser cache and redeploy

---

## 📊 Maintenance

### Regular Updates
- Monitor Firebase usage in Firebase Console
- Check Google Sheets API quota limits
- Update dependencies periodically:
  ```bash
  npm update
  git commit -m "chore: update dependencies"
  git push  # Trigger Vercel deployment
  ```

### Backup Strategy
- Export Google Sheet data regularly (File > Download > Excel)
- Consider setting up automated Firestore backups via Firebase Extensions

---

## 🎨 Design Notes

### Preserved Elements from source.html
- ✅ Indochine "Quiet Luxury" aesthetic
- ✅ Cormorant Garamond (serif) + Be Vietnam Pro (sans-serif) typography
- ✅ Color palette: Cinereous (#922724), Parchment (#f4f1e8), Clay (#4a4a4a), Gold Leaf (#b19470)
- ✅ Paper grain texture overlay (3% opacity)
- ✅ Minimalist borders (0.5px gold)
- ✅ No icons policy — using punctuation (—, ◆, |)
- ✅ Asymmetric gallery grid (scrapbook feel)
- ✅ "-2deg" rotated overlay card
- ✅ Letter-spacing for luxury feel (2px–7px)

### Human-Created Touches
- ❌ No perfectly centered square grids (avoiding AI uniformity)
- ✅ Varied aspect ratios in photo gallery
- ✅ Subtle micro-interactions (hover states, transitions)
- ✅ Mobile-first responsive design

---

## 📝 Environment Variables Summary

Copy this to `.env.local`:

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bap-birthday.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bap-birthday
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bap-birthday.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
GOOGLE_SHEET_ID=1BxiMvs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

---

**Last Updated:** March 3, 2026  
**Framework:** Next.js 15 (App Router)  
**Deployment Target:** Vercel  
**Status:** Ready for Production 🎉
