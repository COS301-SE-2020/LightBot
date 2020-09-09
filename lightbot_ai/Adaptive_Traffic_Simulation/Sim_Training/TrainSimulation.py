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
    def __init__(self, Model, Memory, TrafficGen, sumo_cmd, gamma, max_steps, green_duration, yellow_duration, num_states, num_actions, training_epochs):
        self._Model = Model
        self._Memory = Memory
        self._TrafficGen = TrafficGen
        self._gamma = gamma
        self._sumo_cmd = sumo_cmd
        self._max_steps = max_steps
        self._green_duration = green_duration
        self._yellow_duration = yellow_duration
        self._num_states = num_states
        self._num_actions = num_actions
        # self._reward_store = []   
        # self._cumulative_wait_store = []
        # self._avg_queue_length_store = []
        self._jan_south_reward_store = []
        self._jan_duxbury_reward_store = []
        self._jan_south_cumulative_wait_store = []
        self._jan_duxbury_cumulative_wait_store = []
        self._jan_south_avg_queue_length_store = []
        self._jan_duxbury_avg_queue_length_store = []
        self._training_epochs = training_epochs

    # Documentation for the run method.
    #  @param self The object pointer.
    #
    #  The run function starts TraCI which executes the SUMO for the simulation.
    #  This is where the actions or traffic light Green States are chosen to influence the simulation.
    def run(self, episode, epsilon):
        start_time = timeit.default_timer()

        self._TrafficGen._seed = episode
        self._TrafficGen.generate_routefile()
        print('Starting TraCI...')
        traci.start(self._sumo_cmd)

        self._step = 0
        # self._waiting_times = {}
        # self._sum_neg_reward = 0
        # self._sum_queue_length = 0
        # self._sum_waiting_time = 0
        # old_total_wait = 0
        # old_state = -1
        # old_action = -1

        self._jan_south_waiting_times = {}
        self._jan_duxbury_waiting_times = {}
        self._jan_south_sum_neg_reward = 0
        self._jan_duxbury_sum_neg_reward = 0
        self._jan_south_sum_queue_length = 0
        self._jan_duxbury_sum_queue_length = 0
        self._jan_south_sum_waiting_time = 0
        self._jan_duxbury_sum_waiting_time = 0
        jan_south_old_total_wait = 0
        jan_duxbury_old_total_wait = 0
        jan_south_old_sim_state = -1
        jan_duxbury_old_sim_state = -1
        jan_south_old_action = -1
        jan_duxbury_old_action = -1
        jan_south_yellow_state_steps_todo = 0
        jan_south_green_state_steps_todo = 0
        jan_duxbury_yellow_state_steps_todo = 0
        jan_duxbury_green_state_steps_todo = 0
        jan_south_current_sim_state = 0
        jan_duxbury_current_sim_state = 0
        jan_south_current_total_wait = 0
        jan_duxbury_current_total_wait = 0
        jan_south_reward = 0
        jan_duxbury_reward = 0
        jan_south_action = 0
        jan_duxbury_action = 0

        while self._step < self._max_steps:
            if jan_south_yellow_state_steps_todo == 0 and jan_south_green_state_steps_todo == 0:
                jan_south_current_sim_state = self._get_jan_south_sim_state()
                jan_south_current_total_wait = self._collect_jan_south_waiting_times()
                jan_south_reward = jan_south_old_total_wait - jan_south_current_total_wait
                jan_south_action = self._choose_action(jan_south_current_sim_state, epsilon)
                # print("Jan South action: ",jan_south_action)
                if self._step != 0:
                    self._Memory.add_sample((jan_south_old_sim_state, jan_south_old_action, jan_south_reward, jan_south_current_sim_state))
                if self._step != 0 and jan_south_old_action != jan_south_action:
                    self._set_jan_south_yellow_phase(jan_south_old_action)
                    jan_south_yellow_state_steps_todo = self._yellow_duration
                    # print("Jan South yellow todo set")
                self._set_jan_south_green_phase(jan_south_action)
                if jan_south_action == 0 or jan_south_action == 2:
                    jan_south_green_state_steps_todo = self._green_duration
                else:
                    jan_south_green_state_steps_todo = 6
                # print("Jan South green todo set")

            if jan_duxbury_yellow_state_steps_todo == 0 and jan_duxbury_green_state_steps_todo == 0:
                jan_duxbury_current_sim_state = self._get_jan_duxbury_sim_state()
                jan_duxbury_current_total_wait = self._collect_jan_duxbury_waiting_times()
                jan_duxbury_reward = jan_duxbury_old_total_wait - jan_duxbury_current_total_wait
                jan_duxbury_action = self._choose_action(jan_duxbury_current_sim_state, epsilon)
                # print("Jan duxbury action: ",jan_duxbury_action)
                if self._step != 0:
                    self._Memory.add_sample((jan_duxbury_old_sim_state, jan_duxbury_old_action, jan_duxbury_reward, jan_duxbury_current_sim_state))
                if self._step != 0 and jan_duxbury_old_action != jan_duxbury_action:
                    self._set_jan_duxbury_yellow_phase(jan_duxbury_old_action)
                    jan_duxbury_yellow_state_steps_todo = self._yellow_duration
                    # print("Jan Duxbury yellow todo set")
                self._set_jan_duxbury_green_phase(jan_duxbury_action)
                if jan_duxbury_action == 0 or jan_duxbury_action == 2:
                    jan_duxbury_green_state_steps_todo = self._green_duration
                else:
                    jan_duxbury_green_state_steps_todo = 6
                # print("Jan Duxbury green todo set")

            if (self._step < self._max_steps) and (jan_south_yellow_state_steps_todo > 0 or jan_south_green_state_steps_todo > 0 or jan_duxbury_yellow_state_steps_todo > 0 or jan_duxbury_green_state_steps_todo > 0):
                traci.simulationStep()
                self._step += 1

                jan_south_queue_length = self._get_jan_south_queue_length()
                self._jan_south_sum_queue_length += jan_south_queue_length
                self._jan_south_sum_waiting_time += jan_south_queue_length

                jan_duxbury_queue_length = self._get_jan_duxbury_queue_length()
                self._jan_duxbury_sum_queue_length += jan_duxbury_queue_length
                self._jan_duxbury_sum_waiting_time += jan_duxbury_queue_length

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
                    # print("Jan Duxbury green todo Decreased")
            
            jan_south_old_sim_state = jan_south_current_sim_state
            jan_duxbury_old_sim_state = jan_duxbury_current_sim_state
            jan_south_old_action = jan_south_action
            jan_duxbury_old_action = jan_duxbury_action
            jan_south_old_total_wait = jan_south_current_total_wait
            jan_duxbury_old_total_wait = jan_duxbury_current_total_wait
            if jan_south_reward < 0:
                self._jan_south_sum_neg_reward += jan_south_reward        
            if jan_duxbury_reward < 0:
                self._jan_duxbury_sum_neg_reward += jan_duxbury_reward
            
        self._save_episode_stats()
        print("Jan_South Total reward:", self._jan_south_sum_neg_reward, "- Epsilon:", round(epsilon, 2))
        print("Jan_Duxbury Total reward:", self._jan_duxbury_sum_neg_reward, "- Epsilon:", round(epsilon, 2))
        traci.close()
        simulation_time = round(timeit.default_timer() - start_time, 1)
        print("Training...")
        start_time = timeit.default_timer()
        for _ in range(self._training_epochs):
            self._replay()
        training_time = round(timeit.default_timer() - start_time, 1)
        return simulation_time, training_time

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
    #         traci.simulationStep()
    #         self._step += 1
    #         steps_todo -= 1
    #         queue_length = self._get_queue_length()#!!!Might need to put this outside the while loop, might give more accurate results!!!
    #         self._sum_queue_length += queue_length
    #         self._sum_waiting_time += queue_length

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

    def _choose_action(self, state, epsilon):
        if random.random() < epsilon:
            return random.randint(0, self._num_actions - 1) # random action
        else:
            return np.argmax(self._Model.predict_one(state)) # the best action given the current state

    def _choose_action(self, state, epsilon):
        if random.random() < epsilon:
            return random.randint(0, self._num_actions - 1) # random action
        else:
            return np.argmax(self._Model.predict_one(state)) # the best action given the current state

    # Documentation for the _set_yellow_phase method.
    #  @param self The object pointer.
    #  @param old_action The last Green State or action taken.
    #
    #  The _set_yellow_phase function will choose the appropriate Yellow State based on old_action.
    #  The Yellow State is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    # def _set_yellow_phase(self, old_action):
    #     yellow_phase_code = old_action * 2 + \
    #         1  # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
    #     traci.trafficlight.setPhase(
    #         "cluster_25290891_611769793", yellow_phase_code)

    def _set_jan_south_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + \
            1  # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
        traci.trafficlight.setPhase(
            "cluster_25290891_611769793", yellow_phase_code)

    def _set_jan_duxbury_yellow_phase(self, old_action):
        yellow_phase_code = old_action * 2 + \
            1  # obtain the yellow phase code, based on the old action (ref on environment.net.xml)
        traci.trafficlight.setPhase(
            "cluster_2516980595_2516980597_25290876_611769785", yellow_phase_code)

    # Documentation for the _set_green_phase method.
    #  @param self The object pointer.
    #  @param action_number The new chosen Green State or action to be taken.
    #
    #  The new Green State or action is recorded in _actions_taken list and set in SUMO using traci.trafficlight.setPhase().
    # def _set_green_phase(self, action_number):
    #     if action_number == 0:
    #         traci.trafficlight.setPhase(
    #             "cluster_25290891_611769793", PHASE_NS_GREEN)
    #     elif action_number == 1:
    #         traci.trafficlight.setPhase(
    #             "cluster_25290891_611769793", PHASE_NSR_GREEN)
    #     elif action_number == 2:
    #         traci.trafficlight.setPhase(
    #             "cluster_25290891_611769793", PHASE_EW_GREEN)
    #     elif action_number == 3:
    #         traci.trafficlight.setPhase(
    #             "cluster_25290891_611769793", PHASE_EWR_GREEN)

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


    # def _get_queue_length(self):
    #     halt_N = traci.edge.getLastStepHaltingNumber(
    #         "road_triple_JanShobaN_toJunc")
    #     halt_S = traci.edge.getLastStepHaltingNumber(
    #         "road_triple_JanShobaS_toJunc")
    #     halt_E = traci.edge.getLastStepHaltingNumber(
    #         "road_double_SouthStrW_toJunc")
    #     halt_W = traci.edge.getLastStepHaltingNumber(
    #         "road_double_SouthStrE_toJunc")
    #     queue_length = halt_N + halt_S + halt_E + halt_W
    #     return queue_length

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
    
    def _replay(self):
        batch = self._Memory.get_samples(self._Model.batch_size)

        if len(batch) > 0:  # if the memory is full enough
            states = np.array([val[0] for val in batch])  # extract states from the batch
            next_states = np.array([val[3] for val in batch])  # extract next states from the batch

            # prediction
            q_s_a = self._Model.predict_batch(states)  # predict Q(state), for every sample
            q_s_a_d = self._Model.predict_batch(next_states)  # predict Q(next_state), for every sample

            # setup training arrays
            x = np.zeros((len(batch), self._num_states))
            y = np.zeros((len(batch), self._num_actions))

            for i, b in enumerate(batch):
                state, action, reward, _ = b[0], b[1], b[2], b[3]  # extract data from one sample
                current_q = q_s_a[i]  # get the Q(state) predicted before
                current_q[action] = reward + self._gamma * np.amax(q_s_a_d[i])  # update Q(state, action)
                x[i] = state
                y[i] = current_q  # Q(state) that includes the updated action value

            self._Model.train_batch(x, y)  # train the NN

    def _save_episode_stats(self):
        self._jan_south_reward_store.append(self._jan_south_sum_neg_reward)  # how much negative reward in this episode
        self._jan_duxbury_reward_store.append(self._jan_duxbury_sum_neg_reward) # how much negative reward in this episode
        self._jan_south_cumulative_wait_store.append(self._jan_south_sum_waiting_time)  # total number of seconds waited by cars in this episode
        self._jan_duxbury_cumulative_wait_store.append(self._jan_duxbury_sum_waiting_time)  # total number of seconds waited by cars in this episode
        self._jan_south_avg_queue_length_store.append(self._jan_south_sum_queue_length / self._max_steps)  # average number of queued cars per step, in this episode
        self._jan_duxbury_avg_queue_length_store.append(self._jan_duxbury_sum_queue_length / self._max_steps)  # average number of queued cars per step, in this episode

    @property
    def jan_south_reward_store(self):
        return self._jan_south_reward_store

    @property
    def jan_duxbury_reward_store(self):
        return self._jan_duxbury_reward_store

    @property
    def jan_south_cumulative_wait_store(self):
        return self._jan_south_cumulative_wait_store

    @property
    def jan_duxbury_cumulative_wait_store(self):
        return self._jan_duxbury_cumulative_wait_store

    @property
    def jan_south_avg_queue_length_store(self):
        return self._jan_south_avg_queue_length_store

    @property
    def jan_duxbury_avg_queue_length_store(self):
        return self._jan_duxbury_avg_queue_length_store
