import eventlet
import socketio
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
	sio.emit("Data-toRL",{'data': 'foobar'})

# @sio.on("Data-fromRL")
# def receive(arg1, arg2):
	# print(arg1)
	# sio.emit('getMongoDBData')
	

	
if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)