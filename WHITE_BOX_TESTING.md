# TravelSphere: White Box Testing & CFG Analysis

To perform thorough White Box testing, we have divided the TravelSphere software into **seven core functional modules**. Each module contains explicit pseudo code with numbered execution nodes. This format is specifically designed to help you construct a **Control Flow Graph (CFG)** and calculate the **Cyclomatic Complexity [V(G) = E - N + 2]** or **[Decision Nodes + 1]**.

---

## Module 1: User Signup Validation
**Description:** Validates user inputs during registration before writing to the database.

### Pseudo Code
```text
function validateSignup(name, email, password):
1.  START
2.  isValid = True
3.  if len(name) < 3:
4.      isValid = False
5.  if "@" not in email:
6.      isValid = False
7.  if len(password) < 6:
8.      isValid = False
9.  if isValid == True:
10.     return "Success: User Registered"
11. else:
12.     return "Error: Invalid Input"
13. END
```
* **Complexity:** 4 Decision Nodes (`if`) + 1 = **5 independent paths**.

---

## Module 2: User Login Authorization
**Description:** Checks if the provided email and password match existing records and determines their access role.

### Pseudo Code
```text
function authorizeLogin(email, password, mockDB):
1.  START
2.  user = mockDB.find(email)
3.  if user == null:
4.      return "Error: User not found"
5.  if user.password != password:
6.      return "Error: Incorrect password"
7.  if user.role == "Admin":
8.      return "Redirect -> Admin Dashboard"
9.  else:
10.     return "Redirect -> User Dashboard"
11. END
```
* **Complexity:** 3 Decision Nodes + 1 = **4 independent paths**.

---

## Module 3: Traveler Package Budget Categorization
**Description:** Categorizes dynamic search queries from the traveler dashboard to filter appropriately.

### Pseudo Code
```text
function categorizeBudget(budgetInput):
1.  START
2.  tier = "None"
3.  if budgetInput == "Any":
4.      tier = "All"
5.  else if budgetInput <= 25000:
6.      tier = "Budget"
7.  else if budgetInput <= 50000:
8.      tier = "Standard"
9.  else:
10.     tier = "Premium"
11. return tier
12. END
```
* **Complexity:** 3 Decision Nodes + 1 = **4 independent paths**.

---

## Module 4: Agent Commission Deduction Calculator
**Description:** Calculates the system deduction chunk taken out of an agent's package cost.

### Pseudo Code
```text
function calculateDeduction(isInternational, cost):
1.  START
2.  deduction = 5
3.  if isInternational == True:
4.      if cost > 50000:
5.          deduction = 15
6.      else:
7.          deduction = 10
8.  else:
9.      if cost > 50000:
10.         deduction = 10
11. return deduction
12. END
```
* **Complexity:** 3 Decision Nodes + 1 = **4 independent paths**.

---

## Module 5: Traveler Request Date Constraint
**Description:** Verifies that a generated custom request by a traveler falls within an acceptable timeline.

### Pseudo Code
```text
function validateTravelDates(requestDate, currentDate):
1.  START
2.  daysDifference = (requestDate - currentDate)
3.  if daysDifference < 0:
4.      return "Error: Date in the past"
5.  else if daysDifference < 7:
6.      return "Error: Booking requires 7 day notice"
7.  else if daysDifference > 365:
8.      return "Error: Cannot book more than a year in advance"
9.  else:
10.     return "Date Valid"
11. END
```
* **Complexity:** 3 Decision Nodes + 1 = **4 independent paths**.

---

## Module 6: Booking Payment Routing
**Description:** Simulates the internal routing determining which payment gateway is invoked based on the package cost structure.

### Pseudo Code
```text
function routePaymentGateway(packageTotal):
1.  START
2.  gateway = "Standard"
3.  if packageTotal > 100000:
4.      gateway = "Premium SSL Gateway"
5.      if requiresInstallments(packageTotal) == True:
6.          gateway = "EMI Partner Gateway"
7.  else:
8.      if packageTotal < 10000:
9.          gateway = "Micro-transaction Gateway"
10. return gateway
11. END
```
* **Complexity:** 3 Decision Nodes (Line 3, 5, 8) + 1 = **4 independent paths**.

---

## Module 7: Scientist Demographic Allocation
**Description:** Allocates a given user's age demographic into group sets for the NATPAC Analytics Chart.js graphs.

### Pseudo Code
```text
function allocateDemographic(age):
1.  START
2.  group = "Unknown"
3.  if age < 18:
4.      group = "Gen Z (Minor)"
5.  else if age <= 26:
6.      group = "Gen Z (Adult)"
7.  else if age <= 42:
8.      group = "Millennial"
9.  else if age <= 58:
10.     group = "Gen X"
11. else:
12.     group = "Boomer"
13. return group
14. END
```
* **Complexity:** 4 Decision Nodes + 1 = **5 independent paths**.
