import { useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  tasksReducer } from "reducers/application";

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

    // create WebSocket connection
    const wsUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const webSocket = new WebSocket(wsUrl);

    webSocket.onopen = function(event) {
      webSocket.send('ping');
    }
    // webSocket.onmessage = event => { 
    //   if (event.data.type === SET_INTERVIEW) {
    //     const { id, interview } = event.data
    //     const appointment = {
    //       ...state.appointments[id],
    //       interview: { ...interview }
    //     };
    //     const appointments = {
    //       ...state.appointments,
    //       [id]: appointment
    //     };
    //     const days = updateSpots()
    //     dispatch({ type: SET_INTERVIEW, appointments, days})
    //   }
    // }
  }, []);

  // function to update day selected by user
  const setDay = day => dispatch({ type: SET_DAY, day });

  // function to calculate spots remaining and update it in state
  function updateSpots(newAppointments) {
  
    // find which day the appointment belong to
    const dayToUpdate = state.days.find(day => day.name === state.day);
    
    // calculate spots by looping through appointments
    let spots = 0;
    dayToUpdate.appointments.forEach(appId => {
      if (!newAppointments[appId].interview) {
        spots ++
      }
    })
    const newDay = {...dayToUpdate, spots};

    // Return new days state
    return state.days.map(day => day.name === state.day ? newDay : day);
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(appointments);
        dispatch({ type: SET_INTERVIEW, appointments, days });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(appointments);
        dispatch({ type: SET_INTERVIEW, appointments, days });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}