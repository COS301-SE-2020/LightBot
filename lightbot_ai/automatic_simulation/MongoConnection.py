import pymongo


class MongoDBConnect:
	
	conn = None
	coll = None
	
	def __init__(self):
		try:
			self.conn = pymongo.MongoClient("mongodb+srv://LightBotAdmin:lightbot@lightbot-8xen0.mongodb.net/LightBot?retryWrites=true&w=majority")
			self.coll = self.conn.LightBot.TrafficMetrics
			print("DB Connection Successful")
		except pymongo.errors.ConnectionFailure:
			print ("Could not connect to DB")
	
	def __del__(self): 
		if self.conn is not None:
			self.coll = None
			self.conn.close()
	
	def addOneToDB(self, dictArg):
		x = self.coll.insert_one(dictArg)

	def addManyToDB(self, listArg):
		x = self.coll.insert_many(listArg)
		
	def queryAllFromDB(self):
		results = self.coll.find({},{ "_id": 0 })
		out = []
		for x in results:
			out.append(x)
		return out
		
	def getStoredState(self):
		result = self.coll.find_one({ "Title": "StoredState" },{ "_id": 0 })
		return result
		
	def deleteStoredState(self):
		self.coll.delete_one({ "Title": "StoredState" })