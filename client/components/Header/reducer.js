export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarIsOpen: !state.sidebarIsOpen };
    case "UPDATE_WINDOW_WIDTH": {
      console.log("action.data", action.data);
      const windowWidth = action.data;
      console.log("windowWidth", windowWidth);
      return () => ({ ...state, windowWidth: action.data });
    }
    default:
      return state;
  }
}
