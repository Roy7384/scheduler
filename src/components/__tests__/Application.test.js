import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, prettyDOM } from "@testing-library/react";

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

    console.log(prettyDOM(appointment));
  });

});

