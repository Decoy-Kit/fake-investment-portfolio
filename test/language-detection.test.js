/**
 * Language Detection Tests
 * Tests browser language detection and translation system
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Language Detection Tests', () => {
  test('translations object exists in app.js', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('const translations = {'), 
      'app.js should contain translations object');
  });

  test('supported European languages are defined in translations', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Required major European languages (excluding Russian)
    const requiredLanguages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl'];
    
    for (const lang of requiredLanguages) {
      assert.ok(jsContent.includes(`${lang}: {`), 
        `Translations should include ${lang} language`);
    }
  });

  test('Russian language is NOT included in translations', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Russian should not be included per requirements
    assert.ok(!jsContent.includes('ru: {') && !jsContent.includes('rus: {'), 
      'Translations should NOT include Russian language');
  });

  test('I18n class exists with detectLanguage method', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('class I18n'), 
      'app.js should contain I18n class');
    assert.ok(jsContent.includes('detectLanguage()'), 
      'I18n class should have detectLanguage method');
  });

  test('I18n uses navigator.language for detection', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('navigator.language') || jsContent.includes('navigator.userLanguage'), 
      'I18n should use navigator.language or navigator.userLanguage for browser language detection');
  });

  test('I18n instance is created and initialized', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('const i18n = new I18n()') || jsContent.includes('i18n = new I18n()'), 
      'I18n instance should be created');
    assert.ok(jsContent.includes('i18n.applyTranslations()'), 
      'i18n.applyTranslations() should be called');
  });

  test('translations are applied on DOMContentLoaded', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that applyTranslations is called in DOMContentLoaded listener
    const domContentLoadedSection = jsContent.match(/document\.addEventListener\('DOMContentLoaded'[^}]+\}/s);
    assert.ok(domContentLoadedSection, 'DOMContentLoaded listener should exist');
    assert.ok(domContentLoadedSection[0].includes('applyTranslations'), 
      'applyTranslations should be called in DOMContentLoaded');
  });

  test('HTML elements have data-i18n attributes', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check for data-i18n attributes on key elements
    // Note: app.title (broker name) is intentionally NOT translated to allow custom broker names
    const requiredI18nKeys = [
      'data-i18n="nav.portfolio"',
      'data-i18n="nav.transactions"',
      'data-i18n="nav.analytics"',
      'data-i18n="portfolio.totalValue"',
      'data-i18n="portfolio.holdings"',
      'data-i18n="menu.currency"',
    ];

    for (const i18nKey of requiredI18nKeys) {
      assert.ok(htmlContent.includes(i18nKey), 
        `HTML should contain ${i18nKey}`);
    }
  });

  test('translation keys exist for all major UI elements', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for key translation groups
    const requiredTranslationGroups = [
      'app.title',
      'nav.portfolio',
      'portfolio.totalValue',
      'transactions.title',
      'analytics.performance',
      'modal.addAsset.title',
      'modal.addTransaction.title',
      'modal.reset.title',
      'modal.import.title',
      'menu.currency'
    ];

    for (const key of requiredTranslationGroups) {
      assert.ok(jsContent.includes(`'${key}':`), 
        `Translation key '${key}' should exist in translations`);
    }
  });

  test('I18n class has t() method for translation lookup', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('t(key)'), 
      'I18n class should have t(key) method for translation lookup');
  });

  test('HTML lang attribute is updated by translations', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('document.documentElement.lang'), 
      'applyTranslations should update document.documentElement.lang');
  });

  test('supportedLanguages array excludes Russian', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Find the supportedLanguages array
    const supportedLangsMatch = jsContent.match(/supportedLanguages\s*=\s*\[(.*?)\]/s);
    assert.ok(supportedLangsMatch, 'supportedLanguages array should exist');
    
    const supportedLangs = supportedLangsMatch[0];
    assert.ok(!supportedLangs.includes("'ru'") && !supportedLangs.includes('"ru"'), 
      'supportedLanguages should NOT include Russian (ru)');
  });

  test('default language is English when browser language is unsupported', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that detectLanguage returns 'en' as default
    const detectLanguageMethod = jsContent.match(/detectLanguage\(\)\s*\{[\s\S]*?return\s+'en';/);
    assert.ok(detectLanguageMethod, 
      'detectLanguage should return "en" as default for unsupported languages');
  });
});
