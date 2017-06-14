const searchApp = (state = {}, action) => {
    switch (action.type) {

        case 'SEARCH_NAME':
            var newState = Object.assign({}, state);
            newState.name = action.name;
            return newState;

        default:
            return state;
    }
}

export default searchApp;
