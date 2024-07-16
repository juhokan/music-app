const { test, describe, expect } = require('@playwright/test')

describe('Music App', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('music review app')).toBeVisible()
  })
})