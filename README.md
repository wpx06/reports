# CPA Lead Dashboard

A comprehensive web application for receiving and displaying real-time lead data from multiple CPA platforms including Imonetizeit, Trafee, and Clickdealer.

## Features

- **Real-time Lead Tracking**: Receive and display leads instantly via WebSocket
- **Multi-Platform Support**: Compatible with Imonetizeit, Trafee, and Clickdealer
- **Advanced Filtering**: Filter by date range and search by ID
- **Country Flags**: Visual representation with country flags
- **Export Functionality**: Export data to CSV or JSON
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: New leads appear at the bottom of the table automatically

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite
- **Real-time**: Socket.IO
- **UI Components**: Lucide Icons, shadcn/ui components

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cpa-lead-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Setup database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Postback Configuration

### Imonetizeit
- **Postback URL**: `https://yourdomain.com/api/postback/imonetizeit`
- **Supported Macros**:
  - `<click_id>` - Primary click ID
  - `<click_id2>` to `<click_id5>` - Additional click IDs
  - `<token_1>`, `<token_2>` - Token values
  - `<payout>` - Revenue amount
  - `<country>` - Country code
  - `<os>` - Operating system
  - `<traffic_type>` - Traffic type
  - `<connection_type>` - Connection type
  - `<carrier>` - Mobile carrier
  - `<hold_payout>` - Hold status revenue

### Trafee
- **Postback URL**: `https://yourdomain.com/api/postback/trafee`
- **Supported Macros**:
  - `{track}` - Tracking value (primary ID)
  - `{country}` - Country code
  - `{currency}` - Currency code
  - `{name}` - Offer/smartlink name
  - `{goal}` - Conversion goal
  - `{ext_click_id}` - External click ID
  - `{sum}` - Conversion payout
  - `{sale_time}` - Sale timestamp
  - `{sub_source}` - Sub source
  - `{transaction_id}` - Transaction ID
  - `{int_click_id}` - Internal click ID
  - `{adv_tid}` - Advertiser transaction ID
  - `{ext1}` to `{ext6}` - Extra data fields

### Clickdealer
- **Postback URL**: `https://yourdomain.com/api/postback/clickdealer`
- **Supported Macros**:
  - `#s2#` - Sub ID 2 (primary click ID)
  - `#leadid#` - Lead ID
  - `#affid#` - Affiliate ID
  - `#oid#` - Offer ID
  - `#campid#` - Campaign ID
  - `#cid#` - Creative ID
  - `#tid#` - Transaction ID
  - `#s1#`, `#s3#` to `#s5#` - Additional Sub IDs
  - `#price#` - Payout amount
  - `#currency#` - Currency
  - `#price_usd#` - USD price
  - `#disposition#` - Disposition type
  - `#utcunixtime#` - Unix timestamp
  - `#sourcedate#` - Source date
  - `#fbclid#`, `#ttclid#`, `#gclid#`, `#xclid#` - Click identifiers
  - `#action_type#` - Action type
  - `#utm_source#`, `#utm_medium#`, `#utm_campaign#`, `#utm_term#`, `#utm_content#` - UTM parameters

## Usage

### Viewing Leads
1. Open the dashboard in your browser
2. Leads are displayed in real-time with newest at the bottom
3. Use filters to narrow down results:
   - **Date Range**: Select start and end dates
   - **Search ID**: Search by click ID, lead ID, or transaction ID

### Exporting Data
1. Apply desired filters
2. Choose export format (CSV or JSON)
3. Click the Export button
4. File will be downloaded automatically

### Real-time Updates
- New leads automatically appear at the bottom of the table
- Table maintains last 100 leads for optimal performance
- WebSocket connection ensures instant updates

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Traditional Hosting
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
3. Configure reverse proxy (nginx/Apache) if needed
4. Set up SSL certificate

### Docker Deployment
1. Build Docker image:
   ```bash
   docker build -t cpa-dashboard .
   ```
2. Run container:
   ```bash
   docker run -p 3000:3000 cpa-dashboard
   ```

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
```

## Database Schema

The application uses SQLite with Prisma ORM. The main `Lead` model includes:

- Platform identification
- Click IDs and transaction IDs
- Country and payout information
- Timestamps and metadata
- Platform-specific fields

## API Endpoints

### Postback Endpoints
- `POST/GET /api/postback/imonetizeit` - Receive Imonetizeit postbacks
- `POST/GET /api/postback/trafee` - Receive Trafee postbacks  
- `POST/GET /api/postback/clickdealer` - Receive Clickdealer postbacks

### Data Endpoints
- `GET /api/leads` - Fetch leads with pagination and filtering
- `GET /api/export` - Export leads data

### WebSocket
- `/api/socket/io` - WebSocket connection for real-time updates

## Security Considerations

- Postback URLs are publicly accessible
- Consider adding authentication tokens if needed
- Validate incoming data in production
- Use HTTPS in production
- Regular database backups

## Troubleshooting

### Common Issues

1. **Leads not appearing**
   - Check postback URL configuration
   - Verify network connectivity
   - Check browser console for WebSocket errors

2. **Database errors**
   - Run `npm run db:push` to update schema
   - Check database file permissions

3. **WebSocket connection issues**
   - Ensure WebSocket port is open
   - Check firewall settings
   - Verify CORS configuration

### Logs

Check the following logs for debugging:
- Application logs: `npm run dev` output
- Database logs: Prisma query logs
- WebSocket logs: Browser console

## Support

For issues and questions:
1. Check this README
2. Review the code comments
3. Check browser console for errors
4. Verify postback configurations

## License

This project is licensed under the MIT License.