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
    def __init__(self, Model, TrafficGen, sumo_cmd, max_steps, green_duration, yellow_duration, num_states, num_actions, actions_file_name, use_automatic_controller):
        self._Model = Model
        self._TrafficGen = TrafficGen
        self._sumo_cmd = sumo_cmd
        self._max_steps = max_steps
        self._green_duration = green_duration
        self._yellow_duration = yellow_duration
        self._num_states = num_states
        self._num_actions = num_actions
        self._actions_file_name = actions_file_name
        self._use_automatic_controller = use_automatic_controller
        self._jan_south_reward_episode = []
        self._jan_duxbury_reward_episode = []
        # self._reward_episode = []
        # self._queue_length_episode = []
        self._jan_south_queue_length_episode = []
        self._jan_duxbury_queue_length_episode = []
        # self._actions_taken = []
        self._jan_south_actions_taken = []
        self._jan_duxbury_actions_taken = []
        self._total_waiting_time = 0
        # JanShoba_Duxbury_tl_=_cluster_2516980595_2516980597_25290876_611769785
        self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_GREEN_STATES = [
            '<phase duration="27" state="rrrrGGrrrrGGGr"/>',
            '<phase duration="6"  state="rrrrrrGrrrrrrG"/>',
            '<phase duration="27" state="GGrrrrrGGgrrrr"/>',
            '<phase duration="6"  state="rrGGrrrrrGrrrr"/>'
        ]
        self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_ALL_STATES = [
            '<phase duration="27" state="rrrrGGrrrrGGGr"/>',
            '<phase duration="6"  state="rrrryyrrrryyyr"/>',
            '<phase duration="6"  state="rrrrrrGrrrrrrG"/>',
            '<phase duration="6"  state="rrrrrryrrrrrry"/>',
            '<phase duration="27" state="GGrrrrrGGgrrrr"/>',
            '<phase duration="6"  state="yyrrrrryygrrrr"/>',
            '<phase duration="6"  state="rrGGrrrrrGrrrr"/>',
            '<phase duration="6"  state="rryyrrrrryrrrr"/>'
        ]
        # JanShoba_South_tl_=_cluster_25290891_611769793
        self.JanShoba_South_XML_TRAFFIC_LIGHT_GREEN_STATES = [
            '<phase duration="10" state="GGGrrrrrrGGGrrrrr"/>',
            '<phase duration="10"  state="rrrGrrrrrrrrGrrrr"/>',
            '<phase duration="10" state="rrrrGGGggrrrrGGGg"/>',
            '<phase duration="10"  state="rrrrrrrGGrrrrrrrG"/>'
        ]
        self.JanShoba_South_XML_TRAFFIC_LIGHT_ALL_STATES = [
            '<phase duration="10" state="GGGrrrrrrGGGrrrrr"/>',
            '<phase duration="4"  state="yyyrrrrrryyyrrrrr"/>',
            '<phase duration="10"  state="rrrGrrrrrrrrGrrrr"/>',
            '<phase duration="4"  state="rrryrrrrrrrryrrrr"/>',
            '<phase duration="10" state="rrrrGGGggrrrrGGGg"/>',
            '<phase duration="4"  state="rrrryyyggrrrryyyg"/>', #  Check this state
            '<phase duration="10"  state="rrrrrrrGGrrrrrrrG"/>',
            '<phase duration="4"  state="rrrrrrryyrrrrrrry"/>'
        ]

    # Documentation for the run method.
    #  @param self The object pointer.
    #
    #  The run function starts TraCI which executes the SUMO for the simulation.
    #  This is where the actions or traffic light Green States are chosen to influence the simulation.
    def run_automatic(self):
        start_time = timeit.default_timer()

        self._TrafficGen.generate_routefile()
        print('Starting TraCI...')
        traci.start(self._sumo_cmd)

        self._step = 0

        # self._waiting_times = {}
        # old_total_wait = 0
        self._jan_south_waiting_times = {}
        jan_south_old_total_wait = 0
        self._jan_duxbury_waiting_times = {}
        jan_duxbury_old_total_wait = 0

        # old_action = -1
        jan_south_old_action = -1
        jan_duxbury_old_action = -1

        jan_south_yellow_state_steps_todo = 0
        jan_south_green_state_steps_todo = 0
        jan_duxbury_yellow_state_steps_todo = 0
        jan_duxbury_green_state_steps_todo = 0
        jan_south_current_total_wait = 0
        jan_duxbury_current_total_wait = 0
        jan_south_reward = 0 
        jan_duxbury_reward = 0
        jan_south_action = 0
        jan_duxbury_action = 0

        while self._step < self._max_steps:
            # current_state = self._get_state()
            # current_total_wait = self._collect_waiting_times()
            # reward = old_total_wait - current_total_wait
            # action = self._choose_action(current_state)
            # if self._step != 0 and old_action != action:
            #     self._set_yellow_phase(old_action)
            #     self._simulate(self._yellow_duration)
            # self._set_green_phase(action)
            # self._simulate(self._green_duration)
            if jan_south_yellow_state_steps_todo == 0 and jan_south_green_state_steps_todo == 0:
                jan_south_current_sim_state = self._get_jan_south_sim_state()
                jan_south_current_total_wait = self._collect_jan_south_waiting_times()
                jan_south_reward = jan_south_old_total_wait - jan_south_current_total_wait
                jan_south_action = self._choose_action(jan_south_current_sim_state)
                # print("Jan South action: ",jan_south_action)
                if self._step != 0 and jan_south_old_action != jan_south_action:
                    self._set_jan_south_yellow_phase(jan_south_old_action)
                    jan_south_yellow_state_steps_todo = self._yellow_duration
                    # print("Jan South yellow todo set")
                self._set_jan_south_green_phase(jan_south_action)
                jan_south_green_state_steps_todo = self._green_duration
                # print("Jan South green todo set")

            if jan_duxbury_yellow_state_steps_todo == 0 and jan_duxbury_green_state_steps_todo == 0:
                jan_duxbury_current_sim_state = self._get_jan_duxbury_sim_state()
                jan_duxbury_current_total_wait = self._collect_jan_duxbury_waiting_times()
                jan_duxbury_reward = jan_duxbury_old_total_wait - jan_duxbury_current_total_wait
                jan_duxbury_action = self._choose_action(jan_duxbury_current_sim_state)
                # print("Jan duxbury action: ",jan_duxbury_action)
                if self._step != 0 and jan_duxbury_old_action != jan_duxbury_action:
                    self._set_jan_duxbury_yellow_phase(jan_duxbury_old_action)
                    jan_duxbury_yellow_state_steps_todo = self._yellow_duration
                    # print("Jan Duxbury yellow todo set")
                self._set_jan_duxbury_green_phase(jan_duxbury_action)
                jan_duxbury_green_state_steps_todo = self._green_duration
                # print("Jan Duxbury green todo set")

            # if (self._step + steps_todo) >= self._max_steps: # don't think we need this anymore
            #     steps_todo = self._max_steps - self._step
            # while steps_todo > 0:
            #     traci.simulationStep()
            #     self._step += 1
            #     steps_todo -= 1
            #     queue_length = self._get_queue_length()#!!!Might need to put this outside the while loop, might give more accurate results!!!
            #     self._queue_length_episode.append(queue_length)

            # lol, please check logic below, please...
            if (self._step < self._max_steps) and (jan_south_yellow_state_steps_todo > 0 or jan_south_green_state_steps_todo > 0 or jan_duxbury_yellow_state_steps_todo > 0 or jan_duxbury_green_state_steps_todo > 0):
                traci.simulationStep()
                self._step += 1
                # queue_length = self._get_queue_length()
                # self._queue_length_episode.append(queue_length)

                jan_south_queue_length = self._get_jan_south_queue_length()
                self._jan_south_queue_length_episode.append(jan_south_queue_length)
                jan_duxbury_queue_length = self._get_jan_duxbury_queue_length()
                self._jan_duxbury_queue_length_episode.append(jan_duxbury_queue_length)

                if jan_south_yellow_state_steps_todo > 0:
                    jan_south_yellow_state_steps_todo -= 1
                    # print("Jan South yellow todo Decreased")
                else:
                    jan_south_green_state_steps_todo -= 1
                    # print("Jan South green todo Decreased")

                if jan_duxbury_yellow_state_steps_todo > 0:
                    jan_duxbury_yellow_state_steps_todo -= 1
                    # print("Jan Duxbury yellow todo Decreased")
                else:
                    jan_duxbury_green_state_steps_todo -= 1
                #     print("Jan Duxbury green todo Decreased")
                # print("jan_south_yellow_state_steps_todo: ",jan_south_yellow_state_steps_todo)
                # print("jan_south_green_state_steps_todo: ",jan_south_green_state_steps_todo)
                # print("jan_duxbury_yellow_state_steps_todo: ",jan_duxbury_yellow_state_steps_todo)
                # print("jan_duxbury_green_state_steps_todo: ",jan_duxbury_green_state_steps_todo)
                

            # old_action = action
            jan_south_old_action = jan_south_action
            jan_duxbury_old_action = jan_duxbury_action

            # old_total_wait = current_total_wait
            # self._reward_episode.append(reward)
            jan_south_old_total_wait = jan_south_current_total_wait
            self._jan_south_reward_episode.append(jan_south_reward)
            jan_duxbury_old_total_wait = jan_duxbury_current_total_wait
            self._jan_duxbury_reward_episode.append(jan_duxbury_reward)
        # print("Waiting time: " + str(self._collect_waiting_times()))
        # self._total_waiting_time = self._collect_waiting_times() # didn't work
        traci.close()
        print('Ending TraCI...')
        simulation_time = round(timeit.default_timer() - start_time, 1)
        with open('Display_Data/Automatic/jan_south_Actions_Taken.xml', 'w') as file:
            for value in self._jan_south_actions_taken:
                file.write("%s\n" % value)
        with open('Display_Data/Automatic/jan_duxbury_Actions_Taken.xml', 'w') as file:
            for value in self._jan_south_actions_taken:
                file.write("%s\n" % value)
        return simulation_time

    def run_manual(self):
        start_time = timeit.default_timer()
        self._TrafficGen.generate_routefile()
        print('Starting TraCI...')
        traci.start(self._sumo_cmd)

        self._step = 0
        self._waiting_times = {}
        while self._step < self._max_steps:
            self._simulate(1) #Should try pass the manual times to the method call.
            # current_total_wait = self._collect_waiting_times()
            # waiting time = seconds waited by a car since the spawn in the environment, cumulated for every car in incoming lanes

        traci.close()
        print('Ending TraCI...')
        simulation_time = round(timeit.default_timer() - start_time, 1)
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
            jan_south_queue_length = self._get_jan_south_queue_length()
            self._jan_south_queue_length_episode.append(jan_south_queue_length)
            jan_duxbury_queue_length = self._get_jan_duxbury_queue_length()
            self._jan_duxbury_queue_length_episode.append(jan_duxbury_queue_length)

    # Documentation for the _set_yellow_phase method.
    #  @param self The object pointer.
    #  @param old_action The last Green State or action taken.
    #
    #  The _set_yellow_phase function will choose the appropriate Yellow State based on old_action.
    #  The Yellow State is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    def _set_jan_south_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + \
            1  # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
        self._jan_south_actions_taken.append(
            self.JanShoba_South_XML_TRAFFIC_LIGHT_ALL_STATES[yellow_phase_code])
        traci.trafficlight.setPhase(
            "cluster_25290891_611769793", yellow_phase_code)

    def _set_jan_duxbury_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + \
            1  # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
        self._jan_duxbury_actions_taken.append(
            self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_ALL_STATES[yellow_phase_code])
        traci.trafficlight.setPhase(
            "cluster_2516980595_2516980597_25290876_611769785", yellow_phase_code)

    # Documentation for the _set_green_phase method.
    #  @param self The object pointer.
    #  @param action_number The new chosen Green State or action to be taken.
    #
    #  The new Green State or action is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    def _set_jan_south_green_phase(self, action_number):
        self._jan_south_actions_taken.append(
            self.JanShoba_South_XML_TRAFFIC_LIGHT_GREEN_STATES[action_number])
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

    def _set_jan_duxbury_green_phase(self, action_number):
        self._jan_duxbury_actions_taken.append(
            self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_GREEN_STATES[action_number])
        if action_number == 0:
            traci.trafficlight.setPhase(
                "cluster_2516980595_2516980597_25290876_611769785", PHASE_NS_GREEN)
        elif action_number == 1:
            traci.trafficlight.setPhase(
                "cluster_2516980595_2516980597_25290876_611769785", PHASE_NSR_GREEN)
        elif action_number == 2:
            traci.trafficlight.setPhase(
                "cluster_2516980595_2516980597_25290876_611769785", PHASE_EW_GREEN)
        elif action_number == 3:
            traci.trafficlight.setPhase(
                "cluster_2516980595_2516980597_25290876_611769785", PHASE_EWR_GREEN)

    def _collect_jan_south_waiting_times(self):
        incoming_roads = ["rd6_JanShoba_tl_n", "rd2_South_dl_e", "rd3_JanShoba_tl_s", "rd2_South_dl_w"]
        car_list = traci.vehicle.getIDList()
        for car_id in car_list:
            wait_time = traci.vehicle.getAccumulatedWaitingTime(car_id)
            road_id = traci.vehicle.getRoadID(car_id)  # get the road id where the car is located
            if road_id in incoming_roads:  # consider only the waiting times of cars in incoming roads
                self._jan_south_waiting_times[car_id] = wait_time
            else:
                if car_id in self._jan_south_waiting_times: # a car that was tracked has cleared the intersection
                    del self._jan_south_waiting_times[car_id]
        total_waiting_time = sum(self._jan_south_waiting_times.values())
        return total_waiting_time

    def _collect_jan_duxbury_waiting_times(self):
        incoming_roads = ["rd4_JanShoba_ql_n", "rd2_Duxbury_dl_e", "rd6_JanShoba_tl_s", "rd1_Duxbury_ql_w"]
        car_list = traci.vehicle.getIDList()
        for car_id in car_list:
            wait_time = traci.vehicle.getAccumulatedWaitingTime(car_id)
            road_id = traci.vehicle.getRoadID(car_id)  # get the road id where the car is located
            if road_id in incoming_roads:  # consider only the waiting times of cars in incoming roads
                self._jan_duxbury_waiting_times[car_id] = wait_time
            else:
                if car_id in self._jan_duxbury_waiting_times: # a car that was tracked has cleared the intersection
                    del self._jan_duxbury_waiting_times[car_id]
        total_waiting_time = sum(self._jan_duxbury_waiting_times.values())
        return total_waiting_time

    def _choose_action(self, state):
        return np.argmax(self._Model.predict_one(state))
    # def _choose_jan_south_action(self, state):
    #     return np.argmax(self._Model.predict_one(state))
    
    # def _choose_jan_duxbury_action(self, state):
    #     return np.argmax(self._Model.predict_one(state))

    # Documentation for the _get_queue_length method.
    #  @param self The object pointer.
    #
    #  The _get_queue_length will retrieve the number of cars halted, specifically in the incoming lane, using traci.edge.getLastStepHaltingNumber.
    #  The result is then appended to the appropriate list, along with keeping a running total with queue_length.
    def _get_jan_south_queue_length(self):
        halt_N = traci.edge.getLastStepHaltingNumber(
            "rd6_JanShoba_tl_n")
        halt_S = traci.edge.getLastStepHaltingNumber(
            "rd3_JanShoba_tl_s")
        halt_E = traci.edge.getLastStepHaltingNumber(
            "rd2_South_dl_e")
        halt_W = traci.edge.getLastStepHaltingNumber(
            "rd2_South_dl_w")
        queue_length = halt_N + halt_S + halt_E + halt_W
        return queue_length

    def _get_jan_duxbury_queue_length(self):
        halt_N = traci.edge.getLastStepHaltingNumber(
            "rd4_JanShoba_ql_n")
        halt_S = traci.edge.getLastStepHaltingNumber(
            "rd6_JanShoba_tl_s")
        halt_E = traci.edge.getLastStepHaltingNumber(
            "rd2_Duxbury_dl_e")
        halt_W = traci.edge.getLastStepHaltingNumber(
            "rd1_Duxbury_ql_w")
        queue_length = halt_N + halt_S + halt_E + halt_W
        return queue_length

    def _get_jan_south_sim_state(self):
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

            if lane_id == "rd3_JanShoba_tl_s_0" or lane_id == "rd3_JanShoba_tl_s_1":
                lane_group = 0
            elif lane_id == "rd3_JanShoba_tl_s_2":
                lane_group = 1
            elif lane_id == "rd2_South_dl_e_0":
                lane_group = 2
            elif lane_id == "rd2_South_dl_e_1":
                lane_group = 3
            elif lane_id == "rd2_South_dl_w_0":
                lane_group = 4
            elif lane_id == "rd2_South_dl_w_1":
                lane_group = 5
            elif lane_id == "rd6_JanShoba_tl_n_0" or lane_id == "rd6_JanShoba_tl_n_1":
                lane_group = 6
            elif lane_id == "rd6_JanShoba_tl_n_2":
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

    def _get_jan_duxbury_sim_state(self):
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

            if lane_id == "rd6_JanShoba_tl_s_0" or lane_id == "rd6_JanShoba_tl_s_1":
                lane_group = 0
            elif lane_id == "rd6_JanShoba_tl_s_2":
                lane_group = 1
            elif lane_id == "rd2_Duxbury_dl_e_0":
                lane_group = 2
            elif lane_id == "rd2_Duxbury_dl_e_1":
                lane_group = 3
            elif lane_id == "rd1_Duxbury_ql_w_0" or lane_id == "rd1_Duxbury_ql_w_1":
                lane_group = 4
            elif lane_id == "rd1_Duxbury_ql_w_2" or lane_id == "rd1_Duxbury_ql_w_3":
                lane_group = 5
            elif lane_id == "rd4_JanShoba_ql_n_0" or lane_id == "rd4_JanShoba_ql_n_1" or lane_id == "rd4_JanShoba_ql_n_2":
                lane_group = 6
            elif lane_id == "rd4_JanShoba_ql_n_3":
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
    def jan_south_queue_length_episode(self):
        return self._jan_south_queue_length_episode

    @property
    def jan_duxbury_queue_length_episode(self):
        return self._jan_duxbury_queue_length_episode

    @property
    def jan_south_reward_episode(self):
        return self._jan_south_reward_episode

    @property
    def jan_duxbury_reward_episode(self):
        return self._jan_duxbury_reward_episode

    @property
    def jan_south_time_waiting_times(self):
        return self._jan_south_total_waiting_time

    @property
    def jan_duxbury_time_waiting_times(self):
        return self._jan_duxbury_total_waiting_time

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

    # @var XML_TRAFFIC_LIGHT_ALL_STATES
    #  a constant list of all possible States
