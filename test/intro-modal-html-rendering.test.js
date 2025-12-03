/**
 * Intro Modal HTML Rendering Tests
 * Tests that HTML tags in translations are properly rendered as HTML instead of literal text
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Intro Modal - HTML Rendering', () => {
  test('containsHTML helper method exists in I18n class', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('containsHTML('), 
      'I18n class should have containsHTML helper method');
    assert.ok(jsContent.match(/containsHTML\([^)]*\)\s*\{[\s\S]*?<[a-z]/i), 
      'containsHTML should check for HTML tags');
  });

  test('applyTranslations uses innerHTML for translations with HTML tags', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that applyTranslations calls containsHTML
    assert.ok(jsContent.match(/applyTranslations[\s\S]*?containsHTML/), 
      'applyTranslations should call containsHTML method');
    
    // Check that innerHTML is used when HTML is detected
    assert.ok(jsContent.match(/if\s*\([^)]*containsHTML[^)]*\)[^}]*innerHTML/), 
      'applyTranslations should use innerHTML when HTML is detected');
  });

  test('applyTranslations still uses textContent for plain text translations', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that textContent is still used in else branches
    const applyTranslationsMatch = jsContent.match(/applyTranslations\(\)\s*\{[\s\S]*?\n    \}/);
    assert.ok(applyTranslationsMatch, 'applyTranslations method should exist');
    
    const methodBody = applyTranslationsMatch[0];
    assert.ok(methodBody.includes('textContent'), 
      'applyTranslations should still use textContent for non-HTML translations');
  });

  test('intro step 2 methods contain HTML strong tags in all languages', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for <strong> tags in intro.step2.method translations
    const method1Matches = jsContent.match(/'intro\.step2\.method1':\s*'([^']*)'/g);
    assert.ok(method1Matches && method1Matches.length > 0, 
      'intro.step2.method1 translations should exist');
    
    // At least some should contain <strong> tags
    const hasStrongTag = method1Matches.some(match => match.includes('<strong>'));
    assert.ok(hasStrongTag, 
      'intro.step2.method1 should contain <strong> tags in at least one language');
  });

  test('intro step 3 PC and mobile warnings contain HTML strong tags', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for <strong> tags in intro.step3.pc
    const pcMatches = jsContent.match(/'intro\.step3\.pc':\s*'([^']*)'/g);
    assert.ok(pcMatches && pcMatches.length > 0, 
      'intro.step3.pc translations should exist');
    
    const pcHasStrong = pcMatches.some(match => match.includes('<strong>'));
    assert.ok(pcHasStrong, 
      'intro.step3.pc should contain <strong> tags');

    // Check for <strong> tags in intro.step3.mobile
    const mobileMatches = jsContent.match(/'intro\.step3\.mobile':\s*'([^']*)'/g);
    assert.ok(mobileMatches && mobileMatches.length > 0, 
      'intro.step3.mobile translations should exist');
    
    const mobileHasStrong = mobileMatches.some(match => match.includes('<strong>'));
    assert.ok(mobileHasStrong, 
      'intro.step3.mobile should contain <strong> tags');
  });

  test('containsHTML regex pattern matches common HTML tags', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Extract the containsHTML method
    const containsHTMLMatch = jsContent.match(/containsHTML\([^)]*\)\s*\{[\s\S]*?return[\s\S]*?;[\s\S]*?\}/);
    assert.ok(containsHTMLMatch, 'containsHTML method should exist');

    // Check that it uses a regex that can match HTML tags
    const methodBody = containsHTMLMatch[0];
    assert.ok(methodBody.includes('test('), 
      'containsHTML should use regex test method');
    assert.ok(methodBody.includes('/<') || methodBody.match(/\/.*<.*\//), 
      'containsHTML regex should check for opening tags');
  });

  test('HTML rendering preserves strong tags in German translation', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Specifically check for the German "Druckmodus" translation
    assert.ok(jsContent.includes('<strong>Druckmodus:</strong>'), 
      'German translation should contain <strong>Druckmodus:</strong>');
    
    // Verify it's in the context of intro.step2.method1
    const germanDruckMatch = jsContent.match(/'intro\.step2\.method1':\s*'<strong>Druckmodus:<\/strong>[^']*'/);
    assert.ok(germanDruckMatch, 
      'German intro.step2.method1 should have <strong>Druckmodus:</strong> tag');
  });

  test('applyTranslations handles elements with children and HTML content', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that the logic handles elements with children
    const childrenCheckMatch = jsContent.match(/element\.children\.length\s*>\s*0[\s\S]{0,500}containsHTML/);
    assert.ok(childrenCheckMatch, 
      'applyTranslations should check for HTML in elements with children');
  });

  test('applyTranslations handles simple elements with HTML content', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for the else block that handles simple elements
    const simpleElementsMatch = jsContent.match(/\/\/\s*For simple elements[\s\S]{0,300}containsHTML/);
    assert.ok(simpleElementsMatch, 
      'applyTranslations should check for HTML in simple elements');
  });

  test('HTML rendering does not break existing button translations with icons', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Ensure the textNodes logic is still present for buttons with icons
    assert.ok(jsContent.match(/textNodes\s*=\s*Array\.from\(element\.childNodes\)/), 
      'applyTranslations should still handle text nodes for buttons with icons');
  });

  test('HTML elements in index.html are ready for HTML rendering', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that intro modal list items have data-i18n attributes
    const listItemsMatch = htmlContent.match(/<li\s+data-i18n="intro\.step2\.method[123]"/g);
    assert.ok(listItemsMatch && listItemsMatch.length === 3, 
      'Intro modal should have 3 list items with data-i18n attributes for methods');

    // Check that step 3 paragraphs have data-i18n attributes
    assert.ok(htmlContent.includes('data-i18n="intro.step3.pc"'), 
      'Intro modal should have PC screenshots paragraph with data-i18n');
    assert.ok(htmlContent.includes('data-i18n="intro.step3.mobile"'), 
      'Intro modal should have mobile screenshots paragraph with data-i18n');
  });
});
