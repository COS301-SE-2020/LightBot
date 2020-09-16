# This file represents a connection to the MongoDB database for the system.
import pymongo


class MongoDBConnect:
	
	conn = None
	coll = None
	
	# The constructor, which stores the parameters into their respective member variable.
	#  @param self The object pointer.
	def __init__(self):
		try:
			self.conn = pymongo.MongoClient("mongodb+srv://LightBotAdmin:lightbot@lightbot-8xen0.mongodb.net/LightBot?retryWrites=true&w=majority")
			self.coll = self.conn.LightBot.TrafficMetrics
			print("DB Connection Successful")
		except pymongo.errors.ConnectionFailure:
			print ("Could not connect to DB")
	
	# The destructor.
	#  @param self The object pointer.
	def __del__(self): 
		if self.conn is not None:
			self.coll = None
			self.conn.close()
	
	# Documentation for the addOneToDB method.
	#  @param self The object pointer.
	#  @param dictArg The data to be added to the database represented as a dictonary.
	def addOneToDB(self, dictArg):
		x = self.coll.insert_one(dictArg)

	# Documentation for the addManyToDB method.
	#  @param self The object pointer.
	#  @param listArg The data to be added to the database represented as a list.
	def addManyToDB(self, listArg):
		x = self.coll.insert_many(listArg)

	# Documentation for the appendAvgLength method.
	#  @param self The object pointer.
	#  @param avg The average queue length to be added to the database.
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

	# Documentation for the appendTotalWaitTime method.
	#  @param self The object pointer.
	#  @param wait The total waiting time to be added to the database.
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

	# Documentation for the addTotalQueueLength method.
	#  @param self The object pointer.
	#  @param queueList The the total queue length to be added to the database.
	def addTotalQueueLength(self, queueList):
		x = self.coll.find_one({},{ "_id": 0 , "totalQueueLegth": 1})		
		if x is None: 
			y = self.coll.insert_one({"totalQueueLegth" : queueList})
		else:
			self.coll.update_one(x, {"$set":{"totalQueueLegth" : queueList}})

	# Documentation for the queryAllFromDB method.
	#  @param self The object pointer.
	def queryAllFromDB(self):
		results = self.coll.find({},{ "_id": 0 })
		out = []
		for x in results:
			out.append(x)
		return out
		
	# Documentation for the getStoredState method.
	#  @param self The object pointer.
	def getStoredState(self):
		result = self.coll.find_one({ "Title": "StoredState" },{ "_id": 0 })
		return result
		
	# Documentation for the deleteStoredState method.
	#  @param self The object pointer.
	def deleteStoredState(self):
		self.coll.delete_one({ "Title": "StoredState" })
