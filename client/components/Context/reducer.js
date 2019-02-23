export default function reducer(state, action, args) {
  switch (action.type) {
    case "LOGGED_IN":
      return { ...state, loggedIn: true };
    case "LOGGED_OUT":
      return { ...state, loggedIn: false };
    case "UPDATE_QUERY":
      return { ...state, query: args };
    default:
      return state;
  }
}
