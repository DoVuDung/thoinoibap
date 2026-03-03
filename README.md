# 🎂 Bắp's 1st Birthday Web App

A premium, high-performance "Human-Created" birthday invitation web app built with Next.js 15 (App Router), Tailwind CSS, and a Serverless Backend.

![Indochine Design](https://img.shields.io/badge/style-Indochine%20Quiet%20Luxury-b19470)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)

## ✨ Features

- **🎨 Indochine "Quiet Luxury" Aesthetic** - Elegant design with Cormorant Garamond & Be Vietnam Pro fonts
- **📱 Mobile-First Responsive** - Perfect on all devices
- **🔥 Firebase Firestore** - Real-time RSVP data storage
- **📊 Google Sheets Integration** - Automatic guest tracking via Service Account
- **⚡ Serverless Architecture** - Deployed on Vercel for global Edge performance
- **🌐 Dynamic OpenGraph** - Social media sharing optimization (Zalo/Facebook)
- **🎭 Paper Grain Texture** - Subtle handmade feel (3% opacity overlay)
- **✨ Micro-interactions** - Scroll-reveal animations and hover states

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (for database)
- Google Cloud account (for Sheets API)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd thoinoibap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   - Firebase configuration (from Firebase Console)
   - Google Service Account JSON
   - Google Sheet ID

4. **Add image assets**
   - Place hero image at `/public/images/hero-bap.jpg`
   - Place gallery images at `/public/images/gallery-*.jpg`
   - OG image already provided at `/public/og-default.svg`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** to see the app

## 📁 Project Structure

```
thoinoibap/
├── app/
│   ├── api/rsvp/route.ts    # RSVP API endpoint (Google Sheets)
│   ├── globals.css          # Global styles & design tokens
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main invitation page
├── components/
│   ├── Header.tsx           # Header section
│   ├── Hero.tsx             # Hero image with overlay
│   ├── ContentSection.tsx   # Invitation message
│   ├── DetailsGrid.tsx      # Time & location details
│   ├── Gallery.tsx          # Photo gallery (asymmetric)
│   └── RSVPForm.tsx         # RSVP form with validation
├── lib/
│   └── firebase.ts          # Firebase configuration
├── public/
│   ├── images/              # Photo assets
│   └── og-default.svg       # Social sharing image
├── .env.example             # Environment variables template
└── DEPLOYMENT.md            # Detailed deployment guide
```

## 🎨 Design System

### Color Palette

```css
--cinereous: #922724;   /* Đỏ sơn mài trầm */
--parchment: #f4f1e8;   /* Màu giấy dó */
--clay: #4a4a4a;        /* Text color */
--gold-leaf: #b19470;   /* Accents */
```

### Typography

- **Headings:** Cormorant Garamond (light 300, italic 400)
- **Body:** Be Vietnam Pro (100, 300, 600)

### Key Design Elements

- ✅ Paper grain texture overlay (0.03 opacity)
- ✅ 0.5px gold borders for separation
- ✅ No icons — using punctuation (—, ◆, |)
- ✅ Asymmetric gallery grid (scrapbook feel)
- ✅ -2deg rotated overlay card
- ✅ Letter-spacing for luxury feel (2px–7px)

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Copy config to `.env.local`

### Google Sheets Integration

1. Create a Google Sheet with columns: Guest Name | Status | Message | Timestamp
2. Create a Service Account in Google Cloud Console
3. Download JSON key
4. Share the sheet with the service account email (Editor permission)
5. Add JSON and Sheet ID to `.env.local`

See full instructions in [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## 📖 API Routes

### POST /api/rsvp

Submit an RSVP response.

**Request Body:**
```json
{
  "guestName": "Uncle Hung",
  "status": "yes",
  "message": "Chúc bé hay ăn chóng lớn!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "RSVP recorded successfully"
}
```

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy!

For detailed deployment steps, see [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## 🧪 Testing

Test with different guest names:
```
http://localhost:3000?name=Uncle+Hung
http://localhost:3000?name=Aunt+Lan
```

Verify social sharing preview:
- [Zalo Debugger](https://developers.zalo.me/tools/debug/share)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)

## 📝 License

This project is private and proprietary.

## 👨‍💻 Credits

- **Design:** Inspired by Indochine architecture and Vietnamese cultural aesthetics
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Backend:** Firebase + Google Sheets API
- **Deployment:** Vercel Edge Network

---

**Built with ❤️ for Bắp's 1st Birthday**

*March 11, 2026 — 55 Khúc Hạo, Đà Nẵng*
