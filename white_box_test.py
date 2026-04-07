import unittest

# Assume this is the internal application logic we want to test
def calculate_commission(is_international, cost):
    # Node 1
    deduction = 5
    
    # Node 2 (Decision 1)
    if is_international:
        # Node 3 (Decision 2)
        if cost > 50000:
            deduction = 15  # Node 4
        else:
            deduction = 10  # Node 5
    else:
        # Node 6 (Decision 3)
        if cost > 50000:
            deduction = 10  # Node 7
            
    return deduction # Node 8

class TestWhiteBoxLogic(unittest.TestCase):
    
    # ------------------------------------------------------------------
    # BRANCH / PATH COVERAGE (Cyclomatic Complexity = 4)
    # We need to test all 4 logical paths through the function
    # ------------------------------------------------------------------
    
    def test_path_1(self):
        # Path: True -> True (International, High Cost)
        # Hits lines: if is_international -> if cost > 50000 -> deduction = 15
        print("Executing Path 1: International, Cost > 50k")
        self.assertEqual(calculate_commission(True, 60000), 15)
        
    def test_path_2(self):
        # Path: True -> False (International, Low Cost)
        print("Executing Path 2: International, Cost <= 50k")
        self.assertEqual(calculate_commission(True, 30000), 10)
        
    def test_path_3(self):
        # Path: False -> True (Domestic, High Cost)
        print("Executing Path 3: Domestic, Cost > 50k")
        self.assertEqual(calculate_commission(False, 60000), 10)
        
    def test_path_4(self):
        # Path: False -> False (Domestic, Low Cost)
        print("Executing Path 4: Domestic, Cost <= 50k")
        self.assertEqual(calculate_commission(False, 30000), 5)


# Run tests
if __name__ == '__main__':
    print("=============================================")
    print("EXECUTING WHITE BOX COVERAGE TESTS")
    print("=============================================")
    unittest.main(verbosity=2)
