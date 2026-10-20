# CPA Lead Dashboard - User Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Dashboard Features](#dashboard-features)
3. [Understanding the Interface](#understanding-the-interface)
4. [Working with Leads](#working-with-leads)
5. [Postback Configuration](#postback-configuration)
6. [Exporting Data](#exporting-data)
7. [Best Practices](#best-practices)
8. [FAQ](#faq)

## 🎯 Overview

The CPA Lead Dashboard is a real-time tracking system that receives lead data from multiple CPA platforms and displays them in an organized, searchable interface. It supports Imonetizeit, Trafee, and Clickdealer platforms.

### Key Features:
- **Real-time Updates**: Leads appear instantly as they're received
- **Multi-Platform Support**: Works with major CPA networks
- **Advanced Filtering**: Search by date, ID, and platform
- **Data Export**: Download leads in CSV or JSON format
- **Country Visualization**: See country flags with lead data
- **Responsive Design**: Works on desktop and mobile devices

## 🖥️ Dashboard Features

### Main Dashboard Components

1. **Header Section**
   - Application title and description
   - Real-time connection status indicator

2. **Filter Panel**
   - Date range selector
   - ID search functionality
   - Export options

3. **Leads Table**
   - Real-time lead display
   - Sortable columns
   - Country flags
   - Platform badges

4. **Postback URLs Section**
   - Quick reference for platform URLs
   - Copy-to-clipboard functionality

## 🎨 Understanding the Interface

### Navigation Elements

#### Filter Panel
```
┌─────────────────────────────────────────────────────────┐
│ 📅 Start Date    📅 End Date    🔍 Search ID    📥 Export │
└─────────────────────────────────────────────────────────┘
```

**Date Range Filters:**
- **Start Date**: Shows leads from this date onwards
- **End Date**: Shows leads up to this date (inclusive)
- Both dates work together to create a range filter

**Search ID:**
- Searches across: Click ID, Lead ID, Transaction ID
- Real-time search as you type
- Case-insensitive matching

**Export Options:**
- **CSV Format**: Excel-compatible spreadsheet
- **JSON Format**: Machine-readable data format
- Downloads all filtered data

### Leads Table

#### Column Descriptions

| Column | Description | Example |
|--------|-------------|---------|
| **ID** | Unique identifier from platform | `ABC123`, `track456`, `s2789` |
| **Platform** | Source CPA network | `imonetizeit`, `trafee`, `clickdealer` |
| **Country** | Lead's country with flag | 🇺🇸 US, 🇬🇧 GB, 🇨🇦 CA |
| **Payout** | Revenue amount | `$5.50`, `$10.00` |
| **Currency** | Currency type | `USD`, `EUR`, `GBP` |
| **Date & Time** | When lead was received | `2024-01-15 14:30:25` |
| **Offer Name** | Campaign or offer name | `Mobile Survey`, `App Install` |

#### Platform Badges
- **Imonetizeit**: Blue badge `imonetizeit`
- **Trafee**: Green badge `trafee`
- **Clickdealer**: Purple badge `clickdealer`

#### Real-time Behavior
- New leads appear at the **bottom** of the table
- Table maintains last 100 leads for performance
- Automatic scrolling to show new leads
- Smooth animations for new entries

## 📊 Working with Leads

### Viewing Leads

1. **All Leads View**
   - Shows the most recent 100 leads
   - Automatically updates in real-time
   - Newest leads appear at the bottom

2. **Filtered View**
   - Apply date filters to see specific time periods
   - Use search to find specific leads
   - Export filtered results

### Understanding Lead Data

#### Lead Identification
Each lead can be identified by:
- **Click ID**: Primary tracking identifier
- **Lead ID**: Platform-specific lead identifier
- **Transaction ID**: Transaction reference

#### Country Information
- **Flag Emoji**: Visual country representation
- **Country Code**: ISO country code (US, GB, CA, etc.)
- **Geographic Data**: Based on IP or platform data

#### Payout Information
- **Amount**: Revenue generated from lead
- **Currency**: Local currency if available
- **Conversion**: Automatic USD conversion when needed

### Real-time Updates

#### How Real-time Works
1. CPA platform sends postback to your server
2. Server processes and stores the data
3. WebSocket pushes update to all connected browsers
4. Table updates with new lead at the bottom

#### Connection Status
- **Green**: Connected and receiving updates
- **Yellow**: Reconnecting
- **Red**: Disconnected (refresh page)

## 🔗 Postback Configuration

### Platform-Specific Setup

#### Imonetizeit Configuration
```
Postback URL: https://yourdomain.com/api/postback/imonetizeit
Method: GET or POST
Required Macros: <click_id>, <payout>, <country>
Optional Macros: <click_id2-5>, <token_1-2>, <os>, <traffic_type>
```

**Example Postback:**
```
https://yourdomain.com/api/postback/imonetizeit?click_id=ABC123&payout=5.50&country=US&os=Android
```

#### Trafee Configuration
```
Postback URL: https://yourdomain.com/api/postback/trafee
Method: GET or POST
Required Macros: {track}, {sum}, {country}
Optional Macros: {name}, {goal}, {currency}, {ext_click_id}
```

**Example Postback:**
```
https://yourdomain.com/api/postback/trafee?track=DEF456&sum=10.00&country=GB&name=Mobile%20Offer
```

#### Clickdealer Configuration
```
Postback URL: https://yourdomain.com/api/postback/clickdealer
Method: GET or POST
Required Macros: #s2#, #price#, #country#
Optional Macros: #leadid#, #affid#, #oid#, #campid#
```

**Example Postback:**
```
https://yourdomain.com/api/postback/clickdealer?s2=GHI789&price=7.25&country=CA&leadid=L12345
```

### Testing Postbacks

#### Manual Testing
```bash
# Test Imonetizeit
curl "https://yourdomain.com/api/postback/imonetizeit?click_id=test123&payout=5.50&country=US"

# Test Trafee
curl "https://yourdomain.com/api/postback/trafee?track=test456&sum=10.00&country=GB"

# Test Clickdealer
curl "https://yourdomain.com/api/postback/clickdealer?s2=test789&price=7.25&country=CA"
```

#### Automated Testing
Use platform's test postback feature or tools like:
- Postman
- curl commands
- Platform's built-in testing

## 📤 Exporting Data

### Export Options

#### CSV Export
- **Format**: Comma-separated values
- **Compatibility**: Excel, Google Sheets, Numbers
- **Use Case**: Data analysis, reporting
- **File Extension**: `.csv`

#### JSON Export
- **Format**: JavaScript Object Notation
- **Compatibility**: Programming languages, APIs
- **Use Case**: Integration, data processing
- **File Extension**: `.json`

### Export Process

1. **Apply Filters** (Optional)
   - Set date range
   - Search for specific IDs
   - Choose platform if needed

2. **Select Format**
   - Choose CSV for spreadsheet use
   - Choose JSON for programmatic use

3. **Download File**
   - Click Export button
   - File downloads automatically
   - Check browser downloads folder

### Export File Structure

#### CSV Format
```csv
ID,Platform,Country,Payout,Currency,Created At,Transaction ID,Offer Name,Goal
ABC123,imonetizeit,US,5.50,USD,2024-01-15T14:30:25.000Z,,Mobile Survey,
DEF456,trafee,GB,10.00,GBP,2024-01-15T14:31:10.000Z,TX123,App Install,Install
GHI789,clickdealer,CA,7.25,CAD,2024-01-15T14:32:05.000Z,TX456,Survey,Complete
```

#### JSON Format
```json
[
  {
    "id": "abc123",
    "platform": "imonetizeit",
    "clickId": "ABC123",
    "country": "US",
    "payout": 5.50,
    "currency": "USD",
    "createdAt": "2024-01-15T14:30:25.000Z",
    "transactionId": null,
    "name": "Mobile Survey",
    "goal": null
  }
]
```

## 💡 Best Practices

### Data Management

#### Regular Export
- Export data daily for backup
- Use date filters for specific periods
- Store exports in organized folders

#### Data Quality
- Monitor for duplicate leads
- Verify payout amounts
- Check country data accuracy

### Performance Optimization

#### Browser Performance
- Keep browser tab open for real-time updates
- Refresh page if connection issues occur
- Use modern browsers (Chrome, Firefox, Safari)

#### Server Performance
- Monitor server resources
- Regular database maintenance
- Implement backup strategies

### Security Considerations

#### Postback URL Security
- Use HTTPS in production
- Consider adding authentication tokens
- Monitor for suspicious activity

#### Data Privacy
- Comply with GDPR/CCPA if applicable
- Secure database access
- Regular security updates

## ❓ FAQ

### General Questions

**Q: How many leads can the dashboard handle?**
A: The dashboard displays the last 100 leads in real-time, but stores all leads in the database. Use export to access historical data.

**Q: Can I customize the dashboard?**
A: The dashboard is built with modern web technologies and can be customized. Contact support for enterprise customizations.

**Q: Is my data secure?**
A: Yes, data is stored locally in your database. Use HTTPS and proper server security for production deployments.

### Technical Questions

**Q: Why aren't my leads appearing?**
A: Check:
1. Postback URL is correct
2. Platform is sending data
3. No firewall blocking requests
4. Database is properly initialized

**Q: Can I integrate with other platforms?**
A: The dashboard supports Imonetizeit, Trafee, and Clickdealer. Additional platforms can be added with custom development.

**Q: How do I backup my data?**
A: Regularly export data and backup the database file. See the deployment guide for automated backup options.

### Troubleshooting

**Q: Real-time updates stopped working**
A: Refresh the page and check your internet connection. If issues persist, check server logs.

**Q: Export is not working**
A: Ensure you have the latest browser version and check if pop-ups are blocked for your site.

**Q: Country flags are not showing**
A: This is normal for unrecognized country codes. The system supports 50+ common countries.

---

## 📞 Support

### Getting Help
- **Documentation**: Check this guide and other documentation files
- **Community**: Join our Discord server
- **Email Support**: support@yourdomain.com
- **GitHub Issues**: Report bugs and request features

### Video Tutorials
- [Installation Guide](https://youtube.com/watch?v=example)
- [Platform Setup](https://youtube.com/watch?v=example)
- [Advanced Features](https://youtube.com/watch?v=example)

### Updates and Maintenance
- Regular updates with new features
- Security patches and bug fixes
- Platform compatibility updates
- Performance improvements

---

Thank you for using CPA Lead Dashboard! 🚀