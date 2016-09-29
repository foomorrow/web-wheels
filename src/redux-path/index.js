



const actions = {
  INIT_ACTIONS: createAction(
    (params) => (dispatch) => {}, 
    [
      {
        path: ['a', 'b', 'c', (payload) => 'd'],
        handle(state, payload){
          return { ...state, payload }
        }
      }
    ]
  )
  
}