import eventlet
import socketio
import json
import unittest
import time
import os

sio = socketio.Server()
app = socketio.WSGIApp(sio)
results = []
@sio.on("RL Connected")
def func1(sid):	
	sio.emit("Set-Time",json.dumps({"Inter_Num" : 1, "Time" : "12:00"}))
	time.sleep(1)
	sio.emit("Set-Time-Step",json.dumps({"Inter_Num" : 1,"Time_Step" : 1000}))
	time.sleep(1)
	sio.emit("Intersection-Online",{"Inter_Num" : 1})
	time.sleep(1)
	sio.emit("Update-Optimal-Parameters",json.dumps({"Inter_Num" : 1,"Param_List": [1, 2, 3, 1, 2, 3, 4, 5]}))
	time.sleep(1)
	sio.emit("Run-Optimization",json.dumps({"Inter_Num" : 1}))
	time.sleep(1)
	
@sio.on("Optimize")
def func1(sid, msg):
	global results
	results.append(msg)
	print(msg)
	if len(results) == 5:
		unittest.main()
		
@sio.on("Notify")
def func1(sid, msg):
	global results
	results.append(msg)
	print(msg)
	if len(results) == 5:
		unittest.main()

class UnitTest(unittest.TestCase):

	def test_01(self):
		global results
		self.assertEqual(results[0], "Intersection 1 time was set.")		

	def test_02(self):
		global results
		self.assertEqual(results[1], "Intersection 1 time-step was set.")
	
	def test_03(self):
		global results
		self.assertEqual(results[2], {
			'Direction_North_LN1:': "g",	
			'Direction_North_LN2:': "g",
			'Direction_North_LN3:': "g",
			'Direction_East_LN1:': "r",
			'Direction_East_LN2:': "r",
			'Direction_South_LN1:': "g",
			'Direction_South_LN2:': "g",
			'Direction_South_LN3:': "g",
			'Direction_West_LN1:': "r",
			'Direction_West_LN2:': "r"
		})
	
	def test_04(self):
		global results
		self.assertEqual(results[3], "Intersection 1 optimization parameters updated.")
	
	def test_05(self):
		global results
		self.assertEqual(results[4], [1, 1, 1])

	@classmethod
	def tearDownClass(self):
		sio.emit("Disconnect-RL")

if __name__ == "__main__":
	eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
	