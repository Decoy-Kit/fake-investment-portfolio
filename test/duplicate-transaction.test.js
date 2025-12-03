/**
 * Test for duplicate transaction bug when double-tapping submit button
 * Reproduces the issue where rapidly submitting the Add Transaction form
 * (e.g., double-tap on mobile) creates duplicate transactions
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Duplicate Transaction Bug Tests', () => {
  test('addTransaction should prevent duplicate submissions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Extract the addTransaction method
    const addTransactionMatch = jsContent.match(
      /addTransaction\s*\(\s*\)\s*\{[\s\S]*?(?=\n\s{4}\w|\n\s{0,3}\}[\s\S]*?\n\s{4}\w)/
    );

    assert.ok(addTransactionMatch, 'addTransaction method should exist');

    const addTransactionCode = addTransactionMatch[0];

    // The fix should disable the submit button to prevent duplicate submissions
    const hasButtonDisable = addTransactionCode.includes('disabled') ||
                              addTransactionCode.includes('isSubmitting');

    assert.ok(
      hasButtonDisable,
      'addTransaction should disable submit button to prevent duplicate submissions'
    );
  });

  test('addAsset should prevent duplicate submissions', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Extract the addAsset method
    const addAssetMatch = jsContent.match(
      /addAsset\s*\(\s*\)\s*\{[\s\S]*?(?=\n\s{4}\/\*|\n\s{4}\w+\s*\()/
    );

    assert.ok(addAssetMatch, 'addAsset method should exist');

    const addAssetCode = addAssetMatch[0];

    // The fix should disable the submit button to prevent duplicate submissions
    const hasButtonDisable = addAssetCode.includes('disabled');

    assert.ok(
      hasButtonDisable,
      'addAsset should disable submit button to prevent duplicate submissions'
    );
  });

  test('form submission handler should prevent default behavior', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify that the form submission handler calls preventDefault
    const hasPreventDefault = jsContent.match(
      /add-transaction-form.*addEventListener.*submit.*preventDefault/s
    );

    assert.ok(
      hasPreventDefault,
      'Form submission should call preventDefault to avoid default form submission'
    );
  });

  test('submit button should be disabled during transaction processing', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Extract the addTransaction method
    const addTransactionMatch = jsContent.match(
      /addTransaction\s*\(\s*\)\s*\{[\s\S]*?(?=\n\s{4}\w|\n\s{0,3}\}[\s\S]*?\n\s{4}\w)/
    );

    if (!addTransactionMatch) {
      assert.fail('addTransaction method not found');
    }

    const addTransactionCode = addTransactionMatch[0];

    // Check if there's logic to disable the submit button at the start
    // and re-enable it at the end or on error
    const hasButtonDisableLogic = 
      addTransactionCode.includes('disabled = true') ||
      addTransactionCode.includes('.disabled = true');

    assert.ok(
      hasButtonDisableLogic,
      'Submit button should be disabled at start of addTransaction to prevent double-tap'
    );
  });

  test('HTML form should have a submit button with appropriate type', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that the Add Transaction form has a proper submit button
    const hasSubmitButton = htmlContent.match(
      /<form id="add-transaction-form">[\s\S]*?<button type="submit"[\s\S]*?>[\s\S]*?Add Transaction[\s\S]*?<\/button>/
    );

    assert.ok(
      hasSubmitButton,
      'Add Transaction form should have a submit button with type="submit"'
    );
  });

  test('submit buttons have IDs for easy reference', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that submit buttons have IDs
    assert.ok(
      htmlContent.includes('id="add-transaction-submit-btn"'),
      'Add Transaction submit button should have an ID'
    );

    assert.ok(
      htmlContent.includes('id="add-asset-submit-btn"'),
      'Add Asset submit button should have an ID'
    );
  });
});
