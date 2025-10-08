import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Currency Conversion Bug Tests', () => {
  test('Currency conversion issue reproduction', () => {
  // Test the EUR conversion logic that's causing the issue
  
  // Simulate the currency rates from the app
  const currencies = {
    USD: { symbol: '$', name: 'US Dollar', rate: 1.0 },
    EUR: { symbol: '€', name: 'Euro', rate: 0.85 }
  };
  
  // Simulate user inputting €8 as price
  const userInput = 8.0; // €8
  const currentCurrency = 'EUR';
  
  // Step 1: Convert from EUR to USD for storage (as done in addAsset)
  const currency = currencies[currentCurrency];
  const priceInUSD = userInput / currency.rate;
  console.log(`Input: €${userInput}`);
  console.log(`EUR rate: ${currency.rate}`);
  console.log(`Converted to USD: $${priceInUSD}`);
  
  // Step 2: Convert back from USD to EUR for display (as done in formatCurrency)
  const convertedAmount = priceInUSD * currency.rate;
  const displayPrice = convertedAmount.toFixed(2);
  console.log(`Converted back to EUR: €${displayPrice}`);
  
  // The issue: due to floating point precision, this might not be exactly €8.00
  // Let's see what the actual values are
  console.log(`Expected: €8.00, Actual: €${displayPrice}`);
  
  // This test should demonstrate the precision issue
  assert.strictEqual(parseFloat(displayPrice), 8.0, 
    `Expected €8.00 but got €${displayPrice} due to floating point precision`);
  });

  test('EUR 8.00 to 6.80 bug reproduction', () => {
    // Try to reproduce the exact issue: €8 showing as €6.80
    // This might be related to how transactions are created/displayed
    
    const currencies = {
      USD: { symbol: '$', name: 'US Dollar', rate: 1.0 },
      EUR: { symbol: '€', name: 'Euro', rate: 0.85 }
    };
    
    const userInput = 8.0; // €8
    const currentCurrency = 'EUR';
    const currency = currencies[currentCurrency];
    
    // Convert EUR to USD (as in addAsset)
    const priceInUSD = userInput / currency.rate;
    console.log(`User input: €${userInput}`);
    console.log(`Price in USD: $${priceInUSD}`);
    
    // Now let's see what happens with different rounding scenarios
    const roundedUSD = Math.round(priceInUSD * 100) / 100; // Round to 2 decimal places
    console.log(`Rounded USD: $${roundedUSD}`);
    
    // Convert back (as in formatCurrency)
    const backToEUR = roundedUSD * currency.rate;
    console.log(`Back to EUR: €${backToEUR}`);
    
    // Test with the formatCurrency logic
    const formatCurrency = (amount) => {
      const convertedAmount = amount * currency.rate;
      return parseFloat(convertedAmount.toFixed(2));
    };
    
    const displayPrice = formatCurrency(priceInUSD);
    console.log(`Display price: €${displayPrice}`);
    
    // Check if this could result in 6.80
    // Maybe the issue is with how the transaction price is stored vs display price
    const suspectedBugPrice = 8 * 0.85; // Direct multiplication instead of division
    console.log(`Suspected bug calculation (8 * 0.85): €${suspectedBugPrice}`);
    
    if (suspectedBugPrice === 6.8) {
      console.log('FOUND THE BUG: Direct multiplication instead of proper conversion!');
    }
  });

  test('Verify the fix prevents undefined transaction variables', () => {
    // This test ensures the bug we fixed doesn't regress
    const projectRoot = path.dirname(__dirname);
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Make sure the fix is in place
    assert.ok(jsContent.includes('price: priceInUSD'), 'Transaction should use priceInUSD for price');
    assert.ok(jsContent.includes('total: totalCostUSD'), 'Transaction should use totalCostUSD for total');
    
    // Make sure the old buggy code is not there
    assert.ok(!jsContent.includes('price,\n'), 'Should not have undefined price variable');
    assert.ok(!jsContent.includes('total: totalCost\n') || jsContent.includes('total: totalCostUSD'), 
      'Should not have undefined totalCost variable');
  });

  test('Transaction creation variables are properly defined', () => {
    // Load the app.js file to check that the undefined variables bug is fixed
    const projectRoot = path.dirname(__dirname);
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for the transaction creation code
    const transactionCreationRegex = /const transaction = \{[\s\S]*?price: priceInUSD[\s\S]*?total: totalCostUSD[\s\S]*?\}/;
    const match = jsContent.match(transactionCreationRegex);
    
    assert.ok(match, 'Should find properly defined transaction creation code');
    
    // Verify that the correct variables are used
    assert.ok(match[0].includes('price: priceInUSD'), 'Transaction creation should use "priceInUSD" variable');
    assert.ok(match[0].includes('total: totalCostUSD'), 'Transaction creation should use "totalCostUSD" variable');
    
    console.log('Found corrected transaction creation code:');
    console.log(match[0]);
  });
});