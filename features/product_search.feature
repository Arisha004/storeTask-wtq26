@search @TC-ECOM-001
Feature: Search for a product and verify product details
  As a shopper on ElectraStore
  I want to search for an appliance by name and open its product page
  So that I can check its name, price, availability and description before buying

  # Source: CSV TC-ECOM-001 · Priority: High · Type: UI / Functional

  Background:
    Given I am on the ElectraStore home page

  @smoke
  Scenario: Search for toaster and verify product details
    When I search for "toaster"
    Then the search results should include "GoldenCrust 4-Slice Toaster"
    When I open the product "GoldenCrust 4-Slice Toaster"
    Then the product page shows name, price, availability and description
      | name         | GoldenCrust 4-Slice Toaster |
      | price        | PKR 20,100                  |
      | availability | In Stock                    |
      | description  | Four-slice toaster          |

  Scenario: Search for microwave and verify product details
    When I search for "microwave"
    Then the search results should include "GrandChef 42L Convection Microwave Oven"
    When I open the product "GrandChef 42L Convection Microwave Oven"
    Then the product page shows name, price, availability and description
      | name         | GrandChef 42L Convection Microwave Oven |
      | price        | PKR 100,000                             |
      | availability | In Stock                                |
      | description  | 42 litre convection microwave           |

  Scenario: Search is not case sensitive
    When I search for "TOASTER"
    Then the search results should include "GoldenCrust 4-Slice Toaster"

  Scenario: Search with a partial product name
    When I search for "golden"
    Then the search results should include "GoldenCrust 4-Slice Toaster"