import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const format = searchParams.get('format') || 'csv';

    // Build where clause
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate + 'T23:59:59.999Z');
      }
    }

    // Get all leads matching criteria
    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    if (format === 'csv') {
      // Convert to CSV
      const headers = [
        'ID', 'Platform', 'Click ID', 'Country', 'Payout', 'Currency',
        'Created At', 'Transaction ID', 'Offer Name', 'Goal'
      ];

      const csvRows = [
        headers.join(','),
        ...leads.map(lead => [
          lead.clickId || lead.leadId || lead.tid || '',
          lead.platform,
          lead.clickId || lead.leadId || lead.tid || '',
          lead.country || '',
          lead.payout || lead.sum || lead.priceUsd || '0',
          lead.currency || 'USD',
          lead.createdAt.toISOString(),
          lead.transactionId || lead.tid || '',
          lead.name || '',
          lead.goal || '',
        ].map(field => `"${field}"`).join(','))
      ];

      const csvContent = csvRows.join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="leads_export_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else if (format === 'json') {
      return new NextResponse(JSON.stringify(leads, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="leads_export_${new Date().toISOString().split('T')[0]}.json"`,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}