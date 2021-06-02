import React from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker as MapBoxMarker } from 'react-map-gl';
import Marker from '../Marker';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBoxMap = React.forwardRef(
  ({ children, viewport, setViewport, markers }, ref) => {
    const { latitude, longitude, zoom } = viewport;
    return (
      <ReactMapGL
        ref={ref}
        // eslint-disable-next-line no-undef
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        width="100%"
        height="100%"
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {markers.map((marker, index) => (
          <MapBoxMarker
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            latitude={marker.coordinates[1]}
            longitude={marker.coordinates[0]}
            offsetLeft={-20}
            offsetTop={-25}
          >
            <Marker
              text={marker.text}
              backgroundColor={marker.color}
            />
          </MapBoxMarker>
        ))}
        {children}
      </ReactMapGL>
    );
  },
);

export default MapBoxMap;

MapBoxMap.propTypes = {
  children: PropTypes.node,
  markers: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired,
};
MapBoxMap.defaultProps = { children: null, markers: null };
