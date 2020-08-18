import configparser
from sumolib import checkBinary
import os
import sys

## Documentation for the import_test_configuration function.
#  @param config_file The file containing the simulation settings, eg) TestSettings.ini
#
#  The import_test_configuration function returns a dictionary of the loaded settings from config_file
def import_test_configuration(config_file):
    content = configparser.ConfigParser()
    content.read(config_file)
    config = {}
    config['gui'] = content['simulation'].getboolean('gui')
    config['max_steps'] = content['simulation'].getint('max_steps')
    config['green_duration'] = content['simulation'].getint('green_duration')
    config['yellow_duration'] = content['simulation'].getint('yellow_duration')
    config['num_states'] = content['agent'].getint('num_states')
    config['num_actions'] = content['agent'].getint('num_actions')
    config['sumocfg_file_name'] = content['dir']['sumocfg_file_name']
    return config

## Documentation for a function.
#  @param gui The boolean parameter to specific whether SUMO will open a gui for the user to view the simulation running.
#  @param sumocfg_file_name The file used by SUMO to load the simulation, eg) sim_JanSouth_peak.sumocfg
#
#  The set_sumo function will check if the environment is set for SUMO, set the sumoBinary and return sumo_cmd for traci to run SUMO.
def set_sumo(gui, sumocfg_file_name):
    if 'SUMO_HOME' in os.environ:
        tools = os.path.join(os.environ['SUMO_HOME'], 'tools')
        sys.path.append(tools)
    else:
        sys.exit("please declare environment variable 'SUMO_HOME'")
    if gui == False:
        sumoBinary = checkBinary('sumo')
    else:
        sumoBinary = checkBinary('sumo-gui')
    sumo_cmd = [sumoBinary, "-c",
                os.path.join('Intersection Jan-South', sumocfg_file_name), "--no-step-log"]
    return sumo_cmd
