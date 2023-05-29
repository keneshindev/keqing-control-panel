const initialState = {
    user: null
}
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/userChanged':
        return {
            ...state,
            user: action.payload
        }
    case 'user/userLoggedOff':
        return {
            ...state,
            user: null
        }
    default:
      return state
  }
}