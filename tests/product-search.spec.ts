import { test, expect, Page } from '@playwright/test';
test.use({ channel: 'chrome' });

/*
 * Automates: features/product_search.feature
 * Source (CSV): TC-ECOM-001 – Search for a product and verify product details
 * Priority: High · Automation Type: UI / Functional
 *
 * CSV step                                         → Gherkin / automation step
 * 1. Open the website                              → Given I am on the ElectraStore home page
 * 2. Enter a product name in the search box        → When I search for "<term>"
 * 3. Submit the search                             → (Enter key; search button as fallback)
 * 4. Verify relevant products appear               → Then the search results should include "<product>"
 * 5. Open a product                                → When I open the product "<product>"
 * 6. Check name, price, availability, description  → Then the product page shows name, price, availability and description
 */

const BASE_URL = 'https://validate.womentechquest.com/';

// CSV steps 2 + 3
async function searchFor(page: Page, term: string) {
  await test.step(`When I search for "${term}"`, async () => {
    const box = page.getByRole('combobox', { name: 'Search for home appliances and electronics' });
    await box.fill(term);
    await box.press('Enter');
    await page.waitForTimeout(2000);
    // If Enter did not submit, click the search button next to the box
    if (page.url() === BASE_URL) {
      await page.locator('button.bg-primary-container:visible').first().click();
      await page.waitForTimeout(2000);
    }
  });
}

// CSV step 4
async function resultsInclude(page: Page, name: string) {
  await test.step(`Then the search results should include "${name}"`, async () => {
    await expect(page.getByText(name).first()).toBeVisible({ timeout: 15000 });
  });
}

// CSV step 5
async function openProduct(page: Page, name: string, urlPart: RegExp) {
  await test.step(`When I open the product "${name}"`, async () => {
    await page.getByText(name).first().click();
    await page.waitForURL(urlPart, { timeout: 15000 });
  });
}

// CSV step 6
async function verifyProductDetails(page: Page, name: string, price: string, availability: RegExp, description: RegExp) {
  await test.step('Then the product page shows name, price, availability and description', async () => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(name);
    await expect(page.getByText(price).first()).toBeVisible();
    await expect(page.getByText(availability).first()).toBeVisible();
    await expect(page.getByText(description).first()).toBeVisible();
  });
}

test.describe('Feature: Search for a product and verify product details @TC-ECOM-001', () => {
  // CSV step 1 (Background)
  test.beforeEach(async ({ page }) => {
    await test.step('Given I am on the ElectraStore home page', async () => {
      await page.goto(BASE_URL);
      await expect(page).toHaveTitle(/ElectraStore/);
    });
  });

  test('Scenario: Search for toaster and verify product details @smoke', async ({ page }) => {
    await searchFor(page, 'toaster');
    await resultsInclude(page, 'GoldenCrust 4-Slice Toaster');
    await openProduct(page, 'GoldenCrust 4-Slice Toaster', /goldencrust-4-slice-toaster/);
    await verifyProductDetails(page, 'GoldenCrust 4-Slice Toaster', 'PKR 20,100', /In Stock/, /Four-slice toaster/);
  });

  test('Scenario: Search for microwave and verify product details', async ({ page }) => {
    await searchFor(page, 'microwave');
    await resultsInclude(page, 'GrandChef 42L Convection Microwave Oven');
    await openProduct(page, 'GrandChef 42L Convection Microwave Oven', /grandchef-42l-convection-microwave-oven/);
    await verifyProductDetails(page, 'GrandChef 42L Convection Microwave Oven', 'PKR 100,000', /In Stock/, /42 litre convection microwave/);
  });

  test('Scenario: Search is not case sensitive', async ({ page }) => {
    await searchFor(page, 'TOASTER');
    await resultsInclude(page, 'GoldenCrust 4-Slice Toaster');
  });

  test('Scenario: Search with a partial product name', async ({ page }) => {
    await searchFor(page, 'golden');
    await resultsInclude(page, 'GoldenCrust 4-Slice Toaster');
  });
});