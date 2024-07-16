const { test, describe, expect } = require('@playwright/test')

describe('Music App', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('');
  });
})