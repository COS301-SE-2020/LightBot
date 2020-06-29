import eventlet
import socketio
import json

sio = socketio.Server()
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)
	
@sio.event
def disconnect(sid):
    print('disconnect ', sid)



@sio.on("RL Connected")
def getDataReq(sid):	
	print("Event getDataReq received: ",sid)
	x = {"data1":"a","data2":"b"}
	y = json.dumps(x)
	sio.emit("Data-toRL",y)
	#sio.emit("getMongoDBData")

@sio.on("Data-fromRL")
def receive(sid, arg1):
	x = json.loads(arg1)
	print("Event: Data-toRL received: ")
	for key_name, value_item in x.items():
		print("Item: ",key_name," : ",value_item)
	sio.emit("Disconnect-RL")
	

	
if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)