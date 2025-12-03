/**
 * Tests for the interaction between volatility toggle and profit/loss display
 * When volatility is disabled, profit/loss should not be shown regardless of showProfit setting
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Volatility and Profit Display Integration Tests', () => {
  test('updatePortfolioSummary checks both showProfit AND enablePriceVolatility', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Check that updatePortfolioSummary checks both settings
    const updatePortfolioMatch = jsContent.match(
      /updatePortfolioSummary[\s\S]*?if\s*\(this\.settings\.showProfit\s*&&\s*this\.settings\.enablePriceVolatility\)/
    );
    assert.ok(updatePortfolioMatch, 
      'updatePortfolioSummary should check both showProfit AND enablePriceVolatility before showing profit/loss');
  });

  test('updateHoldingsList checks both showProfit AND enablePriceVolatility', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Check that profitDisplay checks both settings
    const profitDisplayMatch = jsContent.match(
      /profitDisplay\s*=\s*\(this\.settings\.showProfit\s*&&\s*this\.settings\.enablePriceVolatility\)/
    );
    assert.ok(profitDisplayMatch, 
      'profitDisplay should be conditional on both showProfit AND enablePriceVolatility');
  });

  test('copyStatementToClipboard checks both showProfit AND enablePriceVolatility for portfolio summary', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Check that copyStatementToClipboard checks both settings for total change
    const copyStatementMatch = jsContent.match(
      /copyStatementToClipboard[\s\S]*?if\s*\(this\.settings\.showProfit\s*&&\s*this\.settings\.enablePriceVolatility\)[\s\S]*?Total Change:/
    );
    assert.ok(copyStatementMatch, 
      'copyStatementToClipboard should check both settings before including Total Change');
  });

  test('copyStatementToClipboard checks both showProfit AND enablePriceVolatility for holdings change', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Check that copyStatementToClipboard checks both settings for holding change
    const copyStatementMatch = jsContent.match(
      /copyStatementToClipboard[\s\S]*?activeAssets\.forEach[\s\S]*?if\s*\(this\.settings\.showProfit\s*&&\s*this\.settings\.enablePriceVolatility\)[\s\S]*?Change:/
    );
    assert.ok(copyStatementMatch, 
      'copyStatementToClipboard should check both settings before including holding Change');
  });

  test('updateTransactionsList checks only showProfit (not volatility)', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Transaction profit/loss is real (buy vs sell price), so it should only check showProfit
    // It should NOT check enablePriceVolatility
    const transactionsMatch = jsContent.match(
      /transaction\.type\s*===\s*['"]sell['"]\s*&&\s*this\.settings\.showProfit\s*\)/
    );
    assert.ok(transactionsMatch, 
      'updateTransactionsList should check only showProfit for sell transaction profit/loss (not volatility)');
    
    // Verify it doesn't incorrectly check enablePriceVolatility for transactions
    const transactionSection = jsContent.match(
      /transaction\.type\s*===\s*['"]sell['"][\s\S]{0,200}/
    );
    if (transactionSection) {
      const hasVolatilityCheck = transactionSection[0].includes('enablePriceVolatility');
      assert.ok(!hasVolatilityCheck, 
        'Transaction profit/loss should not check enablePriceVolatility');
    }
  });

  test('profit/loss is hidden when volatility is disabled even if showProfit is enabled', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Verify all key display functions use AND logic, not OR
    const portfolioSummaryCheck = jsContent.includes('this.settings.showProfit && this.settings.enablePriceVolatility');
    assert.ok(portfolioSummaryCheck, 
      'Code should use AND logic to ensure profit/loss is hidden when volatility is disabled');
  });

  test('comments explain the dual-check requirement', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Check for explanatory comments
    const hasExplanatoryComments = jsContent.includes('BOTH showProfit') && 
                                   jsContent.includes('price volatility');
    assert.ok(hasExplanatoryComments, 
      'Code should have comments explaining why both settings are checked');
  });
});
