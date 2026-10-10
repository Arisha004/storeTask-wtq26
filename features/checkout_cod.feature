@checkout @TC-ECOM-003
Feature: Complete checkout using Cash on Delivery
  As a shopper on ElectraStore
  I want to place an order and pay in cash on delivery
  So that I can buy without paying online

  # Source: CSV TC-ECOM-003 · Priority: Critical · Type: End-to-End · Status: specified, not automated

  Background:
    Given I am signed in as a registered customer
    And my cart contains 1 "GoldenCrust 4-Slice Toaster" at "PKR 20,100"

  Scenario: Place an order with Cash on Delivery
    When I proceed to checkout
    And I enter valid shipping details:
      | full name | Test Customer          |
      | phone     | 03001234567            |
      | address   | House 1, Street 2, DHA |
      | city      | Karachi                |
    And I select a delivery date tomorrow in the "09:00 to 13:00" window
    And I select "Cash on Delivery" as the payment method
    And I review the order summary
    Then the subtotal is "PKR 20,100"
    And the delivery fee is "PKR 550"
    And the grand total is "PKR 20,650"
    When I place the order
    Then I see an order confirmation message
    And an order number in the format "ELS-YYMMDD-NNNN" is displayed

  Scenario: Free delivery at the PKR 25,000 threshold
    Given my cart contains 1 "ChefMaster Pro 800W Food Processor" at "PKR 25,000"
    When I proceed to checkout and review the order summary
    Then the delivery fee is "PKR 0"

  Scenario: Checkout is blocked when a required shipping field is empty
    When I proceed to checkout
    And I leave the "city" field empty
    And I try to place the order
    Then I see a required-field message for "city"
    And no order is created