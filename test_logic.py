# TravelSphere Black Box Testing Snippets
# Run this file to demonstrate testing logic in Python output

print("=========================================")
print("1. POSITIVE AND NEGATIVE VALIDATION")
print("=========================================")
# Logic: Email must contain '@'
def check_email(email):
    if "@" in email:
        return "Valid"
    else:
        return "Invalid"

print("TC-PN-01 (Positive):", check_email("user@travels.com"))  # Expected: Valid
print("TC-PN-02 (Negative):", check_email("usertravels.com"))    # Expected: Invalid


print("\n=========================================")
print("2. BOUNDARY VALUE ANALYSIS (BVA)")
print("=========================================")
# Logic: Number of travelers must be between 1 and 10
def check_travelers(num):
    if num < 1:
        return "Invalid"
    elif num > 10:
        return "Invalid"
    else:
        return "Valid"

print("TC-BVA-19 (0 - Just Below Min):", check_travelers(0))
print("TC-BVA-20 (1 - Exact Min):     ", check_travelers(1))
print("TC-BVA-21 (2 - Safe Nom):      ", check_travelers(2))
print("TC-BVA-22 (9 - Safe Nom):      ", check_travelers(9))
print("TC-BVA-23 (10 - Exact Max):    ", check_travelers(10))
print("TC-BVA-24 (11 - Above Max):    ", check_travelers(11))


print("\n=========================================")
print("3. EQUIVALENCE PARTITIONING (EP)")
print("=========================================")
# Logic: Budget categorization based on range
# Invalid: < 0
# Budget Tier: 1 - 20,000
# Standard Tier: 20,001 - 50,000
# Premium Tier: > 50,000

def check_budget_partition(budget):
    if type(budget) is str:
        return "Invalid (Not a Number)"
    if budget < 0:
        return "Invalid Partition"
    elif 1 <= budget <= 20000:
        return "Valid Partition (Budget Tier)"
    elif 20001 <= budget <= 50000:
        return "Valid Partition (Standard Tier)"
    elif budget > 50000:
        return "Valid Partition (Premium Tier)"

print("TC-EP-01 (-500 - Negative):  ", check_budget_partition(-500))
print("TC-EP-02 (15k - Low Range):  ", check_budget_partition(15000))
print("TC-EP-03 (35k - Mid Range):  ", check_budget_partition(35000))
print("TC-EP-04 (100k - High Range):", check_budget_partition(100000))
print("TC-EP-05 ('abc' - String):   ", check_budget_partition("abc"))


print("\n=========================================")
print("4. DECISION TABLES")
print("=========================================")
# Logic: Commission rules based on Package Type (Domestic/Intl) and Cost (>50k).
def calculate_deduction(is_international, cost):
    if not is_international and cost <= 50000:
        return "5% Deduction"
    elif not is_international and cost > 50000:
        return "10% Deduction"
    elif is_international and cost <= 50000:
        return "10% Deduction"
    elif is_international and cost > 50000:
        return "15% Deduction"

print("TC-DT-01 (Rule 1: Domestic, 30k):      ", calculate_deduction(False, 30000))
print("TC-DT-02 (Rule 2: Domestic, 65k):      ", calculate_deduction(False, 65000))
print("TC-DT-03 (Rule 3: International, 45k): ", calculate_deduction(True, 45000))
print("TC-DT-04 (Rule 4: International, 120k):", calculate_deduction(True, 120000))


print("\n=========================================")
print("5. REQUIREMENTS BASED TESTING")
print("=========================================")
# Logic: Simulating whether the UI requirements meet the SRS (Software Requirement Specs)
# E.g. Missing a required link

ui_html_element_list = ["login_form", "email_input", "password_input"] # Forgot password is missing!

def verify_srs_requirements(ui_elements, required_element):
    if required_element in ui_elements:
        return f"Pass -> Core requirement '{required_element}' exists."
    else:
        return f"Fail -> Critical requirement missing: '{required_element}'"

print("TC-REQ-01 (Check for Login Form):      ", verify_srs_requirements(ui_html_element_list, "login_form"))
print("TC-REQ-02 (Check for Forgot Password): ", verify_srs_requirements(ui_html_element_list, "forgot_password"))
