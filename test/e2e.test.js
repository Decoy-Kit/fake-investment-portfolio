/**
 * E2E Tests for Currency Conversion Functionality
 * Tests the critical currency conversion features using native Node.js test runner
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Simple HTTP server to serve static files
function createTestServer(port = 3000) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(projectRoot, req.url === '/' ? 'index.html' : req.url);
      
      // Security check
      if (!filePath.startsWith(projectRoot)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      // Set content type based on file extension
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
      };
      const contentType = contentTypes[ext] || 'text/plain';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.listen(port, (err) => {
      if (err) reject(err);
      else resolve(server);
    });
  });
}

// Browser automation using Puppeteer-like approach with headless Chrome
async function launchBrowser() {
  return new Promise((resolve, reject) => {
    // Check if chrome/chromium is available
    const possiblePaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      'google-chrome',
      'chromium-browser',
      'chromium'
    ];

    let chromePath = null;
    for (const browserPath of possiblePaths) {
      try {
        require('child_process').execSync(`which ${browserPath}`, { stdio: 'ignore' });
        chromePath = browserPath;
        break;
      } catch (e) {
        // Continue to next path
      }
    }

    if (!chromePath) {
      reject(new Error('Chrome/Chromium not found. Please install Chrome or Chromium for testing.'));
      return;
    }

    const chrome = spawn(chromePath, [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--disable-features=VizDisplayCompositor'
    ]);

    // Wait for Chrome to start up
    setTimeout(() => {
      resolve({
        process: chrome,
        close: () => chrome.kill()
      });
    }, 2000);
  });
}

// CDP (Chrome DevTools Protocol) client
class CDPClient {
  constructor() {
    this.sessionId = null;
    this.messageId = 0;
  }

  async connect() {
    try {
      // Get available tabs
      const response = await fetch('http://localhost:9222/json');
      const tabs = await response.json();
      const tab = tabs[0];
      
      // Use Node.js built-in WebSocket (available in Node.js 19+)
      this.ws = new WebSocket(tab.webSocketDebuggerUrl);
      
      return new Promise((resolve) => {
        this.ws.addEventListener('open', resolve);
      });
    } catch (error) {
      throw new Error(`Failed to connect to browser: ${error.message}`);
    }
  }

  async send(method, params = {}) {
    const message = {
      id: ++this.messageId,
      method,
      params
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Timeout waiting for ${method}`));
      }, 10000);

      const handler = (event) => {
        const response = JSON.parse(event.data);
        if (response.id === message.id) {
          clearTimeout(timeout);
          this.ws.removeEventListener('message', handler);
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.result);
          }
        }
      };

      this.ws.addEventListener('message', handler);
      this.ws.send(JSON.stringify(message));
    });
  }

  async navigate(url) {
    await this.send('Page.enable');
    await this.send('Runtime.enable');
    return this.send('Page.navigate', { url });
  }

  async waitForLoad() {
    return new Promise((resolve) => {
      const handler = (event) => {
        const eventData = JSON.parse(event.data);
        if (eventData.method === 'Page.loadEventFired') {
          this.ws.removeEventListener('message', handler);
          resolve();
        }
      };
      this.ws.addEventListener('message', handler);
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true
    });
    return result.result.value;
  }

  async querySelector(selector) {
    return this.evaluate(`document.querySelector('${selector}') !== null`);
  }

  async click(selector) {
    return this.evaluate(`
      const element = document.querySelector('${selector}');
      if (element) {
        element.click();
        return true;
      }
      return false;
    `);
  }

  async setValue(selector, value) {
    return this.evaluate(`
      const element = document.querySelector('${selector}');
      if (element) {
        element.value = '${value}';
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    `);
  }

  async getText(selector) {
    return this.evaluate(`
      const element = document.querySelector('${selector}');
      return element ? element.textContent.trim() : null;
    `);
  }

  async getAttribute(selector, attribute) {
    return this.evaluate(`
      const element = document.querySelector('${selector}');
      return element ? element.getAttribute('${attribute}') : null;
    `);
  }

  async waitFor(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

describe('Currency Conversion E2E Tests', () => {
  let server;
  let browser;
  let page;

  // Setup test environment
  test('setup test environment', async () => {
    // Start test server
    server = await createTestServer(3001);
    console.log('Test server started on port 3001');

    // Start browser
    try {
      browser = await launchBrowser();
      console.log('Browser launched');
    } catch (error) {
      console.warn('Browser launch failed, tests will be skipped:', error.message);
      return;
    }

    // Wait for browser to be ready
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Connect CDP client
    page = new CDPClient();
    try {
      await page.connect();
      console.log('Connected to browser');
    } catch (error) {
      console.error('Failed to connect to browser:', error.message);
      throw error;
    }
  });

  test('loads application successfully', async () => {
    if (!page) return; // Skip if browser not available

    await page.navigate('http://localhost:3001');
    await page.waitForLoad();
    await page.waitFor(1000);

    // Check if main elements are present
    const balanceExists = await page.querySelector('[data-test="balance-value"]');
    const currencyExists = await page.querySelector('[data-test="currency-selector"]');
    
    assert.ok(balanceExists, 'Balance value should be present');
    assert.ok(currencyExists, 'Currency selector should be present');
  });

  test('currency selector changes currency display', async () => {
    if (!page) return; // Skip if browser not available

    // Get initial balance (should be in USD)
    const initialBalance = await page.getText('[data-test="balance-value"]');
    console.log('Initial balance:', initialBalance);

    // Change to EUR
    await page.evaluate(`
      document.querySelector('[data-test="currency-selector"]').value = 'EUR';
      document.querySelector('[data-test="currency-selector"]').dispatchEvent(new Event('change'));
    `);
    await page.waitFor(500);

    // Check if balance changed to EUR
    const eurBalance = await page.getText('[data-test="balance-value"]');
    console.log('EUR balance:', eurBalance);
    
    assert.ok(eurBalance !== initialBalance, 'Balance should change when currency changes');

    // Check if price label updated (open modal first)
    await page.click('[data-test="open-add-asset-modal"]');
    await page.waitFor(500);
    
    const priceLabel = await page.getText('[data-test="asset-price-label"]');
    console.log('Price label:', priceLabel);
    assert.ok(priceLabel.includes('€'), 'Price label should show EUR symbol');
    
    // Close modal
    await page.evaluate(`document.querySelector('.close-modal').click();`);
    await page.waitFor(500);
  });

  test('balance editor shows converted values', async () => {
    if (!page) return; // Skip if browser not available

    // Ensure we're in EUR mode
    await page.evaluate(`
      document.querySelector('[data-test="currency-selector"]').value = 'EUR';
      document.querySelector('[data-test="currency-selector"]').dispatchEvent(new Event('change'));
    `);
    await page.waitFor(500);

    // Get current displayed balance
    const displayedBalance = await page.getText('[data-test="balance-value"]');
    console.log('Displayed balance:', displayedBalance);

    // Click edit balance button
    await page.click('[data-test="edit-balance-btn"]');
    await page.waitFor(500);

    // Check if input shows the same value as displayed
    const inputValue = await page.evaluate(`
      const input = document.querySelector('.balance-input');
      return input ? input.value : null;
    `);

    if (inputValue) {
      console.log('Input value:', inputValue);
      
      // Extract numeric values for comparison
      const displayedNumeric = parseFloat(displayedBalance.replace(/[€$£¥,]/g, ''));
      const inputNumeric = parseFloat(inputValue);
      
      assert.ok(Math.abs(displayedNumeric - inputNumeric) < 0.01, 
        `Input value (${inputNumeric}) should match displayed value (${displayedNumeric})`);
    }

    // Press Escape to cancel editing
    await page.evaluate(`
      document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    `);
    await page.waitFor(500);
  });

  test('currency conversion consistency across currencies', async () => {
    if (!page) return; // Skip if browser not available

    const currencies = ['USD', 'EUR', 'GBP'];
    const balances = {};

    for (const currency of currencies) {
      // Switch to currency
      await page.evaluate(`
        document.querySelector('[data-test="currency-selector"]').value = '${currency}';
        document.querySelector('[data-test="currency-selector"]').dispatchEvent(new Event('change'));
      `);
      await page.waitFor(500);

      // Get balance
      const balance = await page.getText('[data-test="balance-value"]');
      balances[currency] = balance;
      console.log(`${currency} balance:`, balance);
    }

    // All balances should be different (converted)
    assert.ok(balances.USD !== balances.EUR, 'USD and EUR balances should be different');
    assert.ok(balances.EUR !== balances.GBP, 'EUR and GBP balances should be different');
  });

  test('asset form shows correct currency in labels', async () => {
    if (!page) return; // Skip if browser not available

    // Test with different currencies
    const currencies = ['USD', 'EUR', 'GBP'];
    const expectedSymbols = ['$', '€', '£'];

    for (let i = 0; i < currencies.length; i++) {
      const currency = currencies[i];
      const symbol = expectedSymbols[i];

      // Switch currency
      await page.evaluate(`
        document.querySelector('[data-test="currency-selector"]').value = '${currency}';
        document.querySelector('[data-test="currency-selector"]').dispatchEvent(new Event('change'));
      `);
      await page.waitFor(500);

      // Open asset modal
      await page.click('[data-test="open-add-asset-modal"]');
      await page.waitFor(500);

      // Check price label
      const priceLabel = await page.getText('[data-test="asset-price-label"]');
      assert.ok(priceLabel.includes(symbol), 
        `Price label should contain ${symbol} for ${currency}, got: ${priceLabel}`);

      // Close modal
      await page.evaluate(`
        document.querySelector('.close-modal').click();
      `);
      await page.waitFor(500);
    }
  });

  // Cleanup
  test('cleanup test environment', async () => {
    if (page) {
      page.close();
    }
    if (browser) {
      browser.close();
    }
    if (server) {
      server.close();
      console.log('Test server stopped');
    }
  });
});