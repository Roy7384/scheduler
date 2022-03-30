const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

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
      const { days, appointments } = action;
      return {...state, days, appointments };
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
}