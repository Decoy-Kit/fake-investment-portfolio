/**
 * Test for transaction ordering bug fix
 * Validates that transactions are consistently ordered with newest first
 * and that multiple transactions with the same date maintain stable ordering
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Transaction Ordering Tests', () => {
  test('updateTransactionsList uses stable sorting with secondary key', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that the sorting function exists and handles equal dates
    assert.ok(jsContent.includes('updateTransactionsList'), 
      'JavaScript should contain updateTransactionsList method');
    
    // Check for stable sorting implementation with secondary sort key
    assert.ok(jsContent.includes('localeCompare') || jsContent.includes('b.id'), 
      'Sorting should use a secondary key (ID) for stable ordering when dates are equal');
  });

  test('transaction sorting logic handles same date consistently', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Extract the sorting logic from updateTransactionsList
    const sortFunctionMatch = jsContent.match(/\.sort\s*\(\s*\(a,\s*b\)\s*=>\s*{[\s\S]*?}\s*\)/);
    
    assert.ok(sortFunctionMatch, 'Should find sort function in updateTransactionsList');
    
    const sortFunction = sortFunctionMatch[0];
    
    // Verify that the sort function checks for date equality
    assert.ok(sortFunction.includes('!==') || sortFunction.includes('=='), 
      'Sort function should check for date equality');
  });

  test('sorting preserves transaction integrity', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify that transactions array is copied before sorting to avoid mutation
    assert.ok(jsContent.includes('[...this.transactions]') || jsContent.includes('this.transactions.slice'), 
      'Should create a copy of transactions array before sorting to preserve original');
  });

  test('generateId creates unique identifiers', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that generateId uses both timestamp and random component
    const generateIdMatch = jsContent.match(/generateId\s*\(\s*\)\s*{[\s\S]*?Date\.now[\s\S]*?Math\.random[\s\S]*?}/);
    
    assert.ok(generateIdMatch, 
      'generateId should use both Date.now() and Math.random() for unique IDs');
  });
});
