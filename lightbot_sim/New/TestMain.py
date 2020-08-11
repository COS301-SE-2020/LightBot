from __future__ import absolute_import
from __future__ import print_function

import os
from shutil import copyfile

from TestSimulation import Simulation
from Visualize import Visualization
from Utilities import import_test_configuration, set_sumo


if __name__ == "__main__":

    config = import_test_configuration(config_file = 'TestSettings.ini')
    sumo_cmd = set_sumo(config['gui'], config['sumocfg_file_name'], config['max_steps'])

    Visualization = Visualization(
        dpi = 300
    )
        
    Simulation = Simulation(
        sumo_cmd, 
        config['max_steps'],
        config['green_duration'],
        config['yellow_duration'],
        config['num_states'],
        config['num_actions']
    )
    print('Simulation start...')
    simulation_time = Simulation.run()
    print('Simulation end...')
    print('Simulation time:', simulation_time, 's')
    Visualization.save_data_and_plot(data = Simulation.queue_length_episode, filename = 'Total_queue', xlabel = 'Step', ylabel = 'Queue length (vehicles)')
    Visualization.save_data_and_plot(data = Simulation.queue_length_north, filename = 'North_queue', xlabel = 'Step', ylabel = 'Queue length (vehicles)')
    Visualization.save_data_and_plot(data = Simulation.queue_length_south, filename = 'South_queue', xlabel = 'Step', ylabel = 'Queue length (vehicles)')
    Visualization.save_data_and_plot(data = Simulation.queue_length_east, filename = 'East_queue', xlabel = 'Step', ylabel = 'Queue length (vehicles)')
    Visualization.save_data_and_plot(data = Simulation.queue_length_west, filename = 'West_queue', xlabel = 'Step', ylabel = 'Queue length (vehicles)')