import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_DAYS = "SET_DAYS";

  function tasksReducer(state, action) {
    switch (action.type) {
      case SET_DAY: {
        return {...state, day: action.day};
      }
      case (SET_APPLICATION_DATA): {
        const { days, appointments, interviewers } = action;
        return {...state, days, appointments, interviewers};
      }
      case SET_DAYS: {
        return {...state, days: action.days};
      }
      case SET_INTERVIEW: {
        return {...state, appointments: action.appointments};
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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
  function updateSpots(appointments) {
    const updatedState = { ...state, appointments };
    const newDaysData = updatedState.days.map(day => {
      let spotsLeft = 0;
      day.appointments.forEach(appId => {
        if (!updatedState.appointments[appId].interview) {
          spotsLeft ++;
        }
      });
      const newDayData = { ...day, spots: spotsLeft };
      return newDayData;
    });
    dispatch({ type: SET_DAYS, days: newDaysData });
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
        dispatch({ type: SET_INTERVIEW, appointments });
        updateSpots(appointments);
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
        updateSpots(appointments);
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}