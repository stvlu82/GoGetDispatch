import { useState, useEffect } from 'react';
import { VEHICLE_TYPE_BICYCLE } from './deliveryDetails';

const emptyLocation = {
  address: null,
  coordinates: [],
};

export const PICKUP_ADDRESS_INDEX = 0;
const RATE_BICYCLE = 1;
const RATE_CAR = 1.5;

const useDispatchData = ({ distanceDataResult, getDistanceData }) => {
  const [locations, setLocations] = useState([{ ...emptyLocation }]);
  const [description, setDescription] = useState(null);
  const [note, setNote] = useState(null);
  const [vehicle, setVehicle] = useState(VEHICLE_TYPE_BICYCLE);
  const [distanceData, setDistanceData] = useState({
    isCalculating: false,
    distance: 0,
    hasError: false,
  });
  const [fee, setFee] = useState(0);

  const [hasValidDeliveryLocation, setHasValidDeliveryLocation] =
    useState(false);

  useEffect(() => {
    setDistanceData(distanceDataResult);
  }, [distanceDataResult]);

  useEffect(() => {
    setFee(
      vehicle === VEHICLE_TYPE_BICYCLE
        ? RATE_BICYCLE * distanceData.distance
        : RATE_CAR * distanceData.distance,
    );
  }, [distanceData, vehicle]);

  useEffect(() => {
    setHasValidDeliveryLocation(
      locations.length > 1 && locations[1].address !== null,
    );
  }, [locations]);

  useEffect(() => {
    if (hasValidDeliveryLocation) {
      getDistanceData({
        data: {
          locations,
        },
      });
    }
  }, [locations, hasValidDeliveryLocation]);

  const updateLocation = (index, newLocation) => {
    const clone = [...locations];
    if (index < 0 || index >= clone.length) {
      clone.push(newLocation);
    } else {
      clone[index] = newLocation;
    }

    if (clone.length === 1 && clone[0].address !== null) {
      clone.push({ ...emptyLocation });
    }
    setLocations(clone);
  };

  const deleteLocation = (index) => {
    const clone = [...locations];
    clone.splice(index, 1);
    setLocations(clone);
  };

  return [
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
    setDistanceData,
  ];
};

export default useDispatchData;
