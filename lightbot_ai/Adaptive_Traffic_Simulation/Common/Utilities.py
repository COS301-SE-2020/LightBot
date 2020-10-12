import configparser
from sumolib import checkBinary
import os
import sys

# Documentation for the import_train_configuration function.
#  @param config_file The file containing the simulation settings, eg) TestSettings.ini
#
#  The import_train_configuration function returns a dictionary of the loaded settings from config_file
def import_train_configuration(config_file):
    content = configparser.ConfigParser()
    content.read(config_file)
    config = {}
    config['gui'] = content['simulation'].getboolean('gui')
    config['total_episodes'] = content['simulation'].getint('total_episodes')
    config['max_steps'] = content['simulation'].getint('max_steps')
    config['n_cars_generated'] = content['simulation'].getint('n_cars_generated')
    config['episode_seed'] = content['simulation'].getint('episode_seed')
    config['green_duration'] = content['simulation'].getint('green_duration')
    config['yellow_duration'] = content['simulation'].getint('yellow_duration')
    config['use_mock_traffic'] = content['simulation'].getboolean('use_mock_traffic')
    config['num_layers'] = content['model'].getint('num_layers')
    config['width_layers'] = content['model'].getint('width_layers')
    config['batch_size'] = content['model'].getint('batch_size')
    config['learning_rate'] = content['model'].getfloat('learning_rate')
    config['training_epochs'] = content['model'].getint('training_epochs')
    config['memory_size_min'] = content['memory'].getint('memory_size_min')
    config['memory_size_max'] = content['memory'].getint('memory_size_max')
    config['num_states'] = content['agent'].getint('num_states')
    config['num_actions'] = content['agent'].getint('num_actions')
    config['gamma'] = content['agent'].getfloat('gamma')
    config['models_path_name'] = content['dir']['models_path_name']
    config['sumocfg_file_name'] = content['dir']['sumocfg_file_name']
    return config


# Documentation for the import_test_configuration function.
#  @param config_file The file containing the simulation settings, eg) TestSettings.ini
#
#  The import_test_configuration function returns a dictionary of the loaded settings from config_file
def import_test_configuration(config_file):
    content = configparser.ConfigParser()
    content.read(config_file)
    config = {}
    config['gui'] = content['simulation'].getboolean('gui')
    config['max_steps'] = content['simulation'].getint('max_steps')
    config['n_cars_generated'] = content['simulation'].getint(
        'n_cars_generated')
    config['episode_seed'] = content['simulation'].getint('episode_seed')
    config['green_duration'] = content['simulation'].getint('green_duration')
    config['yellow_duration'] = content['simulation'].getint('yellow_duration')
    config['use_mock_traffic'] = content['simulation'].getboolean(
        'use_mock_traffic')
    config['use_automatic_controller'] = content['simulation'].getboolean(
        'use_automatic_controller')
    config['num_states'] = content['agent'].getint('num_states')
    config['num_actions'] = content['agent'].getint('num_actions')
    config['models_path_name'] = content['dir']['models_path_name']
    config['sumocfg_file_name'] = content['dir']['sumocfg_file_name']
    config['actions_file_name'] = content['dir']['actions_file_name']
    config['model_to_test'] = content['dir'].getint('model_to_test')
    return config

# Documentation for the set_sumo function.
#  @param gui The boolean parameter to specific whether SUMO will open a gui for the user to view the simulation running.
#  @param sumocfg_file_name The file used by SUMO to load the simulation, eg) sim_JanSouth_peak.sumocfg
#
#  The set_sumo function will check if the environment is set for SUMO, set the sumoBinary and return sumo_cmd for traci to run SUMO.
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
    sumo_cmd = [sumoBinary, "-c", os.path.join('Map', sumocfg_file_name), "--no-step-log", "true", "--waiting-time-memory", str(max_steps)]
    return sumo_cmd

# Documentation for the set_train_path function.
#  @param models_path_name The name of the path to place the trained model in 
#
#  The set_train_path function will set the path where the trained model's files are saved to.
def set_train_path(models_path_name):
    models_path = os.path.join(os.getcwd(), models_path_name, '')
    os.makedirs(os.path.dirname(models_path), exist_ok=True)

    dir_content = os.listdir(models_path)
    if dir_content:
        previous_versions = [int(name.split("_")[1]) for name in dir_content]
        new_version = str(max(previous_versions) + 1)
    else:
        new_version = '1'

    data_path = os.path.join(models_path, 'model_'+new_version, '')
    os.makedirs(os.path.dirname(data_path), exist_ok=True)
    return data_path


# Documentation for the set_test_path function.
#  @param models_path_name The name of the path in which the trained model is located. 
#  @prarm model_n The number of the model that should be loaded in for testing.
#  The set_train_path function will load the desired model from the specified path for testing.
def set_test_path(models_path_name, model_n):
    model_folder_path = os.path.join(
        os.getcwd(), models_path_name, 'model_'+str(model_n), '')

    if os.path.isdir(model_folder_path):
        plot_path = os.path.join(model_folder_path, 'test', '')
        os.makedirs(os.path.dirname(plot_path), exist_ok=True)
        return model_folder_path, plot_path
    else:
        sys.exit('The model number specified does not exist in the models folder')
