# 🚀 Quick Start: Firebase Guest Manager

## 3-Minute Setup Guide

### Step 1: Enable Firestore (2 minutes)

1. Go to https://console.firebase.google.com/
2. Click on project: **thoinoibap**
3. Click **"Firestore Database"** in left menu
4. Click **"Create database"**
5. Choose **"Start in test mode"** → Click **Next**
6. Select location: **(asia-southeast1) Singapore** → Click **Enable**

### Step 2: Update Security Rules (1 minute)

1. In Firestore, click on **"Rules"** tab
2. Replace ALL the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guests/{guestId} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"** button

### Step 3: Start Adding Guests! (30 seconds)

1. Run: `npm run dev`
2. Visit: **http://localhost:3000/guest-manager**
3. Enter guest name and click "Thêm và Tạo Link Mời"
4. Done! ✅

---

## That's It! You're Ready! 🎉

Now you can:
- ✅ Add unlimited guests through the web form
- ✅ Generate invitation links automatically
- ✅ Copy links and send to guests
- ✅ Delete guests with one click
- ✅ Filter by family/friends/colleagues
- ✅ Export all links at once

---

## Example: Adding Your First Guest

```
1. Open: http://localhost:3000/guest-manager

2. Fill form:
   Tên: Bác Hùng
   Mối Quan Hệ: Gia đình
   
3. Click: "+ Thêm và Tạo Link Mời"

4. Result appears in table:
   STT: 1
   Tên: Bác Hùng
   Link: http://localhost:3000?clientname=%22B%C3%A1c%20H%C3%B9ng%22
   
5. Click "Sao chép" to copy the link

6. Send link to Bác Hùng via Zalo/SMS!
```

---

## What Happens Behind the Scenes

When you add a guest:

```typescript
// 1. Form submits data
{
  name: "Bác Hùng",
  relationship: "family"
}

// 2. System auto-generates URL
invitationUrl: "http://localhost:3000?clientname=%22B%C3%A1c%20H%C3%B9ng%22"

// 3. Saves to Firebase Firestore
Collection: "guests"
Document: Auto-generated ID
Data: { name, relationship, invitationUrl, createdAt }

// 4. Appears instantly in table below form
```

---

## Invitation Link Format

All generated URLs follow this pattern:

```
http://localhost:3000?clientname="Guest Name"
```

URL-encoded version:
```
http://localhost:3000?clientname=%22Guest%20Name%22
```

### Examples

| Guest Name | Generated URL |
|------------|---------------|
| andy | `http://localhost:3000?clientname=%22andy%22` |
| Minh Anh | `http://localhost:3000?clientname=%22Minh%20Anh%22` |
| Bác Hùng | `http://localhost:3000?clientname=%22B%C3%A1c%20H%C3%B9ng%22` |
| Cô Lan | `http://localhost:3000?clientname=%22C%C3%B4%20Lan%22` |

---

## Features At a Glance

### ✨ Add Guests
- Type name → Select category → Click add
- Generates URL automatically
- Saves to Firebase instantly

### ✨ Copy Links
- Individual: Click "Sao chép" button
- Bulk: Click "📋 Sao chép tất cả lời mời"

### ✨ Filter Guests
- Tất cả (All)
- Gia đình (Family)
- Bạn bè (Friends)
- Đồng nghiệp (Colleagues)

### ✨ Delete Guests
- Click "Xóa" button
- Confirms before deletion
- Removes from Firebase

---

## Data Structure in Firebase

```
thoinoibap (project)
└── Firestore
    └── guests (collection)
        ├── document_1
        │   ├── name: "Bác Hùng"
        │   ├── relationship: "family"
        │   ├── invitationUrl: "http://..."
        │   └── createdAt: Timestamp
        ├── document_2
        │   ├── name: "Bạn Mai"
        │   ├── relationship: "friend"
        │   └── ...
        └── document_3
            └── ...
```

---

## Common Questions

### Q: Do I need to pay for Firebase?
**A:** No! The free tier includes:
- 1 GB storage (enough for 10,000+ guests)
- 50,000 reads/day
- 20,000 writes/day

### Q: Can I edit guest names after adding?
**A:** Currently no. Just delete and re-add (takes 10 seconds).

### Q: What if I close the page?
**A:** Data is safe in Firebase! Just refresh and it reloads.

### Q: Can my family members use this?
**A:** Yes! Share the URL: `http://localhost:3000/guest-manager`

### Q: How do I backup data?
**A:** In Firebase Console → Firestore → Data → Click "⋮" → "Export"

---

## Troubleshooting

### ❌ Error: "Permission denied"
**Fix:** Update Firestore security rules (Step 2 above)

### ❌ Error: "Cannot connect to Firestore"
**Fix:** 
1. Check `.env.local` has correct Firebase credentials
2. Verify Firestore database is created
3. Refresh the page

### ❌ Table is empty after adding guests
**Fix:**
1. Check browser console (F12) for errors
2. Verify Firestore has data in Firebase Console
3. Refresh the page

---

## Next Steps After Setup

1. ✅ Add all family members (filter: Gia đình)
2. ✅ Add friends (filter: Bạn bè)
3. ✅ Add colleagues (filter: Đồng nghiệp)
4. ✅ Copy all family links → Send to family group chat
5. ✅ Copy friend links → Send individually
6. ✅ Watch RSVP responses come in!

---

## Pro Tips 💡

### Tip 1: Use Consistent Names
```
✅ Good: "Bác Hùng", "Cô Lan", "Chú Tuấn"
❌ Bad: "Chú Hùng", "Bác Lan" (inconsistent)
```

### Tip 2: Add Notes in Name Field
You can add extra info in the name:
- "Bác Hùng (5 người)" - Family of 5
- "Cô Lan + Trẻ em" - With kids
- "Bạn Mai (Ăn chay)" - Vegetarian

### Tip 3: Export Before Deleting
Before clearing the list:
1. Click "📋 Sao chép tất cả lời mời"
2. Paste in a text file as backup
3. Then delete safely

### Tip 4: Test Before Sending
Always test a few links yourself:
1. Copy one link
2. Open in incognito window
3. Verify name auto-fills correctly
4. Then send to guests

---

## Success Checklist

- [ ] Firestore database created
- [ ] Security rules published
- [ ] `.env.local` file exists
- [ ] Development server running
- [ ] Can access `/guest-manager`
- [ ] Added first test guest
- [ ] Copied invitation link
- [ ] Tested link opens correctly
- [ ] Ready to add all guests! ✅

---

## Need More Help?

Read the full guides:
- **Detailed Setup**: `FIREBASE_SETUP.md`
- **System Comparison**: `GUEST_MANAGEMENT_OPTIONS.md`
- **Invitation System**: `INVITATION_SYSTEM.md`

---

**Ready? Let's create your guest list! 🎊**

Visit: **http://localhost:3000/guest-manager**
