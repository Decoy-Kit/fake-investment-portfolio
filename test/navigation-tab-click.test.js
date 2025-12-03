/**
 * Navigation tab click tests
 * Tests that clicking on navigation tabs works reliably,
 * even when clicking on child elements (icons or text)
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Navigation Tab Click Tests', () => {
  test('navigation event handler uses e.currentTarget instead of e.target', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that the navigation handler uses e.currentTarget.dataset.view
    // This ensures clicks on child elements (icons, text) still work
    const navHandlerPattern = /\.nav-item.*addEventListener\('click'.*e\.currentTarget\.dataset\.view/s;
    assert.ok(navHandlerPattern.test(jsContent), 
      'Navigation handler should use e.currentTarget.dataset.view to handle clicks on child elements');
  });

  test('navigation HTML structure has data-view on buttons', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that nav-item buttons have data-view attributes
    assert.ok(htmlContent.includes('class="nav-item active" data-view="portfolio"'), 
      'Portfolio nav button should have data-view="portfolio"');
    assert.ok(htmlContent.includes('class="nav-item" data-view="transactions"'), 
      'Transactions nav button should have data-view="transactions"');
    assert.ok(htmlContent.includes('class="nav-item" data-view="analytics"'), 
      'Analytics nav button should have data-view="analytics"');
  });

  test('navigation buttons contain child elements', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Verify that nav buttons contain icons and spans
    // This confirms why e.currentTarget is needed (child elements can be clicked)
    assert.ok(htmlContent.includes('<button class="nav-item active" data-view="portfolio">\n                <i class="fas fa-wallet"></i>'), 
      'Portfolio button should contain icon element');
    assert.ok(htmlContent.includes('<button class="nav-item" data-view="transactions">\n                <i class="fas fa-exchange-alt"></i>'), 
      'Transactions button should contain icon element');
    assert.ok(htmlContent.includes('<button class="nav-item" data-view="analytics">\n                <i class="fas fa-chart-bar"></i>'), 
      'Analytics button should contain icon element');
  });

  test('switchView method exists and handles view switching', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that switchView method exists
    assert.ok(jsContent.includes('switchView(viewName)'), 
      'JavaScript should contain switchView method');
    
    // Check that it updates nav-item active states
    assert.ok(jsContent.includes('.nav-item') && jsContent.includes('classList.remove(\'active\')'), 
      'switchView should remove active class from nav items');
    assert.ok(jsContent.includes('[data-view="${viewName}"]') && jsContent.includes('classList.add(\'active\')'), 
      'switchView should add active class to selected nav item');
    
    // Check that it shows/hides views
    assert.ok(jsContent.includes('.view') && jsContent.includes('classList.remove(\'active\')'), 
      'switchView should hide all views');
    assert.ok(jsContent.includes('${viewName}-view') && jsContent.includes('classList.add(\'active\')'), 
      'switchView should show selected view');
  });

  test('all view sections exist in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that all view sections exist
    assert.ok(htmlContent.includes('id="portfolio-view"'), 
      'HTML should contain portfolio-view section');
    assert.ok(htmlContent.includes('id="transactions-view"'), 
      'HTML should contain transactions-view section');
    assert.ok(htmlContent.includes('id="analytics-view"'), 
      'HTML should contain analytics-view section');
  });
});
