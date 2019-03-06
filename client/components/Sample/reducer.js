export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_COMMENT_MODAL":
      return { ...state, commentModalIsOpen: !state.commentModalIsOpen };
    default:
      return state;
  }
}
