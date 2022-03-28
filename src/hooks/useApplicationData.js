import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // function to update day selected by user
  const setDay = day => setState(prevState => ({ ...prevState, day }));

  // function to calculate spots remaining and update it in state
  function updateSpots(appointments) {
    const updatedState = {...state, appointments};
    const newDaysData = updatedState.days.map(day => {
      let spotsLeft = 0;
      day.appointments.forEach(appId => {
        if (!updatedState.appointments[appId].interview) {
          spotsLeft += 1;
        }
      });
      const newDayData = { ...day, spots: spotsLeft };
      return newDayData;
    });
    setState(prevState => ({ ...prevState, days: newDaysData }));
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
        setState(prevState => ({ ...prevState, appointments }));
        updateSpots(appointments);
      })
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
        setState(prevState => ({ ...state, appointments }));
        updateSpots(appointments);
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}