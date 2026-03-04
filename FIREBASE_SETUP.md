# Firebase Guest Manager Setup Guide

## Overview

This system allows you to manage guest invitations through a web form interface with data stored in Firebase Firestore.

## Features

✅ **Web Form Interface** - Add guests through a beautiful UI  
✅ **Auto-Generate Links** - Creates invitation URLs automatically  
✅ **Firebase Storage** - All data saved to Firestore database  
✅ **Real-time Updates** - See changes instantly  
✅ **Bulk Export** - Copy all links at once  
✅ **Filter by Relationship** - Organize guests by category  
✅ **Delete Guests** - Remove guests from the list  

## Setup Instructions

### Step 1: Configure Firebase (Already Done!)

Your Firebase credentials are already configured in `.env.example`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD9DBqxpJJDLDJPgAffR-b1FUDzlzbiV74
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=thoinoibap.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=thoinoibap
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=thoinoibap.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=497481408224
NEXT_PUBLIC_FIREBASE_APP_ID=1:497481408224:web:2b654bf33ae834a8fffa85
```

### Step 2: Create .env.local File

Copy the example file:

```bash
cp .env.example .env.local
```

### Step 3: Set Up Firebase Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **thoinoibap**
3. Navigate to **Firestore Database** in the left menu
4. Click **Create database** (if not exists)
5. Choose **Start in test mode** (for development)
6. Select a location: **asia-southeast1 (Singapore)** or closest to Vietnam

### Step 4: Configure Firestore Security Rules

In Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write to guests collection
    // For production, add proper authentication
    match /guests/{guestId} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish** to save the rules.

### Step 5: Start Using the Guest Manager

Run your development server:

```bash
npm run dev
```

Visit: **http://localhost:3000/guest-manager**

## How to Use

### Adding Guests

1. Go to `/guest-manager`
2. Enter guest name (e.g., "Bác Hùng")
3. Select relationship: Family/Friend/Colleague
4. Click **"+ Thêm và Tạo Link Mời"**
5. Guest is saved to Firebase and appears in the table

### Generating Invitation Links

Links are automatically generated when you add a guest!

Format: `http://localhost:3000?clientname="Guest Name"`

Example:
- Guest: "andy"
- Generated URL: `http://localhost:3000?clientname=%22andy%22`

### Copying Links

**Individual Link:**
- Click "Sao chép" button next to each guest
- URL is copied to clipboard

**All Links (Bulk Export):**
- Click "📋 Sao chép tất cả lời mời"
- Copies all links in format:
  ```
  Gia Đình: http://localhost:3000?clientname=%22Gia%20%C4%90%C3%ACnh%22
  andy: http://localhost:3000?clientname=%22andy%22
  Bác Hùng: http://localhost:3000?clientname=%22B%C3%A1c%20H%C3%B9ng%22
  ```

### Filtering Guests

Use filter buttons to view specific groups:
- **Tất cả** - All guests
- **Gia đình** - Family members only
- **Bạn bè** - Friends only
- **Đồng nghiệp** - Colleagues only

### Deleting Guests

Click "Xóa" button to remove a guest from the list.

## Data Structure

Each guest is stored in Firestore as:

```javascript
{
  name: "Bác Hùng",
  relationship: "family",
  invitationUrl: "http://localhost:3000?clientname=%22B%C3%A1c%20H%C3%B9ng%22",
  createdAt: Timestamp(2026-03-04T22:00:00.000Z)
}
```

## Collection Name

Guests are stored in the **`guests`** collection in Firestore.

## Example Workflow

1. **Open Guest Manager**: Visit `/guest-manager`
2. **Add Multiple Guests**:
   - Add "Bác Hùng" (Family)
   - Add "Cô Lan" (Family)
   - Add "Bạn Mai" (Friend)
   - Add "Đồng nghiệp Nam" (Colleague)
3. **Filter by Family**: Click "Gia đình" to see only family members
4. **Copy Family Links**: Click "Sao chép tất cả lời mời" 
5. **Send Messages**: Paste links in Zalo/SMS to family group chat
6. **Track Responses**: As guests submit RSVP, check Google Sheets

## Comparison: Static List vs Firebase Manager

### Static List (`lib/guests.ts`)
- ✅ Simple, no database needed
- ❌ Requires code changes to update
- ❌ No web interface
- ❌ Must redeploy to add guests

### Firebase Manager (`/guest-manager`)
- ✅ Web form interface
- ✅ Real-time updates
- ✅ No code changes needed
- ✅ Can add guests from anywhere
- ✅ Persistent storage
- ❌ Requires Firebase setup

## Troubleshooting

### Error: "Cannot connect to Firestore"
- Check that `.env.local` exists with correct credentials
- Verify Firebase project is active
- Check Firestore database is created

### Error: "Permission denied"
- Update Firestore security rules (Step 4)
- Make sure rules allow read/write access

### Guests not appearing in table
- Refresh the page
- Check browser console for errors
- Verify Firestore has data in `guests` collection

## Migration Path

You can use both systems together:

1. Start with static list in `lib/guests.ts` for initial guests
2. Use `/guest-manager` to add new guests dynamically
3. Eventually migrate all guests to Firebase

## Production Deployment

Before deploying to production:

1. ✅ Update Firestore security rules with proper authentication
2. ✅ Enable Firebase Authentication if needed
3. ✅ Set `NEXT_PUBLIC_SITE_URL` to production domain
4. ✅ Test all CRUD operations
5. ✅ Backup Firestore data regularly

## Next Steps

1. Set up Firestore database (Step 3)
2. Publish security rules (Step 4)
3. Start adding guests at `/guest-manager`
4. Send invitation links to guests
5. Watch RSVP responses come in!

---

**Ready to start?** Run `npm run dev` and visit `http://localhost:3000/guest-manager`! 🎉
