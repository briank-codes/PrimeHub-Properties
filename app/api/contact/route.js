import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body?.name || !body?.phone) {
      return NextResponse.json({ error: 'Name and phone number are required.' }, { status: 400 })
    }

    // Demo-only contact handler.
    // In a real app, replace this with email delivery, CRM webhook, or database persistence.
    return NextResponse.json({ success: true, message: 'Contact request received.' })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process contact request.' }, { status: 500 })
  }
}
