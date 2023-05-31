const initialState = {
    user: null,
    machineInfo: {}
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
    case 'info/infoChanged':
        return {
            ...state,
            machineInfo: action.payload
        }
    default:
      return state
  }
}