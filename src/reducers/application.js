const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";

function tasksReducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return {...state, day: action.day};
    }
    case (SET_APPLICATION_DATA): {
      const { days, appointments, interviewers } = action;
      return {...state, days, appointments, interviewers};
    }
    case SET_INTERVIEW: {
      return {...state, appointments: action.appointments};
    }
    case SET_SPOTS: {
      const newDays = state.days.map(day => {
        if (day.id === action.dayId) {
          return {...day, spots: action.spots}
        }
        return day
      })
      return {...state, days: newDays};
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
  SET_SPOTS,
  tasksReducer
}