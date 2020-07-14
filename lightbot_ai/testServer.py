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
def func1(sid):	
	sio.emit("Query-All-From-DB")

@sio.on("Data-List-fromRL")
def func2(sid, arg1):
	y = json.loads(arg1)
	print("Event: Data-fromRL received: ")
	itemNum = 1
	for x in y:
		for key_name, value_item in x.items():
			print("Item",itemNum,": ",key_name," : ",value_item)
		itemNum += 1
		print(" ")
	sio.emit("Add-One-To-DB",json.dumps({"numCars":13,"waypoint":"south","time":"03:00"}))

@sio.on("Add-One-Complete")
def func3(sid):
	sio.emit("Add-Many-To-DB",json.dumps([{"numCars":13,"waypoint":"south","time":"03:00"},{"numCars":13,"waypoint":"south","time":"03:00"}]))

@sio.on("Add-Many-Complete")
def func4(sid):
	sio.emit("Query-All-From-DB")
	sio.emit("Disconnect-RL")


if __name__ == '__main__':
	eventlet.wsgi.server(eventlet.listen(('', 8000)), app)