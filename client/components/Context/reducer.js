export default function reducer(state, action) {
  switch (action.type) {
    case "WAS_CLICKED":
      return { ...state, wasClicked: !state.wasClicked };
    default:
      return state;
  }
}
