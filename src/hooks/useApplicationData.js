import { useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  tasksReducer
} from "reducers/application";

export default function useApplicationData(props) {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // load initial data from API
  useEffect(() => {
    const daysUrl = '/api/days';
    const appointmentsUrl = '/api/appointments';
    const interviewersUrl = '/api/interviewers';

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  useEffect(() => {
    // create WebSocket connection
    const wsUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const webSocket = new WebSocket(wsUrl);

    webSocket.onopen = function (event) {
      webSocket.send(`ping at ${Date()}`);
    };
    webSocket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === SET_INTERVIEW) {
        const { id, interview } = JSON.parse(event.data);
        dispatch({ type: SET_INTERVIEW, id, interview });
        // console.log(event.data)
      }
    };

    return () => {
      webSocket.close();
    }
  }, [])

// function to update day selected by user
const setDay = day => dispatch({ type: SET_DAY, day });

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
}

function cancelInterview(id) {
  const interview = null;

  return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
}

return { state, setDay, bookInterview, cancelInterview };
}