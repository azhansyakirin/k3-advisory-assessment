import { NextResponse } from 'next/server';
import { createLead } from '@/services/createLead';
import { validateEnquiry } from '@/utils/validations/validateEnquiry';

export async function POST(req) {

  let body;

  /** Validate request format */
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
  }

  /** Validate enquiry data */
  const result = validateEnquiry(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.errors }, { status: 400 });
  }

  /** Create lead for every complete enquiry */
  try {
    const lead = await createLead(body);
    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'We could not submit your enquiry. Please try again later.' },
      { status: 502 }
    );
  }
}