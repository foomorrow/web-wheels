
const InitAction = (event) => {
  const { target } = event
  const { dataSet } = target

  return (dispatch) => {
    dispatch({
      type: 'FETCH',
      ...dataSet
    })
    const promise = fetch()
    return promise.then((data) => {
      dispatch({
        type: 'RESOLVE',
        ...dataSet,
        data
      })
    })
  }
}


createStore(combine({
  a: receive('FETCH', (state, payload, next) => {

  }),
  b: receive 
}))



createViewModel(receiveAction({
  InitAction: (payload) => {
    await fetch()
    return 
  }
}), function receiveData(state, newData){

}, initialState)


class ViewModel {
  handleAction(actionType, payload, prevData, next){
    fetch().then(() => {
      this.data = 
    })
    return {}
  }
  onNext(nextData, prevData){

  }
  onError(error, prevData){

  }
}