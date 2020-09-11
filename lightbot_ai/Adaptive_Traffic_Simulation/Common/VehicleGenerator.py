# generation of all vehicles to be done in this file
import numpy as np
import math


class VehicleGenerator:
    def __init__(self):
        pass


class MockGenerator(VehicleGenerator):

    def __init__(self, max_steps, n_cars_generated, episode_seed):
        self._max_steps = max_steps
        self._number_cars_generated = n_cars_generated
        self.seed = episode_seed

    


    def generate_routefile(self):
        np.random.seed(self.seed)

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

        with open("Map\Jan_Shoba_Multi_Peak_autogen_vehicles.rou.alt.xml", "w") as routes:
            print("""<?xml version="1.0" encoding="UTF-8"?>

                <!-- generated on Thu Sep  3 22:08:46 2020 by Eclipse SUMO duarouter Version 1.6.0
                <configuration xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/duarouterConfiguration.xsd">

                    <input>
                        <net-file value="Jan_Shoba_Multi_Peak.net.xml"/>
                        <route-files value="trips.trips.xml"/>
                    </input>

                    <output>
                        <output-file value="Jan_Shoba_Multi_Peak.rou.xml"/>
                        <alternatives-output value="Jan_Shoba_Multi_Peak.rou.alt.xml"/>
                    </output>

                    <time>
                        <begin value="0"/>
                        <end value="3600"/>
                    </time>

                    <report>
                        <no-warnings value="true"/>
                        <ignore-errors value="true"/>
                        <no-step-log value="true"/>
                    </report>

                </configuration>
                -->

                <routes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/routes_file.xsd">
                <vType accel="1.0" decel="4.5" id="standard_car" length="5.0" minGap="2.5" maxSpeed="25" sigma="0.5" />"""
            , file=routes)

            for car_counter, step in enumerate(car_gen_steps):
                start_edge = np.random.uniform()
                #Duxbury Start
                if start_edge < 0.3:
                    end_edge = np.random.uniform()
                    #Initially Travelling West
                    if end_edge <= 0.6:
                        route_select = np.random.uniform()
                        if route_select <= 0.2:
                            print('     <vehicle id="d_w_j_s_%i" type="standard_car" route="route_Duxbury_w_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.2 and route_select <= 0.4:
                            print('     <vehicle id="d_w_j_n_%i" type="standard_car" route="route_Duxbury_w_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.4 and route_select <= 0.5:
                            print('     <vehicle id="d_w_d_w_%i" type="standard_car" route="route_Duxbury_w_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.5 and route_select <= 0.7:
                            print('     <vehicle id="d_w_s_w_%i" type="standard_car" route="route_Duxbury_w_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.7 and route_select <= 0.75:
                            print('     <vehicle id="d_w_p_w_%i" type="standard_car" route="route_Duxbury_w_Prospect_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.75 and route_select <= 0.8:
                            print('     <vehicle id="d_w_l_w_%i" type="standard_car" route="route_Duxbury_w_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.8 and route_select <= 0.9:
                            print('     <vehicle id="d_w_l_e_%i" type="standard_car" route="route_Duxbury_w_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.9 :
                            print('     <vehicle id="d_w_s_e_%i" type="standard_car" route="route_Duxbury_w_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                #Initially Travelling East        
                    if end_edge > 0.6:
                        route_select = np.random.uniform()
                        if route_select <= 0.2:
                            print('     <vehicle id="d_e_j_s_%i" type="standard_car" route="route_Duxbury_e_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.2 and route_select <= 0.4:
                            print('     <vehicle id="d_e_j_n_%i" type="standard_car" route="route_Duxbury_e_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.4 and route_select <= 0.5:
                            print('     <vehicle id="d_e_d_e_%i" type="standard_car" route="route_Duxbury_e_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.5 and route_select <= 0.6:
                            print('     <vehicle id="d_e_s_w_%i" type="standard_car" route="route_Duxbury_e_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.6 and route_select <= 0.7:
                            print('     <vehicle id="d_e_s_e_%i" type="standard_car" route="route_Duxbury_e_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.7 and route_select <= 0.75:
                            print('     <vehicle id="d_e_l_w_%i" type="standard_car" route="route_Duxbury_e_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.75 and route_select <= 0.85:
                            print('     <vehicle id="d_e_l_e_%i" type="standard_car" route="route_Duxbury_e_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.85:
                            print('     <vehicle id="d_e_p_w_%i" type="standard_car" route="route_Duxbury_e_Prospect_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
            # Jan Shoba Southbound Begin Point
                elif start_edge > 0.3 and start_edge <= 0.45:
                    end_edge = np.random.uniform()
                    if end_edge <= 0.4:
                        print('     <vehicle id="j_s_j_s_%i" type="standard_car" route="route_JanShoba_s_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.4 and end_edge <= 0.5:
                        print('     <vehicle id="j_s_s_w_%i" type="standard_car" route="route_JanShoba_s_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.5 and end_edge <= 0.6:
                        print('     <vehicle id="j_s_s_e_%i" type="standard_car" route="route_JanShoba_s_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.6 and end_edge <= 0.7:
                        print('     <vehicle id="j_s_d_e_%i" type="standard_car" route="route_JanShoba_s_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.7 and end_edge <= 0.75:
                        print('     <vehicle id="j_s_d_w_%i" type="standard_car" route="route_JanShoba_s_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.75 and end_edge <= 0.85:
                        print('     <vehicle id="j_s_p_e_%i" type="standard_car" route="route_JanShoba_s_Prospect_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.85 and end_edge <= 0.95:
                        print('     <vehicle id="j_s_l_e_%i" type="standard_car" route="route_JanShoba_s_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.95:
                        print('     <vehicle id="j_s_l_w_%i" type="standard_car" route="route_JanShoba_s_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        
                #Jan Shoba Northbound Begin Point
                elif start_edge > 0.45 and start_edge <= 0.6:
                    end_edge = np.random.uniform()
                    if end_edge <= 0.4:
                        print('     <vehicle id="j_n_j_n_%i" type="standard_car" route="route_JanShoba_n_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.4 and end_edge <= 0.5:
                        print('     <vehicle id="j_n_d_e_%i" type="standard_car" route="route_JanShoba_n_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.5 and end_edge <= 0.6:
                        print('     <vehicle id="j_n_d_w_%i" type="standard_car" route="route_JanShoba_n_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.6 and end_edge <= 0.7:
                        print('     <vehicle id="j_n_s_w_%i" type="standard_car" route="route_JanShoba_n_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.7 and end_edge <= 0.8:
                        print('     <vehicle id="j_n_s_e_%i" type="standard_car" route="route_JanShoba_n_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.8 and end_edge <= 0.9:
                        print('     <vehicle id="j_n_l_w_%i" type="standard_car" route="route_JanShoba_n_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.9 and end_edge <= 0.95:
                        print('     <vehicle id="j_n_l_e_%i" type="standard_car" route="route_JanShoba_n_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    if end_edge > 0.95:
                        print('     <vehicle id="j_n_p_w_%i" type="standard_car" route="route_JanShoba_n_Prospect_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
            #South Start
                elif start_edge > 0.6 and start_edge <= 0.8:
                    end_edge = np.random.uniform()
                    #Initially Travelling West
                    if end_edge <= 0.5:
                        route_select = np.random.uniform()
                        if route_select <= 0.12:
                            print('     <vehicle id="s_w_j_n_%i" type="standard_car" route="route_South_w_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.12 and route_select <= 0.32:
                            print('     <vehicle id="s_w_j_s_%i" type="standard_car" route="route_South_w_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.32 and route_select <= 0.55:
                            print('     <vehicle id="s_w_s_w_%i" type="standard_car" route="route_South_w_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.55 and route_select <= 0.65:
                            print('     <vehicle id="s_w_l_w_%i" type="standard_car" route="route_South_w_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.65 and route_select <= 0.7:
                            print('     <vehicle id="s_w_l_e_%i" type="standard_car" route="route_South_w_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.7 and route_select <= 0.8:
                            print('     <vehicle id="s_w_p_w_%i" type="standard_car" route="route_South_w_Prospect_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.8 and route_select <= 0.9:
                            print('     <vehicle id="s_w_d_e_%i" type="standard_car" route="route_South_w_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.9:
                            print('     <vehicle id="s_w_d_w_%i" type="standard_car" route="route_South_w_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    #Initially Travelling East        
                    if end_edge > 0.5:
                        route_select = np.random.uniform()
                        if route_select <= 0.15:
                            print('     <vehicle id="s_e_j_s_%i" type="standard_car" route="route_South_e_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.15 and route_select <= 0.35:
                            print('     <vehicle id="s_e_j_n_%i" type="standard_car" route="route_South_e_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.35 and route_select <= 0.55:
                            print('     <vehicle id="s_e_s_e_%i" type="standard_car" route="route_South_e_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.55 and route_select <= 0.65:
                            print('     <vehicle id="s_e_d_w_%i" type="standard_car" route="route_South_e_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.65 and route_select <= 0.75:
                            print('     <vehicle id="s_e_d_e_%i" type="standard_car" route="route_South_e_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.75 and route_select <= 0.85: 
                            print('     <vehicle id="s_e_p_w_%i" type="standard_car" route="route_South_e_Prospect_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.85 and route_select <= 0.9:
                            print('     <vehicle id="s_e_l_w_%i" type="standard_car" route="route_South_e_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.9:
                            print('     <vehicle id="s_e_l_e_%i" type="standard_car" route="route_South_e_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                
                #Prospect Street
                elif start_edge > 0.8 and start_edge <= 0.9:
                    end_edge = np.random.uniform()
                    #Initially Travelling West
                    if end_edge <= 0.5:
                        route_select = np.random.uniform()
                        if route_select <= 0.20:
                            print('     <vehicle id="p_w_j_s_%i" type="standard_car" route="route_Prospect_w_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.20 and route_select <= 0.4:
                            print('     <vehicle id="p_w_s_e_%i" type="standard_car" route="route_Prospect_w_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.4 and route_select <= 0.55:
                            print('     <vehicle id="p_w_s_w_%i" type="standard_car" route="route_Prospect_w_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.55 and route_select <= 0.65:
                            print('     <vehicle id="p_w_d_w_%i" type="standard_car" route="route_Prospect_w_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.65 and route_select <= 0.85:
                            print('     <vehicle id="p_w_d_e_%i" type="standard_car" route="route_Prospect_w_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.85 and route_select <= 0.9:
                            print('     <vehicle id="p_w_l_w_%i" type="standard_car" route="route_Prospect_w_Lunnon_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.9:
                            print('     <vehicle id="p_w_l_e_%i" type="standard_car" route="route_Prospect_w_Lunnon_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                    #Intially Travelling East
                    if end_edge > 0.5:
                        print('     <vehicle id="p_e_j_n_%i" type="standard_car" route="route_Prospect_e_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                                            
                #Lunnon Road
                elif start_edge > 0.9:
                    end_edge = np.random.uniform()
                    #Intially Travelling West
                    if end_edge <= 0.7:
                        print('     <vehicle id="l_w_j_s_%i" type="standard_car" route="route_Lunnon_w_JanShoba_s" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                
                    #Initially Travelling East
                    if end_edge > 0.3:
                        route_select = np.random.uniform()
                        if route_select <= 0.20:
                            print('     <vehicle id="l_e_j_n_%i" type="standard_car" route="route_Lunnon_e_JanShoba_n" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.20 and route_select <= 0.5:
                            print('     <vehicle id="l_e_d_w_%i" type="standard_car" route="route_Lunnon_e_Duxbury_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.5 and route_select <= 0.6:
                            print('     <vehicle id="l_e_d_e_%i" type="standard_car" route="route_Lunnon_e_Duxbury_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.6 and route_select <= 0.8:
                            print('     <vehicle id="l_e_s_w_%i" type="standard_car" route="route_Lunnon_e_South_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.8 and route_select <= 0.9:
                            print('     <vehicle id="l_e_s_e_%i" type="standard_car" route="route_Lunnon_e_South_e" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
                        if route_select > 0.9:
                            print('     <vehicle id="l_e_p_w_%i" type="standard_car" route="route_Lunnon_e_Prospect_w" depart="%s" departLane="best" departSpeed="max" departPos="base"/>' % (car_counter, step), file=routes)
            print("</routes>", file=routes)


class RealWorldGenerator(VehicleGenerator):

    def generate_routefile(self):
        pass

# # Start: bottom of Lunnon Int.
#     # Then: bottom of Duxbury Int.
#         # End: right of Duxbury Int.
#         <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd3_Duxbury_sl_e rd4_Duxbury_sl_e" color="magenta" id="route_JanShoba_n_Duxbury_e"/>
#         # End: left of Duxbury Int.
#         <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="green" id="route_JanShoba_n_Duxbury_w"/>
#         # Then: bottom of South Int.
#             # Then: top of South Int. (end in Prospect Int.)
#             <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd8_JanShoba_dl_n" color="blue" id="route_JanShoba_n_JanShoba_n"/>
#             <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd2_Prospect_sl_w" color="green" id="route_JanShoba_n_Prospect_w"/>
#             # End: right of South Int.
#             <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd2_South_sl_e rd4_South_sl_e" color="magenta" id="route_JanShoba_n_South_e"/>
#             # End: left of South Int.
#             <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd3_South_sl_w" color="green" id="route_JanShoba_n_South_w"/>
#     # End: right of Lunnon Int. 
#     <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd2_Lunnon_sl_e rd3_Lunnon_sl_e" color="magenta" id="route_JanShoba_n_Lunnon_e"/>
#     # End: left of Lunnon Int.
#     <route edges="rd1_JanShoba_dl_n rd2_JanShoba_tl_n rd2_Lunnon_sl_w" color="green" id="route_JanShoba_n_Lunnon_w"/>

# # Start: left of Lunnon Int.
#     # Then: bottom of Duxbury Int.
#         # Then: botton of South Int.
#             # Then: top of South Int. (end in Prospect Int.)
#             <route edges="rd1_Lunnon_sl_e rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd8_JanShoba_dl_n" color="green" id="route_Lunnon_e_JanShoba_n"/>
#             <route edges="rd1_Lunnon_sl_e rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd2_Prospect_sl_w" color="green" id="route_Lunnon_e_Prospect_w"/>
#             # End: left of South Int.
#             <route edges="rd1_Lunnon_sl_e rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd3_South_sl_w" color="green" id="route_Lunnon_e_South_w"/>
#             # End: right of South Int.
#             <route edges="rd1_Lunnon_sl_e rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd2_South_sl_e rd4_South_sl_e" color="magenta" id="route_Lunnon_e_South_e"/>
#         # End: left of Duxbury Int.
#         <route edges="rd1_Lunnon_sl_e rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="green" id="route_Lunnon_e_Duxbury_w"/>
#         <route edges="rd1_Lunnon_sl_e rd3_JanShoba_dl_N rd4_JanShoba_ql_n rd3_Duxbury_sl_e rd4_Duxbury_sl_e" color="magenta" id="route_Lunnon_e_Duxbury_e"/>

# # Start: right of Lunnon Int.
#     # End: botton of Lunnon Int.
#     <route edges="rd1_Lunnon_sl_w rd10_JanShoba_sl_s" color="green" id="route_Lunnon_w_JanShoba_s"/>

# # Start: left of Duxbury Int. 
#     # Then: bottom of Duxbury Int.
#     <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd9_JanShoba_dl_s" color="magenta" id="route_Duxbury_e_JanShoba_s"/>
#     <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd2_Lunnon_sl_w" color="green" id="route_Duxbury_e_Lunnon_w"/>
#     <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd7_JanShoba_dl_s rd9_JanShoba_sl_s rd3_Lunnon_sl_e" color="magenta" id="route_Duxbury_e_Lunnon_e"/>
#     # Then: bottom of South Int.
#         # Then: top of South Int. (end in Prospect Int.)
#         <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd8_JanShoba_dl_n" color="green" id="route_Duxbury_e_JanShoba_n"/>
#         <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd2_Prospect_sl_w" color="green" id="route_Duxbury_e_Prospect_w"/>
#         # End: left of South Int.
#         <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd3_South_sl_w" color="green" id="route_Duxbury_e_South_w"/>
#         # End: right of South Int.
#         <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd2_South_sl_e rd4_South_sl_e" color="magenta" id="route_Duxbury_e_South_e"/>
#     # End: right of Duxbury Int.
#     <route edges="rd1_Duxbury_sl_e rd2_Duxbury_dl_e rd3_Duxbury_sl_e rd4_Duxbury_sl_e" color="blue" id="route_Duxbury_e_Duxbury_e"/>

# # Start: right of Duxbury Int.
#     # Then: bottom of Duxbury Int.
#     <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd9_JanShoba_dl_s" color="green" id="route_Duxbury_w_JanShoba_s"/>
#     <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd2_Lunnon_sl_w" color="magenta" id="route_Duxbury_w_Lunnon_w"/>
#     <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd7_JanShoba_dl_s rd9_JanShoba_sl_s rd3_Lunnon_sl_e" color="green" id="route_Duxbury_w_Lunnon_e"/>
#     # Then: bottom of South Int.
#         # Then: top of South Int. (end in Prospect Int.)
#         <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd8_JanShoba_dl_n" color="magenta" id="route_Duxbury_w_JanShoba_n"/>
#         <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd7_JanShoba_dl_n rd2_Prospect_sl_w" color="magenta" id="route_Duxbury_w_Prospect_w"/>
#         # End: left of South Int.
#         <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd3_South_sl_w" color="magenta" id="route_Duxbury_w_South_w"/>
#         # End: right of South Int.
#         <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd5_JanShoba_dl_n rd6_JanShoba_tl_n rd2_South_sl_e rd4_South_sl_e" color="green" id="route_Duxbury_w_South_e"/>
#     # End: left of Duxbury Int.
#     <route edges="rd0_Duxbury_dl_w rd1_Duxbury_ql_w rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="blue" id="route_Duxbury_w_Duxbury_w"/>

# # Start: left of South Int.
#     # End: right of South Int.
#     <route edges="rd1_South_sl_e rd2_South_dl_e rd2_South_sl_e rd4_South_sl_e" color="blue" id="route_South_e_South_e"/>
#     # Then: top of South Int.
#     <route edges="rd1_South_sl_e rd2_South_dl_e rd7_JanShoba_dl_n rd8_JanShoba_dl_n" color="green" id="route_South_e_JanShoba_n"/>
#     <route edges="rd1_South_sl_e rd2_South_dl_e rd7_JanShoba_dl_n rd2_Prospect_sl_w" color="green" id="route_South_e_Prospect_w"/>
#     # Then: top of Duxbury Int.
#         # Then: bottom of Duxbury Int. (end in Lunnon Int.)
#         <route edges="rd1_South_sl_e rd2_South_dl_e rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd2_Lunnon_sl_w" color="green" id="route_South_e_Lunnon_w"/>
#         <route edges="rd1_South_sl_e rd2_South_dl_e rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd9_JanShoba_sl_s rd3_Lunnon_sl_e" color="magenta" id="route_South_e_Lunnon_e"/>
#         <route edges="rd1_South_sl_e rd2_South_dl_e rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd9_JanShoba_dl_s" color="magenta" id="route_South_e_JanShoba_s"/>
#         # End: left of Duxbury Int.
#         <route edges="rd1_South_sl_e rd2_South_dl_e rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="green" id="route_South_e_Duxbury_w"/>
#         # End: right of Duxbury Int.
#         <route edges="rd1_South_sl_e rd2_South_dl_e rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd7_JanShoba_sl_s rd4_Duxbury_sl_e" color="magenta" id="route_South_e_Duxbury_e"/>

# # Start: right of South Int.
#     # Then: top of South Int.
#     <route edges="rd1_South_sl_w rd2_South_dl_w rd7_JanShoba_dl_n rd8_JanShoba_dl_n" color="magenta" id="route_South_w_JanShoba_n"/>
#     <route edges="rd1_South_sl_w rd2_South_dl_w rd7_JanShoba_dl_n rd2_Prospect_sl_w" color="magenta" id="route_South_w_Prospect_w"/>
#     # End: left of South Int.
#     <route edges="rd1_South_sl_w rd2_South_dl_w rd3_South_sl_w" color="blue" id="route_South_w_South_w"/>
#     # Then: top of Duxbury
#         # End: right of Duxbury Int.
#         <route edges="rd1_South_sl_w rd2_South_dl_w rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd7_JanShoba_sl_s rd4_Duxbury_sl_e" color="green" id="route_South_w_Duxbury_e"/>
#         # End: left of Duxbury Int.
#         <route edges="rd1_South_sl_w rd2_South_dl_w rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="magenta" id="route_South_w_Duxbury_w"/>   
#         # Then: bottom of Duxbury Int. (end in Lunnon Int.)
#         <route edges="rd1_South_sl_w rd2_South_dl_w rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd9_JanShoba_dl_s" color="green" id="route_South_w_JanShoba_s"/>   
#         <route edges="rd1_South_sl_w rd2_South_dl_w rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd2_Lunnon_sl_w" color="magenta" id="route_South_w_Lunnon_w"/>
#         <route edges="rd1_South_sl_w rd2_South_dl_w rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd9_JanShoba_sl_s rd3_Lunnon_sl_e" color="green" id="route_South_w_Lunnon_e"/>

# # Start: top of Prospect Int.
#     # End: right of Prospect Int.
#     <route edges="rd1_JanShoba_dl_s rd2_Prospect_sl_e" color="green" id="route_JanShoba_s_Prospect_e"/>
#     # Then: top of South Int.
#         # End: left of South Int.
#         <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd3_South_sl_w" color="magenta" id="route_JanShoba_s_South_w"/>
#         # End: right of South Int.
#         <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd2_South_sl_e rd4_South_sl_e" color="green" id="route_JanShoba_s_South_e"/>
#         # Then: top of Duxbury Int.
#             # End: right of Duxbury Int.
#             <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd7_JanShoba_sl_s rd4_Duxbury_sl_e" color="green" id="route_JanShoba_s_Duxbury_e"/>
#             # End: left of Duxbury Int.
#             <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="magenta" id="route_JanShoba_s_Duxbury_w"/>
#             # Then: bottom of Duxbury Int. (end in Lunnon Int.)
#             <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd9_JanShoba_dl_s" color="blue" id="route_JanShoba_s_JanShoba_s"/>
#             <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd9_JanShoba_sl_s rd3_Lunnon_sl_e" color="green" id="route_JanShoba_s_Lunnon_e"/>
#             <route edges="rd1_JanShoba_dl_s rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd2_Lunnon_sl_w" color="magenta" id="route_JanShoba_s_Lunnon_w"/>
    
# # Start: right of Prospect Int.
#     # Then: top of South Int.
#         # End: right of South Int.
#         <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd3_South_sl_w" color="magenta" id="route_Prospect_w_South_w"/>
#         # End: right of South Int.
#         <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd2_South_sl_e rd4_South_sl_e" color="green" id="route_Prospect_w_South_e"/>
#         # Then: top of Duxbury Int.
#             # End: right of Duxbury Int.
#             <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd7_JanShoba_sl_s rd4_Duxbury_sl_e" color="green" id="route_Prospect_w_Duxbury_e"/>
#             # End: left of Duxbury Int.
#             <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd2_Duxbury_sl_w rd3_Duxbury_sl_w" color="magenta" id="route_Prospect_w_Duxbury_w"/>
#             # Then: bottom of Duxbury Int. (end in Lunnon Int.)
#             <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd9_JanShoba_dl_s" color="green" id="route_Prospect_w_JanShoba_s"/>
#             <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd9_JanShoba_sl_s rd3_Lunnon_sl_e" color="green" id="route_Prospect_w_Lunnon_e"/>
#             <route edges="rd1_Prospect_sl_w rd2_JanShoba_dl_s rd3_JanShoba_tl_s rd4_JanShoba_dl_s rd5_JanShoba_tl_s rd6_JanShoba_tl_s rd7_JanShoba_dl_s rd8_JanShoba_tl_s rd2_Lunnon_sl_w" color="magenta" id="route_Prospect_w_Lunnon_w"/>

# # Start: left of Prospect Int.
#     # End: top of Prospect Int.
#     <route edges="rd1_Prospect_sl_e rd8_JanShoba_dl_n" color="green" id="route_Prospect_e_JanShoba_n"/>






