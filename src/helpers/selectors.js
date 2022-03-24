export function getAppointmentsForDay(state, day) {

  let result = [];

  if (!day || !state.days.length) return result;

  const appointmentInDay = state.days.filter(singleDay => singleDay.name === day);

  if (!appointmentInDay.length) return result;

  const appointmentArr = appointmentInDay[0].appointments;

  result = Object.values(state.appointments).filter(appointment => appointmentArr.includes(appointment.id));

  return result;
}