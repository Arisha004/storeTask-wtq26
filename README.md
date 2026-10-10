# storeTask-wtq26

Automated acceptance tests for the **ElectraStore** product search feature, developed for the
**Women Tech Quest 2026 QA Challenge – Challenge 4: AI-Assisted Automation Readiness**.

| | |
|---|---|
| **Application under test** | ElectraStore – https://validate.womentechquest.com/ |
| **Test case automated** | TC-ECOM-001 – Search for a product and verify product details |
| **Priority / Type** | High · UI / Functional |
| **Framework** | Playwright Test (TypeScript) with Gherkin (BDD) specification |
| **Status** | 4 scenarios · 4 passing |
| **Author** | Arisha |

---

## Table of Contents

1. [Overview](#overview)
2. [Repository Structure](#repository-structure)
3. [User Story and Acceptance Criteria](#user-story-and-acceptance-criteria)
4. [Test Scenarios](#test-scenarios)
5. [Traceability Matrix](#traceability-matrix)
6. [Assumptions](#assumptions)
7. [Ambiguities in the Original Test Case](#ambiguities-in-the-original-test-case)
8. [Design Decisions](#design-decisions)
9. [Prerequisites](#prerequisites)
10. [Installation and Execution](#installation-and-execution)
11. [Limitations and Future Work](#limitations-and-future-work)

---

## Overview

The original test case TC-ECOM-001 was provided as a short CSV entry. It was expanded into a
Gherkin feature file with explicit test data and expected results, then automated with Playwright.
Each Gherkin step is implemented as a named `test.step()`, so the Playwright report reads one-to-one
with the feature file.

## Repository Structure

```
storeTask-wtq26/
├── features/
│   └── product_search.feature     # Gherkin specification (4 scenarios)
├── tests/
│   └── product-search.spec.ts     # Playwright implementation of the feature
├── package.json                   # Project dependencies
├── package-lock.json
├── .gitignore
└── README.md
```

## User Story and Acceptance Criteria

**User story**

> **As a** shopper on ElectraStore
> **I want** to search for an appliance by name and open its product page
> **So that** I can confirm its name, price, availability and description before purchasing.

**Acceptance criteria**

| ID | Criterion |
|---|---|
| AC-1 | Searching a full or partial product name returns the matching products. |
| AC-2 | Search is not case sensitive. |
| AC-3 | Selecting a search result opens the corresponding product page. |
| AC-4 | The product page displays the correct product name, current sale price (PKR), stock status and description. |

## Test Scenarios

| # | Scenario | Test data | Covers | Result |
|---|---|---|---|---|
| 1 | Search for toaster and verify product details | `toaster` → GoldenCrust 4-Slice Toaster, PKR 20,100, In Stock | AC-1, AC-3, AC-4 | Pass |
| 2 | Search for microwave and verify product details | `microwave` → GrandChef 42L Convection Microwave Oven, PKR 100,000, In Stock | AC-1, AC-3, AC-4 | Pass |
| 3 | Search is not case sensitive | `TOASTER` | AC-2 | Pass |
| 4 | Search with a partial product name | `golden` | AC-1 | Pass |

## Traceability Matrix

| CSV step (TC-ECOM-001) | Gherkin step | Implementation |
|---|---|---|
| 1. Open the website | `Given I am on the ElectraStore home page` | `beforeEach` |
| 2. Enter a product name in the search box | `When I search for "<term>"` | `searchFor()` |
| 3. Submit the search | Part of `When I search for "<term>"` | `searchFor()` |
| 4. Verify relevant products appear | `Then the search results should include "<product>"` | `resultsInclude()` |
| 5. Open a product | `When I open the product "<product>"` | `openProduct()` |
| 6. Check name, price, availability and description | `Then the product page shows name, price, availability and description` | `verifyProductDetails()` |

## Assumptions

1. A "relevant" result means the searched product appears in the results; result ranking is not asserted.
2. "Correct price" refers to the current **sale price**, not the struck-through original price.
3. The search is submitted with the Enter key; the search button is used as a fallback.
4. No authentication is required to search or view products (confirmed in the site FAQ).
5. Test data reflects the live catalogue on 10 October 2026 and must be updated if catalogue data changes.

## Ambiguities in the Original Test Case

| # | Ambiguity | Resolution |
|---|---|---|
| 1 | The steps check name, price, availability and description, but the expected result mentions only name and price. | All four attributes are verified. |
| 2 | No test data was specified (product, full or partial name). | Concrete products and search terms were defined. |
| 3 | "Relevant products" was not defined. | Defined as the target product being present in the results. |
| 4 | "Correct price" did not state sale or original price. | The sale price is verified. |
| 5 | No case-sensitivity or partial-match rule was stated. | Dedicated scenarios were added (Scenarios 3 and 4). |
| 6 | No browser, device or environment was specified. | Desktop Google Chrome. |

## Design Decisions

- **User-facing locators.** Elements are located by accessible role and name (for example, the search
  `combobox` and the `h1` product heading) and by visible text, rather than generated CSS classes.
  This makes the suite more resilient to styling changes.
- **Gherkin-to-code mapping through `test.step()`.** Each Gherkin step has a reusable helper function,
  which keeps the implementation readable and traceable without adding a Cucumber runtime.
- **Reusable step helpers.** `searchFor`, `resultsInclude`, `openProduct` and `verifyProductDetails`
  can be reused by future features such as Add to Cart (TC-ECOM-002) and Checkout (TC-ECOM-003).
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

# Run the suite (headed, single worker)
npx playwright test tests/product-search.spec.ts --headed --workers=1

# Run headless
npx playwright test tests/product-search.spec.ts

# Open the HTML report
npx playwright show-report
```

To run on Playwright's bundled Chromium instead of installed Chrome, remove
`test.use({ channel: 'chrome' })` from the spec file and run `npx playwright install chromium`.

## Limitations and Future Work

- **Static test data.** Product names and prices are hard-coded; a future improvement is to read them
  from a fixture file or an API.
- **Negative scenarios.** Empty search, no-result search and special-character input are not yet automated.
- **Fixed waits.** The search step uses a short fixed wait as a safeguard; this can be replaced with an
  explicit wait on the results container once a stable test ID is available.
- **Known defect.** During exploratory testing, the discount badge was found to be calculated against the
  sale price instead of the original price (for example, -49% shown instead of -33%). This is outside
  the scope of this feature and was reported separately.

---

*Prepared for the Women Tech Quest 2026 QA Challenge (10Pearls). ElectraStore is a fictional
retailer provided as an assessment environment.*
