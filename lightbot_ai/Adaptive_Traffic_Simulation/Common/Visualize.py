import matplotlib.pyplot as plt
import os
import json

# Documentation for the Visualization class.
#
#  The main class used to process the simulation data.


class Visualization:
    # The constructor, which sets the dpi value for the graph printed.
    #  @param self The object pointer.
    #  @param dpi The dpi value for the quality of the graph.
    def __init__(self, path, dpi):
        self._path = path
        self._dpi = dpi

    # Documentation for the save_data_and_plot method.
    #  @param self The object pointer.
    #  @param data The list of data values from the simulation.
    #  @param filename The name of the output file.
    #  @param xlabel The name for the x-axis of the graph.
    #  @param ylabel The name for the y-axis of the graph.
    #
    #  The save_data_and_plot function uses matplotlib to produce a graph to represent the input data from the simulation, specifically the queue lengths.
    #  In addition, the function also outputs the data as normal text and json to their respective files.
    def save_data_and_plot(self, data, filename, xlabel, ylabel):
        min_val = min(data)
        max_val = max(data)
        plt.rcParams.update({'font.size': 24})
        plt.plot(data, color='blue')
        plt.title(filename)
        plt.ylabel(ylabel)
        plt.xlabel(xlabel)
        plt.margins(0)
        plt.ylim(min_val - 0.05 * abs(min_val), max_val + 0.05 * abs(max_val))
        fig = plt.gcf()
        fig.set_size_inches(20, 11.25)
        fig.savefig(os.path.join(self._path, 'plot_'+filename+'.png'), dpi=self._dpi)
        plt.close("all")
        with open(os.path.join(self._path, 'plot_'+filename + '_data.txt'), "w") as file:
            for value in data:
                file.write("%s\n" % value)
        data_j = {
            filename+'': data
        }
        # with open('json_'+filename + '_data.txt', "w") as file:
        #     file.write(json.dumps(data_j))
