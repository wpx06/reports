import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const searchParams = request.nextUrl.searchParams;
    
    // Extract data from Trafee postback
    const leadData = {
      platform: 'trafee',
      clickId: data.get('track') as string || searchParams.get('track'),
      country: data.get('country') as string || searchParams.get('country'),
      currency: data.get('currency') as string || searchParams.get('currency'),
      name: data.get('name') as string || searchParams.get('name'),
      goal: data.get('goal') as string || searchParams.get('goal'),
      extClickId: data.get('ext_click_id') as string || searchParams.get('ext_click_id'),
      sum: parseFloat(data.get('sum') as string || searchParams.get('sum') || '0'),
      saleTime: data.get('sale_time') ? new Date(data.get('sale_time') as string) : 
                 searchParams.get('sale_time') ? new Date(searchParams.get('sale_time')!) : null,
      subSource: data.get('sub_source') as string || searchParams.get('sub_source'),
      transactionId: data.get('transaction_id') as string || searchParams.get('transaction_id'),
      intClickId: data.get('int_click_id') as string || searchParams.get('int_click_id'),
      advTid: data.get('adv_tid') as string || searchParams.get('adv_tid'),
      ext1: data.get('ext1') as string || searchParams.get('ext1'),
      ext2: data.get('ext2') as string || searchParams.get('ext2'),
      ext3: data.get('ext3') as string || searchParams.get('ext3'),
      ext4: data.get('ext4') as string || searchParams.get('ext4'),
      ext5: data.get('ext5') as string || searchParams.get('ext5'),
      ext6: data.get('ext6') as string || searchParams.get('ext6'),
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
    console.error('Trafee postback error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract data from query parameters
    const leadData = {
      platform: 'trafee',
      clickId: searchParams.get('track'),
      country: searchParams.get('country'),
      currency: searchParams.get('currency'),
      name: searchParams.get('name'),
      goal: searchParams.get('goal'),
      extClickId: searchParams.get('ext_click_id'),
      sum: parseFloat(searchParams.get('sum') || '0'),
      saleTime: searchParams.get('sale_time') ? new Date(searchParams.get('sale_time')!) : null,
      subSource: searchParams.get('sub_source'),
      transactionId: searchParams.get('transaction_id'),
      intClickId: searchParams.get('int_click_id'),
      advTid: searchParams.get('adv_tid'),
      ext1: searchParams.get('ext1'),
      ext2: searchParams.get('ext2'),
      ext3: searchParams.get('ext3'),
      ext4: searchParams.get('ext4'),
      ext5: searchParams.get('ext5'),
      ext6: searchParams.get('ext6'),
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
    console.error('Trafee postback error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}