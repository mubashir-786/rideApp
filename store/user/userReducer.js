function reducer(state = { user: null }, action) {
  switch(action.type) {
    case 'ADD_USER': return { ...state, user: action.payload }
    case 'REMOVE_USER': return { ...state, user: null }
    case 'MODE': return { ...state, mode: action.payload }
    case 'RIDES': return { ...state, rides: action.payload }
    default: return state
  }
}

export default reducer