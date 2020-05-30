const INITIAL_STATE = {
    "prev_results": [],
    "curr_results": []
}

export default (state = INITIAL_STATE, actions) => {
    
    switch(actions.type){
        
        case "POST_IMAGE":
            let new_state = {...state}
            new_state['curr_results'] = []
            console.log("Called")   
            // for(let i = 0;i<actions.payload.data.predictions.length;i++){
            //     let item = actions.payload.data.predictions[i]
            //     new_state['prev_results'][item.image] = {
            //         "name":item.image,
            //         "file":actions.images[item.image],
            //         "prediction":item.result
            //     }
            //     new_state['curr_results'][item.image] = {
            //         "name":item.image,
            //         "file":actions.images[item.image],
            //         "prediction":item.result
            //     }
            // }
            
            new_state['prev_results'].push(...actions.payload.data)
            
            return new_state
        case "REMOVE_DATA":
            console.log("State was reset")
            let resetState = {...state}
            resetState['curr_results'] = []
            resetState["prev_results"] = []
            return resetState
        default:
            return state
    }
}