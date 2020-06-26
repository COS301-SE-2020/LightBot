import pymongo
import socketio
import config
from mockAI import performCalculation
import json
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
def connect():
    print('RL server connected')
    s.emit('RL Connected')

@s.event
def connect_error(arg1):
    print('A connection error occurred: ',arg1)

@s.event
def disconnect():
	print('RL server disconnected')




# @s.event
# def getMongoDBData():
    # collection = client.LightBot.TrafficMetrics
    # results = collection.find({})
    # for x in results:
        # print(x)

@s.on("Data-toRL")
def sendUpdateInfoToServer(arg1):
	print("Event: Data-toRL received: ",arg1)
	x = {
	"data1":"result1",
	"data2":"result2",
	"data3":"result3",
	}
	w = performCalculation("123")
	x.update({"MockAIResult":w.pop()})
	y = json.dumps(x)
	s.emit("Data-fromRL",y)

@s.on("Disconnect-RL")
def disconnectionCommand():
	s.disconnect()

print("--------------------------------------------------------")
s.connect('http://localhost:8000')
s.wait()
