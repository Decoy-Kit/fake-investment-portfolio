/**
 * Basic validation tests that don't require a browser
 * Tests basic file structure and key functionality
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Basic Validation Tests', () => {
  test('required files exist', () => {
    const requiredFiles = [
      'index.html',
      'app.js',
      'styles.css'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(projectRoot, file);
      assert.ok(fs.existsSync(filePath), `${file} should exist`);
    }
  });

  test('HTML contains required data-test selectors', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    const requiredSelectors = [
      'data-test="currency-selector"',
      'data-test="balance-value"',
      'data-test="edit-balance-btn"',
      'data-test="asset-price-label"',
      'data-test="open-add-asset-modal"',
      'data-test="asset-symbol"',
      'data-test="asset-name"',
      'data-test="asset-quantity"',
      'data-test="asset-price"',
      'data-test="add-asset-btn"'
    ];

    for (const selector of requiredSelectors) {
      assert.ok(htmlContent.includes(selector), 
        `HTML should contain ${selector}`);
    }
  });

  test('JavaScript contains currency conversion functions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    const requiredFunctions = [
      'showBalanceEditor',
      'formatCurrency',
      'getCurrentCurrencySymbol',
      'addAsset',
      'addTransaction',
      'initializeCurrencies'
    ];

    for (const func of requiredFunctions) {
      assert.ok(jsContent.includes(func), 
        `JavaScript should contain ${func} function`);
    }
  });

  test('currency rates are defined', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
    
    for (const currency of currencies) {
      assert.ok(jsContent.includes(currency), 
        `JavaScript should define ${currency} currency`);
    }
  });

  test('balance editor conversion logic exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for key balance editor functionality
    assert.ok(jsContent.includes('convertedBalance'), 
      'Balance editor should convert balance to display currency');
    assert.ok(jsContent.includes('currency.rate'), 
      'Balance editor should use currency rates');
    assert.ok(jsContent.includes('newBalanceInCurrentCurrency'), 
      'Balance editor should handle input in current currency');
  });

  test('asset price conversion logic exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for asset price conversion
    assert.ok(jsContent.includes('priceInUSD'), 
      'Asset creation should convert prices to USD');
    assert.ok(jsContent.includes('inputPrice / currency.rate'), 
      'Asset creation should convert from display currency to USD');
  });

  test('reset portfolio functionality exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for reset functionality
    assert.ok(jsContent.includes('resetPortfolio'), 
      'JavaScript should contain resetPortfolio method');
    assert.ok(jsContent.includes('showResetConfirmation'), 
      'JavaScript should contain showResetConfirmation method');
    assert.ok(jsContent.includes('reset-portfolio-btn'), 
      'JavaScript should handle reset button clicks');
    
    // Check that reset clears localStorage data
    assert.ok(jsContent.includes('localStorage.removeItem(\'fake-portfolio-assets\')'), 
      'Reset should clear assets from localStorage');
    assert.ok(jsContent.includes('localStorage.removeItem(\'fake-portfolio-transactions\')'), 
      'Reset should clear transactions from localStorage');
    assert.ok(jsContent.includes('localStorage.removeItem(\'fake-portfolio-balance\')'), 
      'Reset should clear balance from localStorage');
  });

  test('reset confirmation modal exists in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check for reset modal elements
    assert.ok(htmlContent.includes('reset-confirmation-modal'), 
      'HTML should contain reset confirmation modal');
    assert.ok(htmlContent.includes('reset-portfolio-btn'), 
      'HTML should contain reset portfolio button');
    assert.ok(htmlContent.includes('confirm-reset-btn'), 
      'HTML should contain confirm reset button');
    assert.ok(htmlContent.includes('reset-broker-theme-checkbox'), 
      'HTML should contain checkbox for broker name/theme reset');
  });

  test('JavaScript contains sell quantity prefill functionality', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for sell quantity prefill related functions
    assert.ok(jsContent.includes('updateTransactionQuantity'), 
      'JavaScript should contain updateTransactionQuantity method for prefilling sell quantity');
    
    // Check that transaction type change handler exists
    assert.ok(jsContent.includes('transaction-type') && jsContent.includes('change'), 
      'JavaScript should handle transaction type changes');
  });
});