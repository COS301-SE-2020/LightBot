## @package Traffic Simulation Controller
#  Documentation for the controller.
#
#  The main file that sets up the objects used for the Reinforcement Algorithm.
from __future__ import absolute_import
from __future__ import print_function

import os
from shutil import copyfile

from TestSimulation import Simulation
from Visualize import Visualization
from Utilities import import_test_configuration, set_sumo

## The entry point of the file.
#
#  Once the file is executed it will run from this point.
if __name__ == "__main__":

    ## Configuration object used to setup simulation properties.
    config = import_test_configuration(config_file='TestSettings.ini')

    ## Sumo cmd object passed to the Simulation object.
    sumo_cmd = set_sumo(
        config['gui'], config['sumocfg_file_name'])

    ## Visualization object created to export the data from the simulation.
    Visualization = Visualization(
        dpi=300
    )

    ## Simulation object used to run the simulation with the given configuration properties.
    Simulation = Simulation(
        sumo_cmd,
        config['max_steps'],
        config['green_duration'],
        config['yellow_duration'],
        config['num_states'],
        config['num_actions']
    )
    print('Simulation start...')
    ## The simulation is run and the time taken to complete it is given.
    simulation_time = Simulation.run()
    print('Simulation end...')
    print('Simulation time:', simulation_time, 's')

    ## Data is saved and plotted.
    Visualization.save_data_and_plot(data=Simulation.queue_length_episode,
                                     filename='Total_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    Visualization.save_data_and_plot(data=Simulation.queue_length_north,
                                     filename='North_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    Visualization.save_data_and_plot(data=Simulation.queue_length_south,
                                     filename='South_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    Visualization.save_data_and_plot(data=Simulation.queue_length_east,
                                     filename='East_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    Visualization.save_data_and_plot(data=Simulation.queue_length_west,
                                     filename='West_queue', xlabel='Step', ylabel='Queue length (vehicles)')
