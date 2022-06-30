function reducer(state = { detail: null }, action) {
    switch(action.type) {
      case 'RIDE_DETAIL': return { ...state, detail: action.payload }
    //   case 'REMOVE_USER': return { ...state, user: null }
      default: return state
    }
  }
  
  export default reducer