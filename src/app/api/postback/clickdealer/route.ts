import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const searchParams = request.nextUrl.searchParams;
    
    // Extract data from Clickdealer postback
    const leadData = {
      platform: 'clickdealer',
      clickId: data.get('s2') as string || searchParams.get('s2'),
      leadId: data.get('leadid') as string || searchParams.get('leadid'),
      affid: data.get('affid') as string || searchParams.get('affid'),
      oid: data.get('oid') as string || searchParams.get('oid'),
      campid: data.get('campid') as string || searchParams.get('campid'),
      cid: data.get('cid') as string || searchParams.get('cid'),
      tid: data.get('tid') as string || searchParams.get('tid'),
      s1: data.get('s1') as string || searchParams.get('s1'),
      s3: data.get('s3') as string || searchParams.get('s3'),
      s4: data.get('s4') as string || searchParams.get('s4'),
      s5: data.get('s5') as string || searchParams.get('s5'),
      payout: parseFloat(data.get('price') as string || searchParams.get('price') || '0'),
      udid: data.get('udid') as string || searchParams.get('udid'),
      currency: data.get('currency') as string || searchParams.get('currency'),
      priceUsd: parseFloat(data.get('price_usd') as string || searchParams.get('price_usd') || '0'),
      disposition: data.get('disposition') as string || searchParams.get('disposition'),
      utcUnixTime: parseInt(data.get('utcunixtime') as string || searchParams.get('utcunixtime') || '0'),
      sourceDate: data.get('sourcedate') ? new Date(data.get('sourcedate') as string) : 
                  searchParams.get('sourcedate') ? new Date(searchParams.get('sourcedate')!) : null,
      fbclid: data.get('fbclid') as string || searchParams.get('fbclid'),
      ttclid: data.get('ttclid') as string || searchParams.get('ttclid'),
      gclid: data.get('gclid') as string || searchParams.get('gclid'),
      xclid: data.get('xclid') as string || searchParams.get('xclid'),
      actionType: data.get('action_type') as string || searchParams.get('action_type'),
      utmSource: data.get('utm_source') as string || searchParams.get('utm_source'),
      utmMedium: data.get('utm_medium') as string || searchParams.get('utm_medium'),
      utmCampaign: data.get('utm_campaign') as string || searchParams.get('utm_campaign'),
      utmTerm: data.get('utm_term') as string || searchParams.get('utm_term'),
      utmContent: data.get('utm_content') as string || searchParams.get('utm_content'),
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
    console.error('Clickdealer postback error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract data from query parameters
    const leadData = {
      platform: 'clickdealer',
      clickId: searchParams.get('s2'),
      leadId: searchParams.get('leadid'),
      affid: searchParams.get('affid'),
      oid: searchParams.get('oid'),
      campid: searchParams.get('campid'),
      cid: searchParams.get('cid'),
      tid: searchParams.get('tid'),
      s1: searchParams.get('s1'),
      s3: searchParams.get('s3'),
      s4: searchParams.get('s4'),
      s5: searchParams.get('s5'),
      payout: parseFloat(searchParams.get('price') || '0'),
      udid: searchParams.get('udid'),
      currency: searchParams.get('currency'),
      priceUsd: parseFloat(searchParams.get('price_usd') || '0'),
      disposition: searchParams.get('disposition'),
      utcUnixTime: parseInt(searchParams.get('utcunixtime') || '0'),
      sourceDate: searchParams.get('sourcedate') ? new Date(searchParams.get('sourcedate')!) : null,
      fbclid: searchParams.get('fbclid'),
      ttclid: searchParams.get('ttclid'),
      gclid: searchParams.get('gclid'),
      xclid: searchParams.get('xclid'),
      actionType: searchParams.get('action_type'),
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmTerm: searchParams.get('utm_term'),
      utmContent: searchParams.get('utm_content'),
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
    console.error('Clickdealer postback error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}