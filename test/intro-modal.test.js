/**
 * Intro Modal Tests
 * Tests the first-visit introduction modal functionality
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

describe('Intro Modal - HTML Structure', () => {
  test('intro modal container exists', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('id="intro-modal"'), 
      'HTML should contain intro-modal element');
    assert.ok(htmlContent.includes('class="modal intro-modal"'), 
      'intro-modal should have both modal and intro-modal classes');
  });

  test('intro modal has proper header structure', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('data-i18n="intro.welcome"'), 
      'Modal should have welcome heading with i18n');
    assert.ok(htmlContent.includes('class="close-modal"'), 
      'Modal should have close button');
  });

  test('intro modal has all 4 steps', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('data-step="1"'), 
      'Modal should have step 1');
    assert.ok(htmlContent.includes('data-step="2"'), 
      'Modal should have step 2');
    assert.ok(htmlContent.includes('data-step="3"'), 
      'Modal should have step 3');
    assert.ok(htmlContent.includes('data-step="4"'), 
      'Modal should have step 4');
  });

  test('intro modal has step indicators', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('class="intro-step-indicators"'), 
      'Modal should have step indicators container');
    assert.ok(htmlContent.includes('data-step-indicator="1"'), 
      'Modal should have indicator for step 1');
    assert.ok(htmlContent.includes('data-step-indicator="2"'), 
      'Modal should have indicator for step 2');
    assert.ok(htmlContent.includes('data-step-indicator="3"'), 
      'Modal should have indicator for step 3');
    assert.ok(htmlContent.includes('data-step-indicator="4"'), 
      'Modal should have indicator for step 4');
  });

  test('intro modal has navigation buttons', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('id="intro-skip-btn"'), 
      'Modal should have skip button');
    assert.ok(htmlContent.includes('id="intro-prev-btn"'), 
      'Modal should have previous button');
    assert.ok(htmlContent.includes('id="intro-next-btn"'), 
      'Modal should have next button');
    assert.ok(htmlContent.includes('id="intro-finish-btn"'), 
      'Modal should have finish button');
  });

  test('intro modal has "don\'t show again" checkbox', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('id="dont-show-intro-again"'), 
      'Modal should have "don\'t show again" checkbox');
    assert.ok(htmlContent.includes('type="checkbox"'), 
      'Don\'t show again should be a checkbox');
  });

  test('step 1 has security icon and content', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('fa-shield-alt'), 
      'Step 1 should have shield icon');
    assert.ok(htmlContent.includes('data-i18n="intro.step1.title"'), 
      'Step 1 should have title i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step1.content"'), 
      'Step 1 should have content i18n key');
  });

  test('step 2 has lock icon and safe methods list', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('fa-lock'), 
      'Step 2 should have lock icon');
    assert.ok(htmlContent.includes('data-i18n="intro.step2.method1"'), 
      'Step 2 should have method1 i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step2.method2"'), 
      'Step 2 should have method2 i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step2.method3"'), 
      'Step 2 should have method3 i18n key');
  });

  test('step 3 has warning icon and URL warning', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('fa-exclamation-triangle'), 
      'Step 3 should have warning icon');
    assert.ok(htmlContent.includes('intro-warning-box'), 
      'Step 3 should have warning box');
    assert.ok(htmlContent.includes('data-i18n="intro.step3.pc"'), 
      'Step 3 should have PC screenshots info');
    assert.ok(htmlContent.includes('data-i18n="intro.step3.mobile"'), 
      'Step 3 should have mobile screenshots warning');
    assert.ok(htmlContent.includes('data-i18n="intro.step3.warning"'), 
      'Step 3 should have critical warning');
  });

  test('step 4 has tools icon and features list', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    assert.ok(htmlContent.includes('fa-tools'), 
      'Step 4 should have tools icon');
    assert.ok(htmlContent.includes('data-i18n="intro.step4.feature1"'), 
      'Step 4 should have feature1 i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step4.feature2"'), 
      'Step 4 should have feature2 i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step4.feature3"'), 
      'Step 4 should have feature3 i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step4.feature4"'), 
      'Step 4 should have feature4 i18n key');
    assert.ok(htmlContent.includes('data-i18n="intro.step4.feature5"'), 
      'Step 4 should have feature5 i18n key');
  });
});

describe('Intro Modal - Translations', () => {
  test('intro modal translations exist for all steps', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    const requiredKeys = [
      'intro.welcome',
      'intro.step1.title',
      'intro.step1.content',
      'intro.step2.title',
      'intro.step2.content',
      'intro.step2.method1',
      'intro.step2.method2',
      'intro.step2.method3',
      'intro.step3.title',
      'intro.step3.pc',
      'intro.step3.mobile',
      'intro.step3.warning',
      'intro.step4.title',
      'intro.step4.content',
      'intro.step4.feature1',
      'intro.step4.feature2',
      'intro.step4.feature3',
      'intro.step4.feature4',
      'intro.step4.feature5',
      'intro.dontShowAgain',
      'intro.next',
      'intro.previous',
      'intro.finish',
      'intro.skip'
    ];

    for (const key of requiredKeys) {
      assert.ok(jsContent.includes(`'${key}':`), 
        `Translation key '${key}' should exist`);
    }
  });

  test('intro translations exist in all supported languages', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    const languages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl'];
    
    for (const lang of languages) {
      // Find the language section
      const langSectionRegex = new RegExp(`${lang}:\\s*\\{[\\s\\S]*?'intro\\.welcome':`);
      assert.ok(langSectionRegex.test(jsContent), 
        `Language '${lang}' should have intro.welcome translation`);
    }
  });

  test('step 3 emphasizes URL bar warning in all languages', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that step 3 mobile warning includes strong emphasis
    assert.ok(jsContent.includes('MUST ALWAYS') || jsContent.includes('<strong>MUST ALWAYS</strong>'), 
      'Step 3 mobile warning should emphasize MUST ALWAYS');
  });

  test('translations mention key security concepts', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for key security concepts in English translations
    assert.ok(jsContent.includes('scammers') || jsContent.includes('scammer'), 
      'Translations should mention scammers');
    assert.ok(jsContent.includes('URL') && jsContent.includes('bar'), 
      'Translations should mention URL bar');
    assert.ok(jsContent.includes('screenshot') || jsContent.includes('Screenshot'), 
      'Translations should mention screenshots');
  });
});

describe('Intro Modal - JavaScript Logic', () => {
  test('IntroModalManager class exists', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('class IntroModalManager'), 
      'app.js should contain IntroModalManager class');
  });

  test('IntroModalManager has required properties', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('this.currentStep'), 
      'IntroModalManager should have currentStep property');
    assert.ok(jsContent.includes('this.totalSteps'), 
      'IntroModalManager should have totalSteps property');
    assert.ok(jsContent.includes('this.storageKey'), 
      'IntroModalManager should have storageKey property');
  });

  test('IntroModalManager has required methods', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    const requiredMethods = [
      'initializeElements',
      'attachEventListeners',
      'shouldShow',
      'show',
      'closeModal',
      'goToStep',
      'nextStep',
      'previousStep',
      'updateStepDisplay',
      'updateButtons'
    ];

    for (const method of requiredMethods) {
      assert.ok(jsContent.includes(`${method}(`), 
        `IntroModalManager should have ${method} method`);
    }
  });

  test('IntroModalManager uses localStorage for first-visit detection', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('fake-portfolio-intro-shown'), 
      'IntroModalManager should use fake-portfolio-intro-shown key');
    assert.ok(jsContent.includes('localStorage.getItem'), 
      'IntroModalManager should use localStorage.getItem');
    assert.ok(jsContent.includes('localStorage.setItem'), 
      'IntroModalManager should use localStorage.setItem');
  });

  test('IntroModalManager is instantiated on DOMContentLoaded', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('introModal') || jsContent.includes('IntroModalManager'), 
      'IntroModalManager instance should be created');
    assert.ok(jsContent.includes('new IntroModalManager'), 
      'IntroModalManager should be instantiated with new');
  });

  test('IntroModalManager checks shouldShow before displaying', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('shouldShow()'), 
      'IntroModalManager should call shouldShow method');
  });

  test('IntroModalManager has total of 4 steps', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that totalSteps is set to 4
    const totalStepsMatch = jsContent.match(/this\.totalSteps\s*=\s*(\d+)/);
    assert.ok(totalStepsMatch, 'totalSteps should be defined');
    assert.strictEqual(totalStepsMatch[1], '4', 
      'totalSteps should be 4');
  });

  test('IntroModalManager attaches event listeners to buttons', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for event listeners on navigation buttons
    assert.ok(jsContent.includes('prevBtn') && jsContent.includes('addEventListener'), 
      'Should attach event listener to prevBtn');
    assert.ok(jsContent.includes('nextBtn') && jsContent.includes('addEventListener'), 
      'Should attach event listener to nextBtn');
    assert.ok(jsContent.includes('finishBtn') && jsContent.includes('addEventListener'), 
      'Should attach event listener to finishBtn');
    assert.ok(jsContent.includes('skipBtn') && jsContent.includes('addEventListener'), 
      'Should attach event listener to skipBtn');
  });

  test('IntroModalManager handles step dot navigation', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('stepDots'), 
      'Should reference stepDots');
    assert.ok(jsContent.includes('goToStep'), 
      'Should have goToStep method for dot navigation');
  });

  test('IntroModalManager handles close on outside click', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for modal outside click handling
    const modalClickMatch = jsContent.match(/modal\.addEventListener\(['"]click['"]/);
    assert.ok(modalClickMatch, 
      'Should attach click event listener to modal');
  });

  test('IntroModalManager saves "don\'t show again" preference', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('dontShowCheckbox'), 
      'Should reference dontShowCheckbox');
    assert.ok(jsContent.match(/if\s*\([^)]*dontShowCheckbox[^)]*checked/), 
      'Should check if dontShowCheckbox is checked');
  });

  test('IntroModalManager applies translations on show', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that show method calls applyTranslations
    const showMethodMatch = jsContent.match(/show\(\)\s*\{[\s\S]*?applyTranslations/);
    assert.ok(showMethodMatch, 
      'show method should call applyTranslations');
  });

  test('IntroModalManager shows modal with delay', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check for setTimeout before showing modal
    assert.ok(jsContent.includes('setTimeout'), 
      'Should use setTimeout for delayed show');
  });

  test('IntroModalManager updates button visibility based on current step', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check updateButtons method logic
    const updateButtonsMatch = jsContent.match(/updateButtons\(\)\s*\{[\s\S]*?style\.display/);
    assert.ok(updateButtonsMatch, 
      'updateButtons should modify button display styles');
  });
});

describe('Intro Modal - CSS Styling', () => {
  test('intro modal CSS classes exist', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.intro-modal'), 
      'CSS should have .intro-modal class');
    assert.ok(cssContent.includes('.intro-modal-content'), 
      'CSS should have .intro-modal-content class');
    assert.ok(cssContent.includes('.intro-modal-body'), 
      'CSS should have .intro-modal-body class');
    assert.ok(cssContent.includes('.intro-modal-footer'), 
      'CSS should have .intro-modal-footer class');
  });

  test('intro step styling exists', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.intro-step'), 
      'CSS should have .intro-step class');
    assert.ok(cssContent.includes('.intro-step.active'), 
      'CSS should have .intro-step.active class');
    assert.ok(cssContent.includes('.intro-step-icon'), 
      'CSS should have .intro-step-icon class');
  });

  test('intro step indicators styling exists', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.intro-step-indicators'), 
      'CSS should have .intro-step-indicators class');
    assert.ok(cssContent.includes('.step-dot'), 
      'CSS should have .step-dot class');
    assert.ok(cssContent.includes('.step-dot.active'), 
      'CSS should have .step-dot.active class');
  });

  test('intro warning box styling exists', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.intro-warning-box'), 
      'CSS should have .intro-warning-box class');
    assert.ok(cssContent.includes('.intro-critical-warning'), 
      'CSS should have .intro-critical-warning class');
  });

  test('intro modal has fade-in animation', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('@keyframes fadeIn') || cssContent.includes('animation'), 
      'CSS should include fadeIn animation');
  });

  test('intro modal has responsive design', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Check for media query for responsive design
    assert.ok(cssContent.match(/@media.*max-width.*768px/), 
      'CSS should have media query for 768px breakpoint');
  });

  test('intro buttons styling exists', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.intro-buttons'), 
      'CSS should have .intro-buttons class');
    assert.ok(cssContent.includes('.intro-checkbox'), 
      'CSS should have .intro-checkbox class');
  });

  test('intro list styling exists', () => {
    const cssPath = path.join(projectRoot, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    assert.ok(cssContent.includes('.intro-list'), 
      'CSS should have .intro-list class');
  });
});

describe('Intro Modal - Integration', () => {
  test('intro modal is positioned after other modals in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check that intro modal comes after import modal
    const importModalIndex = htmlContent.indexOf('id="import-confirmation-modal"');
    const introModalIndex = htmlContent.indexOf('id="intro-modal"');
    
    assert.ok(importModalIndex > 0 && introModalIndex > 0, 
      'Both import and intro modals should exist');
    assert.ok(introModalIndex > importModalIndex, 
      'Intro modal should come after import modal in HTML');
  });

  test('intro modal is positioned before screenshot controls in HTML', () => {
    const htmlPath = path.join(projectRoot, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    const introModalIndex = htmlContent.indexOf('id="intro-modal"');
    const screenshotControlsIndex = htmlContent.indexOf('id="screenshot-controls"');
    
    assert.ok(introModalIndex > 0 && screenshotControlsIndex > 0, 
      'Both intro modal and screenshot controls should exist');
    assert.ok(introModalIndex < screenshotControlsIndex, 
      'Intro modal should come before screenshot controls in HTML');
  });

  test('IntroModalManager variable is declared globally', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    assert.ok(jsContent.includes('let introModal') || jsContent.includes('var introModal'), 
      'introModal variable should be declared');
  });

  test('intro modal translations do not conflict with existing translations', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Verify that intro translations are added after screenshot translations
    const screenshotCopyIndex = jsContent.indexOf("'screenshot.copy':");
    const introWelcomeIndex = jsContent.indexOf("'intro.welcome':");
    
    assert.ok(screenshotCopyIndex > 0 && introWelcomeIndex > 0, 
      'Both screenshot and intro translations should exist');
    assert.ok(introWelcomeIndex > screenshotCopyIndex, 
      'Intro translations should come after screenshot translations');
  });
});

describe('Intro Modal - Edge Cases', () => {
  test('modal handles step boundaries correctly', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check goToStep method has boundary checks
    const goToStepMatch = jsContent.match(/goToStep\([^)]*\)\s*\{[\s\S]*?if\s*\([^)]*<\s*1/);
    assert.ok(goToStepMatch, 
      'goToStep should check for step < 1');
  });

  test('modal properly handles modal close on all triggers', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check that close buttons trigger closeModal
    assert.ok(jsContent.match(/closeButtons[^}]*addEventListener[^}]*closeModal/), 
      'Close buttons should trigger closeModal method');
  });

  test('modal only shows when localStorage key is not set', () => {
    const jsPath = path.join(projectRoot, 'app.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    // Check shouldShow logic
    const shouldShowMatch = jsContent.match(/shouldShow\(\)[^}]*\{[\s\S]*?localStorage\.getItem/);
    assert.ok(shouldShowMatch, 
      'shouldShow should check localStorage');
  });
});
