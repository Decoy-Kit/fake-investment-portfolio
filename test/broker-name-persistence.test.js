import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'fs';
import { join } from 'path';

const appJs = readFileSync(join(process.cwd(), 'app.js'), 'utf-8');
const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');

describe('Broker Name Persistence Tests', () => {
    it('broker name element does not have data-i18n attribute', () => {
        // The broker name element should NOT have data-i18n to prevent translation overwrites
        const brokerNameSpan = indexHtml.match(/<span\s+id="broker-name-text"[^>]*>/);
        assert(brokerNameSpan, 'broker-name-text element should exist');
        
        const hasDataI18n = brokerNameSpan[0].includes('data-i18n');
        assert.strictEqual(hasDataI18n, false, 
            'broker-name-text element should NOT have data-i18n attribute to prevent translation overwrites');
    });

    it('initializeBrokerName method sets custom name from localStorage', () => {
        assert(appJs.includes('initializeBrokerName()'), 
            'initializeBrokerName method should exist');
        
        assert(appJs.includes('localStorage.getItem(`fake-portfolio-broker-name-${this.currentTheme}`)'), 
            'initializeBrokerName should read from theme-specific localStorage key');
        
        // Check that broker name text is set
        const hasBrokerNameSet = appJs.includes('brokerNameText.textContent = customName') ||
                                 appJs.includes('brokerNameText.textContent = this.themes');
        assert(hasBrokerNameSet, 
            'initializeBrokerName should set broker name text content');
    });

    it('initializeBrokerName is called during theme initialization', () => {
        const initThemeMethod = appJs.match(/initializeTheme\(\)\s*\{[\s\S]*?(?=\n\s{4}\/\/\s|\n\s{0,4}\})/);
        assert(initThemeMethod, 'initializeTheme method should exist');
        
        assert(initThemeMethod[0].includes('this.initializeBrokerName()'), 
            'initializeTheme should call initializeBrokerName');
    });

    it('broker name editor saves custom names to localStorage', () => {
        assert(appJs.includes('showBrokerNameEditor()'), 
            'showBrokerNameEditor method should exist');
        
        assert(appJs.includes('localStorage.setItem(`fake-portfolio-broker-name-${this.currentTheme}`'), 
            'showBrokerNameEditor should save to theme-specific localStorage key');
    });

    it('broker name is restored after i18n translations are applied', () => {
        // During theme initialization, broker name should be set after translations
        const initThemeMethod = appJs.match(/initializeTheme\(\)\s*\{[\s\S]*?(?=\n\s{4}\/\/\s|\n\s{0,4}\})/);
        assert(initThemeMethod, 'initializeTheme method should exist');
        
        const methodBody = initThemeMethod[0];
        const translationsPos = methodBody.indexOf('i18n.applyTranslations()');
        const brokerNamePos = methodBody.indexOf('this.initializeBrokerName()');
        
        // Both should exist
        assert(translationsPos !== -1, 'initializeTheme should call i18n.applyTranslations()');
        assert(brokerNamePos !== -1, 'initializeTheme should call initializeBrokerName()');
        
        // Broker name initialization should come after translations
        assert(brokerNamePos > translationsPos, 
            'initializeBrokerName should be called AFTER i18n.applyTranslations() to ensure broker name is not overwritten');
    });

    it('reset portfolio can optionally reset broker name', () => {
        // The reset modal should have option to reset broker name and theme
        const hasResetBrokerCheckbox = indexHtml.includes('reset-broker-theme-checkbox');
        assert(hasResetBrokerCheckbox, 
            'Reset modal should have option to reset broker name and theme');
        
        // Check that the reset handler deals with broker name storage
        assert(appJs.includes('fake-portfolio-broker-name-') && appJs.includes('localStorage.removeItem'), 
            'Reset handler should be able to remove broker name from localStorage');
    });

    it('each theme has its own broker name in localStorage', () => {
        // Verify that different themes use different localStorage keys
        assert(appJs.includes('fake-portfolio-broker-name-${this.currentTheme}'), 
            'Broker name should be stored per theme using template literal with currentTheme');
    });

    it('broker name defaults to theme broker name when no custom name exists', () => {
        assert(appJs.includes('this.themes[this.currentTheme].brokerName'), 
            'initializeBrokerName should use theme default broker name as fallback');
    });

    it('edit broker name button exists in HTML', () => {
        assert(indexHtml.includes('id="edit-broker-name"'), 
            'Edit broker name button should exist in HTML');
    });

    it('broker name is editable through UI', () => {
        assert(appJs.includes("document.getElementById('edit-broker-name').addEventListener"), 
            'Edit broker name button should have click event listener');
    });
});
