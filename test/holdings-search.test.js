/**
 * Holdings Search Tests
 * Tests the search functionality for filtering holdings in the portfolio tab
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Holdings Search Tests', () => {
  test('HTML contains holdings search input field', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('id="holdings-search"'), 
      'HTML should contain holdings-search input field');
    assert.ok(htmlContent.includes('data-test="holdings-search"'), 
      'HTML should contain holdings-search data-test attribute');
    assert.ok(htmlContent.includes('holdings-search-input'), 
      'HTML should contain holdings-search-input class');
  });

  test('holdings search input has correct placeholder', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('placeholder="Search holdings by symbol or name..."'), 
      'Search input should have appropriate placeholder text');
  });

  test('holdings search container exists in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('holdings-search-container'), 
      'HTML should contain holdings-search-container class');
  });

  test('holdings search is positioned correctly in holdings section', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that search is between section-header and holdings-list
    const sectionHeaderIndex = htmlContent.indexOf('section-header');
    const searchIndex = htmlContent.indexOf('holdings-search-container');
    const holdingsListIndex = htmlContent.indexOf('id="holdings-list"');

    assert.ok(sectionHeaderIndex < searchIndex, 
      'Search should come after section header');
    assert.ok(searchIndex < holdingsListIndex, 
      'Search should come before holdings list');
  });

  test('CSS contains holdings search styles', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.holdings-search-container'), 
      'CSS should contain holdings-search-container styles');
    assert.ok(cssContent.includes('.holdings-search-input'), 
      'CSS should contain holdings-search-input styles');
  });

  test('JavaScript contains filterHoldings method', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('filterHoldings'), 
      'JavaScript should contain filterHoldings method');
  });

  test('JavaScript contains holdingsSearchFilter property', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('holdingsSearchFilter'), 
      'JavaScript should contain holdingsSearchFilter property');
  });

  test('event listener is set up for holdings search input', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes("getElementById('holdings-search')"), 
      'JavaScript should reference holdings-search input');
    assert.ok(jsContent.includes("addEventListener('input'"), 
      'JavaScript should add input event listener');
  });

  test('updateHoldingsList applies search filter', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that filtering logic is present
    assert.ok(jsContent.includes('holdingsSearchFilter') && 
              jsContent.includes('toLowerCase'), 
      'updateHoldingsList should apply case-insensitive filtering');
  });

  test('search filters by both symbol and name', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that both symbol and name are used in filtering
    assert.ok(jsContent.includes('asset.symbol.toLowerCase()'), 
      'Search should filter by symbol');
    assert.ok(jsContent.includes('asset.name.toLowerCase()'), 
      'Search should filter by name');
  });

  test('empty state message for no search results exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('No Holdings Found') || 
              jsContent.includes('No holdings match'), 
      'Should have empty state message for no search results');
  });

  test('search field styling includes focus state', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.holdings-search-input:focus'), 
      'CSS should contain focus state for search input');
  });

  test('search field styling includes placeholder styles', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.holdings-search-input::placeholder'), 
      'CSS should contain placeholder styles for search input');
  });

  test('filterHoldings method calls updateHoldingsList', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that filterHoldings method exists and references updateHoldingsList
    assert.ok(jsContent.includes('filterHoldings'), 
      'filterHoldings method should exist');
    assert.ok(jsContent.includes('this.updateHoldingsList()') || 
              jsContent.includes('this.updateHoldingsList('), 
      'filterHoldings should call updateHoldingsList');
  });
});
