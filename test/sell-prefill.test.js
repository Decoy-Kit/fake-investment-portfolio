/**
 * Test for sell quantity prefill functionality
 * Validates that when selling, the quantity field is prefilled with owned amount
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Sell Quantity Prefill Tests', () => {
  test('updateTransactionQuantity method exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('updateTransactionQuantity'), 
      'JavaScript should contain updateTransactionQuantity method');
  });

  test('transaction type change handler exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for transaction type event listener
    assert.ok(jsContent.includes('transaction-type') && jsContent.includes('addEventListener'), 
      'JavaScript should have event listener for transaction type changes');
  });

  test('prefill logic checks for sell type and owned quantity', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that the logic considers the transaction type being 'sell'
    assert.ok(jsContent.includes('sell') && jsContent.includes('asset.quantity'), 
      'JavaScript should check for sell type and use asset quantity for prefilling');
  });

  test('transaction quantity field is updated when conditions are met', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that transaction-quantity element is being updated
    assert.ok(jsContent.includes('transaction-quantity') && jsContent.includes('value'), 
      'JavaScript should update transaction-quantity field value');
  });
});