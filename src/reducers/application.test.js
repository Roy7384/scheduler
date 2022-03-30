import { tasksReducer } from "./application";

describe("tasksReducer", () => {
  it("throws an error with an unsupported type", () => {
    const state = {};
    const action = {type: null};

    expect(() => tasksReducer(state, action)).toThrowError(
      /tried to reduce with unsupported action type/i
    )
    
  })
})