import os
import sys
import optparse

#Environment variable 'SUMO_HOME' set beforehand using Linux Ubuntu command: export SUMO_HOME='/usr/share/sumo'
#Also used command whereis sumo to determine path
if 'SUMO_HOME' in os.environ:
	tools = os.path.join(os.environ['SUMO_HOME'], 'tools')
	sys.path.append(tools)
else:
	sys.exit("please declare environment variable 'SUMO_HOME'")

from sumolib import checkBinary  # Checks for the binary in environ vars

import traci

def get_options():
	opt_parser = optparse.OptionParser()
	opt_parser.add_option("--nogui", action="store_true",
						 default=False, help="run the commandline version of sumo")
	options, args = opt_parser.parse_args()
	return options


# contains TraCI control loop
def run():
	step = 0
	while traci.simulation.getMinExpectedNumber() > 0:
		traci.simulationStep()
		print(step)
		# if step == 100:
			# traci.vehicle.changeTarget("1", "e9")
			# traci.vehicle.changeTarget("3", "e9")
		
		step += 1

	traci.close()
	sys.stdout.flush()


if __name__ == "__main__":
	options = get_options()

	# check binary
	if options.nogui:
		sumoBinary = checkBinary('sumo')
	else:
		sumoBinary = checkBinary('sumo-gui')
	
	# traci starts sumo as a subprocess and then this script connects and runs    
	# traci.start([sumoBinary, "-c", "demo.sumocfg", "--tripinfo-output", "tripinfo.xml"])
	
	traci.init(55555)
	traci.setOrder(2) # number can be anything as long as each client gets its own number
	
	run()