from __future__ import absolute_import
from __future__ import print_function
import os
import unittest
from Sim_Testing.TestSimulation import Simulation
from Common.Visualize import Visualization
from Common.Utilities import import_test_configuration, set_sumo, set_test_path
from Common.Model import TestModel
from Common.VehicleGenerator import VehicleGenerator, MockGenerator, RealWorldGenerator

class TestSim(unittest.TestCase):
    def setUp(self):
        self.config = import_test_configuration(config_file='Settings/UnitTestSettings.ini')
        self.sumo_cmd = set_sumo(self.config['gui'], self.config['sumocfg_file_name'], self.config['max_steps'])
        
        self.model_path_south, self.plot_path = set_test_path(
            self.config['models_path_name'] + "/South", self.config['model_to_test'])

        self.model_path_duxbury, self.plot_path = set_test_path(
            self.config['models_path_name'] + "/Duxbury", self.config['model_to_test'])
        
        self.Model_South = TestModel(
            self.config['num_states'],
            self.model_path_south
        )
    
        self.Model_Duxbury = TestModel(
            self.config['num_states'],
            self.model_path_duxbury
        )


        self.TrafficGen = MockGenerator(
            self.config['max_steps'],
            self.config['n_cars_generated'],
            self.config['episode_seed']
        )

        self.Simulation = Simulation(
            self.Model_South,
            self.Model_Duxbury,
            self.TrafficGen,
            self.sumo_cmd,
            self.config['max_steps'],
            self.config['green_duration'],
            self.config['yellow_duration'],
            self.config['num_states'],
            self.config['num_actions'],
            self.config['actions_file_name'],
            self.config['use_automatic_controller']
        )
        
        self.plot_path = 'Display_Data/Automatic'
        
    def test_simulation(self):
        print('Running Tests...')
        self.simulation_time = self.Simulation.run_automatic()
        self.assertTrue(self.simulation_time > 0)
        self.assertEqual(len(self.Simulation.jan_south_queue_length_episode), self.config['max_steps'])
        self.assertEqual(len(self.Simulation.jan_duxbury_queue_length_episode), self.config['max_steps'])
        self.assertEqual(len(self.Simulation.jan_south_time_waiting), self.config['max_steps'])
        self.assertEqual(len(self.Simulation.jan_duxbury_time_waiting), self.config['max_steps'])
        self.assertEqual(len(self.Simulation.total_fuel_consumption), self.config['max_steps'])
        self.assertEqual(len(self.Simulation.total_co2_emission), self.config['max_steps'])
        self.assertTrue(os.path.isfile('Display_Data/Automatic/jan_south_Actions_Taken.xml'))
        self.assertTrue(os.path.isfile('Display_Data/Automatic/jan_duxbury_Actions_Taken.xml'))
        print('Tests Finished')

    @classmethod
    def tearDownClass(self):
        os.remove('Display_Data/Automatic/jan_south_Actions_Taken.xml')
        os.remove('Display_Data/Automatic/jan_duxbury_Actions_Taken.xml')


if __name__ == '__main__':
    unittest.main()
