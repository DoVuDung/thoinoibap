# Guest Invitation Management - Two Approaches

You have **TWO options** for managing guest invitations. Choose the one that fits your needs!

---

## Option 1: Static List (Simple)

**File**: `lib/guests.ts`  
**Best for**: Small, fixed guest lists

### How It Works

Edit the code directly to add guests:

```typescript
export const guestList: Guest[] = [
  { id: "1", name: "Gia Đình", relationship: "family" },
  { id: "2", name: "andy", relationship: "friend" },
  // Add more here...
];
```

### Pros
- ✅ No database setup required
- ✅ Simple and fast
- ✅ Works offline
- ✅ No Firebase costs

### Cons
- ❌ Requires code changes
- ❌ Must redeploy to update
- ❌ No web interface
- ❌ Not user-friendly for non-developers

### Access
Visit: `http://localhost:3000/invitations`

---

## Option 2: Firebase Manager (Recommended!) ⭐

**Page**: `/guest-manager`  
**Database**: Firebase Firestore  
**Best for**: Dynamic guest lists, frequent updates

### How It Works

Use a beautiful web form to add/manage guests:

1. Open `/guest-manager`
2. Type guest name
3. Select relationship
4. Click "Add and Generate Link"
5. Data saved to Firebase automatically!

### Pros
- ✅ Beautiful web interface
- ✅ Real-time updates
- ✅ No code changes needed
- ✅ Can update from anywhere
- ✅ Persistent cloud storage
- ✅ Easy to share with family members

### Cons
- ❌ Requires Firebase setup (5 minutes)
- ❌ Needs internet connection
- ❌ Firebase costs (free tier is generous)

### Access
Visit: `http://localhost:3000/guest-manager`

---

## Quick Start Comparison

### Using Static List

```bash
# 1. Open lib/guests.ts in code editor
# 2. Add guest manually
{ id: "11", name: "Bác Tùng", relationship: "family" }
# 3. Save file
# 4. Wait for Next.js to rebuild
# 5. Refresh /invitations page
```

### Using Firebase Manager

```bash
# 1. Open http://localhost:3000/guest-manager
# 2. Type "Bác Tùng" in input field
# 3. Select "Gia đình"
# 4. Click "Thêm và Tạo Link Mời"
# 5. Done! Appears instantly in table below
```

---

## Feature Comparison Table

| Feature | Static List | Firebase Manager |
|---------|-------------|------------------|
| **Web Interface** | ❌ No | ✅ Yes |
| **Real-time Updates** | ❌ No | ✅ Yes |
| **No Code Changes** | ❌ No | ✅ Yes |
| **Remote Updates** | ❌ No | ✅ Yes |
| **Setup Time** | 0 min | 5 min |
| **Firebase Required** | ❌ No | ✅ Yes |
| **Bulk Export** | ✅ Yes | ✅ Yes |
| **Filter by Category** | ✅ Yes | ✅ Yes |
| **Delete Guests** | ❌ Manual | ✅ One-click |
| **Add Guests** | ❌ Code only | ✅ Web form |

---

## Recommendation

### Use Static List If:
- You have < 20 guests
- Guest list won't change often
- You're comfortable editing code
- You don't want Firebase setup

### Use Firebase Manager If: ⭐
- You have 20+ guests
- Guest list changes frequently
- Multiple people need to manage it
- You want a user-friendly interface
- You want real-time updates

---

## Hybrid Approach (Best of Both Worlds!)

You can use **both systems together**:

1. **Initial Setup**: Start with static list for core family
2. **Dynamic Additions**: Use Firebase Manager for new guests
3. **Migration**: Eventually move everything to Firebase

### Example Workflow

```
Week 1: Set up static list with 10 family members
Week 2: Switch to Firebase Manager
Week 3: Add 40 more guests via web form
Week 4: Manage all 50 guests through Firebase
```

---

## URL Format (Both Systems)

Both systems generate the same URL format:

```
http://localhost:3000?clientname="Guest Name"
```

Examples:
- `http://localhost:3000?clientname=%22andy%22` → Auto-fills "andy"
- `http://localhost:3000?clientname=%22Bác+Hùng%22` → Auto-fills "Bác Hùng"

The invitation links work identically regardless of which system you use!

---

## Getting Started with Firebase Manager (5 Steps)

### Step 1: Copy Environment File
```bash
cp .env.example .env.local
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Firebase Console
Go to: https://console.firebase.google.com/
- Select project: **thoinoibap**
- Navigate to: **Firestore Database**

### Step 4: Create Database
- Click "Create database"
- Choose "Start in test mode"
- Location: Singapore (closest to Vietnam)

### Step 5: Update Security Rules

In Firestore Rules tab:

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

Click **Publish** ✅

### 🎉 You're Ready!

Visit: **http://localhost:3000/guest-manager**

---

## Screenshots (What to Expect)

### Static List Page (`/invitations`)
```
┌────────────────────────────────────────────┐
│     Danh sách thiệp mời                    │
├────────────────────────────────────────────┤
│ [Tất cả] [Gia đình] [Bạn bè] [Đồng nghiệp]│
├────────────────────────────────────────────┤
│ Gia Đình                                   │
│ Gia đình          [Sao chép link]          │
├────────────────────────────────────────────┤
│ andy                                       │
│ Bạn bè            [Sao chép link]          │
└────────────────────────────────────────────┘
```

### Firebase Manager (`/guest-manager`)
```
┌────────────────────────────────────────────┐
│  Quản Lý Danh Sách Khách Mời               │
├────────────────────────────────────────────┤
│ Tên: [____________] Mối QH: [▼]           │
│ [+ Thêm và Tạo Link Mời]                   │
├────────────────────────────────────────────┤
│ STT | Tên      | Quan hệ | Link    | Actions│
├─────┼──────────┼─────────┼─────────┼────────┤
│  1  | Gia Đình | Gia đình│ [URL]   │📋 Xóa  │
│  2  | andy     | Bạn bè  │ [URL]   │📋 Xóa  │
└─────┴──────────┴─────────┴─────────┴────────┘
```

---

## Questions?

### Can I switch between systems?
Yes! Both generate the same URL format. You can start with static list and migrate to Firebase later.

### Do I need to know coding?
- Static List: Basic TypeScript knowledge helpful
- Firebase Manager: No coding needed!

### What if I make a mistake?
- Static List: Edit code and save
- Firebase Manager: Click "Xóa" to delete, then re-add

### Can multiple people manage guests?
- Static List: No (requires code access)
- Firebase Manager: Yes! Share the `/guest-manager` URL

---

## Ready to Start?

**For most users, we recommend Firebase Manager!**

It's more flexible, user-friendly, and doesn't require code changes. Plus, your whole family can help manage the guest list! 🎊

Just follow the 5-step setup guide above, and you'll be managing guests like a pro in minutes!
