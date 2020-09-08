# generation of all vehicles to be done in this file
import numpy as np
import math


class VehicleGenerator:
    def __init__(self):
        pass


class MockGenerator(VehicleGenerator):
    def generate_routefile(self, max_steps,n_cars_generated, episode_seed):
        np.random.seed(episode_seed)

        # traffic is distributed according a Weibull distribution
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

        with open("Map\Jan_Shoba_Multi_Peak.rou.xml", "a") as routes:
            print("""\n
            <vType accel="1.0" decel="4.5" id="standard_car" length="5.0" minGap="2.5" maxSpeed="25" sigma="0.5" />"""
            , file=routes)

            for car_counter, step in enumerate(car_gen_steps):
                straight_or_turn = np.random.uniform()
                if straight_or_turn < 0.75: 
                    route_straight = np.random.randint(1, 5)
                    # finish this

            print("</routes>", file=routes)


class RealWorldGenerator(VehicleGenerator):

    def generate_routefile(self):
        pass