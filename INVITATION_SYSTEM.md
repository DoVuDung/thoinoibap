# Invitation Link Generator

## Overview

This system automatically generates personalized invitation links for each guest. When a guest clicks their unique link, their name is auto-filled in the RSVP form.

## How It Works

1. **Guest List Management**: All guests are stored in `lib/guests.ts`
2. **Link Generation**: Each guest gets a unique URL with their name encoded
3. **Auto-fill**: When opening the link, the name parameter populates the RSVP form

## Setup

### 1. Configure Your Guest List

Edit `lib/guests.ts` and add your guests:

```typescript
export const guestList: Guest[] = [
  { id: "1", name: "Gia Đình", relationship: "family" },
  { id: "2", name: "Uncle John", relationship: "family" },
  { id: "3", name: "Friend Mai", relationship: "friend" },
  // Add more guests...
];
```

### 2. Set Site URL

Update `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://be-bap.com  # or http://localhost:3000 for development
```

## Usage

### Access the Invitation Manager

Visit: `http://localhost:3000/invitations`

This page shows:
- Complete list of all guests
- Their personalized invitation links
- Filter by relationship (family, friends, colleagues)
- One-click copy to clipboard

### Example Invitation Links

Format: `http://localhost:3000?clientname="Guest Name"`

Examples:
- `http://localhost:3000?clientname=%22andy%22` → Auto-fills "andy"
- `http://localhost:3000?clientname=%22Minh+Anh%22` → Auto-fills "Minh Anh"
- `http://localhost:3000?clientname=%22Bác+Hùng%22` → Auto-fills "Bác Hùng"

### Distribution Methods

1. **Individual Messages**: Copy each guest's link and send via SMS/Zalo/email
2. **Bulk Export**: Click "Sao chép tất cả lời mời" to copy all links at once
3. **QR Codes**: Generate QR codes from the links for printed invitations

## Features

### Filtering

Filter guests by relationship:
- **Tất cả** (All): Show all guests
- **Gia đình** (Family): Family members only
- **Bạn bè** (Friends): Friends only
- **Đồng nghiệp** (Colleagues): Colleagues only

### Copy to Clipboard

- Click "Sao chép link" to copy individual invitation URLs
- Click "Sao chép tất cả lời mời" to export all links in format:
  ```
  Gia Đình: http://localhost:3000?clientname=%22Gia%20%C4%90%C3%ACnh%22
  andy: http://localhost:3000?clientname=%22andy%22
  Minh Anh: http://localhost:3000?clientname=%22Minh%20Anh%22
  ```

## URL Parameters

The system supports two parameter names for flexibility:

1. `clientname` (primary): `?clientname="Guest Name"`
2. `name` (fallback): `?name=Guest Name`

Both work identically. The system automatically:
- Decodes URL-encoded characters
- Removes quotation marks
- Trims whitespace

## Customization

### Change Invitation Link Format

Edit `lib/guests.ts`:

```typescript
export function generateInvitationLink(guestName: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const encodedName = encodeURIComponent(`"${guestName}"`);
  return `${baseUrl}?clientname=${encodedName}`;
}
```

### Add Guest Properties

Extend the `Guest` interface:

```typescript
export interface Guest {
  id: string;
  name: string;
  relationship: string;
  email?: string;      // Add email
  phone?: string;      // Add phone
  tableNumber?: number; // Add table assignment
}
```

## API Endpoint

Get all invitations as JSON:

```
GET /api/invitations

Response:
{
  "success": true,
  "total": 10,
  "invitations": [
    {
      "id": "1",
      "name": "Gia Đình",
      "relationship": "family",
      "invitationUrl": "http://localhost:3000?clientname=%22Gia%20%C4%90%C3%ACnh%22"
    },
    // ... more guests
  ]
}
```

## Troubleshooting

### Names not auto-filling?

1. Check that the URL parameter is correctly formatted
2. Ensure quotes are properly URL-encoded (`%22`)
3. Verify the parameter name is `clientname` or `name`

### Vietnamese characters not displaying?

The system handles UTF-8 encoding automatically. Make sure:
- Names are properly URL-encoded
- Your browser supports UTF-8
- The HTML meta charset is set to UTF-8

## Best Practices

1. ✅ Keep guest names consistent (e.g., always use "Bác Hùng" not sometimes "Chú Hùng")
2. ✅ Test links before sending to guests
3. ✅ Include both Vietnamese and English names if needed
4. ✅ Backup your guest list regularly
5. ✅ Use meaningful relationship categories for easy filtering
