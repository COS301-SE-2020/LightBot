import pymongo
import socketio
import config
import json
from mockAI import performCalculation

# client = pymongo.MongoClient(
    # "mongodb+srv://" + config.USER + ":" + config.PASS + "@lightbot-8xen0.mongodb.net/" + config.DBNAME + "?retryWrites=true&w=majority")
# try:
    # client.server_info()
    # print("Connection to MongoDB successful")
# except:
    # print("Connection to MongoDB unsuccessful")
    # exit()


s = socketio.Client()

@s.event
## connect() function.
#
#  Called when client connects with server.
#  Also emits event: "RL Connected".
def connect():
    print('RL server connected')
    s.emit('RL Connected')

@s.event
## connect_error() function.
#
#  Called when an error occurs while connecting to server.
def connect_error(arg1):
    print('A connection error occurred: ',arg1)

@s.event
## disconnect() function.
#
#  Called when client disconnects from server.
def disconnect():
	print('RL server disconnected')




@s.event
## getMongoDBData() function.
#
#  Used to retrieve all data from MongoDB
def getMongoDBData():
	collection = client.LightBot.TrafficMetrics
	results = collection.find({})
	for x in results:
		print(x["numCars"])
	s.disconnect()
	

@s.on("Data-toRL")
## sendUpdateInfoToServer() function.
#
#  @param arg1 The received JSON string.
#  Recieves and convets JSON string to a dict.
#  Creates new dict with key-value pairs and added data from MockAI function preformCalculation().
#  This dict is emitted with event: "Data-fromRL".
def sendUpdateInfoToServer(arg1):
	json_dict = json.loads(arg1)
	print("Event: Data-toRL received: ")
	for key_name, value_item in json_dict.items():
		print("Item: ",key_name," : ",value_item)
	x = {
	"data1":"result1",
	"data2":"result2",
	"data3":"result3"
	}
	w = performCalculation("123")
	x.update({"MockAIResult":w.pop()})
	y = json.dumps(x)
	s.emit("Data-fromRL",y)

@s.on("Disconnect-RL")
## disconnectionCommand() function.
#
# Called when Server sends event: "Disconnect-RL".
def disconnectionCommand():
	s.disconnect()


s.connect('http://localhost:8000')
s.wait()
