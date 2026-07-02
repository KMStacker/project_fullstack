import { test, expect } from '@playwright/test'

test.describe('App Navigation', () => {
  test('should display home page welcome message', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('This is the home page!')
  })

  test('should navigate to projects page successfully', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Projects')
    await expect(page.locator('h1')).toContainText('This is the projects page!')
  })

  test('should navigate to skills page successfully', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Skills')
    await expect(page.locator('h1')).toContainText('This is the skills page!')
  })
})