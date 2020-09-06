# @package Traffic Simulation Controller
#  Documentation for the controller.
#
#  The main file that sets up the objects used for the Reinforcement Algorithm.
from __future__ import absolute_import
from __future__ import print_function
import base64
import os
import subprocess
from shutil import copyfile
from Sim_Testing.TestSimulation import Simulation
from Common.Visualize import Visualization
from Common.Utilities import import_test_configuration, set_sumo, set_test_path
from Common.Model import TestModel
from Common.VehicleGenerator import VehicleGenerator, MockGenerator, RealWorldGenerator
# from MongoConnection import MongoDBConnect

# The entry point of the file.
#
#  Once the file is executed it will run from this point.
if __name__ == "__main__":

    # Configuration object used to setup simulation properties.
    config = import_test_configuration(config_file='Settings/TestSettings.ini')

    # Sumo cmd object passed to the Simulation object.
    sumo_cmd = set_sumo(
        config['gui'], config['sumocfg_file_name'])

    model_path, plot_path = set_test_path(
        config['models_path_name'], config['model_to_test'])

    Model = TestModel(
        config['num_states'],
        model_path
    )

    if config['use_mock_traffic']:
        TrafficGen = MockGenerator(
            # config['max_steps'],
            # config['n_cars_generated']
        )
    else:
        TrafficGen = RealWorldGenerator(
            config['max_steps'],
            config['n_cars_generated']
        )

    if config['use_automatic_controller']:
        plot_path = 'Display_Data/Automatic'
    else:
        plot_path = 'Display_Data/Manual'
    
    # Visualization object created to export the data from the simulation.
    Visualization = Visualization(
        plot_path,
        dpi=300
    )

    # Simulation object used to run the simulation with the given configuration properties.
    Simulation = Simulation(
        Model,
        TrafficGen,
        sumo_cmd,
        config['max_steps'],
        config['green_duration'],
        config['yellow_duration'],
        config['num_states'],
        config['num_actions'],
        config['actions_file_name'],
        config['use_automatic_controller']
    )

    # database = MongoDBConnect()

    print('Simulation start...')
    # The simulation is run and the time taken to complete it is given.
    if config['use_automatic_controller']:
        simulation_time = Simulation.run_automatic()
    else:
        simulation_time = Simulation.run_manual()
    print('Simulation end...')
    print('Simulation time:', simulation_time, 's')

    # Data is saved and plotted.
    Visualization.save_data_and_plot(data=Simulation.jan_south_queue_length_episode,
                                     filename='Jan_South_Total_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    Visualization.save_data_and_plot(data=Simulation.jan_duxbury_queue_length_episode,
                                     filename='Jan_Duxbury_Total_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    
    averageQueueLength = sum(Simulation.jan_south_queue_length_episode) / len(Simulation.jan_south_queue_length_episode) 
    print("Jan_South Average queue length: ", averageQueueLength)
    averageQueueLength = sum(Simulation.jan_duxbury_queue_length_episode) / len(Simulation.jan_duxbury_queue_length_episode) 
    print("Jan_Duxbury Average queue length: ", averageQueueLength)
    # database.appendAvgLength(averageQueueLength)
    # # database.appendTotalWaitTime(Simulation.time_waiting_times)
    # database.addTotalQueueLength(Simulation.queue_length_episode)
    # Images are encoded to base64 and saved to MongoDB.
    # encoded = base64.b64encode(open('plot_Total_queue.png', 'rb').read())
    # myDict = {'Image':'plot_Total_queue.png', 'base64':encoded}
    # x = database.addOneToDB(myDict)

    # encoded = base64.b64encode(open('plot_North_queue.png', 'rb').read())
    # myDict = {'Image':'plot_North_queue.png', 'base64':encoded}
    # x = database.addOneToDB(myDict)

    # encoded = base64.b64encode(open('plot_South_queue.png', 'rb').read())
    # myDict = {'Image':'plot_South_queue.png', 'base64':encoded}
    # x = database.addOneToDB(myDict)

    # encoded = base64.b64encode(open('plot_East_queue.png', 'rb').read())
    # myDict = {'Image':'plot_East_queue.png', 'base64':encoded}
    # x = database.addOneToDB(myDict)

    # encoded = base64.b64encode(open('plot_West_queue.png', 'rb').read())
    # myDict = {'Image':'plot_West_queue.png', 'base64':encoded}
    # x = database.addOneToDB(myDict)

    # run_sumo_web_3d = subprocess.Popen(['sumo-web3d', '-c', 'Intersection Jan-South/sim_JanSouth_peak.sumocfg'])
