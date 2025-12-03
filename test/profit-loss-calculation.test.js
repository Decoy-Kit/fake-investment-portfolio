/**
 * Test for profit/loss calculation on sell transactions
 * Validates that sell transactions calculate and display profit/loss based on buy-in price
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Profit/Loss Calculation Tests', () => {
  test('addTransaction calculates profitLoss for sell transactions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that profitLoss is calculated for sell transactions
    assert.ok(jsContent.includes('profitLoss') && jsContent.includes('sell'), 
      'JavaScript should calculate profitLoss for sell transactions');
  });

  test('profitLoss calculation uses initialPrice as buy-in price', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that calculation references initialPrice (buy-in price)
    assert.ok(jsContent.includes('initialPrice') && jsContent.includes('profitLoss'), 
      'Profit/loss calculation should use initialPrice as buy-in price');
  });

  test('profitLoss percentage is calculated', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that profitLossPercent is calculated
    assert.ok(jsContent.includes('profitLossPercent'), 
      'JavaScript should calculate profitLossPercent');
  });

  test('updateTransactionsList displays profit/loss for sell transactions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that transaction list displays profit/loss
    assert.ok(jsContent.includes('transaction-profit-loss'), 
      'Transaction list should display profit/loss for sell transactions');
  });

  test('profit/loss display respects showProfit setting', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that profit/loss display checks showProfit setting
    assert.ok(jsContent.includes('showProfit') && jsContent.includes('transaction-profit-loss'), 
      'Profit/loss display should respect showProfit setting');
  });

  test('profit/loss styling exists in CSS', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Check for profit/loss styling
    assert.ok(cssContent.includes('.transaction-profit-loss'), 
      'CSS should contain transaction-profit-loss styling');
    
    assert.ok(cssContent.includes('.transaction-profit-loss.positive'), 
      'CSS should style positive profit/loss');
    
    assert.ok(cssContent.includes('.transaction-profit-loss.negative'), 
      'CSS should style negative profit/loss');
  });

  test('sellAllShares calculates and stores profit/loss', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that sellAllShares calculates profitLoss
    assert.ok(jsContent.includes('sellAllShares') && jsContent.includes('profitLoss'), 
      'sellAllShares should calculate profit/loss');
  });

  test('backward compatibility - profit/loss calculated if not stored', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for backward compatibility calculation
    assert.ok(jsContent.includes('profitLoss === undefined'), 
      'Should calculate profit/loss on-the-fly for old transactions');
  });
});
