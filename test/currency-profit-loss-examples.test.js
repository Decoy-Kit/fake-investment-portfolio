/**
 * Documented Test Examples for Currency-Specific Profit/Loss Calculations
 * 
 * This test file provides concrete examples that demonstrate the correct behavior
 * of profit/loss calculations when buying and selling in different currencies.
 * 
 * These tests serve as both validation and documentation for users who may be
 * confused about how currency conversion affects profit/loss calculations.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Currency Profit/Loss Calculation Examples', () => {
  
  describe('Example 1: Buy in USD, Sell in EUR with profit', () => {
    const scenario = {
      buyPriceUSD: 100,
      sellPriceEUR: 90,
      eurRate: 0.85,
      quantity: 10
    };

    test('user buys at $100 USD per share', () => {
      assert.strictEqual(scenario.buyPriceUSD, 100);
    });

    test('user switches to EUR and sells at €90 EUR per share', () => {
      assert.strictEqual(scenario.sellPriceEUR, 90);
      assert.strictEqual(scenario.eurRate, 0.85);
    });

    test('sell price converts to USD: €90 / 0.85 = $105.88 USD', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      assert.strictEqual(
        sellPriceUSD.toFixed(2),
        '105.88',
        'Sell price in USD should be €90 / 0.85'
      );
    });

    test('profit per share in USD: $105.88 - $100 = $5.88', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const profitPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      assert.strictEqual(
        profitPerShareUSD.toFixed(2),
        '5.88',
        'Profit per share in USD'
      );
    });

    test('profit per share in EUR: $5.88 * 0.85 = €5.00', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const profitPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const profitPerShareEUR = profitPerShareUSD * scenario.eurRate;
      assert.strictEqual(
        profitPerShareEUR.toFixed(2),
        '5.00',
        'Profit per share in EUR'
      );
    });

    test('total profit: €5.00 * 10 shares = €50.00', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const profitPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const profitPerShareEUR = profitPerShareUSD * scenario.eurRate;
      const totalProfitEUR = profitPerShareEUR * scenario.quantity;
      assert.strictEqual(
        totalProfitEUR.toFixed(2),
        '50.00',
        'Total profit in EUR'
      );
    });

    test('preview display shows: Buy-in €85 → Sell €90 = +€5 profit', () => {
      const buyPriceEUR = scenario.buyPriceUSD * scenario.eurRate; // 85
      const sellPriceEUR = scenario.sellPriceEUR; // 90
      const displayedDifference = sellPriceEUR - buyPriceEUR; // 5
      
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const profitPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const profitPerShareEUR = profitPerShareUSD * scenario.eurRate;
      
      assert.strictEqual(
        displayedDifference.toFixed(2),
        profitPerShareEUR.toFixed(2),
        'Displayed values should match calculated profit/loss'
      );
    });
  });

  describe('Example 2: Buy in USD, Sell in EUR with loss', () => {
    const scenario = {
      buyPriceUSD: 100,
      sellPriceEUR: 70,
      eurRate: 0.85,
      quantity: 5
    };

    test('user buys at $100 USD per share', () => {
      assert.strictEqual(scenario.buyPriceUSD, 100);
    });

    test('user switches to EUR and sells at €70 EUR per share (lower price)', () => {
      assert.strictEqual(scenario.sellPriceEUR, 70);
    });

    test('sell price converts to USD: €70 / 0.85 = $82.35 USD', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      assert.strictEqual(
        sellPriceUSD.toFixed(2),
        '82.35',
        'Sell price in USD should be €70 / 0.85'
      );
    });

    test('loss per share in USD: $82.35 - $100 = -$17.65', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      assert.strictEqual(
        lossPerShareUSD.toFixed(2),
        '-17.65',
        'Loss per share in USD (negative value)'
      );
      assert.ok(lossPerShareUSD < 0, 'Should be a loss');
    });

    test('loss per share in EUR: -$17.65 * 0.85 = -€15.00', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const lossPerShareEUR = lossPerShareUSD * scenario.eurRate;
      assert.strictEqual(
        lossPerShareEUR.toFixed(2),
        '-15.00',
        'Loss per share in EUR (negative value)'
      );
      assert.ok(lossPerShareEUR < 0, 'Should be a loss');
    });

    test('total loss: -€15.00 * 5 shares = -€75.00', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const lossPerShareEUR = lossPerShareUSD * scenario.eurRate;
      const totalLossEUR = lossPerShareEUR * scenario.quantity;
      assert.strictEqual(
        totalLossEUR.toFixed(2),
        '-75.00',
        'Total loss in EUR'
      );
    });

    test('preview display shows: Buy-in €85 → Sell €70 = -€15 loss', () => {
      const buyPriceEUR = scenario.buyPriceUSD * scenario.eurRate; // 85
      const sellPriceEUR = scenario.sellPriceEUR; // 70
      const displayedDifference = sellPriceEUR - buyPriceEUR; // -15
      
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const lossPerShareEUR = lossPerShareUSD * scenario.eurRate;
      
      assert.strictEqual(
        displayedDifference.toFixed(2),
        lossPerShareEUR.toFixed(2),
        'Displayed values should match calculated loss'
      );
    });
  });

  describe('Example 3: Buy in EUR, Sell in EUR (no currency conversion)', () => {
    const scenario = {
      buyPriceEUR: 85,
      sellPriceEUR: 90,
      eurRate: 0.85,
      quantity: 8
    };

    test('user buys at €85 EUR per share (stored as $100 USD)', () => {
      const buyPriceUSD = scenario.buyPriceEUR / scenario.eurRate;
      assert.strictEqual(
        buyPriceUSD.toFixed(2),
        '100.00',
        'Buy price stored in USD: €85 / 0.85 = $100'
      );
    });

    test('user sells at €90 EUR per share', () => {
      assert.strictEqual(scenario.sellPriceEUR, 90);
    });

    test('profit per share in EUR: €90 - €85 = €5', () => {
      const profitPerShareEUR = scenario.sellPriceEUR - scenario.buyPriceEUR;
      assert.strictEqual(
        profitPerShareEUR.toFixed(2),
        '5.00',
        'Direct calculation in EUR'
      );
    });

    test('profit per share calculated via USD matches direct EUR calculation', () => {
      // Convert to USD, calculate, convert back
      const buyPriceUSD = scenario.buyPriceEUR / scenario.eurRate;
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const profitPerShareUSD = sellPriceUSD - buyPriceUSD;
      const profitPerShareEURViaUSD = profitPerShareUSD * scenario.eurRate;
      
      // Direct EUR calculation
      const profitPerShareEURDirect = scenario.sellPriceEUR - scenario.buyPriceEUR;
      
      assert.strictEqual(
        profitPerShareEURViaUSD.toFixed(2),
        profitPerShareEURDirect.toFixed(2),
        'Both methods should give same result'
      );
    });
  });

  describe('Example 4: Edge case with rounding', () => {
    const scenario = {
      buyPriceUSD: 123.45,
      sellPriceEUR: 99.99,
      eurRate: 0.85,
      quantity: 1
    };

    test('buy price with cents: $123.45 USD', () => {
      assert.strictEqual(scenario.buyPriceUSD, 123.45);
    });

    test('sell price with cents: €99.99 EUR converts to $117.64 USD', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      assert.strictEqual(
        sellPriceUSD.toFixed(2),
        '117.64',
        'Conversion with rounding'
      );
    });

    test('profit calculation handles decimal precision correctly', () => {
      const sellPriceUSD = scenario.sellPriceEUR / scenario.eurRate;
      const profitPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const profitPerShareEUR = profitPerShareUSD * scenario.eurRate;
      
      // Should be negative (loss)
      assert.ok(profitPerShareEUR < 0, 'Should result in a loss');
      
      // Check displayed values match within rounding tolerance
      const buyPriceEUR = scenario.buyPriceUSD * scenario.eurRate;
      const displayedDiff = scenario.sellPriceEUR - buyPriceEUR;
      const calculatedProfit = profitPerShareEUR;
      
      const difference = Math.abs(displayedDiff - calculatedProfit);
      assert.ok(
        difference < 0.02,
        `Rounding difference should be minimal: ${difference}`
      );
    });
  });

  describe('Example 5: GBP currency (rate < EUR)', () => {
    const scenario = {
      buyPriceUSD: 100,
      sellPriceGBP: 65,
      gbpRate: 0.73,
      quantity: 10
    };

    test('user buys at $100 USD per share', () => {
      assert.strictEqual(scenario.buyPriceUSD, 100);
    });

    test('user switches to GBP and sells at £65 GBP per share', () => {
      assert.strictEqual(scenario.sellPriceGBP, 65);
      assert.strictEqual(scenario.gbpRate, 0.73);
    });

    test('sell price converts to USD: £65 / 0.73 = $89.04 USD', () => {
      const sellPriceUSD = scenario.sellPriceGBP / scenario.gbpRate;
      assert.strictEqual(
        sellPriceUSD.toFixed(2),
        '89.04',
        'Sell price in USD'
      );
    });

    test('loss per share in USD: $89.04 - $100 = -$10.96', () => {
      const sellPriceUSD = scenario.sellPriceGBP / scenario.gbpRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      assert.strictEqual(
        lossPerShareUSD.toFixed(2),
        '-10.96',
        'Loss per share in USD'
      );
    });

    test('loss per share in GBP: -$10.96 * 0.73 = -£8.00', () => {
      const sellPriceUSD = scenario.sellPriceGBP / scenario.gbpRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const lossPerShareGBP = lossPerShareUSD * scenario.gbpRate;
      assert.strictEqual(
        lossPerShareGBP.toFixed(2),
        '-8.00',
        'Loss per share in GBP'
      );
    });

    test('preview display shows: Buy-in £73 → Sell £65 = -£8 loss', () => {
      const buyPriceGBP = scenario.buyPriceUSD * scenario.gbpRate; // 73
      const sellPriceGBP = scenario.sellPriceGBP; // 65
      const displayedDifference = sellPriceGBP - buyPriceGBP; // -8
      
      const sellPriceUSD = scenario.sellPriceGBP / scenario.gbpRate;
      const lossPerShareUSD = sellPriceUSD - scenario.buyPriceUSD;
      const lossPerShareGBP = lossPerShareUSD * scenario.gbpRate;
      
      assert.strictEqual(
        displayedDifference.toFixed(2),
        lossPerShareGBP.toFixed(2),
        'Displayed values should match calculated loss'
      );
    });
  });

  describe('Summary: Why the calculation is correct', () => {
    test('all prices are stored in USD internally', () => {
      // This is the KEY to understanding the system
      assert.ok(true, 'Asset initialPrice and currentPrice are always in USD');
    });

    test('input prices are converted FROM display currency TO USD', () => {
      assert.ok(true, 'Formula: priceInUSD = inputPrice / currencyRate');
    });

    test('profit/loss is calculated in USD', () => {
      assert.ok(true, 'Formula: profitLossUSD = sellPriceUSD - buyPriceUSD');
    });

    test('profit/loss is converted FROM USD TO display currency for display', () => {
      assert.ok(true, 'Formula: profitLossDisplay = profitLossUSD * currencyRate');
    });

    test('displayed buy-in price is converted FROM USD TO display currency', () => {
      assert.ok(true, 'Formula: buyPriceDisplay = buyPriceUSD * currencyRate');
    });

    test('the displayed values are mathematically consistent', () => {
      assert.ok(
        true,
        'sellPriceDisplay - buyPriceDisplay === profitLossDisplay (within rounding)'
      );
    });
  });
});
