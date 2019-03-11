export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return { ...state, isEditing: !state.isEditing };
    default:
      return state;
  }
}
