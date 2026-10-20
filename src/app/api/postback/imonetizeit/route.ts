import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const searchParams = request.nextUrl.searchParams;
    
    // Extract data from Imonetizeit postback
    const leadData = {
      platform: 'imonetizeit',
      clickId: data.get('click_id') as string || searchParams.get('click_id'),
      clickId2: data.get('click_id2') as string || searchParams.get('click_id2'),
      clickId3: data.get('click_id3') as string || searchParams.get('click_id3'),
      clickId4: data.get('click_id4') as string || searchParams.get('click_id4'),
      clickId5: data.get('click_id5') as string || searchParams.get('click_id5'),
      token1: data.get('token_1') as string || searchParams.get('token_1'),
      token2: data.get('token_2') as string || searchParams.get('token_2'),
      payout: parseFloat(data.get('payout') as string || searchParams.get('payout') || '0'),
      country: data.get('country') as string || searchParams.get('country'),
      os: data.get('os') as string || searchParams.get('os'),
      trafficType: data.get('traffic_type') as string || searchParams.get('traffic_type'),
      connectionType: data.get('connection_type') as string || searchParams.get('connection_type'),
      carrier: data.get('carrier') as string || searchParams.get('carrier'),
      holdPayout: parseFloat(data.get('hold_payout') as string || searchParams.get('hold_payout') || '0'),
    };

    // Save to database
    const lead = await db.lead.create({
      data: leadData
    });

    // Emit real-time update via WebSocket
    if (global.io) {
      global.io.emit('newLead', lead);
    }

    return NextResponse.json({ status: 'success', leadId: lead.id });
  } catch (error) {
    console.error('Imonetizeit postback error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract data from query parameters
    const leadData = {
      platform: 'imonetizeit',
      clickId: searchParams.get('click_id'),
      clickId2: searchParams.get('click_id2'),
      clickId3: searchParams.get('click_id3'),
      clickId4: searchParams.get('click_id4'),
      clickId5: searchParams.get('click_id5'),
      token1: searchParams.get('token_1'),
      token2: searchParams.get('token_2'),
      payout: parseFloat(searchParams.get('payout') || '0'),
      country: searchParams.get('country'),
      os: searchParams.get('os'),
      trafficType: searchParams.get('traffic_type'),
      connectionType: searchParams.get('connection_type'),
      carrier: searchParams.get('carrier'),
      holdPayout: parseFloat(searchParams.get('hold_payout') || '0'),
    };

    // Save to database
    const lead = await db.lead.create({
      data: leadData
    });

    // Emit real-time update via WebSocket
    if (global.io) {
      global.io.emit('newLead', lead);
    }

    return NextResponse.json({ status: 'success', leadId: lead.id });
  } catch (error) {
    console.error('Imonetizeit postback error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}