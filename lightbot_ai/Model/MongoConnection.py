import pymongo
import config

class MongoDBConnect:
	
	conn = None
	coll = None
	
	def __init__(self):
		try:
			conn = pymongo.MongoClient("mongodb+srv://" + config.USER + ":" + config.PASS + "@lightbot-8xen0.mongodb.net/" + config.DBNAME + "?retryWrites=true&w=majority")
			coll = conn.LightBot.TrafficMetrics
		except pymongo.errors.ConnectionFailure:
			print ("Could not connect to server")
	
	def __del__(): 
		if conn != None:
			conn.close()
			coll = None
	
	def addOneToDB(dictArg):
		x = coll.insert_one(dictArg)

	def addManyToDB(listArg):
		x = coll.insert_many(listArg)
		
	def queryAllFromDB():
		x = coll.find({})
		return x #I'd rather return list instead of cursor in data