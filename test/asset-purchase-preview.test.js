/**
 * Tests for asset purchase preview functionality
 * Verifies that the purchase price preview is displayed and calculated correctly in the Add New Asset form
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Asset Purchase Preview Tests', () => {
  test('HTML contains asset purchase preview container', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('id="asset-purchase-preview"'), 
      'HTML should contain asset-purchase-preview element');
    assert.ok(htmlContent.includes('id="asset-purchase-preview-content"'), 
      'HTML should contain asset-purchase-preview-content element');
  });

  test('preview container is positioned correctly in add-asset-form', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Find the add-asset-form section
    const addAssetFormStart = htmlContent.indexOf('id="add-asset-form"');
    assert.ok(addAssetFormStart > 0, 'add-asset-form should exist');

    // Find the preview container relative to the form
    const formSection = htmlContent.substring(addAssetFormStart);
    const previewIndex = formSection.indexOf('id="asset-purchase-preview"');
    const formActionsIndex = formSection.indexOf('class="form-actions"');

    assert.ok(previewIndex > 0, 'preview should be inside add-asset-form');
    assert.ok(previewIndex < formActionsIndex, 
      'preview should be before form-actions');
  });

  test('JavaScript contains updateAssetPurchasePreview method', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('updateAssetPurchasePreview()'), 
      'JavaScript should contain updateAssetPurchasePreview method');
  });

  test('JavaScript contains clearAssetPurchasePreview method', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('clearAssetPurchasePreview()'), 
      'JavaScript should contain clearAssetPurchasePreview method');
  });

  test('event listeners are set up for asset-quantity input', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that asset-quantity has an input event listener that calls updateAssetPurchasePreview
    assert.ok(jsContent.includes("getElementById('asset-quantity')"), 
      'JavaScript should reference asset-quantity element');
    assert.ok(jsContent.includes("addEventListener('input'"), 
      'JavaScript should set up input event listeners');
    assert.ok(jsContent.includes('updateAssetPurchasePreview'), 
      'Event listener should call updateAssetPurchasePreview');
  });

  test('event listeners are set up for asset-price input', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that asset-price has an input event listener that calls updateAssetPurchasePreview
    assert.ok(jsContent.includes("getElementById('asset-price')"), 
      'JavaScript should reference asset-price element');
    
    // Find the asset-price input event listener
    const assetPricePattern = /getElementById\('asset-price'\)\.addEventListener\('input'/;
    assert.ok(assetPricePattern.test(jsContent), 
      'asset-price should have input event listener');
  });

  test('preview is cleared when opening add-asset modal', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the add-asset-btn click handler
    const addAssetBtnIndex = jsContent.indexOf("getElementById('add-asset-btn')");
    assert.ok(addAssetBtnIndex > 0, 'add-asset-btn click handler should exist');

    // Check that clearAssetPurchasePreview is called in the handler
    const handlerSection = jsContent.substring(addAssetBtnIndex, addAssetBtnIndex + 500);
    assert.ok(handlerSection.includes('clearAssetPurchasePreview'), 
      'add-asset-btn handler should call clearAssetPurchasePreview');
  });

  test('preview is cleared when closing add-asset modal', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the close modal handler for add-asset-modal
    const closeModalIndex = jsContent.indexOf("querySelectorAll('.close-modal')");
    assert.ok(closeModalIndex > 0, 'close-modal handler should exist');

    // Check that clearAssetPurchasePreview is called when closing add-asset-modal
    const handlerSection = jsContent.substring(closeModalIndex, closeModalIndex + 1000);
    assert.ok(handlerSection.includes("modalId === 'add-asset-modal'"), 
      'handler should check for add-asset-modal');
    assert.ok(handlerSection.includes('clearAssetPurchasePreview'), 
      'handler should call clearAssetPurchasePreview for add-asset-modal');
  });

  test('preview is cleared when form is reset after adding asset', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the addAsset method definition
    const addAssetPattern = /addAsset\(\)\s*\{/;
    const match = addAssetPattern.exec(jsContent);
    assert.ok(match, 'addAsset method should exist');
    
    const addAssetStart = match.index;

    // Check the section after form.reset() is called
    // Increased from 3000 to 4000 to accommodate input validation code
    const addAssetSection = jsContent.substring(addAssetStart, addAssetStart + 4000);
    const resetIndex = addAssetSection.indexOf(".getElementById('add-asset-form').reset()");
    assert.ok(resetIndex > 0, 'form.reset() should be called');

    const afterResetSection = addAssetSection.substring(resetIndex, resetIndex + 500);
    assert.ok(afterResetSection.includes('clearAssetPurchasePreview'), 
      'clearAssetPurchasePreview should be called after form.reset()');
  });

  test('preview calculation uses current currency', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition (not just the call)
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    assert.ok(match, 'updateAssetPurchasePreview method definition should exist');
    
    const methodStart = match.index;

    // Check that it uses getCurrentCurrencySymbol
    const methodSection = jsContent.substring(methodStart, methodStart + 1500);
    assert.ok(methodSection.includes('getCurrentCurrencySymbol'), 
      'method should use getCurrentCurrencySymbol');
  });

  test('preview displays total purchase price formula', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 2500);

    // Check that it displays "Total Purchase Price"
    assert.ok(methodSection.includes('Total Purchase Price'), 
      'method should display "Total Purchase Price" label');
    
    // Check that it uses transaction-preview-total class (reusing existing styles)
    assert.ok(methodSection.includes('transaction-preview-total'), 
      'method should use transaction-preview-total class');
    
    // Check that it displays the formula (quantity × price)
    assert.ok(methodSection.includes('transaction-preview-formula'), 
      'method should use transaction-preview-formula class for displaying formula');
    
    // Check that it calculates quantity * discountedPrice
    assert.ok(methodSection.includes('quantity * discountedPrice'), 
      'method should calculate total as quantity * discountedPrice');
  });

  test('preview is hidden when inputs are invalid', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 1500);

    // Check that it validates inputs
    assert.ok(methodSection.includes('isNaN(quantity)'), 
      'method should check if quantity is NaN');
    assert.ok(methodSection.includes('quantity <= 0'), 
      'method should check if quantity is <= 0');
    assert.ok(methodSection.includes('isNaN(inputPrice)'), 
      'method should check if inputPrice is NaN');
    assert.ok(methodSection.includes('inputPrice <= 0'), 
      'method should check if inputPrice is <= 0');
    assert.ok(methodSection.includes("classList.add('hidden')"), 
      'method should hide preview when inputs are invalid');
  });

  test('preview uses number formatting for price display', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 1500);

    // Check that it uses toLocaleString for displaying prices (not formatCurrency)
    // since input prices are already in display currency
    assert.ok(methodSection.includes('toLocaleString'), 
      'method should use toLocaleString for displaying prices already in display currency');
  });

  test('preview uses formatQuantity for quantity display', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 2500);

    // Check that it uses formatQuantity for displaying quantity
    assert.ok(methodSection.includes('formatQuantity'), 
      'method should use formatQuantity for displaying quantity');
  });

  test('preview container reuses existing transaction-preview styles', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that the container uses transaction-preview class for consistent styling
    assert.ok(htmlContent.includes('id="asset-purchase-preview" class="transaction-preview'), 
      'preview container should use transaction-preview class for styling');
  });

  test('event listener is set up for asset-discount input', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that asset-discount has an input event listener that calls updateAssetPurchasePreview
    assert.ok(jsContent.includes("getElementById('asset-discount')"), 
      'JavaScript should reference asset-discount element');
    
    // Find the asset-discount input event listener
    const assetDiscountPattern = /getElementById\('asset-discount'\)\.addEventListener\('input'/;
    assert.ok(assetDiscountPattern.test(jsContent), 
      'asset-discount should have input event listener');
  });

  test('preview applies discount to price calculation', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 2500);

    // Check that it reads the discount input
    assert.ok(methodSection.includes("getElementById('asset-discount')"), 
      'method should read asset-discount input');
    
    // Check that it calculates discounted price
    assert.ok(methodSection.includes('discountedPrice = inputPrice * (1 - discount / 100)'), 
      'method should calculate discounted price using formula: inputPrice * (1 - discount / 100)');
    
    // Check that total uses discounted price
    assert.ok(methodSection.includes('quantity * discountedPrice'), 
      'method should use discounted price in total calculation');
  });

  test('preview displays discount in formula when discount > 0', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find updateAssetPurchasePreview method definition
    const methodPattern = /updateAssetPurchasePreview\(\)\s*\{/;
    const match = methodPattern.exec(jsContent);
    const methodStart = match.index;
    const methodSection = jsContent.substring(methodStart, methodStart + 2500);

    // Check that it conditionally displays discount information
    assert.ok(methodSection.includes('if (discount > 0)'), 
      'method should check if discount > 0');
    
    // Check that it shows strikethrough original price
    assert.ok(methodSection.includes('text-decoration: line-through'), 
      'method should show original price with strikethrough when discount is applied');
    
    // Check that it displays discount percentage
    assert.ok(methodSection.includes('with ${discount}% discount'), 
      'method should display discount percentage in formula');
  });
});
