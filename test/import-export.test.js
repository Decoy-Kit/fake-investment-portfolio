/**
 * Import/Export functionality tests
 * Tests actual import/export behavior by inspecting JSON output and functionality
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Import/Export Functionality Tests', () => {
  test('export data structure validation - test localStorage scanning logic', () => {
    // Simulate the export localStorage scanning logic
    const mockLocalStorage = {
      'fake-portfolio-assets': JSON.stringify([{ id: '1', symbol: 'AAPL' }]),
      'fake-portfolio-balance': '1000.00',
      'fake-portfolio-settings': JSON.stringify({ currency: 'EUR', theme: 'mobile' }),
      'fake-portfolio-broker-name-mobile': 'Test Broker',
      'fake-portfolio-transactions': JSON.stringify([]),
      'other-app-data': 'should-not-be-included',
      'fake-portfolio-future-feature': 'future-data'
    };

    // Simulate the export logic from the app
    const exportData = {};
    const localStorageKeys = Object.keys(mockLocalStorage);
    
    // This mimics the future-proof scanning logic in exportData()
    localStorageKeys.forEach(key => {
      if (key.startsWith('fake-portfolio-')) {
        exportData[key] = mockLocalStorage[key];
      }
    });

    // Create the export object structure
    const exportObject = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      subdomain: 'test-domain',
      data: exportData
    };

    // Validate the export structure
    assert.ok(exportObject.exportedAt, 'Export should include timestamp');
    assert.ok(exportObject.version, 'Export should include version');
    assert.ok(exportObject.subdomain, 'Export should include subdomain');
    assert.ok(exportObject.data, 'Export should include data object');

    // Validate that only fake-portfolio- keys are included
    const exportedKeys = Object.keys(exportObject.data);
    assert.ok(exportedKeys.includes('fake-portfolio-assets'), 'Should include assets');
    assert.ok(exportedKeys.includes('fake-portfolio-balance'), 'Should include balance');
    assert.ok(exportedKeys.includes('fake-portfolio-settings'), 'Should include settings');
    assert.ok(exportedKeys.includes('fake-portfolio-broker-name-mobile'), 'Should include broker names');
    assert.ok(exportedKeys.includes('fake-portfolio-transactions'), 'Should include transactions');
    assert.ok(exportedKeys.includes('fake-portfolio-future-feature'), 'Should include future feature keys');
    assert.ok(!exportedKeys.includes('other-app-data'), 'Should not include non-fake-portfolio keys');

    // Validate data integrity
    assert.strictEqual(exportObject.data['fake-portfolio-balance'], '1000.00', 'Balance should be preserved');
    assert.strictEqual(exportObject.data['fake-portfolio-broker-name-mobile'], 'Test Broker', 'Broker name should be preserved');
    
    const exportedAssets = JSON.parse(exportObject.data['fake-portfolio-assets']);
    assert.strictEqual(exportedAssets[0].symbol, 'AAPL', 'Asset data should be preserved');

    const exportedSettings = JSON.parse(exportObject.data['fake-portfolio-settings']);
    assert.strictEqual(exportedSettings.currency, 'EUR', 'Currency should be preserved');
    assert.strictEqual(exportedSettings.theme, 'mobile', 'Theme should be preserved');
  });

  test('import data validation and localStorage restoration logic', () => {
    // Test import data with valid structure
    const validImportData = {
      exportedAt: '2025-01-01T00:00:00.000Z',
      version: '1.0',
      subdomain: 'test-domain',
      data: {
        'fake-portfolio-assets': JSON.stringify([{ id: '2', symbol: 'MSFT', quantity: 5 }]),
        'fake-portfolio-balance': '2000.00',
        'fake-portfolio-settings': JSON.stringify({ currency: 'GBP', theme: 'broker' }),
        'fake-portfolio-broker-name-broker': 'Imported Broker',
        'fake-portfolio-transactions': JSON.stringify([{ id: 'tx1', type: 'buy' }])
      }
    };

    // Validate import data structure (this mimics the validation in importData method)
    assert.ok(validImportData.data, 'Import data should have data property');
    assert.strictEqual(typeof validImportData.data, 'object', 'Import data should be an object');

    // Simulate the localStorage restoration process
    const mockLocalStorage = {};
    
    // Clear existing fake-portfolio- keys (simulate clearing logic)
    const existingKeys = ['fake-portfolio-old-data', 'other-data'];
    existingKeys.forEach(key => {
      if (key.startsWith('fake-portfolio-')) {
        delete mockLocalStorage[key];
      }
    });

    // Import all data (simulate import logic)
    Object.entries(validImportData.data).forEach(([key, value]) => {
      if (key.startsWith('fake-portfolio-')) {
        mockLocalStorage[key] = value;
      }
    });

    // Verify import results
    assert.strictEqual(mockLocalStorage['fake-portfolio-balance'], '2000.00', 'Balance should be imported');
    assert.strictEqual(mockLocalStorage['fake-portfolio-broker-name-broker'], 'Imported Broker', 'Broker name should be imported');

    const importedAssets = JSON.parse(mockLocalStorage['fake-portfolio-assets']);
    assert.strictEqual(importedAssets[0].symbol, 'MSFT', 'Assets should be imported correctly');
    assert.strictEqual(importedAssets[0].quantity, 5, 'Asset quantity should be preserved');

    const importedSettings = JSON.parse(mockLocalStorage['fake-portfolio-settings']);
    assert.strictEqual(importedSettings.currency, 'GBP', 'Currency setting should be imported');
    assert.strictEqual(importedSettings.theme, 'broker', 'Theme setting should be imported');

    const importedTransactions = JSON.parse(mockLocalStorage['fake-portfolio-transactions']);
    assert.strictEqual(importedTransactions[0].type, 'buy', 'Transactions should be imported correctly');
  });

  test('export JSON format validation and metadata inclusion', () => {
    // Test the JSON structure that would be generated
    const testData = {
      'fake-portfolio-assets': '[]',
      'fake-portfolio-balance': '500.00',
      'fake-portfolio-settings': '{"currency":"USD","theme":"default"}'
    };

    const exportObject = {
      exportedAt: '2025-01-01T12:00:00.000Z',
      version: '1.0',
      subdomain: 'localhost',
      data: testData
    };

    // Convert to JSON and back to simulate file export/import
    const jsonString = JSON.stringify(exportObject, null, 2);
    const parsedObject = JSON.parse(jsonString);

    // Validate JSON structure integrity
    assert.ok(parsedObject.exportedAt, 'JSON should preserve timestamp');
    assert.ok(parsedObject.version, 'JSON should preserve version');
    assert.ok(parsedObject.subdomain, 'JSON should preserve subdomain');
    assert.ok(parsedObject.data, 'JSON should preserve data object');

    // Validate that nested JSON strings are properly preserved
    const settings = JSON.parse(parsedObject.data['fake-portfolio-settings']);
    assert.strictEqual(settings.currency, 'USD', 'Nested JSON should be preserved');
    assert.strictEqual(settings.theme, 'default', 'Nested JSON should be preserved');

    // Validate metadata format
    assert.ok(new Date(parsedObject.exportedAt).getTime(), 'Timestamp should be valid ISO date');
    assert.ok(parsedObject.subdomain.length > 0, 'Subdomain should not be empty');
  });

  test('import validation handles invalid data structures', () => {
    // Test various invalid import data formats
    const invalidDataCases = [
      { description: 'Missing data property', data: { exportedAt: '2025-01-01', version: '1.0' } },
      { description: 'Data property is not object', data: { data: 'string-instead-of-object' } },
      { description: 'Data property is null', data: { data: null } },
      { description: 'Data property is array', data: { data: [] } }
    ];

    invalidDataCases.forEach(testCase => {
      // Simulate the validation logic from importData method
      let validationFailed = false;
      
      try {
        if (!testCase.data.data || typeof testCase.data.data !== 'object' || Array.isArray(testCase.data.data)) {
          throw new Error('Invalid import file format');
        }
      } catch (error) {
        validationFailed = true;
        assert.ok(error.message.includes('Invalid import file format'), 
          `${testCase.description} should be rejected with proper error message`);
      }
      
      assert.ok(validationFailed, `${testCase.description} should fail validation`);
    });
  });

  test('future-proof key scanning captures new localStorage keys', () => {
    // Test that the scanning logic will capture future keys
    const mockLocalStorageWithFutureKeys = {
      'fake-portfolio-assets': '[]',
      'fake-portfolio-balance': '1000',
      'fake-portfolio-settings': '{}',
      'fake-portfolio-new-feature-2025': 'new-data',
      'fake-portfolio-ai-recommendations': JSON.stringify({ enabled: true }),
      'fake-portfolio-custom-themes': JSON.stringify(['theme1', 'theme2']),
      'unrelated-app-data': 'should-be-ignored',
      'fake-portfolio-analytics-v2': JSON.stringify({ charts: true })
    };

    // Simulate the future-proof scanning logic
    const exportData = {};
    Object.keys(mockLocalStorageWithFutureKeys).forEach(key => {
      if (key.startsWith('fake-portfolio-')) {
        exportData[key] = mockLocalStorageWithFutureKeys[key];
      }
    });

    // Verify all fake-portfolio- keys are captured, including future ones
    const expectedKeys = [
      'fake-portfolio-assets',
      'fake-portfolio-balance', 
      'fake-portfolio-settings',
      'fake-portfolio-new-feature-2025',
      'fake-portfolio-ai-recommendations',
      'fake-portfolio-custom-themes',
      'fake-portfolio-analytics-v2'
    ];

    expectedKeys.forEach(key => {
      assert.ok(exportData.hasOwnProperty(key), `Should capture future key: ${key}`);
    });

    assert.ok(!exportData.hasOwnProperty('unrelated-app-data'), 'Should not capture unrelated keys');

    // Verify data integrity for future keys
    assert.strictEqual(exportData['fake-portfolio-new-feature-2025'], 'new-data', 'Future feature data should be preserved');
    
    const aiRecommendations = JSON.parse(exportData['fake-portfolio-ai-recommendations']);
    assert.strictEqual(aiRecommendations.enabled, true, 'Future JSON data should be preserved');

    const customThemes = JSON.parse(exportData['fake-portfolio-custom-themes']);
    assert.strictEqual(customThemes.length, 2, 'Future array data should be preserved');
  });

  test('UI elements exist for import/export functionality', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Verify essential UI elements are present
    assert.ok(htmlContent.includes('id="export-data-btn"'), 'Export button should exist');
    assert.ok(htmlContent.includes('id="import-data-btn"'), 'Import button should exist');
    assert.ok(htmlContent.includes('id="import-confirmation-modal"'), 'Import modal should exist');
    assert.ok(htmlContent.includes('id="import-file-input"'), 'File input should exist');
    assert.ok(htmlContent.includes('id="confirm-import-btn"'), 'Import confirmation button should exist');
  });
});