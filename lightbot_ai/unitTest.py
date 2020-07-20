import unittest
from POModel_UnitTest.pages.Login import Login
from POModel_UnitTest.pages.HomePage import HomePage
from selenium import webdriver
import time
import HtmlTestRunner
import sys
import os
from selenium.webdriver.common.by import By

sys.path.append(os.path.join(os.path.dirname(_file_), "..", ".."))


class UnitTest(unittest.TestCase):

	@classmethod
	def setUpClass(cls):
		path = "..\\test_unit\\chromedriver_win32\\chromedriver.exe"
		cls.driver = webdriver.Chrome(path)
		cls.driver.maximize_window()
		cls.driver.get("https://teamgamma.ga/webfrontend/html/Register")
		cls.login = Login(cls.driver)



	def test_01_invalid_login(self):
		self.login.register()
		time.sleep(3)
		self.login.loginpage()

	def test_02_not_registered_login(self):
		# Testing begin here, by first putting the user name and the password of the user
		self.login.enter_non_registered_email()
		time.sleep(2)
		self.login.enter_password()
		time.sleep(2)
		self.login.click()
		time.sleep(2)

	def test_03_login(self):
		# Testing begin here begin here , by first putting the user name and the password of the user
		self.login.enter_email()
		time.sleep(2)
		self.login.enter_password()
		time.sleep(2)
		self.login.click()
		time.sleep(2)

	def test_06_links(self):
		homepage = HomePage(self.driver)
		homepage.home_page_link()



	@classmethod
	def tearDownClass(cls):
		cls.driver.close()
		cls.driver.quit()


if _name_ == "_main_":
	unittest.main()