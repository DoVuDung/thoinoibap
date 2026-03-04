import { NextResponse } from 'next/server';

// Firebase configuration
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'thoinoibap';
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Firebase REST API base URL
const FIREBASE_REST_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

export async function POST(req: Request) {
  const body = await req.json();
  const { guestName, status, message } = body;

  try {
    // Validate required fields
    if (!guestName || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: guestName and status are required' },
        { status: 400 }
      );
    }

    // Create RSVP document for Firebase
    const rsvpData = {
      fields: {
        guestName: { stringValue: guestName },
        status: { stringValue: status === 'yes' ? 'Attending' : 'Not Attending' },
        message: { stringValue: message || '' },
        createdAt: { timestampValue: new Date().toISOString() },
      },
    };

    // Save to Firebase using REST API
    const docId = Date.now().toString();
    const response = await fetch(
      `${FIREBASE_REST_URL}/rsvps/${docId}?key=${FIREBASE_API_KEY}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Firebase REST API error:', errorData);
      throw new Error(`Firebase error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log('RSVP saved to Firebase:', result.name);

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP recorded successfully',
      id: docId 
    });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json(
      { error: 'Failed to save RSVP', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all RSVPs (for admin)
export async function GET() {
  try {
    const response = await fetch(
      `${FIREBASE_REST_URL}/rsvps?key=${FIREBASE_API_KEY}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Firebase GET error:', errorData);
      throw new Error(`Firebase error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Transform Firebase documents to simple objects
    interface FirebaseDoc {
      name?: string;
      fields?: {
        guestName?: { stringValue?: string };
        status?: { stringValue?: string };
        message?: { stringValue?: string };
        createdAt?: { timestampValue?: string };
      };
    }
    
    interface RsvpItem {
      id: string;
      guestName: string;
      status: string;
      message: string;
      createdAt: string;
    }
    
    const rsvps = (data.documents || []).map((doc: FirebaseDoc): RsvpItem => {
      const fields = doc.fields || {};
      const docId = doc.name?.split('/').pop() || '';
      return {
        id: docId,
        guestName: fields.guestName?.stringValue || '',
        status: fields.status?.stringValue || '',
        message: fields.message?.stringValue || '',
        createdAt: fields.createdAt?.timestampValue || '',
      };
    }).sort((a: RsvpItem, b: RsvpItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      total: rsvps.length,
      rsvps,
    });
  } catch (error) {
    console.error('RSVP GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve RSVPs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
