export class assManager {
  constructor() {
    // This will hold the state for all hooks in this component
    this._state = []
    // Keeps track of the current hook being used
    this._currentHook = 0
  }

  //useState hook replica
  useAss(initialState) {
    //copy of current index
    const hookIndex = this._currentHook

    if (!this._state[hookIndex]) {
      this._state.push(initialState)
    }

    const getState = () => {
      return this._state[hookIndex]
    }
    const setState = (newState) => {
      this._state[hookIndex] = newState
    }

    this._currentHook++

    return [getState, setState]
  }
}
