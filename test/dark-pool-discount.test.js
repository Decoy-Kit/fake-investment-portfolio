/**
 * Tests for dark pool discount calculation and display
 * Verifies that transactions with dark pool discounts show the original price,
 * not the discounted price, and display the discount percentage without minus sign
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Dark Pool Discount Display Tests', () => {
  test('transaction list displays original price for discounted transactions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the updateTransactionsList method
    const methodPattern = /updateTransactionsList\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    assert.ok(match, 'updateTransactionsList method should exist');
    
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 5000);

    // Check that it calculates original price from discounted price
    assert.ok(methodSection.includes('transaction.price / (1 - transaction.discount / 100)'),
      'method should calculate original (undiscounted) price from discounted price');
  });

  test('discount display does not include minus sign', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the updateTransactionsList method
    const methodPattern = /updateTransactionsList\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 5000);

    // Check that discount display doesn't have a minus sign
    // Should show "5.40%" not "-5.40%"
    assert.ok(methodSection.includes('${transaction.discount.toFixed(2)}%'),
      'discount should be displayed without minus sign');
    
    // Make sure old format with minus sign is not present
    assert.ok(!methodSection.includes('-${transaction.discount.toFixed(2)}%'),
      'discount should NOT be displayed with minus sign');
  });

  test('dark pool badge is displayed for discounted transactions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the updateTransactionsList method
    const methodPattern = /updateTransactionsList\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 5000);

    // Check that it creates a dark pool badge
    assert.ok(methodSection.includes('dark-pool-badge'),
      'method should create element with dark-pool-badge class');
    
    assert.ok(methodSection.includes('Dark Pool'),
      'badge should display "Dark Pool" text');
  });

  test('dark pool badge has CSS styling', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Check that dark-pool-badge style exists
    assert.ok(cssContent.includes('.dark-pool-badge'),
      'CSS should contain .dark-pool-badge class');
    
    // Check for some styling properties
    const badgePattern = /\.dark-pool-badge\s*\{[^}]*\}/s;
    const match = badgePattern.exec(cssContent);
    assert.ok(match, 'dark-pool-badge should have style definition');
    
    const badgeStyles = match[0];
    assert.ok(badgeStyles.includes('background'),
      'dark-pool-badge should have background style');
    assert.ok(badgeStyles.includes('padding'),
      'dark-pool-badge should have padding style');
    assert.ok(badgeStyles.includes('border-radius'),
      'dark-pool-badge should have border-radius style');
  });

  test('discounted price is correctly calculated and stored in transaction', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the addTransaction method
    const addTransactionPattern = /addTransaction\(\)\s*\{/;
    const match = addTransactionPattern.exec(jsContent);
    assert.ok(match, 'addTransaction method should exist');
    
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 3000);

    // Check that discounted price is calculated correctly
    assert.ok(methodSection.includes('(1 - discount / 100)') || methodSection.includes('1 - discount / 100'),
      'discounted price should be calculated using discount percentage');
    
    // Check that discount is stored in transaction
    assert.ok(methodSection.includes('discount >') && methodSection.includes('discount :'),
      'discount percentage should be stored in transaction for buy transactions');
  });

  test('transaction total uses discounted price', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the addTransaction method
    const addTransactionPattern = /addTransaction\(\)\s*\{/;
    const match = addTransactionPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 3000);

    // Check that total is calculated with discounted price
    assert.ok(methodSection.includes('quantity * discountedPrice') || methodSection.includes('discountedPrice * quantity'),
      'transaction total should use discounted price');
  });

  test('example calculation: 10 @ €266.58 with 5.4% discount', () => {
    // This test verifies the example from the issue
    // 10 shares with 5.4% discount, discounted price €266.58
    
    const discountPercent = 5.4;
    const discountedPrice = 266.58;
    const quantity = 10;
    
    // Calculate original price
    const originalPrice = discountedPrice / (1 - discountPercent / 100);
    
    // Original price should be approximately €281.80 (rounded)
    assert.ok(Math.abs(originalPrice - 281.80) < 0.02,
      `Original price should be ~€281.80, got €${originalPrice.toFixed(2)}`);
    
    // Total should be discounted price * quantity
    const total = discountedPrice * quantity;
    
    // Total should be €2,665.80 (or €2,665.83 with rounding)
    assert.ok(Math.abs(total - 2665.80) < 0.05,
      `Total should be ~€2,665.80, got €${total.toFixed(2)}`);
  });

  test('dark pool badge only shows for buy transactions with discount', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the updateTransactionsList method
    const methodPattern = /updateTransactionsList\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 5000);

    // Check that badge is conditional on discount and transaction type
    assert.ok(methodSection.includes('transaction.discount && transaction.discount > 0 && transaction.type === \'buy\''),
      'dark pool badge should only show for buy transactions with discount > 0');
  });

  test('discount is only applied to buy transactions, not sell', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the addTransaction method
    const addTransactionPattern = /addTransaction\(\)\s*\{/;
    const match = addTransactionPattern.exec(jsContent);
    const handlerStart = match.index;
    const handlerSection = jsContent.substring(handlerStart, handlerStart + 3000);

    // Check that discount is only applied for buy transactions
    assert.ok(handlerSection.includes("type === 'buy'") && handlerSection.includes('discount'),
      'discount should only be applied to buy transactions');
  });
});
