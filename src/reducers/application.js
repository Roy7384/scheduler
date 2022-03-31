const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function tasksReducer(state, action) {

  const updateSpots = function (newAppointments) {

    // find which day the appointment belong to
    const dayToUpdate = state.days.find(d => d.name === state.day);

    // calculate spots by looping through appointments
    let spots = 0;
    dayToUpdate.appointments.forEach(appId => {
      if (!newAppointments[appId].interview) {
        spots++;
      }
    });
    const newDay = { ...dayToUpdate, spots };

    // Return new days state
    return state.days.map(d => d.name === state.day ? newDay : d);
  };

  switch (action.type) {
    case SET_DAY: {
      return { ...state, day: action.day };
    }
    case (SET_APPLICATION_DATA): {
      const { days, appointments, interviewers } = action;

      return { ...state, days, appointments, interviewers}
    }
    case SET_INTERVIEW: {
      const { id, interview } = action;

      let appointment = {};
      // if interview is null, set interview to null
      if(!interview) { 
        appointment = {
          ...state.appointments[id],
          interview: null
        };
      } else {
        appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots(appointments);
      
      return { ...state, days, appointments };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  tasksReducer
};