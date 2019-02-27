export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_HAMBURGER":
      return { ...state, hamburgerIsOpen: !state.hamburgerIsOpen };
    default:
      return state;
  }
}
