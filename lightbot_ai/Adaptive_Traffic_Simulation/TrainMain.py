# @package Traffic Simulation Controller
#  Documentation for the controller.
#
#  The main file that sets up the objects used for the Reinforcement Algorithm.
from __future__ import absolute_import
from __future__ import print_function
import base64
import os
import datetime
from shutil import copyfile
from Sim_Training.TrainSimulation import Simulation
from Common.Visualize import Visualization
from Common.Utilities import import_train_configuration, set_sumo, set_train_path
from Common.Model import TrainModel
from Common.Memory import Memory
from Common.VehicleGenerator import VehicleGenerator, MockGenerator, RealWorldGenerator
from Common.MongoConnection import MongoDBConnect



# The entry point of the file.
#
#  Once the file is executed it will run from this point.
if __name__ == "__main__":

    # Configuration object used to setup simulation properties.
    config = import_train_configuration(config_file='Settings/TrainSettings.ini')

    # Sumo cmd object passed to the Simulation object.
    sumo_cmd = set_sumo(
        config['gui'], config['sumocfg_file_name'])

    plot_path = set_train_path(config['models_path_name'])

    Model=TrainModel(
        config['num_layers'], 
        config['width_layers'], 
        config['batch_size'], 
        config['learning_rate'], 
        config['num_states'], 
        config['num_actions']
    )

    if config['use_mock_traffic']:
        TrafficGen=MockGenerator(
            config['max_steps'],
            config['n_cars_generated'],
            config['episode_seed']
        )
    else:
        TrafficGen=RealWorldGenerator()
        

    Memory = Memory(
        config['memory_size_max'], 
        config['memory_size_min']
    )
    # Visualization object created to export the data from the simulation.
    Visualization=Visualization(
        plot_path,
        dpi=300
    )

    # Simulation object used to run the simulation with the given configuration properties.
    Simulation=Simulation(
        Model,
        Memory,
        TrafficGen,
        sumo_cmd,
        config['gamma'],
        config['max_steps'],
        config['green_duration'],
        config['yellow_duration'],
        config['num_states'],
        config['num_actions'],
        config['training_epochs']
    )

    # database=MongoDBConnect()

    episode = 0
    timestamp_start = datetime.datetime.now()
    
    while episode < config['total_episodes']:
        print('\n----- Episode', str(episode+1), 'of', str(config['total_episodes']))
        epsilon = 1.0 - (episode / config['total_episodes'])  # set the epsilon for this episode according to epsilon-greedy policy
        simulation_time, training_time = Simulation.run(episode, epsilon)  # run the simulation
        print('Simulation time:', simulation_time, 's - Training time:', training_time, 's - Total:', round(simulation_time+training_time, 1), 's')
        episode += 1

    print("\n----- Start time:", timestamp_start)
    print("----- End time:", datetime.datetime.now())
    print("----- Session info saved at:", plot_path)

    Model.save_model(plot_path)

    copyfile(src='Settings/TrainSettings.ini', dst=os.path.join(plot_path, 'TrainSettings.ini'))

    # Data is saved and plotted.
    Visualization.save_data_and_plot(data=Simulation.jan_south_reward_store, filename='Jan_South_reward', xlabel='Episode', ylabel='Cumulative negative reward')
    Visualization.save_data_and_plot(data=Simulation.jan_south_cumulative_wait_store, filename='Jan_South_delay', xlabel='Episode', ylabel='Cumulative delay (s)')
    Visualization.save_data_and_plot(data=Simulation.jan_south_avg_queue_length_store, filename='Jan_South_queue', xlabel='Episode', ylabel='Average queue length (vehicles)')
    Visualization.save_data_and_plot(data=Simulation.jan_duxbury_reward_store, filename='Jan_Duxbury_reward', xlabel='Episode', ylabel='Cumulative negative reward')
    Visualization.save_data_and_plot(data=Simulation.jan_duxbury_cumulative_wait_store, filename='Jan_Duxbury_delay', xlabel='Episode', ylabel='Cumulative delay (s)')
    Visualization.save_data_and_plot(data=Simulation.jan_duxbury_avg_queue_length_store, filename='Jan_Duxbury_queue', xlabel='Episode', ylabel='Average queue length (vehicles)')

    # Visualization.save_data_and_plot(data=Simulation.queue_length_episode,
    #                                  filename='Total_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    # Visualization.save_data_and_plot(data=Simulation.queue_length_north,
    #                                  filename='North_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    # Visualization.save_data_and_plot(data=Simulation.queue_length_south,
    #                                  filename='South_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    # Visualization.save_data_and_plot(data=Simulation.queue_length_east,
    #                                  filename='East_queue', xlabel='Step', ylabel='Queue length (vehicles)')
    # Visualization.save_data_and_plot(data=Simulation.queue_length_west,
                                    #  filename='West_queue', xlabel='Step', ylabel='Queue length (vehicles)')
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
