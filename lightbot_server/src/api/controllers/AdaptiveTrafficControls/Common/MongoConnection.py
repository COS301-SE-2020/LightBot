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

	def appendAvgLength(self, avg):
		x = self.coll.find_one({},{ "_id": 0 , "avgQueueLengths": 1})
		if x is None: 
			lengths = []
			lengths.append(avg)
			y = self.coll.insert_one({"avgQueueLengths" : lengths})
		else:
			lengths = x.get("avgQueueLengths")
			lengths.append(avg)
			self.coll.update_one(x, {"$set":{"avgQueueLengths" : lengths}})

	def appendTotalWaitTime(self, wait):
		x = self.coll.find_one({},{ "_id": 0 , "totalWaitTime": 1})
		if x is None: 
			times = []
			times.append(wait)
			y = self.coll.insert_one({"totalWaitTime" : times})
		else:
			times = x.get("totalWaitTime")
			times.append(wait)
			self.coll.update_one(x, {"$set":{"totalWaitTime" : times}})

	def addTotalQueueLength(self, queueList):
		x = self.coll.find_one({},{ "_id": 0 , "totalQueueLegth": 1})		
		if x is None: 
			y = self.coll.insert_one({"totalQueueLegth" : queueList})
		else:
			self.coll.update_one(x, {"$set":{"totalQueueLegth" : queueList}})

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
