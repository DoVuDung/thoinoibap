import { NextResponse } from 'next/server';
import { guestList, generateInvitationLink } from '@/lib/guests';

export async function GET() {
  try {
    // Generate invitation links for all guests
    const invitations = guestList.map((guest) => ({
      id: guest.id,
      name: guest.name,
      relationship: guest.relationship,
      invitationUrl: generateInvitationLink(guest.name),
      shortCode: guest.id, // You can use this for shorter URLs
    }));

    return NextResponse.json({
      success: true,
      total: invitations.length,
      invitations,
    });
  } catch (error) {
    console.error('Error generating invitations:', error);
    return NextResponse.json(
      { error: 'Failed to generate invitations' },
      { status: 500 }
    );
  }
}
