import { test, expect } from '@playwright/test';
test.use({ channel: 'chrome' });

// Automates: features/add_to_cart.feature – Scenario 1 (TC-ECOM-002)
const PRODUCT_URL = 'https://validate.womentechquest.com/p/goldencrust-4-slice-toaster';
const NAME = 'GoldenCrust 4-Slice Toaster';
const PRICE = 'PKR 20,100';

test.describe('Feature: Add an available single product to the shopping cart @TC-ECOM-002', () => {
  test('Scenario: Add one unit of an available product to the cart', async ({ page }) => {
    await test.step(`Given I am on the product page of "${NAME}"`, async () => {
      await page.goto(PRODUCT_URL);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(NAME);
    });

    await test.step('And the product shows "In Stock"', async () => {
      await expect(page.getByText(/In Stock/).first()).toBeVisible();
    });

    await test.step(`When I note the product name and the sale price "${PRICE}"`, async () => {
      await expect(page.getByText(PRICE).first()).toBeVisible();
    });

    await test.step('And I click "Add to Cart"', async () => {
      await page.getByRole('button', { name: /Add to Cart/i }).first().click();
      await page.waitForTimeout(2000);
    });

    await test.step('And I open the cart', async () => {
      await page.goto('https://validate.womentechquest.com/cart');
      await page.waitForTimeout(2000);
    });

    await test.step(`Then the cart shows "${NAME}" with unit price and subtotal "${PRICE}"`, async () => {
      await expect(page.getByText(NAME).first()).toBeVisible({ timeout: 15000 });
      await expect(page.getByText(PRICE).first()).toBeVisible();
    });
  });
});