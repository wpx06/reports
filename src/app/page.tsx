'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Download, Search, Filter } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Lead {
  id: string;
  platform: string;
  clickId?: string;
  leadId?: string;
  tid?: string;
  country?: string;
  payout?: number;
  sum?: number;
  priceUsd?: number;
  currency?: string;
  createdAt: string;
  transactionId?: string;
  name?: string;
  goal?: string;
}

interface CountryFlag {
  [key: string]: string;
}

const countryFlags: CountryFlag = {
  'US': '🇺🇸',
  'GB': '🇬🇧',
  'CA': '🇨🇦',
  'AU': '🇦🇺',
  'DE': '🇩🇪',
  'FR': '🇫🇷',
  'IT': '🇮🇹',
  'ES': '🇪🇸',
  'NL': '🇳🇱',
  'BR': '🇧🇷',
  'MX': '🇲🇽',
  'AR': '🇦🇷',
  'IN': '🇮🇳',
  'ID': '🇮🇩',
  'MY': '🇲🇾',
  'SG': '🇸🇬',
  'PH': '🇵🇭',
  'TH': '🇹🇭',
  'VN': '🇻🇳',
  'JP': '🇯🇵',
  'KR': '🇰🇷',
  'CN': '🇨🇳',
  'RU': '🇷🇺',
  'TR': '🇹🇷',
  'SA': '🇸🇦',
  'ZA': '🇿🇦',
  'NG': '🇳🇬',
  'EG': '🇪🇬',
  'KE': '🇰🇪',
  'GH': '🇬🇭',
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchId, setSearchId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [exportFormat, setExportFormat] = useState('csv');

  const fetchLeads = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '100',
      });

      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (searchId) params.append('searchId', searchId);

      const response = await fetch(`/api/leads?${params}`);
      const data = await response.json();

      if (data.leads) {
        setLeads(data.leads);
        setTotalPages(data.pagination.pages);
        setCurrentPage(data.pagination.page);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    // Initialize WebSocket connection
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('newLead', (newLead: Lead) => {
      setLeads(prevLeads => {
        const updatedLeads = [newLead, ...prevLeads];
        return updatedLeads.slice(0, 100); // Keep only last 100 leads
      });
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    fetchLeads(1);
  }, [startDate, endDate, searchId]);

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        format: exportFormat,
      });

      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/export?${params}`);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const getCountryFlag = (country?: string) => {
    if (!country) return '';
    return countryFlags[country.toUpperCase()] || '🌍';
  };

  const getPayout = (lead: Lead) => {
    return lead.payout || lead.sum || lead.priceUsd || 0;
  };

  const getLeadId = (lead: Lead) => {
    return lead.clickId || lead.leadId || lead.tid || 'N/A';
  };

  const getPlatformBadge = (platform: string) => {
    const colors = {
      'imonetizeit': 'bg-blue-100 text-blue-800',
      'trafee': 'bg-green-100 text-green-800',
      'clickdealer': 'bg-purple-100 text-purple-800',
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CPA Lead Dashboard</h1>
          <p className="text-gray-600">Real-time lead tracking from multiple CPA platforms</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Export
                </label>
                <div className="flex gap-2">
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleExport} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads (Last 100)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Payout</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Offer Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : leads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No leads found
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono text-sm">
                          {getLeadId(lead)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPlatformBadge(lead.platform)}>
                            {lead.platform}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getCountryFlag(lead.country)}</span>
                            <span>{lead.country || 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${getPayout(lead).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {lead.currency || 'USD'}
                        </TableCell>
                        <TableCell>
                          {new Date(lead.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {lead.name || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => fetchLeads(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => fetchLeads(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Postback URLs</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Imonetizeit:</strong>
              <code className="ml-2 bg-white px-2 py-1 rounded">
                {typeof window !== 'undefined' ? window.location.origin : ''}/api/postback/imonetizeit
              </code>
            </div>
            <div>
              <strong>Trafee:</strong>
              <code className="ml-2 bg-white px-2 py-1 rounded">
                {typeof window !== 'undefined' ? window.location.origin : ''}/api/postback/trafee
              </code>
            </div>
            <div>
              <strong>Clickdealer:</strong>
              <code className="ml-2 bg-white px-2 py-1 rounded">
                {typeof window !== 'undefined' ? window.location.origin : ''}/api/postback/clickdealer
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}