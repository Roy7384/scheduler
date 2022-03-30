import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, queryByText, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // get the empty appointment slot
    const appointment = getAllByTestId(container, "appointment")[0];

    // click add button to get create Form to show
    fireEvent.click(getByAltText(appointment, "Add"));

    // click an interviewer
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"))

    // use change event to input student name
    fireEvent.change(getAllByTestId(appointment, "student-name-input")[0], {target: {value: "Roy"}})

    // click the save button
    fireEvent.click(getByText(appointment, "Save"));
    
    // checking if Status with test saving is showing
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // wait until new appointment renders
    await waitForElement(() => getByText(appointment, "Roy"));

    // get all DayListItem
    const days = getAllByTestId(container, "day");

    // get monday item
    const monday = days.filter(day => queryByText(day, 'Monday'))[0]

    // check if monday has 'no spots remaining'
    expect(getByText(monday, 'no spots remaining')).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the second appointment.
    const secondAppointment = getAllByTestId(container, "appointment")[1]; 
    fireEvent.click(getByAltText(secondAppointment, "Delete"));

    // 4. Check the confirmation message is shown.
    expect(getByText(secondAppointment, 'Delete the appointment?')).toBeInTheDocument();

    // 5. Click the "Confirm" button on the Confirm component
    fireEvent.click(getByText(secondAppointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(secondAppointment, 'Deleting')).toBeInTheDocument();
    
    // 7. Wait until the second appointment slot has the empty Add button displayed.
    await waitForElement(() => getByAltText(secondAppointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container, 'day');
    const monday = days.filter(day => queryByText(day, 'Monday'))[0]
    expect(getByText(monday, '2 spots remaining')).toBeInTheDocument(); 
  });
});

