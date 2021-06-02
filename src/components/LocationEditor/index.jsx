import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Geocoder from 'react-map-gl-geocoder';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const StyledCard = styled(Card)`
  width: 300px;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;

const LocationEditor = ({
  mapRef,
  title,
  location,
  setLocation,
  setViewport,
  closeEditor,
  className,
}) => {
  const containerRef = useRef();

  const [result, setResult] = useState();

  const handleOnResult = useCallback((event) => {
    setResult(event.result);
  }, []);

  const handleOnViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  );

  const handleOnDone = () => {
    if (result) {
      setLocation({
        address: result.place_name,
        coordinates: result.geometry.coordinates,
      });
      closeEditor();
    }
  };

  return (
    <>
      <StyledCard className={className}>
        <CardContent ref={containerRef}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </CardContent>
        <StyledCardActions>
          <Button size="small" onClick={handleOnDone}>
            Done
          </Button>
        </StyledCardActions>
      </StyledCard>
      <Geocoder
        mapRef={mapRef}
        containerRef={containerRef}
        // eslint-disable-next-line no-undef
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        inputValue={location.address}
        onResult={handleOnResult}
        onViewportChange={handleOnViewportChange}
        countries="MY"
      />
    </>
  );
};

export default LocationEditor;

LocationEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  mapRef: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  title: PropTypes.string,
  setLocation: PropTypes.func.isRequired,
  setViewport: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LocationEditor.defaultProps = {
  location: {},
  title: '',
  className: '',
};
