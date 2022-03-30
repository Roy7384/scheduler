import { useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS,
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
  }, []);

  // function to update day selected by user
  const setDay = day => dispatch({ type: SET_DAY, day });

  // function to calculate spots remaining and update it in state
  function updateSpots(id, method, edit) {
    if (edit) return;
    // find which day the appointment belong to
    const dayToUpdate = state.days.find(day => day.name === state.day);
    const dayId = dayToUpdate.id;
    
    // get current spots number
    let spots = state.days[dayId - 1].spots;
    // update spots accordingly 
    if (method === 'ADD') {
      spots += 1
    }
    if (method === 'MINUS') {
      spots -= 1
    } 
    // update state
    dispatch({ type: SET_SPOTS, spots, dayId });
  }

  function bookInterview(id, interview, edit) {
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
        dispatch({ type: SET_INTERVIEW, appointments });
        updateSpots(id, 'MINUS', edit);
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
        dispatch({ type: SET_INTERVIEW, appointments });
        updateSpots(id, 'ADD');
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}