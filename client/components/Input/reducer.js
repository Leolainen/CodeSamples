export default function reducer(state, action) {
  switch (action.type) {
    case "HAS_FOCUS":
      console.log("has focus");
      return { ...state, hasFocus: true };
    case "HAS_NO_FOCUS":
      console.log("has no focus");
      return { ...state, hasFocus: false };
    case "HAS_LENGTH":
      return { ...state, hasLength: action.value };
    default:
      return state;
  }
}
