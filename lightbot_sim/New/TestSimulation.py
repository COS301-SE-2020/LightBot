import traci
import numpy as np
import random
import timeit
import os

class Simulation:
    def __init__(self, sumo_cmd, max_steps):
        self._sumo_cmd = sumo_cmd
        self._max_steps = max_steps
        self._queue_length_episode = []


    def run(self):
        start_time = timeit.default_timer()

        print("Starting TraCI...")
        traci.start(self._sumo_cmd)

        self._step = 0
        self._waiting_times = {}
        while self._step < self._max_steps:
            self._simulate(1)

            # waiting time = seconds waited by a car since the spawn in the environment, cumulated for every car in incoming lanes
            current_total_wait = self._collect_waiting_times()

        traci.close()
        print("Ending TraCI...")
        simulation_time = round(timeit.default_timer() - start_time, 1)
        return simulation_time


    def _simulate(self, steps_todo):
        if (self._step + steps_todo) >= self._max_steps:
            steps_todo = self._max_steps - self._step        
        while steps_todo > 0:
            traci.simulationStep()
            self._step += 1
            steps_todo -= 1
            queue_length = self._get_queue_length() 
            self._queue_length_episode.append(queue_length)

    def _collect_waiting_times(self):

        incoming_roads = ["road_triple_JanShobaS_toJunc", "road_double_SouthStrW_toJunc", "road_triple_JanShobaN_toJunc", "road_double_SouthStrE_toJunc"]
        car_list = traci.vehicle.getIDList()
        for car_id in car_list:
            wait_time = traci.vehicle.getAccumulatedWaitingTime(car_id)
            road_id = traci.vehicle.getRoadID(car_id)  # get the road id where the car is located
            if road_id in incoming_roads:  # consider only the waiting times of cars in incoming roads
                self._waiting_times[car_id] = wait_time
            else:
                if car_id in self._waiting_times: # a car that was tracked has cleared the intersection
                    del self._waiting_times[car_id] 
        total_waiting_time = sum(self._waiting_times.values())
        return total_waiting_time

    def _get_queue_length(self):
        """
        Retrieve the number of cars with speed = 0 in every incoming lane
        """
        halt_N = traci.edge.getLastStepHaltingNumber("road_triple_JanShobaN_toJunc")
        halt_S = traci.edge.getLastStepHaltingNumber("road_triple_JanShobaS_toJunc")
        halt_E = traci.edge.getLastStepHaltingNumber("road_double_SouthStrW_toJunc")
        halt_W = traci.edge.getLastStepHaltingNumber("road_double_SouthStrE_toJunc")
        queue_length = halt_N + halt_S + halt_E + halt_W
        return queue_length

    @property
    def queue_length_episode(self):
        return self._queue_length_episode


    @property
    def reward_episode(self):
        return self._reward_episode