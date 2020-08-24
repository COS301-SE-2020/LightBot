import traci
import numpy as np
import random
import timeit
import os

# The traffic light states in jan_south_peak.net.xml
PHASE_NS_GREEN = 0  # Green State, action 0 code 00
PHASE_NS_YELLOW = 1  # Yellow State
PHASE_NSR_GREEN = 2  # Green State, action 1 code 01
PHASE_NSR_YELLOW = 3  # Yellow State
PHASE_EW_GREEN = 4  # Green State, action 2 code 10
PHASE_EW_YELLOW = 5  # Yellow State
PHASE_EWR_GREEN = 6  # Green State, action 3 code 11
PHASE_EWR_YELLOW = 7  # Yellow State

# Documentation for the Simulation class.
#
#  The main class used to interact with the simulation.


class Simulation:
    # The constructor, which stores the parameters into their respective member variable.
    #  @param self The object pointer.
    #  @param sumo_cmd CMD configuration used to start SUMO from TraCI.
    #  @param max_steps The total number of steps to simulate.
    #  @param green_duration The duration, in steps, for the Green States.
    #  @param yellow_duration The duration, in steps, for the Yellow States.
    #  @param num_states May be used later for the Tensorflow model.
    #  @param num_actions The number of Green States or actions the Tensorflow model will be able to take.
    def __init__(self, sumo_cmd, max_steps, green_duration, yellow_duration, num_states, num_actions, actions_file_name):
        self._sumo_cmd = sumo_cmd
        self._max_steps = max_steps
        self._green_duration = green_duration
        self._yellow_duration = yellow_duration
        self._num_states = num_states
        self._num_actions = num_actions
        self._actions_file_name = actions_file_name
        self._queue_length_episode = []
        self._queue_length_north = []
        self._queue_length_south = []
        self._queue_length_east = []
        self._queue_length_west = []
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

    # Documentation for the run method.
    #  @param self The object pointer.
    #
    #  The run function starts TraCI which executes the SUMO for the simulation.
    #  This is where the actions or traffic light Green States are chosen to influence the simulation.
    def run(self):
        start_time = timeit.default_timer()

        print('Starting TraCI...')
        traci.start(self._sumo_cmd)

        self._step = 0
        self._waiting_times = {}
        old_action = -1
        while self._step < self._max_steps:
            # self._simulate(1)
            # current_total_wait = self._collect_waiting_times()
            action = random.randint(0, 3)
            if self._step != 0 and old_action != action:
                self._set_yellow_phase(old_action)
                self._simulate(self._yellow_duration)
            self._set_green_phase(action)
            self._simulate(self._green_duration)
            old_action = action
            # waiting time = seconds waited by a car since the spawn in the environment, cumulated for every car in incoming lanes

        traci.close()
        print('Ending TraCI...')
        simulation_time = round(timeit.default_timer() - start_time, 1)
        with open(self._actions_file_name, 'w') as file:
            for value in self._actions_taken:
                file.write("%s\n" % value)
        return simulation_time

    # Documentation for the _simulate method.
    #  @param self The object pointer.
    #  @param steps_todo The number of steps to simulate.
    #
    #  The _simulate function initially checks if the maximum number of steps won't be reached before executing.
    #  If the maximum is not reached then traci will simulate a step with traci.simulationStep() and the queue lenght is recorded.
    def _simulate(self, steps_todo):
        if (self._step + steps_todo) >= self._max_steps:
            steps_todo = self._max_steps - self._step
        while steps_todo > 0:
            traci.simulationStep()
            self._step += 1
            steps_todo -= 1
            queue_length = self._get_queue_length()
            self._queue_length_episode.append(queue_length)

    # Documentation for the _set_yellow_phase method.
    #  @param self The object pointer.
    #  @param old_action The last Green State or action taken.
    #
    #  The _set_yellow_phase function will choose the appropriate Yellow State based on old_action.
    #  The Yellow State is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    def _set_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + \
            1  # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
        self._actions_taken.append(
            self.XML_TRAFFIC_LIGHT_YELLOW_STATES[yellow_phase_code])
        traci.trafficlight.setPhase(
            "cluster_25290891_611769793", yellow_phase_code)

    # Documentation for the _set_green_phase method.
    #  @param self The object pointer.
    #  @param action_number The new chosen Green State or action to be taken.
    #
    #  The new Green State or action is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    def _set_green_phase(self, action_number):
        """
        Activate the correct green light combination in sumo
        """
        self._actions_taken.append(
            self.XML_TRAFFIC_LIGHT_GREEN_STATES[action_number])
        if action_number == 0:
            traci.trafficlight.setPhase(
                "cluster_25290891_611769793", PHASE_NS_GREEN)
        elif action_number == 1:
            traci.trafficlight.setPhase(
                "cluster_25290891_611769793", PHASE_NSR_GREEN)
        elif action_number == 2:
            traci.trafficlight.setPhase(
                "cluster_25290891_611769793", PHASE_EW_GREEN)
        elif action_number == 3:
            traci.trafficlight.setPhase(
                "cluster_25290891_611769793", PHASE_EWR_GREEN)

    # def _collect_waiting_times(self):
    #     incoming_roads = ["road_triple_JanShobaS_toJunc", "road_double_SouthStrW_toJunc", "road_triple_JanShobaN_toJunc", "road_double_SouthStrE_toJunc"]
    #     car_list = traci.vehicle.getIDList()
    #     for car_id in car_list:
    #         wait_time = traci.vehicle.getAccumulatedWaitingTime(car_id)
    #         road_id = traci.vehicle.getRoadID(car_id)  # get the road id where the car is located
    #         if road_id in incoming_roads:  # consider only the waiting times of cars in incoming roads
    #             self._waiting_times[car_id] = wait_time
    #         else:
    #             if car_id in self._waiting_times: # a car that was tracked has cleared the intersection
    #                 del self._waiting_times[car_id]
    #     total_waiting_time = sum(self._waiting_times.values())
    #     return total_waiting_time

    # Documentation for the _get_queue_length method.
    #  @param self The object pointer.
    #
    #  The _get_queue_length will retrieve the number of cars halted, specifically in the incoming lane, using traci.edge.getLastStepHaltingNumber.
    #  The result is then appended to the appropriate list, along with keeping a running total with queue_length.
    def _get_queue_length(self):
        """
        Retrieve the number of cars with speed = 0 in every incoming lane
        """
        halt_N = traci.edge.getLastStepHaltingNumber(
            "road_triple_JanShobaN_toJunc")
        halt_S = traci.edge.getLastStepHaltingNumber(
            "road_triple_JanShobaS_toJunc")
        halt_E = traci.edge.getLastStepHaltingNumber(
            "road_double_SouthStrW_toJunc")
        halt_W = traci.edge.getLastStepHaltingNumber(
            "road_double_SouthStrE_toJunc")
        self._queue_length_north.append(halt_N)
        self._queue_length_south.append(halt_S)
        self._queue_length_east.append(halt_E)
        self._queue_length_west.append(halt_W)
        queue_length = halt_N + halt_S + halt_E + halt_W
        return queue_length

    def _get_state(self):
        state = np.zeros(self._num_states)
        cars = traci.vehicle.getIDList()

        for car_id in cars:
            lane_pos = traci.vehicle.getLanePosition(car_id)
            lane_id = traci.vehicle.getLaneID(car_id)
            lane_pos = 25 - lane_pos  # may need to change this

            if lane_pos < 2.5:
                lane_cell = 0
            elif lane_pos < 5:
                lane_cell = 1
            elif lane_pos < 7.5:
                lane_cell = 2
            elif lane_pos < 10:
                lane_cell = 3
            elif lane_pos < 12.5:
                lane_cell = 4
            elif lane_pos < 15:
                lane_cell = 5
            elif lane_pos < 17.5:
                lane_cell = 6
            elif lane_pos < 20:
                lane_cell = 7
            elif lane_pos < 22.5:
                lane_cell = 8
            elif lane_pos <= 25:
                lane_cell = 9

            if lane_id == "road_triple_JanShobaS_toJunc_0" or lane_id == "road_triple_JanShobaS_toJunc_1":
                lane_group = 0
            elif lane_id == "road_triple_JanShobaS_toJunc_2":
                lane_group = 1
            elif lane_id == "road_double_SouthStrE_toJunc_0":
                lane_group = 2
            elif lane_id == "road_double_SouthStrE_toJunc_1":
                lane_group = 3
            elif lane_id == "road_double_SouthStrW_toJunc_0":
                lane_group = 4
            elif lane_id == "road_double_SouthStrW_toJunc_1":
                lane_group = 5
            elif lane_id == "road_triple_JanShobaN_toJunc_0" or lane_id == "road_triple_JanShobaN_toJunc_1":
                lane_group = 6
            elif lane_id == "road_triple_JanShobaN_toJunc_2":
                lane_group = 7
            else:
                lane_group = -1

            if lane_group >= 1 and lane_group <= 7:
                car_position = int(str(lane_group) + str(lane_cell))
                valid_car = True
            elif lane_group == 0:
                car_position = lane_cell
                valid_car = True
            else:
                valid_car = False

            if valid_car:
                state[car_position] = 1

        return state

    @property
    def queue_length_episode(self):
        return self._queue_length_episode

    @property
    def queue_length_north(self):
        return self._queue_length_north

    @property
    def queue_length_south(self):
        return self._queue_length_south

    @property
    def queue_length_east(self):
        return self._queue_length_east

    @property
    def queue_length_west(self):
        return self._queue_length_west

    # @var _queue_length_episode
    #  a list with the combined queue length for all the incoming lanes

    # @var _queue_length_north
    #  a list of queue lenghts for the north incoming lane

    # @var _queue_length_south
    #  a list of queue lenghts for the south incoming lane

    # @var _queue_length_east
    #  a list of queue lenghts for the east incoming lane

    # @var _queue_length_west
    #  a list of queue lenghts for the west incoming lane

    # @var _actions_taken
    #  a list of all actions taken during the simulation

    # @var XML_TRAFFIC_LIGHT_GREEN_STATES
    #  a constant list of all possible Green States

    # @var XML_TRAFFIC_LIGHT_YELLOW_STATES
    #  a constant list of all possible States