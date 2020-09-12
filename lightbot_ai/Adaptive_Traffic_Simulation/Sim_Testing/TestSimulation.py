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
        # self._reward_episode = []
        # self._queue_length_episode = []
        self._jan_south_queue_length_episode = []
        self._jan_duxbury_queue_length_episode = []
        # added these:
        self._jan_south_wait_time_episode = []
        self._jan_duxbury_wait_time_episode = []
        self._total_fuel_consumption_episode = []
        self._total_co2_emission_episode = []
        # self._actions_taken = []
        self._jan_south_actions_taken = []
        self._jan_duxbury_actions_taken = []
        # JanShoba_Duxbury_tl_=_cluster_2516980595_2516980597_25290876_611769785
        self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_GREEN_STATES = [
            '<phase duration="27" state="rrrrGGrrrrGGGr"/>',
            '<phase duration="12"  state="rrrrrrGrrrrrrG"/>',
            '<phase duration="27" state="GGrrrrrGGgrrrr"/>',
            '<phase duration="27"  state="rrGGrrrrrGrrrr"/>'
        ]
        self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_ALL_STATES = [
            '<phase duration="27" state="rrrrGGrrrrGGGr"/>',
            '<phase duration="6"  state="rrrryyrrrryyyr"/>',
            '<phase duration="12"  state="rrrrrrGrrrrrrG"/>',
            '<phase duration="6"  state="rrrrrryrrrrrry"/>',
            '<phase duration="27" state="GGrrrrrGGgrrrr"/>',
            '<phase duration="12"  state="yyrrrrryyyrrrr"/>',
            '<phase duration="27"  state="rrGGrrrrrGrrrr"/>',
            '<phase duration="6"  state="rryyrrrrryrrrr"/>'
        ]
        # JanShoba_South_tl_=_cluster_25290891_611769793
        self.JanShoba_South_XML_TRAFFIC_LIGHT_GREEN_STATES = [
            '<phase duration="27" state="GGGrrrrrrGGGrrrrrr"/>',
            '<phase duration="12"  state="rrrGGrrrrrrrGGrrrr"/>',
            '<phase duration="27" state="rrrrrGGggrrrrrGGgg"/>',
            '<phase duration="12"  state="rrrrrrrGGrrrrrrrGG"/>'
        ]
        self.JanShoba_South_XML_TRAFFIC_LIGHT_ALL_STATES = [
            '<phase duration="27" state="GGGrrrrrrGGGrrrrrr"/>',
            '<phase duration="6"  state="yyyrrrrrryyyrrrrrr"/>',
            '<phase duration="12"  state="rrrGGrrrrrrrGGrrrr"/>',
            '<phase duration="6"  state="rrryyrrrrrrryyrrrr"/>',
            '<phase duration="27" state="rrrrrGGggrrrrrGGgg"/>',
            '<phase duration="6"  state="rrrrryyyyrrrrryyyy"/>',
            '<phase duration="12"  state="rrrrrrrGGrrrrrrrGG"/>',
            '<phase duration="6"  state="rrrrrrryyrrrrrrryy"/>'
        ]
        self.Jan_Duxbury_XML_GREEN_TIMES = [27,12,27,27]
        self.Jan_Duxbury_XML_ALL_TIMES = [27,6,12,6,27,12,27,6]
        self.Jan_South_XML_GREEN_TIMES = [27,12,27,12]
        self.Jan_South_XML_ALL_TIMES = [27,6,12,6,27,6,12,6]

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
        jan_south_old_action = -1
        jan_duxbury_old_action = -1

        jan_south_yellow_state_steps_todo = 0
        jan_south_green_state_steps_todo = 0
        jan_duxbury_yellow_state_steps_todo = 0
        jan_duxbury_green_state_steps_todo = 0
        jan_south_action = 0
        jan_duxbury_action = 0

        while traci.simulation.getMinExpectedNumber() > 0:
            if jan_south_yellow_state_steps_todo == 0 and jan_south_green_state_steps_todo == 0:
                jan_south_current_sim_state = self._get_jan_south_sim_state()
                jan_south_action = self._choose_action(jan_south_current_sim_state)
                if self._step != 0 and jan_south_old_action != jan_south_action:
                    self._set_jan_south_yellow_phase(jan_south_old_action)
                    jan_south_yellow_state_steps_todo = self.Jan_South_XML_ALL_TIMES[jan_south_old_action * 2 + 1]
                    self._jan_south_actions_taken.append(self.JanShoba_South_XML_TRAFFIC_LIGHT_ALL_STATES[jan_south_old_action * 2 + 1])
                self._jan_south_actions_taken.append(self.JanShoba_South_XML_TRAFFIC_LIGHT_GREEN_STATES[jan_south_action])               
                jan_south_green_state_steps_todo = self.Jan_South_XML_GREEN_TIMES[jan_south_action]
                x = self.Jan_South_XML_GREEN_TIMES[jan_south_action]

            if jan_south_yellow_state_steps_todo == 0 and jan_south_green_state_steps_todo == x:
                self._set_jan_south_green_phase(jan_south_action)

            if jan_duxbury_yellow_state_steps_todo == 0 and jan_duxbury_green_state_steps_todo == 0:
                jan_duxbury_current_sim_state = self._get_jan_duxbury_sim_state()
                jan_duxbury_action = self._choose_action(jan_duxbury_current_sim_state)
                if self._step != 0 and jan_duxbury_old_action != jan_duxbury_action:
                    self._set_jan_duxbury_yellow_phase(jan_duxbury_old_action)
                    jan_duxbury_yellow_state_steps_todo = self.Jan_Duxbury_XML_ALL_TIMES[jan_duxbury_old_action * 2 + 1]
                    self._jan_duxbury_actions_taken.append(self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_ALL_STATES[jan_duxbury_old_action * 2 + 1])
                self._jan_duxbury_actions_taken.append(self.JanShoba_Duxbury_XML_TRAFFIC_LIGHT_GREEN_STATES[jan_duxbury_action])
                jan_duxbury_green_state_steps_todo = self.Jan_Duxbury_XML_GREEN_TIMES[jan_duxbury_action]
                y = self.Jan_Duxbury_XML_GREEN_TIMES[jan_duxbury_action]

            if jan_duxbury_yellow_state_steps_todo == 0 and jan_duxbury_green_state_steps_todo == y:
                self._set_jan_duxbury_green_phase(jan_duxbury_action) 

            if (traci.simulation.getMinExpectedNumber() > 0) and (jan_south_yellow_state_steps_todo > 0 or jan_south_green_state_steps_todo > 0 or jan_duxbury_yellow_state_steps_todo > 0 or jan_duxbury_green_state_steps_todo > 0):
                traci.simulationStep()
                self._step += 1
                jan_south_queue_length = self._get_jan_south_queue_length()
                self._jan_south_queue_length_episode.append(jan_south_queue_length)
                jan_duxbury_queue_length = self._get_jan_duxbury_queue_length()
                self._jan_duxbury_queue_length_episode.append(jan_duxbury_queue_length)
                self._collect_jan_duxbury_waiting_times()
                self._collect_jan_south_waiting_times()
                self._collect_fuel_consumption()
                self._collect_co2_emission()

                if jan_south_yellow_state_steps_todo > 0:
                    jan_south_yellow_state_steps_todo -= 1
                else:
                    jan_south_green_state_steps_todo -= 1

                if jan_duxbury_yellow_state_steps_todo > 0:
                    jan_duxbury_yellow_state_steps_todo -= 1
                else:
                    jan_duxbury_green_state_steps_todo -= 1

            if jan_south_yellow_state_steps_todo == 0 and jan_south_green_state_steps_todo == 0:    
                jan_south_old_action = jan_south_action

            if jan_duxbury_yellow_state_steps_todo == 0 and jan_duxbury_green_state_steps_todo == 0:
                jan_duxbury_old_action = jan_duxbury_action
        
        traci.close()
        print('Ending TraCI...')
        simulation_time = round(timeit.default_timer() - start_time, 1)
        with open('Display_Data/Automatic/jan_south_Actions_Taken.xml', 'w') as file:
            for value in self._jan_south_actions_taken:
                file.write("%s\n" % value)
        with open('Display_Data/Automatic/jan_duxbury_Actions_Taken.xml', 'w') as file:
            for value in self._jan_duxbury_actions_taken:
                file.write("%s\n" % value)
        return simulation_time

    def run_manual(self):
        start_time = timeit.default_timer()
        self._TrafficGen.generate_routefile()
        print('Starting TraCI...')
        traci.start(self._sumo_cmd)

        self._step = 0
        while traci.simulation.getMinExpectedNumber() > 0:
            traci.simulationStep()
            self._step += 1
            jan_south_queue_length = self._get_jan_south_queue_length()
            self._jan_south_queue_length_episode.append(jan_south_queue_length)
            jan_duxbury_queue_length = self._get_jan_duxbury_queue_length()
            self._jan_duxbury_queue_length_episode.append(jan_duxbury_queue_length)
            self._collect_jan_south_waiting_times()
            self._collect_jan_duxbury_waiting_times()
            self._collect_fuel_consumption()
            self._collect_co2_emission()
            
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
    # def _simulate(self, steps_todo):
    #     if (self._step + steps_todo) >= self._max_steps:
    #         steps_todo = self._max_steps - self._step
    #     while steps_todo > 0:
    #         # traci.simulationStep()
            # self._step += 1
            # steps_todo -= 1
            # jan_south_queue_length = self._get_jan_south_queue_length()
            # self._jan_south_queue_length_episode.append(jan_south_queue_length)
            # jan_duxbury_queue_length = self._get_jan_duxbury_queue_length()
            # self._jan_duxbury_queue_length_episode.append(jan_duxbury_queue_length)
            # self._collect_jan_south_waiting_times()
            # self._collect_jan_duxbury_waiting_times()
            # self._collect_fuel_consumption()
            # self._collect_co2_emission()
            # if (self._step+1) % 10 == 0:
            #     self._collect_jan_south_waiting_times()
            #     self._collect_jan_duxbury_waiting_times()

        

    # Documentation for the _set_yellow_phase method.
    #  @param self The object pointer.
    #  @param old_action The last Green State or action taken.
    #
    #  The _set_yellow_phase function will choose the appropriate Yellow State based on old_action.
    #  The Yellow State is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    def _set_jan_south_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + 1        
        traci.trafficlight.setPhase(
            "cluster_25290891_611769793", yellow_phase_code)

    def _set_jan_duxbury_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + 1
        traci.trafficlight.setPhase(
            "cluster_2516980595_2516980597_25290876_611769785", yellow_phase_code)

    # Documentation for the _set_green_phase method.
    #  @param self The object pointer.
    #  @param action_number The new chosen Green State or action to be taken.
    #
    #  The new Green State or action is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    def _set_jan_south_green_phase(self, action_number):
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

    # def _collect_jan_south_waiting_times(self):
    #     incoming_roads = ["rd6_JanShoba_tl_n", "rd2_South_dl_e", "rd3_JanShoba_tl_s", "rd2_South_dl_w"]
    #     total_waiting_time = 0
    #     car_list = traci.vehicle.getIDList()
    #     for car_id in car_list:
    #         road_id = traci.vehicle.getRoadID(car_id)
    #         if road_id in incoming_roads:
    #             total_waiting_time += traci.vehicle.getAccumulatedWaitingTime(car_id)
    #     self._jan_south_wait_time_episode.append(total_waiting_time)

    # def _collect_jan_duxbury_waiting_times(self):
    #     incoming_roads = ["rd4_JanShoba_ql_n", "rd2_Duxbury_dl_e", "rd6_JanShoba_tl_s", "rd1_Duxbury_ql_w"]
    #     total_waiting_time = 0
    #     car_list = traci.vehicle.getIDList()
    #     for car_id in car_list:
    #         road_id = traci.vehicle.getRoadID(car_id)
    #         if road_id in incoming_roads:
    #             total_waiting_time += traci.vehicle.getAccumulatedWaitingTime(car_id)
    #     self._jan_duxbury_wait_time_episode.append(total_waiting_time)

    def _collect_jan_duxbury_waiting_times(self):
        incoming_roads = ["rd4_JanShoba_ql_n", "rd2_Duxbury_dl_e", "rd6_JanShoba_tl_s", "rd1_Duxbury_ql_w"]
        total_waiting_time = 0
        for road_id in incoming_roads:
            total_waiting_time += traci.edge.getWaitingTime(road_id)
        self._jan_duxbury_wait_time_episode.append(total_waiting_time)

    def _collect_jan_south_waiting_times(self):
        incoming_roads = ["rd6_JanShoba_tl_n", "rd2_South_dl_e", "rd3_JanShoba_tl_s", "rd2_South_dl_w"]
        total_waiting_time = 0
        for road_id in incoming_roads:
            total_waiting_time += traci.edge.getWaitingTime(road_id)
        self._jan_south_wait_time_episode.append(total_waiting_time)

    def _collect_fuel_consumption(self):
        roads = ['rd2_South_dl_e', 'rd1_South_sl_e', 'rd1_JanShoba_dl_s', 'rd1_Prospect_sl_w', 'rd2_JanShoba_dl_s', 'rd3_JanShoba_tl_s', 'rd2_South_dl_w', 'rd1_South_sl_w', 'rd6_JanShoba_tl_n', 'rd5_JanShoba_dl_n', 'rd1_Duxbury_sl_e', 'rd2_Duxbury_dl_e', 'rd4_JanShoba_dl_s', 'rd5_JanShoba_tl_s', 'rd6_JanShoba_tl_s', 'rd0_Duxbury_dl_w', 'rd1_Duxbury_ql_w', 'rd4_JanShoba_ql_n', 'rd3_JanShoba_dl_N', 'rd2_JanShoba_tl_n', 'rd1_JanShoba_dl_n']
        running_total = 0
        for road_id in roads:
            running_total += traci.edge.getFuelConsumption(road_id)
        self._total_fuel_consumption_episode.append(running_total)

    def _collect_co2_emission(self):
        roads = ['rd2_South_dl_e', 'rd1_South_sl_e', 'rd1_JanShoba_dl_s', 'rd1_Prospect_sl_w', 'rd2_JanShoba_dl_s', 'rd3_JanShoba_tl_s', 'rd2_South_dl_w', 'rd1_South_sl_w', 'rd6_JanShoba_tl_n', 'rd5_JanShoba_dl_n', 'rd1_Duxbury_sl_e', 'rd2_Duxbury_dl_e', 'rd4_JanShoba_dl_s', 'rd5_JanShoba_tl_s', 'rd6_JanShoba_tl_s', 'rd0_Duxbury_dl_w', 'rd1_Duxbury_ql_w', 'rd4_JanShoba_ql_n', 'rd3_JanShoba_dl_N', 'rd2_JanShoba_tl_n', 'rd1_JanShoba_dl_n']
        running_total = 0
        for road_id in roads:
            running_total += traci.edge.getCO2Emission(road_id)
        self._total_co2_emission_episode.append(running_total)


    def _choose_action(self, state):
        return np.argmax(self._Model.predict_one(state))

    # Documentation for the _get_queue_length method.
    #  @param self The object pointer.
    #
    #  The _get_queue_length will retrieve the number of cars halted, specifically in the incoming lane, using traci.edge.getLastStepHaltingNumber.
    #  The result is then appended to the appropriate list, along with keeping a running total with queue_length.
    def _get_jan_south_queue_length(self):
        halt_N = traci.edge.getLastStepHaltingNumber(
            "rd6_JanShoba_tl_n") + traci.edge.getLastStepHaltingNumber(
            "rd5_JanShoba_dl_n")
        halt_S = traci.edge.getLastStepHaltingNumber(
            "rd3_JanShoba_tl_s") + traci.edge.getLastStepHaltingNumber(
            "rd2_JanShoba_dl_s")
        halt_E = traci.edge.getLastStepHaltingNumber(
            "rd2_South_dl_e") + traci.edge.getLastStepHaltingNumber(
            "rd1_South_sl_e")
        halt_W = traci.edge.getLastStepHaltingNumber(
            "rd2_South_dl_w") + traci.edge.getLastStepHaltingNumber(
            "rd1_South_sl_w")
        queue_length = halt_N + halt_S + halt_E + halt_W
        return queue_length

    def _get_jan_duxbury_queue_length(self):
        halt_N = traci.edge.getLastStepHaltingNumber(
            "rd4_JanShoba_ql_n") + traci.edge.getLastStepHaltingNumber(
            "rd3_JanShoba_dl_N")
        halt_S = traci.edge.getLastStepHaltingNumber(
            "rd6_JanShoba_tl_s") + traci.edge.getLastStepHaltingNumber(
            "rd5_JanShoba_tl_s") + traci.edge.getLastStepHaltingNumber(
            "rd4_JanShoba_dl_s")
        halt_E = traci.edge.getLastStepHaltingNumber(
            "rd2_Duxbury_dl_e") + traci.edge.getLastStepHaltingNumber(
            "rd1_Duxbury_sl_e")
        halt_W = traci.edge.getLastStepHaltingNumber(
            "rd1_Duxbury_ql_w") + traci.edge.getLastStepHaltingNumber(
            "rd0_Duxbury_dl_w")
        queue_length = halt_N + halt_S + halt_E + halt_W
        return queue_length

    def _get_jan_south_sim_state(self):
        state = np.zeros(self._num_states)
        cars = traci.vehicle.getIDList()

        for car_id in cars:
            lane_pos = traci.vehicle.getLanePosition(car_id)
            lane_id = traci.vehicle.getLaneID(car_id)
            lane_pos = 25 - lane_pos 

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
            lane_pos = 25 - lane_pos 

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

    def _get_extended_jan_south_sim_state(self):
        state = np.zeros(self._num_states)
        cars = traci.vehicle.getIDList()

        for car_id in cars:
            lane_pos = traci.vehicle.getLanePosition(car_id)
            lane_id = traci.vehicle.getLaneID(car_id) 
            road_id = traci.vehicle.getRoadID(car_id)
            out_of_range = False
            if road_id == 'rd1_South_sl_e':
                lane_pos = 413.86 - lane_pos + 22.54
            elif road_id == 'rd2_JanShoba_dl_s':
                lane_pos = 100.06 - lane_pos + 36.38
            elif road_id == 'rd1_South_sl_w':
                lane_pos = 195.48 - lane_pos + 25.32
            elif road_id == 'rd5_JanShoba_dl_n':
                lane_pos = 232.01 - lane_pos + 42.32
            else:
                if road_id == 'rd2_South_dl_e':
                    lane_pos = 22.54 - lane_pos
                elif road_id == 'rd3_JanShoba_tl_s':
                    lane_pos = 36.38 - lane_pos
                elif road_id == 'rd2_South_dl_w':
                    lane_pos = 25.32 - lane_pos
                elif road_id == 'rd6_JanShoba_tl_n':
                    lane_pos = 42.32 - lane_pos
                else: 
                    out_of_range = True

            if lane_pos < 14:
                lane_cell = 0
            elif lane_pos < 27:
                lane_cell = 1
            elif lane_pos < 41:
                lane_cell = 2
            elif lane_pos < 54:
                lane_cell = 3
            elif lane_pos < 68:
                lane_cell = 4
            elif lane_pos < 82:
                lane_cell = 5
            elif lane_pos < 95:
                lane_cell = 6
            elif lane_pos < 109:
                lane_cell = 7
            elif lane_pos < 122:
                lane_cell = 8
            elif lane_pos <= 136:
                lane_cell = 9
            else:
                out_of_range = True

            if lane_id == "rd3_JanShoba_tl_s_0" or lane_id == "rd3_JanShoba_tl_s_1" or lane_id == 'rd2_JanShoba_dl_s_0' or lane_id == 'rd2_JanShoba_dl_s_1':
                lane_group = 0
            elif lane_id == "rd3_JanShoba_tl_s_2":
                lane_group = 1
            elif lane_id == "rd2_South_dl_e_0" or lane_id == 'rd1_South_sl_e_0':
                lane_group = 2
            elif lane_id == "rd2_South_dl_e_1":
                lane_group = 3
            elif lane_id == "rd2_South_dl_w_0" or lane_id == 'rd1_South_sl_w':
                lane_group = 4
            elif lane_id == "rd2_South_dl_w_1":
                lane_group = 5
            elif lane_id == "rd6_JanShoba_tl_n_0" or lane_id == "rd6_JanShoba_tl_n_1" or lane_id == "rd5_JanShoba_dl_n_0" or lane_id == "rd5_JanShoba_dl_n_1":
                lane_group = 6
            elif lane_id == "rd6_JanShoba_tl_n_2":
                lane_group = 7
            else:
                lane_group = -1

            if lane_group >= 1 and lane_group <= 7 and (not out_of_range):
                car_position = int(str(lane_group) + str(lane_cell))
                valid_car = True
            elif lane_group == 0 and (not out_of_range):
                car_position = lane_cell
                valid_car = True
            else:
                valid_car = False

            if valid_car:
                state[car_position] = 1

        return state

    def _get_extended_jan_duxbury_sim_state(self):
        state = np.zeros(self._num_states)
        cars = traci.vehicle.getIDList()

        for car_id in cars:
            lane_pos = traci.vehicle.getLanePosition(car_id)
            lane_id = traci.vehicle.getLaneID(car_id) 
            road_id = traci.vehicle.getRoadID(car_id)
            out_of_range = False
            if road_id == 'rd1_Duxbury_sl_e':
                lane_pos = 50.36 - lane_pos + 50.47
            elif road_id == 'rd4_JanShoba_dl_s':
                lane_pos = 227.31 - lane_pos + 33.88 + 7.37
            elif road_id == 'rd0_Duxbury_dl_w':
                lane_pos = 172.23 - lane_pos + 135.16
            elif road_id == 'rd3_JanShoba_dl_N':
                lane_pos = 56.92 - lane_pos + 61.81
            else:
                if road_id == 'rd2_Duxbury_dl_e':
                    lane_pos = 50.47 - lane_pos
                elif road_id == 'rd6_JanShoba_tl_s':
                    lane_pos = 33.88 - lane_pos
                elif road_id == 'rd1_Duxbury_ql_w':
                    lane_pos = 135.16 - lane_pos
                elif road_id == 'rd4_JanShoba_ql_n':
                    lane_pos = 61.81 - lane_pos
                else: 
                    out_of_range = True

            if lane_pos < 10:
                lane_cell = 0
            elif lane_pos < 20:
                lane_cell = 1
            elif lane_pos < 30:
                lane_cell = 2
            elif lane_pos < 40:
                lane_cell = 3
            elif lane_pos < 50:
                lane_cell = 4
            elif lane_pos < 60:
                lane_cell = 5
            elif lane_pos < 70:
                lane_cell = 6
            elif lane_pos < 80:
                lane_cell = 7
            elif lane_pos < 90:
                lane_cell = 8
            elif lane_pos <= 100:
                lane_cell = 9
            else:
                out_of_range = True

            if lane_id == "rd3_JanShoba_tl_s_0" or lane_id == "rd3_JanShoba_tl_s_1" or lane_id == 'rd2_JanShoba_dl_s_0' or lane_id == 'rd2_JanShoba_dl_s_1':
                lane_group = 0
            elif lane_id == "rd3_JanShoba_tl_s_2":
                lane_group = 1
            elif lane_id == "rd2_South_dl_e_0" or lane_id == 'rd1_South_sl_e_0':
                lane_group = 2
            elif lane_id == "rd2_South_dl_e_1":
                lane_group = 3
            elif lane_id == "rd2_South_dl_w_0" or lane_id == 'rd1_South_sl_w':
                lane_group = 4
            elif lane_id == "rd2_South_dl_w_1":
                lane_group = 5
            elif lane_id == "rd6_JanShoba_tl_n_0" or lane_id == "rd6_JanShoba_tl_n_1" or lane_id == "rd5_JanShoba_dl_n_0" or lane_id == "rd5_JanShoba_dl_n_1":
                lane_group = 6
            elif lane_id == "rd6_JanShoba_tl_n_2":
                lane_group = 7
            else:
                lane_group = -1

            if lane_group >= 1 and lane_group <= 7 and (not out_of_range):
                car_position = int(str(lane_group) + str(lane_cell))
                valid_car = True
            elif lane_group == 0 and (not out_of_range):
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
    def jan_south_time_waiting(self):
        return self._jan_south_wait_time_episode

    @property
    def jan_duxbury_time_waiting(self):
        return self._jan_duxbury_wait_time_episode
        
    @property
    def total_fuel_consumption(self):
        return self._total_fuel_consumption_episode

    @property
    def total_co2_emission(self):
        return self._total_co2_emission_episode

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
