export function getAppointmentsForDay(state, day) {

  let result = [];

  if (!day || !state.days.length) return result;

  const appointmentInDay = state.days.filter(singleDay => singleDay.name === day);

  if (!appointmentInDay.length) return result;

  const appointmentArr = appointmentInDay[0].appointments;

  result = Object.values(state.appointments).filter(appointment => appointmentArr.includes(appointment.id));

  return result;
}

export function getInterview(state, interview) {
  
  if (!interview) return null;
  
  const interviewerInfo = state.interviewers[interview.interviewer];

  return {...interview, interviewer: interviewerInfo};
}

export function getInterviewersForDay(state, day) {

  let result = [];

  if (!day || !state.days.length) return result;

  const interveiwerInDay = state.days.filter(singleDay => singleDay.name === day);

  if (!interveiwerInDay.length) return result;

  const interviewersArr = interveiwerInDay[0].interviewers;

  result = Object.values(state.interviewers).filter(interviewer => interviewersArr.includes(interviewer.id));

  return result;
}