import { expect, test } from '@playwright/test'

test.describe('Home page', () => {
  test('should render the page with a heading', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Hello, World!' })).toBeVisible()
  })
})
