import socketio
import json
from Model.MongoConnection import MongoDBConnect
from mockRL import Runner


database = MongoDBConnect()
optimization = Runner()
s = socketio.Client()


# storedState = {
	# "Title": "StoredState",
	# "Intersection_1": {
		# "Online": True,
		# "Curr_Time": "07:00",
		# "Time_Step": 1000,
		# "Operation": "Optimal",
		# "Optimal_Parameters": [1, 2, 3, 1, 2, 3, 4, 5]
		# "Last_Evaluation_Results": [1.0, 1.0]
	# }
# }

@s.event
def connect():
	print('RL server connected')
	global storedState
	storedState = database.getStoredState()
	s.emit('RL Connected')

@s.event
def connect_error(arg):
	print('A connection error occurred : ',arg)

@s.event
def disconnect():
	database.deleteStoredState()
	global storedState
	database.addOneToDB(storedState)
	print('RL server disconnected')

@s.on("Disconnect-RL")
def disconnectionCommand():
	database.deleteStoredState()
	global storedState
	database.addOneToDB(storedState)
	print('RL server disconnected')
	s.disconnect()

#The functions should be chnaged and added to as needed.

# Eg.) argDict =
# {	
	# "Inter_Num" : 1,
	# "Time" : "12:00"
# }
@s.on("Set-Time")
def func1(argDict):
	global storedState
	pyDict = json.loads(argDict)
	if pyDict['Inter_Num'] == 1:
		storedState["Intersection_1"]["Curr_Time"] = pyDict['Time']
	s.emit("Notify", "Intersection "+str(pyDict['Inter_Num'])+" time was set.")

# Eg.) argDict =
# {	
	# "Inter_Num" : 1,
	# "Time_Step" : 1000
# }
@s.on("Set-Time-Step")
def func1(argDict):
	global storedState
	pyDict = json.loads(argDict)
	if pyDict['Inter_Num'] == 1:
		storedState["Intersection_1"]["Time_Step"] = pyDict['Time_Step']
	s.emit("Notify", "Intersection "+str(pyDict['Inter_Num'])+" time-step was set.")

# Eg.) argDict =
# {	
	# "Inter_Num" : 1
# }
@s.on("Intersection-Offline")
def func2(argDict):
	global storedState
	pyDict = json.loads(argDict)
	if pyDict['Inter_Num'] == 1:
		storedState["Intersection_1"]["Online"] = False
	s.emit("Notify", "Intersection "+str(pyDict['Inter_Num'])+" was set to offline.")


# Eg.) argDict = 
# {	
	# "Inter_Num" : 1
# }
@s.on("Intersection-Online")
def func3(argDict):
	global storedState
	pyDict = argDict
	storedState["Intersection_1"]["Online"] = True
	print("Intersection-Online")
	s.emit("Optimize", {
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


# Eg.) argDict =
# {	
	# "Inter_Num" : 1,
	# "Param_List": [1, 2, 3, 1, 2, 3, 4, 5]
# }
@s.on("Update-Optimal-Parameters")
def func4(argDict):
	global storedState
	pyDict = json.loads(argDict)
	if pyDict['Inter_Num'] == 1:
		storedState["Intersection_1"]["Optimal_Parameters"] = pyDict['Param_List']
	s.emit("Notify", "Intersection "+str(pyDict['Inter_Num'])+" optimization parameters updated.")

# Eg.) argDict =
# {	
	# "Inter_Num" : 1
# }
@s.on("Run-Optimization")
def func5(argDict):
	global storedState
	pyDict = json.loads(argDict)
	if pyDict['Inter_Num'] == 1:
		results = optimization.runEvaluation(storedState["Intersection_1"]["Optimal_Parameters"])
		storedState["Intersection_1"]["Last_Evaluation_Results"] = results
	# s.emit("Notify", "Intersection "+str(pyDict['Inter_Num'])+" optimization execution finished.")
	s.emit("Notify", results)

s.connect('http://localhost:8000')
s.wait()
