/**
 * Tests for the volatility toggle setting that enables/disables fake price changes
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Volatility Toggle Tests', () => {
  test('HTML contains volatility toggle checkbox', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    assert.ok(htmlContent.includes('id="enable-volatility-toggle"'), 
      'HTML should contain enable-volatility-toggle checkbox');
    assert.ok(htmlContent.includes('data-test="enable-volatility-toggle"'), 
      'Checkbox should have data-test attribute for testing');
  });

  test('HTML contains warning message about volatility', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    assert.ok(htmlContent.includes('menu-info-box'), 
      'HTML should contain info box for volatility warning');
    assert.ok(htmlContent.includes('menu.volatilityWarning') || htmlContent.includes('Enabling fake price changes'), 
      'Info box should contain warning text about enabling volatility');
  });

  test('CSS contains styles for info box', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    assert.ok(cssContent.includes('.menu-info-box'), 
      'CSS should contain .menu-info-box styles');
  });

  test('JavaScript contains enablePriceVolatility setting initialization', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that enablePriceVolatility is in default settings
    const loadSettingsMatch = appJsContent.match(
      /loadSettings\(\)\s*\{[\s\S]*?enablePriceVolatility:\s*false[\s\S]*?\}/
    );
    assert.ok(loadSettingsMatch, 
      'loadSettings should initialize enablePriceVolatility to false by default');
  });

  test('JavaScript binds event listener to volatility toggle', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    assert.ok(appJsContent.includes("getElementById('enable-volatility-toggle')"), 
      'Should get enable-volatility-toggle element');
    assert.ok(appJsContent.includes("addEventListener('change'"), 
      'Should add change event listener to volatility toggle');
    assert.ok(appJsContent.includes('this.settings.enablePriceVolatility'), 
      'Event listener should update settings.enablePriceVolatility');
  });

  test('generateRealisticPriceVariation respects enablePriceVolatility setting', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that the method checks the setting
    const methodMatch = appJsContent.match(
      /generateRealisticPriceVariation[\s\S]*?if\s*\(!this\.settings\.enablePriceVolatility\)[\s\S]*?return[\s\S]*?initialPrice:[\s\S]*?currentPrice:/
    );
    assert.ok(methodMatch, 
      'generateRealisticPriceVariation should return same price when volatility is disabled');
  });

  test('simulateMarketUpdates respects enablePriceVolatility setting', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that simulateMarketUpdates returns early if volatility is disabled
    const methodMatch = appJsContent.match(
      /simulateMarketUpdates\(\)\s*\{[\s\S]*?if\s*\(!this\.settings\.enablePriceVolatility\)[\s\S]*?return;/
    );
    assert.ok(methodMatch, 
      'simulateMarketUpdates should return early when volatility is disabled');
  });

  test('enablePriceVolatility setting is properly saved and loaded', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check for save and load operations
    assert.ok(appJsContent.includes('this.saveSettings()'), 
      'Should save settings after changes');
    assert.ok(appJsContent.includes('this.settings = this.loadSettings()'), 
      'Should load settings on initialization');
  });

  test('checkbox initial state reflects setting value', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that checkbox is updated based on settings
    const updateMatch = appJsContent.match(
      /volatilityToggle[\s\S]*?\.checked\s*=\s*this\.settings\.enablePriceVolatility/
    );
    assert.ok(updateMatch, 
      'Checkbox state should be set from settings.enablePriceVolatility');
  });

  test('volatility is disabled by default', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Ensure the default is false, not true
    const loadSettingsMatch = appJsContent.match(
      /enablePriceVolatility:\s*false/
    );
    assert.ok(loadSettingsMatch, 
      'enablePriceVolatility should default to false (disabled)');
  });

  test('volatility toggle checkbox is not checked by default in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    // Find the volatility checkbox line and ensure it doesn't have "checked"
    const checkboxMatch = htmlContent.match(
      /<input[^>]*id="enable-volatility-toggle"[^>]*>/
    );
    assert.ok(checkboxMatch, 'Should find volatility checkbox');
    assert.ok(!checkboxMatch[0].includes('checked'), 
      'Volatility checkbox should not have checked attribute (off by default)');
  });
});
