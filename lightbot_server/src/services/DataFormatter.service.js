// // Library imports
const fs = require('fs')

// // Model imports
const { ErrorResponse } = require('../models/Error.model')
const Graph = require('../models/Graph.model')

arrayify = (filename) => {
  let line = fs
    .readFileSync('src/services/OptimizerService/Display_Data/' + filename)
    .toString()
    .split('\r\n')
    line.pop()
    line = line.map(Number)
  return line
}
pushDataX = async (title, type, metric, dataset) => {
  try {
    const graph = new Graph({
      title,
      type,
      metric,
      dataset,
    })
    await graph.save()
  } catch (err) {
    return next(
      new ErrorResponse('Something went wrong could not upload graph.')
    )
  }
}
module.exports = {
    loadData: async () => {
        let array
    array = arrayify('Manual/plot_Jan_South_Total_queue_data.txt')
    pushDataX('South','Manual','Queue',array)
    array = arrayify('Manual/plot_Jan_South_Waiting_Times_data.txt')
    pushDataX('South','Manual','Wait',array)
    array = arrayify('Manual/plot_Jan_Duxbury_Total_queue_data.txt')
    pushDataX('Duxbury','Manual','Queue',array)
    array = arrayify('Manual/plot_Jan_Duxbury_Waiting_Times_data.txt')
    pushDataX('Duxbury','Manual','Wait',array)
    array = arrayify('Manual/plot_Total_co2_Emission_data.txt')
    pushDataX('Total','Manual','Emissions',array)
    array = arrayify('Manual/plot_Total_Fuel_Consumption_data.txt')
    pushDataX('Total','Manual','Fuel',array)

    array = arrayify('Automatic/plot_Jan_South_Total_queue_data.txt')
    pushDataX('South','Automatic','Queue',array)
    array = arrayify('Automatic/plot_Jan_South_Waiting_Times_data.txt')
    pushDataX('South','Automatic','Wait',array)
    array = arrayify('Automatic/plot_Jan_Duxbury_Total_queue_data.txt')
    pushDataX('Duxbury','Automatic','Queue',array)
    array = arrayify('Automatic/plot_Jan_Duxbury_Waiting_Times_data.txt')
    pushDataX('Duxbury','Automatic','Wait',array)
    array = arrayify('Automatic/plot_Total_co2_Emission_data.txt')
    pushDataX('Total','Automatic','Emissions',array)
    array = arrayify('Automatic/plot_Total_Fuel_Consumption_data.txt')
    pushDataX('Total','Automatic','Fuel',array)
    

    }
}

