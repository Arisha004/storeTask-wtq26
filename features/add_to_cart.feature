@cart @TC-ECOM-002
Feature: Add an available single product to the shopping cart
  As a shopper on ElectraStore
  I want to add an in-stock product to my cart
  So that I can review it and buy it later

  # Source: CSV TC-ECOM-002 · Priority: High · Type: UI / Functional · Status: specified, not automated

  Background:
    Given I am on the product page of "GoldenCrust 4-Slice Toaster"
    And the product shows "In Stock"

  Scenario: Add one unit of an available product to the cart
    When I note the product name and the sale price "PKR 20,100"
    And I click "Add to Cart"
    And I open the cart
    Then the cart shows "GoldenCrust 4-Slice Toaster"
    And the quantity is 1
    And the unit price is "PKR 20,100"
    And the cart subtotal is "PKR 20,100"

  Scenario: Cart counter in the header updates
    When I click "Add to Cart"
    Then the cart icon count in the header increases by 1

  Scenario: Out-of-stock product cannot be added
    Given I am on the product page of "SmoothPro 28L Blender"
    Then the product shows "Out of Stock"
    And the "Add to Cart" button is disabled