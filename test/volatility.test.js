/**
 * Tests for the price volatility system and its effect on portfolio calculations
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Price Volatility System Tests', () => {
  test('volatility system methods exist in app.js', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that volatility methods exist
    assert.ok(appJsContent.includes('generateRealisticPriceVariation'), 
      'generateRealisticPriceVariation method should exist');
    assert.ok(appJsContent.includes('simulateMarketUpdates'), 
      'simulateMarketUpdates method should exist');
    assert.ok(appJsContent.includes('updateAssetPrice'), 
      'updateAssetPrice method should exist');
  });

  test('uniform volatility implementation uses single maxVariation value', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that asset type differentiation has been removed
    assert.ok(!appJsContent.includes('isCryptoAsset(symbol)'), 
      'isCryptoAsset method calls should be removed from price variation');
    assert.ok(!appJsContent.includes('isVolatileStock(symbol)'), 
      'isVolatileStock method calls should be removed from price variation');
    
    // Check for uniform volatility implementation
    assert.ok(appJsContent.includes('maxVariation = 0.08'), 
      'Should use uniform 8% maximum variation');
  });

  test('portfolio calculation methods use current prices affected by volatility', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Verify calculateTotalValue uses currentPrice (affected by volatility)
    const calculateTotalValueMatch = appJsContent.match(
      /calculateTotalValue\(\)\s*\{[\s\S]*?return[\s\S]*?asset\.currentPrice[\s\S]*?\}/
    );
    assert.ok(calculateTotalValueMatch, 
      'calculateTotalValue should use asset.currentPrice which is affected by volatility');
    
    // Verify updatePortfolioSummary calls the calculation methods
    assert.ok(appJsContent.includes('const totalValue = this.calculateTotalValue()'), 
      'updatePortfolioSummary should call calculateTotalValue');
    assert.ok(appJsContent.includes('const totalInvested = this.calculateTotalInvested()'), 
      'updatePortfolioSummary should call calculateTotalInvested');
    assert.ok(appJsContent.includes('const totalChange = totalValue - totalInvested'), 
      'updatePortfolioSummary should calculate totalChange from totalValue - totalInvested');
  });

  test('simulateMarketUpdates is called during portfolio updates', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that simulateMarketUpdates is called in updatePortfolio
    const updatePortfolioMatch = appJsContent.match(
      /updatePortfolio\(\)\s*\{[\s\S]*?this\.simulateMarketUpdates\(\)[\s\S]*?\}/
    );
    assert.ok(updatePortfolioMatch, 
      'updatePortfolio should call simulateMarketUpdates to ensure volatility affects portfolio totals');
  });

  test('price variation generates different initial and current prices', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that price variation logic exists
    assert.ok(appJsContent.includes('initialVariation'), 
      'Should generate initial price variation');
    assert.ok(appJsContent.includes('currentVariation'), 
      'Should generate current price variation');
    assert.ok(appJsContent.includes('initialPrice:') && appJsContent.includes('currentPrice:'), 
      'Should return both initialPrice and currentPrice');
  });

  test('asset creation uses price variation system', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check that addAsset method uses generateRealisticPriceVariation
    const addAssetMatch = appJsContent.match(
      /addAsset[\s\S]*?generateRealisticPriceVariation[\s\S]*?currentPrice:\s*marketCurrentPrice[\s\S]*?initialPrice:\s*adjustedInitialPrice/
    );
    assert.ok(addAssetMatch, 
      'addAsset should use generateRealisticPriceVariation and set different currentPrice and initialPrice');
  });

  test('volatility constraints are properly implemented', () => {
    const appJsPath = path.join(projectRoot, 'app.js');
    const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
    
    // Check for price bounds in updateAssetPrice
    assert.ok(appJsContent.includes('Math.max(minPrice, Math.min(maxPrice'), 
      'updateAssetPrice should constrain price changes to reasonable bounds');
    assert.ok(appJsContent.includes('asset.initialPrice * 0.1') && appJsContent.includes('asset.initialPrice * 5'), 
      'Should have 10%-500% price bounds relative to initial price');
  });
});