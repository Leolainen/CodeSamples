export default function reducer(state, action) {
  switch (action.type) {
    case "HAS_FOCUS":
      return { ...state, hasFocus: true };
    case "HAS_NO_FOCUS":
      return { ...state, hasFocus: false };
    case "HAS_LENGTH":
      return { ...state, hasLength: action.value };
    default:
      return state;
  }
}
