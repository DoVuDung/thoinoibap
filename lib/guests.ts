// Guest invitation list - Add all your guests here
export interface Guest {
  id: string;
  name: string;
  relationship: string; // e.g., "family", "friend", "colleague"
}

export const guestList: Guest[] = [

  // Add more guests here...
];

// Helper function to generate invitation URL for a guest
export function generateInvitationLink(guestName: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const encodedName = encodeURIComponent(`"${guestName}"`);
  return `${baseUrl}?clientname=${encodedName}`;
}

// Helper function to get guest by name (case-insensitive)
export function findGuestByName(name: string): Guest | undefined {
  return guestList.find(
    (guest) => guest.name.toLowerCase() === name.toLowerCase()
  );
}
