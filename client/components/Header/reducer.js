export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarIsOpen: !state.sidebarIsOpen };
    default:
      return state;
  }
}
