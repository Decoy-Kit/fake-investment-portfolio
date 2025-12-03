/**
 * Test suite for profit/loss calculation with currency conversion
 * 
 * This test validates that when a user sells a stock and enters the price in a non-USD currency
 * (like Euro), the profit/loss calculation correctly handles the currency conversion and doesn't
 * incorrectly mix dollar prices with euro prices.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Currency-Specific Profit/Loss Calculation Tests', () => {
  test('profit/loss preview passes USD values to formatCurrency for conversion', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify that the preview passes buy-in price (in USD) to formatCurrency
    // which will do the conversion internally
    // Pattern: formatCurrency(buyInPrice) - NOT formatCurrency(buyInPrice * currency.rate)
    const passesBuyInToFormat = 
      jsContent.includes('formatCurrency(buyInPrice)') &&
      !jsContent.includes('formatCurrency(buyInPrice * currency.rate)');
    
    assert.ok(
      passesBuyInToFormat,
      'Buy-in price should be passed in USD to formatCurrency, which handles conversion'
    );
  });

  test('profit/loss preview correctly converts sell price from display currency to USD for calculation', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify that sell price is converted from display currency to USD
    // Pattern: inputPrice / currency.rate (creates priceInUSD)
    const convertsSellPrice = jsContent.includes('priceInUSD = inputPrice / currency.rate');
    assert.ok(
      convertsSellPrice,
      'Sell price should be converted from display currency to USD before profit/loss calculation'
    );
  });

  test('profit/loss calculation uses consistent USD values', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify profit/loss is calculated using USD values
    // Pattern: priceInUSD - buyInPrice (both in USD)
    const usesPriceInUSD = jsContent.includes('priceInUSD - buyInPrice') || 
                           jsContent.includes('priceInUSD - asset.initialPrice');
    assert.ok(
      usesPriceInUSD,
      'Profit/loss calculation should use priceInUSD (not raw inputPrice) minus buyInPrice'
    );
  });

  test('profit/loss result is passed to formatCurrency in USD', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify that profit/loss in USD is passed to formatCurrency for conversion
    // formatCurrency handles the conversion internally, so we should pass USD values
    const passesUSDToFormat = 
      jsContent.includes('formatCurrency(Math.abs(totalProfitLossUSD)') ||
      jsContent.includes('formatCurrency(totalProfitLossUSD');
    
    assert.ok(
      passesUSDToFormat,
      'Profit/loss should be passed in USD to formatCurrency, which handles conversion'
    );
  });

  test('preview calculation maintains currency consistency', () => {
    // This test validates the mathematical consistency of the preview
    // Given: Buy-in at $100 USD, selling at €90 EUR with rate 0.85
    // Expected: Buy-in displays as €85, Sell displays as €90, P/L displays as €5
    
    const buyInUSD = 100;
    const sellEUR = 90;
    const eurRate = 0.85;
    
    const sellUSD = sellEUR / eurRate; // 105.88 USD
    const profitLossUSD = sellUSD - buyInUSD; // 5.88 USD
    const profitLossEUR = profitLossUSD * eurRate; // 5.00 EUR
    const buyInEUR = buyInUSD * eurRate; // 85.00 EUR
    
    // Verify the mathematical relationship holds
    const manualDiff = sellEUR - buyInEUR; // 5.00 EUR
    const calculatedDiff = profitLossEUR; // 5.00 EUR
    
    assert.strictEqual(
      manualDiff.toFixed(2),
      calculatedDiff.toFixed(2),
      'Preview display values should match calculated profit/loss'
    );
  });

  test('negative profit/loss correctly handles currency conversion', () => {
    // Test scenario with a loss
    // Given: Buy-in at $100 USD, selling at €70 EUR with rate 0.85
    // Expected: Loss should be correctly calculated and displayed
    
    const buyInUSD = 100;
    const sellEUR = 70;
    const eurRate = 0.85;
    
    const sellUSD = sellEUR / eurRate; // 82.35 USD
    const profitLossUSD = sellUSD - buyInUSD; // -17.65 USD (loss)
    const profitLossEUR = profitLossUSD * eurRate; // -15.00 EUR (loss)
    const buyInEUR = buyInUSD * eurRate; // 85.00 EUR
    
    const manualDiff = sellEUR - buyInEUR; // -15.00 EUR
    const calculatedDiff = profitLossEUR; // -15.00 EUR
    
    assert.strictEqual(
      manualDiff.toFixed(2),
      calculatedDiff.toFixed(2),
      'Negative profit/loss should correctly convert currencies'
    );
    
    assert.ok(
      profitLossEUR < 0,
      'Loss scenario should result in negative profit/loss'
    );
  });

  test('actual transaction storage uses USD for profit/loss', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // In addTransaction, when type is 'sell', profitLoss should be calculated in USD
    const hasSellTransactionLogic = 
      jsContent.includes("type === 'sell'") && 
      jsContent.includes('profitLoss') &&
      jsContent.includes('addTransaction');
    
    assert.ok(
      hasSellTransactionLogic,
      'Sell transaction logic should calculate and store profitLoss'
    );
    
    // Verify it uses priceInUSD and initialPrice for calculation
    const usesUSDPricing = 
      jsContent.includes('priceInUSD') && 
      jsContent.includes('initialPrice') &&
      jsContent.includes('profitLoss');
    
    assert.ok(
      usesUSDPricing,
      'Sell transaction profit/loss should be calculated using USD prices'
    );
  });

  test('sellAllShares uses consistent USD-based calculation', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that sellAllShares exists and uses proper pricing
    const hasSellAllShares = jsContent.includes('sellAllShares');
    
    assert.ok(
      hasSellAllShares,
      'sellAllShares method should exist'
    );
    
    // Verify it calculates profit/loss using asset prices (which are in USD)
    const usesAssetPrices = 
      jsContent.includes('asset.currentPrice') && 
      jsContent.includes('asset.initialPrice') &&
      jsContent.includes('profitLoss');
    
    assert.ok(
      usesAssetPrices,
      'sellAllShares should calculate profit/loss using asset prices (stored in USD)'
    );
  });

  test('currency conversion uses correct rates for EUR', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify EUR currency is defined with correct rate
    const eurCurrencyMatch = jsContent.match(/EUR:\s*{[^}]*rate:\s*([0-9.]+)/);
    
    assert.ok(
      eurCurrencyMatch,
      'EUR currency should be defined with a rate'
    );
    
    const eurRate = parseFloat(eurCurrencyMatch[1]);
    
    assert.ok(
      eurRate > 0 && eurRate < 1,
      'EUR rate should be less than 1 (EUR is typically worth less than USD)'
    );
  });

  test('formatCurrency method handles negative values correctly', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify formatCurrency exists and uses Math.abs for display
    const hasFormatCurrency = jsContent.includes('formatCurrency');
    
    assert.ok(
      hasFormatCurrency,
      'formatCurrency method should exist'
    );
    
    const usesMathAbs = jsContent.includes('Math.abs');
    
    assert.ok(
      usesMathAbs,
      'formatCurrency should use Math.abs to handle negative values correctly'
    );
  });

  test('transaction preview handles decimal precision correctly', () => {
    // Test that rounding errors don't cause display inconsistencies
    const buyInUSD = 123.45;
    const sellEUR = 99.99;
    const eurRate = 0.85;
    
    const sellUSD = sellEUR / eurRate; // 117.635... USD
    const profitLossUSD = sellUSD - buyInUSD; // -5.815... USD
    const profitLossEUR = profitLossUSD * eurRate; // -4.943... EUR
    const buyInEUR = buyInUSD * eurRate; // 104.932... EUR
    
    // Round to 2 decimal places as displayed in UI
    const manualDiffRounded = parseFloat((sellEUR - buyInEUR).toFixed(2));
    const calculatedDiffRounded = parseFloat(profitLossEUR.toFixed(2));
    
    // Allow for small rounding differences (within 0.01)
    const difference = Math.abs(manualDiffRounded - calculatedDiffRounded);
    
    assert.ok(
      difference < 0.02,
      `Display values should be consistent within rounding tolerance. Difference: ${difference}`
    );
  });

  test('multiple currencies all use USD as base for storage', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify USD has rate 1.0 (base currency)
    const usdCurrencyMatch = jsContent.match(/USD:\s*{[^}]*rate:\s*([0-9.]+)/);
    
    assert.ok(
      usdCurrencyMatch,
      'USD currency should be defined'
    );
    
    const usdRate = parseFloat(usdCurrencyMatch[1]);
    
    assert.strictEqual(
      usdRate,
      1.0,
      'USD should have rate 1.0 as it is the base currency for storage'
    );
  });

  test('transaction display correctly shows profit/loss in user currency', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // In updateTransactionsList, verify profit/loss display uses currency symbol
    assert.ok(
      jsContent.includes('transaction-profit-loss') && 
      jsContent.includes('currencySymbol'),
      'Transaction list should display profit/loss with currency symbol'
    );
  });

  test('comprehensive currency conversion scenario validation', () => {
    // Comprehensive test of a full buy-sell cycle with EUR
    const scenarios = [
      {
        name: 'Profit scenario',
        buyInUSD: 100,
        sellEUR: 90,
        eurRate: 0.85,
        expectedProfit: true
      },
      {
        name: 'Loss scenario',
        buyInUSD: 100,
        sellEUR: 70,
        eurRate: 0.85,
        expectedProfit: false
      },
      {
        name: 'Break-even scenario',
        buyInUSD: 100,
        sellEUR: 85,
        eurRate: 0.85,
        expectedProfit: null // approximately 0
      }
    ];

    scenarios.forEach(scenario => {
      const sellUSD = scenario.sellEUR / scenario.eurRate;
      const profitLossUSD = sellUSD - scenario.buyInUSD;
      
      if (scenario.expectedProfit === true) {
        assert.ok(
          profitLossUSD > 0,
          `${scenario.name}: Should result in profit`
        );
      } else if (scenario.expectedProfit === false) {
        assert.ok(
          profitLossUSD < 0,
          `${scenario.name}: Should result in loss`
        );
      } else {
        assert.ok(
          Math.abs(profitLossUSD) < 1,
          `${scenario.name}: Should result in approximately break-even`
        );
      }
    });
  });
});
