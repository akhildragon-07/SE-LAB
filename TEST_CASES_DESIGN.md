# TravelSphere: Black Box Test Case Design & Scenarios

This document provides structured test cases designed to validate the core features of the TravelSphere Web Platform. Each test case details specific **Test Inputs** and **Expected Test Outputs** across various Black Box Testing Methodologies.

---

## 1. Requirements Based Testing (Implicit & Explicit)
**Objective:** Verify that the system meets the core SRS (Software Requirement Specifications) for usability and complete user flows.

| Test Case ID | Requirement Type | Description | Test Input | Expected Output (System Response) |
| :--- | :--- | :--- | :--- | :--- |
| **TC-REQ-01** | Explicit | Registration form must contain 4 specific fields. | Navigate to `login.html`, inspect the "Sign Up" form. | Form displays `Name`, `Email`, `Password`, and `Role` fields. |
| **TC-REQ-02** | Explicit | Users must be able to select their role during signup. | Click Role dropdown on Sign Up form. | Dropdown displays exactly: `Traveler`, `Travel Agent`, `Admin`, `NATPAC Scientist`. |
| **TC-REQ-03** | Implicit | Security requirement: The login form must have account recovery. | Scan text/DOM on `login.html` for recovery flow. | System must display a "Forgot Password?" hyperlink. |

---

## 2. Positive and Negative Testing (API Validations)
**Objective:** Ensure the backend registration API accepts completely valid data (Valid Equivalence Class) and outright rejects malicious or incomplete data (Invalid Equivalence Class).

| Test Case ID | Test Type | User Goal | Test Input (Simulated Form Submission) | Expected Output (API / UI Response) |
| :--- | :--- | :--- | :--- | :--- |
| **TC-PN-01** | Positive | Register a new Agent. | Name: `John Doe`<br>Email: `john@travels.com`<br>Pass: `p@ssword123`<br>Role: `Travel Agent` | HTTP 201 Created. <br>UI shows: ✅ User registered successfully! |
| **TC-PN-02** | Negative | Register with missing Name.| Name: `[Empty]`<br>Email: `test@test.com`<br>Pass: `1234567`<br>Role: `Traveler` | HTTP 400 Bad Request. <br>UI shows: ❌ Name must be at least 3 characters. |
| **TC-PN-03** | Negative | Register with short password.| Name: `Alice`<br>Email: `alice@test.com`<br>Pass: `123`<br>Role: `Admin` | HTTP 400 Bad Request. <br>UI shows: ❌ Password must be at least 6 characters. |

---

## 3. Boundary Value Analysis (BVA)
**Objective:** Test the absolute extremes of input fields where errors are statistically most likely to occur.
**Scenario Component:** Custom Package Request (`traveler-custom.html`) -> *"Number of Travelers"* field.
**Constraint:** Minimum allowed Travelers is **1**. (Assume maximum allowed by business logic is **20**).

| Test Case ID | BVA Target | Test Input (Total Travelers) | Expected System Output | Result Interpretation |
| :--- | :--- | :--- | :--- | :--- |
| **TC-BVA-01** | Just Below Minimum | `-1` or `0` | UI Validation blocks form submission. | Pass (Invalidates input) |
| **TC-BVA-02** | Exact Minimum | `1` | Form accepts input. | Pass (Accepts edge case) |
| **TC-BVA-03** | Nominal / Safe | `4` | Form accepts input. | Pass (Standard flow) |
| **TC-BVA-04** | Exact Maximum | `20` | Form accepts input. | Pass (Accepts edge case) |
| **TC-BVA-05** | Just Above Maximum | `21` | UI Validation blocks form submission. | Pass (Invalidates input) |

---

## 4. Equivalence Partitioning (EP)
**Objective:** Divide ranges of data into "partitions". If the system handles one value in the partition correctly, it should theoretically handle all values in that partition correctly.
**Scenario Component:** Custom Package Request (`traveler-custom.html`) -> *"Budget Range (₹)"* field. 
*(Assuming numeric formatting logic requires positive integers).*

| Test Case ID | Partition Class Type | Input Range | Test Data (Input) | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **TC-EP-01** | Invalid Partition (Negative) | < 0 | `-5000` | Rejected: "Budget cannot be negative." |
| **TC-EP-02** | Valid Partition (Low Budget)| ₹1 - ₹20,000 | `15000` | Accepted. Classified as Budget tier. |
| **TC-EP-03** | Valid Partition (Standard) | ₹20,001 - ₹50,000| `35000` | Accepted. Classified as Standard tier. |
| **TC-EP-04** | Valid Partition (Premium) | > ₹50,000 | `120000` | Accepted. Classified as Premium tier. |
| **TC-EP-05** | Invalid Partition (Strings) | Any characters | `abcde` | Rejected: "Please enter a valid number." |

---

## 5. Decision Tables
**Objective:** Test complex combinations of multiple variables that determine a specific logical outcome.
**Scenario Component:** Agent Dashboard (`agent-dashboard.html`) -> *Standard Deduction Commission Calculator*.

**Business Logic Rules:**
1. Domestic trips ≤ ₹50k yield 5% Deduction.
2. Domestic trips > ₹50k yield 10% Deduction.
3. International trips ≤ ₹50k yield 10% Deduction.
4. International trips > ₹50k yield 15% Deduction.

| Test Case ID | Condition 1 Input (Package Scope) | Condition 2 Input (Total Cost) | Associated Rule | Expected Outcome (Output Deduction) |
| :--- | :--- | :--- | :--- | :--- |
| **TC-DT-01** | Domestic | `₹ 30,000` | Rule 1 | Calculated System Deduction: 5% |
| **TC-DT-02** | Domestic | `₹ 65,000` | Rule 2 | Calculated System Deduction: 10% |
| **TC-DT-03** | International| `₹ 45,000` | Rule 3 | Calculated System Deduction: 10% |
| **TC-DT-04** | International| `₹ 120,000` | Rule 4 | Calculated System Deduction: 15% |
