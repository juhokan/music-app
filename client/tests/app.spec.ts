import { test, expect } from '@playwright/test'

test.describe('Music app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.locator('text=music review app')).toBeVisible()
  })
})
