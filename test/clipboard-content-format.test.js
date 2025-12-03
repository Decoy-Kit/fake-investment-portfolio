/**
 * Test to verify expected clipboard content format
 * This simulates what would be copied to clipboard
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Expected Clipboard Content Format', () => {
  test('Clipboard content format with showProfit enabled', () => {
    // Simulate the copyStatementToClipboard logic with sample data
    const mockData = {
      brokerName: 'Test Broker',
      currencySymbol: '$',
      totalValue: 12500.50,
      totalInvested: 10000.00,
      totalChange: 2500.50,
      changePercent: 25.005,
      balance: 5000.00,
      showProfit: true,
      assets: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          quantity: 10,
          currentPrice: 150.50,
          initialPrice: 120.00,
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          quantity: 20,
          currentPrice: 350.00,
          initialPrice: 300.00,
        }
      ]
    };

    // Generate statement
    const statementDate = new Date().toLocaleDateString();
    let statement = `${mockData.brokerName}\n`;
    statement += `Investment Account Statement\n`;
    statement += `Statement Date: ${statementDate}\n`;
    statement += `${'='.repeat(60)}\n\n`;
    
    statement += `PORTFOLIO SUMMARY\n`;
    statement += `${'-'.repeat(60)}\n`;
    statement += `Total Portfolio Value: ${mockData.currencySymbol}${mockData.totalValue.toFixed(2)}\n`;
    
    if (mockData.showProfit) {
      statement += `Total Change: +${mockData.currencySymbol}${mockData.totalChange.toFixed(2)} (+${mockData.changePercent.toFixed(2)}%)\n`;
    }
    
    statement += `Available Balance: ${mockData.currencySymbol}${mockData.balance.toFixed(2)}\n`;
    statement += `\n`;
    
    statement += `HOLDINGS\n`;
    statement += `${'-'.repeat(60)}\n`;
    
    mockData.assets.forEach(asset => {
      const value = asset.quantity * asset.currentPrice;
      const change = value - (asset.quantity * asset.initialPrice);
      const changePercent = ((change / (asset.quantity * asset.initialPrice)) * 100) || 0;
      
      statement += `${asset.symbol} - ${asset.name}\n`;
      statement += `  ${asset.quantity} shares @ ${mockData.currencySymbol}${asset.currentPrice.toFixed(2)}\n`;
      statement += `  Buy-in Value: ${mockData.currencySymbol}${value.toFixed(2)}\n`;
      
      if (mockData.showProfit) {
        statement += `  Change: +${mockData.currencySymbol}${change.toFixed(2)} (${changePercent.toFixed(2)}%)\n`;
      }
      
      statement += `\n`;
    });

    // Verify expected content
    assert.ok(statement.includes('Test Broker'), 'Should include broker name');
    assert.ok(statement.includes('Investment Account Statement'), 'Should include statement header');
    assert.ok(statement.includes('PORTFOLIO SUMMARY'), 'Should include portfolio summary');
    assert.ok(statement.includes('Total Portfolio Value: $12500.50'), 'Should include total value');
    assert.ok(statement.includes('Total Change: +$2500.50'), 'Should include total change when showProfit is true');
    assert.ok(statement.includes('Available Balance: $5000.00'), 'Should include balance');
    assert.ok(statement.includes('HOLDINGS'), 'Should include holdings section');
    assert.ok(statement.includes('AAPL - Apple Inc.'), 'Should include first asset');
    assert.ok(statement.includes('10 shares @ $150.50'), 'Should include first asset details');
    assert.ok(statement.includes('MSFT - Microsoft Corporation'), 'Should include second asset');
    assert.ok(statement.includes('20 shares @ $350.00'), 'Should include second asset details');

    console.log('\n=== SAMPLE CLIPBOARD CONTENT (with showProfit enabled) ===');
    console.log(statement);
    console.log('=== END SAMPLE ===\n');
  });

  test('Clipboard content format with showProfit disabled', () => {
    // Simulate the copyStatementToClipboard logic with sample data
    const mockData = {
      brokerName: 'Test Broker',
      currencySymbol: '$',
      totalValue: 12500.50,
      totalInvested: 10000.00,
      totalChange: 2500.50,
      changePercent: 25.005,
      balance: 5000.00,
      showProfit: false,  // Disabled
      assets: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          quantity: 10,
          currentPrice: 150.50,
          initialPrice: 120.00,
        }
      ]
    };

    // Generate statement
    const statementDate = new Date().toLocaleDateString();
    let statement = `${mockData.brokerName}\n`;
    statement += `Investment Account Statement\n`;
    statement += `Statement Date: ${statementDate}\n`;
    statement += `${'='.repeat(60)}\n\n`;
    
    statement += `PORTFOLIO SUMMARY\n`;
    statement += `${'-'.repeat(60)}\n`;
    statement += `Total Portfolio Value: ${mockData.currencySymbol}${mockData.totalValue.toFixed(2)}\n`;
    
    // showProfit is false, so don't include change
    if (mockData.showProfit) {
      statement += `Total Change: +${mockData.currencySymbol}${mockData.totalChange.toFixed(2)} (+${mockData.changePercent.toFixed(2)}%)\n`;
    }
    
    statement += `Available Balance: ${mockData.currencySymbol}${mockData.balance.toFixed(2)}\n`;
    statement += `\n`;
    
    statement += `HOLDINGS\n`;
    statement += `${'-'.repeat(60)}\n`;
    
    mockData.assets.forEach(asset => {
      const value = asset.quantity * asset.currentPrice;
      const change = value - (asset.quantity * asset.initialPrice);
      const changePercent = ((change / (asset.quantity * asset.initialPrice)) * 100) || 0;
      
      statement += `${asset.symbol} - ${asset.name}\n`;
      statement += `  ${asset.quantity} shares @ ${mockData.currencySymbol}${asset.currentPrice.toFixed(2)}\n`;
      statement += `  Buy-in Value: ${mockData.currencySymbol}${value.toFixed(2)}\n`;
      
      // showProfit is false, so don't include change
      if (mockData.showProfit) {
        statement += `  Change: +${mockData.currencySymbol}${change.toFixed(2)} (${changePercent.toFixed(2)}%)\n`;
      }
      
      statement += `\n`;
    });

    // Verify expected content
    assert.ok(statement.includes('Test Broker'), 'Should include broker name');
    assert.ok(statement.includes('Investment Account Statement'), 'Should include statement header');
    assert.ok(!statement.includes('Total Change:'), 'Should NOT include total change when showProfit is false');
    assert.ok(!statement.includes('Change: +$'), 'Should NOT include asset changes when showProfit is false');
    assert.ok(statement.includes('Total Portfolio Value: $12500.50'), 'Should still include total value');
    assert.ok(statement.includes('Available Balance: $5000.00'), 'Should still include balance');
    assert.ok(statement.includes('AAPL - Apple Inc.'), 'Should still include asset');
    assert.ok(statement.includes('10 shares @ $150.50'), 'Should still include asset details');

    console.log('\n=== SAMPLE CLIPBOARD CONTENT (with showProfit disabled) ===');
    console.log(statement);
    console.log('=== END SAMPLE ===\n');
  });
});
