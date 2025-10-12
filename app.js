// Fake Investment Portfolio Application

/**
 * Ticker Service for fetching company ticker information
 * Provides company name lookup for stock symbols with fallback data
 */
class TickerService {
    constructor() {
        this.tickerData = null;
        this.secEndpoint = 'https://www.sec.gov/files/company_tickers_exchange.json';
        this.localTickerFile = './company_tickers_exchange.json';
        this.fallbackTickers = null;
        this.initialized = false;
    }

    /**
     * Initialize the ticker service by attempting to fetch SEC data
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            console.log('Attempting to fetch SEC ticker data...');
            const response = await fetch(this.secEndpoint);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.tickerData = this.processSECData(data);
            console.log(`Successfully loaded ${Object.keys(this.tickerData).length} tickers from SEC`);
        } catch (error) {
            console.warn('Failed to fetch SEC ticker data:', error.message);
            console.log('Attempting to load from local ticker file...');
            
            try {
                const localResponse = await fetch(this.localTickerFile);
                if (!localResponse.ok) {
                    throw new Error(`HTTP ${localResponse.status}: ${localResponse.statusText}`);
                }
                const localData = await localResponse.json();
                this.tickerData = this.processSECData(localData);
                console.log(`Successfully loaded ${Object.keys(this.tickerData).length} tickers from local file`);
            } catch (localError) {
                console.warn('Failed to load local ticker file:', localError.message);
                console.log('Using minimal fallback ticker database');
                this.tickerData = this.getMinimalFallbackTickers();
            }
        }
        
        this.initialized = true;
    }

    /**
     * Process SEC data into a more usable format
     * @param {Object} data - Raw SEC API response
     * @returns {Object} Processed ticker data
     */
    processSECData(data) {
        const processed = {};
        
        if (data.data && typeof data.data === 'object') {
            for (const entry of Object.values(data.data)) {
                if (Array.isArray(entry) && entry.length >= 2) {
                    const [cik, name, ticker] = entry;
                    if (ticker && name) {
                        processed[ticker.toUpperCase()] = {
                            name: name.trim(),
                            ticker: ticker.toUpperCase(),
                            source: 'SEC'
                        };
                    }
                }
            }
        }
        
        return processed;
    }

    /**
     * Get minimal fallback ticker data for common stocks (last resort)
     * @returns {Object} Minimal fallback ticker database
     */
    getMinimalFallbackTickers() {
        return {
            'AAPL': { name: 'Apple Inc.', ticker: 'AAPL', source: 'fallback' },
            'MSFT': { name: 'Microsoft Corporation', ticker: 'MSFT', source: 'fallback' },
            'GOOGL': { name: 'Alphabet Inc.', ticker: 'GOOGL', source: 'fallback' },
            'GOOG': { name: 'Alphabet Inc.', ticker: 'GOOG', source: 'fallback' },
            'AMZN': { name: 'Amazon.com Inc.', ticker: 'AMZN', source: 'fallback' },
            'TSLA': { name: 'Tesla Inc.', ticker: 'TSLA', source: 'fallback' },
            'META': { name: 'Meta Platforms Inc.', ticker: 'META', source: 'fallback' },
            'NVDA': { name: 'NVIDIA Corporation', ticker: 'NVDA', source: 'fallback' },
            'JPM': { name: 'JPMorgan Chase & Co.', ticker: 'JPM', source: 'fallback' },
            'JNJ': { name: 'Johnson & Johnson', ticker: 'JNJ', source: 'fallback' },
            'V': { name: 'Visa Inc.', ticker: 'V', source: 'fallback' },
            'WMT': { name: 'Walmart Inc.', ticker: 'WMT', source: 'fallback' },
            'PG': { name: 'Procter & Gamble Company', ticker: 'PG', source: 'fallback' },
            'MA': { name: 'Mastercard Incorporated', ticker: 'MA', source: 'fallback' },
            'UNH': { name: 'UnitedHealth Group Incorporated', ticker: 'UNH', source: 'fallback' },
            'HD': { name: 'Home Depot Inc.', ticker: 'HD', source: 'fallback' },
            'BAC': { name: 'Bank of America Corporation', ticker: 'BAC', source: 'fallback' },
            'XOM': { name: 'Exxon Mobil Corporation', ticker: 'XOM', source: 'fallback' },
            'DIS': { name: 'Walt Disney Company', ticker: 'DIS', source: 'fallback' },
            'KO': { name: 'Coca-Cola Company', ticker: 'KO', source: 'fallback' },
            'BTC': { name: 'Bitcoin', ticker: 'BTC', source: 'fallback' },
            'ETH': { name: 'Ethereum', ticker: 'ETH', source: 'fallback' }
        };
    }

    /**
     * Lookup company name by ticker symbol
     * @param {string} ticker - Stock ticker symbol
     * @returns {Object|null} Company information or null if not found
     */
    async lookupTicker(ticker) {
        if (!this.initialized) {
            await this.initialize();
        }
        
        if (!ticker || typeof ticker !== 'string') {
            return null;
        }
        
        const upperTicker = ticker.toUpperCase();
        return this.tickerData[upperTicker] || null;
    }

    /**
     * Search for tickers matching a query
     * @param {string} query - Search query (partial ticker or company name)
     * @param {number} limit - Maximum number of results (default: 10)
     * @returns {Array} Array of matching ticker objects
     */
    async searchTickers(query, limit = 10) {
        if (!this.initialized) {
            await this.initialize();
        }
        
        if (!query || typeof query !== 'string' || query.length < 1) {
            return [];
        }
        
        const lowerQuery = query.toLowerCase();
        const results = [];
        
        for (const [ticker, info] of Object.entries(this.tickerData)) {
            if (results.length >= limit) break;
            
            if (ticker.toLowerCase().includes(lowerQuery) ||
                info.name.toLowerCase().includes(lowerQuery)) {
                results.push({
                    ...info,
                    relevance: this.calculateRelevance(query, ticker, info.name)
                });
            }
        }
        
        // Sort by relevance (higher is better)
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    /**
     * Calculate relevance score for search results
     * @param {string} query - Search query
     * @param {string} ticker - Ticker symbol
     * @param {string} name - Company name
     * @returns {number} Relevance score
     */
    calculateRelevance(query, ticker, name) {
        const lowerQuery = query.toLowerCase();
        const lowerTicker = ticker.toLowerCase();
        const lowerName = name.toLowerCase();
        
        let score = 0;
        
        // Exact ticker match gets highest score
        if (lowerTicker === lowerQuery) score += 100;
        // Ticker starts with query gets high score
        else if (lowerTicker.startsWith(lowerQuery)) score += 80;
        // Ticker contains query gets medium score
        else if (lowerTicker.includes(lowerQuery)) score += 40;
        
        // Company name matches
        if (lowerName.includes(lowerQuery)) {
            if (lowerName.startsWith(lowerQuery)) score += 60;
            else score += 30;
        }
        
        return score;
    }
}

/**
 * Quote Service for fetching stock prices from various providers
 * Currently supports Stooq as the default JSON provider
 */
class QuoteService {
    constructor() {
        this.defaultProvider = 'stooq';
        this.providers = {
            stooq: {
                name: 'Stooq',
                endpoint: 'https://stooq.pl/q/l/?s={symbol}.US&f=sd2t2ohlcv&h&e=json',
                format: 'json'
            }
        };
    }

    /**
     * Fetch stock price for a given symbol
     * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'MSFT')
     * @param {string} provider - Provider to use (defaults to 'stooq')
     * @returns {Promise<{price: number, source: string, timestamp: string} | null>}
     */
    async fetchPrice(symbol, provider = this.defaultProvider) {
        if (!symbol || typeof symbol !== 'string') {
            throw new Error('Invalid symbol provided');
        }

        const providerConfig = this.providers[provider];
        if (!providerConfig) {
            throw new Error(`Unknown provider: ${provider}`);
        }

        try {
            const url = providerConfig.endpoint.replace('{symbol}', symbol.toUpperCase());
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return this.parseStooqResponse(data, symbol);
        } catch (error) {
            console.warn(`Failed to fetch price for ${symbol} from ${provider}:`, error);
            return null;
        }
    }

    /**
     * Parse Stooq API response
     * @param {Object} data - API response data
     * @param {string} symbol - Original symbol requested
     * @returns {Object|null} Parsed price data
     */
    parseStooqResponse(data, symbol) {
        if (!data || !data.symbols || !Array.isArray(data.symbols) || data.symbols.length === 0) {
            return null;
        }

        const symbolData = data.symbols[0];
        if (!symbolData || typeof symbolData.c !== 'number') {
            return null;
        }

        return {
            price: symbolData.c, // Close price
            source: 'Stooq',
            timestamp: new Date().toISOString(),
            symbol: symbol.toUpperCase()
        };
    }
}

/**
 * Prefilled Price Service for loading locally stored stock prices
 * This service loads prices from GitHub Actions updated data
 */
class PrefilledPriceService {
    constructor() {
        this.priceData = null;
        this.initialized = false;
    }

    /**
     * Initialize the service by loading price data
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            console.log('Loading prefilled stock prices...');
            const response = await fetch('./stock-prices.json');
            
            if (response.ok) {
                this.priceData = await response.json();
                console.log(`Loaded ${this.priceData.totalSymbols} prefilled stock prices, last updated: ${this.priceData.lastUpdated}`);
            } else {
                console.warn('Failed to load prefilled prices:', response.status);
                this.priceData = { prices: {} };
            }
        } catch (error) {
            console.warn('Error loading prefilled prices:', error.message);
            this.priceData = { prices: {} };
        }
        
        this.initialized = true;
    }

    /**
     * Get price for a symbol
     * @param {string} symbol - Stock symbol
     * @returns {Object|null} Price data or null if not found
     */
    getPrice(symbol) {
        if (!this.initialized || !this.priceData) {
            return null;
        }
        
        const upperSymbol = symbol.toUpperCase();
        return this.priceData.prices[upperSymbol] || null;
    }

    /**
     * Check if price data is available for a symbol
     * @param {string} symbol - Stock symbol
     * @returns {boolean} True if price is available
     */
    hasPrice(symbol) {
        if (!this.initialized || !this.priceData) {
            return false;
        }
        
        const upperSymbol = symbol.toUpperCase();
        return upperSymbol in this.priceData.prices;
    }

    /**
     * Get metadata about the price data
     * @returns {Object} Metadata
     */
    getMetadata() {
        if (!this.initialized || !this.priceData) {
            return { lastUpdated: null, totalSymbols: 0 };
        }
        
        return {
            lastUpdated: this.priceData.lastUpdated,
            totalSymbols: this.priceData.totalSymbols || 0,
            updateSource: this.priceData.updateSource || 'Unknown'
        };
    }
}

class InvestmentPortfolio {
    constructor() {
        this.assets = this.loadAssets();
        this.transactions = this.loadTransactions();
        this.settings = this.loadSettings();
        this.balance = this.loadBalance();
        this.isScreenshotMode = false;
        this.currentTheme = this.settings.theme || 'default';
        
        // Initialize quote service for automatic price fetching
        this.quoteService = new QuoteService();
        
        // Initialize prefilled price service for faster price loading
        this.prefilledPriceService = new PrefilledPriceService();
        
        // Initialize ticker service for company name lookup
        this.tickerService = new TickerService();
        
        this.initializeCurrencies();
        this.initializeBalance();
        this.initializeTheme();
        this.initializeApp();
        this.bindEvents();
        this.updatePortfolio();
        
        // Initialize prefilled prices asynchronously
        this.prefilledPriceService.initialize();
    }

    // Initialize currencies and settings
    initializeCurrencies() {
        this.currencies = {
            USD: { symbol: '$', name: 'US Dollar', rate: 1.0 },
            EUR: { symbol: '€', name: 'Euro', rate: 0.85 },
            GBP: { symbol: '£', name: 'British Pound', rate: 0.73 },
            JPY: { symbol: '¥', name: 'Japanese Yen', rate: 110.0 },
            CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.25 },
            AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.35 }
        };
        
        // Set default currency if not set
        if (!this.settings.currency) {
            this.settings.currency = this.detectLocaleCurrency();
            this.saveSettings();
        }
        
        // Update currency selector
        const selector = document.getElementById('currency-selector');
        if (selector) {
            selector.value = this.settings.currency;
        }
        
        // Update form labels
        this.updateFormLabels();
    }

    // Detect currency based on browser locale
    detectLocaleCurrency() {
        try {
            const locale = navigator.language || navigator.languages[0] || 'en-US';
            
            // Map common locales to currencies
            const localeToCurrency = {
                'en-US': 'USD', 'en': 'USD',
                'en-GB': 'GBP', 'en-UK': 'GBP',
                'en-CA': 'CAD',
                'en-AU': 'AUD', 'en-NZ': 'AUD',
                'de': 'EUR', 'de-DE': 'EUR', 'de-AT': 'EUR',
                'fr': 'EUR', 'fr-FR': 'EUR', 'fr-BE': 'EUR',
                'it': 'EUR', 'it-IT': 'EUR',
                'es': 'EUR', 'es-ES': 'EUR',
                'nl': 'EUR', 'nl-NL': 'EUR',
                'pt': 'EUR', 'pt-PT': 'EUR',
                'ja': 'JPY', 'ja-JP': 'JPY'
            };
            
            // Try exact match first
            if (localeToCurrency[locale]) {
                return localeToCurrency[locale];
            }
            
            // Try language code match
            const languageCode = locale.split('-')[0];
            if (localeToCurrency[languageCode]) {
                return localeToCurrency[languageCode];
            }
            
            // Try using Intl.NumberFormat to detect currency for the locale
            try {
                const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
                const options = formatter.resolvedOptions();
                
                // Check if the locale suggests a specific region
                if (locale.includes('-GB') || locale.includes('-UK')) return 'GBP';
                if (locale.includes('-CA')) return 'CAD';
                if (locale.includes('-AU') || locale.includes('-NZ')) return 'AUD';
                if (locale.includes('-JP')) return 'JPY';
                if (locale.includes('-DE') || locale.includes('-FR') || locale.includes('-IT') || 
                    locale.includes('-ES') || locale.includes('-NL') || locale.includes('-AT') ||
                    locale.includes('-BE') || locale.includes('-PT')) return 'EUR';
            } catch (e) {
                // Ignore errors in Intl.NumberFormat
            }
            
        } catch (error) {
            console.warn('Error detecting locale currency:', error);
        }
        
        // Default fallback
        return 'USD';
    }

    // Update form labels with current currency
    updateFormLabels() {
        const currencySymbol = this.getCurrentCurrencySymbol();
        
        const assetPriceLabel = document.getElementById('asset-price-label');
        if (assetPriceLabel) {
            assetPriceLabel.textContent = `Current Price (${currencySymbol}):`;
        }
        
        const transactionPriceLabel = document.getElementById('transaction-price-label');
        if (transactionPriceLabel) {
            transactionPriceLabel.textContent = `Price per unit (${currencySymbol}):`;
        }
    }

    // Initialize theme from settings
    initializeTheme() {
        // Define themes with their broker names
        this.themes = {
            default: { name: 'Default', brokerName: 'Investment Portfolio' },
            mobile: { name: 'Mobile', brokerName: 'MobileTrade Pro' },
            broker: { name: 'Broker', brokerName: 'GreenField Capital' },
            tradepro: { name: 'TradePro', brokerName: 'TradePro Securities' },
            wealthmax: { name: 'WealthMax', brokerName: 'WealthMax Advisors' },
            marketedge: { name: 'MarketEdge', brokerName: 'MarketEdge Financial' },
            investcorp: { name: 'InvestCorp', brokerName: 'InvestCorp Holdings' },
            financehub: { name: 'FinanceHub', brokerName: 'FinanceHub Trading' }
        };
        
        const themeKeys = Object.keys(this.themes);
        
        // Ensure the current theme is valid
        if (!themeKeys.includes(this.currentTheme)) {
            this.currentTheme = 'default';
        }
        
        // Apply the saved theme
        themeKeys.forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
        });
        
        if (this.currentTheme !== 'default') {
            document.body.classList.add(`theme-${this.currentTheme}`);
        }
        
        // Update button text
        const themeButton = document.getElementById('theme-selector');
        if (themeButton) {
            themeButton.innerHTML = `<i class="fas fa-palette"></i> ${this.themes[this.currentTheme].name}`;
        }
        
        // Initialize broker name
        this.initializeBrokerName();
    }

    // Initialize the application
    initializeApp() {
        // Set default date for transaction form
        const now = new Date();
        const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        document.getElementById('transaction-date').value = localDateTime;
        
        this.updateViews();
    }

    // Bind event listeners
    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Currency selector
        document.getElementById('currency-selector').addEventListener('change', (e) => {
            this.settings.currency = e.target.value;
            this.saveSettings();
            this.updateFormLabels();
            this.updatePortfolio();
        });

        // Modal controls
        document.getElementById('add-asset-btn').addEventListener('click', () => {
            this.openModal('add-asset-modal');
            // Clear any previous price status when opening the modal
            this.clearPriceStatus();
            // Hide NASDAQ link when opening the modal
            this.updateAssetNasdaqLink('');
        });

        document.getElementById('add-transaction-btn').addEventListener('click', () => {
            this.openModal('add-transaction-modal');
            this.populateAssetSelect();
            // Clear quantity field when opening the modal
            document.getElementById('transaction-quantity').value = '';
        });

        // Form submissions
        document.getElementById('add-asset-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAsset();
        });

        document.getElementById('add-transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        // Transaction asset selection change handler
        document.getElementById('transaction-asset').addEventListener('change', (e) => {
            this.updateTransactionNasdaqLink(e.target.value);
            this.updateTransactionQuantity();
        });

        // Transaction type change handler
        document.getElementById('transaction-type').addEventListener('change', (e) => {
            this.updateTransactionQuantity();
        });

        // Price fetching and ticker suggestions functionality
        const assetSymbolInput = document.getElementById('asset-symbol');
        const assetNameInput = document.getElementById('asset-name');
        const fetchPriceBtn = document.getElementById('fetch-price-btn');
        const tickerSuggestions = document.getElementById('ticker-suggestions');

        // Auto-fetch price and show ticker suggestions when symbol is entered (with debounce)
        let symbolInputTimeout;
        let suggestionTimeout;
        let selectedSuggestionIndex = -1;

        assetSymbolInput.addEventListener('input', (e) => {
            clearTimeout(symbolInputTimeout);
            clearTimeout(suggestionTimeout);
            const symbol = e.target.value.trim();
            
            // Update NASDAQ link for Add New Asset modal
            this.updateAssetNasdaqLink(symbol);
            
            if (symbol.length >= 1) {
                // Show ticker suggestions immediately
                suggestionTimeout = setTimeout(() => {
                    this.showTickerSuggestions(symbol);
                }, 200);
                
                // Fetch price after user stops typing
                symbolInputTimeout = setTimeout(() => {
                    this.fetchAndUpdatePrice(symbol.toUpperCase());
                }, 1000);
            } else {
                this.clearPriceStatus();
                this.hideTickerSuggestions();
            }
            
            selectedSuggestionIndex = -1;
        });

        // Handle keyboard navigation for ticker suggestions
        assetSymbolInput.addEventListener('keydown', (e) => {
            const suggestions = tickerSuggestions.querySelectorAll('.ticker-suggestion');
            if (suggestions.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
                    this.updateSuggestionSelection(suggestions, selectedSuggestionIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
                    this.updateSuggestionSelection(suggestions, selectedSuggestionIndex);
                    break;
                case 'Enter':
                    if (selectedSuggestionIndex >= 0) {
                        e.preventDefault();
                        this.selectTickerSuggestion(suggestions[selectedSuggestionIndex]);
                    }
                    break;
                case 'Escape':
                    this.hideTickerSuggestions();
                    selectedSuggestionIndex = -1;
                    break;
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.symbol-input-container')) {
                this.hideTickerSuggestions();
            }
        });

        // Manual price fetch button
        fetchPriceBtn.addEventListener('click', () => {
            const symbol = assetSymbolInput.value.trim().toUpperCase();
            if (symbol) {
                this.fetchAndUpdatePrice(symbol);
            }
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.closest('.modal').id;
                this.closeModal(modalId);
                // Clear price status when closing add asset modal
                if (modalId === 'add-asset-modal') {
                    this.clearPriceStatus();
                    // Hide NASDAQ link when closing the modal
                    this.updateAssetNasdaqLink('');
                }
            });
        });

        // Screenshot controls
        document.getElementById('screenshot-mode-btn').addEventListener('click', () => {
            this.toggleScreenshotMode();
        });

        document.getElementById('generate-screenshot').addEventListener('click', () => {
            this.generateScreenshot();
        });

        // Print statement button
        document.getElementById('print-statement').addEventListener('click', () => {
            this.generatePrintStatement();
        });

        // Theme selector
        document.getElementById('theme-selector').addEventListener('click', () => {
            this.cycleTheme();
        });

        // Broker name editor
        document.getElementById('edit-broker-name').addEventListener('click', () => {
            this.showBrokerNameEditor();
        });

        // Balance editor
        document.getElementById('edit-balance').addEventListener('click', () => {
            this.showBalanceEditor();
        });

        // Hamburger menu toggle
        const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        
        hamburgerMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerMenu.classList.toggle('active');
        });

        // Close hamburger menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hamburger-menu') && !e.target.closest('.hamburger-menu-btn')) {
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close hamburger menu when clicking on menu items (except currency selector)
        hamburgerMenu.addEventListener('click', (e) => {
            if (e.target.closest('.menu-btn')) {
                hamburgerMenu.classList.remove('active');
            }
        });

        // Close modal on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // ESC key handler for screenshot mode
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isScreenshotMode) {
                this.exitScreenshotMode();
            }
        });

        // Reset portfolio button
        document.getElementById('reset-portfolio-btn').addEventListener('click', () => {
            this.showResetConfirmation();
        });

        // Reset confirmation
        document.getElementById('confirm-reset-btn').addEventListener('click', () => {
            const resetBrokerTheme = document.getElementById('reset-broker-theme-checkbox').checked;
            this.resetPortfolio(resetBrokerTheme);
        });

        // Export data button
        document.getElementById('export-data-btn').addEventListener('click', () => {
            this.exportData();
        });

        // Import data button
        document.getElementById('import-data-btn').addEventListener('click', () => {
            this.showImportConfirmation();
        });

        // Import file selection
        document.getElementById('select-file-btn').addEventListener('click', () => {
            document.getElementById('import-file-input').click();
        });

        // Import file input change
        document.getElementById('import-file-input').addEventListener('change', (e) => {
            this.handleFileSelection(e);
        });

        // Import confirmation
        document.getElementById('confirm-import-btn').addEventListener('click', () => {
            this.importData();
        });
    }

    // Switch between views
    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');

        // Update analytics if switching to analytics
        if (viewName === 'analytics') {
            this.updateAnalytics();
        }
    }

    // Asset Management
    addAsset() {
        const symbol = document.getElementById('asset-symbol').value.toUpperCase();
        const name = document.getElementById('asset-name').value;
        const quantity = parseFloat(document.getElementById('asset-quantity').value);
        const priceInput = document.getElementById('asset-price');
        const inputPrice = parseFloat(priceInput.value);

        if (this.assets.find(asset => asset.symbol === symbol)) {
            alert('Asset already exists in portfolio');
            return;
        }

        // Convert price to USD for storage
        let priceInUSD;
        if (priceInput.dataset.usdPrice) {
            // If we have the original USD price from API, use it
            priceInUSD = parseFloat(priceInput.dataset.usdPrice);
        } else {
            // Convert the input price from current currency to USD
            const currency = this.currencies[this.settings.currency];
            priceInUSD = inputPrice / currency.rate;
        }

        // Calculate total cost in USD for balance check
        const totalCostUSD = quantity * priceInUSD;

        // Check if there's enough balance for the initial purchase
        if (this.balance < totalCostUSD) {
            alert('Insufficient balance for this purchase!');
            return;
        }

        // Generate realistic initial price variation to simulate purchase at different time
        const { initialPrice: adjustedInitialPrice, currentPrice: marketCurrentPrice } = 
            this.generateRealisticPriceVariation(priceInUSD, symbol);

        const asset = {
            id: this.generateId(),
            symbol,
            name,
            quantity,
            currentPrice: marketCurrentPrice,    // Store in USD
            initialPrice: adjustedInitialPrice,  // Store in USD  
            lastPriceUpdate: Date.now()         // Track when price was last updated
        };

        // Deduct balance for the initial purchase (use original price for consistency)
        this.balance -= totalCostUSD;
        this.saveBalance();

        this.assets.push(asset);
        this.saveAssets();
        this.updatePortfolio();
        this.closeModal('add-asset-modal');
        document.getElementById('add-asset-form').reset();
        
        // Clear price status when form is reset
        this.clearPriceStatus();
        // Hide NASDAQ link when form is reset
        this.updateAssetNasdaqLink('');

        // Add initial buy transaction
        const transaction = {
            id: this.generateId(),
            assetId: asset.id,
            type: 'buy',
            quantity,
            price: priceInUSD,        // Use the converted USD price for transaction record
            date: new Date().toISOString(),
            total: totalCostUSD      // Use the calculated total cost in USD for transaction record
        };

        this.transactions.push(transaction);
        this.saveTransactions();
        
        // Update portfolio again to show the transaction
        this.updatePortfolio();
    }

    /**
     * Fetch price for a symbol and update the UI
     * @param {string} symbol - Stock symbol to fetch price for
     */
    async fetchAndUpdatePrice(symbol) {
        if (!symbol || symbol.length < 1) {
            this.clearPriceStatus();
            return;
        }

        const priceInput = document.getElementById('asset-price');
        const priceStatus = document.getElementById('price-status');
        const priceStatusText = document.getElementById('price-status-text');

        // Show loading state
        this.showPriceStatus('loading', `Looking up price for ${symbol}...`);

        try {
            let priceData = null;
            let source = 'API';
            
            // First, try to get price from prefilled data
            if (this.prefilledPriceService.initialized) {
                priceData = this.prefilledPriceService.getPrice(symbol);
                if (priceData) {
                    source = 'Cached';
                    console.log(`Using prefilled price for ${symbol}: $${priceData.price}`);
                }
            }
            
            // If no prefilled price found, fetch from API
            if (!priceData) {
                this.showPriceStatus('loading', `Fetching live price for ${symbol}...`);
                priceData = await this.quoteService.fetchPrice(symbol);
                source = 'Live API';
            }
            
            if (priceData && priceData.price) {
                // Price from API is in USD, convert to current currency for display
                const currency = this.currencies[this.settings.currency];
                const convertedPrice = priceData.price * currency.rate;
                const currencySymbol = this.getCurrentCurrencySymbol();
                
                // Update price input with converted value
                priceInput.value = convertedPrice.toFixed(2);
                
                // Store the original USD price for later conversion back
                priceInput.dataset.usdPrice = priceData.price.toFixed(2);
                
                // Show success status with appropriate source indication
                const sourceText = source === 'Cached' ? 'Pre-loaded price' : `Price from ${priceData.source}`;
                const ageText = source === 'Cached' && priceData.timestamp ? 
                    ` (Updated: ${new Date(priceData.timestamp).toLocaleDateString()})` : '';
                
                this.showPriceStatus('success', 
                    `${sourceText}: ${currencySymbol}${convertedPrice.toFixed(2)} (Auto-filled, converted from $${priceData.price.toFixed(2)})${ageText}`);
                
                // Mark the input as auto-filled
                priceInput.dataset.autoFilled = 'true';
                priceInput.style.backgroundColor = source === 'Cached' ? '#f0f9ff' : '#f0fff4'; // Light blue for cached, light green for live
            } else {
                this.showPriceStatus('error', 
                    `Unable to fetch price for ${symbol}. Please enter manually.`);
            }
        } catch (error) {
            console.error('Price fetch error:', error);
            this.showPriceStatus('error', 
                `Failed to fetch price for ${symbol}: ${error.message}`);
        }
    }

    /**
     * Show price status with specified type and message
     * @param {string} type - Status type: 'loading', 'success', 'error'
     * @param {string} message - Status message to display
     */
    showPriceStatus(type, message) {
        const priceStatus = document.getElementById('price-status');
        const priceStatusText = document.getElementById('price-status-text');
        
        if (priceStatus && priceStatusText) {
            priceStatus.className = `price-status ${type}`;
            priceStatusText.textContent = message;
        }
    }

    /**
     * Clear price status indicator
     */
    clearPriceStatus() {
        const priceStatus = document.getElementById('price-status');
        const priceInput = document.getElementById('asset-price');
        
        if (priceStatus) {
            priceStatus.className = 'price-status hidden';
        }
        
        if (priceInput) {
            priceInput.dataset.autoFilled = 'false';
            priceInput.style.backgroundColor = '';
        }
    }

    /**
     * Show ticker suggestions based on user input
     * @param {string} query - Search query
     */
    async showTickerSuggestions(query) {
        const tickerSuggestions = document.getElementById('ticker-suggestions');
        
        if (!query || query.length < 1) {
            this.hideTickerSuggestions();
            return;
        }

        try {
            const suggestions = await this.tickerService.searchTickers(query, 8);
            
            if (suggestions.length === 0) {
                this.hideTickerSuggestions();
                return;
            }

            tickerSuggestions.innerHTML = '';
            
            suggestions.forEach((suggestion, index) => {
                const div = document.createElement('div');
                div.className = 'ticker-suggestion';
                div.innerHTML = `
                    <div class="ticker-suggestion-main">
                        <div class="ticker-suggestion-symbol">${suggestion.ticker}</div>
                        <div class="ticker-suggestion-name">${suggestion.name}</div>
                    </div>
                    <div class="ticker-suggestion-source">${suggestion.source}</div>
                `;
                
                div.addEventListener('click', () => {
                    this.selectTickerSuggestion(div, suggestion);
                });
                
                tickerSuggestions.appendChild(div);
            });
            
            tickerSuggestions.classList.remove('hidden');
        } catch (error) {
            console.warn('Failed to show ticker suggestions:', error);
            this.hideTickerSuggestions();
        }
    }

    /**
     * Hide ticker suggestions dropdown
     */
    hideTickerSuggestions() {
        const tickerSuggestions = document.getElementById('ticker-suggestions');
        if (tickerSuggestions) {
            tickerSuggestions.classList.add('hidden');
            tickerSuggestions.innerHTML = '';
        }
    }

    /**
     * Select a ticker suggestion and populate the form
     * @param {HTMLElement} suggestionElement - The clicked suggestion element
     * @param {Object} suggestion - The suggestion data (optional, will be extracted if not provided)
     */
    selectTickerSuggestion(suggestionElement, suggestion = null) {
        const assetSymbolInput = document.getElementById('asset-symbol');
        const assetNameInput = document.getElementById('asset-name');
        
        if (!suggestion) {
            // Extract data from the element if suggestion object not provided
            const symbolEl = suggestionElement.querySelector('.ticker-suggestion-symbol');
            const nameEl = suggestionElement.querySelector('.ticker-suggestion-name');
            
            if (symbolEl && nameEl) {
                suggestion = {
                    ticker: symbolEl.textContent,
                    name: nameEl.textContent
                };
            }
        }
        
        if (suggestion) {
            assetSymbolInput.value = suggestion.ticker;
            assetNameInput.value = suggestion.name;
            
            // Update NASDAQ link when ticker is selected
            this.updateAssetNasdaqLink(suggestion.ticker);
            
            // Trigger price fetch for the selected ticker
            this.fetchAndUpdatePrice(suggestion.ticker);
        }
        
        this.hideTickerSuggestions();
    }

    /**
     * Update visual selection state of suggestions
     * @param {NodeList} suggestions - List of suggestion elements
     * @param {number} selectedIndex - Index of selected suggestion (-1 for none)
     */
    updateSuggestionSelection(suggestions, selectedIndex) {
        suggestions.forEach((suggestion, index) => {
            if (index === selectedIndex) {
                suggestion.classList.add('selected');
            } else {
                suggestion.classList.remove('selected');
            }
        });
    }

    deleteAsset(assetId) {
        if (confirm('Are you sure you want to delete this asset and all related transactions?')) {
            this.assets = this.assets.filter(asset => asset.id !== assetId);
            this.transactions = this.transactions.filter(transaction => transaction.assetId !== assetId);
            this.saveAssets();
            this.saveTransactions();
            this.updatePortfolio();
        }
    }

    sellAllShares(assetId) {
        const asset = this.assets.find(a => a.id === assetId);
        if (!asset) {
            alert('Asset not found!');
            return;
        }

        if (asset.quantity <= 0) {
            alert('No shares to sell for this asset!');
            return;
        }

        const currencySymbol = this.getCurrentCurrencySymbol();
        const confirmation = confirm(`Are you sure you want to sell all ${asset.quantity.toFixed(6)} shares of ${asset.symbol} at current price ${currencySymbol}${this.formatCurrency(asset.currentPrice)}?`);
        if (!confirmation) {
            return;
        }

        // Create sell transaction
        const transaction = {
            id: this.generateId(),
            assetId: asset.id,
            type: 'sell',
            quantity: asset.quantity,
            price: asset.currentPrice,
            date: new Date().toISOString(),
            total: asset.quantity * asset.currentPrice
        };

        // Add transaction to history
        this.transactions.push(transaction);
        this.saveTransactions();

        // Update balance and asset quantity
        this.balance += transaction.total;
        asset.quantity = 0;
        
        this.saveAssets();
        this.saveBalance();
        this.updatePortfolio();

        // Show confirmation message
        alert(`Successfully sold all shares of ${asset.symbol} for ${currencySymbol}${this.formatCurrency(transaction.total)}!`);
    }

    // Transaction Management
    addTransaction() {
        const assetId = document.getElementById('transaction-asset').value;
        const type = document.getElementById('transaction-type').value;
        const quantity = parseFloat(document.getElementById('transaction-quantity').value);
        const inputPrice = parseFloat(document.getElementById('transaction-price').value);
        const date = document.getElementById('transaction-date').value;

        // Convert price from current currency to USD for storage
        const currency = this.currencies[this.settings.currency];
        const priceInUSD = inputPrice / currency.rate;

        const transaction = {
            id: this.generateId(),
            assetId,
            type,
            quantity,
            price: priceInUSD,  // Store in USD
            date: new Date(date).toISOString(),
            total: quantity * priceInUSD  // Total in USD
        };

        // Check if there's enough balance for buying
        if (type === 'buy' && this.balance < transaction.total) {
            alert('Insufficient balance for this purchase!');
            return;
        }

        this.transactions.push(transaction);
        this.saveTransactions();

        // Update asset quantity
        const asset = this.assets.find(a => a.id === assetId);
        if (asset) {
            if (type === 'buy') {
                asset.quantity += quantity;
                this.balance -= transaction.total; // Deduct from balance
            } else {
                asset.quantity -= quantity;
                this.balance += transaction.total; // Add to balance
            }
            asset.currentPrice = priceInUSD; // Update current price in USD
            this.saveAssets();
            this.saveBalance();
        }

        this.updatePortfolio();
        this.closeModal('add-transaction-modal');
        document.getElementById('add-transaction-form').reset();
    }

    deleteTransaction(transactionId) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            const transaction = this.transactions.find(t => t.id === transactionId);
            if (transaction) {
                const asset = this.assets.find(a => a.id === transaction.assetId);
                if (asset) {
                    // Reverse the transaction effect
                    if (transaction.type === 'buy') {
                        asset.quantity -= transaction.quantity;
                        this.balance += transaction.total; // Restore balance
                    } else {
                        asset.quantity += transaction.quantity;
                        this.balance -= transaction.total; // Deduct from balance
                    }
                    this.saveAssets();
                    this.saveBalance();
                }
            }

            this.transactions = this.transactions.filter(t => t.id !== transactionId);
            this.saveTransactions();
            this.updatePortfolio();
        }
    }

    updateTransactionQuantity() {
        const assetId = document.getElementById('transaction-asset').value;
        const type = document.getElementById('transaction-type').value;
        const quantityInput = document.getElementById('transaction-quantity');

        // Only prefill for sell transactions when an asset is selected
        if (type === 'sell' && assetId) {
            const asset = this.assets.find(a => a.id === assetId);
            if (asset && asset.quantity > 0) {
                // Prefill with the owned quantity
                // If rounded value equals original, show rounded to avoid excess zeros
                const roundedQuantity = Math.round(asset.quantity);
                if (roundedQuantity === asset.quantity) {
                    quantityInput.value = roundedQuantity.toString();
                } else {
                    quantityInput.value = asset.quantity.toFixed(6);
                }
            }
        } else if (type === 'buy' || !assetId) {
            // Clear the quantity field for buy transactions or when no asset is selected
            quantityInput.value = '';
        }
    }

    // Portfolio Updates
    updatePortfolio() {
        // Simulate market updates to keep portfolio looking realistic
        this.simulateMarketUpdates();
        
        this.updatePortfolioSummary();
        this.updateHoldingsList();
        this.updateTransactionsList();
    }

    updatePortfolioSummary() {
        const totalValue = this.calculateTotalValue();
        const totalInvested = this.calculateTotalInvested();
        const totalChange = totalValue - totalInvested;
        const changePercent = totalInvested > 0 ? ((totalChange / totalInvested) * 100) : 0;
        const currencySymbol = this.getCurrentCurrencySymbol();

        // Update currency symbol in display
        const currencyElements = document.querySelectorAll('.currency');
        currencyElements.forEach(el => el.textContent = currencySymbol);
        
        document.getElementById('total-value').textContent = this.formatCurrency(totalValue);
        document.getElementById('total-change').textContent = 
            `${totalChange >= 0 ? '+' : ''}${currencySymbol}${this.formatCurrency(totalChange)}`;
        document.getElementById('total-change-percent').textContent = 
            `(${totalChange >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;

        // Update balance display
        const balanceElement = document.getElementById('balance-value');
        if (balanceElement) {
            balanceElement.textContent = this.formatCurrency(this.balance);
        }

        const changeElement = document.querySelector('.change-display');
        changeElement.classList.toggle('negative', totalChange < 0);
    }

    updateHoldingsList() {
        const holdingsList = document.getElementById('holdings-list');
        
        // Filter out assets with zero quantity for display
        const activeAssets = this.assets.filter(asset => asset.quantity > 0);
        
        if (activeAssets.length === 0) {
            holdingsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-chart-pie"></i>
                    <h3>No Holdings Yet</h3>
                    <p>Add your first asset to get started</p>
                </div>
            `;
            return;
        }

        holdingsList.innerHTML = activeAssets.map(asset => {
            const value = asset.quantity * asset.currentPrice;
            const change = value - (asset.quantity * asset.initialPrice);
            const changePercent = ((change / (asset.quantity * asset.initialPrice)) * 100) || 0;
            const currencySymbol = this.getCurrentCurrencySymbol();

            return `
                <div class="holding-item">
                    <div class="holding-info">
                        <div class="holding-symbol">${asset.symbol}</div>
                        <div class="holding-name">${asset.name}</div>
                        <div class="holding-quantity">${asset.quantity.toFixed(6)} shares @ ${currencySymbol}${this.formatCurrency(asset.currentPrice)}</div>
                    </div>
                    <div class="holding-values">
                        <div class="holding-value">${currencySymbol}${this.formatCurrency(value)}</div>
                        <div class="holding-change ${change < 0 ? 'negative' : ''}">
                            ${change >= 0 ? '+' : ''}${currencySymbol}${this.formatCurrency(change)} (${changePercent.toFixed(2)}%)
                        </div>
                    </div>
                    <div class="holding-actions">
                        <a href="${this.getNasdaqUrl(asset.symbol)}" target="_blank" class="btn btn-secondary btn-small" title="Check price on NASDAQ">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <button class="btn btn-warning btn-small" onclick="app.sellAllShares('${asset.id}')" title="Sell all shares">
                            <i class="fas fa-coins"></i>
                        </button>
                        <button class="btn btn-danger btn-small edit-only" onclick="app.deleteAsset('${asset.id}')" title="Delete asset">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateTransactionsList() {
        const transactionsList = document.getElementById('transactions-list');
        
        if (this.transactions.length === 0) {
            transactionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No Transactions Yet</h3>
                    <p>Add your first transaction to see history</p>
                </div>
            `;
            return;
        }

        const sortedTransactions = [...this.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        transactionsList.innerHTML = sortedTransactions.map(transaction => {
            const asset = this.assets.find(a => a.id === transaction.assetId);
            const assetSymbol = asset ? asset.symbol : 'Unknown';
            const currencySymbol = this.getCurrentCurrencySymbol();

            return `
                <div class="transaction-item">
                    <div class="transaction-type ${transaction.type}">${transaction.type}</div>
                    <div class="transaction-details">
                        <div class="transaction-asset">${assetSymbol}</div>
                        <div class="transaction-date">${this.formatDate(transaction.date)}</div>
                    </div>
                    <div class="transaction-quantity">${transaction.quantity.toFixed(6)} @ ${currencySymbol}${this.formatCurrency(transaction.price)}</div>
                    <div class="transaction-value">${currencySymbol}${this.formatCurrency(transaction.total)}</div>
                    <div class="transaction-actions edit-only">
                        <button class="btn btn-danger btn-small" onclick="app.deleteTransaction('${transaction.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Analytics
    updateAnalytics() {
        const totalInvested = this.calculateTotalInvested();
        const totalValue = this.calculateTotalValue();
        const totalReturn = totalValue - totalInvested;
        const bestPerformer = this.getBestPerformer();
        const currencySymbol = this.getCurrentCurrencySymbol();

        document.getElementById('total-invested').textContent = `${currencySymbol}${this.formatCurrency(totalInvested)}`;
        document.getElementById('total-return').textContent = `${currencySymbol}${this.formatCurrency(totalReturn)}`;
        document.getElementById('best-performer').textContent = bestPerformer || '-';
        document.getElementById('total-transactions').textContent = this.transactions.length;

        this.drawPerformanceChart();
    }

    drawPerformanceChart() {
        const canvas = document.getElementById('performance-chart');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (this.transactions.length < 2) {
            ctx.fillStyle = '#64748b';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Not enough data to display chart', canvas.width / 2, canvas.height / 2);
            return;
        }

        // Generate portfolio value over time
        const portfolioHistory = this.generatePortfolioHistory();
        
        if (portfolioHistory.length < 2) return;

        const maxValue = Math.max(...portfolioHistory.map(p => p.value));
        const minValue = Math.min(...portfolioHistory.map(p => p.value));
        const valueRange = maxValue - minValue || 1;

        // Draw chart
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();

        portfolioHistory.forEach((point, index) => {
            const x = (index / (portfolioHistory.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - 20 - ((point.value - minValue) / valueRange) * (canvas.height - 40);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#2563eb';
        portfolioHistory.forEach((point, index) => {
            const x = (index / (portfolioHistory.length - 1)) * (canvas.width - 40) + 20;
            const y = canvas.height - 20 - ((point.value - minValue) / valueRange) * (canvas.height - 40);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    generatePortfolioHistory() {
        const history = [];
        const sortedTransactions = [...this.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        let portfolioState = {};
        
        sortedTransactions.forEach(transaction => {
            const asset = this.assets.find(a => a.id === transaction.assetId);
            if (!asset) return;
            
            if (!portfolioState[transaction.assetId]) {
                portfolioState[transaction.assetId] = { quantity: 0, price: transaction.price };
            }
            
            if (transaction.type === 'buy') {
                portfolioState[transaction.assetId].quantity += transaction.quantity;
            } else {
                portfolioState[transaction.assetId].quantity -= transaction.quantity;
            }
            
            portfolioState[transaction.assetId].price = transaction.price;
            
            const totalValue = Object.values(portfolioState).reduce((sum, holding) => {
                return sum + (holding.quantity * holding.price);
            }, 0);
            
            history.push({
                date: transaction.date,
                value: totalValue
            });
        });
        
        return history;
    }

    // Utility Functions
    calculateTotalValue() {
        return this.assets.reduce((total, asset) => total + (asset.quantity * asset.currentPrice), 0);
    }

    calculateTotalInvested() {
        return this.transactions
            .filter(t => t.type === 'buy')
            .reduce((total, transaction) => total + transaction.total, 0) -
            this.transactions
            .filter(t => t.type === 'sell')
            .reduce((total, transaction) => total + transaction.total, 0);
    }

    getBestPerformer() {
        if (this.assets.length === 0) return null;
        
        const bestAsset = this.assets.reduce((best, asset) => {
            const currentReturn = ((asset.currentPrice - asset.initialPrice) / asset.initialPrice) * 100;
            const bestReturn = best ? ((best.currentPrice - best.initialPrice) / best.initialPrice) * 100 : -Infinity;
            return currentReturn > bestReturn ? asset : best;
        }, null);
        
        return bestAsset ? bestAsset.symbol : null;
    }

    formatCurrency(amount) {
        const currency = this.currencies[this.settings.currency];
        const convertedAmount = amount * currency.rate;
        
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: currency.symbol === '¥' ? 0 : 2,
            maximumFractionDigits: currency.symbol === '¥' ? 0 : 2
        }).format(Math.abs(convertedAmount));
    }

    getCurrentCurrencySymbol() {
        return this.currencies[this.settings.currency].symbol;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Generate realistic price variation to simulate market volatility
     * @param {number} basePrice - The base price to vary from
     * @param {string} symbol - Asset symbol (not used for volatility determination)
     * @returns {object} Object with initialPrice and currentPrice
     */
    generateRealisticPriceVariation(basePrice, symbol) {
        // Use uniform volatility for all assets regardless of type
        const maxVariation = 0.08; // Up to 8% variation for all assets
        
        // Generate random variations for initial and current price
        // Make it more likely to have modest gains to simulate a generally growing market
        const initialVariation = (Math.random() - 0.6) * maxVariation; // Slightly biased down
        const currentVariation = (Math.random() - 0.4) * maxVariation; // Slightly biased up
        
        // Calculate prices with some correlation between initial and current
        const initialPrice = basePrice * (1 + initialVariation);
        let currentPrice = basePrice * (1 + currentVariation);
        
        // Add some correlation: if initial was low, current tends to be higher (regression to mean)
        const correlation = -0.3 * initialVariation * maxVariation;
        currentPrice = currentPrice * (1 + correlation);
        
        // Ensure prices are positive and reasonable
        const finalInitialPrice = Math.max(initialPrice, basePrice * 0.5);
        const finalCurrentPrice = Math.max(currentPrice, basePrice * 0.5);
        
        return {
            initialPrice: Math.round(finalInitialPrice * 100) / 100,
            currentPrice: Math.round(finalCurrentPrice * 100) / 100
        };
    }


    /**
     * Simulate market price updates for existing assets
     * This creates a more realistic portfolio by updating prices over time
     */
    simulateMarketUpdates() {
        const now = Date.now();
        const updateInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        this.assets.forEach(asset => {
            // Initialize lastPriceUpdate for existing assets
            if (!asset.lastPriceUpdate) {
                asset.lastPriceUpdate = now - Math.random() * 7 * 24 * 60 * 60 * 1000; // Random time in last week
            }
            
            // Update price if it's been more than 24 hours (in fake time, we'll make it more frequent)
            const timeSinceUpdate = now - asset.lastPriceUpdate;
            if (timeSinceUpdate > updateInterval / 24) { // Update more frequently for demo purposes
                this.updateAssetPrice(asset);
                asset.lastPriceUpdate = now;
            }
        });
        
        // Save updated assets
        this.saveAssets();
    }

    /**
     * Update price for a single asset with realistic market movement
     * @param {object} asset - Asset to update
     */
    updateAssetPrice(asset) {
        // Use uniform daily volatility for all assets regardless of type
        const dailyVolatility = 0.03; // Up to 3% daily change for all assets
        
        // Generate realistic price movement (slightly biased upward for long-term growth)
        const priceChange = (Math.random() - 0.45) * dailyVolatility; // Slightly biased positive
        const newPrice = asset.currentPrice * (1 + priceChange);
        
        // Ensure price doesn't go below 10% of initial price or above 500% of initial price
        const minPrice = asset.initialPrice * 0.1;
        const maxPrice = asset.initialPrice * 5.0;
        
        asset.currentPrice = Math.max(minPrice, Math.min(maxPrice, Math.round(newPrice * 100) / 100));
    }

    /**
     * Generate NASDAQ URL for a stock symbol
     * @param {string} symbol - Stock symbol
     * @returns {string} NASDAQ URL for the symbol
     */
    getNasdaqUrl(symbol) {
        return `https://www.nasdaq.com/market-activity/stocks/${symbol.toLowerCase()}`;
    }

    // Modal Management
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    showResetConfirmation() {
        this.openModal('reset-confirmation-modal');
    }

    resetPortfolio(resetBrokerTheme = false) {
        try {
            // Clear all portfolio data
            this.assets = [];
            this.transactions = [];
            
            // Reset balance to default (1000 EUR equivalent in USD)
            const eurToUsd = 1.0 / 0.85; // EUR rate is 0.85, so 1 EUR = 1.176 USD
            this.balance = 1000 * eurToUsd; // 1000 EUR in USD (~1176.47)
            
            // Clear localStorage
            localStorage.removeItem('fake-portfolio-assets');
            localStorage.removeItem('fake-portfolio-transactions');
            localStorage.removeItem('fake-portfolio-balance');
            
            if (resetBrokerTheme) {
                // Reset all custom broker names
                Object.keys(this.themes).forEach(theme => {
                    localStorage.removeItem(`fake-portfolio-broker-name-${theme}`);
                });
                
                // Reset settings (currency and theme)
                this.settings = { currency: 'USD', theme: 'default' };
                this.currentTheme = 'default';
                localStorage.removeItem('fake-portfolio-settings');
            }
            
            // Save the reset data
            this.saveAssets();
            this.saveTransactions();
            this.saveBalance();
            if (resetBrokerTheme) {
                this.saveSettings();
            }
            
            // Reinitialize the application
            if (resetBrokerTheme) {
                this.initializeTheme();
                this.initializeCurrencies();
            }
            this.updatePortfolio();
            
            // Close the modal
            this.closeModal('reset-confirmation-modal');
            
            // Uncheck the reset option for next time
            document.getElementById('reset-broker-theme-checkbox').checked = false;
            
            // Show success notification
            this.showNotification('Portfolio has been successfully reset!', 'success');
            
        } catch (error) {
            console.error('Error resetting portfolio:', error);
            this.showNotification('Error resetting portfolio. Please try again.', 'error');
        }
    }

    // Export all localStorage data
    exportData() {
        try {
            const exportData = {};
            const localStorageKeys = Object.keys(localStorage);
            
            // Export all keys that start with 'fake-portfolio-' for future-proofing
            localStorageKeys.forEach(key => {
                if (key.startsWith('fake-portfolio-')) {
                    exportData[key] = localStorage.getItem(key);
                }
            });
            
            // Create export metadata
            const exportObject = {
                exportedAt: new Date().toISOString(),
                version: '1.0',
                subdomain: window.location.hostname,
                data: exportData
            };
            
            // Create and download file
            const dataStr = JSON.stringify(exportObject, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('Portfolio data exported successfully!', 'success');
            
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showNotification('Error exporting data. Please try again.', 'error');
        }
    }

    // Show import confirmation modal
    showImportConfirmation() {
        document.getElementById('import-confirmation-modal').style.display = 'flex';
        // Reset file selection
        document.getElementById('import-file-input').value = '';
        document.getElementById('selected-file-name').textContent = '';
        document.getElementById('confirm-import-btn').disabled = true;
    }

    // Handle file selection for import
    handleFileSelection(event) {
        const file = event.target.files[0];
        const fileNameSpan = document.getElementById('selected-file-name');
        const confirmBtn = document.getElementById('confirm-import-btn');
        
        if (file) {
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                fileNameSpan.textContent = file.name;
                confirmBtn.disabled = false;
            } else {
                fileNameSpan.textContent = '';
                confirmBtn.disabled = true;
                this.showNotification('Please select a valid JSON file.', 'error');
            }
        } else {
            fileNameSpan.textContent = '';
            confirmBtn.disabled = true;
        }
    }

    // Import data from file
    importData() {
        const fileInput = document.getElementById('import-file-input');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showNotification('Please select a file to import.', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importObject = JSON.parse(e.target.result);
                
                // Validate import data structure
                if (!importObject.data || typeof importObject.data !== 'object') {
                    throw new Error('Invalid import file format');
                }
                
                // Clear existing localStorage keys that start with 'fake-portfolio-'
                const existingKeys = Object.keys(localStorage);
                existingKeys.forEach(key => {
                    if (key.startsWith('fake-portfolio-')) {
                        localStorage.removeItem(key);
                    }
                });
                
                // Import all data
                Object.entries(importObject.data).forEach(([key, value]) => {
                    if (key.startsWith('fake-portfolio-')) {
                        localStorage.setItem(key, value);
                    }
                });
                
                // Close the modal
                this.closeModal('import-confirmation-modal');
                
                // Show notification and reload to apply changes
                this.showNotification('Data imported successfully! Reloading page...', 'success');
                
                // Reload the page after a short delay to apply all imported settings
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                
            } catch (error) {
                console.error('Error importing data:', error);
                this.showNotification('Error importing data. Please check the file format.', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    populateAssetSelect() {
        const select = document.getElementById('transaction-asset');
        select.innerHTML = '<option value="">Select an asset</option>';
        
        this.assets.forEach(asset => {
            const option = document.createElement('option');
            option.value = asset.id;
            option.textContent = `${asset.symbol} - ${asset.name}`;
            select.appendChild(option);
        });
        
        // Hide NASDAQ link initially
        this.updateTransactionNasdaqLink('');
    }

    updateTransactionNasdaqLink(assetId) {
        const nasdaqLink = document.getElementById('transaction-nasdaq-link');
        
        if (!assetId) {
            nasdaqLink.style.display = 'none';
            return;
        }
        
        const asset = this.assets.find(a => a.id === assetId);
        if (asset) {
            nasdaqLink.href = this.getNasdaqUrl(asset.symbol);
            nasdaqLink.style.display = 'inline-flex';
        } else {
            nasdaqLink.style.display = 'none';
        }
    }

    updateAssetNasdaqLink(symbol) {
        const nasdaqLink = document.getElementById('asset-nasdaq-link');
        
        if (!symbol || symbol.length < 1) {
            nasdaqLink.style.display = 'none';
            return;
        }
        
        nasdaqLink.href = this.getNasdaqUrl(symbol);
        nasdaqLink.style.display = 'inline-flex';
    }

    // Screenshot Mode
    enableScreenshotMode() {
        if (!this.isScreenshotMode) {
            this.isScreenshotMode = true;
            document.body.classList.add('screenshot-mode');
        }
    }

    disableScreenshotMode() {
        if (this.isScreenshotMode) {
            this.isScreenshotMode = false;
            document.body.classList.remove('screenshot-mode');
        }
    }

    toggleScreenshotMode() {
        this.isScreenshotMode = !this.isScreenshotMode;
        document.body.classList.toggle('screenshot-mode', this.isScreenshotMode);
        this.showScreenshotFeedback();
    }

    exitScreenshotMode() {
        if (this.isScreenshotMode) {
            this.disableScreenshotMode();
            this.showScreenshotFeedback();
        }
    }

    showScreenshotFeedback() {
        const feedbackText = this.isScreenshotMode ? 
            'Screenshot mode active - Press ESC to exit' : 
            'Screenshot mode disabled';
        this.showNotification(feedbackText, this.isScreenshotMode ? 'info' : 'success');
    }

    async generateScreenshot() {
        // Check if Screen Capture API is supported
        if (!navigator.mediaDevices?.getDisplayMedia) {
            this.showNotification('Screen capture not supported in this browser. Using fallback method.', 'warning');
            this.generateScreenshotFallback();
            return;
        }

        // Store current screenshot mode state
        const wasInScreenshotMode = this.isScreenshotMode;

        try {
            // Enable screenshot mode to hide UI elements
            this.enableScreenshotMode();
            
            // Wait a moment for the UI to update
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Use helper window approach for better screen capture
            await this.captureWithHelperWindow();
            
        } catch (error) {
            console.error('Screenshot generation failed:', error);
            // Show error message but don't fall back to print
            this.showNotification('Screenshot capture was cancelled or failed.', 'warning');
        } finally {
            // Restore previous screenshot mode state
            if (!wasInScreenshotMode) {
                this.disableScreenshotMode();
            }
        }
    }

    async captureWithHelperWindow() {
        return new Promise((resolve, reject) => {
            // Open the separate helper HTML file
            const helper = window.open('./screenshot-helper.html', 'capture_helper', 'popup,width=500,height=300');
            
            if (!helper) {
                reject(new Error('Popup blocked. Please allow popups.'));
                return;
            }

            // Listen for messages from helper window
            const messageHandler = (e) => {
                if (e.data?.type === 'SUCCESS') {
                    window.removeEventListener('message', messageHandler);
                    this.showNotification('Screenshot captured successfully!', 'success');
                    resolve();
                } else if (e.data?.type === 'ERROR') {
                    window.removeEventListener('message', messageHandler);
                    this.showNotification('Screenshot capture was cancelled or failed.', 'warning');
                    reject(new Error(e.data.message));
                }
            };
            
            window.addEventListener('message', messageHandler);
            
            // Clean up if window is closed manually
            const checkClosed = setInterval(() => {
                if (helper.closed) {
                    clearInterval(checkClosed);
                    window.removeEventListener('message', messageHandler);
                    reject(new Error('Helper window was closed'));
                }
            }, 1000);
        });
    }
    
    async generateCanvasScreenshot() {
        try {
            const element = document.getElementById('app');
            const rect = element.getBoundingClientRect();
            
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions (high resolution)
            const scale = 2;
            canvas.width = rect.width * scale;
            canvas.height = rect.height * scale;
            ctx.scale(scale, scale);
            
            // Set background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, rect.width, rect.height);
            
            // Use CSS to style the element for better screenshot
            const originalStyle = element.style.cssText;
            element.style.cssText = `
                position: relative;
                width: ${rect.width}px;
                height: ${rect.height}px;
                background: white;
                overflow: visible;
            `;
            
            // Draw using html2canvas alternative approach
            await this.drawElementToCanvas(ctx, element, 0, 0, scale);
            
            // Restore original styles
            element.style.cssText = originalStyle;
            
            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    this.downloadBlob(blob, 'portfolio-screenshot.png');
                    this.showNotification('Screenshot downloaded successfully!', 'success');
                } else {
                    throw new Error('Failed to create image blob');
                }
            }, 'image/png', 0.9);
            
        } catch (error) {
            console.error('Canvas screenshot failed:', error);
            this.generateScreenshotFallback();
        }
    }
    
    async drawElementToCanvas(ctx, element, x, y, scale) {
        // Improved DOM traversal approach for better screenshot capture
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        // Skip hidden elements
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return;
        }
        
        // Draw background
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            ctx.fillStyle = style.backgroundColor;
            ctx.fillRect(x, y, rect.width, rect.height);
        }
        
        // Draw borders
        if (style.borderWidth && style.borderWidth !== '0px') {
            const borderWidth = parseFloat(style.borderWidth) || 1;
            ctx.strokeStyle = style.borderColor || '#000000';
            ctx.lineWidth = borderWidth;
            ctx.strokeRect(x, y, rect.width, rect.height);
        }
        
        // Draw text content for leaf elements or elements with direct text
        if (element.children.length === 0 && element.textContent.trim()) {
            ctx.fillStyle = style.color || '#000000';
            const fontSize = parseInt(style.fontSize) || 16;
            const fontFamily = style.fontFamily || 'Arial, sans-serif';
            ctx.font = `${fontSize}px ${fontFamily}`;
            
            const text = element.textContent.trim();
            const padding = 10;
            const lineHeight = fontSize * 1.2;
            
            // Simple text wrapping
            const maxWidth = rect.width - (padding * 2);
            const words = text.split(' ');
            let line = '';
            let lineY = y + padding + fontSize;
            
            for (let word of words) {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);
                
                if (metrics.width > maxWidth && line !== '') {
                    ctx.fillText(line.trim(), x + padding, lineY);
                    line = word + ' ';
                    lineY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            if (line.trim()) {
                ctx.fillText(line.trim(), x + padding, lineY);
            }
        }
        
        // Recursively draw child elements
        for (let child of element.children) {
            const childRect = child.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            
            // Calculate relative position within parent
            const childX = x + (childRect.left - elementRect.left);
            const childY = y + (childRect.top - elementRect.top);
            
            await this.drawElementToCanvas(ctx, child, childX, childY, scale);
        }
    }
    
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const finalFilename = filename.replace('.png', `-${timestamp}.png`);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = finalFilename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleanup
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    
    generateScreenshotFallback() {
        this.showNotification('Opening print dialog for screenshot...', 'info');
        
        const element = document.getElementById('app');
        
        // Create a new window with the current portfolio view
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Portfolio Screenshot</title>
                <style>
                    ${document.querySelector('style') ? document.querySelector('style').innerHTML : ''}
                    <link rel="stylesheet" href="styles.css">
                    body { margin: 0; padding: 20px; background: white; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
                    .edit-only { display: none !important; }
                    @media print {
                        body { background: white !important; }
                        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
                    }
                </style>
            </head>
            <body>
                ${element.outerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    };
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        this.showNotification('Use your browser\'s print-to-PDF option to save as image', 'info');
    }

    generatePrintStatement() {
        this.showNotification('Opening Investment Account Statement for printing...', 'info');
        
        const element = document.getElementById('app');
        
        // Create a new window with a clean statement view
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Investment Account Statement</title>
                <style>
                    body { 
                        margin: 0; 
                        padding: 20px; 
                        background: white; 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                        color: black;
                        line-height: 1.4;
                    }
                    .edit-only { display: none !important; }
                    h1, h2, h3 { 
                        color: black; 
                        margin: 10px 0;
                    }
                    h1 { 
                        text-align: center; 
                        border-bottom: 2px solid black; 
                        padding-bottom: 10px;
                        font-size: 24px;
                    }
                    .statement-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .statement-date {
                        text-align: right;
                        margin-bottom: 20px;
                        font-style: italic;
                    }
                    @media print {
                        body { background: white !important; }
                        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
                        @page { margin: 0.5in; }
                    }
                </style>
            </head>
            <body>
                <div class="statement-header">
                    <h1>Investment Account Statement</h1>
                </div>
                <div class="statement-date">
                    Statement Date: ${new Date().toLocaleDateString()}
                </div>
                ${element.outerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    };
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        this.showNotification('Use your browser\'s print option to print the statement', 'info');
    }

    // Broker Name Management
    initializeBrokerName() {
        const customName = localStorage.getItem(`fake-portfolio-broker-name-${this.currentTheme}`);
        const brokerNameText = document.getElementById('broker-name-text');
        
        if (customName && brokerNameText) {
            brokerNameText.textContent = customName;
        } else if (brokerNameText) {
            brokerNameText.textContent = this.themes[this.currentTheme].brokerName;
        }
    }

    showBrokerNameEditor() {
        const brokerNameText = document.getElementById('broker-name-text');
        if (!brokerNameText) return;
        
        const currentName = brokerNameText.textContent;
        
        // Create input element
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.className = 'broker-name-input';
        input.style.cssText = `
            background: rgba(255,255,255,0.9);
            border: 2px solid var(--primary-color);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            min-width: 300px;
        `;
        
        // Replace text with input
        const parent = brokerNameText.parentNode;
        parent.replaceChild(input, brokerNameText);
        input.focus();
        input.select();
        
        // Handle save on Enter or blur
        const saveName = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            const newName = input.value.trim() || this.themes[this.currentTheme].brokerName;
            
            // Save to localStorage if different from default
            if (newName !== this.themes[this.currentTheme].brokerName) {
                localStorage.setItem(`fake-portfolio-broker-name-${this.currentTheme}`, newName);
            } else {
                localStorage.removeItem(`fake-portfolio-broker-name-${this.currentTheme}`);
            }
            
            // Create new text element
            const newTextElement = document.createElement('span');
            newTextElement.id = 'broker-name-text';
            newTextElement.textContent = newName;
            
            // Replace input with text
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        const cancelEdit = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            // Cancel editing
            const newTextElement = document.createElement('span');
            newTextElement.id = 'broker-name-text';
            newTextElement.textContent = currentName;
            
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        input.addEventListener('blur', saveName, { once: true });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            } else if (e.key === 'Escape') {
                cancelEdit();
            }
        }, { once: true });
    }

    showBalanceEditor() {
        const balanceValueText = document.getElementById('balance-value');
        if (!balanceValueText) return;
        
        const currentBalance = this.balance;
        const currencySymbol = this.getCurrentCurrencySymbol();
        
        // Convert balance to current currency for editing
        const currency = this.currencies[this.settings.currency];
        const convertedBalance = currentBalance * currency.rate;
        
        // Create input element
        const input = document.createElement('input');
        input.type = 'number';
        input.value = convertedBalance.toFixed(2);
        input.step = '0.01';
        input.min = '0';
        input.className = 'balance-input';
        input.style.cssText = `
            background: rgba(255,255,255,0.9);
            border: 2px solid var(--primary-color);
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            min-width: 200px;
            text-align: right;
        `;
        
        // Replace text with input
        const parent = balanceValueText.parentNode;
        parent.replaceChild(input, balanceValueText);
        input.focus();
        input.select();
        
        // Handle save on Enter or blur
        const saveBalance = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            const newBalanceInCurrentCurrency = parseFloat(input.value) || 0;
            // Convert back to USD for storage
            const currency = this.currencies[this.settings.currency];
            const newBalanceInUSD = newBalanceInCurrentCurrency / currency.rate;
            this.balance = Math.max(0, newBalanceInUSD); // Ensure balance is not negative
            this.saveBalance();
            
            // Create new text element
            const newTextElement = document.createElement('span');
            newTextElement.id = 'balance-value';
            newTextElement.textContent = this.formatCurrency(this.balance);
            
            // Replace input with text
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        const cancelEdit = () => {
            if (!input.parentNode) return; // Check if input still exists
            
            // Cancel editing
            const newTextElement = document.createElement('span');
            newTextElement.id = 'balance-value';
            newTextElement.textContent = this.formatCurrency(currentBalance);
            
            if (input.parentNode) {
                input.parentNode.replaceChild(newTextElement, input);
            }
        };
        
        input.addEventListener('blur', saveBalance, { once: true });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur(); // This will trigger save via the blur event
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelEdit();
            }
        }, { once: true });
    }

    // Theme Management
    cycleTheme() {
        const themeKeys = Object.keys(this.themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        this.currentTheme = themeKeys[nextIndex];
        
        // Save theme to settings
        this.settings.theme = this.currentTheme;
        this.saveSettings();
        
        // Remove all theme classes
        themeKeys.forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
        });
        
        // Add new theme class
        if (this.currentTheme !== 'default') {
            document.body.classList.add(`theme-${this.currentTheme}`);
        }
        
        // Update button text
        document.getElementById('theme-selector').innerHTML = 
            `<i class="fas fa-palette"></i> ${this.themes[this.currentTheme].name}`;
        
        // Update broker name for new theme
        this.initializeBrokerName();
    }

    updateViews() {
        this.updatePortfolio();
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Position notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Data Persistence
    saveAssets() {
        localStorage.setItem('fake-portfolio-assets', JSON.stringify(this.assets));
    }

    loadAssets() {
        const saved = localStorage.getItem('fake-portfolio-assets');
        return saved ? JSON.parse(saved) : [];
    }

    saveTransactions() {
        localStorage.setItem('fake-portfolio-transactions', JSON.stringify(this.transactions));
    }

    loadTransactions() {
        const saved = localStorage.getItem('fake-portfolio-transactions');
        return saved ? JSON.parse(saved) : [];
    }

    saveSettings() {
        localStorage.setItem('fake-portfolio-settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('fake-portfolio-settings');
        return saved ? JSON.parse(saved) : { currency: 'USD', theme: 'default' };
    }

    saveBalance() {
        localStorage.setItem('fake-portfolio-balance', JSON.stringify(this.balance));
    }

    loadBalance() {
        const saved = localStorage.getItem('fake-portfolio-balance');
        return saved ? JSON.parse(saved) : null; // null indicates not initialized
    }

    // Initialize balance with 1000 EUR equivalent
    initializeBalance() {
        if (this.balance === null) {
            // Convert 1000 EUR to USD for storage
            const eurToUsd = 1.0 / 0.85; // EUR rate is 0.85, so 1 EUR = 1.176 USD
            this.balance = 1000 * eurToUsd; // 1000 EUR in USD (~1176.47)
            this.saveBalance();
        }
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new InvestmentPortfolio();
});

// Add some sample data for demonstration
function addSampleData() {
    if (app.assets.length === 0) {
        // Add sample assets
        const sampleAssets = [
            { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, currentPrice: 150.00, initialPrice: 140.00 },
            { symbol: 'BTC', name: 'Bitcoin', quantity: 0.5, currentPrice: 45000.00, initialPrice: 40000.00 },
            { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 5, currentPrice: 800.00, initialPrice: 750.00 }
        ];

        sampleAssets.forEach(assetData => {
            const asset = {
                id: app.generateId(),
                ...assetData
            };
            app.assets.push(asset);

            // Add initial transaction
            const transaction = {
                id: app.generateId(),
                assetId: asset.id,
                type: 'buy',
                quantity: asset.quantity,
                price: asset.initialPrice,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                total: asset.quantity * asset.initialPrice
            };
            app.transactions.push(transaction);
        });

        app.saveAssets();
        app.saveTransactions();
        app.updatePortfolio();
    }
}