export class Updater {
  constructor(node){
    this._internalNode = node
  }
  enqueueUpdate(nextState, callback){
    this._internalNode._pendingStates.push(nextState)
    if(typeof callback === 'function'){
      this._internalNode._callbacks.push(callback)
    }
    if(!this._internalNode._pendingUpdate){
      this._internalNode.receive(this._internalNode._currentElement, this._internalNode._context)
    }
  }
}