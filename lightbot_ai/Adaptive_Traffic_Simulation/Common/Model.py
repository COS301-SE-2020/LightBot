# This file represents a fully connected deep neural network as a model for the automatic simulation.
 
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # stop warning about tensorflow
import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import plot_model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import losses
from tensorflow.keras import layers
from tensorflow import keras


class TrainModel:
    # The constructor, which stores the parameters into their respective member variable.
    #  @param self The object pointer.
    #  @param num_layers The number of layers in the neural network.
    #  @param width The width of the layers in the neural network.
    #  @param batch_size The size of a batch of states which can be used as input.
    #  @param learning_rate The learning rate of the model.
    #  @param input_dim The dimensions of the input vector.
    #  @param output_dim The dimensions of the output vector.
    def __init__(self, num_layers, width, batch_size, learning_rate, input_dim, output_dim):
        self._num_layers = num_layers
        self._width = width
        self._batch_size = batch_size
        self._learning_rate = learning_rate
        self._input_dim = input_dim
        self._output_dim = output_dim
        self._model = self._build_model(num_layers, width)        

    
    # Documentation for the _build_model method.
    #  @param self The object pointer.
    #  @param num_layers The number of layers in the neural network.
    #  @param width The width of the layers in the neural network.
    def _build_model(self, num_layers, width):
        inputs = keras.Input(shape=(self._input_dim,))
        x = layers.Dense(width, activation='relu')(inputs)
        for _ in range(num_layers):
            x = layers.Dense(width, activation='relu')(x)
        outputs = layers.Dense(self._output_dim, activation='linear')(x)

        model = keras.Model(inputs=inputs, outputs=outputs, name='my_model')
        model.compile(loss=losses.mean_squared_error,
                      optimizer=Adam(lr=self._learning_rate))
        return model

    # Documentation for the predict_one method.
    #  @param self The object pointer.
    #  @param state A state vector used for input.
    def predict_one(self, state):
        state = np.reshape(state, [1, self._input_dim])
        return self._model.predict(state)

    # Documentation for the predict_batch method.
    #  @param self The object pointer.
    #  @param states A collection of state vectors used for input.
    def predict_batch(self, states):
        return self._model.predict(states)

    # Documentation for the train_batch method.
    #  @param self The object pointer.
    #  @param states A collection of state vectors used for input.
    #  @param q_sa The Q(seate) value.
    def train_batch(self, states, q_sa):
        self._model.fit(states, q_sa, epochs=1, verbose=0)

    # Documentation for the save_model method.
    #  @param self The object pointer.
    #  @path self The path to save the model file.
    def save_model(self, path):
        self._model.save(os.path.join(path, 'trained_model.h5'))

    @property
    def input_dim(self):
        return self._input_dim

    @property
    def output_dim(self):
        return self._output_dim

    @property
    def batch_size(self):
        return self._batch_size


class TestModel:
    def __init__(self, input_dim, model_path):
        self._input_dim = input_dim
        self._model = self._load_my_model(model_path)

    def _load_my_model(self, model_folder_path):
        model_file_path = os.path.join(model_folder_path, 'trained_model.h5')
        if os.path.isfile(model_file_path):
            loaded_model = load_model(model_file_path)
            return loaded_model
        else:
            sys.exit("Model number not found")

    def predict_one(self, state):
        state = np.reshape(state, [1, self._input_dim])
        return self._model.predict(state)

    @property
    def input_dim(self):
        return self._input_dim
