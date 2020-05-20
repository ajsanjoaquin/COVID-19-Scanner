const INITIAL_STATE = {}

export default (state = INITIAL_STATE, actions) => {
    switch(actions.type){
        case "LOGIN_USER":
            return {
                "name":"Ivan Leo"
            }
        default:
            return state
    }
}