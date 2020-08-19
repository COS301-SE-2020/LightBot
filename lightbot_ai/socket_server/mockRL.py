def objective_function(x):
	y = x
	return y
	
# param1 = 1
# param2 = 2
# param3 = 3

# optParam1 = 1
# optParam2 = 2
# optParam3 = 3
# optParam4 = 4
# optParam5 = 5

class Particle:
	def __init__(self, arg1):
		self.particleValue = arg1

	def evaluate(self, objective_function):
		self.result = objective_function(self.particleValue)
		return self.result
	
	def update_Particle_Value_1(self):
		self.particleValue = 1

	def update_Particle_Value_2(self):
		self.particleValue = 2

class PSO():
	def run(self, objective_function, arg1, optArg1, optArg2):
		swarm_particles = []
		for i in range(optArg1):
			swarm_particles.append(Particle(arg1))
		
		result = []
		for i in range(optArg2):
			for j in range(optArg1):
				swarm_particles[j].evaluate(objective_function)
			if swarm_particles[j].result >= 0:
				result.append(swarm_particles[j].result)
		return result
	
class Runner():
	def runEvaluation(self, argList):
		self.psoObject = PSO()
		return self.psoObject.run(objective_function, argList[0],argList[1],argList[2])
