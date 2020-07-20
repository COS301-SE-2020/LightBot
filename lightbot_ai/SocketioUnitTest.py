import unittest
import eventlet
import socketio
import json


class UnitTest(unittest.TestCase):

	@classmethod
	def setUpClass(cls):
		cls.sio = socketio.Server()
		cls.app = socketio.WSGIApp(cls.sio)
		cls.socketID = 0


	
	def test_socket_io(self):
		self.sio.event
		def connect(sid, environ):
			print('connect ', sid)
			self.socketID = sid
			
		self.sio.event
		def disconnect(sid):
			print('disconnect ', sid)

		self.sio.on("RL Connected")
		def func1(sid):	
			print('Test: SocketIO connection')
			self.assertEqual(sid, socketID)
			self.sio.emit("Query-All-From-DB")

		self.sio.on("Data-List-fromRL")
		def func2(sid, arg1):
			y = json.loads(arg1)
			print("Test: Query all entries from MongoDB")
			self.assertTrue(type(arg1) is list)
			print(y)
			# itemNum = 0
			# for x in y:
				# itemNum += 1
				# for key_name, value_item in x.items():
					# print("Item",itemNum,"= ",key_name," : ",value_item)
				# print(" ")
			self.sio.emit("Add-One-To-DB",json.dumps({"numCars":12345,"waypoint":"north","time":"12:34"}))

		self.sio.on("Add-One-Complete")
		def func3(sid):
			print('Test: Add an entry to MongoDB')
			self.assertEqual(sid, socketID)
			self.sio.emit("Add-Many-To-DB",json.dumps([{"numCars":123,"waypoint":"north","time":"12:34"},{"numCars":456,"waypoint":"north","time":"56:78"}]))

		self.sio.on("Add-Many-Complete")
		def func4(sid):
			print('Test: Add multiple entries to MongoDB')
			self.assertEqual(sid, socketID)
			self.sio.emit("Query-All-From-DB")
			self.sio.emit("Disconnect-RL")
		
		eventlet.wsgi.server(eventlet.listen(('', 8000)), self.app)

	@classmethod
	def tearDownClass(cls):
		del cls.app
		del cls.sio


if __name__ == '__main__':
	unittest.main()