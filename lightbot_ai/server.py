import socketio
import json
from Model.MongoConnection import MongoDBConnect
from View.mockAI import performCalculation


database = MongoDBConnect()
ai = performCalculation
s = socketio.Client()

@s.event
def connect():
    print('RL server connected')
    s.emit('RL Connected')

@s.event
def connect_error(arg1):
    print('A connection error occurred: ',arg1)

@s.event
def disconnect():
	print('RL server disconnected')

#The functions should be chnaged and added to as needed.

@s.on("Query-All-From-DB")
def getMongoDBData():
	print('Event: Query-All-From-MongoDB <START>')
	results = database.queryAllFromDB()
	out = []
	for x in results:
		del x["_id"]
		x["Optimal-value"] = ai('123').pop()
		out.append(x)
	print(out)
	print('Event: Query-All-From-MongoDB <END>')
	s.emit("Data-List-fromRL",json.dumps(out))
	
@s.on("Add-One-To-DB")
def insertIntoDB(argDict):
	print('Event: Add-One-To-DB <START>')
	jsonDict = json.loads(argDict)
	database.addOneToDB(jsonDict)
	print('Event: Add-One-To-DB <END>')
	s.emit("Add-One-Complete")

@s.on("Add-Many-To-DB")
def insertIntoDB(argList):
	print('Event: Add-Many-To-DB <START>')
	jsonList = json.loads(argList)
	database.addManyToDB(jsonList)
	print('Event: Add-Many-To-DB <END>')
	s.emit("Add-Many-Complete")

# @s.on("Data-toRL")
# def sendUpdateInfoToServer(arg1):
	# json_dict = json.loads(arg1)
	# print("Event: Data-toRL received: ")
	# for key_name, value_item in json_dict.items():
		# print("Item: ",key_name," : ",value_item)
	# x = {
	# "data1":"result1",
	# "data2":"result2",
	# "data3":"result3"
	# }
	# w = ai("123")
	# x.update({"MockAIResult":w.pop()})
	# y = json.dumps(x)
	# s.emit("Data-fromRL",y)

@s.on("Disconnect-RL")
def disconnectionCommand():
	s.disconnect()



s.connect('http://localhost:8000')
s.wait()
