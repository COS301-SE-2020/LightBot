import socketio
import json
# from Model.MongoConnection import MongoDBConnect
# from View.mockAI import performCalculation
import View.mockAI
import Model.MongoConnection


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



# @s.on("initialize")
# def init():
	# database = MongoDBConnect()
	# ai = performCalculation

@s.on("Query-All-From-MongoDB")
def getMongoDBData():
	print('Event: Query-All-From-MongoDB <START>')
	results = databasen.queryAllFromDB()
	out = []
	for x in results:
		print(x["numCars"])
		out.append(x)
	print(out)
	print(ai('123'))
	print('Event: Query-All-From-MongoDB <END>')
	s.disconnect()

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
