export default function reducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_VALUE":
      return { ...state, selectedValue: [action.value] };
    case "ADD_TO_SELECTED_VALUE":
      return {
        ...state,
        selectedValue: [...state.selectedValue, action.value]
      };
    case "REMOVE_SELECTED_VALUE":
      return {
        ...state,
        selectedValue: state.selectedValue.filter(val => val !== action.value)
      };
    case "SET_SEARCH_FIELD":
      return {
        ...state,
        searchField: action.value
      };
    default:
      return state;
  }
}
