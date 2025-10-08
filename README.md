# Fake Investment Portfolio WebGUI

A web-based tool to create realistic-looking fake investment portfolios with screenshot capabilities. This tool is designed to help users generate convincing portfolio displays to protect against pump & dump scammers by providing them with fake portfolio information instead of real financial data.

## 🌐 Live Demo

The application is automatically deployed to GitHub Pages at: `https://gekkedev.github.io/fake-investment-portfolio/`

## ✨ Features

### Core Functionality
- **Portfolio Creation**: Build fake investment portfolios with customizable holdings
- **Multi-Currency Support**: Switch between USD, EUR, GBP, JPY, CAD, and AUD with automatic conversion
- **Transaction Management**: Add, edit, and delete fake transactions with retroactive dating (rückwirkend)
- **Multiple Views**: Portfolio summary, transaction history, and analytics
- **Screenshot Generation**: Clean HTML canvas-based screenshots without editing indicators
- **Mobile Interface**: Realistic mobile app appearance with multiple design templates
- **Data Persistence**: All portfolio settings including currency preferences are saved locally

### Interface Features
- **Clean Screenshot Mode**: Removes all editing buttons and fake indicators
- **Multiple Design Templates**: Generic mobile app styles, popular broker interfaces
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Portfolio values update automatically based on transactions
- **Currency Conversion**: Real-time conversion between supported currencies

### ✨ Automatic Stock Price Fetching
- **Instant Price Loading**: Pre-fetched prices for thousands of stocks
- **Real-time Fallback**: Falls back to live Stooq API when cached prices unavailable
- **⚠️ CORS Requirement**: Live API fetching only works in browsers with disabled CORS policies
- **Smart Input**: 1-second debounce prevents excessive API calls while typing
- **Manual Override**: Always allows manual price entry and editing
- **Visual Indicators**: 
  - 🔵 Pre-loaded cached prices with update date
  - 🟢 Live API prices when cache miss occurs
  - 🟡 Loading state while fetching
  - 🔴 Error with fallback instructions
- **Extensible Architecture**: Easy to add additional quote providers

### 📊 Portfolio Management
- Create and manage multiple assets
- Track quantity and current values
- Real-time portfolio calculations
- Transaction history tracking

### 📸 Screenshot Generation
- Clean, professional-looking portfolio screenshots
- Hide editing controls for authentic appearance
- Perfect for documentation or sharing

## 🚀 Quick Start

### Option 1: Use GitHub Pages (Recommended)
Visit the live demo at: `https://gekkedev.github.io/fake-investment-portfolio/`

### Option 2: Local Development
1. Clone this repository
2. Open `index.html` in your web browser
3. Start creating your fake portfolio
4. Generate screenshots for your needs

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage
- **Price Data**: 
  - Primary: Pre-fetched stock prices from local JSON file
  - Fallback: Stooq API (JSON format, no API key required)
- **Screenshots**: HTML Canvas API
- **Design**: Responsive CSS Grid/Flexbox
- **Dependencies**: Pure vanilla JavaScript for maximum compatibility

## 📁 Project Structure

```
├── app.js                         # Main application logic
├── index.html                     # Application UI
├── styles.css                     # Application styles
├── company_tickers_exchange.json  # SEC ticker symbol database
├── stock-prices.json              # Pre-fetched stock prices
└── screenshot-helper.html         # Helper page for screenshot generation
```

## 📱 Supported Views

1. **Portfolio Overview**: Summary of all holdings and total value
2. **Transaction History**: Chronological list of all transactions
3. **Analytics**: Portfolio performance metrics and analytics

## 💡 Price Fetching API

The application uses a **hybrid price fetching system** for optimal performance:

### Primary: Pre-fetched Prices
- **Source**: `stock-prices.json` (local file with sample data)
- **Coverage**: Sample ticker symbols for demonstration
- **Benefits**: Instant loading, no external dependencies

### Fallback: Live API
- **Endpoint**: `https://stooq.pl/q/l/?s=SYMBOL.US&f=sd2t2ohlcv&h&e=json`
- **Features**: 
  - No API key required
  - JSON format response
  - US stock market data
  - Delayed quotes (typically 15-20 minutes)
- **Usage**: When symbol not found in pre-fetched data

### Manual Override
Users can always enter prices manually if both automated systems fail.

## 🔒 Privacy & Security

- All portfolio data is stored locally in your browser
- Optional external API calls only for price fetching (Stooq service)
- No registration or personal information required
- Screenshots contain no traceable metadata

## 📖 Usage Guide

### Creating a Portfolio
1. Click "New Portfolio" to start
2. Add assets using the "Add Asset" button
3. Set initial quantities and purchase prices
4. Portfolio value will calculate automatically

### Adding Transactions
1. Select an asset from your portfolio
2. Click "Add Transaction"
3. Choose transaction type (buy/sell)
4. Set date (can be retroactive)
5. Enter quantity and price
6. Portfolio history will update automatically

### Generating Screenshots
1. Switch to "Screenshot Mode" to hide editing elements
2. Select desired design template
3. Click "Generate Screenshot"
4. Save the resulting image

## 🤝 Contributing

This is an open-source project. Feel free to contribute by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## ⚠️ Disclaimer & Legal Notice

This tool is intended for educational and protective purposes (scam baiting & deterrence) only. Users are responsible for ensuring their use complies with applicable laws and regulations. Use responsibly and in accordance with applicable laws and regulations - not for crimes!
Project planned with foresight, assembled under _vibe_ conditions.
