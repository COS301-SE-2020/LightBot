import traci
import numpy as np
import random
import timeit
import os

# The traffic light states in jan_south_peak.net.xml
PHASE_NS_GREEN = 0  # action 0 code 00
PHASE_NS_YELLOW = 1
PHASE_NSR_GREEN = 2  # action 1 code 01
PHASE_NSR_YELLOW = 3
PHASE_EW_GREEN = 4  # action 2 code 10
PHASE_EW_YELLOW = 5
PHASE_EWR_GREEN = 6  # action 3 code 11
PHASE_EWR_YELLOW = 7

class Simulation:
    def __init__(self, sumo_cmd, max_steps, green_duration, yellow_duration, num_states, num_actions):
        self._sumo_cmd = sumo_cmd
        self._max_steps = max_steps
        self._green_duration = green_duration
        self._yellow_duration = yellow_duration
        self._num_states = num_states
        self._num_actions = num_actions
        self._queue_length_episode = []
        self._actions_taken = []
        self.XML_TRAFFIC_LIGHT_GREEN_STATES = [        
            '<phase duration="10" state="GGGrrrrrrGGGrrrrr"/>',
            '<phase duration="10"  state="rrrGrrrrrrrrGrrrr"/>',
            '<phase duration="10" state="rrrrGGGggrrrrGGGg"/>',  
            '<phase duration="10"  state="rrrrrrrGGrrrrrrrG"/>'
        ]
        self.XML_TRAFFIC_LIGHT_YELLOW_STATES = [
            '<phase duration="10" state="GGGrrrrrrGGGrrrrr"/>',
            '<phase duration="4"  state="yyyrrrrrryyyrrrrr"/>',
            '<phase duration="10"  state="rrrGrrrrrrrrGrrrr"/>',
            '<phase duration="4"  state="rrryrrrrrrrryrrrr"/>',
            '<phase duration="10" state="rrrrGGGggrrrrGGGg"/>',
            '<phase duration="4"  state="rrrryyyggrrrryyyg"/>',
            '<phase duration="10"  state="rrrrrrrGGrrrrrrrG"/>',
            '<phase duration="4"  state="rrrrrrryyrrrrrrry"/>'
        ]


    def run(self):
        start_time = timeit.default_timer()

        print("Starting TraCI...")
        traci.start(self._sumo_cmd)

        self._step = 0
        self._waiting_times = {}
        old_action = -1
        while self._step < self._max_steps:
            # self._simulate(1)
            current_total_wait = self._collect_waiting_times()
            action = random.randint(0,3)
            if self._step != 0 and old_action != action:
                self._set_yellow_phase(old_action)
                self._simulate(self._yellow_duration)
            self._set_green_phase(action)
            self._simulate(self._green_duration)
            old_action = action
            # waiting time = seconds waited by a car since the spawn in the environment, cumulated for every car in incoming lanes
            

        traci.close()
        print("Ending TraCI...")
        simulation_time = round(timeit.default_timer() - start_time, 1)
        with open('xml_actions_data.txt', "w") as file:
            for value in self._actions_taken:
                    file.write("%s\n" % value)
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

    def _set_yellow_phase(self, old_action):
        """
        Activate the correct yellow light combination in sumo
        """
        yellow_phase_code = old_action * 2 + 1 # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
        self._actions_taken.append(self.XML_TRAFFIC_LIGHT_YELLOW_STATES[yellow_phase_code])
        traci.trafficlight.setPhase("cluster_25290891_611769793", yellow_phase_code)


    def _set_green_phase(self, action_number):
        """
        Activate the correct green light combination in sumo
        """
        self._actions_taken.append(self.XML_TRAFFIC_LIGHT_GREEN_STATES[action_number])
        if action_number == 0:
            traci.trafficlight.setPhase("cluster_25290891_611769793", PHASE_NS_GREEN)
        elif action_number == 1:
            traci.trafficlight.setPhase("cluster_25290891_611769793", PHASE_NSR_GREEN)
        elif action_number == 2:
            traci.trafficlight.setPhase("cluster_25290891_611769793", PHASE_EW_GREEN)
        elif action_number == 3:
            traci.trafficlight.setPhase("cluster_25290891_611769793", PHASE_EWR_GREEN)












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