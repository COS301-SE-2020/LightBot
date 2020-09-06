# generation of all vehicles to be done in this file
import numpy as np
import math


class VehicleGenerator:
    def __init__(self):
        pass


class MockGenerator(VehicleGenerator):
    def generate_routefile(self, max_steps,n_cars_generated, episode_seed):
        np.random.seed(episode_seed)

        # traffic is distributed according a Weibull distribution in this simulation
        timings = np.random.weibull(2, self._number_cars_generated)
        timings = np.sort(timings)

        car_gen_steps = []
        min_old = math.floor(timings[1])
        max_old = math.ceil(timings[-1])
        min_new = 0
        max_new = self._max_steps
        for value in timings:
            car_gen_steps = np.append(car_gen_steps, ((
                max_new - min_new) / (max_old - min_old)) * (value - max_old) + max_new)

        car_gen_steps = np.rint(car_gen_steps)

        # print data to route file


class RealWorldGenerator(VehicleGenerator):

    def generate_routefile(self):
        pass