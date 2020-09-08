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

        with open("Map\Jan_Shoba_Multi_Peak_autogen_vehicles.rou.xml", "a") as routes:
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






