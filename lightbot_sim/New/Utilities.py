import configparser
from sumolib import checkBinary
import os
import sys

def import_test_configuration(config_file):
    content = configparser.ConfigParser()
    content.read(config_file)
    config = {}
    config['gui'] = content['simulation'].getboolean('gui')
    config['max_steps'] = content['simulation'].getint('max_steps')
    config['sumocfg_file_name'] = content['dir']['sumocfg_file_name']
    return config


def set_sumo(gui, sumocfg_file_name, max_steps):
    if 'SUMO_HOME' in os.environ:
        tools = os.path.join(os.environ['SUMO_HOME'], 'tools')
        sys.path.append(tools)
    else:
        sys.exit("please declare environment variable 'SUMO_HOME'")
    if gui == False:
        sumoBinary = checkBinary('sumo')
    else:
        sumoBinary = checkBinary('sumo-gui')
    sumo_cmd = [sumoBinary, "-c", os.path.join('Intersection Jan-South', sumocfg_file_name), "--no-step-log"]
    return sumo_cmd
