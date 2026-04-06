# TravelSphere: Black Box Testing Scenarios & Techniques

This document outlines various Black Box Testing techniques applied to the TravelSphere platform, detailing methodologies for thorough frontend and logical validation.

---

## 1. Requirements Based Testing
Checks the validity of the SRS (Software Requirements Specification) to ensure that all implicit and explicit requirements are met.
*   **Explicit Requirements:** Features clearly defined and requested by the client (e.g., "The user must be able to log in using an email and password").
*   **Implicit Requirements:** Expected behaviors not explicitly stated but necessary for usability and security (e.g., "The login page should load within 2 seconds", "Passwords should be masked during typing").

### Sample Requirements Traceability Matrix (RTM)

A Traceability Matrix maps test cases back to original requirements to ensure complete coverage.

| Req ID | Requirement Description | Test Case ID | Status |
| :--- | :--- | :--- | :--- |
| REQ-01 | User shall be able to register an account with a specific role. | TC-1.2.1 | Pending |
| REQ-02 | Form must restrict non-role based logins. | TC-1.1.3 | Pending |
| REQ-03 | Agent dashboard must show total active packages and inquiries. | TC-3.1 | Pending |

---

## 2. Positive and Negative Testing
Testing the system with valid (positive) and invalid (negative) datasets to verify it behaves correctly under all conditions and handles unexpected inputs gracefully.

### Example Test Cases Table: Login Module (`login.html`)

| Test Case ID | Test Scenario | Input Data | Expected Outcome | Type |
| :--- | :--- | :--- | :--- | :--- |
| TC-POS-01 | Valid agent login | agent@travel.com, pass123, Role: Travel Agent | Authenticates and redirects to `agent-dashboard.html` | Positive |
| TC-POS-02 | Valid traveler login | user@domain.com, secure1, Role: Traveler | Authenticates and redirects to traveler dashboard | Positive |
| TC-NEG-01 | Invalid email format | agent#travel.com, pass123 | HTML5 validation error: "Please include an '@'". | Negative |
| TC-NEG-02 | Missing password | user@domain.com, [Empty password] | HTML5 validation error: "Please fill out this field". | Negative |

---

## 3. Boundary Value Analysis (BVA)
Testing the system at the extreme edges (boundaries) of input ranges, where off-by-one errors and oversights are most likely to occur.

### Constraints of Input: "Number of Travelers" (`traveler-custom.html`)
Assuming the system constraints allow a minimum of 1 and a maximum of 20 travelers per custom group package:
*   **Minimum Boundary:** 1
*   **Maximum Boundary:** 20

| Test Scenario | Test Input (Travelers) | Expected System Behavior | BVA Strategy |
| :--- | :--- | :--- | :--- |
| Below Minimum | 0 | Error message: Value must be at least 1 | Just below min |
| Exact Minimum | 1 | Form accepts input | At min |
| Nominal Value | 5 | Form accepts input | Nominal / Safe |
| Exact Maximum | 20 | Form accepts input | At max |
| Above Maximum | 21 | Error message: Maximum limit is 20 | Just above max |

---

## 4. Equivalence Partitioning
Dividing input data into valid and invalid partitions (classes) where all data within a specific partition is expected to exhibit the exact same system behavior, reducing the number of redundant test cases.

### Scenario: Budget Range Input Constraints
Assume the agent dashboard categorizes package priorities strictly into these predefined budget brackets: Under ₹20,000, ₹20,000 to ₹50,000, and Over ₹50,000.

| Partition Class | Input Value Range | Type | Expected System Categorization / Behavior | Test Value to Use |
| :--- | :--- | :--- | :--- | :--- |
| Partition 1 | ₹0 - ₹19,999 | Valid | Assigned to "Budget" category | ₹15,000 |
| Partition 2 | ₹20,000 - ₹50,000 | Valid | Assigned to "Standard" category | ₹35,000 |
| Partition 3 | ₹50,001+ | Valid | Assigned to "Premium" category | ₹75,000 |
| Partition 4 | Negative values (<0) | Invalid | Form invalidation prevents submission | -₹1,000 |

---

## 5. Decision Tables
Used for testing complex business logic based on combinations of multiple conditions. It maps combinations of inputs (conditions) to expected outputs (actions) in a logical matrix.

### Decision Table for Calculating Standard Deduction (Agent Commission/Discount)
*Scenario:* When an agent builds a package, their percentage deduction/system commission varies based on two conditions: whether the package is **International** (vs Domestic), and whether the total cost is **Above ₹50,000**.

**Conditions:**
*   **C1:** Is it an International Package? (Yes/No)
*   **C2:** Is the Total Cost > ₹50,000? (Yes/No)

**Actions (Outputs):**
*   **A1:** Base Deduction is 5%
*   **A2:** Moderate Deduction is 10%
*   **A3:** High Deduction is 15%

| Conditions & Actions | Rule 1 (TC-DT-01) | Rule 2 (TC-DT-02) | Rule 3 (TC-DT-03) | Rule 4 (TC-DT-04) |
| :--- | :--- | :--- | :--- | :--- |
| **C1: International Package?** | No *(Domestic)*| No *(Domestic)*| Yes | Yes |
| **C2: Cost > ₹50,000?** | No | Yes | No | Yes |
| **A1: Deduction = 5%** | ✔ | | | |
| **A2: Deduction = 10%**| | ✔ | ✔ | |
| **A3: Deduction = 15%**| | | | ✔ |

**Interpretation of the Decision Table:**
*   **Rule 1:** If an agent books a domestic package under ₹50k, they get a 5% system deduction.
*   **Rule 2:** A domestic package over ₹50k yields a 10% deduction.
*   **Rule 3:** An international package under ₹50k yields a 10% deduction.
*   **Rule 4:** An international package over ₹50k yields the maximum 15% deduction.
