from __future__ import absolute_import
from __future__ import print_function
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

import os
import subprocess
import sys
import unittest
import json


class TestSumo(unittest.TestCase):

    @classmethod
    def test(inst):
        """ This function sets up the SUMO test environment

        This function checks to see if the SUMO_HOME variable is set, so that it can locate sumo when running the simulations.
        """
        print("\nChecking if sumo is installed and SUMO_HOME environment variable is set.\n")
        if 'SUMO_HOME' in os.environ:
            tools = os.path.join(os.environ['SUMO_HOME'], 'tools')
            sys.path.append(tools)
        else:
           sys.exit("please declare environment variable 'SUMO_HOME'")
        from sumolib import checkBinary
        inst.sumoBinary = checkBinary('sumo')

    def test_scenarios(self):
        """ This sets up the Sumo scenarios test environment.

        This test loads all scenarios from the scenarios.json file and tests
        to see if sumo is able to run all of them without errors.
        """
        with open('./scenarios.json') as f:
            data = json.load(f)
        print("\nChecking all scenarios in scenarios.json file to make sure all run correctly.\n")
        for key, item in enumerate(data):
            with self.subTest(i=(key+1)):
                print("Subtest "+str(key+1)+": Testing of "+item["name"]+" with SUMO.")
                exitcode = subprocess.call([self.sumoBinary, "-c", item["config_file"], "--no-step-log"], stdout=sys.stdout, stderr=sys.stderr)
                print("Subtest "+str(key+1)+": Returned exit code "+str(exitcode)+".\n")
                self.assertEqual(exitcode,0)


# class TestSumoWeb3d(unittest.TestCase):

#     @classmethod
#     def setUpClass(inst):

#         print("\nTesting all the scenarios with Sumo-Web3d ...\n")
#         inst.driver = webdriver.Chrome('/usr/local/bin/chromedriver')
#         inst.driver.implicitly_wait(30)
#         inst.driver.maximize_window()
#         inst.driver.get("http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000")
#         inst.driver.title

#     def test_default_peak_traffic_scenario_(self):
#         """This function tests if the default simulation is loaded in the webpage"""
#         print("Testing that Sumo-Web3d loads the default simulation ...\n")
#         try:
#             self.driver.find_element_by_class_name("scenario-row")
#         except NoSuchElementException:
#             return False
#         return True

#     def test_normal_traffic_scenario_(self):
#         """This function tests if the normal traffic simulation is loaded in the webpage"""
#         print("Testing that Sumo-Web3d loads the normal traffic simulation ...\n")
#         self.driver.get(
#             "http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000/scenarios/jan-shoba-and-south-street:-peak-traffic/")
#         try:
#             self.driver.find_element_by_class_name("scenario-row")
#         except NoSuchElementException:
#             return False
#         return True

#     def test_low_traffic_scenario_(self):
#         """This function if the low traffic simulation is loaded in the webpage"""
#         print("Testing that Sumo-Web3d loads the low traffic simulation ...\n")
#         self.driver.get(
#             "http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000/scenarios/jan-shoba-and-south-street:-low-traffic/")
#         try:
#             self.driver.find_element_by_class_name("scenario-row")
#         except NoSuchElementException:
#             return False
#         return True

#     """This function closes the browser"""
#     @classmethod
#     def tearDownClass(inst):
#         inst.driver.quit()


if __name__ == '__main__':
    unittest.main()
