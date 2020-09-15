import React from 'react'

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stores: [
        { latitude: -25.755764, longitude: 28.239555 },
        { latitude: -25.753169, longitude: 28.240338 },
      ],
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
        
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log('You clicked me!')}
        />
      )
    })
  }

  render() {
    return (
      <Map
      mapType={'hybrid'}
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        streetView={true}
        initialCenter={{ lat: -25.754538, lng: 28.240073 }}
      >{this.displayMarkers()}
      </Map>
    )
  }
}

const mapStyles = {
  width: '98%',
  height: '86%',
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDKWWT1ogcWnVWDdrhVQKHnqCYIfcqpoRI',
})(MapContainer)
