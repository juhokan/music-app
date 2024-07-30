import { test, expect } from '@playwright/test'

test.describe('Music app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.locator('text=Music App')).toBeVisible()
  })
})
