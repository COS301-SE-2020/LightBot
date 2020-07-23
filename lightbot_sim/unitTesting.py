from __future__ import absolute_import
from __future__ import print_function
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

import os
import subprocess
import sys
import unittest


class TestSumo(unittest.TestCase):

    @classmethod
    def test(inst):
        """ This function sets up the SUMO test environment

        This function checks to see if the SUMO_HOME variable is set, so that it can locate sumo when running the simulations.
        """
        if 'SUMO_HOME' in os.environ:
            tools = os.path.join(os.environ['SUMO_HOME'], 'tools')
            sys.path.append(tools)
        else:
           sys.exit("please declare environment variable 'SUMO_HOME'")
        from sumolib import checkBinary
        inst.sumoBinary = checkBinary('sumo')
        print("\nTesting SUMO with all the simulations used...\n")

    def test_sim_low_traffic(self):
        """ This function checks the low traffic simulation

        This function checks to see if SUMO is able to use the configuration file of the low traffic simulation, build the model
         and successfully run the simulation to completion.
        """
        print("Testing of Jan Shoba and South Street: low traffic simulation with SUMO.")
        exitcode = subprocess.call(
            [self.sumoBinary, "-c", "sim_JanSouth_low.sumocfg", "--no-step-log"], stdout=sys.stdout, stderr=sys.stderr)
        if exitcode == 1:
            return False
        else:
            return True

    def test_sim_normal_traffic(self):
        """ This function checks the normal traffic simulation

        This function checks to see if SUMO is able to use the configuration file of the normal traffic simulation, build the model
        and successfully run the simulation to completion.
        """
        print("\nTesting of Jan Shoba and South Street: normal traffic simulation with SUMO.")
        exitcode = subprocess.call(
            [self.sumoBinary, "-c", "sim_JanSouth_normal.sumocfg", "--no-step-log"], stdout=sys.stdout,
            stderr=sys.stderr)
        if exitcode == 1:
            return False
        else:
            return True

    def test_sim_peak_traffic(self):
        """ This function checks the peak traffic simulation

        This function checks to see if SUMO is able to use the configuration file of the peak traffic simulation, build the model
        and successfully run the simulation to completion.
        """
        print("\nTesting of Jan Shoba and South Street: peak traffic simulation with SUMO. ")
        exitcode = subprocess.call(
            [self.sumoBinary, "-c", "sim_JanSouth_peak.sumocfg", "--no-step-log"], stdout=sys.stdout, stderr=sys.stderr)
        if exitcode == 1:
            return False
        else:
            return True


class TestSumoWeb3d(unittest.TestCase):

    @classmethod
    def setUpClass(inst):
        """ This sets up the SUMO-WEB3D test environment.

        This function opens a new chrome window and navigates to the home page of the simulation server.
        The pulic DNS of our server is: http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com.
        SUMO-WEB3D runs on port 5000.
        """
        print("\nTesting all the scenarios with Sumo-Web3d ...\n")
        inst.driver = webdriver.Chrome('/usr/local/bin/chromedriver')
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000")
        inst.driver.title

    def test_default_peak_traffic_scenario_(self):
        """This function tests if the default simulation is loaded in the webpage"""
        print("Testing that Sumo-Web3d loads the default simulation ...\n")
        try:
            self.driver.find_element_by_class_name("scenario-row")
        except NoSuchElementException:
            return False
        return True

    def test_normal_traffic_scenario_(self):
        """This function tests if the normal traffic simulation is loaded in the webpage"""
        print("Testing that Sumo-Web3d loads the normal traffic simulation ...\n")
        self.driver.get(
            "http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000/scenarios/jan-shoba-and-south-street:-peak-traffic/")
        try:
            self.driver.find_element_by_class_name("scenario-row")
        except NoSuchElementException:
            return False
        return True

    def test_low_traffic_scenario_(self):
        """This function if the low traffic simulation is loaded in the webpage"""
        print("Testing that Sumo-Web3d loads the low traffic simulation ...\n")
        self.driver.get(
            "http://ec2-18-224-22-142.us-east-2.compute.amazonaws.com:5000/scenarios/jan-shoba-and-south-street:-low-traffic/")
        try:
            self.driver.find_element_by_class_name("scenario-row")
        except NoSuchElementException:
            return False
        return True

    """This function closes the browser"""
    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()


if __name__ == '__main__':
    unittest.main()
