import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';

const DispatchType = {
  INIT: 0,
  SUCCESS: 1,
  ERROR: 2,
  ABORT: 3,
};

export const initialState = {
  isLoading: false,
  response: null,
};

const dataFetchReducer = (state, dispatch) => {
  switch (dispatch.type) {
    case DispatchType.INIT:
      return {
        isLoading: true,
        response: null,
      };
    case DispatchType.SUCCESS:
      return {
        isLoading: false,
        response: dispatch.response,
        payload: dispatch.payload,
      };
    case DispatchType.ERROR:
      return {
        isLoading: false,
        response: null,
        payload: dispatch.payload,
        error: dispatch.error,
      };
    default:
      throw new Error('Unhandle dispatch type');
  }
};

const useSendRequest = () => {
  const [request, setRequest] = useState(null);
  const [state, dispatch] = useReducer(
    dataFetchReducer,
    initialState,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (request) {
        try {
          dispatch({
            type: DispatchType.INIT,
          });

          const result = await axios({
            method: request.httpMethod,
            url: request.url,
            data: request.data,
          });

          dispatch({
            type: DispatchType.SUCCESS,
            response: result,
            payload: request.payload,
          });
        } catch (error) {
          dispatch({
            type: DispatchType.ERROR,
            error,
            payload: request.payload,
          });
        }
      }
    };

    fetchData();
  }, [request]);

  return [{ state }, setRequest];
};

export default useSendRequest;
