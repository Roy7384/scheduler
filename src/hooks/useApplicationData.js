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

  // update day selected by user
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log('Saving interivew id:', id, interview);
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
        setState({ ...state, appointments });
      });
  }

  function cancelInterview(id) {
    console.log('Cancelling interview id: ', id);
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
        setState({ ...state, appointments });
      });
  }

  return { state, setDay, bookInterview, cancelInterview }
}