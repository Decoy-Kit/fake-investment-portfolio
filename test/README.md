# Testing Documentation

This project includes comprehensive e2e tests to safeguard the currency conversion functionality.

## Test Structure

### Basic Validation Tests (`test/basic.test.js`)
- Validates file structure and required components
- Checks for data-test selectors in HTML
- Verifies currency conversion functions exist in JavaScript
- Tests for proper currency rate definitions
- Validates balance editor and asset price conversion logic

### E2E Tests (`test/e2e.test.js`)
- **Currency Selector**: Tests that changing currency updates all displays
- **Balance Editor**: Verifies that edit values match display values
- **Currency Conversion**: Tests consistency across USD, EUR, GBP
- **Asset Form**: Validates currency labels update correctly
- **Browser Automation**: Uses Chrome DevTools Protocol for headless testing

## Running Tests

```bash
# Run all tests
npm test

# Run only basic validation (no browser required)
npm run test:basic

# Run only e2e tests (requires Chrome/Chromium)
npm run test:e2e

# Run with verbose output
npm run test:verbose
```

## Test Selectors

The following data-test selectors are added to critical elements:

| Selector | Element | Purpose |
|----------|---------|---------|
| `currency-selector` | Currency dropdown | Test currency switching |
| `balance-value` | Balance display | Test balance conversion |
| `edit-balance-btn` | Edit balance button | Test balance editing |
| `asset-price-label` | Price label | Test label currency updates |
| `open-add-asset-modal` | Add Asset button | Test modal opening |
| `asset-symbol` | Symbol input | Test asset creation |
| `asset-name` | Name input | Test asset creation |
| `asset-quantity` | Quantity input | Test asset creation |
| `asset-price` | Price input | Test price conversion |
| `add-asset-btn` | Submit button | Test asset creation |
| `holdings-list` | Holdings container | Test asset display |

## CI/CD Integration

The GitHub Actions workflow runs tests before deployment:

1. **Test Job**: Runs all tests (basic + e2e)
2. **Deploy Job**: Only runs if tests pass
3. **Chrome Installation**: E2E tests require Chrome/Chromium
4. **Fail-Safe**: Deployment blocked if any test fails

## Test Coverage

The tests cover the critical currency conversion issues that were fixed:

- ✅ Balance editor shows converted values (not raw USD)
- ✅ Currency switching updates all UI elements
- ✅ Asset prices convert from display currency to USD
- ✅ Form labels update with correct currency symbols
- ✅ Conversion consistency across currencies

## Browser Requirements

E2E tests require Chrome or Chromium. The tests gracefully skip if no browser is available but still run basic validation tests.

## Dependencies

- **Node.js 20+**: Required for native test runner and built-in WebSocket support
- **Chrome/Chromium**: Required for e2e tests in CI/CD

**No external dependencies required** - uses only Node.js built-in modules and Chrome DevTools Protocol.