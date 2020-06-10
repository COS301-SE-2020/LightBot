import pymongo
import socketio
import config

client = pymongo.MongoClient(
    "mongodb+srv://" + config.USER + ":" + config.PASS + "@lightbot-8xen0.mongodb.net/" + config.DBNAME + "?retryWrites=true&w=majority")
try:
    client.server_info()
    print("Connection to MongoDB successful")
except:
    print("Connection to MongoDB unsuccessful")
    exit()


# collection = client.LightBot.TrafficMetrics
# cursor = collection.find({})
# for document in cursor:
#       print(document)


def getMongoDBData():
    mycol = client["Management"]
    myquery = {"something": "data"}
    mydoc = mycol.find(myquery)
    for x in mydoc:
        print(x)


s = socketio.Client()


@s.event
def connect():
    print('RL server connected')
    s.emit('RL Connected')


@s.event
def connect_error():
    print('A connection error occurred')


@s.event
def disconnect():
    print('RL server disconnected')


@s.on("Data-toRL")
def optimize(data):
    s.emit("Data-fromRL", "Some important server data")
    return '{action 1: data}'


s.connect('http://localhost:8000')
s.wait()
