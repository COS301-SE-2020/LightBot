#Note testServer.py needs to be manually stopped from listening
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
	sio.emit("Set-Time",json.dumps({"Inter_Num" : 1, "Time" : "12:00"}))
	sio.emit("Set-Time-Step",json.dumps({"Inter_Num" : 1,"Time_Step" : 1000}))
	sio.emit("Update-Optimal-Parameters",json.dumps({"Inter_Num" : 1,"Param_List": [1, 2, 3, 1, 2, 3, 4, 5]}))
	sio.emit("Run-Optimization",json.dumps({"Inter_Num" : 1}))


@sio.on("Notify")
def func4(sid, msg):
	print(msg)


if __name__ == '__main__':
	eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
	