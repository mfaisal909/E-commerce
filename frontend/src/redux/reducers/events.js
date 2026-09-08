const initialState = {
  allEvents: [],
  loading: false,
  error: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getAllEventsRequest":
      return {
        ...state,
        loading: true,
      };
    case "getAllEventsSuccess":
      return {
        ...state,
        allEvents: action.payload,
        loading: false,
      };
    case "getAllEventsFailed":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
