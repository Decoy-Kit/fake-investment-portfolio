/**
 * Copy Statement to Clipboard Tests
 * Tests that the copy statement feature exists and respects visibility settings
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Copy Statement to Clipboard Tests', () => {
  test('Copy statement button exists in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Verify the copy button exists
    assert.ok(htmlContent.includes('id="copy-statement"'), 'Copy statement button should exist');
    assert.ok(htmlContent.includes('Copy Statement'), 'Button should have "Copy Statement" text');
    assert.ok(htmlContent.includes('fa-copy'), 'Button should have copy icon');
  });

  test('Copy statement method exists in JavaScript', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Verify the method exists
    assert.ok(appJsContent.includes('copyStatementToClipboard()'), 'copyStatementToClipboard method should exist');
  });

  test('Copy statement event listener is wired up', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Verify event listener exists
    assert.ok(appJsContent.includes('copy-statement'), 'Should reference copy-statement button ID');
    assert.ok(appJsContent.includes('copyStatementToClipboard'), 'Should call copyStatementToClipboard method');
  });

  test('Copy statement respects showProfit visibility setting', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    assert.ok(methodStart > 0, 'Method should exist');

    // Find the next method after copyStatementToClipboard
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify it checks the showProfit setting
    assert.ok(methodContent.includes('this.settings.showProfit'), 'Should check showProfit setting');
    
    // Verify conditional logic for profit/loss display
    const showProfitCount = (methodContent.match(/this\.settings\.showProfit/g) || []).length;
    assert.ok(showProfitCount >= 2, 'Should check showProfit setting for both summary and holdings');
  });

  test('Generated statement format includes expected sections', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify statement includes key sections
    assert.ok(methodContent.includes('Investment Account Statement'), 'Statement should include header');
    assert.ok(methodContent.includes('Statement Date'), 'Statement should include date');
    assert.ok(methodContent.includes('PORTFOLIO SUMMARY'), 'Statement should include portfolio summary section');
    assert.ok(methodContent.includes('Total Portfolio Value'), 'Statement should include total value');
    assert.ok(methodContent.includes('Available Balance'), 'Statement should include balance');
    assert.ok(methodContent.includes('HOLDINGS'), 'Statement should include holdings section');
  });

  test('Copy statement uses clipboard API', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify it uses navigator.clipboard
    assert.ok(methodContent.includes('navigator.clipboard.writeText'), 'Should use clipboard API');
  });

  test('Copy statement shows success notification', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify it shows notifications
    assert.ok(methodContent.includes('showNotification'), 'Should show notification');
    assert.ok(methodContent.includes('copied to clipboard'), 'Should show success message');
    assert.ok(methodContent.includes('success'), 'Should show success notification type');
  });

  test('Copy statement handles errors gracefully', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify error handling
    assert.ok(methodContent.includes('try'), 'Should have try block');
    assert.ok(methodContent.includes('catch'), 'Should have catch block');
    assert.ok(methodContent.includes('error'), 'Should handle errors');
  });

  test('Statement includes broker name', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify it gets broker name
    assert.ok(methodContent.includes('broker-name-text'), 'Should get broker name from element');
  });

  test('Statement includes asset details with proper formatting', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

    // Find the copyStatementToClipboard method
    const methodStart = appJsContent.indexOf('copyStatementToClipboard()');
    const methodEnd = appJsContent.indexOf('// Broker Name Management', methodStart);
    const methodContent = appJsContent.substring(methodStart, methodEnd);

    // Verify asset details are included
    assert.ok(methodContent.includes('asset.symbol'), 'Should include asset symbol');
    assert.ok(methodContent.includes('asset.name'), 'Should include asset name');
    assert.ok(methodContent.includes('asset.quantity'), 'Should include quantity');
    assert.ok(methodContent.includes('asset.currentPrice'), 'Should include current price');
    assert.ok(methodContent.includes('formatQuantity'), 'Should format quantity');
    assert.ok(methodContent.includes('formatCurrency'), 'Should format currency values');
  });

  test('Copy button is in screenshot controls section', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Find the screenshot controls section
    const screenshotControlsStart = htmlContent.indexOf('id="screenshot-controls"');
    assert.ok(screenshotControlsStart > 0, 'Screenshot controls section should exist');

    const screenshotControlsEnd = htmlContent.indexOf('</div>', screenshotControlsStart);
    const screenshotControlsSection = htmlContent.substring(screenshotControlsStart, screenshotControlsEnd);

    // Verify copy button is in this section
    assert.ok(screenshotControlsSection.includes('id="copy-statement"'), 'Copy button should be in screenshot controls');
  });

  test('Copy button has edit-only class (indirectly via parent)', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Find the screenshot controls section
    const screenshotControlsStart = htmlContent.indexOf('id="screenshot-controls"');
    const screenshotControlsEnd = htmlContent.indexOf('</div>', screenshotControlsStart + 100);
    const screenshotControlsSection = htmlContent.substring(screenshotControlsStart - 100, screenshotControlsEnd);

    // Verify parent has edit-only class
    assert.ok(screenshotControlsSection.includes('edit-only'), 'Screenshot controls should have edit-only class');
  });
});
