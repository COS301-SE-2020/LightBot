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
        print(
            "\nChecking if sumo is installed and SUMO_HOME environment variable is set.\n")
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
                print("Subtest "+str(key+1)+": Testing of " +
                      item["name"]+" with SUMO.")
                exitcode = subprocess.call(
                    [self.sumoBinary, "-c", item["config_file"], "--no-step-log"], stdout=sys.stdout, stderr=sys.stderr)
                print("Subtest "+str(key+1) +
                      ": Returned exit code "+str(exitcode)+".\n")
                self.assertEqual(exitcode, 0)


if __name__ == '__main__':
    unittest.main()
