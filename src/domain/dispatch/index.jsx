import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import MapBoxMap from '../../components/MapBoxMap';
import DeliveryDetails, {
  DETAIL_TYPE_DESCRIPTION,
  DETAIL_TYPE_CUSTOM_NOTE,
  DETAIL_TYPE_VEHICLE,
  VEHICLE_TYPE_BICYCLE,
  VEHICLE_TYPE_CAR,
} from './deliveryDetails';
import LocationEditor from '../../components/LocationEditor';
import Locations from './locations';
import TextEditor from '../../components/TextEditor';
import SelectEditor from '../../components/SelectEditor';
import Popup from '../../components/Popup';
import useDispatchData, {
  PICKUP_ADDRESS_INDEX,
} from './useDispatchData';
import useMapBoxDirections from '../../hooks/useMapBoxDirections';

const Container = styled.section`
  width: 100%;
  height: 100%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const StyledDeliveryDetails = styled(DeliveryDetails)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StyledLocations = styled(Locations)`
  position: absolute;
  left: 10px;
  top: 10px;
`;

const StyledTextEditor = styled(TextEditor)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StyledSelectEditor = styled(SelectEditor)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StyledLocationEditor = styled(LocationEditor)`
  margin-left: 10px;
  margin-top: 10px;
`;

const defaultEditLocationData = {
  doEdit: false,
  index: -1,
};

const defaultEditDeliveryData = {
  doEdit: false,
  type: '',
};

const Dispatch = () => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude: 2.991181,
    longitude: 101.450138,
    zoom: 16,
  });

  const [{ result: distanceDataResult }, getDistanceData] =
    useMapBoxDirections();

  const [
    {
      locations,
      description,
      note,
      vehicle,
      distanceData,
      fee,
      hasValidDeliveryLocation,
    },
    updateLocation,
    deleteLocation,
    setDescription,
    setNote,
    setVehicle,
  ] = useDispatchData({ distanceDataResult, getDistanceData });

  const [editLocationData, setEditLocationData] = useState({
    ...defaultEditLocationData,
  });

  const [editDeliveryData, setEditDeliveryData] = useState({
    ...defaultEditDeliveryData,
  });

  const [popupData, setPopupData] = useState({
    open: false,
    test: '',
  });

  const createDispatch = () => {
    setPopupData({ open: true, text: 'Job created!' });
    console.log({
      locations,
      description,
      note,
      vehicle,
      distance: distanceData.distance,
      fee,
    });
  };

  return (
    <Container>
      <MapBoxMap
        markers={locations
          .filter((location) => location.coordinates.length > 1)
          .map((location, index) => ({
            coordinates: location.coordinates,
            text: String.fromCharCode(65 + index),
            color: index === PICKUP_ADDRESS_INDEX ? 'green' : 'blue',
          }))}
        viewport={viewport}
        setViewport={setViewport}
        ref={mapRef}
      >
        {!editLocationData.doEdit && (
          <StyledLocations
            locations={locations}
            setEditData={setEditLocationData}
            deleteItem={deleteLocation}
          />
        )}
        {editLocationData.doEdit && (
          <StyledLocationEditor
            mapRef={mapRef}
            title={
              editLocationData.index === 0
                ? 'Pick up location'
                : 'Drop off location'
            }
            location={locations[editLocationData.index]}
            setLocation={(newLocation) =>
              updateLocation(editLocationData.index, newLocation)
            }
            setViewport={setViewport}
            closeEditor={() =>
              setEditLocationData({ ...defaultEditLocationData })
            }
          />
        )}
        {!editDeliveryData.doEdit && hasValidDeliveryLocation && (
          <StyledDeliveryDetails
            description={description}
            note={note}
            vehicle={vehicle}
            distanceData={distanceData}
            fee={fee}
            setEditData={setEditDeliveryData}
            createDispatch={createDispatch}
          />
        )}
        {editDeliveryData.doEdit &&
          editDeliveryData.type === DETAIL_TYPE_DESCRIPTION && (
            <StyledTextEditor
              title="Description"
              text={description}
              closeEditor={() =>
                setEditDeliveryData({ ...defaultEditDeliveryData })
              }
              setText={setDescription}
            />
          )}
        {editDeliveryData.doEdit &&
          editDeliveryData.type === DETAIL_TYPE_CUSTOM_NOTE && (
            <StyledTextEditor
              title="Custom Note"
              text={note}
              closeEditor={() =>
                setEditDeliveryData({ ...defaultEditDeliveryData })
              }
              setText={setNote}
            />
          )}
        {editDeliveryData.doEdit &&
          editDeliveryData.type === DETAIL_TYPE_VEHICLE && (
            <StyledSelectEditor
              title="Vehicle"
              options={[VEHICLE_TYPE_BICYCLE, VEHICLE_TYPE_CAR]}
              text={vehicle}
              closeEditor={() =>
                setEditDeliveryData({ ...defaultEditDeliveryData })
              }
              setText={setVehicle}
            />
          )}
      </MapBoxMap>
      <Popup
        text={popupData.text}
        open={popupData.open}
        onClose={() => setPopupData({ open: false })}
      />
    </Container>
  );
};

export default Dispatch;

Dispatch.propTypes = {};

Dispatch.defaultProps = {};
