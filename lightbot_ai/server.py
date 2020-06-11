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

s = socketio.Client()

@s.event
def getMongoDBData():
    collection = client.LightBot.TrafficMetrics
    results = collection.find({})
    for x in results:
        print(x)

@s.event
def connect():
    print('RL server connected')
    s.emit('RL Connected',{'data': 'foobar'})


@s.event
def connect_error():
    print('A connection error occurred')


@s.event
def disconnect():
    print('RL server disconnected')


@s.on("Data-toRL")
def optimize(arg1):
    s.emit("Data-fromRL",{'data': 'foobar'})

print("--------------------------------------------------------")
s.connect('http://localhost:8000')

s.wait()
