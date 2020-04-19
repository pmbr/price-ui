const initialState = {
    anyValue: 0
}

const reducer = (state = initialState, action) => {
    console.log(action)
    if (action.type === 'CHANGE') {
        return {
            ...state,
            anyValue: action.newValue
        }
    }
    return state;
}

export default reducer;