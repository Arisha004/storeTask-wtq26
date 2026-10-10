# Expanded Test Cases, Assumptions, Ambiguities and User Stories

Source: ecommerce_automation_test_scenarios_detailed_1.csv (4 test cases provided).
Application: https://validate.womentechquest.com/ (ElectraStore).

| ID | Title | Priority | Type | Feature file | Automated |
|---|---|---|---|---|---|
| TC-ECOM-001 | Search for a product and verify product details | High | UI / Functional | features/product_search.feature | Yes – tests/product-search.spec.ts (4 passing) |
| TC-ECOM-002 | Add an available single product to the cart | High | UI / Functional | features/add_to_cart.feature | No (specified) |
| TC-ECOM-003 | Complete checkout using Cash on Delivery | Critical | End-to-End | features/checkout_cod.feature | No (specified) |
| TC-ECOM-004 | Log in, purchase a product and verify the order | Critical | End-to-End | features/order_history.feature | No (specified) |

---

## TC-ECOM-001 – Search for a product and verify product details

**Preconditions:** Site reachable; no sign-in required; "GoldenCrust 4-Slice Toaster" and "GrandChef 42L Convection Microwave Oven" are in stock.
**Test data:** `toaster` → GoldenCrust 4-Slice Toaster, PKR 20,100, In Stock, "Four-slice toaster"; `microwave` → GrandChef 42L Convection Microwave Oven, PKR 100,000; `TOASTER`; `golden`.

| # | Step | Expected result |
|---|---|---|
| 1 | Open the home page | Page title contains "ElectraStore" |
| 2 | Type `toaster` in the header search box | Text is entered |
| 3 | Press Enter | Results are displayed |
| 4 | Check the results | "GoldenCrust 4-Slice Toaster" is listed |
| 5 | Open the product | Product page opens |
| 6 | Check details | Title, sale price PKR 20,100, "In Stock" and description are shown |

**Assumptions:** "relevant" = target product appears in results; "price" = sale price; Enter submits the search; guests can search (FAQ).
**Ambiguities:** expected result omits availability and description; no test data; "relevant" undefined; sale vs original price; no case-sensitivity rule; no browser stated.

**User story:** As a shopper, I want to search for an appliance by name and open its product page, so that I can confirm its name, price, availability and description before buying.
**Acceptance criteria:** (1) full or partial name returns matching products; (2) search is case-insensitive; (3) clicking a result opens the product page; (4) the page shows the correct name, sale price, stock status and description.

---

## TC-ECOM-002 – Add an available single product to the cart

**Preconditions:** Site reachable; "GoldenCrust 4-Slice Toaster" is in stock; cart is empty.
**Test data:** GoldenCrust 4-Slice Toaster, PKR 20,100, quantity 1. Out-of-stock check: SmoothPro 28L Blender.

| # | Step | Expected result |
|---|---|---|
| 1 | Open the GoldenCrust 4-Slice Toaster product page | Page shows "In Stock" |
| 2 | Note the name and sale price | PKR 20,100 |
| 3 | Click Add to Cart | Confirmation shown; header cart count = 1 |
| 4 | Open the cart | Cart page opens |
| 5 | Verify the line item | Name correct, quantity 1, unit price PKR 20,100, subtotal PKR 20,100 |

**Assumptions:** the cart starts empty; "cart total" = subtotal before delivery fee; a guest can add to cart (FAQ: guest cart held 24 h).
**Ambiguities:** "cart total" could mean subtotal or grand total including the PKR 550 delivery fee; no product specified; behaviour for out-of-stock items not stated; the quantity to add is not stated.

**User story:** As a shopper, I want to add an in-stock product to my cart, so that I can review it and buy it later.
**Acceptance criteria:** (1) Add to Cart adds 1 unit; (2) the cart shows the correct name, quantity and unit price; (3) subtotal = unit price × quantity; (4) out-of-stock products cannot be added.

---

## TC-ECOM-003 – Complete checkout using Cash on Delivery

**Preconditions:** Registered account signed in (FAQ: an account is required to complete an order); cart contains 1 GoldenCrust 4-Slice Toaster.
**Test data:** Test Customer · 03001234567 · House 1, Street 2, DHA · Karachi · delivery tomorrow 09:00–13:00 · COD.

| # | Step | Expected result |
|---|---|---|
| 1 | Proceed to checkout | Checkout page opens |
| 2 | Enter shipping details | Fields accept valid data |
| 3 | Select a delivery date and window | Tomorrow to +14 days selectable |
| 4 | Select Cash on Delivery | COD selected (the only method) |
| 5 | Review the order | Subtotal 20,100 · delivery 550 · total 20,650 |
| 6 | Place the order | Confirmation message shown |
| 7 | Check the order number | Format ELS-YYMMDD-NNNN with today's date |

**Assumptions:** sign-in is required (FAQ); COD is the only payment method (FAQ); delivery fee PKR 550 below PKR 25,000 (Delivery Policy).
**Ambiguities:** the CSV says "search for a product" but doesn't say which; it doesn't state whether a guest can check out; "valid shipping data" isn't defined (phone format, cities); delivery fee and date selection aren't mentioned; the order-number format isn't given.

**User story:** As a shopper, I want to place an order and pay cash on delivery, so that I can buy without paying online.
**Acceptance criteria:** (1) checkout accepts valid shipping details and rejects missing required fields; (2) COD can be selected; (3) the summary shows subtotal, delivery fee and grand total correctly; (4) placing the order shows a confirmation and an ELS-YYMMDD-NNNN order number.

---

## TC-ECOM-004 – Log in, purchase a product and verify the order

**Preconditions:** Valid registered account (or registration available); product in stock.
**Test data:** registered test account; GoldenCrust 4-Slice Toaster ×1; COD; expected total PKR 20,650; expected status "Placed".

| # | Step | Expected result |
|---|---|---|
| 1 | Sign in with valid credentials | Signed in; header shows the user's name |
| 2 | Add the product to the cart and check out with COD | Order placed; order number shown |
| 3 | Open My Orders | Orders list is displayed |
| 4 | Locate the new order | Order with the same number is listed |
| 5 | Verify the details | Product, quantity 1, amount PKR 20,650, status "Placed" |

**Assumptions:** the initial status is "Placed" (FAQ timeline); the amount includes the delivery fee; My Orders requires sign-in.
**Ambiguities:** "log in OR create an account" gives two different flows; the expected status value isn't stated; "amount" could be subtotal or total; how quickly the order should appear isn't stated.

**User story:** As a registered customer, I want my new order to appear in My Orders with the correct details, so that I can track what I bought and its status.
**Acceptance criteria:** (1) a signed-in user can place an order; (2) the order appears in My Orders with the same order number; (3) the product, quantity, total and status "Placed" are correct; (4) My Orders is only accessible when signed in.