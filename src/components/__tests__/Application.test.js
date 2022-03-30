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
    const { container, debug } = render(<Application />);

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

});

