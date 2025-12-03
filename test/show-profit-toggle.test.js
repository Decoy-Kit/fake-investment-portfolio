import { describe, test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Show Profit Toggle Tests', () => {
  test('HTML contains show profit toggle checkbox', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('id="show-profit-toggle"'), 
      'HTML should contain show-profit-toggle checkbox');
    assert.ok(htmlContent.includes('data-test="show-profit-toggle"'), 
      'Checkbox should have data-test attribute');
    assert.ok(htmlContent.includes('Show Profit/Loss'), 
      'Checkbox should have label text');
  });

  test('JavaScript contains showProfit setting initialization', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that loadSettings includes showProfit default
    assert.ok(jsContent.includes('showProfit: true'), 
      'loadSettings should include showProfit default value');
    
    // Check that showProfit is initialized if undefined
    assert.ok(jsContent.includes('this.settings.showProfit === undefined'), 
      'Should check for undefined showProfit setting');
  });

  test('JavaScript binds event listener to show profit toggle', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for event listener binding
    assert.ok(jsContent.includes('show-profit-toggle') && jsContent.includes('addEventListener'), 
      'JavaScript should bind event listener to show-profit-toggle');
    
    // Check that it saves settings when changed
    assert.ok(jsContent.match(/show-profit-toggle.*addEventListener.*showProfit.*saveSettings/s), 
      'Toggle handler should update settings.showProfit and save settings');
  });

  test('updatePortfolioSummary respects showProfit setting', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that updatePortfolioSummary conditionally displays profit
    assert.ok(jsContent.includes('this.settings.showProfit') && 
              jsContent.match(/updatePortfolioSummary[\s\S]*?this\.settings\.showProfit/), 
      'updatePortfolioSummary should check this.settings.showProfit');
    
    // Check that change-display is hidden when showProfit is false
    assert.ok(jsContent.match(/changeElement\.style\.display.*none/), 
      'Should hide change display when showProfit is false');
  });

  test('updateHoldingsList respects showProfit setting', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that updateHoldingsList conditionally displays profit
    assert.ok(jsContent.includes('this.settings.showProfit') && 
              jsContent.match(/updateHoldingsList[\s\S]*?this\.settings\.showProfit/), 
      'updateHoldingsList should check this.settings.showProfit');
    
    // Check for conditional profit display rendering (now checks both showProfit AND enablePriceVolatility)
    assert.ok(jsContent.match(/profitDisplay\s*=\s*\(this\.settings\.showProfit\s*&&\s*this\.settings\.enablePriceVolatility\)/), 
      'Should conditionally render profitDisplay based on showProfit AND enablePriceVolatility settings');
  });

  test('showProfit setting is properly saved and loaded', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // saveSettings should save to localStorage
    const saveSettingsMatch = jsContent.match(/saveSettings\(\)\s*\{[\s\S]*?localStorage\.setItem\('fake-portfolio-settings',\s*JSON\.stringify\(this\.settings\)\)/);
    assert.ok(saveSettingsMatch, 
      'saveSettings should save this.settings to localStorage');

    // loadSettings should parse from localStorage
    const loadSettingsMatch = jsContent.match(/loadSettings\(\)[\s\S]*?localStorage\.getItem\('fake-portfolio-settings'\)/);
    assert.ok(loadSettingsMatch, 
      'loadSettings should load from localStorage');
  });

  test('showProfit setting is included in export', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that export includes all fake-portfolio- keys
    const exportMatch = jsContent.match(/exportData\(\)[\s\S]*?fake-portfolio-[\s\S]*?fake-portfolio-settings/);
    assert.ok(exportMatch, 
      'exportData should export fake-portfolio-settings which includes showProfit');
  });

  test('checkbox initial state reflects setting value', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that checkbox is initialized with settings value
    assert.ok(jsContent.match(/show-profit-toggle[\s\S]*?\.checked\s*=\s*this\.settings\.showProfit/), 
      'Checkbox checked state should be set from this.settings.showProfit');
  });
});
