import pymongo
import config

class MongoDBConnect:

	def __init__(self):
		try:
			self.conn = pymongo.MongoClient("mongodb+srv://" + config.USER + ":" + config.PASS + "@lightbot-8xen0.mongodb.net/" + config.DBNAME + "?retryWrites=true&w=majority")
		except pymongo.errors.ConnectionFailure:
			print ("Could not connect to server")
	
	def __del__(self): 
		self.conn.close()
	
	def getConn(self):
		return self.conn