import { useEffect, useState } from 'react';
import useSendRequest from './useSendRequest';

const baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/';

const profile = 'driving/';

const useMapBoxDirections = () => {
  const [payload, setPayload] = useState(null);
  const [{ state }, setRequest] = useSendRequest();
  const [result, setResult] = useState({ distance: 0 });

  useEffect(() => {
    if (state) {
      const { response, isLoading } = state;
      if (isLoading) {
        setResult({
          isCalculating: true,
          distance: 0,
          hasError: false,
        });
      } else if (response !== null) {
        if (response.status === 200 && response.data.code === 'Ok') {
          setResult({
            isCalculating: false,
            distance: response.data.routes[0].distance / 1000,
            hasError: false,
          });
        }
      } else {
        setResult({
          isCalculating: false,
          distance: 0,
          hasError: true,
        });
      }
    }
  }, [state]);
  useEffect(() => {
    if (payload) {
      const { locations } = payload.data;
      const coordinates = locations
        .map((location) => location.coordinates.join(','))
        .join(';');
      // eslint-disable-next-line no-undef
      const url = `${baseUrl}${profile}${coordinates}?access_token=${MAPBOX_ACCESS_TOKEN}`;
      setRequest({
        httpMethod: 'get',
        url,
        payload,
      });
    }
  }, [payload]);

  return [{ result }, setPayload];
};

export default useMapBoxDirections;
