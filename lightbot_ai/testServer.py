import eventlet
import socketio
import json

sio = socketio.Server()
app = socketio.WSGIApp(sio)

@sio.event
## connect() function.
#
#  @param sid The socket ID.
#  @param environ The environment data.
#  Called when client connects to server.
def connect(sid, environ):
    print('connect ', sid)
	
@sio.event
## connect() function.
#
#  @param sid The socket ID.
def disconnect(sid):
    print('disconnect ', sid)



@sio.on("RL Connected")
## getDataReq() function.
#
#  @param sid The socket ID.
#  Creates dict, converted to JSON string and emitted with event: "Data-toRL".
def getDataReq(sid):	
	print("Event getDataReq received: ",sid)
	x = {"data1":"a","data2":"b"}
	y = json.dumps(x)
	sio.emit("Data-toRL",y)
	#sio.emit("getMongoDBData")

@sio.on("Data-fromRL")
## receive() function.
#
#  @param sid The socket ID.
#  @param arg1 The received JSON string.
#  Recieves and convets JSON string to a dict
def receive(sid, arg1):
	x = json.loads(arg1)
	print("Event: Data-fromRL received: ")
	for key_name, value_item in x.items():
		print("Item: ",key_name," : ",value_item)
	sio.emit("Disconnect-RL")
	

	
if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)