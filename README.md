# storeTask-wtq26

Automated acceptance tests for the **ElectraStore** web application, developed for the
**Women Tech Quest 2026 QA Challenge – Challenge 4: AI-Assisted Automation Readiness**.

| | |
|---|---|
| **Application under test** | ElectraStore – https://validate.womentechquest.com/ |
| **Source test cases** | `ecommerce_automation_test_scenarios_detailed_1.csv` (4 test cases: TC-ECOM-001 to 004) |
| **Primary feature automated** | TC-ECOM-001 – Search for a product and verify product details |
| **Additional feature automated** | TC-ECOM-002 – Add an available single product to the cart (Scenario 1) |
| **Framework** | Playwright Test (TypeScript) with Gherkin (BDD) specifications |
| **Status** | 5 automated scenarios · 5 passing |
| **Author** | Arisha |

---

## Table of Contents

1. [Overview](#overview)
2. [Repository Structure](#repository-structure)
3. [Test Case Coverage](#test-case-coverage)
4. [User Story and Acceptance Criteria](#user-story-and-acceptance-criteria)
5. [Automated Scenarios](#automated-scenarios)
6. [Traceability Matrix](#traceability-matrix)
7. [Assumptions](#assumptions)
8. [Ambiguities in the Original Test Case](#ambiguities-in-the-original-test-case)
9. [Design Decisions](#design-decisions)
10. [Prerequisites](#prerequisites)
11. [Installation and Execution](#installation-and-execution)
12. [Limitations and Future Work](#limitations-and-future-work)

---

## Overview

The four original test cases were provided as short CSV entries. Each was expanded into a detailed
test case (preconditions, test data, steps, expected results), with assumptions, ambiguities and a
user story documented in `docs/TEST_CASES.md`. Each test case has its own Gherkin feature file.

**TC-ECOM-001 (Search)** was selected as the primary feature and fully automated with Playwright.
As an extension, **Scenario 1 of TC-ECOM-002 (Add to Cart)** was also automated. Each Gherkin step
is implemented as a named `test.step()`, so the Playwright report reads one-to-one with the feature files.

## Repository Structure

```
storeTask-wtq26/
├── docs/
│   └── TEST_CASES.md              # Expanded test cases, assumptions, ambiguities and user stories (all 4)
├── features/
│   ├── product_search.feature     # TC-ECOM-001 – automated (4 scenarios)
│   ├── add_to_cart.feature        # TC-ECOM-002 – Scenario 1 automated
│   ├── checkout_cod.feature       # TC-ECOM-003 – specified
│   └── order_history.feature      # TC-ECOM-004 – specified
├── tests/
│   ├── product-search.spec.ts     # Playwright implementation of product_search.feature
│   └── addtocart.spec.ts          # Playwright implementation of add_to_cart.feature (Scenario 1)
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Test Case Coverage

| CSV ID | Title | Priority | Type | Feature file | Automation |
|---|---|---|---|---|---|
| TC-ECOM-001 | Search for a product and verify product details | High | UI / Functional | `product_search.feature` | **Automated – 4 scenarios, passing** |
| TC-ECOM-002 | Add an available single product to the cart | High | UI / Functional | `add_to_cart.feature` | **Scenario 1 automated, passing** |
| TC-ECOM-003 | Complete checkout using Cash on Delivery | Critical | End-to-End | `checkout_cod.feature` | Specified |
| TC-ECOM-004 | Log in, purchase a product and verify the order | Critical | End-to-End | `order_history.feature` | Specified |

TC-ECOM-003 and TC-ECOM-004 were deliberately not automated. They create real orders on a shared
assessment environment, and they need test-account and order-cleanup strategies first.

## User Story and Acceptance Criteria

### Primary feature – TC-ECOM-001 Product Search

> **As a** shopper on ElectraStore
> **I want** to search for an appliance by name and open its product page
> **So that** I can confirm its name, price, availability and description before purchasing.

| ID | Criterion |
|---|---|
| AC-1 | Searching a full or partial product name returns the matching products. |
| AC-2 | Search is not case sensitive. |
| AC-3 | Selecting a search result opens the corresponding product page. |
| AC-4 | The product page displays the correct product name, current sale price (PKR), stock status and description. |

### Additional feature – TC-ECOM-002 Add to Cart

> **As a** shopper on ElectraStore
> **I want** to add an in-stock product to my cart
> **So that** I can review it and buy it later.

| ID | Criterion |
|---|---|
| AC-1 | Clicking Add to Cart on an in-stock product adds one unit to the cart. |
| AC-2 | The cart shows the correct product name and unit price. |
| AC-3 | The cart subtotal equals unit price × quantity. |
| AC-4 | Out-of-stock products cannot be added (specified, not yet automated). |

User stories for TC-ECOM-003 and TC-ECOM-004 are in `docs/TEST_CASES.md`.

## Automated Scenarios

| # | Feature | Scenario | Test data | Covers | Result |
|---|---|---|---|---|---|
| 1 | Search | Search for toaster and verify product details | `toaster` → GoldenCrust 4-Slice Toaster, PKR 20,100, In Stock | AC-1, AC-3, AC-4 | Pass |
| 2 | Search | Search for microwave and verify product details | `microwave` → GrandChef 42L Convection Microwave Oven, PKR 100,000, In Stock | AC-1, AC-3, AC-4 | Pass |
| 3 | Search | Search is not case sensitive | `TOASTER` | AC-2 | Pass |
| 4 | Search | Search with a partial product name | `golden` | AC-1 | Pass |
| 5 | Add to Cart | Add one unit of an available product to the cart | GoldenCrust 4-Slice Toaster → cart shows name and PKR 20,100 | AC-1, AC-2, AC-3 | Pass |

## Traceability Matrix

### TC-ECOM-001 – Search

| CSV step | Gherkin step | Implementation |
|---|---|---|
| 1. Open the website | `Given I am on the ElectraStore home page` | `beforeEach` |
| 2. Enter a product name in the search box | `When I search for "<term>"` | `searchFor()` |
| 3. Submit the search | Part of `When I search for "<term>"` | `searchFor()` |
| 4. Verify relevant products appear | `Then the search results should include "<product>"` | `resultsInclude()` |
| 5. Open a product | `When I open the product "<product>"` | `openProduct()` |
| 6. Check name, price, availability and description | `Then the product page shows name, price, availability and description` | `verifyProductDetails()` |

### TC-ECOM-002 – Add to Cart

| CSV step | Gherkin step | Implementation |
|---|---|---|
| 1. Open an available product | `Given I am on the product page of "<product>"` / `And the product shows "In Stock"` | `test.step` |
| 2. Note the product name and price | `When I note the product name and the sale price "<price>"` | `test.step` |
| 3. Click Add to Cart | `And I click "Add to Cart"` | `test.step` |
| 4. Open the cart | `And I open the cart` | `test.step` |
| 5. Verify name, quantity, unit price and total | `Then the cart shows "<product>"` … subtotal | `test.step` |

## Assumptions

1. A "relevant" search result means the searched product appears in the results; ranking is not asserted.
2. "Correct price" refers to the current **sale price**, not the struck-through original price.
3. The search is submitted with the Enter key; the search button is used as a fallback.
4. No authentication is required to search, view products or build a cart (site FAQ: guests can browse and build a cart).
5. "Cart total" in TC-ECOM-002 means the cart subtotal, before any delivery fee.
6. Test data reflects the live catalogue on 10 October 2026 and must be updated if catalogue data changes.

## Ambiguities in the Original Test Case

Full lists for all four test cases are in `docs/TEST_CASES.md`. For the primary feature:

| # | Ambiguity (TC-ECOM-001) | Resolution |
|---|---|---|
| 1 | The steps check name, price, availability and description, but the expected result mentions only name and price. | All four attributes are verified. |
| 2 | No test data was specified (product, full or partial name). | Concrete products and search terms were defined. |
| 3 | "Relevant products" was not defined. | Defined as the target product being present in the results. |
| 4 | "Correct price" did not state sale or original price. | The sale price is verified. |
| 5 | No case-sensitivity or partial-match rule was stated. | Dedicated scenarios were added (Scenarios 3 and 4). |
| 6 | No browser, device or environment was specified. | Desktop Google Chrome. |

## Design Decisions

- **User-facing locators.** Elements are located by accessible role and name (for example, the search
  `combobox`, the `h1` product heading and the "Add to Cart" button) and by visible text, rather than
  generated CSS classes. This makes the suite more resilient to styling changes.
- **Gherkin-to-code mapping through `test.step()`.** Each Gherkin step is a named step in the Playwright
  report, which keeps the implementation traceable without adding a Cucumber runtime.
- **Reusable step helpers.** `searchFor`, `resultsInclude`, `openProduct` and `verifyProductDetails`
  are written to be reused by future features.
- **Safe scope.** Only read-only and cart-level flows are automated; no real orders are placed on the
  shared assessment environment.
- **Installed browser channel.** Tests run on the locally installed Google Chrome
  (`test.use({ channel: 'chrome' })`), so no additional browser download is needed.

## Prerequisites

- Node.js 18 or later
- Google Chrome (stable channel)
- Internet access to https://validate.womentechquest.com/

## Installation and Execution

```bash
# Install dependencies
npm install

# Run all automated tests (headed, single worker)
npx playwright test --headed --workers=1

# Run a single feature
npx playwright test tests/product-search.spec.ts --headed --workers=1
npx playwright test tests/addtocart.spec.ts --headed --workers=1

# Run headless
npx playwright test

# Open the HTML report
npx playwright show-report
```

To run on Playwright's bundled Chromium instead of installed Chrome, remove
`test.use({ channel: 'chrome' })` from the spec files and run `npx playwright install chromium`.

## Limitations and Future Work

- **Static test data.** Product names and prices are hard-coded; a future improvement is to read them
  from a fixture file or an API.
- **Remaining scenarios.** TC-ECOM-002 Scenarios 2–3, and the checkout and order-history features
  (TC-ECOM-003, TC-ECOM-004), are specified in Gherkin but not yet automated.
- **Negative search cases.** Empty search, no-result search and special-character input are not yet automated.
- **Fixed waits.** A short fixed wait is used as a safeguard after search and Add to Cart; this can be
  replaced with explicit waits once stable test IDs are available.
- **Known defect.** During exploratory testing, the discount badge was found to be calculated against the
  sale price instead of the original price (for example, -49% shown instead of -33%). This is outside
  the scope of these features and was reported separately.

---

*Prepared for the Women Tech Quest 2026 QA Challenge (10Pearls). ElectraStore is a fictional
retailer provided as an assessment environment.*
