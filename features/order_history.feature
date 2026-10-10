@orders @TC-ECOM-004
Feature: Log in, purchase a product and verify the order in My Orders
  As a registered customer
  I want my new order to appear in My Orders with the correct details
  So that I can track what I bought and its status

  # Source: CSV TC-ECOM-004 · Priority: Critical · Type: End-to-End · Status: specified, not automated

  Scenario: New order appears in My Orders with correct details
    Given I am signed in with a valid registered account
    And I add 1 "GoldenCrust 4-Slice Toaster" to the cart
    And I complete checkout with "Cash on Delivery"
    And I note the order number from the confirmation page
    When I open "My Orders"
    Then I see the order with that order number
    And the order shows product "GoldenCrust 4-Slice Toaster"
    And the quantity is 1
    And the total amount is "PKR 20,650"
    And the status is "Placed"

  Scenario: New customer registers and the order is saved to the new account
    Given I create a new account with valid details
    When I place an order with "Cash on Delivery"
    And I open "My Orders"
    Then the new order is listed for this account

  Scenario: Orders page requires sign-in
    Given I am not signed in
    When I open "/account/orders" directly
    Then I am redirected to the sign-in page