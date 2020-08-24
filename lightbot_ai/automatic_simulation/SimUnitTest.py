from __future__ import absolute_import
from __future__ import print_function
import os
import unittest
from TestSimulation import Simulation
from Visualize import Visualization
from Utilities import import_test_configuration, set_sumo

class TestSim(unittest.TestCase):


    def setUp(self):
        self.config = import_test_configuration(config_file='UnitTestSettings.ini')
        self.sumo_cmd = set_sumo(self.config['gui'], self.config['sumocfg_file_name'])
        self.Visualization = Visualization(dpi=300)
        self.Simulation = Simulation(
                                        self.sumo_cmd,
                                        self.config['max_steps'],
                                        self.config['green_duration'],
                                        self.config['yellow_duration'],
                                        self.config['num_states'],
                                        self.config['num_actions'],
                                        self.config['actions_file_name']
                                    )
        
    def test_simulation(self):
        print('Running test_siulation...')
        simulation_time = self.Simulation.run()
        self.assertTrue(simulation_time > 0)
        self.assertEqual(len(self.Simulation.queue_length_episode), self.config['max_steps'])
        self.Visualization.save_data_and_plot(data=self.Simulation.queue_length_episode, filename='Unit_test_total_queue', xlabel='Step', ylabel='Queue length (vehicles)')
        self.assertTrue(os.path.isfile('plot_Unit_test_total_queue_data.txt'))
        self.assertTrue(os.path.isfile('plot_Unit_test_total_queue.png'))
        self.assertTrue(os.path.isfile('json_Unit_test_total_queue_data.txt'))
        self.assertTrue(os.path.isfile('unit_test_actions_taken.txt'))

    @classmethod
    def tearDownClass(self):
        os.remove('plot_Unit_test_total_queue_data.txt')
        os.remove('plot_Unit_test_total_queue.png')
        os.remove('json_Unit_test_total_queue_data.txt')
        os.remove('unit_test_actions_taken.txt')


if __name__ == '__main__':
    unittest.main()
